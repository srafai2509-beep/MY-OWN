import React from 'react';
import { BACKEND_OFFICE_MODULES, CREATOR_PROFILE } from '../data/portfolioData';
import { TiltCard3D } from './3d/TiltCard3D';
import { 
  Building2, 
  Boxes, 
  FileSpreadsheet, 
  BarChart3, 
  FolderSync, 
  CheckCircle2, 
  CalendarClock,
  ArrowRight
} from 'lucide-react';

interface BackendOfficeSectionProps {
  onOpenContact: (initialMessage?: string) => void;
}

export const BackendOfficeSection: React.FC<BackendOfficeSectionProps> = ({ onOpenContact }) => {
  return (
    <section id="office" className="py-24 border-b border-white/[0.08] bg-[#0c0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
            <span>Operational Precision</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-400">Real Industry Experience</span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Backend Office & ERP Operations
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            Hands-on office support from someone with real manufacturing-company experience in store, purchase, and inventory — ensuring your daily records stay organized, accurate, and completely on time.
          </p>
        </div>

        {/* Grid of 5 Modules + Monthly Retainer Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: 5 Work Pillars */}
          <div className="lg:col-span-7 space-y-4">
            {BACKEND_OFFICE_MODULES.map((module, idx) => (
              <div
                key={module.id}
                className="p-5 bg-[#121318] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/40 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase font-mono">
                      Module 0{idx + 1}
                    </div>
                    <h3 className="font-cormorant text-xl font-bold text-white">
                      {module.title}
                    </h3>
                    <p className="text-xs text-zinc-300 leading-relaxed font-light">
                      {module.handles}
                    </p>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-white/[0.06] flex flex-wrap gap-2 text-[11px] text-zinc-400">
                  {module.keyOutputs.map((out, oIdx) => (
                    <span key={oIdx} className="inline-flex items-center gap-1 bg-white/[0.03] px-2 py-0.5 rounded-xs">
                      <CheckCircle2 className="w-3 h-3 text-[#d4af37]" />
                      <span>{out}</span>
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Right Column: Monthly Support Plan Retainer Card with 3D Tilt */}
          <div className="lg:col-span-5 sticky top-28 space-y-6">
            <TiltCard3D
              maxTilt={10}
              glareOpacity={0.3}
              className="p-8 bg-gradient-to-b from-[#181924] to-[#121318] border-2 border-[#d4af37]/50 rounded-sm shadow-2xl relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#d4af37]/10 rounded-full blur-2xl pointer-events-none" />

              <div className="text-xs font-semibold tracking-widest text-[#d4af37] uppercase mb-2">
                Dedicated Remote Retainer
              </div>

              <h3 className="font-cormorant text-3xl font-bold text-white mb-2">
                Monthly Office Support Plan
              </h3>

              <div className="my-6 p-4 bg-black/40 border border-[#d4af37]/30 rounded-xs">
                <div className="text-xs text-zinc-400 mb-1">Engagement Model</div>
                <div className="text-2xl font-bold font-cormorant text-[#f4ecd8]">
                  Tailored Monthly Retainer
                </div>
                <div className="text-[11px] text-zinc-400 mt-1">
                  Remote work · Scope and daily hours decided together based on your team&apos;s workload.
                </div>
              </div>

              <ul className="space-y-3 mb-8 text-xs text-zinc-300">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Dedicated daily availability for store & inventory ledger updates</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Timely vendor quotation follow-ups & PO status log</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Weekly Excel & Power BI dashboard reports for management</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>Strict confidentiality for enterprise documents & accounting files</span>
                </li>
              </ul>

              <button
                type="button"
                onClick={() => onOpenContact("Hi Sofia, I'm interested in discussing your Monthly Office Support Plan for my business.")}
                className="w-full py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] transition-all rounded-sm shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
              >
                <span>Request Retainer Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="mt-4 text-center text-[11px] text-zinc-400">
                Direct WhatsApp contact: {CREATOR_PROFILE.phone}
              </div>
            </TiltCard3D>
          </div>

        </div>

      </div>
    </section>
  );
};
