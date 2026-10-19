import express, { Request, Response, NextFunction } from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import { timingSafeEqual } from 'node:crypto';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.disable('x-powered-by');
// Set TRUST_PROXY_HOPS only to the exact number of trusted reverse proxies in front of this app.
// Leave unset when the server is reached directly; never use a broad trust setting without verifying the hosting topology.
const trustProxyHops = Number(process.env.TRUST_PROXY_HOPS);
if (process.env.TRUST_PROXY_HOPS && Number.isInteger(trustProxyHops) && trustProxyHops >= 1 && trustProxyHops <= 5) {
  app.set('trust proxy', trustProxyHops);
}
const PORT = process.env.PORT || 3000;
const IS_PRODUCTION = process.env.NODE_ENV === 'production';
const SOFIA_EMAIL = 'srafai.6768@gmail.com';
// Never use a hardcoded fallback for administrative credentials.
const ADMIN_API_KEY = process.env.ADMIN_API_KEY;

// Security headers. CSP permits only this app plus the Google Fonts used by index.html.
app.use((_req: Request, res: Response, next: NextFunction) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "base-uri 'self'",
    "object-src 'none'",
    "frame-ancestors 'self'",
    "form-action 'self' https://wa.me",
    "script-src 'self'",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https:",
    ...(IS_PRODUCTION ? ['upgrade-insecure-requests'] : []),
  ].join('; '));
  if (IS_PRODUCTION) {
    // Deliberately omit includeSubDomains: this app does not control the parent domain.
    res.setHeader('Strict-Transport-Security', 'max-age=31536000');
  }
  next();
});

// Enforce strict JSON body size limit to prevent Denial of Service (DoS)
app.use(express.json({ limit: '50kb' }));

// Serve static assets
app.use(express.static(path.resolve(__dirname, 'public')));
app.use('/images', express.static(path.resolve(__dirname, 'public/images')));

export interface QuoteRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  services: string[];
  budgetRange: string;
  timeline: string;
  description: string;
  preferredLanguage: string;
  businessType: string;
  createdAt: string;
  emailDispatched: boolean;
  emailError?: string;
}

// In-memory store with bounded capacity to prevent memory exhaustion
const MAX_QUOTES = 100;
const quotationSubmissions: QuoteRecord[] = [];

// In-memory IP rate limiter for quotation submissions
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000; // 10 minutes
const MAX_REQUESTS_PER_WINDOW = 5; // max 5 quote submissions per 10 mins
let rateLimitOperations = 0;
const MAX_TRACKED_IPS = 10000;

function rateLimiter(req: Request, res: Response, next: NextFunction) {
  // Use Express's resolved IP; do not trust client-supplied X-Forwarded-For directly.
  // Configure app.set('trust proxy', ...) only for the exact trusted proxy chain in production.
  const ip = req.ip || req.socket.remoteAddress || 'unknown-ip';
  const now = Date.now();
  rateLimitOperations += 1;

  // Periodically remove expired entries so unique IPs cannot grow the map forever.
  if (rateLimitOperations % 100 === 0 || rateLimitMap.size >= MAX_TRACKED_IPS) {
    for (const [trackedIp, trackedRecord] of rateLimitMap) {
      if (now > trackedRecord.resetTime) rateLimitMap.delete(trackedIp);
    }
  }

  // Keep memory bounded even during high-cardinality traffic.
  if (!rateLimitMap.has(ip) && rateLimitMap.size >= MAX_TRACKED_IPS) {
    return res.status(429).json({
      success: false,
      error: 'The quotation service is temporarily busy. Please try again shortly.'
    });
  }

  const record = rateLimitMap.get(ip);

  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW_MS });
    return next();
  }

  if (record.count >= MAX_REQUESTS_PER_WINDOW) {
    return res.status(429).json({
      success: false,
      error: 'Too many quote requests. Please wait a few minutes or reach out directly on WhatsApp.'
    });
  }

  record.count += 1;
  next();
}

