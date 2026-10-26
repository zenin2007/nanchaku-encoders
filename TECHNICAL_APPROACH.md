# MarketLens AI — Technical Approach & Architecture Specification

## 1. Executive Summary & Problem Framing
**MarketLens AI** addresses the structural problem that early-stage startups and student entrepreneurs face: **lack of affordable access to reliable market research and competitor intelligence**.

Traditional research requires either expensive consulting retainers or ad-hoc web searches that produce hallucinations, unverified statistics, and confirmation bias. MarketLens AI solves this by introducing:
1. **A Modular Evidence Layer**: Grounding market observations with explicit source attribution and limitations.
2. **Epistemic Discipline**: Explicitly separating empirical evidence from AI interpretations, preliminary hypotheses, and unknown gaps.
3. **Structured Gemini 2.5 Flash Pipeline**: Utilizing server-side schema-enforced generations rather than free-form conversational essays.
4. **Lean Validation Protocols**: Converting high-level opportunity theses into falsifiable hypotheses and non-leading interview scripts (*The Mom Test* principles).

---

## 2. High-Level System Architecture

```
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                                CLIENT (React 19 + TypeScript)                         │
├───────────────────────┬──────────────────────────────────┬─────────────────────────────┤
│  Research Intake      │  Global State (Context)          │  8 Structured Views         │
│  - NewResearchForm    │  - ResearchContext               │  - OverviewDashboard        │
│  - Field Validations  │  - Draft Input Persistence       │  - MarketOverviewView       │
│  - Prepopulated Demo  │  - Active Project Switcher       │  - CompetitorIntelligence   │
│  - Runtime Key Modal  │  - Dynamic Evidence Store        │  - CustomerPreferences      │
│                       │  - Optimistic UI Updates         │  - MarketOpportunities      │
│                       │                                  │  - ValidationLab            │
│                       │                                  │  - ResearchReports          │
└───────────┬───────────┴─────────────────┬────────────────┴───────────────┬─────────────┘
            │                             │                                │
            │ HTTP / JSON                 │ Calls Client Service           │ Direct Print / Export
            ▼                             ▼                                ▼
┌──────────────────────────────────────────────────────────┐   ┌─────────────────────────┐
│              Client API Layer (marketLensApi.ts)         │   │   CSS @media print      │
│  - checkStatus()                                         │   │   Native PDF Generation │
│  - analyzeMarket()                                       │   └─────────────────────────┘
│  - analyzeFeedback()                                     │
│  - generateValidationPlan()                              │
│  - Deterministic Fallback Engine (researchGenerator.ts)  │
└──────────────────────────┬───────────────────────────────┘
                           │ POST /api/* (JSON)
                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                        SERVER-SIDE ENGINE (Vite Dev Server / Node.js)                  │
├────────────────────────────────────────────────────────────────────────────────────────┤
│  Vite Connect Middleware Plugin (`server/geminiServerPlugin.ts`)                       │
│  - Environment Isolation: Loads `GEMINI_API_KEY` from `.env` via `dotenv`              │
│  - Security Boundary: Never exposes API keys to client bundles or window objects       │
│  - Strict JSON Schema Prompting & Response Extraction                                  │
│  - Graceful Fallback Delivery when API key is missing or calls encounter errors        │
└──────────────────────────┬─────────────────────────────────────────────────────────────┘
                           │ Official SDK: `@google/genai`
                           ▼
┌────────────────────────────────────────────────────────────────────────────────────────┐
│                            GOOGLE GEMINI 2.5 FLASH API                                 │
│  - Model: `gemini-2.5-flash` with `responseMimeType: 'application/json'`               │
│  - Fast latency (< 1.8s typical response time)                                         │
│  - Temperature-calibrated for analytical objectivity & epistemic modesty               │
└────────────────────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Core Technical Decisions & Stack Rationale

| Layer | Technology | Engineering Rationale |
| :--- | :--- | :--- |
| **Framework** | **React 19 + TypeScript + Vite 8** | Ultra-fast HMR (< 800ms), modern React hook architecture, and strict TypeScript compilation with `verbatimModuleSyntax`. |
| **Styling** | **Tailwind CSS v4** | `@tailwindcss/vite` compiler integration, zero runtime CSS overhead, clean light palette (Slate/Blue/Emerald), responsive flex/grid layouts. |
| **AI SDK** | **`@google/genai` (v2.31.0)** | The official Google GenAI SDK providing first-class support for `gemini-2.5-flash` and strict JSON MIME enforcement. |
| **Backend API** | **Vite Connect Middleware** | Full-stack server endpoints mounted in `vite.config.ts`. Eliminates CORS, removes need for a separate Express server during development, and protects `.env` secrets. |
| **Icons** | **`lucide-react`** | High-cohesion, lightweight SVG icon system. |
| **Persistence** | **`localStorage` + `sessionStorage`** | Client-side cache maintaining project history, customer interview quotes, and draft state across navigation. |

---

## 4. Key Implementation Files

### 1. Server-Side Gemini Plugin (`server/geminiServerPlugin.ts`)
Handles server-side security, loads `GEMINI_API_KEY`, and mounts four RESTful API endpoints:
- `GET /api/status`: Probes server environment for `GEMINI_API_KEY`.
- `POST /api/analyze-market`: Validates research request parameters, structures prompt with evidence, enforces JSON schema, and invokes `ai.models.generateContent({ model: 'gemini-2.5-flash' })`.
- `POST /api/analyze-customer-feedback`: Extracts recurring themes, contradictions, segment differences, and missing evidence from customer interview transcripts.
- `POST /api/generate-validation-plan`: Builds 5 unbiased interview questions (*The Mom Test*), sample size, success metric gate, and decision rules.

```typescript
// Excerpt from server/geminiServerPlugin.ts
export function geminiServerPlugin(): Plugin {
  return {
    name: 'marketlens-gemini-api',
    configureServer(server: ViteDevServer) {
      server.middlewares.use('/api/status', (req, res) => {
        const hasServerKey = Boolean(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== 'your_gemini_api_key_here');
        sendJsonResponse(res, 200, { configured: hasServerKey, model: 'gemini-2.5-flash' });
      });
      // ... /api/analyze-market, /api/analyze-customer-feedback, /api/generate-validation-plan
    }
  };
}
```

### 2. Client API & Fallback Engine (`src/services/marketLensApi.ts`)
Maintains connection resilience. If the server does not have `GEMINI_API_KEY` configured or if an API quota is reached, it seamlessly maps to `generateResearchFromInput` while transparently tagging metadata with `mode: 'demonstration-sample'`.

```typescript
// Excerpt from src/services/marketLensApi.ts
if (json.success && json.mode === 'gemini-live' && json.data) {
  return { project: mapGeminiToProject(json.data, input, evidence), mode: 'gemini-live' };
}
// Transparent fallback to deterministic demonstration engine
return { project: fallbackProject, mode: 'demonstration-sample' };
```

### 3. Modular Evidence Layer (`src/services/evidenceService.ts`)
Ensures no factual hallucination occurs by categorizing and tagging every evidence claim:
- Fields: `id`, `claim`, `sourceName`, `sourceUrl`, `evidenceType`, `retrievalDate`, `limitations`, `verified`.
- Categories: `Official Website`, `Public Product Page`, `Public Business Listing`, `User Customer Feedback`, `Government / Industry Benchmark`, `Empirical Observation`, `Illustrative Sample`.

### 4. Global State Architecture (`src/context/ResearchContext.tsx`)
Provides unified state across all 8 navigation views:
- `activeProject`: The current active `ResearchProject`.
- `startAnalysisWorkflow(input)`: Orchestrates multi-step loading modal, gathers evidence layer, calls `/api/analyze-market`, and transitions views.
- `addCustomerInterviewNote(quote)`: Appends verbatim customer voice to project state and evidence layer.
- `analyzeFeedbackWithGemini()`: Triggers qualitative synthesis on user quotes.
- `generateValidationPlanWithGemini(oppId)`: Creates tailored interview guides and decision rules for a selected opportunity.

---

## 5. Epistemic Guardrail Framework

MarketLens AI enforces three core epistemic principles throughout the UI:

1. **Separation of Evidence vs. Hypotheses**:
   - Customer feedback notes are rendered verbatim under **Direct Customer Voice**.
   - Model inferences are explicitly styled as **AI Interpretation**.
   - Unverified competitors explicitly show **Missing Information** rather than invented market shares.

2. **No Deceptive Quantitative Scores**:
   - Avoids assigning fake probability percentages (e.g. "92% chance of success").
   - Instead uses qualitative evidence quality indicators: `Strong (Empirical)`, `Moderate (Corroborated)`, `Weak (Requires Validation)`.

3. **Behavioral vs. Stated Interest (*The Mom Test*)**:
   - Customer interview scripts generated in the **Validation Lab** focus exclusively on **past behavior**, **actual spend**, and **existing workarounds**, never hypothetical questions ("Would you buy this?").
   - Metrics require irreversible commitments (deposits, pre-orders, letters of intent).

---

## 6. How to Run & Verify

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Configure Gemini API Key
# Copy .env.example to .env and insert your Google AI Studio API key
copy .env.example .env

# 3. Start the application
npm run dev

# 4. Open in browser: http://127.0.0.1:5173
```
