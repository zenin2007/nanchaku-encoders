import React, { createContext, useContext, useState, useEffect } from 'react';
import type {
  NavigationTab,
  ResearchProject,
  ResearchFormInput,
  ValidationItem,
  ResearchEvidenceRecord
} from '../types';
import { INITIAL_PROJECTS, SAMPLE_STUDENT_TIFFIN } from '../data/sampleProjects';
import { MarketLensApi, type ApiStatus } from '../services/marketLensApi';
import { EvidenceService } from '../services/evidenceService';

interface ResearchContextType {
  currentTab: NavigationTab;
  setCurrentTab: (tab: NavigationTab) => void;
  projects: ResearchProject[];
  activeProject: ResearchProject;
  activeProjectId: string;
  setActiveProjectId: (id: string) => void;
  isAnalyzing: boolean;
  analysisStep: string;
  analysisProgress: number;
  draftForm: ResearchFormInput;
  setDraftForm: React.Dispatch<React.SetStateAction<ResearchFormInput>>;
  startAnalysisWorkflow: (input: ResearchFormInput) => Promise<void>;
  addCustomerInterviewNote: (note: string) => void;
  updateValidationStatus: (validationId: string, status: ValidationItem['status']) => void;
  loadSampleProject: (sampleId?: string) => void;
  // Gemini API specific state
  apiStatus: ApiStatus;
  runtimeApiKey: string;
  setRuntimeApiKey: (key: string) => void;
  lastAnalysisError: string | null;
  clearAnalysisError: () => void;
  retryLastAnalysis: () => Promise<void>;
  analyzeFeedbackWithGemini: () => Promise<void>;
  isAnalyzingFeedback: boolean;
  generateValidationPlanWithGemini: (opportunityId: string) => Promise<void>;
  isGeneratingPlan: boolean;
  isApiKeyModalOpen: boolean;
  setIsApiKeyModalOpen: (open: boolean) => void;
}

const defaultDraft: ResearchFormInput = {
  businessIdea: '',
  industry: '',
  targetCustomer: '',
  targetGeography: '',
  researchObjective: 'Understand the target market',
  businessStage: 'Exploring an idea',
  budgetInr: '',
  notes: ''
};

const ResearchContext = createContext<ResearchContextType | undefined>(undefined);

