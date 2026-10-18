import React from 'react';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { TiltCard3D } from './3d/TiltCard3D';
import { MapPin, Globe, Palette, ShieldCheck, HeartHandshake } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="py-24 border-b border-white/[0.08] bg-[#0e0f13] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-3">
            <span>Fresher · Full Effort Guarantee</span>
          </div>

          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-6">
            A fresh creative eye backed by practical business systems.
          </h2>

          <p className="text-zinc-300 text-base sm:text-lg font-light leading-relaxed mb-6">
            Hi, I&apos;m <span className="font-medium text-white">Sofia Rafai</span>, a creative freelancer from Rajkot, Gujarat. 
            I bring together visual design, multilingual voice narration, user-generated video content, and real backend business automations under one unified workflow.
          </p>

          <blockquote className="p-6 bg-[#13141a] border border-[#d4af37]/30 rounded-sm relative text-zinc-200 text-sm sm:text-base italic leading-relaxed">
            &ldquo;I am a fresher, so every sample you see is created by me, and I put full effort into each project.&rdquo;
            <div className="mt-2 not-italic text-xs text-[#d4af37] font-semibold tracking-wider uppercase">
              — Sofia Rafai, Rajkot
            </div>
          </blockquote>
        </div>

        {/* 3 Core pillars with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          <TiltCard3D
            maxTilt={9}
            glareOpacity={0.2}
            className="p-6 bg-[#121318] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/50 transition-colors shadow-lg"
          >
            <div className="w-10 h-10 rounded-sm bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-4">
              <Globe className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Languages</div>
            <div className="text-xl font-bold font-cormorant text-white mb-2">Hindi, English, Gujarati</div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Native conversational clarity and accurate pronunciation across reels, marketing ads, and audiobook narratives.
            </p>
          </TiltCard3D>

          <TiltCard3D
            maxTilt={9}
            glareOpacity={0.2}
            className="p-6 bg-[#121318] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/50 transition-colors shadow-lg"
          >
            <div className="w-10 h-10 rounded-sm bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-4">
              <Palette className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Design Style</div>
            <div className="text-xl font-bold font-cormorant text-white mb-2">Soft, Clean, Aesthetic</div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Thoughtfully curated palettes, high contrast legibility, and refined composition without loud or distracting clutter.
            </p>
          </TiltCard3D>

          <TiltCard3D
            maxTilt={9}
            glareOpacity={0.2}
            className="p-6 bg-[#121318] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/50 transition-colors shadow-lg"
          >
            <div className="w-10 h-10 rounded-sm bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] mb-4">
              <MapPin className="w-5 h-5" />
            </div>
            <div className="text-xs uppercase tracking-wider text-zinc-400 mb-1 font-semibold">Based In</div>
            <div className="text-xl font-bold font-cormorant text-white mb-2">Rajkot, Gujarat</div>
            <p className="text-xs text-zinc-400 leading-relaxed font-light">
              Available for remote freelance collaborations across India and globally, with real manufacturing and local retail insights.
            </p>
          </TiltCard3D>

        </div>

      </div>
    </section>
  );
};
