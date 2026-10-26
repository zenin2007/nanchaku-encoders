import type {
  ResearchFormInput,
  ResearchProject,
  ResearchEvidenceRecord,
  CustomerPreferenceAnalysis,
  MarketOpportunity,
  ValidationItem
} from '../types';
import { generateResearchFromInput } from '../utils/researchGenerator';

export interface ApiStatus {
  configured: boolean;
  model: string;
  message: string;
}

export interface MarketAnalysisResult {
  project: ResearchProject;
  mode: 'gemini-live' | 'demonstration-sample';
  modelUsed?: string;
  message?: string;
}

export class MarketLensApi {
  /**
   * Check if Gemini API key is configured on server
   */
  static async checkStatus(): Promise<ApiStatus> {
    try {
      const res = await fetch('/api/status');
      if (!res.ok) throw new Error(`HTTP error ${res.status}`);
      return await res.json();
    } catch (e: any) {
      return {
        configured: false,
        model: 'gemini-2.5-flash',
        message: 'Could not connect to backend server. Running in client-side demonstration mode.',
      };
    }
  }

  /**
   * Request full market analysis from Gemini (or fallback)
   */
  static async analyzeMarket(params: {
    input: ResearchFormInput;
    evidence: ResearchEvidenceRecord[];
    runtimeApiKey?: string;
  }): Promise<MarketAnalysisResult> {
    const { input, evidence, runtimeApiKey } = params;

    try {
      const headers: Record<string, string> = {
        'Content-Type': 'application/json',
      };
      if (runtimeApiKey) {
        headers['x-gemini-api-key'] = runtimeApiKey;
      }

      const res = await fetch('/api/analyze-market', {
        method: 'POST',
        headers,
        body: JSON.stringify({ input, evidence, apiKey: runtimeApiKey }),
      });

      if (!res.ok) {
        throw new Error(`Server responded with status ${res.status}`);
      }

      const json = await res.json();

      if (json.success && json.mode === 'gemini-live' && json.data) {
        const d = json.data;
        const projectId = 'proj-gemini-' + Date.now();

        const project: ResearchProject = {
          id: projectId,
          title: `${input.businessIdea.slice(0, 42).trim()}... — ${input.targetGeography.split(',')[0].trim()}`,
          createdAt: new Date().toISOString(),
          input,
          isDemonstration: false,
          metadata: {
            mode: 'gemini-live',
            modelUsed: json.model || 'gemini-2.5-flash',
            timestamp: new Date().toISOString(),
            evidenceCount: evidence.length,
            confidenceNote: 'Synthesized with Google Gemini 2.5 Flash using structured evidence parameters.',
            executiveSummary: d.executiveSummary,
          },
          evidenceLayer: evidence,
          marketOverview: {
            researchQuestion: d.marketOverview?.researchQuestion || `How to execute ${input.businessIdea} for ${input.targetCustomer}?`,
            targetMarket: d.marketOverview?.targetMarket || `${input.industry} in ${input.targetGeography}`,
            targetCustomers: d.marketOverview?.targetCustomers || input.targetCustomer,
            relevantConsiderations: d.marketOverview?.relevantConsiderations || [],
            knownInformation: d.marketOverview?.knownInformation || [],
            missingInformation: d.marketOverview?.missingInformation || [],
            researchCoverage: {
              marketSizeConfidence: d.marketOverview?.researchCoverage?.marketSizeConfidence || 'Moderate',
              competitorDensity: d.marketOverview?.researchCoverage?.competitorDensity || 'Medium',
              customerClarityScore: d.marketOverview?.researchCoverage?.customerClarityScore || 80,
              dataFreshness: 'Live Gemini 2.5 Flash synthesis',
            },
          },
          competitors: (d.competitors || []).map((c: any, idx: number) => ({
            id: `comp-gemini-${idx + 1}`,
            name: c.name || 'Unnamed Competitor',
            type: c.type || 'Direct',
            serviceOffering: c.serviceOffering || 'N/A',
            customerSegment: c.customerSegment || input.targetCustomer,
            pricingEstimate: c.pricingEstimate || 'Unverified / Unknown',
            positioning: c.positioning || '',
            strengths: Array.isArray(c.strengths) ? c.strengths : [],
            weaknesses: Array.isArray(c.weaknesses) ? c.weaknesses : [],
            evidenceStatus: c.evidenceStatus || 'Qualitative Observation',
            keyDifferentiator: c.keyDifferentiator || 'Local presence',
            channels: Array.isArray(c.channels) ? c.channels : ['Direct inquiry'],
            supportingSources: Array.isArray(c.supportingSources) ? c.supportingSources : [],
            missingInformation: Array.isArray(c.missingInformation) ? c.missingInformation : [],
          })),
          customerPreferences: (d.customerPreferences || []).map((p: any, idx: number) => ({
            id: `pref-gemini-${idx + 1}`,
            category: p.category || 'Critical Need',
            title: p.title || 'Customer Requirement',
            description: p.description || '',
            frequencyScore: p.frequencyScore || 'High',
            evidenceStatus: p.evidenceStatus || 'Preliminary Hypothesis',
            suggestedAction: p.suggestedAction || 'Conduct discovery interview',
            directEvidenceSnippet: p.directEvidenceSnippet,
            aiInterpretation: p.aiInterpretation,
          })),
          customerPreferenceAnalysis: d.customerPreferenceAnalysis,
          opportunities: (d.opportunities || []).map((o: any, idx: number) => ({
            id: `opp-gemini-${idx + 1}`,
            title: o.title || `Market Entry Thesis #${idx + 1}`,
            description: o.description || '',
            targetCustomer: o.targetCustomer || input.targetCustomer,
            customerProblem: o.customerProblem || '',
            relevantCompetitorObservations: Array.isArray(o.relevantCompetitorObservations) ? o.relevantCompetitorObservations : [],
            supportingObservations: Array.isArray(o.supportingObservations) ? o.supportingObservations : [],
            supportingEvidence: Array.isArray(o.supportingEvidence) ? o.supportingEvidence : [],
            evidenceStatus: o.evidenceStatus || 'Preliminary Hypothesis',
            evidenceQuality: o.evidenceQuality || 'Weak (Requires Validation)',
            keyAssumptions: Array.isArray(o.keyAssumptions) ? o.keyAssumptions : [],
            primaryRisks: Array.isArray(o.primaryRisks) ? o.primaryRisks : [],
            recommendedValidationExperiment: o.recommendedValidationExperiment || 'Run customer discovery interview',
            validationExperiment: o.recommendedValidationExperiment,
            successMetric: o.successMetric || '50% conversion gate',
            recommendedNextAction: o.recommendedNextAction || 'Interview 10 target buyers',
            estimatedComplexity: o.estimatedComplexity || 'Low',
            potentialValue: o.potentialValue || 'High',
          })),
          validationLab: (d.validationLab || []).map((v: any, idx: number) => ({
            id: `val-gemini-${idx + 1}`,
            hypothesis: v.hypothesis || 'Testable business hypothesis',
            interviewQuestions: Array.isArray(v.interviewQuestions) ? v.interviewQuestions : [],
            suggestedExperiment: v.suggestedExperiment || '10-customer discovery sprint',
            lowCostExperiment: v.lowCostExperiment || v.suggestedExperiment,
            recommendedSampleSize: v.recommendedSampleSize || '15 target customers',
            measurableSuccessMetric: v.measurableSuccessMetric || v.successMetric,
            successMetric: v.successMetric || '60% positive threshold',
            decisionRule: v.decisionRule || 'If target threshold reached, proceed to pilot; else pivot value proposition',
            potentialConfoundingFactors: Array.isArray(v.potentialConfoundingFactors) ? v.potentialConfoundingFactors : [],
            nextSteps: Array.isArray(v.nextSteps) ? v.nextSteps : ['Draft interview sheet', 'Contact target users'],
            status: 'Pending Test',
          })),
          userInterviewNotes: [],
        };

        return {
          project,
          mode: 'gemini-live',
          modelUsed: json.model || 'gemini-2.5-flash',
          message: 'Analysis successfully synthesized using Google Gemini 2.5 Flash.',
        };
      }

      // If server returned fallback = true or API key was missing
      const fallbackProject = generateResearchFromInput(input);
      fallbackProject.evidenceLayer = evidence;
      fallbackProject.metadata = {
        mode: 'demonstration-sample',
        timestamp: new Date().toISOString(),
        evidenceCount: evidence.length,
        confidenceNote: json.message || 'Demonstration Mode Active: GEMINI_API_KEY is not configured on the server.',
      };

      return {
        project: fallbackProject,
        mode: 'demonstration-sample',
        message: json.message || 'Demonstration dataset active (GEMINI_API_KEY not configured).',
      };
    } catch (err: any) {
      console.warn('[MarketLensApi] Falling back to demonstration synthesis due to network/server error:', err);
      const fallbackProject = generateResearchFromInput(input);
      fallbackProject.evidenceLayer = evidence;
      fallbackProject.metadata = {
        mode: 'demonstration-sample',
        timestamp: new Date().toISOString(),
        evidenceCount: evidence.length,
        confidenceNote: `Demonstration Mode: API call failed (${err.message || 'Network error'}). Running offline demonstration synthesis.`,
      };

      return {
        project: fallbackProject,
        mode: 'demonstration-sample',
        message: `API call failed: ${err.message}. Showing demonstration analysis.`,
      };
    }
  }

