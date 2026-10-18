import React, { useEffect } from 'react';
import { PortfolioProject } from '../types/portfolio';
import { CREATOR_PROFILE } from '../data/portfolioData';
import { X, Check, MessageCircle, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: PortfolioProject | null;
  onClose: () => void;
  onInquire: (projectName: string) => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose, onInquire }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (project) {
      window.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md overflow-y-auto"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-4xl bg-[#121318] border border-[#d4af37]/40 rounded-sm shadow-2xl overflow-hidden my-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-black/70 hover:bg-black text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer border border-white/[0.1]"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Image Header */}
        {project.image && (
          <div className="relative aspect-[16/9] w-full overflow-hidden bg-black">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-transparent to-black/30 pointer-events-none" />
          </div>
        )}

        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Header */}
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold tracking-wider text-[#d4af37] uppercase mb-2">
              <span>{project.subtitle}</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">Sofia Rafai Portfolio</span>
            </div>

            <h2 className="font-cormorant text-3xl sm:text-4xl font-bold text-white mb-3">
              {project.title}
            </h2>

            <p className="text-sm text-zinc-300 font-light leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/[0.08]">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 text-xs font-medium bg-white/[0.03] border border-white/[0.08] text-zinc-300 rounded-xs"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Deliverables Breakdown */}
          <div className="p-5 bg-[#161720] border border-white/[0.06] rounded-xs space-y-3">
            <h3 className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase">
              Project Deliverables & Features:
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-zinc-300">
              {project.deliverables.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#d4af37] shrink-0" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Footer CTAs */}
          <div className="pt-4 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-zinc-400">
              Want a similar project built for your brand?
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto">
              <button
                onClick={onClose}
                className="px-4 py-2.5 text-xs font-medium text-zinc-400 hover:text-white transition-colors cursor-pointer"
              >
                Close
              </button>

              <button
                onClick={() => {
                  onClose();
                  onInquire(project.title);
                }}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] transition-all rounded-xs shadow-md cursor-pointer active:scale-95"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Discuss This Project</span>
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};
