import React from 'react';
import { ArrowUpRight, MessageCircle, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { TiltCard3D } from './3d/TiltCard3D';

interface HeroProps {
  onOpenContact: (initialMessage?: string) => void;
  onExploreWork: () => void;
  onOpenQuotation: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenContact, onExploreWork, onOpenQuotation }) => {
  return (
    <section className="relative pt-8 pb-16 lg:pt-20 lg:pb-28 overflow-hidden border-b border-white/[0.08]">
      
      {/* Subtle ambient luxury gold illumination in background */}
      <div 
        aria-hidden="true" 
        className="pointer-events-none absolute -top-40 right-1/4 w-[650px] h-[650px] bg-[#d4af37]/[0.06] rounded-full blur-3xl -z-10"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Split Hero: Left typographic hierarchy + Right 3D visual container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Typographic Hierarchy */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Clean unboxed kicker with subtle separator */}
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase">
              <span>Freelance Portfolio</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">Rajkot, Gujarat</span>
            </div>

            {/* Main Headline */}
            <h1 className="font-cormorant text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-[1.1] text-balance">
              Everything creative,{' '}
              <span className="italic font-normal text-[#f4ecd8] border-b-2 border-[#d4af37]/60 pb-1">
                under one roof.
              </span>
            </h1>

            {/* Lead copy */}
            <p className="text-base sm:text-lg text-zinc-300 font-light leading-relaxed max-w-2xl text-pretty">
              {CREATOR_PROFILE.bio}
            </p>

            {/* Direct unboxed capability highlight */}
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 text-xs text-zinc-400 pt-2 border-t border-white/[0.06]">
              <span className="text-zinc-200 font-medium">Core Capabilities:</span>
              <span>Web Design</span>
              <span aria-hidden="true">·</span>
              <span>Voice Narration</span>
              <span aria-hidden="true">·</span>
              <span>UGC Content</span>
              <span aria-hidden="true">·</span>
              <span>Tile & Wall Patterns</span>
              <span aria-hidden="true">·</span>
              <span>Logos</span>
              <span aria-hidden="true">·</span>
              <span>Automations (n8n & Zapier)</span>
              <span aria-hidden="true">·</span>
              <span>Office ERP</span>
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 pt-4">
              <button
                type="button"
                onClick={onOpenQuotation}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] transition-all rounded-sm shadow-xl shadow-[#d4af37]/15 active:scale-95 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Request Custom Quotation</span>
              </button>

              <button
                type="button"
                onClick={onExploreWork}
                className="inline-flex items-center gap-2 px-6 py-3.5 text-xs font-semibold uppercase tracking-widest text-zinc-200 hover:text-white bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.12] transition-all rounded-sm active:scale-95 cursor-pointer"
              >
                <span>View Portfolio Samples</span>
                <ArrowUpRight className="w-4 h-4 text-[#d4af37]" />
              </button>
            </div>

            {/* Guarantee reassurance */}
            <div className="flex items-center gap-3 pt-2 text-xs text-zinc-400">
              <CheckCircle2 className="w-4 h-4 text-[#d4af37] shrink-0" />
              <span>{CREATOR_PROFILE.guarantee}</span>
            </div>

          </div>

          {/* Right Column: Hero Visual Container with 3D Tilt */}
          <div className="lg:col-span-5 relative">
            <TiltCard3D
              maxTilt={12}
              glareOpacity={0.25}
              className="p-2 border border-[#d4af37]/40 bg-[#121318] shadow-2xl rounded-sm group relative"
            >
              {/* Outer decorative corner marks */}
              <div className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-[#d4af37]" />
              <div className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-[#d4af37]" />
              <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-[#d4af37]" />
              <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-[#d4af37]" />

              <div className="aspect-[4/3] sm:aspect-[16/11] overflow-hidden rounded-xs bg-[#181920] relative">
                <img
                  src={CREATOR_PROFILE.heroImage}
                  alt="Sofia Rafai creative workspace with design mockups, audio narration microphone, and stationery"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  referrerPolicy="no-referrer"
                  loading="eager"
                />
                
                {/* Contrast scrim */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20 pointer-events-none" />

                {/* Quiet photo caption overlay */}
                <div className="absolute bottom-3 left-3 right-3 text-left">
                  <div className="text-[11px] font-cinzel font-semibold tracking-wider text-[#f4ecd8] drop-shadow-md">
                    CREATIVE STUDIO · SOFIA RAFAI
                  </div>
                  <div className="text-[10px] text-zinc-300 drop-shadow">
                    Rajkot, Gujarat · Websites · Voiceovers · Workflows
                  </div>
                </div>
              </div>

              {/* Floating 3D Stamp */}
              <div 
                style={{ transform: 'translateZ(30px)' }}
                className="absolute -bottom-3 -right-3 px-3 py-1.5 bg-[#161720]/95 border border-[#d4af37]/60 rounded-xs shadow-xl text-[10px] font-mono text-[#f4ecd8] flex items-center gap-1.5 backdrop-blur-sm hidden sm:flex"
              >
                <div className="w-2 h-2 rounded-full bg-[#d4af37] animate-pulse" />
                <span>Open for Commissions</span>
              </div>
            </TiltCard3D>
          </div>

        </div>

        {/* Full-width 4-column KPI / Trust Strip below the hero split */}
        <div className="mt-16 pt-8 border-t border-white/[0.08] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          
          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-zinc-400">Experience Stage</div>
            <div className="text-xl font-bold font-cormorant text-[#f4ecd8]">Fresher & 100% Dedicated</div>
            <div className="text-xs text-zinc-400">All original self-created samples</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-zinc-400">Languages Spoken</div>
            <div className="text-xl font-bold font-cormorant text-[#f4ecd8]">Hindi, English, Gujarati</div>
            <div className="text-xs text-zinc-400">Natural tone & native fluency</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-zinc-400">Aesthetic Philosophy</div>
            <div className="text-xl font-bold font-cormorant text-[#f4ecd8]">Soft, Clean & Aesthetic</div>
            <div className="text-xs text-zinc-400">Balanced with real business sense</div>
          </div>

          <div className="space-y-1">
            <div className="text-xs uppercase tracking-wider text-zinc-400">Turnaround & Revisions</div>
            <div className="text-xl font-bold font-cormorant text-[#f4ecd8]">Fast + 1 Free Revision</div>
            <div className="text-xs text-zinc-400">Clear communication at each step</div>
          </div>

        </div>

      </div>
    </section>
  );
};