  /**
   * Deep analysis of customer feedback using Gemini
   */
  static async analyzeFeedback(params: {
    feedbackNotes: string[];
    input?: ResearchFormInput;
    runtimeApiKey?: string;
  }): Promise<{ success: boolean; data?: CustomerPreferenceAnalysis; error?: string; mode: 'gemini-live' | 'demonstration-sample' }> {
    const { feedbackNotes, input, runtimeApiKey } = params;

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (runtimeApiKey) headers['x-gemini-api-key'] = runtimeApiKey;

      const res = await fetch('/api/analyze-customer-feedback', {
        method: 'POST',
        headers,
        body: JSON.stringify({ feedbackNotes, input, apiKey: runtimeApiKey }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        return {
          success: true,
          mode: 'gemini-live',
          data: json.data,
        };
      }

      return {
        success: false,
        mode: 'demonstration-sample',
        error: json.message || 'API key not configured',
      };
    } catch (e: any) {
      return {
        success: false,
        mode: 'demonstration-sample',
        error: e.message || 'Network error analyzing feedback',
      };
    }
  }

  /**
   * Generate an in-depth Validation Plan for a specific opportunity using Gemini
   */
  static async generateValidationPlan(params: {
    opportunity: MarketOpportunity;
    input?: ResearchFormInput;
    runtimeApiKey?: string;
  }): Promise<{ success: boolean; data?: Partial<ValidationItem>; error?: string }> {
    const { opportunity, input, runtimeApiKey } = params;

    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (runtimeApiKey) headers['x-gemini-api-key'] = runtimeApiKey;

      const res = await fetch('/api/generate-validation-plan', {
        method: 'POST',
        headers,
        body: JSON.stringify({ opportunity, input, apiKey: runtimeApiKey }),
      });

      const json = await res.json();
      if (json.success && json.data) {
        return {
          success: true,
          data: json.data,
        };
      }

      return {
        success: false,
        error: json.message || 'Failed to generate plan via Gemini',
      };
    } catch (e: any) {
      return {
        success: false,
        error: e.message || 'Network error',
      };
    }
  }
}
