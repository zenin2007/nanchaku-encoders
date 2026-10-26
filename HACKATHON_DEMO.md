# MarketLens AI — Hackathon Demonstration & Evaluation Guide

---

## A. Problem Statement

> **"Startups often lack affordable access to reliable market research and competitor insights. Build a platform that helps entrepreneurs analyze customer preferences and market opportunities."**

---

## B. Problem Breakdown

Early-stage founders face a critical market intelligence gap:

1. **Affordable Market Research:**  
   Traditional syndicated reports from firms like Gartner, Forrester, or IDC cost between **$5,000 and $35,000 per report**—completely out of reach for bootstrapped or pre-seed founders. Founders resort to anecdotal web searches or generic AI chat prompts that hallucinate statistics.
2. **Competitor Insights:**  
   Founders struggle to identify competitor vulnerabilities, feature gaps, and pricing models without spending hundreds of hours reading forums, reviews, and changelogs. They risk building copies of features incumbents already dominate.
3. **Customer Preference Analysis:**  
   Founders collect messy qualitative notes from customer interviews, Discord channels, and beta feedback, but lack a systematic way to extract true willingness-to-pay drivers, critical buying criteria, and dealbreaker frictions.
4. **Market Opportunity Identification:**  
   Most market analysis stops at high-level observations. Founders need actionable, underserved white spaces backed by customer evidence, along with cheap, falsifiable validation experiments to de-risk ideas before writing code.

---

## C. Solution

**MarketLens AI** is an evidence-aware market intelligence platform tailored specifically for early-stage entrepreneurs. It connects all four capabilities into an integrated, interactive pipeline:

```
[Entrepreneur Ingestion] -> [Grounded Analysis] -> [Evidence Classification] -> [Validation Lab]
   - Industry & Topic           - Market Drivers        - Verified Facts             - Riskiest Assumptions
   - Competitors to Monitor     - Competitor Matrix     - User Signals               - Cheap Experiments ($0-$100)
   - Real Customer Feedback     - Customer Preferences  - AI Inferences              - Pass/Fail Metrics
```

Rather than outputting walls of ungrounded text, MarketLens AI produces structured intelligence dossiers where every claim links to its source or is flagged with its appropriate epistemic uncertainty level.

---

## D. Differentiation

MarketLens AI does **not** claim that using LLMs for market research is a novel concept. Our differentiation lies in **epistemic integrity and evidence grounding**:

| Dimension | Generic AI Chatbot (ChatGPT / Claude) | MarketLens AI |
| :--- | :--- | :--- |
| **Evidence Transparency** | Blends facts and hallucinations seamlessly without distinction. | Explicit 4-tier labeling (`[VERIFIED]`, `[USER_SIGNAL]`, `[AI_INFERENCE]`, `[UNVERIFIED]`). |
| **Certainty Framing** | Confidently quotes fabricated market CAGR numbers and fake quotes. | Rejects fabricated market metrics; highlights explicit knowledge gaps. |
| **Customer Feedback** | Ignores user's actual interview data unless pasted repetitively. | Ingests raw qualitative feedback and maps verbatim quotes to pain points. |
| **Opportunity Viability** | Gives generic "huge opportunities" with fake probability scores (e.g. "89% success"). | Banners: *"Potential opportunity — requires validation"*; provides 6-part explainability. |
| **Actionability** | Ends with advice to "talk to customers." | Generates testable, falsifiable validation protocols ($0–$100 tests). |

---

## E. Technology Stack

Only technologies actually implemented and running in the repository:

- **Frontend Core:** React 19 (`react`, `react-dom`), TypeScript (`tsc -b`).
- **Build & Dev Tooling:** Vite 8.3 (`vite`), `@vitejs/plugin-react`.
- **Styling:** Tailwind CSS v4 (`@tailwindcss/vite`, modern utility classes).
- **Icons:** Lucide React (`lucide-react`).
- **AI SDK:** Google Gen AI SDK (`@google/genai` v2.31.0) with Gemini 2.5 Flash.
- **Server Plugin:** Vite Connect Middleware (`server/geminiServerPlugin.ts`) keeping API keys secure on the server side.
- **Client Resilience:** In-memory context and deterministic benchmark fallback engine (`src/services/marketLensApi.ts`).

---

## F. Gemini Integration

Google Gemini is integrated via the official `@google/genai` SDK on a secure server-side middleware layer.

