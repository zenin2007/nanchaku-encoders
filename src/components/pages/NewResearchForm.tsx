import React, { useState } from 'react';
import {
  Sparkles,
  ArrowRight,
  AlertCircle,
  Building2,
  Users,
  MapPin,
  Target,
  Rocket,
  FileQuestion,
  RotateCcw,
  Bot,
  Key
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import type { ResearchFormInput, ResearchObjective, BusinessStage } from '../../types';

export const NewResearchForm: React.FC = () => {
  const {
    draftForm,
    setDraftForm,
    startAnalysisWorkflow,
    apiStatus,
    runtimeApiKey,
    setIsApiKeyModalOpen,
    lastAnalysisError,
    retryLastAnalysis,
    clearAnalysisError
  } = useResearch();

  const [errors, setErrors] = useState<Partial<Record<keyof ResearchFormInput, string>>>({});

  const objectiveOptions: ResearchObjective[] = [
    'Understand the target market',
    'Analyze competitors',
    'Analyze customer preferences',
    'Identify market opportunities',
    'Evaluate a new product',
    'Compare geographical markets',
  ];

  const stageOptions: BusinessStage[] = [
    'Exploring an idea',
    'Problem-solution validation',
    'Prototype / MVP ready',
    'Early revenue (< ₹1 Lakh/mo)',
    'Scaling existing business',
  ];

  const handleInputChange = (field: keyof ResearchFormInput, value: string) => {
    setDraftForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const loadSampleTiffinData = () => {
    setDraftForm({
      businessIdea:
        'Hygienic, affordable home-cooked daily meals for students with WhatsApp-based scheduled doorstep delivery and zero-penalty pause/cancel.',
      industry: 'Food services',
      targetCustomer: 'College students living in hostels and PG accommodation',
      targetGeography: 'Kanpur, Uttar Pradesh, India',
      researchObjective: 'Identify market opportunities',
      businessStage: 'Exploring an idea',
      budgetInr: '50000',
      notes: 'Initial focus on Kalyanpur (IIT Kanpur), Kakadeo (coaching hub), and Rawatpur clusters.',
    });
    setErrors({});
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof ResearchFormInput, string>> = {};

    if (!draftForm.businessIdea.trim()) {
      newErrors.businessIdea = 'Please describe your startup or business concept.';
    } else if (draftForm.businessIdea.trim().length < 10) {
      newErrors.businessIdea = 'Please provide a more descriptive summary (at least 10 characters).';
    }

    if (!draftForm.industry.trim()) {
      newErrors.industry = 'Industry category is required (e.g., Food services, EdTech, Retail).';
    }

    if (!draftForm.targetCustomer.trim()) {
      newErrors.targetCustomer = 'Please specify who your primary target buyers or users are.';
    }

    if (!draftForm.targetGeography.trim()) {
      newErrors.targetGeography = 'Please provide the target geography or city.';
    }

    if (draftForm.budgetInr && isNaN(Number(draftForm.budgetInr))) {
      newErrors.budgetInr = 'Please enter a valid numeric amount in INR.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      const firstError = document.querySelector('[data-error="true"]');
      if (firstError) {
        firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      return;
    }

    await startAnalysisWorkflow(draftForm);
  };

  const isGeminiReady = apiStatus.configured || !!runtimeApiKey;

  return (
    <div className="max-w-4xl mx-auto pb-16 space-y-6">
      {/* Header Banner */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-blue-200 bg-blue-50 px-2.5 py-0.5 text-xs font-semibold text-blue-800">
              <FileQuestion className="h-3.5 w-3.5 text-blue-600" />
              <span>Step 2 · Research Request Intake</span>
            </div>
            <h1 className="mt-2 text-2xl font-extrabold text-slate-900 tracking-tight">
              Investigate Your Market
            </h1>
            <p className="mt-1 text-sm text-slate-500 max-w-xl">
              Provide your venture parameters. MarketLens AI will structure competitive benchmarks, customer preference vectors, and lean validation hypotheses.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={loadSampleTiffinData}
              className="flex items-center justify-center gap-2 rounded-xl border border-blue-200 bg-blue-50/70 px-4 py-2.5 text-xs font-bold text-blue-800 hover:bg-blue-100/80 active:scale-[0.98] transition-all"
            >
              <Sparkles className="h-4 w-4 text-blue-600" />
              <span>Try Example: Student Tiffin Service</span>
            </button>
          </div>
        </div>

        {/* Gemini Engine Status Banner */}
        <div className="mt-5 flex items-center justify-between rounded-xl border p-3 text-xs bg-slate-50 border-slate-200">
          <div className="flex items-center gap-2">
            <Bot className="h-4 w-4 text-blue-600" />
            <span className="font-semibold text-slate-800">
              Analysis Engine: {isGeminiReady ? 'Google Gemini 2.5 Flash' : 'Demonstration Synthesis Mode'}
            </span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-500">
              {isGeminiReady ? 'Live AI synthesis enabled' : 'Pre-calibrated local benchmarks'}
            </span>
          </div>

          <button
            type="button"
            onClick={() => setIsApiKeyModalOpen(true)}
            className="inline-flex items-center gap-1 font-bold text-blue-600 hover:underline"
          >
            <Key className="h-3 w-3" />
            <span>{isGeminiReady ? 'Manage API Key' : 'Configure API Key'}</span>
          </button>
        </div>
      </div>

      {/* Error or Notice Banner */}
      {lastAnalysisError && (
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-xs text-amber-900 flex items-start justify-between gap-3 animate-in fade-in">
          <div className="flex items-start gap-2.5">
            <AlertCircle className="h-4 w-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold">{lastAnalysisError}</p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={retryLastAnalysis}
              className="inline-flex items-center gap-1 rounded-lg bg-amber-600 px-3 py-1 font-bold text-white hover:bg-amber-700 transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Retry</span>
            </button>
            <button
              type="button"
              onClick={clearAnalysisError}
              className="text-amber-700 hover:text-amber-950 font-bold"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Main Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-xs space-y-6">
          {/* Field 1: Business Idea */}
          <div data-error={!!errors.businessIdea}>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              1. Startup or Business Idea <span className="text-rose-500">*</span>
            </label>
            <p className="text-xs text-slate-500 mb-2">
              Explain the core product or service you are considering building and the primary problem it solves.
            </p>
            <textarea
              rows={3}
              value={draftForm.businessIdea}
              onChange={(e) => handleInputChange('businessIdea', e.target.value)}
              placeholder="e.g., A subscription-based healthy tiffin delivery service for university students in hostels with flexible meal pause via WhatsApp..."
              className={`w-full rounded-xl border p-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                errors.businessIdea
                  ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/20'
                  : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-blue-500/20'
              }`}
            />
            {errors.businessIdea && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.businessIdea}
              </p>
            )}
          </div>

          {/* Grid: Industry & Geography */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field 2: Industry */}
            <div data-error={!!errors.industry}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                2. Industry <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Building2 className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={draftForm.industry}
                  onChange={(e) => handleInputChange('industry', e.target.value)}
                  placeholder="e.g., Food services, EdTech, D2C Apparel"
                  className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    errors.industry
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/20'
                      : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
              </div>
              {errors.industry && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.industry}
                </p>
              )}
            </div>

            {/* Field 4: Geography */}
            <div data-error={!!errors.targetGeography}>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                4. Target Geography <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={draftForm.targetGeography}
                  onChange={(e) => handleInputChange('targetGeography', e.target.value)}
                  placeholder="e.g., Kanpur, Uttar Pradesh, India"
                  className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    errors.targetGeography
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/20'
                      : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
              </div>
              {errors.targetGeography && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.targetGeography}
                </p>
              )}
            </div>
          </div>

          {/* Field 3: Target Customer Segment */}
          <div data-error={!!errors.targetCustomer}>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              3. Target Customer Segment <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <Users className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                value={draftForm.targetCustomer}
                onChange={(e) => handleInputChange('targetCustomer', e.target.value)}
                placeholder="e.g., College students living in hostels and PG accommodation"
                className={`w-full rounded-xl border py-2.5 pl-9 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                  errors.targetCustomer
                    ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/20'
                    : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-blue-500/20'
                }`}
              />
            </div>
            {errors.targetCustomer && (
              <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                <AlertCircle className="h-3.5 w-3.5" />
                {errors.targetCustomer}
              </p>
            )}
          </div>

          {/* Grid: Research Objective & Business Stage */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Field 5: Research Objective */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                5. Research Objective <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Target className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <select
                  value={draftForm.researchObjective}
                  onChange={(e) =>
                    handleInputChange('researchObjective', e.target.value as ResearchObjective)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {objectiveOptions.map((opt) => (
                    <option key={opt} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Field 6: Business Stage */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                6. Business Stage <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <Rocket className="pointer-events-none absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <select
                  value={draftForm.businessStage}
                  onChange={(e) =>
                    handleInputChange('businessStage', e.target.value as BusinessStage)
                  }
                  className="w-full rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-4 text-sm text-slate-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
                >
                  {stageOptions.map((stg) => (
                    <option key={stg} value={stg}>
                      {stg}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Field 7: Optional Budget in INR & Optional Notes */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                7. Optional Budget in INR (₹)
              </label>
              <p className="text-xs text-slate-500 mb-2">
                If bootstrapping or allocating a pilot fund, specify your initial capital limit.
              </p>
              <div className="relative">
                <span className="pointer-events-none absolute left-3.5 top-2.5 text-sm font-semibold text-slate-400">
                  ₹
                </span>
                <input
                  type="number"
                  min="0"
                  step="1000"
                  value={draftForm.budgetInr || ''}
                  onChange={(e) => handleInputChange('budgetInr', e.target.value)}
                  placeholder="e.g., 50000"
                  className={`w-full rounded-xl border py-2.5 pl-8 pr-3 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 ${
                    errors.budgetInr
                      ? 'border-rose-400 bg-rose-50/30 focus:ring-rose-500/20'
                      : 'border-slate-200 bg-white focus:border-blue-500 focus:ring-blue-500/20'
                  }`}
                />
              </div>
              {errors.budgetInr && (
                <p className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-rose-600">
                  <AlertCircle className="h-3.5 w-3.5" />
                  {errors.budgetInr}
                </p>
              )}
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Preliminary Feedback / Evidence Notes (Optional)
              </label>
              <p className="text-xs text-slate-500 mb-2">
                Any customer quotes or initial local observations to feed into evidence.
              </p>
              <input
                type="text"
                value={draftForm.notes || ''}
                onChange={(e) => handleInputChange('notes', e.target.value)}
                placeholder="e.g., Visited 3 hostels in Kakadeo; wardens complained about corridor trash."
                className="w-full rounded-xl border border-slate-200 bg-white py-2.5 px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
          </div>
        </div>

        {/* Submit Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-xl border border-slate-200 bg-white p-4 sm:p-6 shadow-xs">
          <div className="text-xs text-slate-500">
            <span>Inputs are evaluated through structured evidence schemas with fallback protection.</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={loadSampleTiffinData}
              className="rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              Reset to Student Tiffin Example
            </button>

            <button
              type="submit"
              className="flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-6 py-2.5 text-sm font-bold text-white shadow-sm shadow-blue-500/20 hover:bg-blue-700 active:scale-[0.98] transition-all"
            >
              <span>Analyze Market</span>
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};
