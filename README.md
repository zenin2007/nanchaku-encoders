# MarketLens AI — Understand Your Market. Find Your Opportunity.

> **Hackathon Problem Statement:**  
> *"Startups often lack affordable access to reliable market research and competitor insights. Build a platform that helps entrepreneurs analyze customer preferences and market opportunities."*

---

## 🌐 Quick Access (Localhost)

When running locally, access the live application directly in your browser:

- **Primary URL:** [http://localhost:5173/](http://localhost:5173/)
- **Alternative IP:** [http://127.0.0.1:5173/](http://127.0.0.1:5173/)
- **Backend API Status Check:** [http://localhost:5173/api/status](http://localhost:5173/api/status)

---

## 🚀 Quick Start Guide

### 1. Prerequisites
- **Node.js** (v18 or higher recommended)
- **npm** or your preferred package manager

### 2. Setup & Installation
```bash
# Clone or navigate to the project directory
cd "c:\Users\l\OneDrive\Desktop\nanchaku encoders"

# Install dependencies
npm install
```

### 3. Run Development Server
```bash
npm run dev
```
The server will boot in ~1 second. Navigate to [http://localhost:5173/](http://localhost:5173/).

### 4. Build for Production (Verification)
```bash
npm run build
```
*(Zero TypeScript or linter errors; 1,952 modules bundled into `dist/`)*

---

## 🔑 Environment Configuration (Optional)

The application includes a **deterministic benchmark fallback**, meaning **no API key is required** to test all 8 functional pages and features.

To enable live AI synthesis with Google Gemini:
1. Create a `.env` file in the project root:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ```
2. Restart `npm run dev`, or click the **"Gemini: Demo Mode"** badge in the header to enter a temporary session key directly in your browser.

---

## 💡 What Makes MarketLens AI Different?

| Feature | Generic AI Chatbots (ChatGPT / Claude) | MarketLens AI |
| :--- | :--- | :--- |
| **Evidence Grounding** | Blends facts with unverified hallucinations seamlessly. | Classifies every finding into 4 tiers: `[VERIFIED]`, `[USER_SIGNAL]`, `[AI_INFERENCE]`, `[UNVERIFIED]`. |
| **Customer Insights** | Invents hypothetical buyer personas and fake quotes. | Ingests raw qualitative interview transcripts and customer reviews directly into preference clustering. |
| **Competitor Tracking** | Fabricates confidential pricing and private metrics. | Features side-by-side matrices and explicitly flags unknown data as *"Custom Quote Required"*. |
| **Opportunity Explainability** | Gives generic advice with fake success probabilities. | Provides 6-part explainability cards with banner: *"Potential opportunity — requires validation"*. |
| **Actionable De-risking** | Stops at high-level essays. | Lean **Validation Lab** generates falsifiable hypotheses, *The Mom Test* interview scripts, and cheap ($0–$100) tests. |

---

## 🗺️ Application Features & Workflow

1. **Executive Dashboard (`OverviewDashboard.tsx`):**  
   High-level health metrics, recent research switchers, active Gemini status, and rapid navigation.
2. **Research Intake Form (`NewResearchForm.tsx`):**  
   Structured research scope inputs with a 1-click **Example Scenario Pre-loader** and raw customer quote ingestion.
3. **Market Overview (`MarketOverviewView.tsx`):**  
   Market size benchmarks, regulatory tailwinds, structural headwinds, and cited sources.
4. **Competitor Intelligence (`CompetitorIntelligenceView.tsx`):**  
   Multi-competitor comparison matrix, positioning spectrum, and observable vulnerabilities.
5. **Customer Preferences (`CustomerPreferencesView.tsx`):**  
   Ranked customer priorities, willingness-to-pay drivers, buying criteria, friction points, and raw quote tracebacks.
6. **Market Opportunities (`MarketOpportunitiesView.tsx`):**  
   6-part explainable opportunity cards with clear uncertainty boundaries and validation triggers.
7. **Validation Lab (`ValidationLabView.tsx`):**  
   Riskiest assumption test recipes, falsification metrics, sample sizes, and stage progression tracking.
8. **Research Report Dossier (`ResearchReportsView.tsx`):**  
   Full 12-section printable dossier (`window.print()`) with instant Markdown/JSON download export.

---

## 🛠️ Technology Stack

- **Frontend:** React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React icons
- **AI Engine:** Google Gen AI SDK (`@google/genai` v2.31.0) with Gemini 2.5 Flash
- **Secure Middleware:** Vite Connect Server Plugin (`server/geminiServerPlugin.ts`) preventing client key leakage
- **Client Fallback:** Deterministic benchmark fallback engine (`src/services/marketLensApi.ts`)

---

## 📚 Complete Project Documentation

- **[HACKATHON_DEMO.md](file:///c:/Users/l/OneDrive/Desktop/nanchaku%20encoders/HACKATHON_DEMO.md):** 90-second demo script, judge Q&A, and full problem breakdown.
- **[IMPLEMENTATION_STATUS.md](file:///c:/Users/l/OneDrive/Desktop/nanchaku%20encoders/IMPLEMENTATION_STATUS.md):** Phase 1, 2, and 3 implementation logs and test verification records.
- **[TECHNICAL_APPROACH.md](file:///c:/Users/l/OneDrive/Desktop/nanchaku%20encoders/TECHNICAL_APPROACH.md):** Architectural diagrams, data models, and API schemas.
- **[RESEARCH_METHODOLOGY.md](file:///c:/Users/l/OneDrive/Desktop/nanchaku%20encoders/RESEARCH_METHODOLOGY.md):** Epistemic guardrails, customer feedback extraction rules, and evidence criteria.
