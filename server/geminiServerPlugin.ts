import type { Plugin, ViteDevServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import * as dotenv from 'dotenv';
import * as http from 'http';

dotenv.config();

const MODEL_NAME = 'gemini-2.5-flash';

function readJsonBody<T = any>(req: http.IncomingMessage): Promise<T> {
  return new Promise((resolve, reject) => {
    let data = '';
    req.on('data', (chunk) => {
      data += chunk;
    });
    req.on('end', () => {
      try {
        if (!data.trim()) {
          resolve({} as T);
        } else {
          resolve(JSON.parse(data));
        }
      } catch (err) {
        reject(new Error('Invalid JSON payload in request body'));
      }
    });
    req.on('error', (err) => reject(err));
  });
}

function sendJsonResponse(res: http.ServerResponse, statusCode: number, data: any) {
  res.statusCode = statusCode;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(data));
}

function getApiKey(req: http.IncomingMessage, body?: any): string | undefined {
  const headerKey = req.headers['x-gemini-api-key'];
  if (typeof headerKey === 'string' && headerKey.trim()) {
    return headerKey.trim();
  }
  if (body?.apiKey && typeof body.apiKey === 'string' && body.apiKey.trim()) {
    return body.apiKey.trim();
  }
  return process.env.GEMINI_API_KEY?.trim();
}

