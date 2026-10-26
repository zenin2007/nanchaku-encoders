import React from 'react';
import { Sparkles, Loader2, Database, Search, Target, Compass } from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';

export const LoadingAnalysisModal: React.FC = () => {
  const { isAnalyzing, analysisStep, analysisProgress } = useResearch();

  if (!isAnalyzing) return null;

  const steps = [
    { label: 'Geographic and segment boundary synthesis', icon: Compass, threshold: 20 },
    { label: 'Local competitor mapping & pricing audit', icon: Search, threshold: 40 },
    { label: 'Customer preference & friction extraction', icon: Database, threshold: 70 },
    { label: 'Opportunity scoring & validation experiment design', icon: Target, threshold: 90 },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/60 backdrop-blur-xs p-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-8 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white shadow-md shadow-blue-500/20">
              <Sparkles className="h-5 w-5 animate-pulse" />
            </div>
            <div>
              <h3 className="font-semibold text-slate-900">MarketLens AI Engine</h3>
              <p className="text-xs text-slate-500">Synthesizing Market Intelligence Architecture</p>
            </div>
          </div>
          <Loader2 className="h-5 w-5 animate-spin text-blue-600" />
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <div className="flex justify-between text-xs font-medium text-slate-700">
              <span className="font-mono text-blue-700">{analysisStep}</span>
              <span className="font-mono text-slate-500">{analysisProgress}%</span>
            </div>
            <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-slate-100">
              <div
                className="h-full rounded-full bg-blue-600 transition-all duration-500 ease-out"
                style={{ width: `${analysisProgress}%` }}
              />
            </div>
          </div>

          <div className="mt-6 space-y-2.5 rounded-xl border border-slate-100 bg-slate-50/70 p-4">
            {steps.map((s, idx) => {
              const Icon = s.icon;
              const isDone = analysisProgress >= s.threshold;
              const isCurrent = analysisProgress < s.threshold && (idx === 0 || analysisProgress >= steps[idx - 1].threshold);

              return (
                <div
                  key={idx}
                  className={`flex items-center gap-3 text-xs transition-colors duration-200 ${
                    isDone
                      ? 'text-slate-800 font-medium'
                      : isCurrent
                      ? 'text-blue-700 font-semibold'
                      : 'text-slate-400'
                  }`}
                >
                  <div
                    className={`flex h-6 w-6 items-center justify-center rounded-md border ${
                      isDone
                        ? 'border-emerald-300 bg-emerald-50 text-emerald-600'
                        : isCurrent
                        ? 'border-blue-300 bg-blue-50 text-blue-600'
                        : 'border-slate-200 bg-white text-slate-300'
                    }`}
                  >
                    <Icon className="h-3.5 w-3.5" />
                  </div>
                  <span>{s.label}</span>
                </div>
              );
            })}
          </div>

          <p className="text-center text-[11px] text-slate-400">
            Applying structured market analysis framework and sample benchmarks...
          </p>
        </div>
      </div>
    </div>
  );
};
