import { ServiceItem, PortfolioProject, AutomationWorkflow, BackendWorkArea, QuotationServiceOption } from '../types/portfolio';
import heroWorkspaceImg from '../assets/images/hero_creative_workspace_1792344483251.jpg';
import webSweetsImg from '../assets/images/web_showcase_sweets_1792344483752.jpg';
import ugcBeautyImg from '../assets/images/ugc_aesthetic_beauty_1792344483985.jpg';
import tileWallImg from '../assets/images/tile_wall_design_1792344484581.jpg';
import brandingLogoImg from '../assets/images/branding_logo_minimal_1792344485118.jpg';

export const CREATOR_PROFILE = {
  name: "Sofia Rafai",
  tagline: "Everything creative, under one roof",
  title: "Creative Freelancer & Automation Specialist",
  fresherBadge: "FRESHER · 100% ORIGINAL SAMPLES",
  location: "Mumbai · Rajkot, Gujarat, India",
  basedIn: "Mumbai & Rajkot, Gujarat",
  email: "srafai.6768@gmail.com",
  phone: "9909663883",
  primaryPhone: "9909663883",
  secondaryPhone: "9265145093",
  phoneList: ["9909663883", "9265145093"],
  whatsappNumber: "+919909663883",
  languages: ["Hindi", "English", "Gujarati"],
  style: "Soft, clean, aesthetic",
  heroImage: heroWorkspaceImg,
  bio: "Hi, I'm Sofia Rafai, a creative freelancer based in Mumbai & Rajkot, Gujarat. I design websites, narrate voiceovers, create UGC content, make posters, design tiles and logos, build automations with n8n, Zapier and Power Automate, and handle backend office work — all with a soft, aesthetic touch and a real business mindset. I am a fresher, so every sample you see is created by me, and I put full effort into each project.",
  guarantee: "Quick turnaround, transparent communication, one free revision included with every project."
};

