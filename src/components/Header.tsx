import React, { useState } from 'react';
import { MessageCircle, Menu, X, Sparkles } from 'lucide-react';
import { CREATOR_PROFILE } from '../data/portfolioData';

interface HeaderProps {
  onOpenContact: (initialMessage?: string) => void;
  onOpenQuotation: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenContact, onOpenQuotation }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'About', href: '#about' },
    { label: 'Services', href: '#services' },
    { label: 'Work', href: '#work' },
    { label: 'Automation', href: '#automation' },
    { label: 'Quotation', href: '#quotation' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-md bg-[#0c0d10]/90 border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8 h-20">
          
          {/* Zone 1: Single text element wordmark */}
          <a 
            href="#" 
            className="font-cinzel text-lg sm:text-xl font-bold tracking-[0.25em] text-[#f4ecd8] hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0"
          >
            SOFIA RAFAI
          </a>

          {/* Zone 2: 4–5 clean single-line text navigation links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="hover:text-[#d4af37] transition-colors whitespace-nowrap shrink-0 relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-[#d4af37] hover:after:w-full after:transition-all"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 primary action */}
          <div className="hidden md:flex items-center gap-4 shrink-0">
            <button
              type="button"
              onClick={onOpenQuotation}
              className="inline-flex items-center gap-2 px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-[#0d0e12] bg-[#d4af37] hover:bg-[#e2c158] transition-all rounded-sm shadow-md whitespace-nowrap shrink-0 cursor-pointer active:scale-95"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Get a Quote</span>
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              type="button"
              onClick={onOpenQuotation}
              className="p-2 text-xs font-semibold uppercase tracking-wider text-[#0d0e12] bg-[#d4af37] rounded-sm mr-1 cursor-pointer"
              aria-label="Contact"
            >
              Quote
            </button>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white rounded-md cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/[0.08] bg-[#0c0d10] space-y-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 text-sm font-medium text-zinc-300 hover:text-[#d4af37] hover:bg-white/[0.03] rounded-md transition-colors"
              >
                {link.label}
              </a>
            ))}
            <div className="pt-2 border-t border-white/[0.08] px-3 space-y-2">
              <button
                type="button"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenQuotation();
                }}
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-[#0d0e12] bg-[#d4af37] rounded-sm"
              >
                <Sparkles className="w-4 h-4" />
                <span>Fill Quotation Form</span>
              </button>

              <a
                href={`https://wa.me/${CREATOR_PROFILE.phone}?text=Hi%20Sofia,%20I%20saw%20your%20freelance%20portfolio%20and%20would%20like%20to%20discuss%20a%20project.`}
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-center gap-2 w-full py-2.5 text-xs font-semibold uppercase tracking-wider text-zinc-200 bg-white/[0.05] border border-white/[0.1] rounded-sm"
              >
                <MessageCircle className="w-4 h-4 text-emerald-400" />
                <span>WhatsApp: {CREATOR_PROFILE.phone}</span>
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
