import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const SOFIA_EMAIL = 'srafai.6768@gmail.com';

app.use(express.json());

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

// In-memory store for quotation inquiries
const quotationSubmissions: QuoteRecord[] = [];

// POST /api/quote - Process and send quote request to Sofia Rafai
app.post('/api/quote', async (req, res) => {
  try {
    const {
      name,
      email,
      phone,
      services = [],
      budgetRange = 'Flexible',
      timeline = 'Standard',
      description = '',
      preferredLanguage = 'English / Hindi',
      businessType = 'Small Business / Brand'
    } = req.body;

    if (!name || (!email && !phone)) {
      return res.status(400).json({
        success: false,
        error: 'Please provide your name and at least an email or phone number.'
      });
    }

    const quoteId = `QUOTE-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    const newQuote: QuoteRecord = {
      id: quoteId,
      name,
      email,
      phone,
      services: Array.isArray(services) ? services : [services],
      budgetRange,
      timeline,
      description,
      preferredLanguage,
      businessType,
      createdAt: new Date().toISOString(),
      emailDispatched: false
    };

    console.log('----------------------------------------------------');
    console.log(`[NEW QUOTATION RECEIVED FOR SOFIA RAFAI]`);
    console.log(`From: ${name} (${email || 'No email provided'} | ${phone || 'No phone provided'})`);
    console.log(`Services: ${newQuote.services.join(', ')}`);
    console.log(`Budget: ${budgetRange} | Timeline: ${timeline}`);
    console.log(`Notes: ${description}`);
    console.log('----------------------------------------------------');

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

        await transporter.sendMail({
          from: `"Sofia Portfolio Quotations" <${process.env.SMTP_USER}>`,
          to: SOFIA_EMAIL,
          replyTo: email || undefined,
          subject: `✨ New Client Quotation Request: ${name} (${newQuote.services.slice(0, 2).join(', ')})`,
          html: `
            <div style="font-family: sans-serif; background: #0c0d10; color: #e4e4e9; padding: 24px; border-radius: 8px;">
              <h2 style="color: #d4af37; margin-top: 0;">New Project Quotation Request</h2>
              <p style="color: #a1a1aa;">A prospective client just submitted a customized quotation form on your portfolio website.</p>
              
              <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa; width: 140px;">Client Name:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff; font-weight: bold;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Email:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #d4af37;"><a href="mailto:${email}" style="color: #d4af37;">${email || 'N/A'}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Phone / WhatsApp:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;"><a href="https://wa.me/${phone?.replace(/[^0-9]/g, '')}" style="color: #34d399;">${phone || 'N/A'}</a></td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Business Type:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${businessType}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Requested Services:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${newQuote.services.join(', ')}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Budget Range:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${budgetRange}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Target Timeline:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${timeline}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #a1a1aa;">Preferred Language:</td>
                  <td style="padding: 8px; border-bottom: 1px solid #27272a; color: #ffffff;">${preferredLanguage}</td>
                </tr>
              </table>

              <div style="margin-top: 20px; padding: 16px; background: #161720; border: 1px solid #3f3f46; border-radius: 6px;">
                <h4 style="margin: 0 0 8px 0; color: #d4af37;">Project Brief / Message:</h4>
                <p style="margin: 0; color: #e4e4e9; line-height: 1.6;">${description || 'No additional notes provided.'}</p>
              </div>

              <div style="margin-top: 24px; text-align: center;">
                <a href="https://wa.me/${phone?.replace(/[^0-9]/g, '')}?text=Hi%20${encodeURIComponent(name)},%20I%20received%20your%20quotation%20request%20on%20my%20portfolio." 
                   style="background: #d4af37; color: #0c0d10; padding: 10px 20px; text-decoration: none; font-weight: bold; border-radius: 4px; display: inline-block;">
                   Reply on WhatsApp
                </a>
              </div>
            </div>
          `,
        });

        emailSent = true;
        emailStatusMessage = 'Dispatched to Sofia Rafai inbox successfully.';
      } catch (err: unknown) {
        console.error('SMTP dispatch failed:', err);
        newQuote.emailError = err instanceof Error ? err.message : String(err);
      }
    } else {
      // Direct formatted mailto string is also provided to client UI for guaranteed delivery
      emailStatusMessage = 'Logged to Sofia Rafai quote submissions repository.';
    }

    newQuote.emailDispatched = emailSent;
    quotationSubmissions.unshift(newQuote);

    // Generate preformatted mailto and WhatsApp deep links so the client can trigger instant email from their own email app as well
    const mailtoSubject = encodeURIComponent(`Quotation Request from ${name} - ${newQuote.services[0] || 'Creative Services'}`);
    const mailtoBody = encodeURIComponent(
      `Hi Sofia,\n\nI have submitted a quotation request on your portfolio:\n\nClient Name: ${name}\nPhone: ${phone}\nEmail: ${email}\nBusiness: ${businessType}\nServices: ${newQuote.services.join(', ')}\nBudget: ${budgetRange}\nTimeline: ${timeline}\nPreferred Language: ${preferredLanguage}\n\nProject Brief:\n${description}\n\nLooking forward to hearing from you!`
    );
    const directMailtoUrl = `mailto:${SOFIA_EMAIL}?subject=${mailtoSubject}&body=${mailtoBody}`;

    const whatsappText = encodeURIComponent(
      `Hi Sofia, I just submitted a project quotation request on your website:\n• Name: ${name}\n• Services: ${newQuote.services.join(', ')}\n• Budget: ${budgetRange}\n• Timeline: ${timeline}\n\nBrief: ${description || 'Please review my request.'}`
    );
    const directWhatsAppUrl = `https://wa.me/919909663883?text=${whatsappText}`;

    return res.status(200).json({
      success: true,
      message: 'Quotation request received successfully!',
      quote: newQuote,
      emailStatus: emailStatusMessage,
      directMailtoUrl,
      directWhatsAppUrl,
      targetEmail: SOFIA_EMAIL
    });

  } catch (error) {
    console.error('Error handling quote:', error);
    return res.status(500).json({
      success: false,
      error: 'Failed to process quotation request. Please reach out via WhatsApp or email directly.'
    });
  }
});

// GET /api/quotes - List all submitted quotes
app.get('/api/quotes', (req, res) => {
  res.json({
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
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT} (${isDev ? 'development' : 'production'})`);
  });
}

startServer();