export const SERVICES_LIST: ServiceItem[] = [
  {
    id: "web-design",
    title: "Web Design",
    category: "web",
    shortDesc: "Mobile-friendly, responsive websites for small, boutique, and local retail businesses.",
    turnaround: "3–5 Days",
    scopeBadge: "Custom Scope",
    deliverables: "1-page to full business website, mobile-first design, fast loading & modern UI",
    highlights: ["Mobile-first responsive layout", "Local business SEO ready", "WhatsApp checkout hooks", "Modern aesthetic typography"]
  },
  {
    id: "voice-narration",
    title: "Voice Narration",
    category: "voice",
    shortDesc: "Warm, clear voiceovers in Hindi, English, and Gujarati for reels, commercial ads, and audiobooks.",
    turnaround: "24–48 Hours",
    scopeBadge: "Multilingual",
    deliverables: "Clean voiceover recording, MP3 / WAV audio format, 1 free tone revision included",
    highlights: ["Hindi, English & Gujarati fluency", "Reels & commercial ad pacing", "Audiobook narration tone", "Crystal-clear studio audio"]
  },
  {
    id: "ugc-content",
    title: "UGC Content",
    category: "ugc",
    shortDesc: "Soft, aesthetic UGC video content tailored for beauty, skincare, books, fashion, and jewellery brands.",
    turnaround: "2–4 Days",
    scopeBadge: "Faceless Aesthetic",
    deliverables: "Aesthetic UGC reel/TikTok video in vertical 9:16 format with hook, caption & B-roll",
    highlights: ["Faceless aesthetic style", "Natural lighting & flatlays", "High conversion organic hooks", "Curated tactile props"]
  },
  {
    id: "posters-creatives",
    title: "Posters & Creatives",
    category: "branding",
    shortDesc: "High-impact festival greetings, seasonal sale announcements, and customized personal gift posters.",
    turnaround: "24 Hours",
    scopeBadge: "Print & Social Ready",
    deliverables: "Print-ready high-resolution vector files + social media optimized formats",
    highlights: ["Festival announcements", "Promotional sale offers", "Personal gift typography", "CMYK print-ready"]
  },
  {
    id: "tile-wall-design",
    title: "Tile & Wall Design",
    category: "tile",
    shortDesc: "Wall and floor tile design compositions with themed geometric, Moroccan, and organic motifs.",
    turnaround: "3–5 Days",
    scopeBadge: "Architectural Surface",
    deliverables: "Seamless repeatable tile patterns, 2D elevation previews & material specs",
    highlights: ["Wall & floor surface patterns", "Contemporary geometric motifs", "Ceramic & stone textures", "Manufacturing repeat aligned"]
  },
  {
    id: "logo-design",
    title: "Logo Design",
    category: "branding",
    shortDesc: "Clean, memorable logos and brand marks designed for Instagram, packaging, signage, and web.",
    turnaround: "2–3 Days",
    scopeBadge: "2 Bespoke Concepts",
    deliverables: "2 unique concept proposals, transparent PNG, high-res PDF, colour + monochrome variants",
    highlights: ["2 creative directions", "Vector & print formats", "Minimal luxury feel", "1 free revision"]
  },
  {
    id: "automation",
    title: "Automation Workflows",
    category: "automation",
    shortDesc: "Time-saving no-code/low-code workflows built in n8n, Zapier, and Microsoft Power Automate.",
    turnaround: "1–3 Days",
    scopeBadge: "Custom Flow",
    deliverables: "Fully tested workflow setup, walkthrough screen recording & handoff documentation",
    highlights: ["Lead capture to Sheets", "Auto-reminders & follow-ups", "Scheduled MIS reports", "Instant order alerts"]
  },
  {
    id: "backend-office",
    title: "Backend Office Work",
    category: "office",
    shortDesc: "Hands-on office support backed by real manufacturing-company experience in inventory, purchase & ERP.",
    turnaround: "Monthly Dedicated Retainer",
    scopeBadge: "Remote Retainer",
    deliverables: "Daily stock reports, ledger updates, PO tracking, ERP & Excel data management, MIS dashboards",
    highlights: ["Store & inventory control", "Vendor quotation tracking", "Excel & ERP precision", "Flexible hours & scope"]
  }
];

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "swaminarayan-farsan",
    title: "Swaminarayan Farsan & Sweet",
    category: "web",
    subtitle: "Confectionery & Traditional Snack E-commerce Portal",
    description: "A rich, appetite-inducing digital storefront crafted for a heritage Indian sweet and savory delicacy house. Features categorized farsan listings, gift hamper selections, and direct WhatsApp quick-ordering.",
    image: webSweetsImg,
    tags: ["Web Design", "Local Business", "E-Commerce", "Responsive"],
    deliverables: ["Responsive Web Layout", "Online Menu & Gift Sets", "WhatsApp Cart Checkout", "SEO Meta Tags"],
    metricsOrOutcome: "Clean mobile catalog with instant WhatsApp order trigger"
  },
  {
    id: "rangriti-boutique",
    title: "Rangriti Ethnic Collection",
    category: "web",
    subtitle: "Modern Indian Ethnic Wear Web Catalog",
    description: "Clean, editorial fashion showcase with lookbook layouts, fabric details, size chart overlays, and seamless mobile navigation designed for boutique apparel sales.",
    image: brandingLogoImg,
    tags: ["Web Design", "Fashion Catalog", "Minimal UI", "Boutique"],
    deliverables: ["Product Grid View", "Filter by Category & Fabric", "Mobile Responsive Touch Navigation"],
    metricsOrOutcome: "Soft luxury presentation elevating local boutique reach"
  },
  {
    id: "four-strong-gym",
    title: "4 Strong Gym & Fitness Club",
    category: "web",
    subtitle: "High-Energy Athletic Studio & Membership Landing Page",
    description: "Bold, modern dark-mode landing page featuring trainer bios, workout session schedules, membership plan comparisons, and quick trial booking forms.",
    tags: ["Web Design", "Fitness & Gym", "Lead Gen", "Dark Theme"],
    deliverables: ["High-contrast Hero", "Tier Comparison Grid", "Class Schedule Interactive Table", "Lead Booking Form"],
    metricsOrOutcome: "High conversion lead form connected to Google Sheets"
  },
  {
    id: "shree-ganesh-sweets",
    title: "Shree Ganesh Sweets & Farsan",
    category: "web",
    subtitle: "Heritage Confectionery Brand Identity & Digital Presence",
    description: "An authentic, warm digital showcase highlighting handcrafted festive sweets, dry fruit gift boxes, and bulk festival orders with clear delivery areas.",
    image: webSweetsImg,
    tags: ["Web Design", "Heritage Sweets", "Festive Hampers", "Local Business"],
    deliverables: ["Festive Gift Portal", "Custom Bulk Order Inquiries", "Store Locator & Timings"],
    metricsOrOutcome: "Streamlined bulk festive order inquiries"
  },
  {
    id: "voiceover-reels-ads",
    title: "Voice Narration & Audio Storytelling",
    category: "voice",
    subtitle: "Multilingual Voiceovers for Social Reels, Commercials & Books",
    description: "Warm, natural voiceover recordings delivered in Hindi, English, and Gujarati. Suitable for aesthetic Instagram reels, brand storytelling ads, educational explainers, and audiobook excerpts.",
    tags: ["Voice Narration", "Hindi / English / Gujarati", "Commercial", "Audiobooks"],
    deliverables: ["Raw & Mastered Audio (MP3/WAV)", "Noise Gate & EQ Cleaning", "1 Free Tone/Pacing Revision"],
    languages: ["Hindi", "English", "Gujarati"],
    metricsOrOutcome: "3 Fluent Languages · Studio Clarity · Quick Turnaround",
    audioSample: {
      language: "Hindi & English & Gujarati",
      duration: "0:45 min",
      tone: "Warm, soothing, persuasive",
      scriptSnippet: "Welcome your customers with calm confidence — voice that resonates across reels, commercials, and audio narratives."
    }
  },
  {
    id: "ugc-aesthetic-creations",
    title: "Aesthetic Faceless UGC Content",
    category: "ugc",
    subtitle: "Organic Video Content for Beauty, Books, Fashion & Jewellery",
    description: "Curated, soft-aesthetic user-generated content filmed with natural daylight, elegant tactile props, and high-retention visual hooks. Designed specifically for brands seeking organic trust without loud sponsored gimmicks.",
    image: ugcBeautyImg,
    tags: ["UGC Content", "Faceless Aesthetic", "Jewellery & Beauty", "Reels / TikTok"],
    deliverables: ["Vertical 9:16 Short Video", "Aesthetic Flatlays & B-Roll", "Trending Audio Recommendation", "Overlay Captions"],
    metricsOrOutcome: "Soft, clean lifestyle framing designed for high audience engagement"
  },
  {
    id: "architectural-tile-patterns",
    title: "Themed Wall & Floor Tile Designs",
    category: "tile",
    subtitle: "Geometric & Botanical Ceramic Tile Surfaces",
    description: "Custom decorative wall and floor tile pattern sets with seamless repeat mathematics, contemporary motifs, and balanced colorways for interior spaces, accent walls, and floor borders.",
    image: tileWallImg,
    tags: ["Tile & Wall Design", "Surface Pattern", "Ceramic & Porcelain", "Interior Decor"],
    deliverables: ["Seamless Tile Patterns (AI/PDF)", "2D Surface Elevation Mockup", "Colorway Variations"],
    metricsOrOutcome: "Production-ready patterns with accurate repeat alignments"
  },
  {
    id: "minimalist-brand-logos",
    title: "Aesthetic Brand Logos & Identities",
    category: "branding",
    subtitle: "Memorable Logos for Cafes, Studios, Creators & Retail",
    description: "Thoughtfully crafted minimal logos designed to look pristine on Instagram avatars, foil-stamped business cards, product tags, packaging, and store signs.",
    image: brandingLogoImg,
    tags: ["Logo Design", "Brand Identity", "Minimalism", "Typography"],
    deliverables: ["Two Unique Creative Directions", "Transparent Vector Files (PNG/PDF)", "Monochrome & Full Color Sets", "1 Free Revision"],
    metricsOrOutcome: "2 Bespoke Concepts Delivered within 48 Hours"
  }
];

