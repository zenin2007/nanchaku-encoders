import { Menu, PlusCircle, Printer, Sparkles, Compass, Key, Bot } from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';

interface HeaderProps {
  setMobileOpen: (open: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({ setMobileOpen }) => {
  const {
    currentTab,
    setCurrentTab,
    activeProject,
    loadSampleProject,
    apiStatus,
    runtimeApiKey,
    setIsApiKeyModalOpen
  } = useResearch();

  const isGeminiActive = activeProject.metadata?.mode === 'gemini-live' || apiStatus.configured || !!runtimeApiKey;

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-slate-200 bg-white/95 px-4 backdrop-blur-xs sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={() => setMobileOpen(true)}
          className="rounded-lg p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-800 md:hidden"
          aria-label="Open sidebar"
        >
          <Menu className="h-5 w-5" />
        </button>

        <div className="flex flex-col">
          <div className="flex items-center gap-2">
            <h2 className="text-sm font-bold text-slate-900 truncate max-w-[200px] sm:max-w-md">
              {activeProject.title}
            </h2>

            {activeProject.metadata?.mode === 'gemini-live' ? (
              <span className="hidden sm:inline-flex items-center gap-1 rounded bg-blue-50 px-2 py-0.5 text-[11px] font-bold text-blue-800 border border-blue-200">
                <Bot className="h-3 w-3 text-blue-600" /> Gemini 2.5 Flash
              </span>
            ) : (
              <span className="hidden sm:inline-flex items-center gap-1 rounded bg-amber-50 px-2 py-0.5 text-[11px] font-medium text-amber-800 border border-amber-200">
                <Sparkles className="h-3 w-3" /> Demo Scenario
              </span>
            )}
          </div>
          <span className="text-[11px] text-slate-400 truncate">
            {activeProject.input.targetCustomer} · {activeProject.input.targetGeography}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        {/* Gemini API Key Trigger Button */}
        <button
          onClick={() => setIsApiKeyModalOpen(true)}
          className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1.5 text-xs font-semibold transition-all shadow-2xs ${
            isGeminiActive
              ? 'border-blue-200 bg-blue-50/70 text-blue-800 hover:bg-blue-100'
              : 'border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100'
          }`}
          title="Configure Google Gemini API Key"
        >
          <Key className="h-3.5 w-3.5 text-blue-600" />
          <span className="hidden md:inline">
            {apiStatus.configured ? 'Gemini: Active' : runtimeApiKey ? 'Gemini: Session Key' : 'Gemini: Demo Mode'}
          </span>
          <span className="md:hidden">API</span>
        </button>

        {currentTab !== 'new-research' && (
          <button
            onClick={() => setCurrentTab('new-research')}
            className="flex items-center gap-1.5 rounded-lg bg-blue-600 px-3 py-1.5 text-xs font-semibold text-white shadow-xs hover:bg-blue-700 active:scale-[0.98] transition-all"
          >
            <PlusCircle className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Start New Research</span>
            <span className="sm:hidden">New</span>
          </button>
        )}

        {currentTab !== 'market-overview' && (
          <button
            onClick={() => setCurrentTab('market-overview')}
            className="hidden lg:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-50 shadow-2xs"
          >
            <Compass className="h-3.5 w-3.5 text-slate-500" />
            <span>View Dossier</span>
          </button>
        )}

        <button
          onClick={() => loadSampleProject()}
          className="hidden sm:flex items-center gap-1.5 rounded-lg border border-slate-200 bg-slate-50 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:bg-slate-100"
          title="Reset to Student Tiffin Service (Kanpur) sample"
        >
          <span>Sample: Tiffin</span>
        </button>

        <button
          onClick={() => window.print()}
          className="flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white p-2 text-slate-600 hover:bg-slate-50 hover:text-slate-900"
          title="Print or Save Dossier as PDF"
        >
          <Printer className="h-4 w-4" />
          <span className="hidden xl:inline text-xs font-medium">Print</span>
        </button>
      </div>
    </header>
  );
};
