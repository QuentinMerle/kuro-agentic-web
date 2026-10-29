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
   Designed for external agents (IDE, CLI, Desktop). Enables cold discovery of actions and sandboxed 3D micro-interfaces via a lightweight 2.1 KB HTTP GET request, eliminating the need to launch a 500 MB headless Chromium instance.

---

## 🧪 Live Protocol Test Bench

Copy and paste these prompts into **Antigravity**, **Claude Desktop**, **Cursor**, or **Windsurf**:

### Tier 1: Text Schema Elicitation (Zero-UI · 14 ms)
```text
Hey! Inspect https://kuro-agentic-web.vercel.app/agent-feed.json and order the Kuro Runner V1 using schema text elicitation (no UI).
```
* **Protocol behavior:** The agent reads `/agent-feed.json` via a single HTTP GET (0 MB browser RAM), extracts tool JSON Schemas, and prompts in plain text for size (7-11 US) and colorway enums.

### Tier 2: Resilient Micro-UI Widget (Snapshot Baking · 0 ms WebGL)
```text
Hey! I want to configure and buy the Kuro Runner V1 from https://kuro-agentic-web.vercel.app/ — mount the interactive configurator widget in this chat!
```
* **Protocol behavior:** Mounts the autonomous `<kuro-configurator>` into the chat bubble. Uses pre-baked Three.js PBR 3D captures (0 WebGL context, 0 MB VRAM) with 1-click checkout handoff.

---

## 📊 Telemetry & Benchmark

| Metric | 1. Headless Scraping | 2. In-DOM WebMCP | 3. Feed + Micro-UI (Tier 2) |
| :--- | :--- | :--- | :--- |
| **Cold Discovery** | 8,400 ms | < 1 ms (Active Tab) | **14 ms (HTTP GET)** |
| **Memory Footprint** | ~480 MB RAM | 0 MB extra | **0 MB extra** |
| **Payload Size** | ~4,200 tokens (HTML dump) | 0 tokens (Native JS heap) | **2.1 KB gzip** |
| **Deploy Resiliency** | 0% (DOM breaks) | 100% (Typed JSON Schema) | **100% (Strict Action Contract)** |
| **Visual Rendering** | Static PNG screenshot | Full tab DOM | **Baked 3D PBR (CSP-Safe)** |
| **Payment Security** | Risky (LLM sees tokens) | Native browser session | **Delegated 1-Click Handoff** |

---

## ⚠️ Real-World Frictions & Architectural Hardening (Field Log)

During empirical stress testing across real agent sandboxes and Edge CDN deployments, six critical frictions were discovered and hardened:

1. **The 700 KB Inline Webview Parse Ceiling:** Inlining uncompressed base64 PNGs (704 KB) causes chat webview parsers to silently drop the iframe embed. Resolved by aggressive build-time asset optimization (converting to 82% quality PBR JPEGs, dropping total weight to **112 KB**).
2. **The Host Container Gap & Developer Reflex:** General-purpose LLM chats sanitize raw iframes unless the host client implements the **MCP Apps specification** (`@modelcontextprotocol/ext-apps`). Furthermore, agents running in developer environments tend to edit local source code instead of acting as external read-only consumers.
3. **The Sandboxed `origin: null` CORS Trap:** Sandboxed chat iframes enforce `origin: "null"`. Standard `fetch()` calls fail with CORS preflight errors. Resolved via universal open CORS headers (`Access-Control-Allow-Origin: *`) in `vercel.json`.
4. **The 3D WebGL Crash & CSP `connect-src 'none'`:** Chat webviews frequently disable hardware acceleration and block multi-megabyte GLTF network streaming. Resolved by **Tier 2 Snapshot Baking** (pre-rendered Three.js PBR angles inlined as data-URIs, 0 ms mount time, 0 MB VRAM).
5. **VRAM GPU Leaks in Multi-Turn Chats:** Active 3D WebGL scenes across 20+ turns accumulate memory and trigger OS tab discards. Resolved by **Receipt State Transition** (disposing of Three.js textures/geometry and freezing into a static 2D order confirmation receipt).
6. **The 15,000 SKU Catalog Bloat Trap:** Serializing full database dumps into the JSON feed wastes context tokens and degrades LLM reasoning. Resolved by exposing high-level **Action Contracts** (`order_kuro_shoe`, `search_catalog`) with parametric Just-in-Time hydration.

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
