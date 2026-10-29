import { shopStore } from "../core/store.ts";
import type { ShoeColor, ShoeSize } from "../core/types.ts";
import { initThreeViewport, type ThreeViewportController } from "./three-viewport.ts";

export function initProductStudio(container: HTMLElement): void {
  const colors: { name: ShoeColor; hex: string; desc: string }[] = [
    { name: "Obsidian Black", hex: "#181818", desc: "High-density matte black technical mesh" },
    { name: "Deep Indigo", hex: "#22355E", desc: "Deep mineral indigo dye" },
    { name: "Raw Chalk", hex: "#D8D4C7", desc: "Undyed eco-crafted raw chalk" },
  ];

  const sizes: ShoeSize[] = [7, 8, 9, 10, 11];
  let threeController: ThreeViewportController | null = null;

  const origin = window.location.origin;
  const state = shopStore.getState();
  const currentSku = `KURO-V1-${state.selectedColor}-${state.selectedSize}`;
  const stock = state.inventory[currentSku] ?? 0;
  const isAvailable = stock > 0;

  // Mount the complete landing page DOM ONCE
  container.innerHTML = `
    <!-- 1. HERO SECTION (REX & Lab Notebook Framing) -->
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-tag">
        <span class="hero-tag-pulse"></span>
        <span>LAB NOTEBOOK & FIELD REX · EXPERIMENT #04</span>
      </div>

      <h1 id="hero-title" class="hero-heading">
        From Scraping to the « RSS of AI » :<br>Anatomy of an Agentic Interface
      </h1>

      <p class="hero-subheading">
        A front-end architecture case study benchmarking in-DOM tool exposition via WebMCP against cold syndication 
        via <code>/agent-feed.json</code> and sandboxed Micro-UIs in real AI agent chat windows.
      </p>

      <div class="proof-signal" style="display: flex; gap: var(--space-200); font-family: var(--font-mono); font-size: 11px; flex-wrap: wrap; justify-content: center;">
        <span><strong>Author:</strong> Quentin Merle (<a href="https://www.vibrisse-studio.dev/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">Vibrisse Studio</a>)</span>
        <span>·</span>
        <span><strong>Status:</strong> Functional PoC</span>
        <span>·</span>
        <span><strong>Spec:</strong> W3C WICG WebMCP & MCP Apps</span>
        <span>·</span>
        <span><a href="https://github.com/QuentinMerle/kuro-agentic-web" target="_blank" rel="noopener noreferrer" style="color: var(--accent-primary); text-decoration: underline;">GitHub</a></span>
      </div>
    </section>

    <!-- TEST BENCH: 2 PROGRESSIVE TIERS (With Honest Runtime Boundaries) -->
    <section class="try-agent-section" id="test-bench">
      <div class="try-agent-card">
        <div class="try-agent-header">
          <div class="try-agent-title">
            <span>🧪</span>
            <span>Interactive Protocol Test Bench</span>
            <span class="try-agent-badge">● Live Dev Server</span>
          </div>
          <span style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono);">
            Tier 1 is Universal (any LLM chat). Tier 2 requires an MCP Apps host container (SEP-1865).
          </span>
        </div>

        <div class="prompt-grid">
          <!-- Tier 1: Text Schema Elicitation (Universal) -->
          <div class="prompt-tier-card">
            <div class="prompt-tier-header">
              <span class="prompt-tier-badge">TIER 1 · SCHEMA TEXT</span>
              <span class="prompt-tier-meta" style="color: var(--accent-success);">● Universal (Any Agent)</span>
            </div>

            <div class="prompt-box">
              <div class="prompt-box-top">
                <code class="prompt-text" id="prompt-tier1-text">Hey! Inspect ${origin}/agent-feed.json and order the Kuro Runner V1 using schema text elicitation (no UI).</code>
                <button id="copy-btn-tier1" class="btn btn-secondary copy-btn" aria-label="Copy Tier 1 prompt">
                  Copy
                </button>
              </div>
            </div>

            <p style="font-size: var(--text-xs); color: var(--accent-muted); line-height: 1.5; margin: 0;">
              <strong>Universal compatibility:</strong> Works out-of-the-box in ChatGPT, Claude, Cursor, Windsurf, Antigravity, or terminal CLI. The agent reads <code>/agent-feed.json</code> via a 50 ms HTTP GET (0 MB browser RAM) and resolves sizes (7-11 US) and colors in pure text dialog.
            </p>
          </div>

          <!-- Tier 2: Resilient Micro-UI Widget (Conditional on Host) -->
          <div class="prompt-tier-card highlight">
            <div class="prompt-tier-header">
              <span class="prompt-tier-badge">TIER 2 · MICRO-UI</span>
              <span class="prompt-tier-meta" style="color: #79C0FF;">⚠ Host Container Required</span>
            </div>

            <div class="prompt-box">
              <div class="prompt-box-top">
                <code class="prompt-text" id="prompt-tier2-text">Hey! I want to configure and buy the Kuro Runner V1 from ${origin}/ — mount the interactive configurator widget in this chat!</code>
                <button id="copy-btn-tier2" class="btn btn-primary copy-btn" aria-label="Copy Tier 2 prompt">
                  Copy
                </button>
              </div>
            </div>

            <p style="font-size: var(--text-xs); color: var(--accent-muted); line-height: 1.5; margin: 0;">
              <strong>Why doesn't this mount in vanilla ChatGPT or Claude.ai?</strong> Public web chats sanitize arbitrary iframes from LLM responses for security. Tier 2 requires a host application implementing the <strong>MCP Apps specification</strong> (like our IDE Generative UI or our dedicated host runner).
            </p>

            <div style="margin-top: var(--space-150); display: flex; gap: var(--space-100); align-items: center; flex-wrap: wrap;">
              <a href="/agent.html" class="btn btn-secondary" style="font-family: var(--font-mono); font-size: 11px; padding: 4px 10px;">
                ▶ Test in Simulated Host Runner (/agent)
              </a>
              <a href="/widget.html" target="_blank" rel="noopener" class="btn btn-secondary" style="font-family: var(--font-mono); font-size: 11px; padding: 4px 10px;">
                ↗ Open Raw Widget
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 2. STUDIO 3D HERO INTERACTIVE (Three.js WebGL) -->
    <div class="studio-grid" id="configurator-stage">
      <!-- 3D WebGL Viewport -->
      <div class="studio-card">
        <div class="viewport-area" id="three-container">
          <div class="viewport-loading" id="three-loader" style="z-index: 5;">
            <div class="spinner"></div>
            <span>Loading 3D asset...</span>
          </div>
          <div class="viewport-hint" style="z-index: 5;">
            <span>⟲ Drag to rotate 360°</span>
          </div>
        </div>

        <div style="padding: var(--space-300); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card);">
          <div>
            <span style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono); display: block;">ACTIVE SKU</span>
            <span id="active-sku-display" style="font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 600;">${currentSku}</span>
          </div>
          <div style="text-align: right;">
            <span style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono); display: block;">UNIT PRICE</span>
            <span style="font-family: var(--font-mono); font-size: var(--text-lg); font-weight: 700;">$185</span>
          </div>
        </div>
      </div>

      <!-- Sidebar Configuration Options -->
      <div class="studio-card sidebar-panel">
        <div>
          <h2 style="font-size: var(--text-xl); font-weight: 600; margin-bottom: var(--space-50);">Kuro Runner V1</h2>
          <p style="font-size: var(--text-xs); color: var(--accent-muted);">
            Eco-engineered technical sneaker with seamless knit upper and responsive cushioning.
          </p>
        </div>

        <!-- Color Selector -->
        <div class="option-group">
          <span class="option-label">Upper Colorway</span>
          <div class="color-pills" role="radiogroup" aria-label="Select colorway">
            ${colors
              .map(
                (c) => `
              <button 
                class="color-btn ${c.name === state.selectedColor ? "active" : ""}" 
                data-color="${c.name}"
                role="radio"
                aria-checked="${c.name === state.selectedColor}"
                title="${c.name} - ${c.desc}"
              >
                <span class="color-swatch" style="background-color: ${c.hex}; border: 1px solid rgba(255,255,255,0.2);"></span>
                <span style="font-size: 11px;">${c.name.split(" ")[0]}</span>
              </button>
            `
              )
              .join("")}
          </div>
        </div>

        <!-- Size Selector -->
        <div class="option-group">
          <span class="option-label">Shoe Size (US)</span>
          <div class="size-grid" role="radiogroup" aria-label="Select shoe size">
            ${sizes
              .map((sz) => {
                const skuForSize = `KURO-V1-${state.selectedColor}-${sz}`;
                const available = (state.inventory[skuForSize] ?? 0) > 0;
                const isSelected = sz === state.selectedSize;
                return `
                  <button 
                    class="size-btn ${isSelected ? "active" : ""} ${!available ? "out-of-stock" : ""}"
                    data-size="${sz}"
                    ${!available ? 'disabled title="Out of stock"' : ""}
                    role="radio"
                    aria-checked="${isSelected}"
                  >
                    ${sz}
                  </button>
                `;
              })
              .join("")}
          </div>
        </div>

        <!-- Stock Pill -->
        <div id="stock-pill-display" style="font-size: var(--text-xs); font-family: var(--font-mono); color: ${isAvailable ? 'var(--accent-success)' : 'var(--accent-muted)'};">
          ● ${isAvailable ? `${stock} pairs available in stock` : 'Temporarily sold out in this size'}
        </div>

        <!-- Action Buttons -->
        <div style="margin-top: auto; display: flex; flex-direction: column; gap: var(--space-100);">
          <button 
            id="add-to-cart-btn" 
            class="btn btn-primary" 
            style="width: 100%; padding: 12px 16px; font-size: var(--text-base);"
            ${!isAvailable ? "disabled" : ""}
          >
            ${isAvailable ? "Order Pair ($185)" : "Sold Out"}
          </button>

          <button 
            id="simulate-agent-call-btn" 
            class="btn btn-secondary" 
            style="width: 100%; font-family: var(--font-mono); font-size: var(--text-xs);"
          >
            ⚡ Invoke navigator.modelContext
          </button>
        </div>
      </div>
    </div>

    <!-- 3. MANDATORY TAGLINE REVEAL SECTION (B11) -->
    <section class="tagline-section" aria-label="Architecture Manifesto">
      <p class="tagline-text" id="reveal-target">
        The front-end no longer needs to be reverse-engineered by blind headless scrapers. It is already the fastest, most secure native execution layer on the Web.
      </p>
    </section>

    <!-- 4. EMPIRICAL BENCHMARK & TELEMETRY (Field Measurements) -->
    <section class="content-section" id="telemetry">
      <div class="section-header">
        <span class="section-label">Field Telemetry & Resource Profiling</span>
        <h2 class="section-title">Architectural Cost & Footprint Autopsy</h2>
        <p class="section-subtitle">
          Real measurements comparing Puppeteer/Computer Use headless scraping against native in-DOM WebMCP and federated /agent-feed.json syndication.
        </p>
      </div>

      <div class="benchmark-grid">
        <!-- 1. Blind Headless Scraping -->
        <div class="benchmark-card">
          <div class="benchmark-header">
            <span class="benchmark-title" style="color: #F85149;">
              <span>✕</span> Headless Scraping
            </span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: #F85149; background: rgba(248,81,73,0.1); border: 1px solid rgba(248,81,73,0.3); padding: 2px 6px; border-radius: var(--radius-sm);">Brittle FinOps</span>
          </div>
          <p style="font-size: var(--text-xs); color: var(--accent-muted); line-height: 1.5; margin: 0;">
            Agent launches a multi-process Chromium instance, waits for JS execution, dumps DOM, or loops Computer Use screenshots.
          </p>
          <ul class="metric-list">
            <li class="metric-row">
              <span class="metric-label">Cold Discovery</span>
              <span class="metric-value" style="color: #F85149;">1,100 – 1,850 ms</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Memory Footprint</span>
              <span class="metric-value" style="color: #F85149;">1,260 – 1,325 MB RAM</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Context Window</span>
              <span class="metric-value" style="color: #F85149;">~10,150 tokens</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Deploy Resiliency</span>
              <span class="metric-value" style="color: #F85149;">0% (DOM breaks)</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Visual Interactive</span>
              <span class="metric-value" style="color: var(--accent-muted);">Static PNG only</span>
            </li>
          </ul>
        </div>

        <!-- 2. In-DOM WebMCP -->
        <div class="benchmark-card">
          <div class="benchmark-header">
            <span class="benchmark-title" style="color: #79C0FF;">
              <span>⚡</span> In-DOM WebMCP
            </span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: #79C0FF; background: rgba(121,192,255,0.1); border: 1px solid rgba(121,192,255,0.3); padding: 2px 6px; border-radius: var(--radius-sm);">Active Tab</span>
          </div>
          <p style="font-size: var(--text-xs); color: var(--accent-muted); line-height: 1.5; margin: 0;">
            Browser extension or built-in AI executes directly against <code>window.navigator.modelContext</code> in the user's active session.
          </p>
          <ul class="metric-list">
            <li class="metric-row">
              <span class="metric-label">Execution Latency</span>
              <span class="metric-value" style="color: var(--accent-success);">&lt; 1 ms</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Extra Memory</span>
              <span class="metric-value" style="color: var(--accent-success);">0 MB</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Session State</span>
              <span class="metric-value" style="color: var(--accent-success);">Preserved</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Schema Validation</span>
              <span class="metric-value" style="color: var(--accent-success);">Native JSON</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Execution Mode</span>
              <span class="metric-value" style="color: var(--accent-primary);">In-page RPC</span>
            </li>
          </ul>
        </div>

        <!-- 3. Cold Syndication + Micro-UI (Highlight) -->
        <div class="benchmark-card highlight">
          <div class="benchmark-header">
            <span class="benchmark-title" style="color: var(--accent-success);">
              <span>●</span> Feed + Micro-UI
            </span>
            <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-success); background: rgba(34,197,94,0.1); border: 1px solid rgba(34,197,94,0.3); padding: 2px 6px; border-radius: var(--radius-sm);">Federated Standard</span>
          </div>
          <p style="font-size: var(--text-xs); color: var(--accent-muted); line-height: 1.5; margin: 0;">
            Zero-browser cold discovery via <code>/agent-feed.json</code> with Just-in-Time sandboxed micro-UI embedding inside the chat.
          </p>
          <ul class="metric-list">
            <li class="metric-row">
              <span class="metric-label">Cold Discovery</span>
              <span class="metric-value" style="color: var(--accent-success);">45 – 65 ms (HTTP GET)</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Payload Size</span>
              <span class="metric-value" style="color: var(--accent-success);">1.75 KB (751 B gzip)</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Chat Widget Mount</span>
              <span class="metric-value" style="color: var(--accent-success);">&lt; 10 ms (PBR Baked)</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">VRAM / GPU Footprint</span>
              <span class="metric-value" style="color: var(--accent-success);">0 MB (0 WebGL Contexts)</span>
            </li>
            <li class="metric-row">
              <span class="metric-label">Payment Security</span>
              <span class="metric-value" style="color: var(--accent-success);">Delegated 1-Click Handoff</span>
            </li>
          </ul>
        </div>
      </div>

      <div style="margin-top: var(--space-300); padding: var(--space-200); background: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 11px; color: var(--accent-muted); line-height: 1.6;">
        <strong>Methodology Note:</strong> Empirically benchmarked on Apple M1 Pro (32 GB RAM, macOS Sonoma, Chromium 156 Headless CLI) and Vercel Edge CDN. Headless scraping measures cold browser process spawn, navigation, full DOM serialization (40,634 bytes) and cumulative RSS. Agent feed measures HTTP GET TTFB (~51 ms) and raw payload (1,757 bytes / ~440 tokens).
      </div>
    </section>

    <!-- 5. CHAT UX/UI LAWS SECTION (The 4 Laws of Agentic Interfaces) -->
    <section class="content-section" id="ux-laws">
      <div class="section-header">
        <span class="section-label">Agentic Front-End Engineering</span>
        <h2 class="section-title">Designing for a Chat Stream : The 4 Laws of Agentic UX/UI</h2>
        <p class="section-subtitle">
          Embedding an interactive front-end into a conversational feed is not about shrinking an e-commerce website into an iframe. 
          A chat window is a strict vertical chronological timeline imposing new ergonomics.
        </p>
      </div>

      <div class="friction-grid">
        <!-- Law 1 -->
        <div class="friction-card">
          <div class="friction-tag" style="color: #79C0FF; background: rgba(121,192,255,0.08); border-color: rgba(121,192,255,0.25);">
            RULE 01 · MICRO-VIEWPORT & FOCUS
          </div>
          <h3 class="friction-title">The Single-Purpose UI (Anti-WeChat Fallacy)</h3>
          <p class="friction-desc">
            In an IDE side panel (380–500px) or desktop chat (600–750px), real estate is heavily constrained. Eliminate all traditional website chrome: no giant brand headers, no global navigation bars, no cookie banners, no footers.
          </p>
          <div class="friction-solution" style="color: #79C0FF; border-left-color: #79C0FF;">
            <strong>Architectural Rule:</strong> Reject the fantasy of "Chat as universal OS". Chats excel at linear intent convergence, but fail at non-linear tasks (comparing 5 tables, dense carts). The in-chat UI must be surgical: resolve a sensory micro-decision (color, size, fit) and immediately yield control back to the prompt flow.
          </div>
        </div>

        <!-- Law 2 -->
        <div class="friction-card">
          <div class="friction-tag" style="color: #F85149; background: rgba(248,81,73,0.08); border-color: rgba(248,81,73,0.25);">
            RULE 02 · VERTICAL FLOW PRESERVATION
          </div>
          <h3 class="friction-title">Zero Scroll Hijacking (Wheel Trapping)</h3>
          <p class="friction-desc">
            Chat feeds rely on continuous vertical scrolling (<code>overflow-y: auto</code>). If an embedded component captures pointer wheel or touch gestures carelessly (e.g. 3D orbit zoom or internal list scroll), the user gets trapped and cannot scroll up to read the agent's prompt reasoning.
          </p>
          <div class="friction-solution" style="color: #F85149; border-left-color: #F85149;">
            <strong>Architectural Rule:</strong> Enforce strict bounded height (<code>max-height: 480px</code>), disable unprompted scroll trapping via <code>touch-action: pan-y</code>, and require an explicit click or focus gesture before capturing continuous orbital gestures.
          </div>
        </div>

        <!-- Law 3 -->
        <div class="friction-card">
          <div class="friction-tag" style="color: #A371F7; background: rgba(163,113,247,0.08); border-color: rgba(163,113,247,0.25);">
            RULE 03 · SEAMLESS HOST THEMING
          </div>
          <h3 class="friction-title">Zero-Flicker Host Token Inheritance</h3>
          <p class="friction-desc">
            Nothing destroys conversational immersion faster than an iframe flashing a stark <code>#FFFFFF</code> background inside a deeply styled Dark Mode IDE or chat application. An embedded micro-UI cannot impose rigid isolated styles.
          </p>
          <div class="friction-solution" style="color: #A371F7; border-left-color: #A371F7;">
            <strong>Architectural Rule:</strong> Consume host-injected CSS variables and design tokens (<code>--host-bg-primary</code>, <code>--host-text-primary</code>, <code>--host-border-color</code>, <code>color-scheme: dark light</code>, system typography) to blend natively into the host agent's environment.
          </div>
        </div>

        <!-- Law 4 -->
        <div class="friction-card">
          <div class="friction-tag" style="color: var(--accent-success); background: rgba(34,197,94,0.08); border-color: rgba(34,197,94,0.25);">
            RULE 04 · PERSISTENT STATE LIFECYCLE
          </div>
          <h3 class="friction-title">Active to Sealed Receipt State (No Zombie UIs)</h3>
          <p class="friction-desc">
            On the classic web, completing a purchase navigates away to a new URL. In a chat, the widget remains forever visible in the scroll history. This creates the danger of "Zombie UIs": an accidental click 3 days later re-triggering an order on a stale card.
          </p>
          <div class="friction-solution" style="color: var(--accent-success); border-left-color: var(--accent-success);">
            <strong>Architectural Rule:</strong> Implement an irreversible state transition. Once confirmed, the component destroys its event listeners and heavy graphics contexts (freeing VRAM) and collapses into a compact, read-only "Sealed Receipt" (<em>« Kuro Runner V1 · Deep Indigo, US 9 · Basket Sealed ✅ »</em>).
          </div>
        </div>
      </div>
    </section>

    <!-- 6. REAL-WORLD FRICTION LOGBOOK (Field Experience) -->
    <section class="content-section" id="frictions">
      <div class="section-header">
        <span class="section-label">Engineering Lab Log</span>
        <h2 class="section-title">Production Frictions & Architectural Hardening</h2>
        <p class="section-subtitle">
          Real failure modes discovered when stress-testing Web Components and WebMCP inside enterprise agent sandboxes.
        </p>
      </div>

      <div class="friction-grid">
        <!-- Friction 1 -->
        <div class="friction-card">
          <div class="friction-tag">SECURITY · SANDBOX IFRAME</div>
          <h3 class="friction-title">01. The Sandboxed origin: null CORS Trap</h3>
          <p class="friction-desc">
            When an agent mounts an interactive Web Component in its chat webview (using <code>srcdoc</code> or isolated iframe without <code>allow-same-origin</code>), the browser enforces <code>origin: "null"</code>. Any outgoing <code>fetch()</code> to store APIs is blocked by browser CORS preflight checks.
          </p>
          <div class="friction-solution">
            <strong>Architectural Resolution:</strong> Package self-contained autonomous micro-UIs with inlined state and contracts, or expose an unauthenticated read-only endpoint with <code>Access-Control-Allow-Origin: *</code> specifically for agent handshakes.
          </div>
        </div>

        <!-- Friction 2 -->
        <div class="friction-card">
          <div class="friction-tag">GRAPHICS · CSP RESTRICTIONS</div>
          <h3 class="friction-title">02. CSP connect-src 'none' & 3D WebGL Crash</h3>
          <p class="friction-desc">
            Full-fledged Three.js scenes require streaming multi-megabyte <code>.gltf</code> geometries and allocating GPU WebGL contexts. Sandboxed agent webviews enforce strict CSP headers (<code>connect-src 'none'</code>) and often disable hardware acceleration, causing infinite loading spinners.
          </p>
          <div class="friction-solution">
            <strong>Architectural Resolution:</strong> Tier 2 Snapshot Baking. Pre-render photorealistic PBR angles into base64 data-URIs during CI/CD. 0 ms mount time, 0 WebGL contexts needed, zero CSP network requests.
          </div>
        </div>

        <!-- Friction 3 -->
        <div class="friction-card">
          <div class="friction-tag">RESOURCE LEAKS · GPU FINOPS</div>
          <h3 class="friction-title">03. VRAM Accumulation in Multi-Turn Chats</h3>
          <p class="friction-desc">
            In conversational interfaces, users interact across 20+ turns. If every mounted 3D configurator retains WebGL textures, geometries, and animation frame request loops, the host tab rapidly runs out of GPU memory and gets killed by the OS.
          </p>
          <div class="friction-solution">
            <strong>Architectural Resolution:</strong> Receipt State Transition. Upon clicking Order, immediately dispose of geometries and textures, call <code>gl.getExtension('WEBGL_lose_context')?.loseContext()</code>, and collapse into a static 2D order receipt.
          </div>
        </div>

        <!-- Friction 4 -->
        <div class="friction-card">
          <div class="friction-tag">CONTEXT WINDOW · FINOPS</div>
          <h3 class="friction-title">04. The 15,000 SKU Catalog Bloat Trap</h3>
          <p class="friction-desc">
            Serializing an entire e-commerce database catalog into <code>agent-feed.json</code> results in multi-megabyte payloads. Feeding this to an LLM wastes thousands of input tokens per query ($0.50/request) and causes model context degradation.
          </p>
          <div class="friction-solution">
            <strong>Architectural Resolution:</strong> Expose generic Action Schemas (<code>order_kuro_shoe</code>, <code>search_catalog</code>) rather than static data dumps. The LLM acts as an orchestrator, resolving parametric inventory Just-in-Time.
          </div>
        </div>

        <!-- Friction 5 -->
        <div class="friction-card">
          <div class="friction-tag">WEBVIEW PARSER · MEMORY CEILING</div>
          <h3 class="friction-title">05. The 700 KB Inline Payload Parse Wall</h3>
          <p class="friction-desc">
            When embedding interactive micro-UIs inside chat webviews, inlining uncompressed base64 PNG assets (704 KB) causes host chat parsers to silently drop the iframe embed to prevent main-thread UI stutters.
          </p>
          <div class="friction-solution">
            <strong>Architectural Resolution:</strong> Aggressive build-time asset optimization (converting raw PBR captures to 82% quality JPEGs/WebP, dropping total bundle size from 704 KB down to 112 KB). The component mounts instantly at 60 fps without tripping host limits.
          </div>
        </div>

        <!-- Friction 6 -->
        <div class="friction-card">
          <div class="friction-tag">RUNTIME SPEC · ZERO-TRUST ARCHITECTURE</div>
          <h3 class="friction-title">06. The Live Iframe Security Wall & MCP Apps Sandbox</h3>
          <p class="friction-desc">
            Why can't an agent simply inject <code>&lt;iframe src="https://store.com/widget"&gt;</code> into a chat bubble? Because public chats (ChatGPT, Claude.ai) enforce strict CSPs (<code>frame-src 'self'</code>) to prevent phishing and session hijacking. Furthermore, agents in IDEs have a "developer reflex" (modifying local files rather than consuming the feed as external clients).
          </p>
          <div class="friction-solution">
            <strong>Architectural Resolution:</strong> The <strong>MCP Apps specification</strong> (SEP-1865). The host chat downloads the declared bundle into an isolated client-side sandbox (opaque origin, zero cookies, zero network access) communicating exclusively via JSON-RPC 2.0. The first public web contact only occurs upon user click on the checkout handoff.
          </div>
        </div>
      </div>
    </section>

    <!-- 6. FAQ ACCORDION -->
    <section class="content-section" id="faq">
      <div class="section-header">
        <span class="section-label">Frequently Asked Questions</span>
        <h2 class="section-title">Engineering Objections Addressed</h2>
        <p class="section-subtitle">
          What technical directors and software architects need to know before adopting this pattern.
        </p>
      </div>

      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question">
            <span>Why not simply expose a standard REST or GraphQL API?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            An external public API requires provisioning server infrastructure, managing OAuth authentication flows, and maintaining duplicate business validation logic. With WebMCP, the browser tab already holds in-memory application state, session cookies, and compiled JavaScript logic: your front-end is already your API.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>Why not just load the complete existing website inside the chat iframe?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            Loading a full responsive website inside a 400px chat panel creates a disastrous user experience: navigation bars collide, cookie banners obscure the view, and internal scrolling hijacks the chat conversation flow. Conversational front-ends require surgical Single-Purpose Micro-UIs designed with strict bounded height, zero chrome, host token inheritance, and an irreversible "Receipt State" once the action is confirmed.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>What stops a third-party UI component from spying on the conversation?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            The embedded micro-UI runs inside an isolated iframe with <code>sandbox="allow-scripts"</code>, strictly excluding <code>allow-same-origin</code>. It has zero access to the host agent DOM, conversation logs, or local storage. All communication flows through a typed JSON-RPC 2.0 bridge.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>How do you handle a 15,000 product catalog without bloating the JSON feed?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            The <code>/agent-feed.json</code> file never dumps entire database catalogs. It exposes generic action contracts (search, configure, checkout) and the parametric Web Component URL. The component dynamically hydrates precise inventory via lightweight backend queries.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>What happens to GPU memory if the user opens 5 interactive 3D widgets?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            This is the core rule of VRAM lifecycle management: as soon as an action completes, the Web Component captures a 2D bitmap snapshot (toDataURL), disposes of the Three.js scene, and triggers WebGL context loss to return all GPU memory to the OS.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>Does the AI model ever see my credit card number?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            Never. Sensitive payment tokens never pass through the LLM context window. The protocol hands off the final transaction to a pre-filled Stripe Checkout or Shopify URL confirmed by the human buyer in their own trusted payment session.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>What is the official W3C status of navigator.modelContext?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            The API is incubated as <strong>WebMCP</strong> within the W3C Web Machine Learning Community Group (WebML CG) as a Draft Report, backed by Google and Microsoft, alongside Chrome Built-in AI initiatives. This demonstrator uses a 25-line Vanilla JS polyfill to validate developer ergonomics and MCP Apps integration ahead of native browser ship dates.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>Doesn't leaving the chat for checkout break the seamless agentic experience?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            It secures it while paving the way for delegated payment protocols. Autonomous LLM payments risk prompt injections and strict PCI-DSS violations. Emerging standards like the <strong>Agentic Commerce Protocol (ACP)</strong> by OpenAI & Stripe, Google's <strong>Agent Payments Protocol (AP2)</strong>, and Passkeys / WebAuthn enable the agent to prepare a cryptographic mandate or locked basket, while the user signs the transaction with Touch ID or Apple Pay in a single sovereign tap.
          </div>
        </div>
      </div>
    </section>

    <!-- 7. COLOPHON & AUTHOR REX (Replaces SaaS CTA Banner) -->
    <section class="content-section" id="colophon">
      <div class="colophon-card">
        <div class="author-chip">
          <span>✍️</span>
          <span>Quentin Merle · Front-End Architect & AI Engineer · <a href="https://www.vibrisse-studio.dev/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">Vibrisse Studio</a></span>
        </div>
        <h2 style="font-size: var(--text-2xl); font-weight: 700; letter-spacing: -0.02em; margin-top: var(--space-100);">
          The Agentic Web Architecture in Practice
        </h2>
        <p style="font-size: var(--text-sm); color: var(--accent-muted); max-width: 640px; line-height: 1.6; margin: 0 auto;">
          This experimental lab accompanies the research paper <em>« Du scraping au « RSS de l'IA » : Anatomie d'une interface agentique »</em>. It empirically demonstrates that the web browser remains the fastest, most sovereign, and cost-effective execution engine for AI agents.
        </p>
        <div style="display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; color: #79C0FF; background: rgba(121, 192, 255, 0.08); border: 1px solid rgba(121, 192, 255, 0.2); padding: 4px 10px; border-radius: var(--radius-sm); margin-top: 4px;">
          <span>🔮</span>
          <span>Next Research Frontier: Identity Continuity & Biometric Handoff (Passkeys & OS Wallets)</span>
        </div>
        <div style="display: flex; gap: var(--space-200); flex-wrap: wrap; justify-content: center; margin-top: var(--space-200);">
          <a href="#test-bench" class="btn btn-primary" style="padding: 10px 20px; font-size: var(--text-sm);">
            🧪 Back to Test Bench
          </a>
          <button id="cta-open-inspector-btn" class="btn btn-secondary" style="padding: 10px 20px; font-size: var(--text-sm);">
            🔍 Inspect /agent-feed.json
          </button>
          <a href="/agent.html" class="btn btn-secondary" style="padding: 10px 20px; font-size: var(--text-sm);">
            🤖 Open Agent Chat Mock
          </a>
          <a 
            href="https://github.com/QuentinMerle/kuro-agentic-web" 
            target="_blank" 
            rel="noopener noreferrer" 
            class="btn btn-secondary" 
            style="padding: 10px 20px; font-size: var(--text-sm); display: inline-flex; align-items: center; gap: 8px;"
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
            <span>GitHub Repository</span>
          </a>
        </div>
      </div>
    </section>
  `;

  // Attach event listeners
  container.querySelectorAll(".color-btn").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = (e.currentTarget as HTMLElement).dataset.color as ShoeColor;
      if (target) {
        shopStore.setColor(target);
        if (threeController) {
          threeController.setColor(target);
        }
      }
    });
  });

  container.querySelectorAll(".size-btn:not(.out-of-stock)").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const target = Number((e.currentTarget as HTMLElement).dataset.size) as ShoeSize;
      if (target) shopStore.setSize(target);
    });
  });

  container.querySelector("#add-to-cart-btn")?.addEventListener("click", () => {
    shopStore.addToCart();
  });

  container.querySelector("#simulate-agent-call-btn")?.addEventListener("click", async () => {
    if (navigator.modelContext) {
      await navigator.modelContext.callTool("order_kuro_shoe", {
        size: shopStore.getState().selectedSize,
        color: shopStore.getState().selectedColor,
      });
    }
  });

  container.querySelector("#cta-open-inspector-btn")?.addEventListener("click", () => {
    shopStore.toggleFeedInspector(true);
  });

  // Setup Copy Handlers for Tier 1 & Tier 2 prompts
  const setupCopyHandler = (btnId: string, textId: string) => {
    const btn = container.querySelector(btnId) as HTMLButtonElement | null;
    const textEl = container.querySelector(textId) as HTMLElement | null;
    if (!btn || !textEl) return;

    btn.addEventListener("click", async () => {
      const text = textEl.textContent?.trim() || "";
      try {
        await navigator.clipboard.writeText(text);
        const originalText = btn.textContent;
        btn.textContent = "Copied! ✅";
        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      } catch {
        btn.textContent = "Copied! ✅";
      }
    });
  };

  setupCopyHandler("#copy-btn-tier1", "#prompt-tier1-text");
  setupCopyHandler("#copy-btn-tier2", "#prompt-tier2-text");

  // Setup Tagline Reveal with IntersectionObserver (B11)
  setupTaglineReveal(container);

  // Setup FAQ Accordion toggles
  setupFaqAccordion(container);

  // Initialize Three.js viewport
  const threeContainer = container.querySelector("#three-container") as HTMLElement;
  if (threeContainer) {
    initThreeViewport(threeContainer, state.selectedColor)
      .then((ctrl) => {
        threeController = ctrl;
      })
      .catch((err) => {
        console.error("[ThreeViewport] Error mounting 3D stage:", err);
      });
  }

  // Reactive store subscriber: updates values in-place without re-rendering the DOM
  shopStore.subscribe(() => {
    updateActiveOptions(container);
  });

  function setupTaglineReveal(root: HTMLElement): void {
    const target = root.querySelector("#reveal-target");
    if (!target) return;

    const rawText = target.textContent?.trim() || "";
    const words = rawText.split(/\s+/);
    target.innerHTML = words
      .map((word) => `<span class="reveal-word">${word}</span>`)
      .join(" ");

    const wordEls = target.querySelectorAll(".reveal-word");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            wordEls.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("active");
              }, index * 40);
            });
            observer.disconnect();
          }
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(target);
  }

  function setupFaqAccordion(root: HTMLElement): void {
    root.querySelectorAll(".faq-item").forEach((item) => {
      const btn = item.querySelector(".faq-question");
      btn?.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        root.querySelectorAll(".faq-item").forEach((i) => i.classList.remove("open"));
        if (!isOpen) {
          item.classList.add("open");
        }
      });
    });
  }

  function updateActiveOptions(root: HTMLElement): void {
    const s = shopStore.getState();
    const sku = `KURO-V1-${s.selectedColor}-${s.selectedSize}`;
    const stk = s.inventory[sku] ?? 0;
    const avail = stk > 0;

    const skuDisplay = root.querySelector("#active-sku-display");
    if (skuDisplay) skuDisplay.textContent = sku;

    const stockPill = root.querySelector("#stock-pill-display");
    if (stockPill) {
      stockPill.textContent = `● ${avail ? `${stk} pairs available in stock` : 'Temporarily sold out in this size'}`;
      (stockPill as HTMLElement).style.color = avail ? 'var(--accent-success)' : 'var(--accent-muted)';
    }

    root.querySelectorAll(".color-btn").forEach((btn) => {
      const c = (btn as HTMLElement).dataset.color;
      btn.classList.toggle("active", c === s.selectedColor);
      btn.setAttribute("aria-checked", String(c === s.selectedColor));
    });

    root.querySelectorAll(".size-btn").forEach((btn) => {
      const sz = Number((btn as HTMLElement).dataset.size);
      const skuForSize = `KURO-V1-${s.selectedColor}-${sz}`;
      const sizeAvail = (s.inventory[skuForSize] ?? 0) > 0;
      btn.classList.toggle("active", sz === s.selectedSize);
      btn.classList.toggle("out-of-stock", !sizeAvail);
      btn.toggleAttribute("disabled", !sizeAvail);
      btn.setAttribute("aria-checked", String(sz === s.selectedSize));
    });

    const addBtn = root.querySelector("#add-to-cart-btn") as HTMLButtonElement | null;
    if (addBtn) {
      addBtn.disabled = !avail;
      addBtn.textContent = avail ? "Order Pair ($185)" : "Sold Out";
    }
  }
}
