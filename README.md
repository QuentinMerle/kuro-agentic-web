# 👟 Kuro Agentic Web

> **Agentic Web Interface Demonstrator: From DOM Scraping to the « RSS of AI »**  
> Companion prototype for the technical essay *"From Scraping to the RSS of AI: Anatomy of an Agentic Interface"*.

This laboratory demonstrates how to move beyond brittle Computer Use visual scraping and text-only prompts to seamlessly connect AI agents with e-commerce stores and web applications.

---

## 🎯 The Two Architectural Pillars

1. **In-DOM WebMCP (`navigator.modelContext`)**  
   Designed for browser-native agents (extensions, Chrome Built-in AI, Side Panels). The front-end registers its business functions directly into the DOM registry with strict JSON Schemas. Executes in 0 ms with existing session cookies, CSRF tokens, and reactive stores.
2. **The « RSS of AI » (`/agent-feed.json`)**  
   Designed for external agents (IDE, CLI, Desktop). Enables cold discovery of actions and sandboxed 3D micro-interfaces via a lightweight 2 KB HTTP request, eliminating the need to launch a 500 MB headless Chromium instance.

---

## 🎨 Design System & Visual Principles

Strictly adheres to the [ai-design-skills](https://github.com/elayadesign/ai-design-skills) specification:
- **Typography:** Geist and Geist Mono only. No generic web fonts, no italics, no ultra-bold (900), optical balancing with `text-wrap: balance` and `text-wrap: pretty`.
- **Surfaces:** Flat dark theme (`#000000`, `#121212`, `#181818`, `#1F1F1F`). Zero background gradients. Subtle text gradient strictly reserved for the hero headline (`#FFFFFF` → `#9B9B9B`).
- **Spacing & Radius:** Token-based layout (`space-0` to `space-900`) and nested radius formula (`inner = outer - gap`).
- **Weighted Motion:** `cubic-bezier(0.22, 1, 0.36, 1)` transitions, animated only on `transform` and `opacity`, respecting `prefers-reduced-motion`.
- **Engineering:** Zero heavy framework bloat, Vanilla TypeScript, clean modular separation, zero spaghetti.

---

## 🚀 Quick Start

```bash
# Install lightweight dependencies
npm install

# Start the Vite development server
npm run dev
```

Then navigate to [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🧪 What You Can Test Live

- **Interactive 3D Configurator:** Rotate the PBR sneaker 360° with realistic lighting, soft contact shadows, and real-time colorway switching.
- **Agent Inspector:** Click the `/agent-feed.json` pill in the floating nav bar to compare cold discovery (static manifest) vs in-DOM discovery (`navigator.modelContext`).
- **Simulate Agent Invocations:** Trigger programmatic calls to `order_kuro_shoe` from the inspector or the action panel to observe real-time cart and inventory synchronization.
- **Delegated Payment Handoff:** Open the active cart to inspect the generated Stripe / Shopify checkout deep link with locked SKU, eliminating PCI-DSS token handling by LLMs.
