export type CategoryType = 'all' | 'web' | 'voice' | 'ugc' | 'tile' | 'branding' | 'automation' | 'office';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  category: CategoryType;
  turnaround: string;
  scopeBadge: string;
  highlights: string[];
  deliverables: string;
}

export interface PortfolioProject {
  id: string;
  title: string;
  category: CategoryType;
  subtitle: string;
  description: string;
  image?: string;
  tags: string[];
  deliverables: string[];
  languages?: string[];
  metricsOrOutcome?: string;
  accentColor?: string;
  audioSample?: {
    language: string;
    duration: string;
    tone: string;
    scriptSnippet: string;
  };
}

export interface AutomationWorkflow {
  id: string;
  title: string;
  tool: 'n8n' | 'Zapier' | 'Power Automate';
  howItFlows: string;
  steps: string[];
  whatYouSave: string;
  bestFor: string;
  example: string;
}

export interface BackendWorkArea {
  id: string;
  title: string;
  handles: string;
  keyOutputs: string[];
}

export interface QuotationServiceOption {
  id: string;
  name: string;
  category: CategoryType;
  description: string;
  unitScope: string;
  options?: string[];
}

export interface QuoteFormData {
  name: string;
  email: string;
  phone: string;
  companyOrBrand: string;
  services: string[];
  projectTimeline: string;
  budgetPreference: string;
  languagePreference: string;
  projectBrief: string;
}
