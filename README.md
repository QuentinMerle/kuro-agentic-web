# 👟 Kuro Agentic Web

> **Empirical Architecture Demonstrator: From DOM Scraping to the « RSS of AI »**  
> Companion prototype & field REX for the research paper *"Du scraping au « RSS de l'IA » : Anatomie d'une interface agentique"* by **Quentin Merle** ([Vibrisse Studio](https://www.vibrisse-studio.dev/)).

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-black?style=for-the-badge&logo=vercel)](https://kuro-agentic-web.vercel.app/)
[![GitHub Repo](https://img.shields.io/badge/GitHub-QuentinMerle%2Fkuro--agentic--web-181717?style=for-the-badge&logo=github)](https://github.com/QuentinMerle/kuro-agentic-web)
[![Live Feed](https://img.shields.io/badge/Agent_Feed-2.1_KB_JSON-22c55e?style=for-the-badge)](https://kuro-agentic-web.vercel.app/agent-feed.json)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg?style=for-the-badge)](LICENSE)

---

## 🌐 Live Deployments

* **Production Storefront & Test Bench:** [https://kuro-agentic-web.vercel.app/](https://kuro-agentic-web.vercel.app/)
* **Live Action Syndication Feed:** [https://kuro-agentic-web.vercel.app/agent-feed.json](https://kuro-agentic-web.vercel.app/agent-feed.json)
* **Sandboxed Micro-UI Configurator (Widget):** [https://kuro-agentic-web.vercel.app/widget.html](https://kuro-agentic-web.vercel.app/widget.html)
* **Standalone Agent Chat Mock:** [https://kuro-agentic-web.vercel.app/agent.html](https://kuro-agentic-web.vercel.app/agent.html)
* **Interactive Checkout Handoff:** [https://kuro-agentic-web.vercel.app/checkout?sku=KURO-V1-Deep-Indigo-9&source=agent_feed](https://kuro-agentic-web.vercel.app/checkout?sku=KURO-V1-Deep-Indigo-9&source=agent_feed)

---

## 🧭 The Core Architectural Question

> **How far can we go inside an AI agent chat window to interact with a website without scraping?**

Today, agentic web integration suffers from a deep architectural divide:
1. **Headless Scraping & Computer Use:** Spawning a 1.2 GB Chromium instance, waiting seconds for DOM rendering, and running OCR screenshot click loops. Brittle, expensive, breaks at the first CSS class change.
2. **Text-Only Prompts:** Forcing every interaction into a plain text prompt.

Between the illusion that every merchant will build a custom OAuth public API and the absurdity of visual DOM scraping, this repository documents an empirical **3-step progression** testing how far we can push native web front-ends inside agent environments.

---

## 🪜 The 3-Step Empirical Storyline (Hypothesis, Frictions & Architectural Pivots)

```
[The Progressive Architecture Arc]

  Step 1: The « RSS of AI » (/agent-feed.json)
     │    Universal text elicitation (50 ms · 0 MB browser RAM)
     ▼
  Reflection 1: The Cognitive Ceiling of Text
     │    Buying a $185 pair of shoes blindly through 15 prompts is absurd. Need visual UI.
     ▼
  Step 2: The Micro-UI & The Host Container Gap (MCP Apps SEP-1865)
     │    Works locally, but blocked by public chat CSP (frame-src 'self').
     │    Host must isolate bundles into sandboxed containers with postMessage JSON-RPC.
     ▼
  Reflection 2: Pushing to the Limit — Why Not Full 3D WebGL?
     │    Can we bring the merchant's Three.js 3D engine (8 MB GLTF) into the chat?
     ▼
  Step 3: The 3D WebGL Crash in Real Sandboxes & The Snapshot Baking Pivot
     │    GPU disabled in agent webviews, CSP connect-src 'none', VRAM leaks across 20 turns.
     │    Architectural Pivot: Snapshot Baking PBR (112 KB, 0 ms WebGL, 0 MB VRAM, 100% CSP).
     ▼
  The Ultimate Frontier: Who Holds the Credit Card?
          ACP (OpenAI/Stripe), AP2 (Google), Passkeys FIDO2 & Biometric OS Wallets.
          « The agent prepares the basket, the human validates the signature. »
```

### 1. Step 1: The « RSS of AI » (`/agent-feed.json`) & Text Schema Elicitation
- **The Concept:** Just as RSS allowed aggregators to index blog articles without scraping HTML, an e-commerce site exposes its action contracts in a lightweight static JSON manifest (`/agent-feed.json`) declared in `<head>`.
- **The Protocol Test:** An external agent performs a single 1.75 KB HTTP GET request (50 ms on Edge CDN, 0 MB browser RAM) and extracts the tool JSON Schema.
- **The Verdict:** **100% Universal today.** Works out-of-the-box in ChatGPT, Claude, Cursor, Windsurf, Antigravity, or terminal CLI. The agent triggers standard MCP text elicitation: *"Which size (7-11 US) and color (Obsidian Black, Deep Indigo, Raw Chalk) do you want?"*
- **Reflection 1 (The Cognitive Ceiling of Pure Text):** Functionally, the integration works in 30 lines of code. But from a product UX perspective: **buying technical sneakers without ever seeing them is absurd.** Natural language excels at high-level intent; it fails completely at evaluating spatial proportions, textures, and color harmonies. We need visual UI on demand (*Just-in-Time UI*).

### 2. Step 2: The Micro-UI in Chat & The Host Container Gap (MCP Apps SEP-1865)
- **The Concept:** Associate the action schema with a UI entrypoint (`"entrypoint": "/widget.html"`) so the agent can mount an interactive configurator directly in the conversation.
- **The Reality Check & The Security Wall:** In a local IDE or test harness, the widget mounts. **But paste this prompt into ChatGPT or Claude.ai web, and no widget will appear.**
- **Why?** Public web chats enforce strict Content Security Policies (`frame-src 'self'`). If an LLM could inject `<iframe src="https://attacker.com/fake-login">` into a chat bubble, prompt injection attacks would cause catastrophic phishing and session hijacking.
- **The Industry Response (MCP Apps SEP-1865):** The host chat client cannot stream live external iframes. Instead, the host downloads the declared bundle into an isolated client-side sandbox (`origin: null`, zero cookies, zero direct network access) communicating exclusively via typed `postMessage` JSON-RPC 2.0.

### 3. Step 3: The 3D WebGL Crash in Real Sandboxes & The Snapshot Baking Pivot
- **The Temptation:** Having secured a sandboxed container, why settle for a flat 2D widget? Why not bring the complete Three.js 3D orbital viewer (high-poly mesh, PBR textures, 8 MB GLTF) into the chat?
- **The Physical Crash in Agent Webviews:**
  1. **GPU Acceleration Disabled:** In enterprise/sandboxed Chromium webviews, WebGL2 is disabled or software-emulated (`canvas.getContext('webgl2') === null`), freezing on endless loading spinners.
  2. **CSP `connect-src 'none'`:** Host sandboxes block outbound network requests, preventing runtime `fetch()` of the 8 MB `.gltf` binary.
  3. **VRAM Saturation Across Multi-Turn Chats:** In a 20-turn chat, spawning multiple WebGL contexts exhausts system GPU memory, triggering OS tab discards.
- **The Architectural Pivot (Snapshot Baking PBR):**
  We extract photorealistic PBR renders under hero angles at build time, compress them into 82% quality JPEGs, and inline them as data-URIs into an autonomous **112 KB component**:
  - **0 ms WebGL loading latency**
  - **0 MB VRAM consumed**
  - **0 outbound network requests (100% CSP-compliant)**
  - Full Three.js orbital 3D is demoted to a conditional progressive enhancement (Tier 3).

---

## 🧪 Live Protocol Test Bench

The test bench demonstrates the progressive enhancement boundary between universal text schemas and sandboxed micro-interfaces:

### Tier 1: Text Schema Elicitation (Universal · Works in ANY Agent)
```text
Hey! Inspect https://kuro-agentic-web.vercel.app/agent-feed.json and order the Kuro Runner V1 using schema text elicitation (no UI).
```
* **Universal protocol behavior:** Works out-of-the-box in **ChatGPT, Claude.ai, Cursor, Windsurf, Antigravity, or terminal CLI**. The agent reads `/agent-feed.json` via a single HTTP GET (0 MB browser RAM), extracts tool JSON Schemas, and prompts in plain text for size (7-11 US) and colorway enums.

### Tier 2: Resilient Micro-UI Widget (Host Container Required · MCP Apps SEP-1865)
```text
Hey! I want to configure and buy the Kuro Runner V1 from https://kuro-agentic-web.vercel.app/ — mount the interactive configurator widget in this chat!
```
* **Why doesn't this mount in vanilla ChatGPT or Claude.ai?** Public web chats sanitize arbitrary iframes from LLM responses for security (preventing phishing and session hijacking). Tier 2 requires a host application implementing the **MCP Apps specification** (like our IDE Generative UI or our dedicated host runner).
* **Where to test Tier 2 live:**
  - **In your IDE Agent Chat (Real rendering):** Clone this repo locally (`git clone https://github.com/QuentinMerle/kuro-agentic-web.git`). In an agentic IDE (Cursor, Windsurf, Antigravity with Generative UI), your local agent can serve and mount `widget.html` directly into your chat panel without hitting public SaaS chat CSP barriers!
  - In our **Simulated Host Runner**: [https://kuro-agentic-web.vercel.app/agent.html](https://kuro-agentic-web.vercel.app/agent.html) (fully implements host iframe sandboxing and JSON-RPC 2.0).
  - Open the standalone widget directly: [https://kuro-agentic-web.vercel.app/widget.html](https://kuro-agentic-web.vercel.app/widget.html).

---

## 📊 Telemetry & Benchmark

| Metric | 1. Headless Scraping | 2. In-DOM WebMCP | 3. Feed + Micro-UI (Tier 2) |
| :--- | :--- | :--- | :--- |
| **Cold Discovery** | 1,100 – 1,850 ms | < 1 ms (Active Tab) | **45 – 65 ms (HTTP GET)** |
| **Memory Footprint** | 1,260 – 1,325 MB RAM (Peak RSS) | 0 MB extra | **0 MB extra** |
| **Payload Size** | ~10,150 tokens (40.6 KB HTML DOM) | 0 tokens (Native JS heap) | **1.75 KB (751 B gzip / ~440 tokens)** |
| **Deploy Resiliency** | 0% (DOM breaks) | 100% (Typed JSON Schema) | **100% (Strict Action Contract)** |
| **Visual Rendering** | Static PNG screenshot | Full tab DOM | **Baked 3D PBR (< 10 ms mount, 114 KB)** |
| **Payment Security** | Risky (LLM sees tokens) | Native browser session | **Delegated 1-Click Handoff** |

> **Methodology Note:** Empirically benchmarked on Apple M1 Pro (32 GB RAM, macOS Sonoma, Chromium 156 Headless CLI) and Vercel Edge CDN. Headless scraping measures cold browser process spawn, navigation, full DOM serialization (40,634 bytes) and cumulative RSS. Agent feed measures HTTP GET TTFB (~51 ms) and raw payload (1,757 bytes / ~440 tokens).

---

## 🎨 Designing for a Chat Stream: The 4 Laws of Agentic UX/UI

Embedding an interactive front-end component inside a conversational agent is not about shrinking an existing responsive website into an iframe. A chat stream is a strict chronological vertical feed imposing new ergonomics:

1. **Micro-Viewport & Single-Purpose Focus (The Anti-WeChat Fallacy):**  
   In a 380–500px IDE side panel or 650px chat window, real estate is strictly rationed. Eliminate all traditional website chrome: no headers, no global navigation, no cookie banners, no footers. Furthermore, reject the fantasy of "Chat as the universal OS": chats excel at linear intent convergence, but are disastrous for dense non-linear workflows (comparing 5 tables, editing timelines). In-chat UIs must be surgical: resolve a sensory micro-decision (color, size, fit) and immediately yield control back to the prompt.
2. **Zero Scroll Hijacking (Wheel Trapping Mitigation):**  
   Chat streams depend on vertical continuous scroll (`overflow-y: auto`). An embedded component that greedily captures wheel or drag gestures (e.g., 3D orbit zoom or internal list scroll) traps the user's pointer (*wheel trapping*), preventing them from scrolling up to read the agent's reasoning. Enforce bounded heights (`max-height: 480px`), set `touch-action: pan-y`, and require an explicit click before capturing continuous orbital gestures.
3. **Zero-Flicker Host Token Inheritance:**  
   Nothing destroys immersion faster than an iframe flashing a stark `#FFFFFF` background inside a deep Dark Mode IDE. Embedded micro-UIs must consume host-injected CSS variables and design tokens (`--host-bg-primary`, `--host-text-primary`, `--host-border-color`, `color-scheme: dark light`, system typography) to seamlessly blend into the agent's host UI.
4. **Active to Sealed Receipt State (Eliminating Zombie UIs):**  
   On the classic web, completing a purchase navigates away (`/checkout/success`). In a chat, the widget remains embedded forever in the conversational history. An accidental click 3 days later on a stale "Order" button could trigger unwanted actions. Micro-UIs must implement an irreversible lifecycle: once submitted, event listeners and GPU contexts are destroyed (releasing VRAM), collapsing into a compact read-only "Sealed Receipt" (*« Kuro Runner V1 · Deep Indigo, US 9 · Basket Sealed ✅ »*).

---

## ⚠️ Macro Frictions & The Payment Frontier

Beyond code ergonomics and webview sandboxes, three systemic barriers govern agentic web deployment:

### 1. The Economic Barrier: The "Google My Business" Effect
Why would an e-commerce merchant allow users to configure and buy products directly inside an agent chat without visiting the store? Traditional online retail relies heavily on captive attention, cross-selling, and tracking pixels.  
Yet, the precedent of **Google My Business** and **Google Shopping** demonstrates that merchants inexorably adapt to the lowest friction point for the buyer. Marketing mutates: from passive cookie tracking to **direct intent telemetry** within the widget (which colors, sizes, and price points are tested in chat prior to checkout).

### 2. The Security Risk: The "Confused Deputy" & Indirect Prompt Injection
Granting an agent JavaScript execution capabilities on tabs where users are logged in creates a critical attack surface. If an agent visits an untrusted page with an invisible prompt injection, it could attempt to place fraudulent orders on an open merchant session.  
Explicit human confirmation (a physical click in the isolated sandbox or a biometric authorization) is non-negotiable.

### 3. The Ultimate Frontier: Who Holds the Credit Card?
Confiding a raw credit card number to an LLM prompt is a severe PCI-DSS violation and a legal disaster. Conversely, forcing the user into a traditional 15-field shipping and billing form breaks the speed advantage of agentic commerce.  
The solution lies in emerging delegated payment standards:
- **Agentic Commerce Protocol (ACP):** OpenAI & Stripe's specification for delegated session tokens.
- **Agent Payments Protocol (AP2):** Google's mandate protocol with cryptographically signed buyer authorizations.
- **WebAuthn / Passkeys FIDO2 / OS Wallets:** The agent prepares and locks the basket URL (`/checkout?sku=...`), and the user confirms the transaction in a single sovereign biometric gesture (Touch ID / Face ID).

> **« The agent prepares the basket, the human validates the signature. »**

---

## 🛠️ Real-World Engineering Frictions (Field Log)

During empirical stress testing across real agent sandboxes and Edge CDN deployments, six critical frictions were discovered and hardened:

1. **The 700 KB Inline Webview Parse Ceiling:** Inlining uncompressed base64 PNGs (704 KB) causes chat webview parsers to silently drop the iframe embed. Resolved by aggressive build-time asset optimization (converting to 82% quality PBR JPEGs, dropping total weight to **112 KB**).
2. **The Live Iframe Security Wall & MCP Apps Sandbox:** Why can't an agent simply inject `<iframe src="https://store.com/widget">` into a chat bubble? Because public chats (ChatGPT, Claude.ai) enforce strict CSPs (`frame-src 'self'`) to prevent phishing and session hijacking. MCP Apps (SEP-1865) standardizes downloading the declared bundle into an isolated client-side sandbox (opaque origin, zero cookies, zero network access) communicating via JSON-RPC 2.0. In addition, agents in IDEs have a "developer reflex" (modifying local files rather than consuming the feed as external clients).
3. **The Sandboxed `origin: null` CORS Trap:** Sandboxed chat iframes enforce `origin: "null"`. Standard `fetch()` calls fail with CORS preflight errors. Resolved via universal open CORS headers (`Access-Control-Allow-Origin: *`) in `vercel.json`.
4. **The 3D WebGL Crash & CSP `connect-src 'none'`:** Chat webviews frequently disable hardware acceleration and block multi-megabyte GLTF network streaming. Resolved by **Tier 2 Snapshot Baking** (pre-rendered Three.js PBR angles inlined as data-URIs, 0 ms mount time, 0 MB VRAM).
5. **VRAM GPU Leaks in Multi-Turn Chats:** Active 3D WebGL scenes across 20+ turns accumulate memory and trigger OS tab discards. Resolved by **Receipt State Transition** (disposing of Three.js textures/geometry and freezing into a static 2D order confirmation receipt).
6. **The 15,000 SKU Catalog Bloat Trap:** Serializing full database dumps into the JSON feed wastes context tokens and degrades LLM reasoning. Resolved by exposing high-level **Action Contracts** (`order_kuro_shoe`, `search_catalog`) with parametric Just-in-Time hydration.

---

## 📜 Emerging Industry Standards Reference

This PoC directly maps to and validates three emerging standard tracks:
* **W3C WebML CG WebMCP:** (`webmachinelearning/webmcp`) Incubating `navigator.modelContext` as a W3C Community Group Draft Report, supported by Google and Microsoft for in-DOM tool exposition.
* **MCP Apps (SEP-1865):** Model Context Protocol extension for interactive UI micro-apps (`ui://` resources and `text/html;profile=mcp-app` inside sandboxed iframes).
* **Agentic Payment Protocols:** OpenAI & Stripe's **Agentic Commerce Protocol (ACP)** and Google's **Agent Payments Protocol (AP2)** for cryptographic purchase authorization without leaking credentials to the LLM.

---

## 🎨 Design System & Visual Principles

Strictly adheres to the [ai-design-skills](https://github.com/elayadesign/ai-design-skills) specification:
- **Typography:** Geist and Geist Mono only. No generic web fonts, no italics, no ultra-bold (900), optical balancing with `text-wrap: balance` and `text-wrap: pretty`.
- **Surfaces:** Flat dark theme (`#09090b`, `#121214`, `#18181b`, `#222225`). Zero garish background gradients.
- **Spacing & Radius:** Token-based layout (`space-0` to `space-900`) and nested radius formula (`inner = outer - gap`).
- **Weighted Motion:** `cubic-bezier(0.22, 1, 0.36, 1)` transitions, animated only on `transform` and `opacity`, respecting `prefers-reduced-motion`.
- **Engineering:** Zero heavy framework bloat, Vanilla TypeScript, clean modular separation, zero spaghetti.

---

## 🚀 Local Development

```bash
# Clone the repository
git clone https://github.com/QuentinMerle/kuro-agentic-web.git
cd kuro-agentic-web

# Install lightweight dependencies
npm install

# Start the Vite development server (with open CORS headers)
npm run dev

# Build for production (TypeScript + Vite)
npm run build
```

---

## ✍️ Author & Research

* **Author:** Quentin Merle — Front-End Architect & AI Engineer at [Vibrisse Studio](https://www.vibrisse-studio.dev/)
* **Repository:** [https://github.com/QuentinMerle/kuro-agentic-web](https://github.com/QuentinMerle/kuro-agentic-web)
* **Specification:** W3C WICG WebMCP & MCP Apps (`@modelcontextprotocol/ext-apps`)
* **Next Research Frontier:** Identity Continuity & Biometric Handoff — Bridging the gap between declarative AI basket preparation and frictionless Touch ID / Apple Pay authorization.
