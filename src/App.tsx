import React, { useState } from 'react';
import { ResearchProvider, useResearch } from './context/ResearchContext';
import { Sidebar } from './components/layout/Sidebar';
import { Header } from './components/layout/Header';
import { OverviewDashboard } from './components/pages/OverviewDashboard';
import { NewResearchForm } from './components/pages/NewResearchForm';
import { MarketOverviewView } from './components/pages/MarketOverviewView';
import { CompetitorIntelligenceView } from './components/pages/CompetitorIntelligenceView';
import { CustomerPreferencesView } from './components/pages/CustomerPreferencesView';
import { MarketOpportunitiesView } from './components/pages/MarketOpportunitiesView';
import { ValidationLabView } from './components/pages/ValidationLabView';
import { ResearchReportsView } from './components/pages/ResearchReportsView';
import { LoadingAnalysisModal } from './components/workflow/LoadingAnalysisModal';
import { ApiKeyModal } from './components/common/ApiKeyModal';

const MainContent: React.FC = () => {
  const { currentTab } = useResearch();
  const [mobileOpen, setMobileOpen] = useState(false);

  const renderActiveView = () => {
    switch (currentTab) {
      case 'overview':
        return <OverviewDashboard />;
      case 'new-research':
        return <NewResearchForm />;
      case 'market-overview':
        return <MarketOverviewView />;
      case 'competitor-intelligence':
        return <CompetitorIntelligenceView />;
      case 'customer-preferences':
        return <CustomerPreferencesView />;
      case 'market-opportunities':
        return <MarketOpportunitiesView />;
      case 'validation-lab':
        return <ValidationLabView />;
      case 'research-reports':
        return <ResearchReportsView />;
      default:
        return <OverviewDashboard />;
    }
  };

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900 font-sans">
      {/* Sidebar Navigation */}
      <Sidebar mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />

      {/* Main View Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <Header setMobileOpen={setMobileOpen} />

        <main className="flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8">
          {renderActiveView()}
        </main>
      </div>

      {/* Multi-step Loading Modal during research generation */}
      <LoadingAnalysisModal />

      {/* Gemini API Key Configuration Modal */}
      <ApiKeyModal />
    </div>
  );
};

export default function App() {
  return (
    <ResearchProvider>
      <MainContent />
    </ResearchProvider>
  );
}
