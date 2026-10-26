import React, { useState } from 'react';
import {
  FlaskConical,
  ArrowRight,
  Target,
  ListOrdered,
  FileQuestion,
  Bot,
  ShieldAlert,
  Scale,
  Users,
  AlertTriangle
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import { DemoBanner } from '../common/DemoBanner';
import type { ValidationItem } from '../../types';

export const ValidationLabView: React.FC = () => {
  const {
    activeProject,
    updateValidationStatus,
    setCurrentTab,
    generateValidationPlanWithGemini,
    isGeneratingPlan
  } = useResearch();

  const validationItems = activeProject.validationLab;
  const opportunities = activeProject.opportunities;
  const [selectedOppId, setSelectedOppId] = useState<string>(opportunities[0]?.id || '');

  const statusColors: Record<ValidationItem['status'], string> = {
    'Pending Test': 'bg-slate-100 text-slate-700 border-slate-200',
    'In Progress': 'bg-blue-50 text-blue-800 border-blue-200',
    'Validated': 'bg-emerald-50 text-emerald-800 border-emerald-200',
    'Invalidated': 'bg-rose-50 text-rose-800 border-rose-200',
  };

  const handleGeneratePlanForOpp = () => {
    if (!selectedOppId) return;
    generateValidationPlanWithGemini(selectedOppId);
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <DemoBanner />

      {/* Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              <FlaskConical className="h-3.5 w-3.5" />
              <span>Step 8 · Lean Startup Validation Testing Canvas</span>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Validation Lab & Experiment Protocol
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
              Falsifiable hypotheses, non-leading customer interview guides, sample size recommendations, and explicit decision rules to test demand before committing capital.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 border border-blue-200">
              {validationItems.length} Experiments Configured
            </span>
          </div>
        </div>

        {/* Epistemic Golden Rule */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/60 p-3 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Fundamental Validation Rule:</strong> Do not confuse stated customer interest ("That sounds useful, I'd probably buy it") with actual purchasing behavior (prepayments, deposits, referrals, or committed time). Only irreversible actions count as validation.
          </span>
        </div>
      </div>

      {/* AI Opportunity Generator Bar (Step 8: Select an opportunity and generate protocol) */}
      {opportunities.length > 0 && (
        <div className="rounded-2xl border border-blue-200 bg-gradient-to-r from-blue-50/60 via-white to-blue-50/40 p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <Bot className="h-4 w-4 text-blue-600" />
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-900">
                Generate Validation Plan for Opportunity
              </h3>
            </div>
            <p className="text-xs text-slate-500">
              Select any synthesized market opportunity to construct a tailored 5-question interview script and decision rule via Gemini.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap shrink-0">
            <select
              value={selectedOppId}
              onChange={(e) => setSelectedOppId(e.target.value)}
              className="rounded-xl border border-slate-200 bg-white py-2 px-3 text-xs font-medium text-slate-800 shadow-2xs focus:border-blue-500 focus:outline-none"
            >
              {opportunities.map((opp) => (
                <option key={opp.id} value={opp.id}>
                  {opp.title.slice(0, 36)}...
                </option>
              ))}
            </select>

            <button
              onClick={handleGeneratePlanForOpp}
              disabled={isGeneratingPlan || !selectedOppId}
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50 transition-all shrink-0"
            >
              <Bot className="h-3.5 w-3.5" />
              <span>{isGeneratingPlan ? 'Generating...' : 'Generate Plan'}</span>
            </button>
          </div>
        </div>
      )}

      {/* Validation Item Cards */}
      <div className="space-y-6">
        {validationItems.map((val, idx) => (
          <div
            key={val.id}
            className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6"
          >
            {/* Top row: Hypothesis & Status selector */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 border-b border-slate-100 pb-4">
              <div className="space-y-1.5 flex-1">
                <div className="flex items-center gap-2">
                  <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-blue-100 font-mono text-xs font-bold text-blue-800">
                    H{idx + 1}
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">
                    Testable Business Hypothesis
                  </span>
                </div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-snug">
                  "{val.hypothesis}"
                </h2>
              </div>

              {/* Status Switcher */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="text-xs text-slate-400 font-medium">Status:</span>
                <select
                  value={val.status}
                  onChange={(e) =>
                    updateValidationStatus(val.id, e.target.value as ValidationItem['status'])
                  }
                  className={`rounded-lg border px-3 py-1.5 text-xs font-semibold shadow-2xs focus:outline-none ${statusColors[val.status]}`}
                >
                  <option value="Pending Test">Pending Test</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Validated">Validated</option>
                  <option value="Invalidated">Invalidated</option>
                </select>
              </div>
            </div>

            {/* Customer Interview Questions (Exactly 5 Unbiased Questions) */}
            <div className="rounded-xl border border-blue-100 bg-blue-50/30 p-5 space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileQuestion className="h-4 w-4 text-blue-600" />
                  <h3 className="text-xs font-bold uppercase tracking-wider text-blue-900">
                    Unbiased Customer Discovery Questions (Non-Leading)
                  </h3>
                </div>
                <span className="text-[11px] font-mono text-blue-700">The Mom Test Principles</span>
              </div>

              <ul className="space-y-2 text-xs sm:text-sm text-slate-800">
                {val.interviewQuestions.map((q, qIdx) => (
                  <li
                    key={qIdx}
                    className="flex items-start gap-2.5 rounded-lg border border-blue-100/60 bg-white p-3 font-medium text-slate-800"
                  >
                    <span className="font-mono text-blue-600 font-bold shrink-0">Q{qIdx + 1}:</span>
                    <span>"{q}"</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Experiment, Sample Size, Success Metric, Decision Rule Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
              {/* Suggested Low-Cost Experiment */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                  <FlaskConical className="h-3.5 w-3.5 text-slate-600" />
                  <span>Lean Experiment</span>
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                  {val.lowCostExperiment || val.suggestedExperiment}
                </p>
              </div>

              {/* Recommended Sample Size */}
              <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-slate-500 text-[10px]">
                  <Users className="h-3.5 w-3.5 text-slate-600" />
                  <span>Recommended Sample</span>
                </div>
                <p className="text-xs font-semibold text-slate-900 leading-relaxed">
                  {val.recommendedSampleSize || '15 target customers in cluster'}
                </p>
              </div>

              {/* Measurable Success Metric */}
              <div className="rounded-xl border border-emerald-200 bg-emerald-50/30 p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-emerald-900 text-[10px]">
                  <Target className="h-3.5 w-3.5 text-emerald-600" />
                  <span>Measurable Success Metric</span>
                </div>
                <p className="text-xs font-semibold text-emerald-950 leading-relaxed">
                  {val.measurableSuccessMetric || val.successMetric}
                </p>
              </div>

              {/* Decision Rule */}
              <div className="rounded-xl border border-purple-200 bg-purple-50/30 p-4 space-y-2">
                <div className="flex items-center gap-1.5 font-bold uppercase tracking-wider text-purple-900 text-[10px]">
                  <Scale className="h-3.5 w-3.5 text-purple-600" />
                  <span>Decision Rule</span>
                </div>
                <p className="text-xs font-semibold text-purple-950 leading-relaxed">
                  {val.decisionRule || 'If metric met, commit seed capital; if missed, pivot value proposition.'}
                </p>
              </div>
            </div>

            {/* Potential Confounding Factors */}
            {val.potentialConfoundingFactors && val.potentialConfoundingFactors.length > 0 && (
              <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 space-y-1.5 text-xs">
                <div className="flex items-center gap-1.5 font-bold text-amber-950 uppercase tracking-wider text-[10px]">
                  <AlertTriangle className="h-3.5 w-3.5 text-amber-700" />
                  <span>Potential Confounding Factors & Biases to Watch Out For</span>
                </div>
                <ul className="space-y-1 text-slate-700">
                  {val.potentialConfoundingFactors.map((factor, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <span className="mt-1 h-1 w-1 rounded-full bg-amber-600 shrink-0" />
                      <span>{factor}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Actionable Next Steps Checklist */}
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">
                <ListOrdered className="h-3.5 w-3.5 text-slate-500" />
                <span>Immediate Next Steps</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                {val.nextSteps.map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="flex items-start gap-2 rounded-lg border border-slate-200 bg-white p-3 text-xs text-slate-700"
                  >
                    <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-slate-100 font-mono text-[10px] font-bold text-slate-600">
                      {sIdx + 1}
                    </span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Next Step Nav */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
        <span className="text-slate-500">
          Generate a comprehensive, printable intelligence report of all findings:
        </span>
        <button
          onClick={() => setCurrentTab('research-reports')}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <span>View Research Report</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
