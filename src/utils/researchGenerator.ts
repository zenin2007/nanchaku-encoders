import type {
  ResearchFormInput,
  ResearchProject,
  CompetitorRecord,
  CustomerPreferencePoint,
  MarketOpportunity,
  ValidationItem
} from '../types';

export function generateResearchFromInput(input: ResearchFormInput): ResearchProject {
  const projectId = 'proj-' + Date.now();
  const title = `${input.businessIdea.slice(0, 42).trim()}... — ${input.targetGeography.split(',')[0].trim()}`;

  const competitors: CompetitorRecord[] = [
    {
      id: `${projectId}-comp-1`,
      name: `Local Traditional Providers (${input.industry} incumbent in ${input.targetGeography.split(',')[0]})`,
      type: 'Direct',
      serviceOffering: `Conventional services catering to standard ${input.targetCustomer}.`,
      customerSegment: `Cost-sensitive customers in ${input.targetGeography}.`,
      pricingEstimate: input.budgetInr ? `Benchmark: ~₹${Math.round(Number(input.budgetInr) * 0.05)} to ₹${Math.round(Number(input.budgetInr) * 0.15)} per transaction / month` : 'Unverified market rate',
      strengths: [
        'Established neighborhood footprint and legacy word-of-mouth',
        'Direct cash transactions and physical proximity',
        'Familiarity with local customer habits'
      ],
      weaknesses: [
        'Lack of digital tracking, consistency, and automated updates',
        'Limited flexibility or customization for modern user expectations',
        'Variable service quality during peak operating periods'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'Incumbent local presence and existing habit',
      channels: ['Local physical presence', 'Word of mouth']
    },
    {
      id: `${projectId}-comp-2`,
      name: `Digital Platforms & Aggregators in ${input.industry}`,
      type: 'Indirect',
      serviceOffering: `App-based booking, delivery, or digital marketplace for ${input.industry.toLowerCase()}.`,
      customerSegment: `Tech-savvy segment within ${input.targetCustomer}.`,
      pricingEstimate: 'Standard digital premium (+20% to 35% commission markup)',
      strengths: [
        'Broad catalog and familiar smartphone user experience',
        'Digital payment processing and brand recognition',
        'High convenience for spontaneous purchases'
      ],
      weaknesses: [
        'High take rates/commissions reducing margin for local suppliers',
        'Lack of deep localization for specific needs in ' + input.targetGeography,
        'Impersonal customer support and high churn'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'Broad platform scale and marketing reach',
      channels: ['App stores', 'Paid digital advertising']
    },
    {
      id: `${projectId}-comp-3`,
      name: `Informal / DIY Alternatives`,
      type: 'Alternative',
      serviceOffering: `Self-managed or peer-to-peer informal solutions currently used by ${input.targetCustomer}.`,
      customerSegment: `Users who have not found a trustworthy commercial offering in ${input.targetGeography}.`,
      pricingEstimate: 'Nominal out-of-pocket costs + high personal time investment',
      strengths: [
        'Zero vendor lock-in',
        'Maximum personal control over process'
      ],
      weaknesses: [
        'Consumes significant personal time and mental bandwidth',
        'Inconsistent outcomes and lack of reliability'
      ],
      evidenceStatus: 'Demonstration Sample',
      keyDifferentiator: 'No commercial commitment required',
      channels: ['Personal routines and peer networks']
    }
  ];

  const customerPreferences: CustomerPreferencePoint[] = [
    {
      id: `${projectId}-pref-1`,
      category: 'Critical Need',
      title: `Reliability and consistent execution in ${input.industry.toLowerCase()}`,
      description: `Target customers (${input.targetCustomer}) prioritize dependable timing, safety, and consistent quality over superficial novelties.`,
      frequencyScore: 'High',
      evidenceStatus: 'Preliminary Hypothesis',
      suggestedAction: 'Establish explicit Service Level Agreements (SLAs) and transparent satisfaction policies.'
    },
    {
      id: `${projectId}-pref-2`,
      category: 'Pain Point',
      title: `Lack of price transparency and inflexible commitments`,
      description: `In ${input.targetGeography}, customers report frustration with hidden add-on charges and rigid cancellation terms.`,
      frequencyScore: 'High',
      evidenceStatus: 'Preliminary Hypothesis',
      suggestedAction: 'Offer a transparent, all-inclusive pricing schedule and low-friction trial options.'
    },
    {
      id: `${projectId}-pref-3`,
      category: 'Desired Feature',
      title: `Low-friction communication channel (e.g. WhatsApp / Direct SMS)`,
      description: `Users prefer managing bookings, updates, or queries through familiar conversational apps rather than downloading yet another dedicated app.`,
      frequencyScore: 'Medium',
      evidenceStatus: 'Preliminary Hypothesis',
      suggestedAction: 'Launch with a streamlined conversational front-end before investing in a native mobile application.'
    },
    {
      id: `${projectId}-pref-4`,
      category: 'Purchasing Barrier',
      title: `Trust deficit regarding quality standards before first purchase`,
      description: `Prospective customers hesitate to commit upfront funds without social proof from local peers in ${input.targetGeography}.`,
      frequencyScore: 'High',
      evidenceStatus: 'Needs Field Verification',
      suggestedAction: 'Provide a risk-free introductory package or peer referral incentive for early adopters.'
    }
  ];

  const opportunities: MarketOpportunity[] = [
    {
      id: `${projectId}-opp-1`,
      title: `Hyperlocal Niching in ${input.targetGeography}`,
      description: `Build an intensely focused, community-first service model tailored specifically to ${input.targetCustomer}, solving hyper-local friction that pan-regional competitors ignore.`,
      targetCustomer: input.targetCustomer,
      supportingObservations: [
        `Local incumbent providers lack modern digital responsiveness.`,
        `Users in ${input.targetGeography} express strong desire for tailored reliability.`
      ],
      evidenceStatus: 'Preliminary Hypothesis',
      keyAssumptions: [
        `Acquisition cost can be kept low through organic cluster referrals and localized community presence.`,
        `Unit economics can sustain profitability within the target budget constraint (${input.budgetInr ? '₹' + Number(input.budgetInr).toLocaleString('en-IN') : 'bootstrapped'}).`
      ],
      primaryRisks: [
        'Geographic density may initially limit total reachable market without geographic expansion.',
        'Copycat emergence if entry barriers remain purely operational.'
      ],
      recommendedValidationExperiment: `Conduct 15 in-person customer discovery interviews with ${input.targetCustomer} across 3 distinct hubs in ${input.targetGeography}.`,
      estimatedComplexity: 'Low',
      potentialValue: 'High'
    },
    {
      id: `${projectId}-opp-2`,
      title: `Low-Commitment Micro-Trial Model`,
      description: `Remove upfront adoption reluctance by packaging a low-cost, short-duration trial (e.g., 3-day or single-use pass) that converts users based on experienced product quality.`,
      targetCustomer: input.targetCustomer,
      supportingObservations: [
        `Upfront financial risk is identified as the single largest barrier preventing customers from switching.`
      ],
      evidenceStatus: 'Preliminary Hypothesis',
      keyAssumptions: [
        'At least 40% of micro-trial users will convert to recurring weekly or monthly plans.',
        'Trial pricing covers direct marginal delivery costs.'
      ],
      primaryRisks: [
        'High churn after promotional trial period if continuous product value is not felt.'
      ],
      recommendedValidationExperiment: `Pre-sell 20 micro-trial slots using a simple flyer, landing page, or WhatsApp link before committing capital.`,
      estimatedComplexity: 'Low',
      potentialValue: 'High'
    }
  ];

  const validationLab: ValidationItem[] = [
    {
      id: `${projectId}-val-1`,
      hypothesis: `At least 5 out of 10 targeted ${input.targetCustomer} in ${input.targetGeography} consider current ${input.industry.toLowerCase()} options unsatisfactory enough to try an alternative within 14 days.`,
      interviewQuestions: [
        `When was the last time you tried to solve this problem, and what specific step felt most frustrating?`,
        `How much did you spend, and what did you feel you did not get for your money?`,
        `If an alternative solved this specific bottleneck, what would prevent you from testing it this week?`
      ],
      suggestedExperiment: `Interview 10 representative target customers using a structured 15-minute discovery protocol; do not pitch the solution until the final 3 minutes.`,
      successMetric: `At least 6 respondents independently describe the core problem without prompting and request to join the early pilot list.`,
      nextSteps: [
        `Draft 5 open-ended interview questions focusing on recent past behavior`,
        `Engage 10 prospective customers in their natural environment in ${input.targetGeography}`,
        `Document verbatim quotes and categorize into pain, workaround, and budget willingness`
      ],
      status: 'Pending Test'
    },
    {
      id: `${projectId}-val-2`,
      hypothesis: `The unit economics can remain viable within an operational bootstrap budget of ${input.budgetInr ? '₹' + Number(input.budgetInr).toLocaleString('en-IN') : 'seed funding'} while maintaining target service quality.`,
      interviewQuestions: [
        `What is the maximum you have paid for a premium alternative in this category?`,
        `Would you be willing to prepay for a multi-use token or subscription if it included guaranteed priority service?`
      ],
      suggestedExperiment: `Calculate unit cost breakdown (materials, labor, delivery, customer support) and validate with 2 local supplier quotes.`,
      successMetric: `Achieve a gross margin of at least 35% on projected initial transaction volumes.`,
      nextSteps: [
        `Request raw quote sheets from 2 local vendors in ${input.targetGeography}`,
        `Model 3 volume scenarios (conservative, baseline, optimistic)`,
        `Establish breakeven customer count`
      ],
      status: 'Pending Test'
    }
  ];

  return {
    id: projectId,
    title,
    createdAt: new Date().toISOString(),
    isDemonstration: true,
    input,
    marketOverview: {
      researchQuestion: `How can an early-stage venture execute "${input.businessIdea}" to effectively serve ${input.targetCustomer} in ${input.targetGeography} under the stage of "${input.businessStage}"?`,
      targetMarket: `${input.industry} sector in ${input.targetGeography}, specifically targeted at ${input.targetCustomer}.`,
      targetCustomers: input.targetCustomer,
      relevantConsiderations: [
        `Target customer segment (${input.targetCustomer}) exhibits clear behavioral patterns and price sensitivity characteristic of ${input.targetGeography}.`,
        `Current business stage is "${input.businessStage}", indicating validation and customer discovery must precede fixed capital expenditure.`,
        `Stated research objective is "${input.researchObjective}", directing immediate analytical focus toward actionable market entry insights.`,
        input.budgetInr ? `Budget allocation of ₹${Number(input.budgetInr).toLocaleString('en-IN')} favors low-overhead, organic cluster validation.` : 'Unstated budget necessitates capital-efficient experiment design.'
      ],
      knownInformation: [
        `High geographic concentration of target audience in selected area of ${input.targetGeography}.`,
        `Incumbent offerings suffer from documented customer service gaps in digital convenience and reliability.`
      ],
      missingInformation: [
        `Exact willingness-to-pay threshold for premium versus standard service tiers.`,
        `Repeat purchase cadence and retention curve beyond first 30 days.`,
        `Local supplier lead times and consistency under adverse weather or peak demand.`
      ],
      researchCoverage: {
        marketSizeConfidence: 'Needs Survey',
        competitorDensity: 'Medium',
        customerClarityScore: 68,
        dataFreshness: 'Synthesized for current session (Demonstration Dataset)'
      }
    },
    competitors,
    customerPreferences,
    opportunities,
    validationLab,
    userInterviewNotes: []
  };
}
