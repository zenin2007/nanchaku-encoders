import React from 'react';
import {
  Sparkles,
  PlusCircle,
  ArrowRight,
  Compass,
  Users,
  Lightbulb,
  FlaskConical,
  CheckCircle2,
  AlertCircle,
  Building2,
  MapPin,
  FileText
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import { SAMPLE_STUDENT_TIFFIN } from '../../data/sampleProjects';

export const OverviewDashboard: React.FC = () => {
  const { setCurrentTab, projects, setActiveProjectId, loadSampleProject } = useResearch();

  return (
    <div className="space-y-8 max-w-6xl mx-auto pb-12">
      {/* Hero / Identity Section */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-blue-200 bg-blue-50/70 px-3 py-1 text-xs font-semibold text-blue-800">
            <Sparkles className="h-3.5 w-3.5 text-blue-600" />
            <span>Problem Statement Solution · MarketLens AI</span>
          </div>

          <h1 className="mt-4 text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 leading-tight">
            Understand Your Market. Know Your Competition. Find Your Opportunity.
          </h1>

          <p className="mt-3 text-sm sm:text-base leading-relaxed text-slate-600">
            Startups and student entrepreneurs often lack affordable access to structured market research and competitor insights.
            MarketLens AI empowers first-time founders to analyze customer preferences, benchmark alternatives, and design lean validation experiments without expensive research agency retainers.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <button
              onClick={() => setCurrentTab('new-research')}
              className="flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              <PlusCircle className="h-4 w-4" />
              <span>Start New Research</span>
            </button>

            <button
              onClick={() => loadSampleProject(SAMPLE_STUDENT_TIFFIN.id)}
              className="flex items-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 hover:bg-slate-50 hover:border-slate-400 active:scale-[0.98] transition-all"
            >
              <span>Explore Student Tiffin Service (Kanpur)</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </button>
          </div>
        </div>

        {/* Subtle decorative background pattern */}
        <div className="pointer-events-none absolute -right-12 -top-12 h-64 w-64 rounded-full bg-blue-50/60 blur-2xl" />
      </div>

      {/* Product Core Modules Grid (Non-fake cards explaining capabilities) */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base font-bold text-slate-900">Intelligence Modules</h2>
            <p className="text-xs text-slate-500">
              Each module structures empirical field inquiries and qualitative findings.
            </p>
          </div>
          <span className="text-xs font-mono text-slate-400">8 Functional Views</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => setCurrentTab('market-overview')}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <Compass className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">Market Overview</h3>
            <p className="mt-1 text-xs text-slate-500 leading-normal">
              Framing core research questions, market bounds, and known vs. missing information.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600">
              <span>View Dossier</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div
            onClick={() => setCurrentTab('competitor-intelligence')}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
              <Users className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">Competitor Intelligence</h3>
            <p className="mt-1 text-xs text-slate-500 leading-normal">
              Structured side-by-side comparison across pricing, strengths, weaknesses, and evidence validity.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600">
              <span>Compare Players</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div
            onClick={() => setCurrentTab('customer-preferences')}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
              <Lightbulb className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">Customer Preferences</h3>
            <p className="mt-1 text-xs text-slate-500 leading-normal">
              Unpack critical customer needs, friction points, and test preliminary buyer hypotheses.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600">
              <span>Analyze Insights</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>

          <div
            onClick={() => setCurrentTab('validation-lab')}
            className="group cursor-pointer rounded-xl border border-slate-200 bg-white p-5 shadow-2xs hover:border-blue-400 hover:shadow-xs transition-all"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-amber-50 text-amber-600 group-hover:bg-amber-600 group-hover:text-white transition-colors">
              <FlaskConical className="h-4 w-4" />
            </div>
            <h3 className="mt-3 text-sm font-bold text-slate-900">Validation Lab</h3>
            <p className="mt-1 text-xs text-slate-500 leading-normal">
              Actionable interview protocols, lean experiment setups, and quantifiable success metrics.
            </p>
            <div className="mt-3 flex items-center gap-1 text-xs font-semibold text-blue-600">
              <span>Review Experiments</span>
              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>

      {/* Demonstration Projects & Recent Projects */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Recent Research Projects List */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900">Recent Research Projects</h2>
            <span className="text-xs text-slate-500 font-mono">
              {projects.length} {projects.length === 1 ? 'Project' : 'Projects'} Saved
            </span>
          </div>

          <div className="space-y-3">
            {projects.map((project) => (
              <div
                key={project.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-xl border border-slate-200 bg-white p-4 shadow-2xs hover:border-slate-300 transition-all gap-4"
              >
                <div className="space-y-1.5 flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h3 className="text-sm font-bold text-slate-900 truncate">
                      {project.title}
                    </h3>
                    <span className="rounded bg-amber-100 px-2 py-0.5 text-[10px] font-semibold text-amber-800">
                      Demonstration Dataset
                    </span>
                  </div>

                  <p className="text-xs text-slate-600 line-clamp-1">
                    {project.input.businessIdea}
                  </p>

                  <div className="flex items-center gap-4 text-[11px] text-slate-500">
                    <span className="flex items-center gap-1">
                      <Building2 className="h-3 w-3 text-slate-400" />
                      {project.input.industry}
                    </span>
                    <span className="flex items-center gap-1">
                      <MapPin className="h-3 w-3 text-slate-400" />
                      {project.input.targetGeography.split(',')[0]}
                    </span>
                    <span className="flex items-center gap-1 font-mono text-slate-400">
                      {project.competitors.length} Competitors Tracked
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => {
                      setActiveProjectId(project.id);
                      setCurrentTab('market-overview');
                    }}
                    className="flex items-center gap-1.5 rounded-lg bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-700 hover:bg-blue-100 transition-colors"
                  >
                    <span>Open Project</span>
                    <ArrowRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Featured Demonstration Showcase */}
        <div className="rounded-xl border border-blue-200 bg-gradient-to-br from-blue-50/50 to-white p-5 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between">
              <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-bold text-blue-800">
                Featured Sample Project
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Kanpur, UP</span>
            </div>

            <h3 className="mt-3 text-sm font-bold text-slate-900">
              Student Tiffin Service — Kanpur
            </h3>

            <p className="mt-2 text-xs text-slate-600 leading-relaxed">
              Illustrates a complete end-to-end market analysis for an affordable daily meal subscription model targeting 60,000+ outstation students in Kanpur hostels.
            </p>

            <div className="mt-4 space-y-2 rounded-lg border border-blue-100 bg-white p-3 text-xs text-slate-700">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>4 Competitors Audited (Dhabas to Apps)</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>5 Friction Points & Desired Features</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>3 Formulated Market Opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-3.5 w-3.5 text-emerald-600 shrink-0" />
                <span>Validation Protocol with Interview Scripts</span>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-4 border-t border-blue-100">
            <button
              onClick={() => loadSampleProject(SAMPLE_STUDENT_TIFFIN.id)}
              className="w-full flex items-center justify-center gap-2 rounded-lg bg-blue-600 py-2 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              <FileText className="h-3.5 w-3.5" />
              <span>Load Full Tiffin Dossier</span>
            </button>
          </div>
        </div>
      </div>

      {/* Methodology & Data Integrity Disclaimer Note */}
      <div className="rounded-xl border border-slate-200 bg-slate-50/70 p-4 text-xs text-slate-600">
        <div className="flex items-start gap-3">
          <AlertCircle className="h-4 w-4 text-slate-500 mt-0.5 shrink-0" />
          <div className="space-y-1">
            <p className="font-semibold text-slate-800">
              Data Integrity & Evaluation Protocol:
            </p>
            <p className="text-slate-500 leading-relaxed">
              MarketLens AI avoids generating fake platform metrics or deceptive testimonials. Pre-loaded records are strictly tagged as{' '}
              <span className="font-semibold text-amber-800">Demonstration Samples</span> or{' '}
              <span className="font-semibold text-blue-800">Preliminary Hypotheses</span>. Real field verification should always be completed using the interview scripts and validation protocols provided in the Validation Lab.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
