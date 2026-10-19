import React from 'react';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { ArrowUp } from 'lucide-react';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="py-14 bg-[#0a0a0c] border-t border-white/[0.08] text-zinc-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 pb-10 border-b border-white/[0.06]">
          
          {/* Brand */}
          <div className="space-y-2">
            <span className="font-cinzel text-lg font-bold tracking-[0.25em] text-[#f4ecd8] block">
              SOFIA RAFAI
            </span>
            <p className="text-xs text-zinc-400 max-w-sm font-light">
              {CREATOR_PROFILE.tagline} · Creative Freelancer based in Mumbai & Rajkot, Gujarat.
            </p>
          </div>

          {/* Quick links */}
          <div className="flex flex-wrap items-center gap-6 text-xs text-zinc-300">
            <a href="#about" className="hover:text-[#d4af37] transition-colors">About</a>
            <a href="#services" className="hover:text-[#d4af37] transition-colors">Services</a>
            <a href="#work" className="hover:text-[#d4af37] transition-colors">Work</a>
            <a href="#automation" className="hover:text-[#d4af37] transition-colors">Automation</a>
            <a href="#office" className="hover:text-[#d4af37] transition-colors">Backend Office</a>
            <a href="#quotation" className="hover:text-[#d4af37] transition-colors">Get Quotation</a>
            <a href="#contact" className="hover:text-[#d4af37] transition-colors">Contact</a>
          </div>

          {/* Back to top */}
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 px-3 py-2 bg-white/[0.04] hover:bg-white/[0.08] text-zinc-300 hover:text-white rounded-xs transition-colors cursor-pointer"
            aria-label="Scroll to top"
          >
            <span>Top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Bottom row */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-zinc-500">
          <div>
            © {new Date().getFullYear()} Sofia Rafai. All rights reserved. Mumbai · Rajkot, Gujarat, India.
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a 
              href={`https://wa.me/${CREATOR_PROFILE.primaryPhone}`} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#d4af37] transition-colors"
            >
              WhatsApp: {CREATOR_PROFILE.primaryPhone}
            </a>
            <span>·</span>
            <a 
              href={`https://wa.me/${CREATOR_PROFILE.secondaryPhone}`} 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-[#d4af37] transition-colors"
            >
              Alt: {CREATOR_PROFILE.secondaryPhone}
            </a>
            <span>·</span>
            <a 
              href={`mailto:${CREATOR_PROFILE.email}`} 
              className="hover:text-[#d4af37] transition-colors"
            >
              Email
            </a>
          </div>
        </div>

      </div>
    </footer>
  );
};