### Implemented Endpoints & Roles:
1. `GET /api/status`:  
   Inspects server environment for `GEMINI_API_KEY` without exposing keys to client code.
2. `POST /api/analyze-market`:  
   Executes structured JSON extraction on the user's research question, target segment, and competitors. Extracts market dynamics, competitor positioning, and opportunity white spaces.
3. `POST /api/analyze-customer-feedback`:  
   Synthesizes raw qualitative text (interview transcripts, customer reviews) into clustered preferences, friction points, and willingness-to-pay indicators.
4. `POST /api/generate-validation-plan`:  
   Analyzes an identified market opportunity to generate lean, falsifiable validation experiments, detailing riskiest assumptions, falsification criteria, and cheap test methods ($0–$100).

### Fault Tolerance & Privacy:
- **No Client Secret Leakage:** The client calls `/api/*`; the backend communicates with Gemini.
- **Graceful Fallback:** If `GEMINI_API_KEY` is absent or the API limit is hit, MarketLens AI automatically transitions to the curated benchmark dataset with zero UI crashes or data loss.

---

## G. Data Methodology

1. **User-Supplied Feedback:**  
   Founders can paste actual customer interview notes, survey responses, and forum feedback into the intake form. This forms the ground truth for preference extraction.
2. **Curated Benchmark Baseline:**  
   Pre-configured scenarios (e.g., *DevOps Compliance Automation for Seed Startups*, *Telehealth Mental Health Platform*) provide verified baseline data from industry case studies.
3. **Four-Tier Evidence Tagging:**  
   - `[VERIFIED]`: Direct factual observation with cited source or benchmark data.
   - `[USER_SIGNAL]`: Extracted directly from user-provided customer quotes or feedback.
   - `[AI_INFERENCE]`: Pattern synthesized by Gemini that requires empirical validation.
   - `[UNVERIFIED]`: Highlighted gap where public data was contradictory or absent.
4. **Strict Epistemic Guardrails:**  
   The system explicitly forbids displaying fabricated numerical market probabilities (e.g., "82% chance of winning market"). Missing data (such as enterprise competitor pricing) is explicitly marked as `"Custom Quote Required — Missing Public Data"`.

---

## H. Implemented Features

### ✅ Completed Features (Implemented & Verified):
- **Executive Overview Dashboard:** Quick metrics, recent research switchers, live Gemini status indicator, and navigation cards.
- **Comprehensive Research Intake:** Research question, target industry, competitor watchlist, raw customer feedback paste, and 1-click Example Scenario Loader.
- **Market Overview Screen:** Market size ranges, regulatory tailwinds/headwinds, and verified citations.
- **Competitor Intelligence Matrix:** Side-by-side feature comparison, market positioning spectrum, and competitor vulnerability mapping.
- **Customer Preference Analysis:** Ranked customer priorities, willingness-to-pay drivers, buying criteria, friction points, and raw quote tracebacks.
- **Explainable Market Opportunities:** 6-part explainability breakdown for every opportunity:
  1. Why identified
  2. Customer problem addressed
  3. Competitor observations
  4. Supporting customer evidence
  5. What remains uncertain
  6. Recommended test method
  - Banner: *"Potential opportunity — requires validation before capital commitment."*
- **Lean Validation Lab:** Riskiest assumption mapping, falsifiable hypotheses, $0–$100 experiment recipes, and interactive stage progression.
- **12-Section Research Dossier:** Complete exportable report with clean print formatting (`window.print()`) and instant Markdown/JSON export.

### 📋 Planned Features (Post-Hackathon):
- Automated live web scrapers for real-time G2/Capterra review aggregation.
- Team workspaces with multi-user commenting and role-based permissions.
- Direct Google Forms and Typeform webhook connectors for real-time survey ingestion.
- Server-side headless PDF export generation.

---

## I. Demo Script (90-Second Walkthrough)

**[00:00 - 00:15] The Hook & Problem**  
*"Every founder needs market research, but Gartner costs $30,000, and ChatGPT invents fake market stats and fake quotes. Today we present **MarketLens AI**: an affordable, evidence-grounded research platform for early-stage entrepreneurs."*

**[00:15 - 00:35] Setup & Grounded Intake**  
*"Here is our dashboard. We click **'New Research'** and load our startup scenario: DevOps Continuous Compliance for Seed Startups. Notice that we don't just input keywords—we ingest raw customer interview notes directly into the workflow. We submit the research."*

