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

---

## 🎯 The Two Architectural Pillars

This laboratory demonstrates how to move beyond brittle Computer Use visual scraping and text-only prompts to seamlessly connect AI agents with e-commerce stores and web applications.

1. **In-DOM WebMCP (`navigator.modelContext`)**  
   Designed for browser-native agents (extensions, Chrome Built-in AI, Side Panels). The front-end registers its business functions directly into the DOM registry with strict JSON Schemas. Executes in < 1 ms with existing session cookies, CSRF tokens, and reactive stores.
2. **The « RSS of AI » (`/agent-feed.json`)**  
   Designed for external agents (IDE, CLI, Desktop). Enables cold discovery of actions and sandboxed 3D micro-interfaces via a lightweight 1.75 KB HTTP GET request (~440 tokens), eliminating the need to launch a 1.2 GB headless Chromium instance.

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

## ⚠️ Real-World Frictions & Architectural Hardening (Field Log)

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
