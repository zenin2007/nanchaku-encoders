import React, { useState } from 'react';
import { Key, ShieldCheck, ExternalLink, CheckCircle2, AlertCircle, Sparkles, X } from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';

export const ApiKeyModal: React.FC = () => {
  const {
    isApiKeyModalOpen,
    setIsApiKeyModalOpen,
    apiStatus,
    runtimeApiKey,
    setRuntimeApiKey
  } = useResearch();

  const [inputKey, setInputKey] = useState(runtimeApiKey);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isApiKeyModalOpen) return null;

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setRuntimeApiKey(inputKey.trim());
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      setIsApiKeyModalOpen(false);
    }, 1200);
  };

  const handleClear = () => {
    setInputKey('');
    setRuntimeApiKey('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/50 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="w-full max-w-lg rounded-2xl border border-slate-200 bg-white p-6 sm:p-8 shadow-2xl space-y-5">
        <div className="flex items-start justify-between border-b border-slate-100 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600 border border-blue-200">
              <Key className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-base">Google Gemini API Configuration</h3>
              <p className="text-xs text-slate-500">Live AI Synthesis & Market Intelligence</p>
            </div>
          </div>
          <button
            onClick={() => setIsApiKeyModalOpen(false)}
            className="rounded-lg p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Server Status Indicator */}
        <div className="rounded-xl border p-4 text-xs space-y-2 bg-slate-50 border-slate-200">
          <div className="flex items-center justify-between">
            <span className="font-bold text-slate-700 uppercase tracking-wider text-[10px]">
              Server Environment Status
            </span>
            {apiStatus.configured ? (
              <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 font-bold text-emerald-800">
                <CheckCircle2 className="h-3 w-3" /> Server Key Active
              </span>
            ) : (
              <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2.5 py-0.5 font-bold text-amber-800">
                <AlertCircle className="h-3 w-3" /> Demo Mode (No Server Key)
              </span>
            )}
          </div>
          <p className="text-slate-600 leading-relaxed">
            {apiStatus.message}
          </p>
        </div>

        {/* Session Key Input */}
        <form onSubmit={handleSave} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Enter API Key for this Session (Optional)
            </label>
            <p className="text-xs text-slate-500 mb-2">
              If running locally without editing <code>.env</code>, you can paste your Google Gemini API key below. It is stored only in session memory and sent securely via server middleware.
            </p>
            <input
              type="password"
              value={inputKey}
              onChange={(e) => setInputKey(e.target.value)}
              placeholder="AIzaSy..."
              className="w-full rounded-xl border border-slate-200 p-2.5 font-mono text-xs text-slate-900 placeholder:text-slate-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            />
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500">
            <a
              href="https://aistudio.google.com/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 font-semibold text-blue-600 hover:underline"
            >
              <span>Get API key from Google AI Studio</span>
              <ExternalLink className="h-3 w-3" />
            </a>

            {inputKey && (
              <button
                type="button"
                onClick={handleClear}
                className="text-rose-600 hover:underline"
              >
                Clear key
              </button>
            )}
          </div>

          <div className="flex items-center justify-end gap-2.5 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => setIsApiKeyModalOpen(false)}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex items-center gap-1.5 rounded-xl bg-blue-600 px-5 py-2 text-xs font-bold text-white shadow-xs hover:bg-blue-700 transition-colors"
            >
              {savedSuccess ? (
                <>
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Key Saved!</span>
                </>
              ) : (
                <>
                  <Sparkles className="h-4 w-4" />
                  <span>Save for Session</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="rounded-xl border border-blue-100 bg-blue-50/50 p-3 text-[11px] text-blue-900 flex items-start gap-2">
          <ShieldCheck className="h-4 w-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            Security guarantee: Your API key is never exposed to public repositories or client code. MarketLens AI defaults to transparent demonstration data if no key is present.
          </span>
        </div>
      </div>
    </div>
  );
};