export const ResearchProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTab, setCurrentTab] = useState<NavigationTab>('overview');
  const [projects, setProjects] = useState<ResearchProject[]>(() => {
    const saved = localStorage.getItem('marketlens_projects_v2');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error('Failed to parse saved projects', e);
      }
    }
    return INITIAL_PROJECTS;
  });

  const [activeProjectId, setActiveProjectId] = useState<string>(() => {
    return projects[0]?.id || SAMPLE_STUDENT_TIFFIN.id;
  });

  const [draftForm, setDraftForm] = useState<ResearchFormInput>(defaultDraft);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisStep, setAnalysisStep] = useState('');
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [lastAnalysisError, setLastAnalysisError] = useState<string | null>(null);

  // Runtime Gemini API Key (stored in memory/session only for secure evaluation)
  const [runtimeApiKey, setRuntimeApiKey] = useState<string>(() => {
    return sessionStorage.getItem('marketlens_runtime_key') || '';
  });
  const [isApiKeyModalOpen, setIsApiKeyModalOpen] = useState(false);

  // Server API status
  const [apiStatus, setApiStatus] = useState<ApiStatus>({
    configured: false,
    model: 'gemini-2.5-flash',
    message: 'Checking Gemini API status...',
  });

  const [isAnalyzingFeedback, setIsAnalyzingFeedback] = useState(false);
  const [isGeneratingPlan, setIsGeneratingPlan] = useState(false);

  // Check API configuration on load
  useEffect(() => {
    MarketLensApi.checkStatus().then((status) => {
      setApiStatus(status);
    });
  }, []);

  // Save projects to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('marketlens_projects_v2', JSON.stringify(projects));
    } catch (e) {
      console.error('Failed to cache projects', e);
    }
  }, [projects]);

  const handleSetRuntimeKey = (key: string) => {
    setRuntimeApiKey(key);
    sessionStorage.setItem('marketlens_runtime_key', key);
  };

  const activeProject =
    projects.find((p) => p.id === activeProjectId) || projects[0] || SAMPLE_STUDENT_TIFFIN;

  const loadSampleProject = (sampleId: string = SAMPLE_STUDENT_TIFFIN.id) => {
    const existing = projects.find((p) => p.id === sampleId);
    if (existing) {
      setActiveProjectId(sampleId);
    } else {
      setProjects((prev) => [SAMPLE_STUDENT_TIFFIN, ...prev]);
      setActiveProjectId(SAMPLE_STUDENT_TIFFIN.id);
    }
    setCurrentTab('market-overview');
  };

  const startAnalysisWorkflow = async (input: ResearchFormInput): Promise<void> => {
    setIsAnalyzing(true);
    setLastAnalysisError(null);
    setAnalysisProgress(15);
    setAnalysisStep('Assembling modular evidence layer & parameters...');

    // Collect evidence records
    const collectedEvidence: ResearchEvidenceRecord[] = [];
    if (input.targetGeography.toLowerCase().includes('kanpur')) {
      collectedEvidence.push(...EvidenceService.getKanpurTiffinEvidence());
    }

    // Attach any user notes from draft or existing project
    if (input.notes) {
      collectedEvidence.push(
        EvidenceService.createFromUserFeedback(input.notes, input.targetCustomer)
      );
    }
    if (activeProject.userInterviewNotes) {
      activeProject.userInterviewNotes.forEach((quote) => {
        collectedEvidence.push(
          EvidenceService.createFromUserFeedback(quote, input.targetCustomer)
        );
      });
    }

    await new Promise((r) => setTimeout(r, 400));
    setAnalysisProgress(35);
    setAnalysisStep('Connecting to Google Gemini API (or checking local fallback)...');

    await new Promise((r) => setTimeout(r, 500));
    setAnalysisProgress(60);
    setAnalysisStep('Synthesizing competitor matrix, customer needs & opportunity theses...');

    const result = await MarketLensApi.analyzeMarket({
      input,
      evidence: collectedEvidence,
      runtimeApiKey: runtimeApiKey || undefined,
    });

    setAnalysisProgress(90);
    setAnalysisStep('Validating schema and integrating into research dossier...');

    await new Promise((r) => setTimeout(r, 400));
    setAnalysisProgress(100);

    setProjects((prev) => [result.project, ...prev]);
    setActiveProjectId(result.project.id);

    if (result.mode === 'demonstration-sample' && !apiStatus.configured && !runtimeApiKey) {
      setLastAnalysisError(
        'Note: GEMINI_API_KEY is not configured on the server. Generated in Demonstration Mode with sample benchmarks.'
      );
    }

    await new Promise((r) => setTimeout(r, 300));
    setIsAnalyzing(false);
    setAnalysisProgress(0);
    setCurrentTab('market-overview');
  };

  const retryLastAnalysis = async () => {
    if (draftForm.businessIdea) {
      await startAnalysisWorkflow(draftForm);
    } else if (activeProject) {
      await startAnalysisWorkflow(activeProject.input);
    }
  };

  const addCustomerInterviewNote = (note: string) => {
    if (!note.trim()) return;
    const cleanNote = note.trim();
    const newEvidence = EvidenceService.createFromUserFeedback(
      cleanNote,
      activeProject.input.targetCustomer
    );

    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === activeProjectId) {
          const currentNotes = proj.userInterviewNotes || [];
          const currentEvidence = proj.evidenceLayer || [];
          return {
            ...proj,
            userInterviewNotes: [cleanNote, ...currentNotes],
            evidenceLayer: [newEvidence, ...currentEvidence],
          };
        }
        return proj;
      })
    );
  };

  const analyzeFeedbackWithGemini = async () => {
    const notes = activeProject.userInterviewNotes || [];
    if (notes.length === 0) return;

    setIsAnalyzingFeedback(true);
    const res = await MarketLensApi.analyzeFeedback({
      feedbackNotes: notes,
      input: activeProject.input,
      runtimeApiKey: runtimeApiKey || undefined,
    });

    if (res.success && res.data) {
      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id === activeProjectId) {
            return {
              ...proj,
              customerPreferenceAnalysis: res.data,
            };
          }
          return proj;
        })
      );
    }
    setIsAnalyzingFeedback(false);
  };

  const generateValidationPlanWithGemini = async (opportunityId: string) => {
    const opp = activeProject.opportunities.find((o) => o.id === opportunityId);
    if (!opp) return;

    setIsGeneratingPlan(true);
    const res = await MarketLensApi.generateValidationPlan({
      opportunity: opp,
      input: activeProject.input,
      runtimeApiKey: runtimeApiKey || undefined,
    });

    if (res.success && res.data) {
      const generated = res.data;
      const newItem: ValidationItem = {
        id: `val-${Date.now()}`,
        opportunityId: opp.id,
        hypothesis: generated.hypothesis || `Testing opportunity: ${opp.title}`,
        interviewQuestions: generated.interviewQuestions || [
          'When was the last time you experienced this problem?',
          'What did you do to solve it, and what did it cost?',
          'What was the most frustrating part of that workaround?',
          'Who decided on or paid for that purchase?',
          'What would make you switch away from your current approach today?'
        ],
        suggestedExperiment: generated.lowCostExperiment || opp.recommendedValidationExperiment,
        lowCostExperiment: generated.lowCostExperiment,
        recommendedSampleSize: generated.recommendedSampleSize || '15 target customers',
        measurableSuccessMetric: generated.measurableSuccessMetric || 'At least 60% committed interest or prepayment',
        successMetric: generated.measurableSuccessMetric || '60% positive test',
        decisionRule: generated.decisionRule || 'If target threshold reached, advance to pilot; otherwise pivot',
        potentialConfoundingFactors: generated.potentialConfoundingFactors || ['Courtesy bias in interviews'],
        nextSteps: generated.nextSteps || ['Draft interview guide', 'Schedule 10 discovery calls'],
        status: 'Pending Test',
      };

      setProjects((prev) =>
        prev.map((proj) => {
          if (proj.id === activeProjectId) {
            return {
              ...proj,
              validationLab: [newItem, ...proj.validationLab],
            };
          }
          return proj;
        })
      );
      setCurrentTab('validation-lab');
    }
    setIsGeneratingPlan(false);
  };

  const updateValidationStatus = (validationId: string, status: ValidationItem['status']) => {
    setProjects((prev) =>
      prev.map((proj) => {
        if (proj.id === activeProjectId) {
          return {
            ...proj,
            validationLab: proj.validationLab.map((item) =>
              item.id === validationId ? { ...item, status } : item
            ),
          };
        }
        return proj;
      })
    );
  };

  return (
    <ResearchContext.Provider
      value={{
        currentTab,
        setCurrentTab,
        projects,
        activeProject,
        activeProjectId,
        setActiveProjectId,
        isAnalyzing,
        analysisStep,
        analysisProgress,
        draftForm,
        setDraftForm,
        startAnalysisWorkflow,
        addCustomerInterviewNote,
        updateValidationStatus,
        loadSampleProject,
        apiStatus,
        runtimeApiKey,
        setRuntimeApiKey: handleSetRuntimeKey,
        lastAnalysisError,
        clearAnalysisError: () => setLastAnalysisError(null),
        retryLastAnalysis,
        analyzeFeedbackWithGemini,
        isAnalyzingFeedback,
        generateValidationPlanWithGemini,
        isGeneratingPlan,
        isApiKeyModalOpen,
        setIsApiKeyModalOpen,
      }}
    >
      {children}
    </ResearchContext.Provider>
  );
};

export const useResearch = () => {
  const context = useContext(ResearchContext);
  if (!context) {
    throw new Error('useResearch must be used within a ResearchProvider');
  }
  return context;
};
