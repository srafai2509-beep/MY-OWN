import React from 'react';
import { HOW_I_WORK_STEPS } from '../data/portfolioData';
import { ArrowRight, MessageSquare, Sparkles, CheckCheck, Send, RotateCcw } from 'lucide-react';

export const HowIWork: React.FC = () => {
  const getStepIcon = (step: number) => {
    switch (step) {
      case 1:
        return <MessageSquare className="w-5 h-5" />;
      case 2:
        return <Sparkles className="w-5 h-5" />;
      case 3:
        return <CheckCheck className="w-5 h-5" />;
      case 4:
        return <Send className="w-5 h-5" />;
      case 5:
        return <RotateCcw className="w-5 h-5" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-20 border-b border-white/[0.08] bg-[#0e0f13]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 text-xs font-semibold tracking-[0.25em] text-[#d4af37] uppercase mb-2">
            <span>Client Experience</span>
            <span aria-hidden="true">·</span>
            <span className="text-zinc-400">Structured 5-Step Process</span>
          </div>
          <h2 className="font-cormorant text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
            How We Work Together
          </h2>
          <p className="text-sm text-zinc-300 font-light">
            A transparent, low-friction collaboration process that ensures complete alignment before full project delivery.
          </p>
        </div>

        {/* 5 Process Steps */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 relative">
          {HOW_I_WORK_STEPS.map((step, idx) => (
            <div
              key={step.step}
              className="p-6 bg-[#13141a] border border-white/[0.08] rounded-sm relative flex flex-col justify-between hover:border-[#d4af37]/50 transition-colors group"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="w-8 h-8 rounded-full bg-[#d4af37]/10 text-[#d4af37] flex items-center justify-center font-cinzel text-xs font-bold border border-[#d4af37]/30 group-hover:bg-[#d4af37] group-hover:text-[#0c0d10] transition-colors">
                    0{step.step}
                  </span>
                  <div className="text-zinc-500 group-hover:text-[#d4af37] transition-colors">
                    {getStepIcon(step.step)}
                  </div>
                </div>

                <h3 className="font-cormorant text-xl font-bold text-white mb-2">
                  {step.title}
                </h3>

                <p className="text-xs text-zinc-400 leading-relaxed">
                  {step.desc}
                </p>
              </div>

              {idx < HOW_I_WORK_STEPS.length - 1 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-zinc-600">
                  <ArrowRight className="w-5 h-5 text-[#d4af37]/60" />
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
