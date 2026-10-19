import React, { useState } from 'react';
import { CREATOR_PROFILE, SERVICES_LIST } from '../data/portfolioData';
import { TiltCard3D } from './3d/TiltCard3D';
import { 
  MessageCircle, 
  Mail, 
  MapPin, 
  Send, 
  CheckCircle,
  Copy,
  ExternalLink
} from 'lucide-react';

interface ContactSectionProps {
  presetMessage?: string;
  onOpenQuotation?: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ presetMessage = '', onOpenQuotation }) => {
  const [formData, setFormData] = useState({
    name: '',
    contactInfo: '',
    service: 'Web Design',
    details: presetMessage,
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [copiedPhone1, setCopiedPhone1] = useState(false);
  const [copiedPhone2, setCopiedPhone2] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, type: 'email' | 'phone1' | 'phone2') => {
    navigator.clipboard.writeText(text);
    if (type === 'email') {
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2000);
    } else if (type === 'phone1') {
      setCopiedPhone1(true);
      setTimeout(() => setCopiedPhone1(false), 2000);
    } else {
      setCopiedPhone2(true);
      setTimeout(() => setCopiedPhone2(false), 2000);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = `Hi Sofia,\n\nName: ${formData.name || 'Client'}\nContact: ${formData.contactInfo}\nInterested in: ${formData.service}\n\nProject Details:\n${formData.details || 'Please share demo samples and project quotation.'}`;
    
    // Open directly in WhatsApp
    const encoded = encodeURIComponent(formattedMessage);
    window.open(`https://wa.me/${CREATOR_PROFILE.primaryPhone}?text=${encoded}`, '_blank');
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 border-b border-white/[0.08] bg-[#0e0f13] relative overflow-hidden">
      
      {/* Ambient background glow */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute bottom-0 left-1/3 w-[550px] h-[550px] bg-[#d4af37]/[0.05] rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Banner matching PDF page 6 bottom */}
        <div className="p-8 sm:p-12 bg-gradient-to-br from-[#1a1b24] via-[#14151c] to-[#121318] border-2 border-[#d4af37]/60 rounded-sm mb-16 shadow-2xl relative">
          <div className="max-w-3xl">
            <div className="text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
              Start a Conversation
            </div>

            <h2 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold text-white mb-4">
              Let&apos;s create something together!
            </h2>

            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed mb-6">
              Message me for demo samples, custom project consultations, or quotation inquiries. As a dedicated fresher, I put 100% effort, genuine care, and prompt communication into every project.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[#f4ecd8]">
              <span>Sofia Rafai · Freelance Creator</span>
              <span className="text-zinc-600">|</span>
              <span>Mumbai · Rajkot, Gujarat</span>
              <span className="text-zinc-600">|</span>
              <span className="text-[#d4af37]">{CREATOR_PROFILE.email}</span>
            </div>
          </div>
        </div>

        {/* Contact Split: Direct Channels vs Instant Inquiry Form */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct channels with 3D Tilt */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* WhatsApp / Phone 1 */}
            <TiltCard3D maxTilt={6} glareOpacity={0.15}>
              <div className="p-6 bg-[#121318] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 font-medium">WhatsApp & Call (Primary)</div>
                      <div className="text-base font-bold text-white font-mono">{CREATOR_PROFILE.primaryPhone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(CREATOR_PROFILE.primaryPhone, 'phone1')}
                      className="p-2 text-zinc-400 hover:text-white rounded-xs transition-colors cursor-pointer"
                      title="Copy phone"
                    >
                      {copiedPhone1 ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`https://wa.me/${CREATOR_PROFILE.primaryPhone}?text=Hi%20Sofia,%20I%20would%20like%20to%20discuss%20a%20freelance%20project.`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-[#d4af37] hover:text-[#e2c158] transition-colors"
                      title="Open WhatsApp"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard3D>

            {/* Direct Phone 2 */}
            <TiltCard3D maxTilt={6} glareOpacity={0.15}>
              <div className="p-6 bg-[#121318] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-blue-500/10 text-blue-400 flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 font-medium">Direct Line & WhatsApp (Alternate)</div>
                      <div className="text-base font-bold text-white font-mono">{CREATOR_PROFILE.secondaryPhone}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(CREATOR_PROFILE.secondaryPhone, 'phone2')}
                      className="p-2 text-zinc-400 hover:text-white rounded-xs transition-colors cursor-pointer"
                      title="Copy phone"
                    >
                      {copiedPhone2 ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`https://wa.me/${CREATOR_PROFILE.secondaryPhone}?text=Hi%20Sofia,%20I%20would%20like%20to%20discuss%20a%20freelance%20project.`}
                      target="_blank"
                      rel="noreferrer"
                      className="p-2 text-[#d4af37] hover:text-[#e2c158] transition-colors"
                      title="Open WhatsApp"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard3D>

            {/* Email */}
            <TiltCard3D maxTilt={6} glareOpacity={0.15}>
              <div className="p-6 bg-[#121318] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-sm bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center">
                      <Mail className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="text-xs text-zinc-400 font-medium">Official Email (Direct)</div>
                      <div className="text-sm font-semibold text-white font-mono break-all">{CREATOR_PROFILE.email}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1">
                    <button
                      type="button"
                      onClick={() => handleCopy(CREATOR_PROFILE.email, 'email')}
                      className="p-2 text-zinc-400 hover:text-white rounded-xs transition-colors cursor-pointer"
                      title="Copy email"
                    >
                      {copiedEmail ? <CheckCircle className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                    </button>
                    <a
                      href={`mailto:${CREATOR_PROFILE.email}?subject=Freelance%20Project%20Inquiry%20-%20Sofia%20Rafai`}
                      className="p-2 text-[#d4af37] hover:text-[#e2c158] transition-colors"
                      title="Send Email"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </TiltCard3D>

            {/* Location */}
            <TiltCard3D maxTilt={6} glareOpacity={0.15}>
              <div className="p-6 bg-[#121318] border border-white/[0.08] rounded-sm">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-sm bg-white/[0.05] text-zinc-300 flex items-center justify-center">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs text-zinc-400 font-medium">Placed In / Base Location</div>
                    <div className="text-sm font-semibold text-white">Mumbai · Rajkot, Gujarat</div>
                    <div className="text-[11px] text-zinc-400">Available remotely & on-site across Mumbai, Gujarat & worldwide</div>
                  </div>
                </div>
              </div>
            </TiltCard3D>

          </div>

          {/* Right Column: Direct Message Composer */}
          <div className="lg:col-span-7 p-8 bg-[#121318] border border-white/[0.08] rounded-sm">
            <h3 className="font-cormorant text-2xl font-bold text-white mb-2">
              Send a Quick Message
            </h3>
            <p className="text-xs text-zinc-400 mb-6 font-light">
              Need a fast answer or want to discuss project terms? Reach out directly, or use the dedicated{' '}
              <a href="#quotation" className="text-[#d4af37] underline hover:text-[#e2c158]">
                Quotation Builder
              </a>{' '}
              to get a complete written proposal.
            </p>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Your Name / Business Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Patel / Sweet Shop"
                    className="w-full px-4 py-2.5 bg-[#181922] border border-white/[0.1] rounded-xs text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                    Phone or Email *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.contactInfo}
                    onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
                    placeholder="WhatsApp number or email"
                    className="w-full px-4 py-2.5 bg-[#181922] border border-white/[0.1] rounded-xs text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Interested Service
                </label>
                <select
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#181922] border border-white/[0.1] rounded-xs text-xs text-white focus:outline-none focus:border-[#d4af37]"
                >
                  {SERVICES_LIST.map((srv) => (
                    <option key={srv.id} value={srv.title} className="bg-[#121318] text-white">
                      {srv.title} ({srv.turnaround})
                    </option>
                  ))}
                  <option value="Custom Project / Multiple Services" className="bg-[#121318] text-white">
                    Custom Project / Multiple Services Bundle
                  </option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-medium text-zinc-300 mb-1.5">
                  Project Notes or Questions
                </label>
                <textarea
                  rows={4}
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  placeholder="Tell me what you are building, target dates, or requested samples..."
                  className="w-full px-4 py-2.5 bg-[#181922] border border-white/[0.1] rounded-xs text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#d4af37]"
                />
              </div>

              <div className="pt-2 flex items-center justify-between">
                <span className="text-[11px] text-zinc-400">
                  Quick response within a few hours.
                </span>

                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] transition-all rounded-xs shadow-md cursor-pointer active:scale-95"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send via WhatsApp</span>
                </button>
              </div>

              {submitted && (
                <div className="p-3 bg-emerald-500/10 border border-emerald-500/30 rounded-xs text-xs text-emerald-300 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Your message has been formatted and opened in WhatsApp!</span>
                </div>
              )}
            </form>
          </div>

        </div>

      </div>
    </section>
  );
};
