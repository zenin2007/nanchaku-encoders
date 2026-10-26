import React from 'react';
import {
  Compass,
  Target,
  Users,
  CheckCircle2,
  AlertTriangle,
  Layers,
  ArrowRight,
  FileText,
  Database,
  ExternalLink,
  ShieldCheck,
  Bot
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import { DemoBanner } from '../common/DemoBanner';
import { EvidenceBadge } from '../common/Badge';

export const MarketOverviewView: React.FC = () => {
  const { activeProject, setCurrentTab } = useResearch();
  const { marketOverview, input, evidenceLayer, metadata } = activeProject;
  const isLive = metadata?.mode === 'gemini-live';

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      {/* Demo or Live Banner */}
      <DemoBanner />

      {/* Top Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
          <div className="space-y-3 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="inline-flex items-center gap-1 rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-700 border border-blue-200/60">
                <Compass className="h-3.5 w-3.5" />
                Strategic Market Overview
              </span>
              <EvidenceBadge status={isLive ? 'Qualitative Observation' : 'Demonstration Sample'} />
              {isLive && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-200">
                  <Bot className="h-3 w-3" /> Gemini 2.5 Flash
                </span>
              )}
            </div>

            <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              {activeProject.title}
            </h1>

            {/* Research Question Callout */}
            <div className="mt-4 rounded-xl border border-blue-100 bg-blue-50/50 p-4">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-800">
                Primary Strategic Research Question
              </span>
              <p className="mt-1 text-sm sm:text-base font-semibold text-slate-900 leading-snug">
                "{marketOverview.researchQuestion}"
              </p>
            </div>

            {/* Executive Summary if available */}
            {metadata?.executiveSummary && (
              <div className="mt-3 rounded-xl border border-slate-200 bg-slate-50/60 p-4 text-xs text-slate-700 leading-relaxed space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  Executive Brief (Gemini Synthesized)
                </span>
                <p>{metadata.executiveSummary}</p>
              </div>
            )}
          </div>

          {/* Quick Context Pill Box */}
          <div className="grid grid-cols-2 sm:grid-cols-2 gap-3 lg:w-80 shrink-0 text-xs">
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400">Industry</span>
              <div className="mt-1 font-semibold text-slate-800 truncate">{input.industry}</div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400">Geography</span>
              <div className="mt-1 font-semibold text-slate-800 truncate">
                {input.targetGeography.split(',')[0]}
              </div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400">Business Stage</span>
              <div className="mt-1 font-semibold text-slate-800 truncate">{input.businessStage}</div>
            </div>
            <div className="rounded-xl border border-slate-100 bg-slate-50/80 p-3">
              <span className="text-[10px] uppercase font-bold text-slate-400">Pilot Budget</span>
              <div className="mt-1 font-semibold text-slate-800 truncate">
                {input.budgetInr ? `₹${Number(input.budgetInr).toLocaleString('en-IN')}` : 'Bootstrapped'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Target Market & Target Customer Specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-lg bg-blue-50 p-2 text-blue-600">
              <Target className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Target Market Definition</h2>
              <span className="text-[11px] text-slate-400">Geographic & Economic Boundaries</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-700 bg-slate-50/80 rounded-xl p-4 border border-slate-100">
            {marketOverview.targetMarket}
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-lg bg-indigo-50 p-2 text-indigo-600">
              <Users className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Target Customer Segment</h2>
              <span className="text-[11px] text-slate-400">Primary Beneficiary & Buyer</span>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-700 bg-slate-50/80 rounded-xl p-4 border border-slate-100">
            {marketOverview.targetCustomers}
          </p>
        </div>
      </div>

      {/* Relevant Market Considerations */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-slate-100 p-2 text-slate-700">
              <Layers className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Relevant Market Considerations</h2>
              <p className="text-xs text-slate-500">
                Local operating dynamics, price sensitivities, and structural constraints.
              </p>
            </div>
          </div>
          <span className="text-xs font-mono text-slate-400">
            {marketOverview.relevantConsiderations.length} Factors
          </span>
        </div>

        <div className="space-y-2.5">
          {marketOverview.relevantConsiderations.map((item, idx) => (
            <div
              key={idx}
              className="flex items-start gap-3 rounded-xl border border-slate-100 bg-slate-50/50 p-3.5 text-xs sm:text-sm text-slate-700 leading-relaxed"
            >
              <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 font-mono text-[11px] font-bold text-blue-700">
                {idx + 1}
              </div>
              <span>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Known Information vs Missing Information (Epistemic Matrix) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Known Information */}
        <div className="rounded-2xl border border-emerald-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
              <CheckCircle2 className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Known Information (Observed Ground Realities)</h2>
              <span className="text-[11px] text-emerald-700">Supported by Initial Observations</span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {marketOverview.knownInformation.map((info, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded-lg border border-emerald-100 bg-emerald-50/40 p-3 text-xs leading-relaxed text-slate-700"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                <span>{info}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Missing Information (Research Gaps) */}
        <div className="rounded-2xl border border-amber-200/80 bg-white p-6 shadow-xs">
          <div className="flex items-center gap-2 mb-3">
            <div className="rounded-lg bg-amber-50 p-2 text-amber-700">
              <AlertTriangle className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">Missing Information (Explicit Research Gaps)</h2>
              <span className="text-[11px] text-amber-800">Must Verify in Field / Validation Lab</span>
            </div>
          </div>

          <ul className="space-y-2.5">
            {marketOverview.missingInformation.map((gap, idx) => (
              <li
                key={idx}
                className="flex items-start gap-2.5 rounded-lg border border-amber-100 bg-amber-50/40 p-3 text-xs leading-relaxed text-slate-700"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-amber-600 shrink-0" />
                <span>{gap}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Research Evidence Layer (Step 3: Genuine / Modular Evidence Records) */}
      {evidenceLayer && evidenceLayer.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-blue-50 p-1.5 text-blue-600">
                <Database className="h-4 w-4" />
              </div>
              <div>
                <h2 className="text-sm font-bold text-slate-900">
                  Modular Research Evidence Layer ({evidenceLayer.length} Records)
                </h2>
                <p className="text-xs text-slate-500">
                  Documented evidentiary basis underpinning market conclusions.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-slate-400">Step 3 Evidence Layer</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {evidenceLayer.map((ev) => (
              <div
                key={ev.id}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs space-y-2 flex flex-col justify-between"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded bg-slate-200/80 px-2 py-0.5 text-[10px] font-bold text-slate-700">
                      {ev.evidenceType}
                    </span>
                    {ev.verified ? (
                      <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700">
                        <ShieldCheck className="h-3 w-3" /> Verified Source
                      </span>
                    ) : (
                      <span className="text-[10px] text-amber-700 font-medium">Unverified / Sample</span>
                    )}
                  </div>
                  <p className="font-semibold text-slate-900 leading-snug">"{ev.claim}"</p>
                </div>

                <div className="border-t border-slate-200/60 pt-2 text-[11px] text-slate-500 space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-slate-700 truncate">{ev.sourceName}</span>
                    {ev.sourceUrl && (
                      <a
                        href={ev.sourceUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 text-blue-600 hover:underline"
                      >
                        <span>Link</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] italic text-slate-400">Limitations: {ev.limitations}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Research Coverage & Confidence Panel */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs">
        <h2 className="text-sm font-bold text-slate-900 mb-4">Research Coverage & Data Integrity</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
            <span className="text-[11px] text-slate-400 font-medium">Market Size Confidence</span>
            <div className="mt-1 font-bold text-slate-900">
              {marketOverview.researchCoverage.marketSizeConfidence}
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
            <span className="text-[11px] text-slate-400 font-medium">Competitor Density</span>
            <div className="mt-1 font-bold text-slate-900">
              {marketOverview.researchCoverage.competitorDensity}
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
            <span className="text-[11px] text-slate-400 font-medium">Customer Clarity Index</span>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="font-extrabold text-blue-600 text-base">
                {marketOverview.researchCoverage.customerClarityScore}
              </span>
              <span className="text-slate-400">/ 100</span>
            </div>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3.5">
            <span className="text-[11px] text-slate-400 font-medium">Dataset Status</span>
            <div className="mt-1 font-bold text-amber-800 truncate">
              {marketOverview.researchCoverage.dataFreshness}
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">
          <span className="text-xs text-slate-400">
            Proceed to inspect competitive alternatives or validate hypotheses:
          </span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentTab('competitor-intelligence')}
              className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
            >
              <span>Competitor Intelligence</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
            <button
              onClick={() => setCurrentTab('research-reports')}
              className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Full Dossier Report</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