export const AUTOMATION_WORKFLOWS: AutomationWorkflow[] = [
  {
    id: "enquiry-capture",
    title: "Instant Enquiry Capture & Centralization",
    tool: "n8n",
    howItFlows: "Lead form / Website message > Auto-save in Google Sheets > Real-time notification to Telegram/Email",
    steps: ["Web Form Submitted", "Webhook Triggered in n8n", "Lead Row Added in Google Sheet", "Telegram Alert Sent to Owner"],
    whatYouSave: "Zero missed customer enquiries",
    bestFor: "Custom, multi-step workflows with fine-grained control",
    example: "Lead form > Google Sheet > Auto-reply email > Team instant alert"
  },
  {
    id: "followup-reminders",
    title: "Automated Client Follow-up Reminders",
    tool: "Zapier",
    howItFlows: "Sheet date check > Scheduled daily trigger > Auto WhatsApp / Email reminder alert",
    steps: ["Scheduled Daily Cron Check", "Filter Pending Deals by Date", "Format Personal Client Message", "WhatsApp / Gmail Sent Automatically"],
    whatYouSave: "Eliminates forgotten client follow-ups & dropped deals",
    bestFor: "Quick, dependable app-to-app connections with zero maintenance",
    example: "New enquiry > Saved in CRM sheet > Scheduled follow-up triggered after 48 hrs"
  },
  {
    id: "auto-reports",
    title: "Scheduled Stock & Sales Email Digest",
    tool: "Power Automate",
    howItFlows: "Daily closing numbers in Excel/SharePoint > Auto-compiled into formatted Outlook email digest",
    steps: ["Evening Closing Trigger (7 PM)", "Pull Summary Tables from Excel/SharePoint", "Generate Clean HTML Summary Table", "Auto-dispatch to Management Team"],
    whatYouSave: "2+ hours of tedious manual daily reporting work",
    bestFor: "Microsoft 365 environments: Excel, Outlook, SharePoint & Microsoft Forms",
    example: "Daily stock & sales report auto-emailed every evening"
  },
  {
    id: "order-alerts",
    title: "Real-time Order Handoff & Dispatch Alerts",
    tool: "n8n",
    howItFlows: "New order received > Approval condition checked > Instant handoff ping to packing team",
    steps: ["Order Received Event", "Verify Payment / Status", "Format Packing Slip Data", "Push to Dispatch Channel"],
    whatYouSave: "Faster handoffs and eliminated order fulfillment delays",
    bestFor: "E-commerce stores, manufacturing depots, and fast-paced retail shops",
    example: "New online order > Manager approval > Logistics team notification"
  }
];