export function geminiServerPlugin(): Plugin {
  return {
    name: 'marketlens-gemini-api',
    configureServer(server: ViteDevServer) {
      // 1. Status Check
      server.middlewares.use('/api/status', (req, res) => {
        if (req.method !== 'GET') {
          return sendJsonResponse(res, 405, { error: 'Method not allowed' });
        }
        const hasServerKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.trim() !== 'your_gemini_api_key_here');
        sendJsonResponse(res, 200, {
          configured: hasServerKey,
          model: MODEL_NAME,
          message: hasServerKey
            ? 'GEMINI_API_KEY detected on server. Live Gemini 2.5 Flash analysis ready.'
            : 'GEMINI_API_KEY is not set. Demonstration mode is active.',
        });
      });

      // 2. Full Market Research Analysis
      server.middlewares.use('/api/analyze-market', async (req, res) => {
        if (req.method !== 'POST') {
          return sendJsonResponse(res, 405, { error: 'Method not allowed' });
        }

        try {
          const body = await readJsonBody(req);
          const apiKey = getApiKey(req, body);

          if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            return sendJsonResponse(res, 200, {
              success: false,
              fallback: true,
              mode: 'demonstration-sample',
              message: 'GEMINI_API_KEY not configured. Falling back to demonstration analysis mode.',
            });
          }

          const { input, evidence } = body;
          if (!input || !input.businessIdea || !input.industry || !input.targetGeography) {
            return sendJsonResponse(res, 400, {
              error: 'Missing required research request fields (businessIdea, industry, targetGeography).',
            });
          }

          const ai = new GoogleGenAI({ apiKey });

          const prompt = `
You are a senior market research director and venture strategist for MarketLens AI.
Analyze this startup research request with rigorous commercial and epistemic discipline.

IMPORTANT RULES:
1. Distinguish observed empirical evidence from interpretations and hypotheses.
2. Explicitly identify what information is missing.
3. For competitors, do NOT invent fake prices, customer reviews, or market share numbers. Represent missing info as "Unknown / Needs Field Verification".
4. For customer preferences, if no real customer evidence was provided, state clear hypotheses and suggest research questions rather than claiming preferences are verified.
5. In opportunities, explain WHY the opportunity was identified. Do not claim a specific percentage probability of success.
6. Provide a rigorous, JSON-only response matching the exact schema below.

STARTUP PARAMETERS:
- Idea: ${input.businessIdea}
- Industry: ${input.industry}
- Target Customer: ${input.targetCustomer}
- Geography: ${input.targetGeography}
- Objective: ${input.researchObjective}
- Business Stage: ${input.businessStage}
- Budget: ${input.budgetInr ? '₹' + input.budgetInr : 'Unspecified / Bootstrapped'}

AVAILABLE EVIDENCE COLLECTED / SUPPLIED:
${JSON.stringify(evidence || [], null, 2)}

REQUIRED JSON OUTPUT SCHEMA:
{
  "executiveSummary": "Concise 2-3 paragraph analytical summary of the opportunity, market bounds, and core constraints.",
  "marketOverview": {
    "researchQuestion": "Sharp core strategic question facing this business",
    "targetMarket": "Precise geographic & economic boundaries",
    "targetCustomers": "Detailed target segment profile",
    "relevantConsiderations": ["5 specific operational, demographic, or regulatory considerations"],
    "knownInformation": ["3-5 baseline observed facts about this market"],
    "missingInformation": ["3-5 critical unknowns that must be verified in the field"],
    "researchCoverage": {
      "marketSizeConfidence": "Low (Sample Data)" | "Moderate" | "Needs Survey",
      "competitorDensity": "High" | "Medium" | "Low",
      "customerClarityScore": 75,
      "dataFreshness": "Analyzed via Gemini 2.5 Flash"
    }
  },
  "competitors": [
    {
      "name": "Competitor or Category Name",
      "type": "Direct" | "Indirect" | "Alternative",
      "serviceOffering": "What they provide",
      "customerSegment": "Who uses them",
      "pricingEstimate": "Observed or benchmarked pricing (or explicitly 'Unverified')",
      "positioning": "Market positioning",
      "strengths": ["2-3 observed strengths"],
      "weaknesses": ["2-3 observable vulnerabilities"],
      "evidenceStatus": "Qualitative Observation" | "Secondary Benchmark" | "Needs Field Verification",
      "keyDifferentiator": "Core differentiator",
      "channels": ["Distribution channels"],
      "supportingSources": ["Sources or 'Local inquiry benchmark'"],
      "missingInformation": ["What is unknown about them"]
    }
  ],
  "customerPreferences": [
    {
      "category": "Critical Need" | "Pain Point" | "Desired Feature" | "Purchasing Barrier",
      "title": "Short title",
      "description": "Specific friction or requirement",
      "frequencyScore": "High" | "Medium" | "Low",
      "evidenceStatus": "Preliminary Hypothesis" | "Qualitative Observation" | "Needs Field Verification",
      "suggestedAction": "Lean action to address this",
      "directEvidenceSnippet": "Direct customer quote if provided in evidence, else null",
      "aiInterpretation": "Analytical inference"
    }
  ],
  "customerPreferenceAnalysis": {
    "commonNeeds": [{"need": "...", "aiInterpretation": "...", "frequency": "High"}],
    "painPoints": [{"pain": "...", "aiInterpretation": "...", "severity": "High"}],
    "desiredFeatures": [{"feature": "...", "aiInterpretation": "..."}],
    "purchasingConsiderations": [{"factor": "...", "aiInterpretation": "..."}],
    "recurringThemes": ["2-3 major behavioral themes"],
    "segmentDifferences": ["Differences between sub-segments"],
    "contradictions": ["Tensions or contradictory buyer desires"],
    "missingEvidence": ["Missing customer data"],
    "suggestedResearchQuestions": ["4 discovery interview questions"],
    "preliminaryHypotheses": ["3 customer adoption hypotheses"]
  },
  "opportunities": [
    {
      "title": "Opportunity Title",
      "description": "Why this opportunity exists based on competitor gaps and customer friction",
      "targetCustomer": "Specific customer subset",
      "customerProblem": "Underlying problem being addressed",
      "relevantCompetitorObservations": ["Observations about current alternatives"],
      "supportingObservations": ["Market and behavioral observations"],
      "supportingEvidence": ["Evidence claims"],
      "evidenceStatus": "Preliminary Hypothesis" | "Qualitative Observation",
      "evidenceQuality": "Moderate (Corroborated)" | "Weak (Requires Validation)",
      "keyAssumptions": ["Critical assumptions that must hold true"],
      "primaryRisks": ["Downside risks"],
      "recommendedValidationExperiment": "Low-cost validation test",
      "successMetric": "Quantifiable pass/fail gate",
      "recommendedNextAction": "First operational step",
      "estimatedComplexity": "Low" | "Medium" | "High",
      "potentialValue": "High" | "Moderate" | "Exploratory"
    }
  ],
  "validationLab": [
    {
      "hypothesis": "Testable falsifiable business hypothesis",
      "interviewQuestions": [
        "Unbiased question 1 about past behavior",
        "Unbiased question 2 about current spend/workaround",
        "Unbiased question 3 about primary friction point",
        "Unbiased question 4 about decision criteria",
        "Unbiased question 5 about switching barriers"
      ],
      "suggestedExperiment": "Specific lean experiment protocol",
      "lowCostExperiment": "Specific lean experiment protocol",
      "recommendedSampleSize": "e.g. 15 target users in Kanpur",
      "measurableSuccessMetric": "e.g. 60% conversion or prepayment commitment",
      "successMetric": "Measurable threshold",
      "decisionRule": "If metric is met, proceed to pilot; if below, pivot value proposition",
      "potentialConfoundingFactors": ["Possible confounding biases"],
      "nextSteps": ["3 immediate execution steps"],
      "status": "Pending Test"
    }
  ]
}
`.trim();

          const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: {
              responseMimeType: 'application/json',
            },
          });

          const rawText = response.text?.trim() || '';
          let parsedData: any;
          try {
            parsedData = JSON.parse(rawText);
          } catch (parseErr) {
            // If response contains markdown backticks
            const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
            parsedData = JSON.parse(cleaned);
          }

          // Validate required top-level keys
          if (
            !parsedData.marketOverview ||
            !Array.isArray(parsedData.competitors) ||
            !Array.isArray(parsedData.customerPreferences) ||
            !Array.isArray(parsedData.opportunities)
          ) {
            throw new Error('Gemini response did not contain required schema sections.');
          }

          return sendJsonResponse(res, 200, {
            success: true,
            mode: 'gemini-live',
            model: MODEL_NAME,
            data: parsedData,
          });
        } catch (err: any) {
          console.error('[Gemini Server Plugin] Market Analysis Error:', err);
          return sendJsonResponse(res, 500, {
            success: false,
            fallback: true,
            error: err.message || 'Gemini API call failed',
            message: 'An error occurred while calling the Gemini API. Falling back to structured demonstration dataset.',
          });
        }
      });

      // 3. Customer Feedback Deep Analysis Endpoint
      server.middlewares.use('/api/analyze-customer-feedback', async (req, res) => {
        if (req.method !== 'POST') {
          return sendJsonResponse(res, 405, { error: 'Method not allowed' });
        }

        try {
          const body = await readJsonBody(req);
          const apiKey = getApiKey(req, body);

          if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            return sendJsonResponse(res, 200, {
              success: false,
              fallback: true,
              message: 'GEMINI_API_KEY not configured. Falling back to local feedback parsing.',
            });
          }

          const { feedbackNotes, input } = body;
          if (!feedbackNotes || !Array.isArray(feedbackNotes) || feedbackNotes.length === 0) {
            return sendJsonResponse(res, 400, { error: 'No customer feedback notes provided.' });
          }

          const ai = new GoogleGenAI({ apiKey });

          const prompt = `
You are a customer discovery and qualitative research specialist for MarketLens AI.
Analyze these raw user feedback notes and interview transcripts for a startup in ${input?.targetGeography || 'the target market'}.

RAW CUSTOMER NOTES & TRANSCRIPTS:
${feedbackNotes.map((n: string, i: number) => `[Quote ${i + 1}]: "${n}"`).join('\n')}

BUSINESS CONTEXT:
${input?.businessIdea || 'Startup product idea'} (${input?.industry || 'General Industry'})
Target Customer: ${input?.targetCustomer || 'General customer'}

CRITICAL INSTRUCTIONS:
- Distinguish direct customer statements from your own AI analytical inferences.
- Highlight any contradictions between respondents.
- Flag missing information that was NOT addressed by the quotes.
- Return ONLY valid JSON in this exact structure:

{
  "commonNeeds": [
    {
      "need": "Customer need statement",
      "directEvidence": "Exact quote snippet supporting this",
      "aiInterpretation": "Strategic implication",
      "frequency": "High" | "Medium" | "Low"
    }
  ],
  "painPoints": [
    {
      "pain": "Friction point",
      "directEvidence": "Exact quote snippet",
      "aiInterpretation": "Root cause",
      "severity": "High" | "Medium" | "Low"
    }
  ],
  "desiredFeatures": [
    {
      "feature": "Desired feature / delighter",
      "directEvidence": "Quote snippet",
      "aiInterpretation": "Value prop"
    }
  ],
  "purchasingConsiderations": [
    {
      "factor": "Price sensitivity or trust consideration",
      "directEvidence": "Quote snippet",
      "aiInterpretation": "Adoption hurdle"
    }
  ],
  "recurringThemes": ["Major themes across notes"],
  "segmentDifferences": ["Differences observed across users"],
  "contradictions": ["Conflicting expectations"],
  "missingEvidence": ["Gaps still needing discovery interviews"],
  "suggestedResearchQuestions": ["4 follow-up discovery questions"]
}
`.trim();

          const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: { responseMimeType: 'application/json' },
          });

          const rawText = response.text?.trim() || '';
          const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);

          return sendJsonResponse(res, 200, {
            success: true,
            mode: 'gemini-live',
            data: parsed,
          });
        } catch (err: any) {
          console.error('[Gemini Server Plugin] Feedback Analysis Error:', err);
          return sendJsonResponse(res, 500, {
            success: false,
            error: err.message,
            message: 'Feedback analysis via Gemini failed; falling back to heuristic parsing.',
          });
        }
      });

      // 4. Validation Experiment Generator for Selected Opportunity
      server.middlewares.use('/api/generate-validation-plan', async (req, res) => {
        if (req.method !== 'POST') {
          return sendJsonResponse(res, 405, { error: 'Method not allowed' });
        }

        try {
          const body = await readJsonBody(req);
          const apiKey = getApiKey(req, body);

          if (!apiKey || apiKey === 'your_gemini_api_key_here') {
            return sendJsonResponse(res, 200, {
              success: false,
              fallback: true,
              message: 'GEMINI_API_KEY not configured. Falling back to local validation generator.',
            });
          }

          const { opportunity, input } = body;
          if (!opportunity || !opportunity.title) {
            return sendJsonResponse(res, 400, { error: 'Opportunity data missing.' });
          }

          const ai = new GoogleGenAI({ apiKey });

          const prompt = `
You are a lean startup experimental design expert for MarketLens AI.
Design a rigorous validation experiment for this market opportunity:

OPPORTUNITY:
Title: ${opportunity.title}
Description: ${opportunity.description}
Target Customer: ${opportunity.targetCustomer}
Geography: ${input?.targetGeography || 'Target Geography'}
Budget: ${input?.budgetInr ? '₹' + input.budgetInr : 'Lean / Bootstrapped'}

CRITICAL RULES:
1. Do not confuse stated customer interest ("that sounds nice") with actual purchasing behavior (prepayment, deposits, letters of intent, time commitment).
2. The 5 customer interview questions must be non-leading (The Mom Test principle): focus on past behavior, specific workarounds, and actual past expenditures, NEVER hypothetical ("Would you buy X?").
3. Include an explicit decision rule and confounding factors.
4. Return valid JSON only:

{
  "hypothesis": "Falsifiable hypothesis focusing on customer willingness to take an action",
  "interviewQuestions": [
    "Unbiased question 1 exploring the last time they experienced this problem",
    "Unbiased question 2 exploring what workaround they used and what it cost",
    "Unbiased question 3 exploring what frustrated them most about existing options",
    "Unbiased question 4 exploring who makes the spending decision",
    "Unbiased question 5 exploring what commitments or stakes they have tried"
  ],
  "lowCostExperiment": "Step-by-step experiment description doable under minimal capital",
  "recommendedSampleSize": "Recommended sample size (e.g. 15-20 specific target users)",
  "measurableSuccessMetric": "Measurable numeric conversion or payment gate",
  "decisionRule": "Explicit rule: if X is achieved proceed, else pivot or abandon",
  "potentialConfoundingFactors": ["Confounding bias 1", "Confounding bias 2"],
  "nextSteps": ["Immediate operational step 1", "Step 2", "Step 3"]
}
`.trim();

          const response = await ai.models.generateContent({
            model: MODEL_NAME,
            contents: prompt,
            config: { responseMimeType: 'application/json' },
          });

          const rawText = response.text?.trim() || '';
          const cleaned = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
          const parsed = JSON.parse(cleaned);

          return sendJsonResponse(res, 200, {
            success: true,
            mode: 'gemini-live',
            data: parsed,
          });
        } catch (err: any) {
          console.error('[Gemini Server Plugin] Validation Plan Error:', err);
          return sendJsonResponse(res, 500, {
            success: false,
            error: err.message,
            message: 'Validation plan generation failed; using standard validation template.',
          });
        }
      });
    },
  };
}
