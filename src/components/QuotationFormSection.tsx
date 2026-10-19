import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { QUOTATION_SERVICES_OPTIONS, CREATOR_PROFILE } from '../data/portfolioData';
import { TiltCard3D } from './3d/TiltCard3D';
import { 
  Send, 
  CheckCircle2, 
  FileCheck, 
  Clock, 
  Sparkles, 
  MessageCircle, 
  Mail, 
  Layers, 
  ShieldCheck, 
  ExternalLink,
  RotateCcw,
  Eye,
  Info
} from 'lucide-react';

interface QuotationFormSectionProps {
  presetService?: string;
}

export const QuotationFormSection: React.FC<QuotationFormSectionProps> = ({ presetService }) => {
  const [selectedServices, setSelectedServices] = useState<string[]>(
    presetService ? [presetService] : ['Web Design & Development']
  );

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    companyOrBrand: '',
    projectTimeline: '1–2 Weeks',
    budgetPreference: 'Bespoke / Flexible',
    languagePreference: 'English & Hindi',
    projectBrief: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    id: string;
    directMailtoUrl: string;
    directWhatsAppUrl: string;
    directWhatsAppUrlAlt: string;
    targetEmail: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Toggle service selection
  const handleToggleService = (serviceName: string) => {
    setSelectedServices(prev => 
      prev.includes(serviceName)
        ? prev.filter(s => s !== serviceName)
        : [...prev, serviceName]
    );
  };

  // Submit quote to backend
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedServices.length === 0) {
      setErrorMsg('Please select at least one service for your quotation.');
      return;
    }
    setErrorMsg(null);
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/quote', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          businessType: formData.companyOrBrand || 'Individual / Brand',
          services: selectedServices,
          timeline: formData.projectTimeline,
          budgetRange: formData.budgetPreference,
          preferredLanguage: formData.languagePreference,
          description: formData.projectBrief,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Trigger celebratory 3D confetti burst
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#d4af37', '#f4ecd8', '#ffffff', '#aa7c11'],
        });

        setSubmittedData({
          id: data.quote.id,
          directMailtoUrl: data.directMailtoUrl,
          directWhatsAppUrl: data.directWhatsAppUrl,
          directWhatsAppUrlAlt: data.directWhatsAppUrlAlt || `https://wa.me/${CREATOR_PROFILE.secondaryPhone}`,
          targetEmail: data.targetEmail,
        });
      } else {
        setErrorMsg(data.error || 'Failed to submit quote. Please use WhatsApp or email directly.');
      }
    } catch (err) {
      console.error('Submission error:', err);
      // Fallback: create mailto and whatsapp url on client
      const fallbackMailto = `mailto:${CREATOR_PROFILE.email}?subject=${encodeURIComponent(
        `Quotation Request from ${formData.name || 'Client'}`
      )}&body=${encodeURIComponent(
        `Hi Sofia,\n\nName: ${formData.name}\nPhone: ${formData.phone}\nEmail: ${formData.email}\nServices: ${selectedServices.join(', ')}\nTimeline: ${formData.projectTimeline}\nNotes: ${formData.projectBrief}`
      )}`;
      
      const fallbackWhatsApp = `https://wa.me/${CREATOR_PROFILE.primaryPhone}?text=${encodeURIComponent(
        `Hi Sofia, I'm requesting a quotation for:\n• Services: ${selectedServices.join(', ')}\n• Timeline: ${formData.projectTimeline}\n• From: ${formData.name} (${formData.phone})`
      )}`;

      const fallbackWhatsAppAlt = `https://wa.me/${CREATOR_PROFILE.secondaryPhone}?text=${encodeURIComponent(
        `Hi Sofia, I'm requesting a quotation for:\n• Services: ${selectedServices.join(', ')}\n• Timeline: ${formData.projectTimeline}\n• From: ${formData.name} (${formData.phone})`
      )}`;

      setSubmittedData({
        id: `OFFLINE-${Date.now()}`,
        directMailtoUrl: fallbackMailto,
        directWhatsAppUrl: fallbackWhatsApp,
        directWhatsAppUrlAlt: fallbackWhatsAppAlt,
        targetEmail: CREATOR_PROFILE.email,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedData(null);
    setSelectedServices(['Web Design & Development']);
    setFormData({
      name: '',
      email: '',
      phone: '',
      companyOrBrand: '',
      projectTimeline: '1–2 Weeks',
      budgetPreference: 'Bespoke / Flexible',
      languagePreference: 'English & Hindi',
      projectBrief: '',
    });
  };

  return (
    <section id="quotation" className="py-24 border-b border-white/[0.08] bg-[#0c0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
            <span>Tailored Project Pricing</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-400">Direct Email to Sofia</span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Request a Custom Quotation
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            Select the services you need, specify your milestones and requirements, and submit. The details are immediately emailed directly to <span className="text-white font-medium">{CREATOR_PROFILE.email}</span> so Sofia can review and get back to you with a customized project proposal.
          </p>
        </div>

        {submittedData ? (
          /* Success Screen with Confirmation and Instant Fallbacks */
          <div className="p-8 sm:p-12 bg-gradient-to-br from-[#161722] via-[#121319] to-[#0e0f14] border-2 border-[#d4af37]/60 rounded-sm shadow-2xl max-w-3xl mx-auto text-center space-y-6">
            <div className="w-16 h-16 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/40 flex items-center justify-center text-[#d4af37] mx-auto animate-bounce">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-[#d4af37] font-semibold">
                Quotation Request Logged · Ref: {submittedData.id}
              </div>
              <h3 className="font-cormorant text-3xl sm:text-4xl font-bold text-white">
                Thank you, {formData.name || 'Friend'}!
              </h3>
              <p className="text-sm text-zinc-300 max-w-lg mx-auto">
                Your quotation request has been compiled and dispatched to <span className="text-[#f4ecd8] font-mono">{submittedData.targetEmail}</span>. Sofia will review your scope and respond shortly.
              </p>
            </div>

            <div className="p-4 bg-black/40 border border-white/[0.08] rounded-xs text-xs text-left text-zinc-300 max-w-lg mx-auto space-y-2 font-mono">
              <div><span className="text-zinc-500">Services:</span> {selectedServices.join(', ')}</div>
              <div><span className="text-zinc-500">Timeline:</span> {formData.projectTimeline}</div>
              {formData.phone && <div><span className="text-zinc-500">Contact:</span> {formData.phone}</div>}
            </div>

            {/* Instant Direct Redundancy Links */}
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <a
                href={submittedData.directWhatsAppUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] transition-all rounded-xs shadow-md cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (Primary: {CREATOR_PROFILE.primaryPhone})</span>
              </a>

              <a
                href={submittedData.directWhatsAppUrlAlt}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-100 bg-emerald-700/80 hover:bg-emerald-600 transition-all rounded-xs shadow-md cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp (Alt: {CREATOR_PROFILE.secondaryPhone})</span>
              </a>

              <a
                href={submittedData.directMailtoUrl}
                className="inline-flex items-center gap-2 px-5 py-3 text-xs font-semibold uppercase tracking-widest text-zinc-200 hover:text-white bg-white/[0.05] hover:bg-white/[0.1] border border-white/[0.15] transition-all rounded-xs cursor-pointer"
              >
                <Mail className="w-4 h-4 text-[#d4af37]" />
                <span>Open in Mail App</span>
              </a>

              <button
                type="button"
                onClick={handleReset}
                className="inline-flex items-center gap-1.5 px-4 py-3 text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Submit Another Request</span>
              </button>
            </div>
          </div>
        ) : (
          /* The Quotation Builder: Interactive Form + 3D Live Project Ticket */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
            
            {/* Left 7 Columns: The Interactive Form */}
            <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-8">
              
              {/* Step 1: Select Services */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center text-[10px] font-mono">1</span>
                    <span>Select Required Services *</span>
                  </label>
                  <span className="text-[11px] text-zinc-400">
                    {selectedServices.length} selected
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {QUOTATION_SERVICES_OPTIONS.map((srv) => {
                    const isSelected = selectedServices.includes(srv.name);
                    return (
                      <button
                        type="button"
                        key={srv.id}
                        onClick={() => handleToggleService(srv.name)}
                        className={`p-3.5 text-left border rounded-xs transition-all cursor-pointer flex flex-col justify-between ${
                          isSelected
                            ? 'bg-[#d4af37]/10 border-[#d4af37] text-white shadow-sm'
                            : 'bg-[#121318] border-white/[0.08] text-zinc-400 hover:border-white/[0.2] hover:text-zinc-200'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <span className="text-xs font-semibold text-white">
                            {srv.name}
                          </span>
                          <span className={`w-4 h-4 rounded-xs border flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected ? 'bg-[#d4af37] border-[#d4af37] text-[#0c0d10]' : 'border-zinc-600'
                          }`}>
                            {isSelected && '✓'}
                          </span>
                        </div>
                        <span className="text-[10px] text-zinc-400 leading-tight">
                          {srv.unitScope}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Step 2: Project Parameters */}
              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center text-[10px] font-mono">2</span>
                  <span>Target Milestones & Scope</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Target Timeline</label>
                    <select
                      value={formData.projectTimeline}
                      onChange={(e) => setFormData({ ...formData, projectTimeline: e.target.value })}
                      className="w-full px-3 py-2 bg-[#14151d] border border-white/[0.1] rounded-xs text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Urgent (24–48 Hours)">Urgent (24–48 Hours)</option>
                      <option value="1–2 Weeks">1–2 Weeks</option>
                      <option value="2–4 Weeks">2–4 Weeks</option>
                      <option value="Monthly Ongoing Retainer">Monthly Ongoing Retainer</option>
                      <option value="Flexible Timeline">Flexible Timeline</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Scope Preference</label>
                    <select
                      value={formData.budgetPreference}
                      onChange={(e) => setFormData({ ...formData, budgetPreference: e.target.value })}
                      className="w-full px-3 py-2 bg-[#14151d] border border-white/[0.1] rounded-xs text-xs text-white focus:outline-none focus:border-[#d4af37]"
                    >
                      <option value="Starter / Local Small Business">Starter / Local Small Business</option>
                      <option value="Growing Commercial Brand">Growing Commercial Brand</option>
                      <option value="Comprehensive Bespoke Package">Comprehensive Bespoke Package</option>
                      <option value="Monthly Dedicated Support Retainer">Monthly Dedicated Support Retainer</option>
                      <option value="Bespoke / Flexible">Bespoke / Flexible</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Step 3: Contact Info */}
              <div className="space-y-4 pt-4 border-t border-white/[0.08]">
                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-300 flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center text-[10px] font-mono">3</span>
                  <span>Your Contact Details</span>
                </label>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Your Full Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Anand Mehta"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#14151d] border border-white/[0.1] rounded-xs text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Company / Brand Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Swaminarayan Sweets / Gym"
                      value={formData.companyOrBrand}
                      onChange={(e) => setFormData({ ...formData, companyOrBrand: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#14151d] border border-white/[0.1] rounded-xs text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">Email Address (For Quote PDF) *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. anand@business.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#14151d] border border-white/[0.1] rounded-xs text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-zinc-400 mb-1">WhatsApp / Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. +91 98765 43210"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-[#14151d] border border-white/[0.1] rounded-xs text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] text-zinc-400 mb-1">
                    Project Requirements / Specific Needs
                  </label>
                  <textarea
                    rows={3}
                    placeholder="Describe your design vision, website features, audio script details, or automation objectives..."
                    value={formData.projectBrief}
                    onChange={(e) => setFormData({ ...formData, projectBrief: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-[#14151d] border border-white/[0.1] rounded-xs text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              {errorMsg && (
                <div className="p-3 bg-red-500/10 border border-red-500/30 text-red-300 text-xs rounded-xs">
                  {errorMsg}
                </div>
              )}

              {/* Submit CTA */}
              <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-[11px] text-zinc-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#d4af37]" />
                  <span>100% confidential. No spam. Direct email to Sofia Rafai.</span>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] transition-all rounded-xs shadow-lg shadow-[#d4af37]/20 active:scale-95 cursor-pointer disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Sending Request...' : 'Send Quotation Request'}</span>
                </button>
              </div>

            </form>

            {/* Right 5 Columns: 3D Interactive Floating Project Ticket */}
            <div className="lg:col-span-5 sticky top-28">
              <TiltCard3D
                maxTilt={10}
                glareOpacity={0.3}
                className="p-6 sm:p-8 bg-gradient-to-b from-[#181924] via-[#13141a] to-[#0f1015] border border-[#d4af37]/40 rounded-sm shadow-2xl relative"
              >
                {/* Visual Gold Stamp */}
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/[0.08]">
                  <div>
                    <div className="text-[10px] font-mono tracking-widest text-[#d4af37] uppercase">
                      LIVE SPECIFICATION PREVIEW
                    </div>
                    <div className="font-cormorant text-2xl font-bold text-white">
                      Custom Project Dossier
                    </div>
                  </div>
                  <div className="w-9 h-9 rounded-full bg-[#d4af37]/10 border border-[#d4af37]/30 flex items-center justify-center text-[#d4af37]">
                    <Sparkles className="w-4 h-4" />
                  </div>
                </div>

                {/* Selected Services Preview */}
                <div className="space-y-4 mb-6">
                  <div className="text-xs uppercase tracking-wider text-zinc-400 font-medium">
                    Requested Disciplines:
                  </div>

                  {selectedServices.length === 0 ? (
                    <div className="text-xs text-zinc-500 italic p-3 bg-black/30 rounded-xs border border-white/[0.04]">
                      Select services on the left to build your custom package...
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {selectedServices.map((srv, idx) => (
                        <div
                          key={idx}
                          className="p-2.5 bg-white/[0.03] border border-white/[0.06] rounded-xs flex items-center justify-between text-xs text-zinc-200"
                        >
                          <span className="font-medium text-[#f4ecd8]">{srv}</span>
                          <span className="text-[10px] text-[#d4af37] font-mono">Bespoke</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Metadata specs */}
                <div className="p-4 bg-black/40 border border-white/[0.06] rounded-xs space-y-2 text-xs mb-6 font-mono">
                  <div className="flex justify-between text-zinc-400">
                    <span>Target Timeline:</span>
                    <span className="text-white font-medium">{formData.projectTimeline}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Scope Model:</span>
                    <span className="text-white font-medium">{formData.budgetPreference}</span>
                  </div>
                  <div className="flex justify-between text-zinc-400">
                    <span>Client Name:</span>
                    <span className="text-white font-medium">{formData.name || 'Pending'}</span>
                  </div>
                </div>

                {/* Guarantee */}
                <div className="space-y-2 text-[11px] text-zinc-400 border-t border-white/[0.06] pt-4">
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>One free revision included with every deliverable</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>Quick turnaround with transparent step-by-step review</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-zinc-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#d4af37]" />
                    <span>WhatsApp / Calls: {CREATOR_PROFILE.primaryPhone} | {CREATOR_PROFILE.secondaryPhone}</span>
                  </div>
                </div>
              </TiltCard3D>
            </div>

          </div>
        )}

      </div>
    </section>
  );
};