export const TOOL_COMPARISON = [
  {
    tool: "n8n",
    bestFor: "Custom, multi-step workflows with full logic control & webhook integrations",
    example: "Lead form > Google Sheet > Auto-reply email > Telegram/Slack team alert"
  },
  {
    tool: "Zapier",
    bestFor: "Quick app-to-app plug-and-play connections that run reliably in the background",
    example: "New inquiry on web form > Saved to CRM sheet > Confirmation email sent"
  },
  {
    tool: "Power Automate",
    bestFor: "Microsoft 365 ecosystem: Excel, Outlook, SharePoint, OneDrive & Forms",
    example: "Daily inventory & sales summary compiled and auto-emailed to management"
  }
];

export const BACKEND_OFFICE_MODULES: BackendWorkArea[] = [
  {
    id: "stock-inventory",
    title: "Stock & Inventory Control",
    handles: "Daily stock reports, ledger updates, stock replenishment alerts, and shortage prevention.",
    keyOutputs: ["Daily Stock Status", "Reorder Level Warnings", "Physical vs Book Discrepancy Logs"]
  },
  {
    id: "purchase-vendors",
    title: "Purchase & Vendor Tracking",
    handles: "Quotation comparisons, purchase order (PO) generation, status tracking, and vendor communication.",
    keyOutputs: ["PO Register & Delivery Tracking", "Vendor Quotation Matrix", "Payment Due Schedules"]
  },
  {
    id: "data-entry-erp",
    title: "Data Entry & ERP Accuracy",
    handles: "Meticulous ERP entries, master data cleaning, item code standardizations, and Excel audits.",
    keyOutputs: ["Clean Master Records", "ERP Transaction Vouchers", "Zero Duplicate Entries"]
  },
  {
    id: "mis-reports",
    title: "MIS Dashboards & Reports",
    handles: "Daily, weekly, and monthly analytical summaries prepared in Excel and Power BI for decision-makers.",
    keyOutputs: ["Weekly Sales & Consumption Trends", "Executive Summaries", "KPI Dashboards"]
  },
  {
    id: "coordination-files",
    title: "Coordination & File Records",
    handles: "Cross-department follow-ups, dispatch documents, official correspondence, and organized cloud filing.",
    keyOutputs: ["Organized Digital Drive", "Inter-Department Follow-up Logs", "Standardized Document Archives"]
  }
];