// Helper: Escape untrusted user input before embedding into email HTML
function escapeHtml(unsafe: unknown): string {
  if (typeof unsafe !== 'string') return '';
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Regex for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_CLEAN_REGEX = /^[\d\s\+\-\(\)]{6,25}$/;

// POST /api/quote - Process and send quote request with strict validation
app.post('/api/quote', rateLimiter, async (req: Request, res: Response) => {
  try {
    const rawBody = req.body || {};
    
    // Type and length constraints
    const name = typeof rawBody.name === 'string' ? rawBody.name.trim().slice(0, 100) : '';
    const email = typeof rawBody.email === 'string' ? rawBody.email.trim().slice(0, 120) : '';
    const phone = typeof rawBody.phone === 'string' ? rawBody.phone.trim().slice(0, 30) : '';
    const businessType = typeof rawBody.businessType === 'string' ? rawBody.businessType.trim().slice(0, 100) : 'Individual / Brand';
    const budgetRange = typeof rawBody.budgetRange === 'string' ? rawBody.budgetRange.trim().slice(0, 80) : 'Flexible';
    const timeline = typeof rawBody.timeline === 'string' ? rawBody.timeline.trim().slice(0, 80) : 'Standard';
    const description = typeof rawBody.description === 'string' ? rawBody.description.trim().slice(0, 2000) : '';
    const preferredLanguage = typeof rawBody.preferredLanguage === 'string' ? rawBody.preferredLanguage.trim().slice(0, 80) : 'English & Hindi';

    // Validate required fields
    if (!name || name.length < 2) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid name (at least 2 characters).'
      });
    }

    if (!email && !phone) {
      return res.status(400).json({
        success: false,
        error: 'Please provide at least a contact email or phone number.'
      });
    }

    if (email && !EMAIL_REGEX.test(email)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid email address.'
      });
    }

    if (phone && !PHONE_CLEAN_REGEX.test(phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please enter a valid phone number (digits, spaces, +).'
      });
    }

    // Validate services array
    let sanitizedServices: string[] = [];
    if (Array.isArray(rawBody.services)) {
      sanitizedServices = rawBody.services
        .filter((s: unknown): s is string => typeof s === 'string' && s.trim().length > 0)
        .map((s: string) => s.trim().slice(0, 80))
        .slice(0, 10);
    }
    if (sanitizedServices.length === 0) {
      sanitizedServices = ['General Creative Consultation'];
    }

    const quoteId = `QUOTE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newQuote: QuoteRecord = {
      id: quoteId,
      name,
      email,
      phone,
      services: sanitizedServices,
      budgetRange,
      timeline,
      description,
      preferredLanguage,
      businessType,
      createdAt: new Date().toISOString(),
      emailDispatched: false
    };

    console.log(`[QUOTATION SUBMITTED] ID: ${quoteId} | Client: ${name.replace(/[\r\n\t]/g, ' ')} | Services: ${sanitizedServices.length}`);

    // Attempt to dispatch email if SMTP is configured
    let emailSent = false;
    let emailStatusMessage = '';

    if (process.env.SMTP_USER && process.env.SMTP_PASS) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST || 'smtp.gmail.com',
          port: Number(process.env.SMTP_PORT) || 587,
          secure: process.env.SMTP_SECURE === 'true',
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        });

        // Escaped HTML template preventing HTML injection attacks
        const safeName = escapeHtml(name);
        const safeEmail = escapeHtml(email);
        const safePhone = escapeHtml(phone);
        const safeBusinessType = escapeHtml(businessType);
        const safeServices = escapeHtml(sanitizedServices.join(', '));
        const safeBudget = escapeHtml(budgetRange);
        const safeTimeline = escapeHtml(timeline);
        const safeLanguage = escapeHtml(preferredLanguage);
        const safeDescription = escapeHtml(description);
        const cleanPhoneDigits = phone.replace(/[^0-9]/g, '');

        await transporter.sendMail({
          from: `"Sofia Portfolio Quotations" <${process.env.SMTP_USER}>`,
          to: SOFIA_EMAIL,
          replyTo: email || undefined,
subject: `New Client Quotation Request: ${name.replace(/[\r\n\t]/g, ' ').slice(0, 100)} (${sanitizedServices.slice(0, 2).join(', ').replace(/[\r\n\t]/g, ' ').slice(0, 160)})`,
          html: `
            <div style="font-family: sans-serif; background: #0c0d10; color: #e4e4e9; padding: 24px; border-radius: 8px;">
              <h2 style="color: #d4af37; margin-top: 0;">New Project Quotation Request</h2>
              <p style="color: #a1a1aa;">A prospective client just submitted a customized quotation form on your portfolio website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa; width: 140px;">Client Name:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff; font-weight: bold;">${safeName}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Email:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #d4af37;">${safeEmail ? `<a href="mailto:${safeEmail}" style="color: #d4af37;">${safeEmail}</a>` : 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Phone / WhatsApp:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${safePhone ? `<a href="https://wa.me/${cleanPhoneDigits}" style="color: #34d399;">${safePhone}</a>` : 'N/A'}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Business Type:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${safeBusinessType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Requested Services:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${safeServices}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Budget Range:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${safeBudget}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Target Timeline:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${safeTimeline}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Preferred Language:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${safeLanguage}</td>
                </tr>
              </table>

              <div style="margin-top: 20px; padding: 16px; background: #161720; border: 1px solid #3f3f46; border-radius: 6px;">
                <h4 style="margin: 0 0 8px 0; color: #d4af37;">Project Brief / Message:</h4>
                <p style="margin: 0; color: #e4e4e9; line-height: 1.6;">${safeDescription || 'No additional notes provided.'}</p>
              </div>

              ${cleanPhoneDigits ? `
                <div style="margin-top: 24px; text-align: center;">
                  <a href="https://wa.me/${cleanPhoneDigits}?text=Hi%20${encodeURIComponent(name)},%20I%20received%20your%20quotation%20request%20on%20my%20portfolio." 
                     style="background: #d4af37; color: #0c0d10; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
                     Reply to Client on WhatsApp
                  </a>
                </div>
              ` : ''}
            </div>
          `,
        });

        emailSent = true;
        emailStatusMessage = 'Dispatched to Sofia Rafai inbox successfully.';
      } catch (err: unknown) {
        console.error('SMTP dispatch failed:', err instanceof Error ? err.message : err);
        newQuote.emailError = 'SMTP dispatch failed; logged to internal repository.';
      }
    } else {
      emailStatusMessage = 'Logged to Sofia Rafai quote repository.';
    }

    newQuote.emailDispatched = emailSent;

    // Maintain bounded memory store
    quotationSubmissions.unshift(newQuote);
    if (quotationSubmissions.length > MAX_QUOTES) {
      quotationSubmissions.pop();
    }

    // Direct preformatted mailto and WhatsApp deep links
    const mailtoSubject = encodeURIComponent(`Quotation Request from ${name} - ${sanitizedServices[0] || 'Creative Services'}`);
    const mailtoBody = encodeURIComponent(
      `Hi Sofia,\n\nI have submitted a quotation request on your portfolio:\n\nClient Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nBusiness: ${businessType}\nServices: ${sanitizedServices.join(', ')}\nBudget: ${budgetRange}\nTimeline: ${timeline}\nPreferred Language: ${preferredLanguage}\n\nProject Brief:\n${description}\n\nLooking forward to hearing from you!`
    );
    const directMailtoUrl = `mailto:${SOFIA_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    const whatsappText = encodeURIComponent(
      `Hi Sofia, I just submitted a project quotation request on your website:\n• Name: ${name}\n• Services: ${sanitizedServices.join(', ')}\n• Budget: ${budgetRange}\n• Timeline: ${timeline}\n\nBrief: ${description || 'Please review my request.'}`
    );
    const directWhatsAppUrl = `https://wa.me/919909663883?text=${whatsappText}`;
    const directWhatsAppUrlAlt = `https://wa.me/919265145093?text=${whatsappText}`;

    return res.status(200).json({
      success: true,
      message: 'Quotation request received successfully!',
      quote: {
        id: newQuote.id,
        createdAt: newQuote.createdAt,
        services: newQuote.services
      },
      emailStatus: emailStatusMessage,
      directMailtoUrl,
      directWhatsAppUrl,
      directWhatsAppUrlAlt,
      targetEmail: SOFIA_EMAIL
    });

  } catch (error) {
    console.error('Error processing quotation:', error);
    return res.status(500).json({
      success: false,
      error: 'An internal error occurred while processing your quotation request. Please reach out via WhatsApp or email directly.'
    });
  }
});

