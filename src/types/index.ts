export type ResearchObjective =
  | 'Understand the target market'
  | 'Analyze competitors'
  | 'Analyze customer preferences'
  | 'Identify market opportunities'
  | 'Evaluate a new product'
  | 'Compare geographical markets';

export type BusinessStage =
  | 'Exploring an idea'
  | 'Problem-solution validation'
  | 'Prototype / MVP ready'
  | 'Early revenue (< ₹1 Lakh/mo)'
  | 'Scaling existing business';

export interface ResearchFormInput {
  businessIdea: string;
  industry: string;
  targetCustomer: string;
  targetGeography: string;
  researchObjective: ResearchObjective;
  businessStage: BusinessStage;
  budgetInr?: string;
  notes?: string;
}

export type EvidenceStatus =
  | 'Demonstration Sample'
  | 'Preliminary Hypothesis'
  | 'Qualitative Observation'
  | 'Secondary Benchmark'
  | 'Needs Field Verification'
  | 'Verified Source';

export type EvidenceType =
  | 'Official Website'
  | 'Public Product Page'
  | 'Public Business Listing'
  | 'User Customer Feedback'
  | 'Government / Industry Benchmark'
  | 'Empirical Observation'
  | 'Illustrative Sample';

export interface ResearchEvidenceRecord {
  id: string;
  claim: string;
  sourceName: string;
  sourceUrl?: string;
  evidenceType: EvidenceType;
  retrievalDate: string;
  limitations: string;
  verified: boolean;
}

export interface CompetitorRecord {
  id: string;
  name: string;
  type: 'Direct' | 'Indirect' | 'Alternative';
  serviceOffering: string;
  customerSegment: string;
  pricingEstimate: string;
  positioning?: string;
  strengths: string[];
  weaknesses: string[];
  evidenceStatus: EvidenceStatus;
  marketShareEstimate?: string;
  keyDifferentiator: string;
  channels: string[];
  supportingSources?: string[];
  missingInformation?: string[];
}

export interface CustomerPreferencePoint {
  id: string;
  category: 'Critical Need' | 'Pain Point' | 'Desired Feature' | 'Purchasing Barrier';
  title: string;
  description: string;
  frequencyScore: 'High' | 'Medium' | 'Low';
  evidenceStatus: EvidenceStatus;
  suggestedAction: string;
  directEvidenceSnippet?: string;
  aiInterpretation?: string;
}

export interface CustomerPreferenceAnalysis {
  commonNeeds: Array<{
    need: string;
    directEvidence?: string;
    aiInterpretation: string;
    frequency: 'High' | 'Medium' | 'Low';
  }>;
  painPoints: Array<{
    pain: string;
    directEvidence?: string;
    aiInterpretation: string;
    severity: 'High' | 'Medium' | 'Low';
  }>;
  desiredFeatures: Array<{
    feature: string;
    directEvidence?: string;
    aiInterpretation: string;
  }>;
  purchasingConsiderations: Array<{
    factor: string;
    directEvidence?: string;
    aiInterpretation: string;
  }>;
  recurringThemes: string[];
  segmentDifferences: string[];
  contradictions: string[];
  missingEvidence: string[];
  suggestedResearchQuestions: string[];
  preliminaryHypotheses: string[];
}

export interface MarketOpportunity {
  id: string;
  title: string;
  description: string;
  targetCustomer: string;
  customerProblem?: string;
  relevantCompetitorObservations?: string[];
  supportingObservations: string[];
  supportingEvidence?: string[];
  evidenceStatus: EvidenceStatus;
  evidenceQuality?: 'Strong (Empirical)' | 'Moderate (Corroborated)' | 'Weak (Requires Validation)' | 'Illustrative Sample';
  keyAssumptions: string[];
  primaryRisks: string[];
  recommendedValidationExperiment: string;
  validationExperiment?: string;
  successMetric?: string;
  recommendedNextAction?: string;
  estimatedComplexity: 'Low' | 'Medium' | 'High';
  potentialValue: 'High' | 'Moderate' | 'Exploratory';
}

export interface ValidationItem {
  id: string;
  opportunityId?: string;
  hypothesis: string;
  interviewQuestions: string[]; // exactly 5 unbiased questions
  suggestedExperiment: string;
  lowCostExperiment?: string;
  recommendedSampleSize?: string;
  measurableSuccessMetric?: string;
  successMetric: string;
  decisionRule?: string;
  potentialConfoundingFactors?: string[];
  nextSteps: string[];
  status: 'Pending Test' | 'In Progress' | 'Validated' | 'Invalidated';
}

export interface AnalysisMetadata {
  mode: 'gemini-live' | 'demonstration-sample';
  modelUsed?: string;
  timestamp: string;
  evidenceCount: number;
  confidenceNote: string;
  executiveSummary?: string;
}

export interface ResearchProject {
  id: string;
  title: string;
  createdAt: string;
  input: ResearchFormInput;
  isDemonstration: boolean;
  metadata?: AnalysisMetadata;
  evidenceLayer?: ResearchEvidenceRecord[];
  marketOverview: {
    researchQuestion: string;
    targetMarket: string;
    targetCustomers: string;
    relevantConsiderations: string[];
    knownInformation: string[];
    missingInformation: string[];
    researchCoverage: {
      marketSizeConfidence: 'Low (Sample Data)' | 'Moderate' | 'Needs Survey' | 'High';
      competitorDensity: 'High' | 'Medium' | 'Low';
      customerClarityScore: number; // 0 - 100
      dataFreshness: string;
    };
  };
  competitors: CompetitorRecord[];
  customerPreferences: CustomerPreferencePoint[];
  customerPreferenceAnalysis?: CustomerPreferenceAnalysis;
  opportunities: MarketOpportunity[];
  validationLab: ValidationItem[];
  userInterviewNotes?: string[];
}

export type NavigationTab =
  | 'overview'
  | 'new-research'
  | 'market-overview'
  | 'competitor-intelligence'
  | 'customer-preferences'
  | 'market-opportunities'
  | 'validation-lab'
  | 'research-reports';