export const HOW_I_WORK_STEPS = [
  {
    step: 1,
    title: "Discuss & Scope",
    desc: "We discuss your specific project needs, target audience, preferred aesthetic, and delivery milestones via WhatsApp or Meet."
  },
  {
    step: 2,
    title: "Draft Sample",
    desc: "I create an initial draft, concept preview, or demo workflow so you can evaluate the look and feel before full execution."
  },
  {
    step: 3,
    title: "Client Feedback",
    desc: "You review the sample, provide your valuable feedback, and approve the direction or suggest refinements."
  },
  {
    step: 4,
    title: "Production Delivery",
    desc: "I complete all production deliverables (code, audio master, 9:16 video, vector files, or automated workflow setup)."
  },
  {
    step: 5,
    title: "Free Revision",
    desc: "Every project includes one free revision to ensure the final result matches your exact standards."
  }
];

export const QUOTATION_SERVICES_OPTIONS: QuotationServiceOption[] = [
  {
    id: "web-design",
    name: "Web Design & Development",
    category: "web",
    description: "Mobile-responsive showcase, landing page, or full e-commerce store with WhatsApp ordering.",
    unitScope: "Custom Scope (1-page to Multi-page)"
  },
  {
    id: "voice-narration",
    name: "Voiceover Narration",
    category: "voice",
    description: "Hindi, English, or Gujarati narration for reels, commercial advertisements, or audiobooks.",
    unitScope: "Per Script / Audio Length"
  },
  {
    id: "ugc-content",
    name: "Aesthetic UGC Video",
    category: "ugc",
    description: "Faceless organic video reels for skincare, jewellery, books, and fashion.",
    unitScope: "Per Video / Reel Bundle"
  },
  {
    id: "posters-creatives",
    name: "Posters & Creatives",
    category: "branding",
    description: "Festival creatives, promotional banners, and custom personal gift typography.",
    unitScope: "Per Creative / Print Asset"
  },
  {
    id: "tile-wall-design",
    name: "Tile & Wall Surface Design",
    category: "tile",
    description: "Themed geometric and botanical surface patterns for ceramic tiles and interior walls.",
    unitScope: "Per Pattern Collection"
  },
  {
    id: "logo-design",
    name: "Brand Logo Identity",
    category: "branding",
    description: "Clean aesthetic logo with 2 distinct creative directions, vector files, and palette.",
    unitScope: "2 Concepts + Vector Package"
  },
  {
    id: "automation",
    name: "Business Workflow Automation",
    category: "automation",
    description: "Lead capture, follow-up reminders, and auto-reporting via n8n, Zapier, or Power Automate.",
    unitScope: "Per Automated Pipeline"
  },
  {
    id: "backend-office",
    name: "Backend Office & ERP Retainer",
    category: "office",
    description: "Store inventory, vendor POs, ERP data entry, and weekly Excel/Power BI MIS dashboards.",
    unitScope: "Monthly Dedicated Retainer"
  }
];