**[00:35 - 00:55] Competitor & Customer Preferences**  
*"In **Competitor Intelligence**, we see our incumbents mapped out with their vulnerabilities—like enterprise lock-in and high prices. In **Customer Preferences**, we see real willingness-to-pay drivers extracted from user feedback, highlighting SOC2 audit anxiety as the #1 buying trigger."*

**[00:55 - 01:15] Explainable Opportunities & Validation Lab**  
*"In **Market Opportunities**, notice our epistemic rule: we never display a fake 'success score'. Instead, every card explains the 'Why', the competitor gap, the supporting quote, and flags: 'Potential opportunity — requires validation.' With one click, we jump to the **Validation Lab** to get a $50 falsifiable test experiment."*

**[01:15 - 01:30] The 12-Section Dossier & Close**  
*"Finally, our **Research Report** formats a comprehensive 12-section dossier ready for investors or co-founders, complete with print and export capabilities. MarketLens AI turns raw market noise into actionable, validated startup decisions. Thank you!"*

---

## J. Judge Questions & Answers

### 1. How is this different from asking ChatGPT?
**Answer:** ChatGPT produces a seamless wall of text where factual truths, hallucinations, and speculative predictions are blended together without attribution. MarketLens AI enforces an epistemic evidence model: every observation is classified into verified data, user-provided customer signals, or AI inferences. Furthermore, it extracts structured matrices, links customer quotes to opportunities, and automatically designs falsifiable validation experiments instead of generic advice.

### 2. How do you ensure reliable market research?
**Answer:** We prevent AI hallucination through constraint:
- Publicly verifiable information is grounded in benchmark sources.
- Customer preferences are strictly anchored to the text pasted by the user.
- The model is instructed to output explicit knowledge gaps rather than invent estimates when data is unavailable.
- Unsupported numerical claims and fake probabilities are systematically stripped.

### 3. Where does competitor information come from?
**Answer:** In the current prototype, competitor intelligence combines user inputs, verified baseline profiles, and Gemini analysis of public competitive landscapes. In production, this will be connected to real-time APIs (such as search grounding and public review feeds). Where pricing or architecture is private, the application explicitly warns: *"Custom Quote Required — Missing Public Data"*.

### 4. How do you identify customer preferences without inventing them?
**Answer:** We require raw qualitative input—such as interview notes, customer support tickets, or survey responses. Gemini acts as an extraction and synthesis engine, clustering recurring semantic themes and extracting verbatim quotes to justify each preference tag and willingness-to-pay factor.

### 5. How could this product become sustainable?
**Answer:** A SaaS freemium model:
- **Free Tier:** 3 research dossiers per month using standard models and baseline benchmarks.
- **Pro Tier ($29/mo):** Unlimited live Gemini analyses, custom interview imports, and team dossier exports.
- **Enterprise / Accelerator Tier ($99/mo):** Batch customer feedback ingestion, cohort analytics, and live competitor tracking alerts.

---

## K. Limitations

We believe in radical transparency regarding current prototype limitations:
1. **Static Competitor Offline Cache:** When running without an active Gemini API key, competitor profiles rely on curated benchmark datasets.
2. **Quality Depends on Input:** Customer preference analysis is only as deep as the customer feedback notes provided by the entrepreneur.
3. **Context Length Constraints:** Very large interview transcripts (>50 pages) must be summarized or broken into batches before ingestion.
4. **Browser-Based Printing:** Dossier export relies on browser rendering (`window.print()`) and markdown/JSON file generation rather than a dedicated PDF rendering backend.

---

## L. Run Instructions

### 1. Prerequisites
- Node.js (v18+ recommended)
- Modern web browser (Chrome, Edge, Firefox, Safari)

### 2. Setup & Installation
```bash
# Clone the repository and navigate to the project directory
cd "c:\Users\l\OneDrive\Desktop\nanchaku encoders"

# Install dependencies
npm install
```

### 3. Environment Configuration (Optional)
To enable live Gemini AI synthesis:
Create a `.env` file in the project root:
```env
GEMINI_API_KEY=your_gemini_api_key_here
```
*(If omitted, the platform automatically runs on the deterministic benchmark engine with full UI functionality.)*

### 4. Start the Application
```bash
npm run dev
```

### 5. Access the Platform
Open your browser and navigate to:
```
http://127.0.0.1:5173/
```
