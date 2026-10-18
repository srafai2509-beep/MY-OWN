import React, { useState } from 'react';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ServicesGrid } from './components/ServicesGrid';
import { WorkShowcase } from './components/WorkShowcase';
import { AutomationSection } from './components/AutomationSection';
import { BackendOfficeSection } from './components/BackendOfficeSection';
import { HowIWork } from './components/HowIWork';
import { QuotationFormSection } from './components/QuotationFormSection';
import { ContactSection } from './components/ContactSection';
import { ProjectModal } from './components/ProjectModal';
import { Footer } from './components/Footer';
import { CanvasBackground3D } from './components/3d/CanvasBackground3D';
import { PortfolioProject, ServiceItem, CategoryType } from './types/portfolio';
import { CREATOR_PROFILE } from './data/portfolioData';
import { MessageCircle } from 'lucide-react';

export default function App() {
  const [selectedProject, setSelectedProject] = useState<PortfolioProject | null>(null);
  const [activeWorkFilter, setActiveWorkFilter] = useState<CategoryType>('all');
  const [contactPresetMessage, setContactPresetMessage] = useState<string>('');
  const [selectedQuotationService, setSelectedQuotationService] = useState<string | undefined>(undefined);

  const handleOpenContact = (initialMessage?: string) => {
    if (initialMessage) {
      setContactPresetMessage(initialMessage);
    }
    const contactElem = document.getElementById('contact');
    if (contactElem) {
      contactElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenQuotation = (serviceName?: string) => {
    if (serviceName) {
      setSelectedQuotationService(serviceName);
    }
    const quoteElem = document.getElementById('quotation');
    if (quoteElem) {
      quoteElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleSelectService = (service: ServiceItem) => {
    handleOpenQuotation(service.title);
  };

  const handleFilterWork = (category: string) => {
    setActiveWorkFilter(category as CategoryType);
    const workElem = document.getElementById('work');
    if (workElem) {
      workElem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleInquireFromModal = (projectName: string) => {
    handleOpenQuotation(`Web Design & Development`);
    handleOpenContact(`Hi Sofia, I saw your portfolio work "${projectName}" and would like to discuss a customized project.`);
  };

  return (
    <div className="min-h-screen bg-[#0c0d10] text-[#e4e4e9] font-sans antialiased selection:bg-[#d4af37]/30 selection:text-[#f8f5ee] flex flex-col relative">
      
      {/* Interactive 3D Ambient Particle Mesh Background */}
      <CanvasBackground3D />

      {/* Top Bar Navigation */}
      <Header 
        onOpenContact={handleOpenContact}
        onOpenQuotation={() => handleOpenQuotation()}
      />

      {/* Main Content Sections */}
      <main className="flex-1 relative z-10">
        {/* 3D Hero Section */}
        <Hero 
          onOpenContact={handleOpenContact}
          onOpenQuotation={() => handleOpenQuotation()}
          onExploreWork={() => {
            const el = document.getElementById('work');
            if (el) el.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* About Section with 3D Pillars */}
        <AboutSection />

        {/* 8 Core Services Grid with 3D Tilt Cards */}
        <ServicesGrid 
          onSelectService={handleSelectService}
          onFilterWork={handleFilterWork}
        />

        {/* Selected Portfolio Works Showcase with 3D Tilt & Audio Wave Player */}
        <WorkShowcase 
          onSelectProject={(proj) => setSelectedProject(proj)}
          onOpenContact={handleOpenContact}
          activeFilter={activeWorkFilter}
        />

        {/* Automation Workflows Deep-Dive & Logo Design */}
        <AutomationSection onOpenContact={handleOpenContact} />

        {/* Backend Office & ERP Work with 3D Retainer Card */}
        <BackendOfficeSection onOpenContact={handleOpenContact} />

        {/* 5-Step Process */}
        <HowIWork />

        {/* Custom Quotation Form & 3D Live Project Ticket (Sends email to srafai.6768@gmail.com) */}
        <QuotationFormSection presetService={selectedQuotationService} />

        {/* Contact & Free Quote Section */}
        <ContactSection 
          presetMessage={contactPresetMessage}
          onOpenQuotation={() => handleOpenQuotation()}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Lightbox Modal */}
      <ProjectModal 
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
        onInquire={handleInquireFromModal}
      />

      {/* Floating Discrete WhatsApp Trigger */}
      <a
        href={`https://wa.me/${CREATOR_PROFILE.phone}?text=Hi%20Sofia,%20I'm%20visiting%20your%20portfolio%20and%20would%20like%20to%20request%20a%20project%20quotation.`}
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-30 flex items-center gap-2.5 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-full shadow-xl shadow-black/50 text-xs font-semibold tracking-wide transition-all duration-300 hover:scale-105 active:scale-95"
        aria-label="Direct WhatsApp message"
      >
        <MessageCircle className="w-4 h-4" />
        <span className="hidden sm:inline">WhatsApp Sofia</span>
      </a>

    </div>
  );
}
