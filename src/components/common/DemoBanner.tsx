import React from 'react';
import { Info, Sparkles, Bot, Key } from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';

interface DemoBannerProps {
  label?: string;
  subtext?: string;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({ label, subtext }) => {
  const { activeProject, setIsApiKeyModalOpen } = useResearch();
  const isLive = activeProject.metadata?.mode === 'gemini-live';

  if (isLive) {
    return (
      <div className="no-print mb-6 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-3 text-blue-950 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 rounded-lg bg-blue-100 p-1 text-blue-700">
            <Bot className="h-4 w-4" />
          </div>
          <div className="flex-1 text-xs leading-relaxed">
            <div className="flex items-center gap-2 font-bold text-blue-950">
              <span>{label || 'Google Gemini 2.5 Flash Synthesis Active'}</span>
              <span className="inline-flex items-center gap-1 rounded bg-blue-200/70 px-1.5 py-0.5 font-mono text-[10px] uppercase text-blue-900">
                Live AI Model
              </span>
            </div>
            <p className="mt-0.5 text-blue-800">
              {subtext ||
                'Analysis generated via Google Gemini 2.5 Flash with structured evidence schemas. Field interview verification is recommended for ground realities.'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="no-print mb-6 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-amber-900 shadow-2xs">
      <div className="flex items-start gap-3">
        <div className="mt-0.5 rounded-lg bg-amber-100 p-1 text-amber-700">
          <Info className="h-4 w-4" />
        </div>
        <div className="flex-1 text-xs leading-relaxed">
          <div className="flex items-center justify-between gap-2 flex-wrap">
            <div className="flex items-center gap-2 font-bold text-amber-950">
              <span>{label || 'Demonstration Mode Active'}</span>
              <span className="inline-flex items-center gap-1 rounded bg-amber-200/60 px-1.5 py-0.5 font-mono text-[10px] uppercase text-amber-900">
                <Sparkles className="h-3 w-3" /> Sample Benchmarks
              </span>
            </div>

            <button
              onClick={() => setIsApiKeyModalOpen(true)}
              className="inline-flex items-center gap-1 rounded-md bg-white border border-amber-300 px-2 py-0.5 text-[11px] font-semibold text-amber-900 hover:bg-amber-100 transition-colors"
            >
              <Key className="h-3 w-3 text-amber-700" />
              <span>Enable Live Gemini Key</span>
            </button>
          </div>
          <p className="mt-0.5 text-amber-800">
            {subtext ||
              'Metrics, competitor profiles, and pricing benchmarks displayed below are illustrative demonstration samples prepared for evaluation. Add a Gemini API key to run live synthesis on any market idea.'}
          </p>
        </div>
      </div>
    </div>
  );
};
