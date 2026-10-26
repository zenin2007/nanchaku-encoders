import React, { useState } from 'react';
import {
  HeartHandshake,
  MessageSquarePlus,
  ArrowRight,
  Send,
  CheckCircle,
  Quote,
  ShieldAlert,
  Bot,
  HelpCircle,
  Split
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import { DemoBanner } from '../common/DemoBanner';
import { EvidenceBadge } from '../common/Badge';

export const CustomerPreferencesView: React.FC = () => {
  const {
    activeProject,
    addCustomerInterviewNote,
    setCurrentTab,
    analyzeFeedbackWithGemini,
    isAnalyzingFeedback
  } = useResearch();

  const [feedbackInput, setFeedbackInput] = useState('');
  const [justAdded, setJustAdded] = useState(false);

  const preferences = activeProject.customerPreferences;
  const analysis = activeProject.customerPreferenceAnalysis;
  const interviewNotes = activeProject.userInterviewNotes || [];

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!feedbackInput.trim()) return;
    addCustomerInterviewNote(feedbackInput);
    setFeedbackInput('');
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 3000);
  };

  const criticalNeeds = preferences.filter((p) => p.category === 'Critical Need');
  const painPoints = preferences.filter((p) => p.category === 'Pain Point');
  const desiredFeatures = preferences.filter((p) => p.category === 'Desired Feature');
  const purchasingBarriers = preferences.filter((p) => p.category === 'Purchasing Barrier');

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <DemoBanner />

      {/* Header Card */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-emerald-200 bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-800">
              <HeartHandshake className="h-3.5 w-3.5" />
              <span>Step 6 · Customer Discovery & Voice of the Buyer</span>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Customer Preferences & Friction Points
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
              Target Segment: <span className="font-semibold text-slate-800">{activeProject.input.targetCustomer}</span> in {activeProject.input.targetGeography}.
              Direct customer statements are explicitly distinguished from AI interpretations.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-800 border border-emerald-200">
              {interviewNotes.length} Qualitative Quotes Logged
            </span>
          </div>
        </div>
      </div>

      {/* Interactive Input: Paste Customer Feedback / Interview Notes */}
      <div className="rounded-2xl border border-blue-200 bg-gradient-to-br from-blue-50/40 via-white to-white p-6 shadow-xs">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="rounded-lg bg-blue-600 p-1.5 text-white shadow-xs">
              <MessageSquarePlus className="h-4 w-4" />
            </div>
            <div>
              <h2 className="text-sm font-bold text-slate-900">
                Log Customer Feedback, Interview Notes, or Survey Responses
              </h2>
              <p className="text-xs text-slate-500">
                Paste raw snippets from interviews, WhatsApp inquiries, or survey responses.
              </p>
            </div>
          </div>
          {justAdded && (
            <span className="inline-flex items-center gap-1 rounded bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800 animate-in fade-in">
              <CheckCircle className="h-3.5 w-3.5" /> Added to Dossier!
            </span>
          )}
        </div>

        <form onSubmit={handleAddNote} className="space-y-3">
          <textarea
            rows={3}
            value={feedbackInput}
            onChange={(e) => setFeedbackInput(e.target.value)}
            placeholder="Paste verbatim customer feedback (e.g., 'Student interview: The hostel dinner is always late and cold. If I could get food at 1:15 PM sharp on study days, I would gladly pay ₹60 per meal...')"
            className="w-full rounded-xl border border-slate-200 bg-white p-3 text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          />

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <span className="text-[11px] text-slate-400">
              Quotes appear in your Field Evidence Log and can be analyzed by Gemini to extract recurring themes.
            </span>
            <button
              type="submit"
              disabled={!feedbackInput.trim()}
              className="flex items-center justify-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shrink-0"
            >
              <Send className="h-3.5 w-3.5" />
              <span>Record Customer Note</span>
            </button>
          </div>
        </form>
      </div>

      {/* Field Evidence Log (If user or sample has quotes) */}
      {interviewNotes.length > 0 && (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Quote className="h-4 w-4 text-slate-500" />
              <h2 className="text-sm font-bold text-slate-900">
                Direct Field Quotes & Interview Notes ({interviewNotes.length})
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={analyzeFeedbackWithGemini}
                disabled={isAnalyzingFeedback}
                className="flex items-center gap-1.5 rounded-lg bg-blue-50 border border-blue-200 px-3 py-1.5 text-xs font-bold text-blue-800 hover:bg-blue-100 disabled:opacity-50 transition-all shadow-2xs"
              >
                <Bot className="h-3.5 w-3.5 text-blue-600" />
                <span>{isAnalyzingFeedback ? 'Synthesizing with Gemini...' : 'Analyze Quotes with Gemini'}</span>
              </button>
              <EvidenceBadge status="Qualitative Observation" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {interviewNotes.map((note, idx) => (
              <div
                key={idx}
                className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-700 leading-relaxed relative flex flex-col justify-between"
              >
                <p className="italic text-slate-800 font-normal">"{note}"</p>
                <div className="mt-3 flex items-center justify-between border-t border-slate-200/60 pt-2 text-[10px] text-slate-400">
                  <span>Record #{interviewNotes.length - idx}</span>
                  <span className="font-semibold text-emerald-700">Direct Customer Voice</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 6 Deep Qualitative Breakdown (Recurring Themes, Contradictions, Missing Evidence) */}
      {analysis && (
        <div className="rounded-2xl border border-blue-200 bg-blue-50/20 p-6 shadow-xs space-y-4">
          <div className="flex items-center gap-2 border-b border-blue-100 pb-3">
            <Bot className="h-4 w-4 text-blue-600" />
            <h3 className="text-sm font-bold text-slate-900">
              Gemini Qualitative Discovery Synthesis
            </h3>
            <span className="rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
              AI Qualitative Analysis
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
            {/* Recurring Themes */}
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <span className="font-bold text-slate-800 uppercase tracking-wider text-[10px]">
                Recurring Themes
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {analysis.recurringThemes.map((theme, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-blue-500 shrink-0" />
                    <span>{theme}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contradictions & Tensions */}
            <div className="rounded-xl border border-amber-200 bg-white p-4 space-y-2">
              <span className="font-bold text-amber-900 uppercase tracking-wider text-[10px]">
                Observed Contradictions
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {analysis.contradictions.map((c, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <Split className="h-3 w-3 text-amber-600 shrink-0 mt-0.5" />
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Missing Evidence */}
            <div className="rounded-xl border border-rose-200 bg-white p-4 space-y-2">
              <span className="font-bold text-rose-900 uppercase tracking-wider text-[10px]">
                Missing Evidence (Discovery Gaps)
              </span>
              <ul className="space-y-1.5 text-slate-700">
                {analysis.missingEvidence.map((m, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <HelpCircle className="h-3 w-3 text-rose-600 shrink-0 mt-0.5" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* 4 Core Structured Preference Sections with Direct Evidence vs AI Interpretation */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Critical Needs */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <h2 className="text-sm font-bold text-slate-900">1. Critical Customer Needs</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Core Hygiene Factors</span>
          </div>

          <div className="space-y-3">
            {criticalNeeds.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-emerald-100 bg-emerald-50/30 p-4 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <EvidenceBadge status={item.evidenceStatus} />
                </div>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>

                {item.directEvidenceSnippet && (
                  <div className="rounded-lg bg-emerald-100/60 p-2 text-[11px] text-emerald-950 italic">
                    <span className="font-bold not-italic">Customer Quote:</span> "{item.directEvidenceSnippet}"
                  </div>
                )}

                {item.aiInterpretation && (
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">AI Interpretation:</span> {item.aiInterpretation}
                  </div>
                )}

                <div className="rounded-lg bg-white border border-emerald-200/60 p-2.5 text-[11px] text-emerald-900">
                  <span className="font-semibold">Recommended Action:</span> {item.suggestedAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 2. Pain Points */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <h2 className="text-sm font-bold text-slate-900">2. Current Pain Points & Friction</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Churn Drivers</span>
          </div>

          <div className="space-y-3">
            {painPoints.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-rose-100 bg-rose-50/30 p-4 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <EvidenceBadge status={item.evidenceStatus} />
                </div>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>

                {item.directEvidenceSnippet && (
                  <div className="rounded-lg bg-rose-100/60 p-2 text-[11px] text-rose-950 italic">
                    <span className="font-bold not-italic">Customer Quote:</span> "{item.directEvidenceSnippet}"
                  </div>
                )}

                {item.aiInterpretation && (
                  <div className="text-[11px] text-slate-500">
                    <span className="font-semibold text-slate-700">AI Interpretation:</span> {item.aiInterpretation}
                  </div>
                )}

                <div className="rounded-lg bg-white border border-rose-200/60 p-2.5 text-[11px] text-rose-950">
                  <span className="font-semibold">Recommended Action:</span> {item.suggestedAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 3. Desired Features */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-blue-500" />
              <h2 className="text-sm font-bold text-slate-900">3. Desired Features (Delighters)</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Differentiation</span>
          </div>

          <div className="space-y-3">
            {desiredFeatures.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-blue-100 bg-blue-50/30 p-4 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <EvidenceBadge status={item.evidenceStatus} />
                </div>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>

                {item.directEvidenceSnippet && (
                  <div className="rounded-lg bg-blue-100/60 p-2 text-[11px] text-blue-950 italic">
                    <span className="font-bold not-italic">Customer Quote:</span> "{item.directEvidenceSnippet}"
                  </div>
                )}

                <div className="rounded-lg bg-white border border-blue-200/60 p-2.5 text-[11px] text-blue-950">
                  <span className="font-semibold">Recommended Action:</span> {item.suggestedAction}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 4. Purchasing Considerations & Barriers */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <h2 className="text-sm font-bold text-slate-900">4. Purchasing Considerations & Barriers</h2>
            </div>
            <span className="text-xs font-mono text-slate-400">Adoption Friction</span>
          </div>

          <div className="space-y-3">
            {purchasingBarriers.map((item) => (
              <div
                key={item.id}
                className="rounded-xl border border-amber-100 bg-amber-50/30 p-4 text-xs space-y-2"
              >
                <div className="flex items-start justify-between gap-2">
                  <h4 className="font-bold text-slate-900">{item.title}</h4>
                  <EvidenceBadge status={item.evidenceStatus} />
                </div>
                <p className="text-slate-600 leading-relaxed">{item.description}</p>

                {item.directEvidenceSnippet && (
                  <div className="rounded-lg bg-amber-100/60 p-2 text-[11px] text-amber-950 italic">
                    <span className="font-bold not-italic">Customer Quote:</span> "{item.directEvidenceSnippet}"
                  </div>
                )}

                <div className="rounded-lg bg-white border border-amber-200/60 p-2.5 text-[11px] text-amber-950">
                  <span className="font-semibold">Recommended Action:</span> {item.suggestedAction}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Suggested Discovery Questions & Epistemic Guardrail Notice */}
      <div className="rounded-2xl border border-slate-200 bg-slate-50/80 p-6 shadow-xs space-y-3">
        <div className="flex items-start gap-3">
          <ShieldAlert className="h-5 w-5 text-amber-700 mt-0.5 shrink-0" />
          <div className="space-y-2 flex-1">
            <h3 className="text-sm font-bold text-slate-900">
              Suggested Research Questions & Epistemic Guardrail
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              When real customer interview data is absent or limited, these preference cards represent{' '}
              <span className="font-semibold text-blue-800">preliminary hypotheses</span>. Always ask non-leading discovery questions focusing on past actions rather than hypothetical desires.
            </p>

            {analysis?.suggestedResearchQuestions && analysis.suggestedResearchQuestions.length > 0 && (
              <div className="mt-3 rounded-xl border border-slate-200 bg-white p-3 space-y-1.5 text-xs">
                <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
                  Suggested Discovery Interview Questions:
                </span>
                <ul className="space-y-1 text-slate-700">
                  {analysis.suggestedResearchQuestions.map((q, idx) => (
                    <li key={idx} className="flex items-start gap-1.5 font-medium">
                      <span className="text-blue-600 font-bold shrink-0">Q{idx + 1}:</span>
                      <span>"{q}"</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Next Step Nav */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
        <span className="text-slate-500">
          Transform customer preferences into actionable product opportunities:
        </span>
        <button
          onClick={() => setCurrentTab('market-opportunities')}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <span>Market Opportunities</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
