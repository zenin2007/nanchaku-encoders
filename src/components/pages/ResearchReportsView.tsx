import React, { useState } from 'react';
import {
  Printer,
  Copy,
  Check,
  Bot,
  Download
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import { DemoBanner } from '../common/DemoBanner';
import { EvidenceBadge } from '../common/Badge';

export const ResearchReportsView: React.FC = () => {
  const { activeProject } = useResearch();
  const [copied, setCopied] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const isLive = activeProject.metadata?.mode === 'gemini-live';

  const handlePrint = () => {
    window.print();
  };

  const generateMarkdownDossier = () => {
    return `
# MarketLens AI — Comprehensive Strategic Research Dossier
**Project**: ${activeProject.title}
**Date**: ${new Date(activeProject.createdAt).toLocaleDateString()}
**Status**: ${isLive ? 'Live Gemini 2.5 Flash Synthesis' : 'Demonstration Dataset (Calibrated Benchmark)'}
**Industry**: ${activeProject.input.industry} | **Location**: ${activeProject.input.targetGeography} | **Budget**: ${activeProject.input.budgetInr ? '₹' + Number(activeProject.input.budgetInr).toLocaleString('en-IN') : 'Bootstrapped'}

---

## 1. Research Question
"${activeProject.marketOverview.researchQuestion}"

---

## 2. Executive Summary
${activeProject.metadata?.executiveSummary || 'Market parameters evaluated across regional density, local incumbent service structures, and buyer switching friction. Evidence indicates clear demand for flexible commitment models.'}

---

## 3. Research Scope
- **Target Customer Segment**: ${activeProject.marketOverview.targetCustomers}
- **Geographic Unit of Analysis**: ${activeProject.marketOverview.targetMarket}
- **Venture Stage**: ${activeProject.input.businessStage}
- **Investigative Focus**: ${activeProject.input.researchObjective}

---

## 4. Market Overview & Considerations
### Key Considerations:
${activeProject.marketOverview.relevantConsiderations.map((c, i) => `${i + 1}. ${c}`).join('\n')}

### Known Ground Facts:
${activeProject.marketOverview.knownInformation.map((k) => `- ${k}`).join('\n')}

### Explicit Research Gaps (Missing Information):
${activeProject.marketOverview.missingInformation.map((m) => `- ${m}`).join('\n')}

---

## 5. Competitor Comparison Matrix
${activeProject.competitors
  .map(
    (c) => `
### ${c.name} (${c.type} Competitor)
- **Offering**: ${c.serviceOffering}
- **Customer Segment**: ${c.customerSegment}
- **Pricing Benchmark**: ${c.pricingEstimate}
- **Strengths**: ${c.strengths.join(', ')}
- **Potential Weaknesses**: ${c.weaknesses.join(', ')}
- **Missing Information**: ${c.missingInformation?.join(', ') || 'None noted'}
- **Evidence Status**: ${c.evidenceStatus}
`
  )
  .join('\n')}

---

## 6. Customer Preference Analysis
${activeProject.customerPreferences
  .map(
    (p) => `- **[${p.category}] ${p.title}**: ${p.description} (Suggested Action: ${p.suggestedAction})`
  )
  .join('\n')}

${
  activeProject.userInterviewNotes && activeProject.userInterviewNotes.length > 0
    ? `\n### Customer Quotes Log:\n${activeProject.userInterviewNotes.map((n, i) => `Quote ${i + 1}: "${n}"`).join('\n')}`
    : ''
}

---

## 7. Potential Market Opportunities
${activeProject.opportunities
  .map(
    (o, i) => `
### Opportunity #${i + 1}: ${o.title}
- **Description & Rationale**: ${o.description}
- **Customer Problem**: ${o.customerProblem || 'Friction with inflexible alternatives'}
- **Evidence Quality**: ${o.evidenceQuality || o.evidenceStatus}
- **Critical Assumptions**: ${o.keyAssumptions.join('; ')}
- **Primary Risks**: ${o.primaryRisks.join('; ')}
- **Recommended Test**: ${o.recommendedValidationExperiment}
`
  )
  .join('\n')}

---

## 8. Supporting Evidence
${(activeProject.evidenceLayer || [])
  .map(
    (e, i) => `${i + 1}. **[${e.evidenceType}]** "${e.claim}"
   - Source: ${e.sourceName} ${e.sourceUrl ? `(${e.sourceUrl})` : ''}
   - Date: ${e.retrievalDate} | Limitations: ${e.limitations} | Verified: ${e.verified ? 'Yes' : 'Unverified Sample'}`
  )
  .join('\n\n')}

---

## 9. Assumptions and Limitations
- Findings from qualitative discovery reflect sample cohorts and require broader survey verification.
- Competitive pricing represents spot audits subject to seasonal or promotional variance.
- Hypotheses must be tested with irreversible commitments (deposits, pre-orders) before capital expenditure.

---

## 10. Validation Experiments & Protocol
${activeProject.validationLab
  .map(
    (v, i) => `
### Experiment H${i + 1}: ${v.hypothesis}
- **Lean Experiment**: ${v.lowCostExperiment || v.suggestedExperiment}
- **Success Gate**: ${v.measurableSuccessMetric || v.successMetric}
- **Decision Rule**: ${v.decisionRule || 'If gate met, proceed; else pivot'}
- **Interview Questions**:
${v.interviewQuestions.map((q, qI) => `  Q${qI + 1}: "${q}"`).join('\n')}
`
  )
  .join('\n')}

---

## 11. Recommended Next Steps
1. Print 50 discovery flyers with WhatsApp QR code or conduct 10 in-person interviews at target student cluster.
2. Formulate 1 micro-trial voucher pass (e.g. ₹165 for 3 meals) to gauge upfront commitment.
3. Track verbatim feedback and measure 48-hour conversion gate.

---

## 12. Source List
${(activeProject.evidenceLayer || [])
  .map(
    (e) => `- ${e.sourceName} (${e.evidenceType}) ${e.sourceUrl ? `— ${e.sourceUrl}` : ''}`
  )
  .join('\n')}
- MarketLens AI Research Framework · Academic & Field Methodology
`.trim();
  };

  const handleCopySummary = () => {
    const summary = generateMarkdownDossier();
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleDownloadDossier = () => {
    const markdown = generateMarkdownDossier();
    const blob = new Blob([markdown], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `MarketLens_Dossier_${activeProject.id}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 2500);
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto pb-20">
      <DemoBanner />

      {/* Action Toolbar (Hidden during print) */}
      <div className="no-print flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-xs">
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900">Research Dossier Export</h2>
            {isLive ? (
              <span className="inline-flex items-center gap-1 rounded bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                <Bot className="h-3 w-3" /> Gemini 2.5 Flash
              </span>
            ) : (
              <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
                Demonstration Sample
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500">
            Export, download, or print this comprehensive 12-section market analysis dossier.
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            onClick={handleCopySummary}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-2xs"
          >
            {copied ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-700">Copied</span>
              </>
            ) : (
              <>
                <Copy className="h-4 w-4 text-slate-500" />
                <span>Copy Text</span>
              </>
            )}
          </button>

          <button
            onClick={handleDownloadDossier}
            className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 active:scale-[0.98] transition-all shadow-2xs"
          >
            {downloaded ? (
              <>
                <Check className="h-4 w-4 text-emerald-600" />
                <span className="text-emerald-700">Saved .MD</span>
              </>
            ) : (
              <>
                <Download className="h-4 w-4 text-slate-500" />
                <span>Download Report</span>
              </>
            )}
          </button>

          <button
            onClick={handlePrint}
            className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-4 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            <Printer className="h-4 w-4" />
            <span>Print / Save as PDF</span>
          </button>
        </div>
      </div>

      {/* Printable Report Document Sheet */}
      <div className="rounded-2xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-8 print:p-0 print:border-none print:shadow-none">
        {/* Document Header */}
        <div className="border-b border-slate-200 pb-6 flex flex-col sm:flex-row sm:items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-base tracking-tight text-blue-900">
                MarketLens AI
              </span>
              <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold text-slate-600 border border-slate-200">
                STRATEGIC RESEARCH DOSSIER
              </span>
              <EvidenceBadge status={isLive ? 'Qualitative Observation' : 'Demonstration Sample'} />
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              {activeProject.title}
            </h1>
            <p className="text-xs text-slate-500 font-mono">
              Generated: {new Date(activeProject.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} · Project ID: {activeProject.id} · Model: {activeProject.metadata?.modelUsed || 'Deterministic Demonstration Engine'}
            </p>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs space-y-1.5 min-w-[220px]">
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Industry:</span>
              <span className="font-semibold text-slate-800">{activeProject.input.industry}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Location:</span>
              <span className="font-semibold text-slate-800">{activeProject.input.targetGeography.split(',')[0]}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Stage:</span>
              <span className="font-semibold text-slate-800">{activeProject.input.businessStage}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400 font-medium">Pilot Budget:</span>
              <span className="font-semibold text-slate-800">
                {activeProject.input.budgetInr ? `₹${Number(activeProject.input.budgetInr).toLocaleString('en-IN')}` : 'Bootstrapped'}
              </span>
            </div>
          </div>
        </div>

        {/* 1. Research Question */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
            1. Core Strategic Research Question
          </h2>
          <div className="rounded-xl border border-blue-100 bg-blue-50/40 p-4">
            <p className="text-sm font-semibold text-slate-900">
              "{activeProject.marketOverview.researchQuestion}"
            </p>
          </div>
        </div>

        {/* 2. Executive Summary */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
            2. Executive Summary
          </h2>
          <div className="rounded-xl border border-slate-100 bg-slate-50 p-4 text-xs text-slate-700 leading-relaxed space-y-2">
            <p>
              {activeProject.metadata?.executiveSummary ||
                'This research dossier synthesizes the market parameters, competitor density, and buyer friction points for an early-stage venture. Evidence highlights significant student dissatisfaction with rigid monthly dhaba contracts and high on-demand delivery fees, unlocking space for a cluster-based flexi-pass subscription.'}
            </p>
          </div>
        </div>

        {/* 3. Research Scope & 4. Market Overview */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
            3. Research Scope & 4. Market Overview
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3.5 space-y-1">
              <span className="font-bold text-slate-800">Target Market Bounds</span>
              <p className="text-slate-600 leading-relaxed">{activeProject.marketOverview.targetMarket}</p>
            </div>
            <div className="rounded-lg border border-slate-100 bg-slate-50/70 p-3.5 space-y-1">
              <span className="font-bold text-slate-800">Customer Segment Definition</span>
              <p className="text-slate-600 leading-relaxed">{activeProject.marketOverview.targetCustomers}</p>
            </div>
          </div>

          <div className="space-y-2 text-xs">
            <span className="font-bold text-slate-800 text-[11px] uppercase tracking-wider">
              Relevant Market Considerations:
            </span>
            <ul className="space-y-1 text-slate-600">
              {activeProject.marketOverview.relevantConsiderations.map((c, i) => (
                <li key={i} className="flex items-start gap-1.5">
                  <span className="mt-1 h-1 w-1 rounded-full bg-blue-500 shrink-0" />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* 5. Competitor Comparison Matrix */}
        <div className="space-y-4 print-page-break">
          <div className="flex items-center justify-between border-b border-slate-100 pb-1">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">
              5. Competitor Landscape Comparison
            </h2>
            <span className="text-xs text-slate-400 font-mono">
              {activeProject.competitors.length} Providers Benchmarked
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border border-slate-200 rounded-lg">
              <thead className="bg-slate-50 font-bold uppercase text-[10px] text-slate-500 border-b border-slate-200">
                <tr>
                  <th className="py-2.5 px-3">Competitor</th>
                  <th className="py-2.5 px-3">Type</th>
                  <th className="py-2.5 px-3">Pricing Benchmark</th>
                  <th className="py-2.5 px-3">Positioning & Strengths</th>
                  <th className="py-2.5 px-3">Observable Weaknesses</th>
                  <th className="py-2.5 px-3">Missing Info</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {activeProject.competitors.map((c) => (
                  <tr key={c.id}>
                    <td className="py-2.5 px-3 font-semibold text-slate-900">{c.name}</td>
                    <td className="py-2.5 px-3 text-slate-600">{c.type}</td>
                    <td className="py-2.5 px-3 font-mono text-slate-800">{c.pricingEstimate}</td>
                    <td className="py-2.5 px-3 text-slate-700">
                      <div>{c.positioning || c.keyDifferentiator}</div>
                      <div className="text-[10px] text-emerald-700 font-medium">{c.strengths[0]}</div>
                    </td>
                    <td className="py-2.5 px-3 text-rose-700">{c.weaknesses[0] || 'N/A'}</td>
                    <td className="py-2.5 px-3 text-amber-800 text-[10px]">{c.missingInformation?.[0] || 'None noted'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 6. Customer Preference Analysis */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
            6. Customer Preference Analysis & Voice of the Buyer
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {activeProject.customerPreferences.map((p) => (
              <div key={p.id} className="rounded-lg border border-slate-100 bg-slate-50 p-3 space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">{p.title}</span>
                  <span className="text-[10px] uppercase font-bold text-slate-500">{p.category}</span>
                </div>
                <p className="text-slate-600 text-[11px] leading-relaxed">{p.description}</p>
                {p.directEvidenceSnippet && (
                  <p className="text-[10px] italic text-emerald-800">Customer Quote: "{p.directEvidenceSnippet}"</p>
                )}
                <div className="text-[11px] text-blue-800 font-medium pt-1">
                  Action: {p.suggestedAction}
                </div>
              </div>
            ))}
          </div>

          {activeProject.userInterviewNotes && activeProject.userInterviewNotes.length > 0 && (
            <div className="rounded-xl border border-slate-200 bg-white p-4 space-y-2">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                Direct Field Quotes Log ({activeProject.userInterviewNotes.length})
              </span>
              <ul className="space-y-1.5 text-xs text-slate-700 italic">
                {activeProject.userInterviewNotes.map((note, idx) => (
                  <li key={idx} className="border-l-2 border-blue-500 pl-2.5 py-0.5">
                    "{note}"
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* 7. Potential Market Opportunities */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
            7. Potential Market Opportunity Theses
          </h2>

          <div className="space-y-3">
            {activeProject.opportunities.map((opp, idx) => (
              <div
                key={opp.id}
                className="rounded-xl border border-slate-200 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-sm text-slate-900">
                    Thesis #{idx + 1}: {opp.title}
                  </span>
                  <span className="font-mono text-blue-700 font-semibold">
                    Value: {opp.potentialValue} · Quality: {opp.evidenceQuality || 'Hypothesis'}
                  </span>
                </div>
                <p className="text-slate-700 leading-relaxed">{opp.description}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-2 border-t border-slate-100 text-[11px]">
                  <div>
                    <span className="font-semibold text-slate-800">Critical Assumption:</span>{' '}
                    <span className="text-slate-600">{opp.keyAssumptions[0]}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-amber-900">Recommended Experiment:</span>{' '}
                    <span className="text-slate-600">{opp.recommendedValidationExperiment}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 8. Supporting Evidence Layer */}
        {activeProject.evidenceLayer && activeProject.evidenceLayer.length > 0 && (
          <div className="space-y-3">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
              8. Supporting Research Evidence Layer
            </h2>
            <div className="space-y-2 text-xs">
              {activeProject.evidenceLayer.map((ev) => (
                <div key={ev.id} className="rounded-lg border border-slate-200 p-2.5 bg-slate-50/50">
                  <div className="flex justify-between items-center text-[10px] font-bold text-slate-500 mb-0.5">
                    <span>{ev.evidenceType} · {ev.sourceName}</span>
                    <span>{ev.verified ? '✓ Verified Source' : 'Sample Benchmark'}</span>
                  </div>
                  <p className="text-slate-800 font-medium">"{ev.claim}"</p>
                  <p className="text-[10px] italic text-slate-400 mt-1">Limitations: {ev.limitations}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 9. Assumptions and Limitations */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
            9. Core Assumptions & Epistemic Limitations
          </h2>
          <div className="rounded-xl border border-amber-200 bg-amber-50/40 p-4 text-xs text-amber-950 space-y-1.5 leading-relaxed">
            <p>
              • <strong>Qualitative Sample Bounds:</strong> Customer preference points and price thresholds reflect localized student cohorts and must be corroborated with wider campus surveys.
            </p>
            <p>
              • <strong>Operational Assumptions:</strong> Assumes delivery clustering can keep per-tiffin transit overhead under ₹12 without significant food temperature loss.
            </p>
            <p>
              • <strong>Epistemic Humility:</strong> Competitive gaps represent unproven starting hypotheses. Stated interest must not be confused with paid customer adoption.
            </p>
          </div>
        </div>

        {/* 10. Validation Experiments & 11. Recommended Next Steps */}
        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
            10. Validation Experiments & 11. Recommended Next Steps
          </h2>

          <div className="space-y-3">
            {activeProject.validationLab.map((val, idx) => (
              <div
                key={val.id}
                className="rounded-xl border border-slate-200 bg-slate-50/60 p-4 space-y-2 text-xs"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900">Hypothesis H{idx + 1}</span>
                  <span className="font-semibold rounded px-2 py-0.5 text-[10px] bg-slate-200 text-slate-700">
                    Status: {val.status}
                  </span>
                </div>
                <p className="italic text-slate-800 font-medium">"{val.hypothesis}"</p>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px] pt-1">
                  <div>
                    <span className="font-semibold text-slate-800">Experiment:</span>{' '}
                    <span className="text-slate-600">{val.lowCostExperiment || val.suggestedExperiment}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-emerald-800">Success Gate:</span>{' '}
                    <span className="text-slate-600">{val.measurableSuccessMetric || val.successMetric}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-purple-800">Decision Rule:</span>{' '}
                    <span className="text-slate-600">{val.decisionRule || 'Advance if gate passed'}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 12. Source List */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 border-b border-slate-100 pb-1">
            12. Primary Source List & Audit Trail
          </h2>
          <div className="rounded-xl border border-slate-200 bg-slate-50/80 p-4 text-xs space-y-1.5 text-slate-700">
            {activeProject.evidenceLayer && activeProject.evidenceLayer.length > 0 ? (
              activeProject.evidenceLayer.map((ev, idx) => (
                <div key={idx} className="flex items-center justify-between">
                  <span>{idx + 1}. {ev.sourceName} ({ev.evidenceType})</span>
                  {ev.sourceUrl && (
                    <span className="font-mono text-blue-600 text-[11px]">{ev.sourceUrl}</span>
                  )}
                </div>
              ))
            ) : (
              <p className="text-slate-500 italic">Local hostel physical audits, PG warden inquiries, and direct student discovery interviews.</p>
            )}
          </div>
        </div>

        {/* Footer Audit Signoff */}
        <div className="border-t border-slate-200 pt-6 text-[11px] text-slate-400 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <span>MarketLens AI · Part 3 Final Evaluation Release · 12-Section Strategic Dossier</span>
          <span className="font-mono">
            {isLive ? 'Live Gemini Model Synthesis' : 'Demonstration Dataset Active'}
          </span>
        </div>
      </div>
    </div>
  );
};
