import React, { useState } from 'react';
import {
  Users,
  Search,
  CheckCircle2,
  XCircle,
  ArrowRight,
  ShieldAlert,
  HelpCircle,
  BookOpen
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import { DemoBanner } from '../common/DemoBanner';
import { EvidenceBadge } from '../common/Badge';
import type { CompetitorRecord } from '../../types';

export const CompetitorIntelligenceView: React.FC = () => {
  const { activeProject, setCurrentTab } = useResearch();
  const [filterType, setFilterType] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCompetitor, setSelectedCompetitor] = useState<CompetitorRecord | null>(null);

  const competitors = activeProject.competitors;

  const filtered = competitors.filter((c) => {
    const matchesType = filterType === 'All' || c.type === filterType;
    const matchesSearch =
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.serviceOffering.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.customerSegment.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="space-y-6 max-w-6xl mx-auto pb-16">
      <DemoBanner />

      {/* Header */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-indigo-200 bg-indigo-50 px-2.5 py-0.5 text-xs font-semibold text-indigo-700">
              <Users className="h-3.5 w-3.5" />
              <span>Step 5 · Competitive Intelligence Matrix</span>
            </div>
            <h1 className="mt-2 text-xl sm:text-2xl font-extrabold text-slate-900 tracking-tight">
              Competitor Intelligence & Alternative Benchmarking
            </h1>
            <p className="mt-1 text-xs sm:text-sm text-slate-500 max-w-2xl">
              Benchmarking direct rivals, institutional incumbents, and indirect digital alternatives operating in {activeProject.input.targetGeography}. Missing variables are explicitly represented.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-lg bg-slate-100 px-3 py-1.5 text-xs font-mono font-semibold text-slate-700">
              {filtered.length} of {competitors.length} Evaluated
            </span>
          </div>
        </div>

        {/* Epistemic Guardrail Notice */}
        <div className="mt-4 rounded-xl border border-amber-200 bg-amber-50/50 p-3 text-[11px] text-amber-900 flex items-start gap-2">
          <ShieldAlert className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
          <span>
            <strong>Epistemic Guardrail:</strong> An observed competitive gap or weakness is a starting hypothesis, <em>not</em> a proven market opportunity. Validation interviews are mandatory before allocating capital.
          </span>
        </div>

        {/* Filter and Search Bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center gap-3 border-t border-slate-100 pt-4">
          <div className="relative w-full sm:w-72">
            <Search className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search competitors..."
              className="w-full rounded-xl border border-slate-200 py-2 pl-9 pr-3 text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-center gap-1.5 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
            {['All', 'Direct', 'Indirect', 'Alternative'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`rounded-lg px-3 py-1.5 text-xs font-semibold transition-colors shrink-0 ${
                  filterType === type
                    ? 'bg-blue-600 text-white shadow-2xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Comparison Table */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/80 text-[11px] font-bold uppercase tracking-wider text-slate-500">
                <th className="py-3.5 px-4">Competitor & Type</th>
                <th className="py-3.5 px-4 min-w-[180px]">Product / Service</th>
                <th className="py-3.5 px-4 min-w-[140px]">Customer Segment</th>
                <th className="py-3.5 px-4 min-w-[150px]">Pricing Benchmark</th>
                <th className="py-3.5 px-4 min-w-[180px]">Observable Strengths</th>
                <th className="py-3.5 px-4 min-w-[180px]">Potential Weaknesses</th>
                <th className="py-3.5 px-4 min-w-[140px]">Missing Information</th>
                <th className="py-3.5 px-4 text-center">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {filtered.map((comp) => (
                <tr
                  key={comp.id}
                  className="hover:bg-slate-50/70 transition-colors cursor-pointer group"
                  onClick={() => setSelectedCompetitor(comp)}
                >
                  <td className="py-4 px-4 align-top">
                    <div className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                      {comp.name}
                    </div>
                    <div className="mt-1 flex items-center gap-1.5 flex-wrap">
                      <span
                        className={`inline-block rounded px-1.5 py-0.5 text-[10px] font-semibold ${
                          comp.type === 'Direct'
                            ? 'bg-red-50 text-red-700 border border-red-200'
                            : comp.type === 'Indirect'
                            ? 'bg-purple-50 text-purple-700 border border-purple-200'
                            : 'bg-slate-100 text-slate-700 border border-slate-200'
                        }`}
                      >
                        {comp.type}
                      </span>
                      {comp.positioning && (
                        <span className="text-[10px] text-slate-400 italic truncate max-w-[120px]">
                          {comp.positioning}
                        </span>
                      )}
                    </div>
                  </td>

                  <td className="py-4 px-4 align-top text-slate-700 leading-relaxed">
                    {comp.serviceOffering}
                  </td>

                  <td className="py-4 px-4 align-top text-slate-600">
                    {comp.customerSegment}
                  </td>

                  <td className="py-4 px-4 align-top">
                    <div className="font-mono font-semibold text-slate-900 bg-slate-100/80 rounded-md px-2 py-1 inline-block">
                      {comp.pricingEstimate}
                    </div>
                  </td>

                  <td className="py-4 px-4 align-top">
                    <ul className="space-y-1">
                      {comp.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-slate-700">
                          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-4 px-4 align-top">
                    <ul className="space-y-1">
                      {comp.weaknesses.map((w, idx) => (
                        <li key={idx} className="flex items-start gap-1.5 text-slate-600">
                          <XCircle className="h-3.5 w-3.5 text-rose-500 shrink-0 mt-0.5" />
                          <span>{w}</span>
                        </li>
                      ))}
                    </ul>
                  </td>

                  <td className="py-4 px-4 align-top">
                    {comp.missingInformation && comp.missingInformation.length > 0 ? (
                      <ul className="space-y-1">
                        {comp.missingInformation.map((m, idx) => (
                          <li key={idx} className="flex items-start gap-1 text-[11px] text-amber-800">
                            <HelpCircle className="h-3 w-3 text-amber-600 shrink-0 mt-0.5" />
                            <span>{m}</span>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <span className="text-[11px] text-slate-400 italic">No explicit gap documented</span>
                    )}
                  </td>

                  <td className="py-4 px-4 align-top text-center">
                    <EvidenceBadge status={comp.evidenceStatus} />
                  </td>
                </tr>
              ))}

              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-12 text-center text-slate-400">
                    No competitors match the active filter or query.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Competitor Detail Modal */}
      {selectedCompetitor && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-6 shadow-xl space-y-5 max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-slate-100 pb-4">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-900">{selectedCompetitor.name}</h3>
                  <span className="rounded bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-700">
                    {selectedCompetitor.type} Competitor
                  </span>
                </div>
                <p className="mt-1 text-xs text-slate-500">
                  Target Customer: {selectedCompetitor.customerSegment}
                </p>
              </div>
              <button
                onClick={() => setSelectedCompetitor(null)}
                className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                  Service Offering
                </span>
                <p className="mt-1 text-slate-800 leading-relaxed font-medium">
                  {selectedCompetitor.serviceOffering}
                </p>
              </div>

              {selectedCompetitor.positioning && (
                <div>
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                    Market Positioning
                  </span>
                  <p className="mt-1 text-slate-700 italic">
                    "{selectedCompetitor.positioning}"
                  </p>
                </div>
              )}

              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                    Pricing Model
                  </span>
                  <div className="mt-1 font-mono font-bold text-slate-900">
                    {selectedCompetitor.pricingEstimate}
                  </div>
                </div>

                <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                  <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                    Primary Differentiator
                  </span>
                  <div className="mt-1 font-medium text-slate-800">
                    {selectedCompetitor.keyDifferentiator}
                  </div>
                </div>
              </div>

              {/* Supporting Sources */}
              <div>
                <span className="font-bold uppercase tracking-wider text-slate-400 text-[10px]">
                  Supporting Sources & Citations
                </span>
                <div className="mt-1 space-y-1">
                  {selectedCompetitor.supportingSources && selectedCompetitor.supportingSources.length > 0 ? (
                    selectedCompetitor.supportingSources.map((src, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-slate-600">
                        <BookOpen className="h-3 w-3 text-blue-600 shrink-0" />
                        <span>{src}</span>
                      </div>
                    ))
                  ) : (
                    <span className="text-slate-400 italic">Local spot inquiries & student PG interviews.</span>
                  )}
                </div>
              </div>

              {/* Missing Information explicitly represented */}
              {selectedCompetitor.missingInformation && selectedCompetitor.missingInformation.length > 0 && (
                <div className="rounded-xl border border-amber-200 bg-amber-50/50 p-3">
                  <span className="font-bold uppercase tracking-wider text-amber-900 text-[10px]">
                    Explicit Missing Information (Field Research Gaps)
                  </span>
                  <ul className="mt-1 space-y-1">
                    {selectedCompetitor.missingInformation.map((m, idx) => (
                      <li key={idx} className="text-amber-800 flex items-start gap-1.5">
                        <span className="mt-1 h-1 w-1 rounded-full bg-amber-600" />
                        <span>{m}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="flex justify-end pt-3 border-t border-slate-100">
              <button
                onClick={() => setSelectedCompetitor(null)}
                className="rounded-lg bg-slate-100 px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-200"
              >
                Close Profile
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Next Step Nav */}
      <div className="flex items-center justify-between border-t border-slate-200 pt-4 text-xs">
        <span className="text-slate-500">
          Ready to review what customers value compared to these options?
        </span>
        <button
          onClick={() => setCurrentTab('customer-preferences')}
          className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 font-semibold text-white hover:bg-blue-700 transition-colors"
        >
          <span>Customer Preferences</span>
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </div>
  );
};
