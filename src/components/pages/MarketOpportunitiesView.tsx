import React from 'react';
import {
  Lightbulb,
  ArrowRight,
  AlertTriangle,
  CheckCircle,
  FlaskConical,
  Bot,
  ShieldAlert,
  Target,
  Users
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import { DemoBanner } from '../common/DemoBanner';
import { EvidenceBadge } from '../common/Badge';

export const MarketOpportunitiesView: React.FC = () => {
  const {
    activeProject,
    setCurrentTab,
    generateValidationPlanWithGemini,
    isGeneratingPlan
  } = useResearch();

  const opportunities = activeProject.opportunities;

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <DemoBanner />

      {/* Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-amber-200 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-800">
              <Lightbulb className="h-3.5 w-3.5" />
              <span>Step 5 & 7 · Explainable Market Opportunity Synthesis</span>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Market Opportunity Theses
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
              Grounded commercial hypotheses bridging competitor vulnerabilities with customer friction points. Every thesis is fully explainable with explicit assumptions, risks, and experimental validation gates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-mono font-semibold text-slate-700">
              {opportunities.length} Actionable Theses
            </span>
          </div>
        </div>

        {/* Epistemic note */}
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50/70 p-3 text-[11px] text-slate-600 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            <strong>Epistemic Guardrail:</strong> MarketLens AI intentionally avoids assigning arbitrary success probability numbers (e.g., "82% chance of success"). Every opportunity represents an unproven commercial hypothesis that requires empirical validation.
          </span>
        </div>
      </div>

      {/* Opportunities List */}
      <div className="space-y-6">
        {opportunities.map((opp, idx) => {
          const isUnverified =
            !opp.evidenceQuality ||
            opp.evidenceQuality.includes('Weak') ||
            opp.evidenceStatus === 'Preliminary Hypothesis' ||
            opp.evidenceStatus === 'Demonstration Sample';

          return (
            <div
              key={opp.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs hover:border-blue-300 transition-all space-y-5"
            >
              {/* Top row: Title, badges, and value rating */}
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 border-b border-slate-100 pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 font-mono text-xs font-bold text-blue-800">
                      #{idx + 1}
                    </span>
                    <h2 className="text-base sm:text-lg font-bold text-slate-900">{opp.title}</h2>
                    <EvidenceBadge status={opp.evidenceStatus} />
                    {opp.evidenceQuality && (
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-bold ${
                          opp.evidenceQuality.includes('Strong')
                            ? 'bg-emerald-100 text-emerald-800'
                            : opp.evidenceQuality.includes('Moderate')
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {opp.evidenceQuality}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 text-xs text-slate-500">
                    <span className="font-semibold text-slate-700">Target Segment:</span>
                    <span>{opp.targetCustomer}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="rounded-full bg-blue-50 px-2.5 py-1 text-xs font-semibold text-blue-700 border border-blue-100">
                    Potential: {opp.potentialValue}
                  </span>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                    Complexity: {opp.estimatedComplexity}
                  </span>
                </div>
              </div>

              {/* Requirement 5 Callout: If evidence is insufficient, show explicit validation warning */}
              {isUnverified && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-xs text-amber-900 flex items-center gap-2 font-semibold">
                  <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0" />
                  <span>Potential opportunity — requires validation before capital commitment.</span>
                </div>
              )}

              {/* Explainability Section 1: Why the Opportunity was Identified */}
              <div className="space-y-1.5">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                  1. Why This Opportunity Was Identified (Strategic Rationale)
                </span>
                <p className="text-sm text-slate-800 leading-relaxed font-normal bg-slate-50/80 rounded-xl p-4 border border-slate-100">
                  {opp.description}
                </p>
              </div>

              {/* Explainability Section 2: Customer Problem & Competitor Observations */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Which Customer Problem it Addresses */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    <Target className="h-3.5 w-3.5 text-blue-600" />
                    <span>2. Customer Problem Addressed</span>
                  </div>
                  <p className="text-slate-700 leading-relaxed">
                    {opp.customerProblem ||
                      `Target customers (${opp.targetCustomer}) face ongoing friction due to rigid commitments, high prices, or inconsistent quality from existing market options.`}
                  </p>
                </div>

                {/* Which Competitor Observations are Relevant */}
                <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-slate-900 uppercase tracking-wider text-[10px]">
                    <Users className="h-3.5 w-3.5 text-indigo-600" />
                    <span>3. Relevant Competitor Observations</span>
                  </div>
                  {opp.relevantCompetitorObservations && opp.relevantCompetitorObservations.length > 0 ? (
                    <ul className="space-y-1 text-slate-700">
                      {opp.relevantCompetitorObservations.map((obs, i) => (
                        <li key={i} className="flex items-start gap-1.5">
                          <span className="mt-1 h-1 w-1 rounded-full bg-slate-400 shrink-0" />
                          <span>{obs}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-slate-600">
                      Incumbents enforce inflexible monthly lock-in contracts and suffer from service reliability gaps during peak hours.
                    </p>
                  )}
                </div>
              </div>

              {/* Explainability Section 3: Supporting Evidence vs What Remains Uncertain */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                {/* Supporting Customer Evidence */}
                <div className="rounded-xl border border-emerald-100 bg-emerald-50/20 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-emerald-900 uppercase tracking-wider text-[10px]">
                    <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
                    <span>4. Supporting Evidence & Observations</span>
                  </div>
                  <ul className="space-y-1.5 text-slate-700">
                    {opp.supportingObservations.map((obs, i) => (
                      <li key={i} className="flex items-start gap-1.5 leading-normal">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />
                        <span>{obs}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* What Remains Uncertain (Critical Assumptions & Risks) */}
                <div className="rounded-xl border border-rose-100 bg-rose-50/20 p-4 space-y-2">
                  <div className="flex items-center gap-1.5 font-bold text-rose-900 uppercase tracking-wider text-[10px]">
                    <AlertTriangle className="h-3.5 w-3.5 text-rose-600" />
                    <span>5. What Remains Uncertain (Assumptions & Risks)</span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <span className="font-semibold text-slate-800 text-[11px]">Unproven Assumptions:</span>
                      <ul className="mt-1 space-y-1 text-slate-600">
                        {opp.keyAssumptions.map((assump, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="mt-1 h-1 w-1 rounded-full bg-blue-500 shrink-0" />
                            <span>{assump}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="font-semibold text-rose-900 text-[11px]">Primary Execution Risks:</span>
                      <ul className="mt-1 space-y-1 text-slate-600">
                        {opp.primaryRisks.map((risk, i) => (
                          <li key={i} className="flex items-start gap-1.5">
                            <span className="mt-1 h-1 w-1 rounded-full bg-rose-500 shrink-0" />
                            <span>{risk}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Explainability Section 4: How the User Can Test It */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="space-y-1 text-xs">
                  <div className="flex items-center gap-1.5 font-bold text-amber-950 uppercase tracking-wider text-[10px]">
                    <FlaskConical className="h-3.5 w-3.5 text-amber-700" />
                    <span>6. How You Can Test It (Recommended Validation Experiment)</span>
                  </div>
                  <p className="text-amber-900 font-semibold leading-relaxed">
                    {opp.recommendedValidationExperiment || opp.validationExperiment}
                  </p>
                  {opp.successMetric && (
                    <p className="text-[11px] text-amber-800">
                      <span className="font-bold">Measurable Success Gate:</span> {opp.successMetric}
                    </p>
                  )}
                  {opp.recommendedNextAction && (
                    <p className="text-[11px] text-slate-600">
                      <span className="font-bold text-slate-700">Immediate Next Step:</span> {opp.recommendedNextAction}
                    </p>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2 shrink-0">
                  <button
                    onClick={() => generateValidationPlanWithGemini(opp.id)}
                    disabled={isGeneratingPlan}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg bg-blue-600 px-3.5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-blue-700 disabled:opacity-50 transition-colors"
                  >
                    <Bot className="h-3.5 w-3.5" />
                    <span>Generate AI Protocol</span>
                  </button>

                  <button
                    onClick={() => setCurrentTab('validation-lab')}
                    className="w-full sm:w-auto flex items-center justify-center gap-1.5 rounded-lg bg-amber-600 px-3.5 py-2 text-xs font-bold text-white shadow-2xs hover:bg-amber-700 transition-colors"
                  >
                    <span>Open Validation Lab</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Next Step Nav */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
        <span className="text-slate-500">
          Ready to construct validation interviews and experiment metrics?
        </span>
        <button
          onClick={() => setCurrentTab('validation-lab')}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <span>Open Validation Lab</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
