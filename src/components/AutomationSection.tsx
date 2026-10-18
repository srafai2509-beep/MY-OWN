import React, { useState } from 'react';
import { AUTOMATION_WORKFLOWS, TOOL_COMPARISON } from '../data/portfolioData';
import { TiltCard3D } from './3d/TiltCard3D';
import { 
  Zap, 
  Workflow, 
  CheckCircle, 
  Clock, 
  Sparkles,
  ChevronRight,
  MessageCircle,
  FileText
} from 'lucide-react';

interface AutomationSectionProps {
  onOpenContact: (initialMessage?: string) => void;
}

export const AutomationSection: React.FC<AutomationSectionProps> = ({ onOpenContact }) => {
  const [selectedWorkflowId, setSelectedWorkflowId] = useState<string>(AUTOMATION_WORKFLOWS[0].id);

  const activeWorkflow = AUTOMATION_WORKFLOWS.find(w => w.id === selectedWorkflowId) || AUTOMATION_WORKFLOWS[0];

  return (
    <section id="automation" className="py-24 border-b border-white/[0.08] bg-[#0e0f13] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="max-w-3xl mb-14">
          <div className="flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
            <span>No-Code & Low-Code Systems</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-400">n8n · Zapier · Power Automate</span>
          </div>
          
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            Automations that eliminate repeat manual work.
          </h2>

          <p className="text-sm sm:text-base text-zinc-300 font-light leading-relaxed">
            I build dependable pipelines for lead capture, customer follow-ups, scheduled reports, and instant alerts — using the tool that fits your business infrastructure best.
          </p>
        </div>

        {/* 3 Platform Architecture Cards with 3D Tilt */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-14">
          {TOOL_COMPARISON.map((tool) => (
            <TiltCard3D
              key={tool.tool}
              maxTilt={8}
              glareOpacity={0.2}
              className="p-6 bg-[#13141a] border border-white/[0.08] rounded-sm hover:border-[#d4af37]/40 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="font-cinzel text-lg font-bold text-white tracking-wide">
                    {tool.tool}
                  </span>
                  <span className="text-[11px] font-mono text-[#d4af37] bg-[#d4af37]/10 px-2 py-0.5 rounded-xs">
                    Pipeline Engine
                  </span>
                </div>
                
                <div className="text-xs text-zinc-300 font-medium mb-3">
                  {tool.bestFor}
                </div>
              </div>

              <div className="pt-3 border-t border-white/[0.06] text-[11px] text-zinc-400 font-mono">
                <span className="text-[#d4af37] font-semibold">Example: </span>
                <span>{tool.example}</span>
              </div>
            </TiltCard3D>
          ))}
        </div>

        {/* Interactive Workflow Diagram Explorer */}
        <div className="bg-[#121318] border border-[#d4af37]/30 rounded-sm p-6 lg:p-8 shadow-xl">
          
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/[0.08]">
            <div>
              <div className="text-xs uppercase tracking-wider text-[#d4af37] font-semibold mb-1">
                Interactive Automation Blueprints
              </div>
              <h3 className="font-cormorant text-2xl font-bold text-white">
                How It Flows & What You Save
              </h3>
            </div>

            {/* Workflow selector buttons */}
            <div className="flex flex-wrap items-center gap-2">
              {AUTOMATION_WORKFLOWS.map((wf) => (
                <button
                  key={wf.id}
                  type="button"
                  onClick={() => setSelectedWorkflowId(wf.id)}
                  className={`px-3 py-1.5 text-xs font-medium rounded-xs transition-colors cursor-pointer ${
                    selectedWorkflowId === wf.id
                      ? 'bg-[#d4af37] text-[#0c0d10] font-semibold'
                      : 'bg-white/[0.04] text-zinc-400 hover:text-white'
                  }`}
                >
                  {wf.title.split(' ')[0]} {wf.title.split(' ')[1]}
                </button>
              ))}
            </div>
          </div>

          {/* Active Workflow Blueprint Detail */}
          <div className="pt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-4">
              <div className="flex items-center gap-2 text-xs font-mono text-[#d4af37]">
                <span>Engine: {activeWorkflow.tool}</span>
                <span aria-hidden="true">·</span>
                <span className="text-zinc-400">Workflow Blueprint</span>
              </div>

              <h4 className="font-cormorant text-2xl font-bold text-white">
                {activeWorkflow.title}
              </h4>

              <div className="p-4 bg-black/40 border border-white/[0.06] rounded-xs font-mono text-xs text-zinc-300 leading-relaxed">
                <span className="text-[#d4af37] font-bold">Logic Flow: </span>
                {activeWorkflow.howItFlows}
              </div>

              {/* Step by step flow */}
              <div className="space-y-2 pt-2">
                <div className="text-xs font-semibold text-zinc-400 uppercase tracking-wider">
                  Automated Pipeline Steps:
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {activeWorkflow.steps.map((step, sIdx) => (
                    <div
                      key={sIdx}
                      className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xs flex items-center gap-2.5 text-xs text-zinc-200"
                    >
                      <span className="w-5 h-5 rounded-full bg-[#d4af37]/20 text-[#d4af37] flex items-center justify-center text-[10px] font-mono shrink-0 font-bold">
                        {sIdx + 1}
                      </span>
                      <span className="truncate">{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: "What You Save" Benefit Card */}
            <div className="lg:col-span-5 p-6 bg-gradient-to-br from-[#181924] to-[#121318] border border-[#d4af37]/40 rounded-sm space-y-4 shadow-lg">
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-[#d4af37] uppercase">
                <Clock className="w-4 h-4 text-[#d4af37]" />
                <span>Business Impact & ROI</span>
              </div>

              <div className="text-xl sm:text-2xl font-bold font-cormorant text-white">
                {activeWorkflow.whatYouSave}
              </div>

              <p className="text-xs text-zinc-300 leading-relaxed font-light">
                Includes setup in your existing cloud workspace (Google Sheets, Microsoft 365, Telegram or WhatsApp), test payload verification, and video screen recording walkthrough.
              </p>

              <div className="pt-2 border-t border-white/[0.08] flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-zinc-400">Implementation Scope</div>
                  <div className="text-sm font-semibold text-[#d4af37]">Turnkey Setup + Video Guide</div>
                </div>

                <button
                  type="button"
                  onClick={() => onOpenContact(`Hi Sofia, I would like to get a quote to set up the '${activeWorkflow.title}' automation for my business.`)}
                  className="px-4 py-2 text-xs font-semibold uppercase tracking-wider text-[#0c0d10] bg-[#d4af37] hover:bg-[#e2c158] rounded-xs cursor-pointer active:scale-95 transition-all"
                >
                  Get Workflow Quote
                </button>
              </div>
            </div>

          </div>

        </div>

        {/* Logo Design Highlights (Rates removed) */}
        <div className="mt-16 pt-12 border-t border-white/[0.08] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <div className="text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
              Visual Identity
            </div>
            <h3 className="font-cormorant text-3xl font-bold text-white mb-3">
              Clean, Aesthetic Logo Design
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 font-light leading-relaxed mb-6">
              Simple, memorable logos in a soft, clean aesthetic style — crafted to look distinctive on Instagram avatars, luxury packaging, storefront signage, and web headers.
            </p>
            <div className="p-3 bg-[#13141a] border border-[#d4af37]/30 rounded-xs text-xs font-mono text-[#d4af37] mb-4">
              2 Bespoke Creative Directions · Complete Vector Package Included
            </div>
          </div>

          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 bg-[#121318] border border-white/[0.08] rounded-xs">
              <div className="text-xs font-semibold text-white mb-1">Two Concepts</div>
              <div className="text-[11px] text-zinc-400">Two creative logo ideas to choose from</div>
            </div>

            <div className="p-4 bg-[#121318] border border-white/[0.08] rounded-xs">
              <div className="text-xs font-semibold text-white mb-1">Vector Files</div>
              <div className="text-[11px] text-zinc-400">PNG, transparent PNG & high-res print PDF</div>
            </div>

            <div className="p-4 bg-[#121318] border border-white/[0.08] rounded-xs">
              <div className="text-xs font-semibold text-white mb-1">All Versions</div>
              <div className="text-[11px] text-zinc-400">Full color + crisp black/white variations</div>
            </div>

            <div className="p-4 bg-[#121318] border border-white/[0.08] rounded-xs">
              <div className="text-xs font-semibold text-white mb-1">Free Revision</div>
              <div className="text-[11px] text-zinc-400">1 free revision on your chosen concept</div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
