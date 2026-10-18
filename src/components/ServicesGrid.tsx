import React from 'react';
import { SERVICES_LIST } from '../data/portfolioData';
import { ServiceItem } from '../types/portfolio';
import { TiltCard3D } from './3d/TiltCard3D';
import { 
  Laptop, 
  Mic2, 
  Video, 
  Image as ImageIcon, 
  Grid3X3, 
  Feather, 
  Workflow, 
  Database,
  ArrowRight,
  Clock
} from 'lucide-react';

interface ServicesGridProps {
  onSelectService: (service: ServiceItem) => void;
  onFilterWork: (category: string) => void;
}

export const ServicesGrid: React.FC<ServicesGridProps> = ({ onSelectService, onFilterWork }) => {
  const getServiceIcon = (category: string) => {
    switch (category) {
      case 'web':
        return <Laptop className="w-5 h-5" />;
      case 'voice':
        return <Mic2 className="w-5 h-5" />;
      case 'ugc':
        return <Video className="w-5 h-5" />;
      case 'branding':
        return <Feather className="w-5 h-5" />;
      case 'tile':
        return <Grid3X3 className="w-5 h-5" />;
      case 'automation':
        return <Workflow className="w-5 h-5" />;
      case 'office':
        return <Database className="w-5 h-5" />;
      default:
        return <ImageIcon className="w-5 h-5" />;
    }
  };

  return (
    <section id="services" className="py-24 border-b border-white/[0.08] bg-[#0c0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
              <span>What I Do</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">8 Integrated Disciplines</span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Creative & Operational Services
            </h2>
          </div>
          <p className="text-sm text-zinc-300 max-w-md font-light leading-relaxed">
            From mobile-responsive websites to multilingual voiceovers and business automations, every service is crafted with high aesthetic fidelity and tailored to your brand&apos;s goals.
          </p>
        </div>

        {/* 8-Card Service Grid with 3D Interactive Tilt */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SERVICES_LIST.map((service) => (
            <TiltCard3D
              key={service.id}
              maxTilt={10}
              glareOpacity={0.2}
              className="group p-6 bg-[#121318] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/60 transition-all duration-300 flex flex-col justify-between hover:bg-[#15161f] shadow-lg"
            >
              <div>
                {/* Header with icon and turnaround badge */}
                <div className="flex items-start justify-between mb-4">
                  <div className="w-10 h-10 rounded-sm bg-[#d4af37]/10 flex items-center justify-center text-[#d4af37] group-hover:bg-[#d4af37] group-hover:text-[#0c0d10] transition-colors">
                    {getServiceIcon(service.category)}
                  </div>
                  <div className="flex items-center gap-1 text-[11px] font-mono text-[#d4af37] bg-white/[0.03] px-2 py-0.5 rounded-xs border border-[#d4af37]/20">
                    <Clock className="w-3 h-3 text-[#d4af37]" />
                    <span>{service.turnaround}</span>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-cormorant text-xl font-bold text-white mb-2 group-hover:text-[#f4ecd8] transition-colors">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-xs text-zinc-300 leading-relaxed mb-4 font-light">
                  {service.shortDesc}
                </p>

                {/* Bullet highlights */}
                <ul className="space-y-1.5 mb-6 text-[11px] text-zinc-400 border-t border-white/[0.06] pt-3">
                  {service.highlights.map((highlight, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-1.5">
                      <span className="text-[#d4af37] text-xs leading-none">▪</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => onFilterWork(service.category)}
                  className="text-xs text-zinc-400 hover:text-white transition-colors cursor-pointer"
                >
                  View Samples
                </button>
                <button
                  type="button"
                  onClick={() => onSelectService(service)}
                  className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-wider text-[#d4af37] hover:text-[#e2c158] transition-colors cursor-pointer"
                >
                  <span>Get Quote</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </TiltCard3D>
          ))}
        </div>

        {/* Fast & Reliable Guarantee Banner */}
        <div className="mt-12 p-6 bg-gradient-to-r from-[#14151c] to-[#111217] border border-[#d4af37]/40 rounded-sm flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="w-3 h-3 bg-[#d4af37] rounded-full shrink-0 animate-ping" />
            <div>
              <div className="text-sm font-semibold text-white">
                Fast & Reliable Commitment
              </div>
              <div className="text-xs text-zinc-400">
                Quick turnaround · Clear, transparent communication · One free revision included with every deliverable.
              </div>
            </div>
          </div>
          <a
            href="#quotation"
            className="text-xs font-semibold uppercase tracking-wider text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] px-4 py-2 rounded-xs transition-colors whitespace-nowrap"
          >
            Request Custom Quotation →
          </a>
        </div>

      </div>
    </section>
  );
};