// GET /api/quotes - Authenticated administrative endpoint
app.get('/api/quotes', (req: Request, res: Response) => {
  // Client quotation data contains personal information and must never be cached.
  res.setHeader('Cache-Control', 'no-store, private, max-age=0');
  res.setHeader('Pragma', 'no-cache');
  // Fail closed if production secrets are missing or too weak.
  if (!ADMIN_API_KEY || ADMIN_API_KEY.length < 32) {
    console.error('ADMIN_API_KEY is missing or too short; refusing admin API access.');
    return res.status(503).json({
      success: false,
      error: 'Administrative access is not configured.'
    });
  }

  const authHeader = req.headers.authorization;
  const match = authHeader?.match(/^Bearer (\S+)$/);
  if (!match) {
    return res.status(401).json({
      success: false,
      error: 'Unauthorized: Authentication token is required to access client quotations.'
    });
  }

  const supplied = Buffer.from(match[1], 'utf8');
  const expected = Buffer.from(ADMIN_API_KEY, 'utf8');
  // timingSafeEqual requires equal-length buffers.
  if (supplied.length !== expected.length || !timingSafeEqual(supplied, expected)) {
    return res.status(403).json({
      success: false,
      error: 'Forbidden: Invalid administrator credentials.'
    });
  }

  res.json({
    success: true,
    total: quotationSubmissions.length,
    quotes: quotationSubmissions
  });
});

async function startServer() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (${isDev ? 'development' : 'production'})`);
  });
}

startServer();
