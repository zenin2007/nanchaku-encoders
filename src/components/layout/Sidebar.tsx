import React from 'react';
import {
  LayoutDashboard,
  PlusCircle,
  Compass,
  Users,
  HeartHandshake,
  Lightbulb,
  FlaskConical,
  FileText,
  ChevronRight,
  Sparkles,
  Layers
} from 'lucide-react';
import { useResearch } from '../../context/ResearchContext';
import type { NavigationTab } from '../../types';

interface SidebarProps {
  mobileOpen: boolean;
  setMobileOpen: (open: boolean) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ mobileOpen, setMobileOpen }) => {
  const {
    currentTab,
    setCurrentTab,
    projects,
    activeProjectId,
    setActiveProjectId,
    activeProject
  } = useResearch();

  const navItems: { id: NavigationTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'new-research', label: 'New Research', icon: PlusCircle, badge: 'Input' },
    { id: 'market-overview', label: 'Market Overview', icon: Compass },
    { id: 'competitor-intelligence', label: 'Competitor Intelligence', icon: Users },
    { id: 'customer-preferences', label: 'Customer Preferences', icon: HeartHandshake },
    { id: 'market-opportunities', label: 'Market Opportunities', icon: Lightbulb },
    { id: 'validation-lab', label: 'Validation Lab', icon: FlaskConical },
    { id: 'research-reports', label: 'Research Reports', icon: FileText },
  ];

  const handleNavClick = (tab: NavigationTab) => {
    setCurrentTab(tab);
    setMobileOpen(false);
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/40 backdrop-blur-xs md:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out md:static md:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        {/* Brand / Logo Area */}
        <div className="flex h-16 items-center justify-between border-b border-slate-100 px-6">
          <div
            className="flex items-center gap-2.5 cursor-pointer"
            onClick={() => handleNavClick('overview')}
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-600 text-white shadow-sm shadow-blue-500/30">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-bold tracking-tight text-slate-900 text-base">MarketLens</span>
                <span className="rounded bg-blue-50 px-1 py-0.2 text-[10px] font-bold text-blue-700 border border-blue-200/60">
                  AI
                </span>
              </div>
              <p className="text-[11px] font-medium text-slate-400">Intelligence Platform</p>
            </div>
          </div>
        </div>

        {/* Active Project Switcher / Indicator */}
        <div className="px-4 py-3 border-b border-slate-100 bg-slate-50/50">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-400">
              Active Project
            </span>
            <span className="text-[10px] rounded-full bg-amber-100 px-1.5 py-0.2 font-medium text-amber-800">
              Demo Data
            </span>
          </div>

          <div className="relative">
            <select
              value={activeProjectId}
              onChange={(e) => setActiveProjectId(e.target.value)}
              className="w-full truncate rounded-lg border border-slate-200 bg-white py-1.5 pl-2.5 pr-7 text-xs font-medium text-slate-800 shadow-2xs hover:border-slate-300 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
            >
              {projects.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.title}
                </option>
              ))}
            </select>
            <Layers className="pointer-events-none absolute right-2.5 top-2.5 h-3.5 w-3.5 text-slate-400" />
          </div>

          <div className="mt-1.5 flex items-center justify-between text-[11px] text-slate-500">
            <span className="truncate">{activeProject.input.industry}</span>
            <span className="truncate text-slate-400 font-mono text-[10px]">
              {activeProject.input.targetGeography.split(',')[0]}
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Navigation
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;

            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className={`group flex w-full items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
                  isActive
                    ? 'bg-blue-50/80 text-blue-700 font-semibold shadow-2xs border border-blue-200/60'
                    : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`h-4 w-4 shrink-0 transition-colors ${
                      isActive ? 'text-blue-600' : 'text-slate-400 group-hover:text-slate-600'
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {item.badge && (
                    <span className="rounded bg-slate-200/60 px-1.5 py-0.2 text-[10px] font-medium text-slate-600">
                      {item.badge}
                    </span>
                  )}
                  {isActive && <ChevronRight className="h-3.5 w-3.5 text-blue-600" />}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Footer / Identity Card */}
        <div className="border-t border-slate-100 p-4">
          <div className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            <div className="text-xs font-semibold text-slate-800">MarketLens AI v1.0</div>
            <p className="mt-1 text-[11px] leading-tight text-slate-500">
              Reliable market research and competitor insights for founders and student entrepreneurs.
            </p>
            <div className="mt-2.5 flex items-center justify-between text-[10px] text-slate-400">
              <span>Part 1: Frontend Architecture</span>
              <span className="font-mono text-emerald-600 font-semibold">● Active</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};
