import React, { useState } from 'react';
import { PORTFOLIO_PROJECTS } from '../data/portfolioData';
import { PortfolioProject, CategoryType } from '../types/portfolio';
import { TiltCard3D } from './3d/TiltCard3D';
import { 
  ArrowUpRight, 
  Play, 
  Pause, 
  Volume2, 
  ExternalLink,
  MessageCircle
} from 'lucide-react';

interface WorkShowcaseProps {
  onSelectProject: (project: PortfolioProject) => void;
  onOpenContact: (initialMessage?: string) => void;
  activeFilter?: CategoryType;
}

export const WorkShowcase: React.FC<WorkShowcaseProps> = ({ 
  onSelectProject, 
  onOpenContact,
  activeFilter: propFilter 
}) => {
  const [filter, setFilter] = useState<CategoryType>(propFilter || 'all');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioCtx, setAudioCtx] = useState<AudioContext | null>(null);

  const filterTabs: { label: string; value: CategoryType }[] = [
    { label: 'All Works', value: 'all' },
    { label: 'Web Design', value: 'web' },
    { label: 'Voice Narration', value: 'voice' },
    { label: 'UGC Content', value: 'ugc' },
    { label: 'Tile & Wall Design', value: 'tile' },
    { label: 'Logo & Posters', value: 'branding' },
  ];

  const filteredProjects = filter === 'all' 
    ? PORTFOLIO_PROJECTS 
    : PORTFOLIO_PROJECTS.filter(p => p.category === filter);

  const handleToggleAudio = (projectId: string, e: React.MouseEvent) => {
    e.stopPropagation();

    if (playingAudioId === projectId) {
      if (audioCtx) {
        audioCtx.close();
        setAudioCtx(null);
      }
      setPlayingAudioId(null);
      return;
    }

    try {
      const ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(220, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(330, ctx.currentTime + 0.3);
      osc.frequency.exponentialRampToValueAtTime(261.63, ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1.3);

      setAudioCtx(ctx);
      setPlayingAudioId(projectId);

      setTimeout(() => {
        setPlayingAudioId(null);
      }, 3500);
    } catch {
      setPlayingAudioId(projectId);
      setTimeout(() => setPlayingAudioId(null), 3000);
    }
  };

  return (
    <section id="work" className="py-24 border-b border-white/[0.08] bg-[#0c0d10] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
              <span>Original Creations</span>
              <span aria-hidden="true">·</span>
              <span className="text-zinc-400">100% Fresher Craft</span>
            </div>
            <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white">
              Selected Portfolio Showcase
            </h2>
          </div>
          
          <div className="text-xs text-zinc-400 max-w-sm font-light">
            Interactive preview of demo websites, aesthetic video content, multilingual narration, and architectural surfaces created by Sofia Rafai.
          </div>
        </div>

        {/* Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-[#121318] border border-white/[0.08] rounded-sm mb-12 w-fit">
          {filterTabs.map((tab) => (
            <button
              key={tab.value}
              type="button"
              onClick={() => setFilter(tab.value)}
              className={`px-4 py-2 text-xs font-medium rounded-xs transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                filter === tab.value
                  ? 'bg-[#d4af37] text-[#0c0d10] font-semibold shadow-sm'
                  : 'text-zinc-400 hover:text-white hover:bg-white/[0.04]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Bento Grid with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProjects.map((project) => (
            <TiltCard3D
              key={project.id}
              maxTilt={8}
              glareOpacity={0.25}
              onClick={() => onSelectProject(project)}
              className="group bg-[#121318] border border-white/[0.08] hover:border-[#d4af37]/60 rounded-sm overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:shadow-black/70 cursor-pointer"
            >
              <div>
                {/* Visual Media Header */}
                {project.image ? (
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#181920]">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                      loading="lazy"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#121318] via-transparent to-transparent opacity-85" />
                    
                    {/* Floating 3D perspective badge */}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md flex items-center justify-center text-zinc-300 group-hover:text-[#d4af37] group-hover:scale-110 transition-all border border-white/[0.1]">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                  </div>
                ) : project.audioSample ? (
                  /* Audio player interactive hero container */
                  <div className="p-6 bg-gradient-to-br from-[#181924] to-[#121319] border-b border-white/[0.08] relative">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2 text-xs text-[#d4af37] font-semibold">
                        <Volume2 className="w-4 h-4" />
                        <span>Voiceover Studio Preview</span>
                      </div>
                      <span className="text-[11px] font-mono text-zinc-400">
                        {project.audioSample.duration}
                      </span>
                    </div>

                    <div className="text-xs text-zinc-300 italic mb-4 p-3 bg-black/40 rounded-xs border border-white/[0.06]">
                      &ldquo;{project.audioSample.scriptSnippet}&rdquo;
                    </div>

                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={(e) => handleToggleAudio(project.id, e)}
                        className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] rounded-xs cursor-pointer active:scale-95 transition-all shadow-md"
                      >
                        {playingAudioId === project.id ? (
                          <>
                            <Pause className="w-3.5 h-3.5" />
                            <span>Playing</span>
                          </>
                        ) : (
                          <>
                            <Play className="w-3.5 h-3.5" />
                            <span>Play Demo</span>
                          </>
                        )}
                      </button>

                      {/* 3D Waveform Audio Bars */}
                      <div className="flex items-center gap-1.5 h-7">
                        {[40, 75, 55, 90, 60, 30, 80, 45, 95, 35].map((height, barIdx) => (
                          <div
                            key={barIdx}
                            style={{
                              height: playingAudioId === project.id ? `${height}%` : '20%',
                              transition: 'height 0.15s ease'
                            }}
                            className={`w-1 rounded-full ${
                              playingAudioId === project.id 
                                ? 'bg-[#d4af37] animate-pulse shadow-[0_0_8px_#d4af37]' 
                                : 'bg-zinc-700'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="p-6 bg-gradient-to-br from-[#191a24] to-[#121318] border-b border-white/[0.08] aspect-[16/8] flex flex-col justify-end">
                    <div className="text-xs font-semibold text-[#d4af37] tracking-wider uppercase mb-1">
                      {project.subtitle}
                    </div>
                    <div className="font-cormorant text-2xl font-bold text-white">
                      {project.title}
                    </div>
                  </div>
                )}

                {/* Content body */}
                <div className="p-6">
                  <div className="flex flex-wrap items-center gap-1.5 text-[11px] text-[#d4af37] mb-2 font-medium">
                    {project.tags.map((tag, tIdx) => (
                      <React.Fragment key={tag}>
                        <span>{tag}</span>
                        {tIdx < project.tags.length - 1 && <span className="text-zinc-600">/</span>}
                      </React.Fragment>
                    ))}
                  </div>

                  <h3 className="font-cormorant text-2xl font-bold text-white mb-2 group-hover:text-[#f4ecd8] transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-xs text-zinc-300 leading-relaxed mb-4 line-clamp-3 font-light">
                    {project.description}
                  </p>

                  {project.metricsOrOutcome && (
                    <div className="p-2.5 bg-white/[0.02] border border-white/[0.06] rounded-xs text-[11px] text-zinc-300 flex items-center gap-2 mb-4">
                      <span className="text-[#d4af37] font-bold">✓</span>
                      <span>{project.metricsOrOutcome}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Card Footer */}
              <div className="px-6 py-3 border-t border-white/[0.06] bg-[#0f1014] flex items-center justify-between text-xs">
                <span className="text-zinc-400 group-hover:text-zinc-200 transition-colors">
                  View Case Details
                </span>
                <span className="text-[#d4af37] font-medium inline-flex items-center gap-1">
                  Inspect <ExternalLink className="w-3.5 h-3.5" />
                </span>
              </div>
            </TiltCard3D>
          ))}
        </div>

        {/* WhatsApp Consultation Callout */}
        <div className="mt-16 text-center p-8 bg-[#121318] border border-[#d4af37]/30 rounded-sm">
          <h3 className="font-cormorant text-2xl sm:text-3xl font-bold text-white mb-3">
            Looking for live website previews or audio stems?
          </h3>
          <p className="text-sm text-zinc-300 max-w-xl mx-auto mb-6 font-light">
            I gladly share live demo links, high-res tile vector sets, raw audio takes in Hindi/English/Gujarati, or automation walkthroughs on request.
          </p>
          <button
            type="button"
            onClick={() => onOpenContact("Hi Sofia, I would like to review demo samples for my upcoming project.")}
            className="inline-flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-widest text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] transition-all rounded-xs shadow-md cursor-pointer active:scale-95"
          >
            <MessageCircle className="w-4 h-4" />
            <span>Request Demo Samples on WhatsApp</span>
          </button>
        </div>

      </div>
    </section>
  );
};
