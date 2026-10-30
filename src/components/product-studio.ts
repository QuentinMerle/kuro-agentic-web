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

  const publicUrl = "https://kuro-agentic-web.vercel.app";
  const state = shopStore.getState();
  const currentSku = `KURO-V1-${state.selectedColor}-${state.selectedSize}`;
  const stock = state.inventory[currentSku] ?? 0;
  const isAvailable = stock > 0;

  // Mount the complete landing page DOM ONCE
  container.innerHTML = `
    <!-- 1. DEEPMIND RESEARCH MASTHEAD -->
    <header class="hero-section" aria-labelledby="hero-title">
      <div class="hero-tag">
        <span class="hero-tag-pulse"></span>
        <span>Research Paper // Agentic Web Interaction · October 2026</span>
      </div>

      <h1 id="hero-title" class="hero-heading">
        From Scraping to the « RSS of AI » :<br>
        <span style="font-family: var(--font-serif); font-weight: 400; font-style: italic; color: var(--accent-blue);">Anatomy of an Agentic Interface</span>
      </h1>

      <p class="hero-subheading">
        An empirical research study benchmarking in-DOM tool exposition via WebMCP against cold action syndication 
        via <code>/agent-feed.json</code> and sandboxed Micro-UIs in autonomous AI agent runtimes.
      </p>

      <div class="proof-signal">
        <span><strong>Author:</strong> Quentin Merle (<a href="https://www.vibrisse-studio.dev/" target="_blank" rel="noopener" style="color: inherit; text-decoration: underline;">Vibrisse Studio</a>)</span>
        <span>·</span>
        <span><strong>Spec:</strong> W3C WebMCP & MCP Apps (SEP-1865)</span>
        <span>·</span>
        <span><strong>Runtime:</strong> Production Edge CDN</span>
        <span>·</span>
        <span><a href="https://github.com/QuentinMerle/kuro-agentic-web" target="_blank" rel="noopener noreferrer" style="color: var(--accent-blue); text-decoration: underline;">GitHub Repository</a></span>
      </div>
    </header>

    <!-- 2. KEY RESEARCH FINDINGS (DeepMind 3-Card Summary) -->
    <section class="takeaways-grid" aria-label="Key Research Findings">
      <div class="takeaway-card">
        <div class="takeaway-icon">⚡</div>
        <div class="takeaway-title">Discovery Latency & Cost</div>
        <p class="takeaway-desc">51 ms cold JSON manifest read vs 2,800 ms DOM parsing. 0 MB browser memory overhead vs 400 MB bloated SPA bundle.</p>
      </div>
      <div class="takeaway-card">
        <div class="takeaway-icon">🛡️</div>
        <div class="takeaway-title">Security & Sandbox Isolation</div>
        <p class="takeaway-desc">Opaque null-origin iframe boundary isolates host chat. WebAuthn biometric signatures prevent prompt injection tampering.</p>
      </div>
      <div class="takeaway-card">
        <div class="takeaway-icon">📦</div>
        <div class="takeaway-title">Asset Strategy & FinOps</div>
        <p class="takeaway-desc">112 KB pre-baked PBR snapshots replace heavy 8.2 MB WebGL runtimes, eliminating 1,320 MB RSS client memory leaks.</p>
      </div>
    </section>

    <!-- 3. CHAPTER 1: THE CRISIS (Single-Column Reading Pane) -->
    <article class="reading-prose" id="the-crisis">
      <h2>1. The Collapse of Human DOMs for Machine Reasoning</h2>
      <p>
        For thirty years, the World Wide Web was optimized for human retinas with 200 ms latency tolerances. To sell a sneaker, modern e-commerce architectures assemble heavy React trees, mega-bundles of CSS, client trackers, and hydration scripts.
      </p>
      <p>
        When autonomous AI agents (Operator, ChatGPT Atlas, Claude Computer Use) browse the web today, they are forced to act like clumsy robotic tourists. They download 15 MB of visual bloat, burn 4,000 tokens of context window simply reading navigation menus, and attempt to click coordinates that drift with every viewport resize.
      </p>

      <blockquote>
        « The web was architected for human retinas with 200ms latency tolerance. Autonomous agents operate with 0ms patience and strict context window economics. The 2010 DOM is an unsustainable host for 2026 intelligence. »
      </blockquote>

      <p>
        The fundamental insight of this research is that <strong>agentic commerce requires a dual-plane architecture</strong>: a cold, deterministic JSON plane for the model's tool discovery (the « RSS of AI »), coupled with a secure, ephemeral Micro-UI sandboxed for human validation when spatial or aesthetic decisions are required.
      </p>
    </article>

    <!-- 4. BREAKOUT FIGURE 1: SCROLLYTELLING PROTOCOL RUNNER -->
    <figure class="breakout-figure" id="storyline">
      <div class="figure-header">
        <span class="figure-badge">● Figure 1 · Interactive Protocol Simulator</span>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-subtle);">Scroll narrative to adapt host state · Switch [ UI / Code ]</span>
      </div>

      <div class="scrolly-layout">
        <!-- Left Column: Narrative Acts -->
        <div class="scrolly-narrative-col">
          <!-- Act 1 -->
          <article class="scrolly-act-card is-active" data-act="1" id="act-1">
            <div class="spine-meta">ACT 01 · THE RSS OF AI</div>
            <h3 class="spine-title">
              Schema Text Elicitation <span class="spine-badge spine-badge-emerald">100% Universal</span>
            </h3>
            <p class="spine-lead">
              The store exposes its action contracts via a static 1.75 KB JSON manifest (<code>/agent-feed.json</code>). Any external agent (ChatGPT, Claude, Cursor, CLI) discovers actions in 50 ms via a simple HTTP GET with 0 MB browser RAM, prompting the user for size and colorway.
            </p>
            <div class="spine-callout spine-callout-amber">
              <span>⚠</span>
              <div>
                <strong>The Cognitive Ceiling :</strong> Buying a $185 pair of technical sneakers without seeing them is absurd. Pure text breaks down for aesthetic and spatial decisions; we need visual UI on demand.
              </div>
            </div>
          </article>

          <!-- Act 2 -->
          <article class="scrolly-act-card" data-act="2" id="act-2">
            <div class="spine-meta">ACT 02 · IN-CHAT MICRO-UI</div>
            <h3 class="spine-title">
              The Host Container Gap <span class="spine-badge spine-badge-cyan">MCP Apps SEP-1865</span>
            </h3>
            <p class="spine-lead">
              Declaring a UI entrypoint (<code>/widget.html</code>) mounts smoothly in local IDE webviews. But public web chats (ChatGPT, Claude.ai) sanitize arbitrary iframes (<code>frame-src 'self'</code>) to prevent phishing and session hijacking.
            </p>
            <div class="spine-callout spine-callout-cyan">
              <span>⚡</span>
              <div>
                <strong>The Architectural Resolution :</strong> MCP Apps standardizes host-isolated sandboxes (opaque <code>null</code> origin, zero direct network access) communicating exclusively via typed <code>postMessage</code> JSON-RPC 2.0.
              </div>
            </div>

            <div class="spine-disclaimer-mcp">
              <div style="font-weight: 700; color: #0369a1; display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <span>💡</span> Architectural Distinction : MCP Server vs. MCP Apps
              </div>
              <div style="color: var(--accent-muted); font-size: 11px; line-height: 1.5;">
                A classic <strong>MCP Server</strong> runs as a headless backend process (via <code>stdio</code> or HTTP <code>SSE</code>) providing text/JSON tools directly to the model. <strong>MCP Apps</strong> (SEP-1865 / WebMCP) standardizes <em>client-side interactive webviews</em> in the chat canvas, allowing users to touch, inspect, and approve state mutations directly.
              </div>
            </div>
          </article>

          <!-- Act 3 -->
          <article class="scrolly-act-card" data-act="3" id="act-3">
            <div class="spine-meta">ACT 03 · THE PHYSICAL 3D CRASH</div>
            <h3 class="spine-title">
              WebGL Failure & Snapshot Baking Pivot <span class="spine-badge spine-badge-rose">Hardware Limit</span>
            </h3>
            <p class="spine-lead">
              We attempted to bring the merchant's full Three.js 3D engine (8 MB GLTF) into the chat. It crashed in real agent sandboxes: GPU acceleration disabled, CSP <code>connect-src 'none'</code> blocking geometry fetch, and VRAM leaks exhausting tab memory across 20-turn chats.
            </p>
            <div class="spine-callout spine-callout-emerald">
              <span>●</span>
              <div>
                <strong>The Architectural Pivot :</strong> Snapshot Baking PBR. Pre-rendered photorealistic hero angles inlined in an autonomous 112 KB bundle (0 ms WebGL, 0 MB VRAM, 100% CSP compliant). Three.js is demoted to conditional Tier 3.
              </div>
            </div>
          </article>

          <!-- Act 4 -->
          <article class="scrolly-act-card" data-act="4" id="act-4">
            <div class="spine-meta">ACT 04 · SOVEREIGN TRANSACTION</div>
            <h3 class="spine-title">
              Who Holds the Credit Card? <span class="spine-badge spine-badge-purple">ACP · AP2 · Passkeys</span>
            </h3>
            <p class="spine-lead">
              Confiding raw payment cards to an LLM prompt is a strict PCI-DSS violation and a prompt injection nightmare. Conversely, redirecting to a 15-field traditional checkout form completely destroys the agentic speed advantage.
            </p>
            <div class="spine-callout spine-callout-purple">
              <span>✦</span>
              <div>
                <strong>Cryptographic Delegation :</strong> Emerging protocols (OpenAI/Stripe ACP, Google AP2, WebAuthn Passkeys). The agent locks the basket URL, and the human confirms with Touch ID / Apple Pay. <em>« The agent prepares the basket, the human validates the signature. »</em>
              </div>
            </div>
          </article>
        </div>

        <!-- Right Column: Sticky Simulator / Viewport -->
        <div class="scrolly-sticky-col">
          <div class="scrolly-sim-window" id="scrolly-sim-window">
            <div class="sim-window-header">
              <div class="sim-window-dots">
                <span class="sim-dot sim-dot-red"></span>
                <span class="sim-dot sim-dot-yellow"></span>
                <span class="sim-dot sim-dot-green"></span>
              </div>
              <div class="sim-window-title" id="sim-window-title">
                <span>●</span> Kuro Agent Host · Act 01
              </div>
              <div class="sim-window-actions">
                <div class="sim-mode-toggle" id="sim-mode-toggle">
                  <button class="sim-mode-btn active" data-mode="preview">
                    <span class="sim-mode-icon">👁</span> UI
                  </button>
                  <button class="sim-mode-btn" data-mode="code">
                    <span class="sim-mode-icon">&lt;/&gt;</span> Code
                  </button>
                </div>
                <div class="sim-window-tabs">
                  <button class="sim-tab-btn active" data-target-act="1">01</button>
                  <button class="sim-tab-btn" data-target-act="2">02</button>
                  <button class="sim-tab-btn" data-target-act="3">03</button>
                  <button class="sim-tab-btn" data-target-act="4">04</button>
                </div>
              </div>
            </div>

            <div class="sim-stage-viewport">
              <!-- Panel 1: Pure Text Elicitation -->
              <div class="sim-panel active" id="sim-panel-1">
                <div class="sim-chat-bubble">
                  <div><strong>HTTP GET:</strong> <code>https://kuro-agentic-web.vercel.app/agent-feed.json</code> [200 OK · 51ms · 1.75 KB]</div>
                  <div><strong>Tool Found:</strong> <code>order_kuro_shoe(size, color)</code></div>
                  <div style="color: var(--accent-primary); margin-top: 4px;">
                    🤖 Agent: <em>"Which size (7–11 US) and colorway (Obsidian Black, Deep Indigo, Raw Chalk) would you like to order?"</em>
                  </div>
                </div>

                <div class="sim-preview-box" style="border-style: dashed; border-color: var(--border-subtle);">
                  <svg width="120" height="60" viewBox="0 0 200 100" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4" style="color: var(--accent-muted); opacity: 0.6;">
                    <path d="M20 70 Q 40 40 70 45 L 120 50 Q 150 20 180 30 L 190 70 Z" />
                    <circle cx="100" cy="55" r="12" stroke-width="1" />
                  </svg>
                  <div style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-amber); background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.25); padding: 4px 10px; border-radius: var(--radius-sm); text-align: center;">
                    ⚠ NO VISUAL RENDER (0 KB ASSETS)
                  </div>
                  <p style="font-size: 12px; color: var(--accent-muted); text-align: center; margin: 0; max-width: 280px; line-height: 1.4;">
                    Purchasing a $185 technical sneaker blind. Pure text is incapable of communicating shape, fit, or material texture.
                  </p>
                </div>

                <div class="sim-status-bar">
                  <span>RAM: 0 MB · Tokens: ~440</span>
                  <span style="color: var(--accent-success);">● Universal (100% LLMs)</span>
                </div>
              </div>

              <!-- Panel 2: Sandboxed Micro-UI & MCP Apps -->
              <div class="sim-panel" id="sim-panel-2">
                <div style="font-family: var(--font-mono); font-size: 10px; font-weight: 600; display: flex; justify-content: space-between; align-items: center; margin-bottom: 10px; background: rgba(2, 132, 199, 0.06); border: 1px solid rgba(2, 132, 199, 0.22); padding: 5px 10px; border-radius: var(--radius-sm); color: #0369a1;">
                  <span>🔒 Host Sandbox: opaque null origin</span>
                  <span>MCP Apps SEP-1865</span>
                </div>

                <div class="sim-preview-box" style="padding: 14px; gap: 10px;">
                  <div style="width: 100%; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid var(--border-subtle); padding-bottom: 6px;">
                    <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 600; color: var(--accent-primary);">KURO · TIER 2 MICRO-UI</span>
                    <span style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-success); background: rgba(16, 185, 129, 0.1); padding: 1px 6px; border-radius: var(--radius-full);">PBR Baked</span>
                  </div>

                  <div style="width: 100%; height: 140px; display: flex; align-items: center; justify-content: center; position: relative;">
                    <img id="sim-shoe-img" src="/images/kuro-indigo.png" alt="Kuro Runner" style="max-height: 120px; max-width: 90%; object-fit: contain; filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.18)); transition: opacity 0.2s;" />
                  </div>

                  <!-- Mini Color Swatches -->
                  <div style="display: flex; gap: 8px; width: 100%; justify-content: center;">
                    <button class="sim-color-btn active" data-color="Deep Indigo" style="font-family: var(--font-mono); font-size: 10px; padding: 3px 10px; border-radius: var(--radius-sm); border: 1px solid var(--accent-cyan); background: rgba(56, 189, 248, 0.1); color: var(--accent-cyan); cursor: pointer;">Indigo</button>
                    <button class="sim-color-btn" data-color="Obsidian Black" style="font-family: var(--font-mono); font-size: 10px; padding: 3px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: var(--bg-card); color: var(--accent-muted); cursor: pointer;">Obsidian</button>
                    <button class="sim-color-btn" data-color="Raw Chalk" style="font-family: var(--font-mono); font-size: 10px; padding: 3px 10px; border-radius: var(--radius-sm); border: 1px solid var(--border-subtle); background: var(--bg-card); color: var(--accent-muted); cursor: pointer;">Chalk</button>
                  </div>

                  <button style="width: 100%; padding: 8px; background: var(--accent-primary); color: var(--bg-app); border: none; border-radius: var(--radius-md); font-size: 12px; font-weight: 600; cursor: pointer; margin-top: 4px;">
                    Order Kuro Runner ($185)
                  </button>
                </div>

                <div class="sim-status-bar">
                  <span>RPC: postMessage (JSON-RPC 2.0)</span>
                  <span style="color: var(--accent-cyan);">Mount: &lt; 10 ms</span>
                </div>
              </div>

              <!-- Panel 3: 3D Crash & Snapshot Baking Pivot -->
              <div class="sim-panel" id="sim-panel-3">
                <div style="background: rgba(239, 68, 68, 0.06); border: 1px solid rgba(239, 68, 68, 0.22); border-radius: var(--radius-md); padding: 10px 14px; font-family: var(--font-mono); font-size: 11px; color: #991b1b; line-height: 1.55; margin-bottom: 10px;">
                  <div style="font-weight: 700; color: #b91c1c; margin-bottom: 3px;">✕ Three.js WebGL Execution Aborted:</div>
                  • canvas.getContext('webgl2') === null (GPU disabled)<br>
                  • CSP Violation: connect-src 'none' (8.2 MB .gltf blocked)<br>
                  • VRAM Hazard: 1,320 MB RSS across 20 turns
                </div>

                <div class="sim-preview-box" style="padding: 12px; background: rgba(16, 185, 129, 0.03); border-color: rgba(16, 185, 129, 0.25);">
                  <div style="display: flex; justify-content: space-between; width: 100%; align-items: center;">
                    <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; color: var(--accent-success);">● PBR Snapshot Baking (Production Standard)</span>
                    <span style="font-family: var(--font-mono); font-size: 10px; color: var(--accent-muted);">112 KB Total Bundle</span>
                  </div>

                  <div style="width: 100%; height: 130px; display: flex; align-items: center; justify-content: center;">
                    <img src="/images/kuro-obsidian.png" alt="Baked Snapshot" style="max-height: 110px; object-fit: contain; filter: drop-shadow(0 8px 16px rgba(0, 0, 0, 0.18));" />
                  </div>

                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; width: 100%; font-family: var(--font-mono); font-size: 10.5px;">
                    <div style="padding: 6px 8px; background: rgba(239, 68, 68, 0.06); border-radius: var(--radius-sm); color: #b91c1c; font-weight: 600; text-align: center; border: 1px solid rgba(239, 68, 68, 0.22);">
                      WebGL: 1,320 MB RAM
                    </div>
                    <div style="padding: 6px 8px; background: rgba(5, 150, 105, 0.06); border-radius: var(--radius-sm); color: #047857; font-weight: 600; text-align: center; border: 1px solid rgba(5, 150, 105, 0.22);">
                      Snapshot: 0 MB VRAM
                    </div>
                  </div>
                </div>

                <div class="sim-status-bar">
                  <span>CSP: 100% Compliant</span>
                  <span style="color: var(--accent-success);">Latency: 0 ms WebGL</span>
                </div>
              </div>

              <!-- Panel 4: Sovereign Handoff & Sealed Receipt -->
              <div class="sim-panel" id="sim-panel-4">
                <div class="sim-preview-box" style="padding: 14px; gap: 12px; border-color: rgba(16, 185, 129, 0.3); background: rgba(16, 185, 129, 0.02);">
                  <div style="display: flex; align-items: center; gap: 8px; width: 100%; color: var(--accent-success); font-family: var(--font-mono); font-size: 11px; font-weight: 700;">
                    <span>✔</span>
                    <span>BASKET SEALED & IRREVERSIBLE</span>
                  </div>

                  <div style="width: 100%; background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-md); padding: 12px; font-family: var(--font-mono); font-size: 11px; display: flex; flex-direction: column; gap: 4px;">
                    <div style="display: flex; justify-content: space-between; color: var(--accent-primary);">
                      <span>Kuro Runner V1 (Deep Indigo)</span>
                      <span>$185.00</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; color: var(--accent-muted); font-size: 10px;">
                      <span>Size: US 9 · SKU: KURO-V1-IND-9</span>
                      <span>Receipt Locked</span>
                    </div>
                  </div>

                  <div style="width: 100%; padding: 10px 14px; background: rgba(147, 51, 234, 0.06); border: 1px solid rgba(147, 51, 234, 0.2); border-radius: var(--radius-md); font-family: var(--font-mono); font-size: 11px; color: #581c87; line-height: 1.5;">
                    <div style="font-weight: 700; margin-bottom: 2px;">🔐 Cryptographic Mandate (ACP / AP2)</div>
                    <div style="font-size: 10.5px; color: #475569;">Agent prepared basket · Awaiting biometric signature</div>
                  </div>

                  <button id="sim-touchid-btn" style="width: 100%; padding: 11px; background: #0f172a; color: #ffffff; border: none; border-radius: var(--radius-md); font-size: 12px; font-weight: 700; cursor: pointer; display: flex; align-items: center; justify-content: center; gap: 8px; box-shadow: 0 2px 8px rgba(15, 23, 42, 0.15);">
                    <span></span> Pay with Touch ID / Passkey
                  </button>
                  <div id="sim-touchid-feedback" style="display: none; font-family: var(--font-mono); font-size: 11px; color: var(--accent-success); text-align: center;">
                    ✓ Mandate Signed & Authenticated via WebAuthn
                  </div>
                </div>

                <div class="sim-status-bar">
                  <span>PCI-DSS: Card Never Exposed</span>
                  <span style="color: var(--accent-purple);">1-Tap Sovereign Handoff</span>
                </div>
              </div>
            </div>

            <!-- Option A: Code Protocol Viewport -->
            <div class="sim-code-viewport" id="sim-code-viewport">
              <div class="sim-code-bar">
                <div class="sim-code-meta">
                  <span class="sim-code-file-icon">📄</span>
                  <span class="sim-code-filename" id="sim-code-filename">public/agent-feed.json</span>
                  <span class="sim-code-badge" id="sim-code-lang">JSON</span>
                </div>
                <button class="sim-code-copy-btn" id="sim-code-copy-btn" title="Copy code snippet">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                  </svg>
                  <span id="sim-copy-text">Copy</span>
                </button>
              </div>

              <!-- Code Panel 1: Act 01 Feed Schema -->
              <div class="sim-code-panel active" id="sim-code-panel-1">
                <pre class="sim-code-content"><code><span class="syn-comment">// 1. Discovery Contract: Published at site root.</span>
<span class="syn-comment">// Any LLM/crawler inspects this without parsing brittle HTML/DOM.</span>
<span class="syn-punct">{</span>
  <span class="syn-key">"$schema"</span><span class="syn-punct">:</span> <span class="syn-str">"https://kuro.run/schemas/agentic-feed.v1.json"</span><span class="syn-punct">,</span>
  <span class="syn-key">"id"</span><span class="syn-punct">:</span> <span class="syn-str">"kuro-runner-v1"</span><span class="syn-punct">,</span>
  <span class="syn-key">"name"</span><span class="syn-punct">:</span> <span class="syn-str">"Kuro Runner V1"</span><span class="syn-punct">,</span>
  <span class="syn-key">"pricing"</span><span class="syn-punct">:</span> <span class="syn-punct">{</span> <span class="syn-key">"amount"</span><span class="syn-punct">:</span> <span class="syn-num">185.00</span><span class="syn-punct">,</span> <span class="syn-key">"currency"</span><span class="syn-punct">:</span> <span class="syn-str">"USD"</span> <span class="syn-punct">}</span><span class="syn-punct">,</span>
  <span class="syn-key">"interactive_surface"</span><span class="syn-punct">:</span> <span class="syn-punct">{</span>
    <span class="syn-key">"type"</span><span class="syn-punct">:</span> <span class="syn-str">"sandboxed-iframe"</span><span class="syn-punct">,</span>
    <span class="syn-key">"endpoint"</span><span class="syn-punct">:</span> <span class="syn-str">"https://kuro-agentic-web.vercel.app/widget.html"</span><span class="syn-punct">,</span>
    <span class="syn-key">"sandbox"</span><span class="syn-punct">:</span> <span class="syn-str">"allow-scripts"</span><span class="syn-punct">,</span>
    <span class="syn-key">"dimensions"</span><span class="syn-punct">:</span> <span class="syn-punct">{</span> <span class="syn-key">"width"</span><span class="syn-punct">:</span> <span class="syn-num">420</span><span class="syn-punct">,</span> <span class="syn-key">"height"</span><span class="syn-punct">:</span> <span class="syn-num">380</span> <span class="syn-punct">}</span>
  <span class="syn-punct">}</span><span class="syn-punct">,</span>
  <span class="syn-key">"action_intent"</span><span class="syn-punct">:</span> <span class="syn-punct">{</span>
    <span class="syn-key">"name"</span><span class="syn-punct">:</span> <span class="syn-str">"ORDER_KURO_SHOE"</span><span class="syn-punct">,</span>
    <span class="syn-key">"required_slots"</span><span class="syn-punct">:</span> <span class="syn-punct">[</span><span class="syn-str">"size"</span><span class="syn-punct">,</span> <span class="syn-str">"color"</span><span class="syn-punct">]</span>
  <span class="syn-punct">}</span>
<span class="syn-punct">}</span></code></pre>
              </div>

              <!-- Code Panel 2: Act 02 Sandboxed Bridge -->
              <div class="sim-code-panel" id="sim-code-panel-2">
                <pre class="sim-code-content"><code><span class="syn-comment">// 2. Isolation Bridge: Host Chat &lt;-&gt; Sandboxed Iframe (MCP Apps)</span>
<span class="syn-kw">export interface</span> <span class="syn-type">KuroCartIntent</span> <span class="syn-punct">{</span>
  <span class="syn-prop">type</span><span class="syn-punct">:</span> <span class="syn-str">'KURO_CART_INTENT'</span><span class="syn-punct">;</span>
  <span class="syn-prop">sku</span><span class="syn-punct">:</span> <span class="syn-type">string</span><span class="syn-punct">;</span>
  <span class="syn-prop">size</span><span class="syn-punct">:</span> <span class="syn-type">number</span><span class="syn-punct">;</span>
  <span class="syn-prop">color</span><span class="syn-punct">:</span> <span class="syn-str">'indigo'</span> <span class="syn-punct">|</span> <span class="syn-str">'obsidian'</span> <span class="syn-punct">|</span> <span class="syn-str">'chalk'</span><span class="syn-punct">;</span>
  <span class="syn-prop">price</span><span class="syn-punct">:</span> <span class="syn-type">number</span><span class="syn-punct">;</span>
<span class="syn-punct">}</span>

<span class="syn-comment">// Host opens strict listener with origin gating</span>
<span class="syn-prop">window</span><span class="syn-punct">.</span><span class="syn-fn">addEventListener</span><span class="syn-punct">(</span><span class="syn-str">'message'</span><span class="syn-punct">,</span> <span class="syn-punct">(</span><span class="syn-prop">event</span><span class="syn-punct">:</span> <span class="syn-type">MessageEvent</span><span class="syn-punct">&lt;</span><span class="syn-type">KuroCartIntent</span><span class="syn-punct">&gt;)</span> <span class="syn-kw">=&gt;</span> <span class="syn-punct">{</span>
  <span class="syn-comment">// Enforce zero-trust: reject foreign origins</span>
  <span class="syn-kw">if</span> <span class="syn-punct">(</span><span class="syn-prop">event</span><span class="syn-punct">.</span><span class="syn-prop">origin</span> <span class="syn-punct">!==</span> <span class="syn-str">'https://kuro-agentic-web.vercel.app'</span><span class="syn-punct">)</span> <span class="syn-kw">return</span><span class="syn-punct">;</span>

  <span class="syn-kw">if</span> <span class="syn-punct">(</span><span class="syn-prop">event</span><span class="syn-punct">.</span><span class="syn-prop">data</span><span class="syn-punct">?.</span><span class="syn-prop">type</span> <span class="syn-punct">===</span> <span class="syn-str">'KURO_CART_INTENT'</span><span class="syn-punct">)</span> <span class="syn-punct">{</span>
    <span class="syn-kw">const</span> <span class="syn-punct">{</span> <span class="syn-prop">sku</span><span class="syn-punct">,</span> <span class="syn-prop">size</span><span class="syn-punct">,</span> <span class="syn-prop">color</span> <span class="syn-punct">}</span> <span class="syn-punct">=</span> <span class="syn-prop">event</span><span class="syn-punct">.</span><span class="syn-prop">data</span><span class="syn-punct">;</span>
    <span class="syn-comment">// Commit structured verified state into agent context</span>
    <span class="syn-prop">agentHost</span><span class="syn-punct">.</span><span class="syn-fn">commitState</span><span class="syn-punct">({</span> <span class="syn-prop">sku</span><span class="syn-punct">,</span> <span class="syn-prop">size</span><span class="syn-punct">,</span> <span class="syn-prop">color</span><span class="syn-punct">,</span> <span class="syn-prop">ready</span><span class="syn-punct">:</span> <span class="syn-kw">true</span> <span class="syn-punct">});</span>
  <span class="syn-punct">}</span>
<span class="syn-punct">});</span></code></pre>
              </div>

              <!-- Code Panel 3: Act 03 PBR Baking Pipeline -->
              <div class="sim-code-panel" id="sim-code-panel-3">
                <pre class="sim-code-content"><code><span class="syn-comment">// 3. Performance Pivot: Headless 3D Pre-Baking Pipeline</span>
<span class="syn-comment">// Avoids 1,320 MB RSS WebGL leaks & GPU sandboxing crashes</span>
<span class="syn-kw">import</span> <span class="syn-punct">{</span> <span class="syn-prop">chromium</span> <span class="syn-punct">}</span> <span class="syn-kw">from</span> <span class="syn-str">'playwright'</span><span class="syn-punct">;</span>

<span class="syn-kw">export async function</span> <span class="syn-fn">bakeColorwaySnapshot</span><span class="syn-punct">(</span><span class="syn-prop">colorway</span><span class="syn-punct">:</span> <span class="syn-type">string</span><span class="syn-punct">):</span> <span class="syn-type">Promise</span><span class="syn-punct">&lt;</span><span class="syn-type">Buffer</span><span class="syn-punct">&gt;</span> <span class="syn-punct">{</span>
  <span class="syn-kw">const</span> <span class="syn-prop">browser</span> <span class="syn-punct">=</span> <span class="syn-kw">await</span> <span class="syn-prop">chromium</span><span class="syn-punct">.</span><span class="syn-fn">launch</span><span class="syn-punct">({</span> <span class="syn-prop">headless</span><span class="syn-punct">:</span> <span class="syn-kw">true</span> <span class="syn-punct">});</span>
  <span class="syn-kw">const</span> <span class="syn-prop">page</span> <span class="syn-punct">=</span> <span class="syn-kw">await</span> <span class="syn-prop">browser</span><span class="syn-punct">.</span><span class="syn-fn">newPage</span><span class="syn-punct">();</span>

  <span class="syn-comment">// Render 3D glTF in isolated headless browser</span>
  <span class="syn-kw">await</span> <span class="syn-prop">page</span><span class="syn-punct">.</span><span class="syn-fn">goto</span><span class="syn-punct">(</span><span class="syn-str">\`https://kuro-agentic-web.vercel.app/bake?color=<span class="syn-punct">\${</span><span class="syn-prop">colorway</span><span class="syn-punct">}</span>\`</span><span class="syn-punct">);</span>
  <span class="syn-kw">await</span> <span class="syn-prop">page</span><span class="syn-punct">.</span><span class="syn-fn">waitForFunction</span><span class="syn-punct">(()</span> <span class="syn-kw">=&gt;</span> <span class="syn-prop">window</span><span class="syn-punct">.</span><span class="syn-prop">__THREE_BAKE_DONE__</span> <span class="syn-punct">===</span> <span class="syn-kw">true</span><span class="syn-punct">);</span>

  <span class="syn-comment">// Output ultra-light 112 KB snapshot (0 MB client VRAM)</span>
  <span class="syn-kw">const</span> <span class="syn-prop">buffer</span> <span class="syn-punct">=</span> <span class="syn-kw">await</span> <span class="syn-prop">page</span><span class="syn-punct">.</span><span class="syn-fn">screenshot</span><span class="syn-punct">({</span> <span class="syn-prop">type</span><span class="syn-punct">:</span> <span class="syn-str">'png'</span><span class="syn-punct">,</span> <span class="syn-prop">omitBackground</span><span class="syn-punct">:</span> <span class="syn-kw">true</span> <span class="syn-punct">});</span>
  <span class="syn-kw">await</span> <span class="syn-prop">browser</span><span class="syn-punct">.</span><span class="syn-fn">close</span><span class="syn-punct">();</span>
  <span class="syn-kw">return</span> <span class="syn-prop">buffer</span><span class="syn-punct">;</span>
<span class="syn-punct">}</span></code></pre>
              </div>

              <!-- Code Panel 4: Act 04 Cryptographic Mandate -->
              <div class="sim-code-panel" id="sim-code-panel-4">
                <pre class="sim-code-content"><code><span class="syn-comment">// 4. Sovereign Delegation (OpenAI ACP / Google AP2 Standard)</span>
<span class="syn-comment">// Prevents prompt injection: LLM cannot forge or alter the basket</span>
<span class="syn-kw">export async function</span> <span class="syn-fn">signCheckoutMandate</span><span class="syn-punct">(</span><span class="syn-prop">cart</span><span class="syn-punct">:</span> <span class="syn-type">KuroCart</span><span class="syn-punct">):</span> <span class="syn-type">Promise</span><span class="syn-punct">&lt;</span><span class="syn-type">Mandate</span><span class="syn-punct">&gt;</span> <span class="syn-punct">{</span>
  <span class="syn-kw">const</span> <span class="syn-prop">payload</span> <span class="syn-punct">=</span> <span class="syn-prop">JSON</span><span class="syn-punct">.</span><span class="syn-fn">stringify</span><span class="syn-punct">({</span>
    <span class="syn-prop">sku</span><span class="syn-punct">:</span> <span class="syn-prop">cart</span><span class="syn-punct">.</span><span class="syn-prop">sku</span><span class="syn-punct">,</span>
    <span class="syn-prop">amount</span><span class="syn-punct">:</span> <span class="syn-num">185.00</span><span class="syn-punct">,</span>
    <span class="syn-prop">currency</span><span class="syn-punct">:</span> <span class="syn-str">'USD'</span><span class="syn-punct">,</span>
    <span class="syn-prop">nonce</span><span class="syn-punct">:</span> <span class="syn-prop">crypto</span><span class="syn-punct">.</span><span class="syn-fn">randomUUID</span><span class="syn-punct">(),</span>
    <span class="syn-prop">expiresAt</span><span class="syn-punct">:</span> <span class="syn-prop">Date</span><span class="syn-punct">.</span><span class="syn-fn">now</span><span class="syn-punct">()</span> <span class="syn-punct">+</span> <span class="syn-num">900_000</span> <span class="syn-comment">// 15 mins</span>
  <span class="syn-punct">});</span>

  <span class="syn-comment">// Native SHA-256 integrity digest via Web Crypto API</span>
  <span class="syn-kw">const</span> <span class="syn-prop">msgBytes</span> <span class="syn-punct">=</span> <span class="syn-kw">new</span> <span class="syn-fn">TextEncoder</span><span class="syn-punct">().</span><span class="syn-fn">encode</span><span class="syn-punct">(</span><span class="syn-prop">payload</span><span class="syn-punct">);</span>
  <span class="syn-kw">const</span> <span class="syn-prop">buf</span> <span class="syn-punct">=</span> <span class="syn-kw">await</span> <span class="syn-prop">crypto</span><span class="syn-punct">.</span><span class="syn-prop">subtle</span><span class="syn-punct">.</span><span class="syn-fn">digest</span><span class="syn-punct">(</span><span class="syn-str">'SHA-256'</span><span class="syn-punct">,</span> <span class="syn-prop">msgBytes</span><span class="syn-punct">);</span>
  <span class="syn-kw">const</span> <span class="syn-prop">digest</span> <span class="syn-punct">=</span> <span class="syn-prop">Array</span><span class="syn-punct">.</span><span class="syn-fn">from</span><span class="syn-punct">(</span><span class="syn-kw">new</span> <span class="syn-fn">Uint8Array</span><span class="syn-punct">(</span><span class="syn-prop">buf</span><span class="syn-punct">))</span>
    <span class="syn-punct">.</span><span class="syn-fn">map</span><span class="syn-punct">(</span><span class="syn-prop">b</span> <span class="syn-kw">=&gt;</span> <span class="syn-prop">b</span><span class="syn-punct">.</span><span class="syn-fn">toString</span><span class="syn-punct">(</span><span class="syn-num">16</span><span class="syn-punct">).</span><span class="syn-fn">padStart</span><span class="syn-punct">(</span><span class="syn-num">2</span><span class="syn-punct">,</span> <span class="syn-str">'0'</span><span class="syn-punct">)).</span><span class="syn-fn">join</span><span class="syn-punct">(</span><span class="syn-str">''</span><span class="syn-punct">);</span>

  <span class="syn-kw">return</span> <span class="syn-punct">{</span>
    <span class="syn-prop">signature</span><span class="syn-punct">:</span> <span class="syn-str">\`kuro_sig_<span class="syn-punct">\${</span><span class="syn-prop">digest</span><span class="syn-punct">.</span><span class="syn-fn">slice</span><span class="syn-punct">(</span><span class="syn-num">0</span><span class="syn-punct">,</span> <span class="syn-num">16</span><span class="syn-punct">)}</span>\`</span><span class="syn-punct">,</span>
    <span class="syn-prop">settlementUrl</span><span class="syn-punct">:</span> <span class="syn-str">\`https://kuro-agentic-web.vercel.app/checkout?sig=<span class="syn-punct">\${</span><span class="syn-prop">digest</span><span class="syn-punct">}</span>\`</span>
  <span class="syn-punct">};</span>
<span class="syn-punct">}</span></code></pre>
              </div>

              <div class="sim-status-bar">
                <span id="sim-code-footer-left">Spec: Agentic Commerce RSS</span>
                <span id="sim-code-footer-right" style="color: var(--accent-gold);">● Zero Scraping Required</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption class="figure-caption">
        <strong>Figure 1 · The 4-Act Protocol Execution Lifecycle:</strong> The empirical progression from static <code>/agent-feed.json</code> discovery to sandboxed MCP Micro-UIs, headless baked snapshot fallbacks, and biometric WebAuthn cart sealing.
      </figcaption>
    </figure>

    <!-- 5. CHAPTER 2: THE 3D GPU DILEMMA (Reading Column) -->
    <article class="reading-prose" id="gpu-dilemma">
      <h2>2. Why Client-Side 3D WebGL Fails in Autonomous Sandboxes</h2>
      <p>
        A widespread initial intuition is to embed high-fidelity 3D WebGL configurators directly into chat streams. While technically possible in isolation, our empirical benchmarks reveal that running in-flight Three.js render loops inside multi-turn agent sessions triggers three critical failure modes:
      </p>
      <p>
        <strong>1. GPU Sandboxing Isolation :</strong> Enterprise agent containers (ChatGPT Canvas, Claude Desktop, Cursor) enforce strict Content Security Policies (CSP) such as <code>connect-src 'none'</code> or disable WebGL contexts to prevent hardware side-channel attacks.
      </p>
      <p>
        <strong>2. VRAM Accumulation :</strong> In a 20-turn conversational session, retaining multiple Three.js scenes easily exceeds 1,320 MB RSS, causing the browser tab or IDE host process to be summarily terminated by the OS.
      </p>
      <p>
        <strong>3. The Snapshot Baking Pivot :</strong> The production solution is build-time headless baking (Puppeteer / Playwright). We pre-render 3D geometries into ultra-optimized 112 KB WebP snapshots. Zero client VRAM, zero CSP network requests, 0 ms mount time.
      </p>
      <p>
        Below is the raw Three.js specimen used to benchmark WebGL memory consumption against pre-rendered assets.
      </p>
    </article>

    <!-- 6. BREAKOUT FIGURE 2: 3D STRESS-TEST BENCHMARK -->
    <figure class="breakout-figure" id="configurator-stage">
      <div class="figure-header">
        <span class="figure-badge">● Figure 2 · Technical Specimen: Three.js WebGL Benchmark</span>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-subtle);">Client-Side WebGL Viewport (GPU Stress-Test)</span>
      </div>

      <div class="studio-grid">
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

          <div style="padding: 16px 20px; display: flex; justify-content: space-between; align-items: center; background-color: #ffffff; border-top: 1px solid var(--border-subtle);">
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
              ${isAvailable ? "Simulate Basket Mandate ($185)" : "Sold Out"}
            </button>
            <div style="font-size: 10px; font-family: var(--font-mono); color: var(--accent-subtle); text-align: center; margin-top: 2px;">
              Fictional DTC Specimen · Sandboxed Demo
            </div>

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
      <figcaption class="figure-caption">
        <strong>Figure 2 · Empirical 3D WebGL Configurator:</strong> Rendered via client-side Three.js. This specimen benchmarks the 8.2 MB runtime against the 112 KB pre-baked PBR snapshot standard used in production agent embeds.
      </figcaption>
    </figure>

    <!-- 3. MANDATORY TAGLINE REVEAL SECTION (B11) -->
    <section class="tagline-section" aria-label="Architecture Manifesto">
      <div class="tagline-badge">Architectural Manifesto</div>
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

      <div class="matrix-table-wrap">
        <table class="matrix-table">
          <thead>
            <tr>
              <th style="width: 22%;">Metric / Dimension</th>
              <th style="width: 26%;">Headless Scraping (Puppeteer)</th>
              <th style="width: 26%;">In-DOM WebMCP (Active Tab)</th>
              <th class="matrix-highlight" style="width: 26%;">Feed + Sandboxed Micro-UI</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><strong>Cold Discovery</strong></td>
              <td class="text-rose font-bold">1,100 – 1,850 ms</td>
              <td class="text-cyan font-bold">&lt; 1 ms (DOM memory)</td>
              <td class="matrix-highlight text-emerald font-bold">45 – 65 ms (HTTP GET)</td>
            </tr>
            <tr>
              <td><strong>Payload / Memory</strong></td>
              <td class="text-rose">1,260 – 1,325 MB RAM</td>
              <td class="text-cyan">0 MB overhead</td>
              <td class="matrix-highlight text-emerald">1.75 KB (751 B gzip)</td>
            </tr>
            <tr>
              <td><strong>Context Window Cost</strong></td>
              <td class="text-rose">~10,150 tokens / query</td>
              <td class="text-cyan">Typed JSON schema</td>
              <td class="matrix-highlight text-emerald">~440 tokens</td>
            </tr>
            <tr>
              <td><strong>Deploy Resiliency</strong></td>
              <td class="text-rose">0% (Brittle selectors break)</td>
              <td class="text-cyan">100% (Declared typed contract)</td>
              <td class="matrix-highlight text-emerald">100% (SemVer schema spec)</td>
            </tr>
            <tr>
              <td><strong>Visual Interaction</strong></td>
              <td>Static PNG capture</td>
              <td>Direct active webpage</td>
              <td class="matrix-highlight text-emerald">JIT Micro-UI in chat bubble</td>
            </tr>
            <tr>
              <td><strong>Execution Layer</strong></td>
              <td>Remote compute cluster</td>
              <td>Host browser session</td>
              <td class="matrix-highlight text-emerald">Client-side isolated webview</td>
            </tr>
          </tbody>
        </table>
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

      <div class="ux-laws-layout">
        <aside class="ux-laws-aside">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="width: 7px; height: 7px; border-radius: 50%; background: #d97706;"></span>
            <span style="font-family: var(--font-mono); font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.08em; color: #92400e;">Interface Axioms</span>
          </div>
          <p style="font-size: 14.5px; color: var(--accent-muted); line-height: 1.65; margin: 0;">
            A conversational interface is fundamentally an append-only timeline. Every pixel injected must respect the host environment's focus, gesture cascade, and finite lifecycle.
          </p>
          <div class="host-constraint-card">
            <div class="host-constraint-card-title">
              <span>⚙</span> Host Constraint Reality
            </div>
            • Panel width: <code>380px – 680px</code><br>
            • Wheel gestures pass through<br>
            • Indefinite scroll retention<br>
            • Strict CSP execution jails
          </div>
        </aside>

        <div class="ux-laws-content">
          <!-- Law 1 -->
          <article class="ux-law-item">
            <div class="ux-law-head">
              <span class="ux-law-num ux-law-num-gold">01</span>
              <h3 class="ux-law-title">The Single-Purpose Micro-UI (Anti-WeChat Fallacy)</h3>
            </div>
            <p class="ux-law-desc">
              In an IDE side panel (380–500px) or desktop chat (600–750px), real estate is heavily constrained. Eliminate all traditional website chrome: no giant brand headers, no global navigation bars, no cookie banners, no footers.
            </p>
            <div class="ux-law-rule ux-law-rule-gold">
              <strong>Architectural Rule:</strong> Reject the fantasy of "Chat as universal OS". Chats excel at linear intent convergence, but fail at non-linear tasks (comparing 5 tables, dense carts). The in-chat UI must be surgical: resolve a sensory micro-decision (color, size, fit) and immediately yield control back to the prompt flow.
            </div>
          </article>

          <!-- Law 2 -->
          <article class="ux-law-item">
            <div class="ux-law-head">
              <span class="ux-law-num ux-law-num-copper">02</span>
              <h3 class="ux-law-title">Vertical Flow Preservation (Zero Wheel Hijacking)</h3>
            </div>
            <p class="ux-law-desc">
              Chat feeds rely on continuous vertical scrolling (<code>overflow-y: auto</code>). If an embedded component captures pointer wheel or touch gestures carelessly (e.g. 3D orbit zoom or internal list scroll), the user gets trapped and cannot scroll up to read the agent's prompt reasoning.
            </p>
            <div class="ux-law-rule ux-law-rule-copper">
              <strong>Architectural Rule:</strong> Enforce strict bounded height (<code>max-height: 480px</code>), disable unprompted scroll trapping via <code>touch-action: pan-y</code>, and require an explicit click or focus gesture before capturing continuous orbital gestures.
            </div>
          </article>

          <!-- Law 3 -->
          <article class="ux-law-item">
            <div class="ux-law-head">
              <span class="ux-law-num ux-law-num-purple">03</span>
              <h3 class="ux-law-title">Zero-Flicker Host Token Inheritance</h3>
            </div>
            <p class="ux-law-desc">
              Nothing destroys conversational immersion faster than an iframe flashing a stark <code>#FFFFFF</code> background inside a deeply styled Dark Mode IDE or chat application. An embedded micro-UI cannot impose rigid isolated styles.
            </p>
            <div class="ux-law-rule ux-law-rule-purple">
              <strong>Architectural Rule:</strong> Consume host-injected CSS variables and design tokens (<code>--host-bg-primary</code>, <code>--host-text-primary</code>, <code>--host-border-color</code>, <code>color-scheme: dark light</code>, system typography) to blend natively into the host agent's environment.
            </div>
          </article>

          <!-- Law 4 -->
          <article class="ux-law-item">
            <div class="ux-law-head">
              <span class="ux-law-num ux-law-num-emerald">04</span>
              <h3 class="ux-law-title">Active to Sealed Receipt State (No Zombie UIs)</h3>
            </div>
            <p class="ux-law-desc">
              On the classic web, completing a purchase navigates away to a new URL. In a chat, the widget remains forever visible in the scroll history. This creates the danger of "Zombie UIs": an accidental click 3 days later re-triggering an order on a stale card.
            </p>
            <div class="ux-law-rule ux-law-rule-emerald">
              <strong>Architectural Rule:</strong> Implement an irreversible state transition. Once confirmed, the component destroys its event listeners and heavy graphics contexts (freeing VRAM) and collapses into a compact, read-only "Sealed Receipt" (<em>« Kuro Runner V1 · Deep Indigo, US 9 · Basket Sealed ✅ »</em>).
            </div>
          </article>
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

      <div class="field-ledger">
        <!-- Friction 1 -->
        <article class="ledger-row">
          <div class="ledger-meta">
            <span class="ledger-num">01</span>
            <span class="ledger-tag">Security · Sandbox Iframe</span>
          </div>
          <div class="ledger-content">
            <h3 class="ledger-title">The Sandboxed origin: null CORS Trap</h3>
            <p class="ledger-desc">
              When an agent mounts an interactive Web Component in its chat webview (using <code>srcdoc</code> or isolated iframe without <code>allow-same-origin</code>), the browser enforces <code>origin: "null"</code>. Any outgoing <code>fetch()</code> to store APIs is blocked by browser CORS preflight checks.
            </p>
            <div class="ledger-solution">
              <span class="solution-label">Hardening:</span>
              Self-contained micro-UIs with inlined state and contracts, or unauthenticated read-only endpoint with <code>Access-Control-Allow-Origin: *</code> specifically for agent handshakes.
            </div>
          </div>
        </article>

        <!-- Friction 2 -->
        <article class="ledger-row">
          <div class="ledger-meta">
            <span class="ledger-num">02</span>
            <span class="ledger-tag">Graphics · CSP Restrictions</span>
          </div>
          <div class="ledger-content">
            <h3 class="ledger-title">CSP connect-src 'none' & 3D WebGL Crash</h3>
            <p class="ledger-desc">
              Full-fledged Three.js scenes require streaming multi-megabyte <code>.gltf</code> geometries and allocating GPU WebGL contexts. Sandboxed agent webviews enforce strict CSP headers (<code>connect-src 'none'</code>) and often disable hardware acceleration, causing infinite loading spinners.
            </p>
            <div class="ledger-solution">
              <span class="solution-label">Hardening:</span>
              Tier 2 Snapshot Baking. Pre-render photorealistic PBR angles into base64 data-URIs during CI/CD. 0 ms mount time, 0 WebGL contexts needed, zero CSP network requests.
            </div>
          </div>
        </article>

        <!-- Friction 3 -->
        <article class="ledger-row">
          <div class="ledger-meta">
            <span class="ledger-num">03</span>
            <span class="ledger-tag">Resource Leaks · GPU FinOps</span>
          </div>
          <div class="ledger-content">
            <h3 class="ledger-title">VRAM Accumulation in Multi-Turn Chats</h3>
            <p class="ledger-desc">
              In conversational interfaces, users interact across 20+ turns. If every mounted 3D configurator retains WebGL textures, geometries, and animation frame request loops, the host tab rapidly runs out of GPU memory and gets killed by the OS.
            </p>
            <div class="ledger-solution">
              <span class="solution-label">Hardening:</span>
              Receipt State Transition. Upon clicking Order, immediately dispose of geometries and textures, call <code>gl.getExtension('WEBGL_lose_context')?.loseContext()</code>, and collapse into a static 2D order receipt.
            </div>
          </div>
        </article>

        <!-- Friction 4 -->
        <article class="ledger-row">
          <div class="ledger-meta">
            <span class="ledger-num">04</span>
            <span class="ledger-tag">Context Window · FinOps</span>
          </div>
          <div class="ledger-content">
            <h3 class="ledger-title">The 15,000 SKU Catalog Bloat Trap</h3>
            <p class="ledger-desc">
              Serializing an entire e-commerce database catalog into <code>agent-feed.json</code> results in multi-megabyte payloads. Feeding this to an LLM wastes thousands of input tokens per query ($0.50/request) and causes model context degradation.
            </p>
            <div class="ledger-solution">
              <span class="solution-label">Hardening:</span>
              Expose generic Action Schemas (<code>order_kuro_shoe</code>, <code>search_catalog</code>) rather than static data dumps. The LLM acts as an orchestrator, resolving parametric inventory Just-in-Time.
            </div>
          </div>
        </article>

        <!-- Friction 5 -->
        <article class="ledger-row">
          <div class="ledger-meta">
            <span class="ledger-num">05</span>
            <span class="ledger-tag">Webview Parser · Memory Ceiling</span>
          </div>
          <div class="ledger-content">
            <h3 class="ledger-title">The 700 KB Inline Payload Parse Wall</h3>
            <p class="ledger-desc">
              When embedding interactive micro-UIs inside chat webviews, inlining uncompressed base64 PNG assets (704 KB) causes host chat parsers to silently drop the iframe embed to prevent main-thread UI stutters.
            </p>
            <div class="ledger-solution">
              <span class="solution-label">Hardening:</span>
              Aggressive build-time asset optimization (converting raw PBR captures to 82% quality JPEGs/WebP, dropping total bundle size from 704 KB down to 112 KB). The component mounts instantly at 60 fps without tripping host limits.
            </div>
          </div>
        </article>

        <!-- Friction 6 -->
        <article class="ledger-row">
          <div class="ledger-meta">
            <span class="ledger-num">06</span>
            <span class="ledger-tag">Runtime Spec · Zero-Trust</span>
          </div>
          <div class="ledger-content">
            <h3 class="ledger-title">The Live Iframe Security Wall & MCP Apps Sandbox</h3>
            <p class="ledger-desc">
              Why can't an agent simply inject <code>&lt;iframe src="https://store.com/widget"&gt;</code> into a chat bubble? Because public chats (ChatGPT, Claude.ai) enforce strict CSPs (<code>frame-src 'self'</code>) to prevent phishing and session hijacking. Furthermore, agents in IDEs have a "developer reflex" (modifying local files rather than consuming the feed as external clients).
            </p>
            <div class="ledger-solution">
              <span class="solution-label">Hardening:</span>
              The <strong>MCP Apps specification</strong> (SEP-1865). The host chat downloads the declared bundle into an isolated client-side sandbox (opaque origin, zero cookies, zero network access) communicating exclusively via JSON-RPC 2.0. The first public web contact only occurs upon user click on the checkout handoff.
            </div>
          </div>
        </article>
      </div>
    </section>

    <!-- 6. BREAKOUT APPENDIX: INTERACTIVE PROTOCOL TEST BENCH -->
    <figure class="breakout-figure" id="test-bench">
      <div class="figure-header">
        <span class="figure-badge">● Appendix A · Interactive Protocol Test Bench</span>
        <span style="font-family: var(--font-mono); font-size: 11px; color: var(--accent-subtle);">Live Production Edge CDN · Universal & MCP Apps Prompts</span>
      </div>

      <div class="try-agent-card">
        <div class="try-agent-header">
          <div class="try-agent-title">
            <span>🧪</span>
            <span>Interactive Protocol Test Bench</span>
            <span class="try-agent-badge" style="background: rgba(37, 99, 235, 0.1); color: var(--accent-blue); border-color: rgba(37, 99, 235, 0.25);">● Live Edge CDN</span>
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
                <code class="prompt-text" id="prompt-tier1-text">Hey! Inspect ${publicUrl}/agent-feed.json and order the Kuro Runner V1 using schema text elicitation (no UI).</code>
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
              <span class="prompt-tier-meta" style="color: var(--accent-blue);">⚠ Host Container Required</span>
            </div>

            <div class="prompt-box">
              <div class="prompt-box-top">
                <code class="prompt-text" id="prompt-tier2-text">Hey! I want to configure and buy the Kuro Runner V1 from ${publicUrl}/ — mount the interactive configurator widget in this chat!</code>
                <button id="copy-btn-tier2" class="btn btn-primary copy-btn" aria-label="Copy Tier 2 prompt">
                  Copy
                </button>
              </div>
            </div>

            <p style="font-size: var(--text-xs); color: var(--accent-muted); line-height: 1.5; margin: 0;">
              <strong>Why doesn't this mount in vanilla ChatGPT or Claude.ai?</strong> Public web chats sanitize arbitrary iframes from LLM responses for security. Tier 2 requires a host application implementing the <strong>MCP Apps specification</strong> (SEP-1865).
            </p>

            <div style="font-size: var(--text-xs); color: #1d4ed8; background: rgba(37, 99, 235, 0.05); border: 1px solid rgba(37, 99, 235, 0.2); padding: 8px 12px; border-radius: var(--radius-sm); line-height: 1.5;">
              💡 <strong>Want to see it render live in your agent chat right now?</strong> Clone the repo locally (<code>git clone https://github.com/QuentinMerle/kuro-agentic-web.git</code>). In an agentic IDE (Cursor, Windsurf, Antigravity with Generative UI), your local agent can serve and mount <code>/widget.html</code> directly into your chat panel!
            </div>

            <div style="margin-top: var(--space-150); display: flex; gap: var(--space-100); align-items: center; flex-wrap: wrap;">
              <a href="/agent.html" class="btn btn-secondary" style="font-family: var(--font-mono); font-size: 11px; padding: 4px 10px;">
                ▶ Test in Simulated Host Runner (/agent)
              </a>
              <a href="https://github.com/QuentinMerle/kuro-agentic-web" target="_blank" rel="noopener" class="btn btn-secondary" style="font-family: var(--font-mono); font-size: 11px; padding: 4px 10px;">
                📦 Clone Repo for Local IDE Chat
              </a>
              <a href="/widget.html" target="_blank" rel="noopener" class="btn btn-secondary" style="font-family: var(--font-mono); font-size: 11px; padding: 4px 10px;">
                ↗ Open Raw Widget
              </a>
            </div>
          </div>
        </div>
      </div>
      <figcaption class="figure-caption">
        <strong>Appendix A · Empirical Verification:</strong> Execute these live prompts against production Edge CDN endpoints in ChatGPT, Claude, or local agentic workspaces.
      </figcaption>
    </figure>

    <!-- 7. SYNTHESIS & ARCHITECTURAL REFLECTION -->
    <section class="content-section" id="synthesis">
      <div class="section-header">
        <span class="section-label">Architectural Synthesis & Discussion</span>
        <h2 class="section-title">The Agent/Host Ping-Pong : Beyond the Single-Shot Action</h2>
        <p class="section-subtitle">
          Transitioning from a static request-response model to a living, bidirectional conversational loop.
        </p>
      </div>

      <div class="synthesis-container">
        <!-- Lead Manifesto -->
        <div class="synthesis-lead-card">
          <div class="synthesis-lead-badge">
            <span>⚡</span> The Paradigm Shift
          </div>
          <p class="synthesis-lead-text">
            « Unlike the basic sneaker purchase scenario (request → form → validation), complex technical workflows—financial simulations, parametric CAD tools, IDEs, collaborative spreadsheets—demand continuous feedback. The AI agent and the front-end runtime (JavaScript / WebAssembly) engage in a permanent architectural ping-pong. »
          </p>
        </div>

        <!-- 3 Pillars Grid -->
        <div class="synthesis-grid">
          <!-- Pillar 1 -->
          <article class="synthesis-card">
            <div class="synthesis-card-head">
              <div class="synthesis-card-icon" style="background: rgba(37, 99, 235, 0.08); color: #2563eb;">
                🔄
              </div>
              <div>
                <h3 class="synthesis-card-title">The Exchange Mechanism</h3>
                <span class="synthesis-card-subtitle">Living Synchronous Loop</span>
              </div>
            </div>
            <div class="synthesis-card-body">
              <p>
                The agent invokes a tool; the site's local in-memory JavaScript/Wasm engine computes state mutations in single-digit milliseconds, then returns a structured JSON payload (delta results, spatial constraints, telemetry).
              </p>
              <div class="synthesis-card-item">
                <strong>60 FPS Chat Canvas Updates</strong>
                The LLM digests this feedback, refines its reasoning trajectory, and immediately dispatches subsequent actions. The ephemeral micro-UI in the chat stream updates live without a full page reload.
              </div>
            </div>
          </article>

          <!-- Pillar 2 -->
          <article class="synthesis-card">
            <div class="synthesis-card-head">
              <div class="synthesis-card-icon" style="background: rgba(16, 185, 129, 0.08); color: #059669;">
                🧱
              </div>
              <div>
                <h3 class="synthesis-card-title">Required Technical Primitives</h3>
                <span class="synthesis-card-subtitle">Infrastructure Prereqs</span>
              </div>
            </div>
            <div class="synthesis-card-body">
              <div class="synthesis-card-item">
                <strong>1. The Stateful Context</strong>
                Unlike the traditional stateless web (HTTP), the WebMCP bridge maintains an active in-memory JavaScript session so ongoing mutations and undo stacks are preserved between turns.
              </div>
              <div class="synthesis-card-item">
                <strong>2. Bidirectional JSON-RPC Events</strong>
                Asymmetric notification channels (<code>tools/call</code> from agent → host, <code>notifications/state-update</code> from host → agent) allowing both the model and the UI to broadcast state mutations reactively.
              </div>
            </div>
          </article>

          <!-- Pillar 3 -->
          <article class="synthesis-card">
            <div class="synthesis-card-head">
              <div class="synthesis-card-icon" style="background: rgba(225, 29, 72, 0.08); color: #e11d48;">
                ⚠️
              </div>
              <div>
                <h3 class="synthesis-card-title">Production Bottlenecks</h3>
                <span class="synthesis-card-subtitle">Physical System Limits</span>
              </div>
            </div>
            <div class="synthesis-card-body">
              <div class="synthesis-card-item">
                <strong>• LLM Token Generation Latency</strong>
                Front-end JS computes in milliseconds, but LLMs require hundreds of milliseconds to generate tokens. The pace is an augmented conversation, never a high-FPS twitch game.
              </div>
              <div class="synthesis-card-item">
                <strong>• Context Drift & Hallucination</strong>
                As multi-turn exchanges lengthen, state hallucination risks surge if the UI mutates data off-screen without broadcasting strict telemetry updates back to the LLM.
              </div>
              <div class="synthesis-card-item">
                <strong>• Token Budget Saturation</strong>
                If the front-end returns bloated payloads on every turn, the LLM context window exhausts in minutes. Lean delta serialization is mandatory.
              </div>
            </div>
          </article>
        </div>

        <!-- Philosophical Conclusion Banner -->
        <div class="synthesis-quote-card">
          <div class="synthesis-quote-label">The Philosophical Conclusion</div>
          <blockquote class="synthesis-quote-text">
            « We are colliding with the exact same engineering brick walls encountered across every prior technological epoch—state synchronization, cache coherence, distributed consistency, and security boundaries—now transposed onto LLM runtimes. The technologies evolve, but the architectural battles remain eternal. »
          </blockquote>
          <div class="synthesis-quote-sub">
            — Quentin Merle · Engineering REX #04
          </div>
        </div>
      </div>
    </section>

    <!-- 8. FAQ ACCORDION -->
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
            <span>What is the architectural difference between an MCP Server and MCP Apps (WebMCP)?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            <p style="margin-bottom: 8px;">This distinction is essential to understand where execution takes place:</p>
            <ul style="margin: 0 0 8px 20px; line-height: 1.6;">
              <li><strong>MCP Server (Model Context Protocol) :</strong> A backend or local process (running via <code>stdio</code> or HTTP <code>SSE</code>) designed to give LLMs headless access to databases, files, and external APIs. It lives entirely in the data plane and returns text/JSON payloads with zero visual rendering.</li>
              <li><strong>MCP Apps / WebMCP (SEP-1865) :</strong> A client-side standard for embedding ephemeral, sandboxed Micro-UIs directly inside conversational canvases (ChatGPT, Claude, Cursor). It lives in the visual/interaction plane, communicating bidirectionally with the host agent via typed JSON-RPC <code>postMessage</code> to provide 60 fps tactile feedback, spatial inspection, and sovereign biometric checkout.</li>
            </ul>
          </div>
        </div>

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
        <div style="display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-mono); font-size: 11px; color: #1d4ed8; background: rgba(37, 99, 235, 0.06); border: 1px solid rgba(37, 99, 235, 0.2); padding: 5px 14px; border-radius: var(--radius-full); margin-top: 6px;">
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

  // Setup Scrollytelling 4-Act Engineering Lab
  setupScrollytelling(container);

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

  function setupScrollytelling(root: HTMLElement): void {
    const actCards = root.querySelectorAll<HTMLElement>(".scrolly-act-card");
    const tabBtns = root.querySelectorAll<HTMLButtonElement>(".sim-tab-btn");
    const panels = root.querySelectorAll<HTMLElement>(".sim-panel");
    const codePanels = root.querySelectorAll<HTMLElement>(".sim-code-panel");
    const windowTitle = root.querySelector<HTMLElement>("#sim-window-title");
    const simShoeImg = root.querySelector<HTMLImageElement>("#sim-shoe-img");
    const simColorBtns = root.querySelectorAll<HTMLButtonElement>(".sim-color-btn");
    const touchIdBtn = root.querySelector<HTMLButtonElement>("#sim-touchid-btn");
    const touchIdFeedback = root.querySelector<HTMLElement>("#sim-touchid-feedback");

    // Option A: Code Protocol Elements
    const simWindow = root.querySelector<HTMLElement>("#scrolly-sim-window");
    const modeBtns = root.querySelectorAll<HTMLButtonElement>(".sim-mode-btn");
    const codeFilename = root.querySelector<HTMLElement>("#sim-code-filename");
    const codeLang = root.querySelector<HTMLElement>("#sim-code-lang");
    const codeFooterLeft = root.querySelector<HTMLElement>("#sim-code-footer-left");
    const codeFooterRight = root.querySelector<HTMLElement>("#sim-code-footer-right");
    const copyBtn = root.querySelector<HTMLButtonElement>("#sim-code-copy-btn");
    const copyText = root.querySelector<HTMLElement>("#sim-copy-text");

    if (!actCards.length || !panels.length) return;

    let currentAct = 1;
    let currentMode: "preview" | "code" = "preview";

    const previewTitles: Record<number, string> = {
      1: "● Kuro Agent Host · Act 01 (Text Elicitation)",
      2: "● Kuro Agent Host · Act 02 (Sandboxed Micro-UI)",
      3: "● Kuro Agent Host · Act 03 (3D Failure & Snapshot)",
      4: "● Kuro Agent Host · Act 04 (Sovereign Receipt)"
    };

    const codeTitles: Record<number, string> = {
      1: "● Kuro Protocol · Act 01 (agent-feed.json)",
      2: "● Kuro Protocol · Act 02 (widget-protocol.ts)",
      3: "● Kuro Protocol · Act 03 (bake-pbr-snapshots.ts)",
      4: "● Kuro Protocol · Act 04 (sign-intent.ts)"
    };

    const codeMeta: Record<number, { file: string; lang: string; left: string; right: string }> = {
      1: {
        file: "public/agent-feed.json",
        lang: "JSON",
        left: "Spec: Agentic Commerce RSS",
        right: "● Zero Scraping Required"
      },
      2: {
        file: "src/bridge/widget-protocol.ts",
        lang: "TypeScript",
        left: "Isolation: Opaque Null Origin",
        right: "● Zero LocalStorage Leak"
      },
      3: {
        file: "scripts/bake-pbr-snapshots.ts",
        lang: "TypeScript",
        left: "Build Time: 1.4s Headless Render",
        right: "● Zero Client GPU Overhead"
      },
      4: {
        file: "src/security/sign-intent.ts",
        lang: "TypeScript",
        left: "Mandate: Web Crypto API (Subtle)",
        right: "● Anti-Prompt Injection Proof"
      }
    };

    const rawCodeSnippets: Record<number, string> = {
      1: `{
  "$schema": "https://kuro.run/schemas/agentic-feed.v1.json",
  "id": "kuro-runner-v1",
  "name": "Kuro Runner V1",
  "pricing": { "amount": 185.00, "currency": "USD" },
  "interactive_surface": {
    "type": "sandboxed-iframe",
    "endpoint": "https://kuro-agentic-web.vercel.app/widget.html",
    "sandbox": "allow-scripts",
    "dimensions": { "width": 420, "height": 380 }
  },
  "action_intent": {
    "name": "ORDER_KURO_SHOE",
    "required_slots": ["size", "color"]
  }
}`,
      2: `export interface KuroCartIntent {
  type: 'KURO_CART_INTENT';
  sku: string;
  size: number;
  color: 'indigo' | 'obsidian' | 'chalk';
  price: number;
}

window.addEventListener('message', (event: MessageEvent<KuroCartIntent>) => {
  if (event.origin !== 'https://kuro-agentic-web.vercel.app') return;

  if (event.data?.type === 'KURO_CART_INTENT') {
    const { sku, size, color } = event.data;
    agentHost.commitState({ sku, size, color, ready: true });
  }
});`,
      3: `import { chromium } from 'playwright';

export async function bakeColorwaySnapshot(colorway: string): Promise<Buffer> {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  await page.goto(\`https://kuro-agentic-web.vercel.app/bake?color=\${colorway}\`);
  await page.waitForFunction(() => window.__THREE_BAKE_DONE__ === true);

  const buffer = await page.screenshot({ type: 'png', omitBackground: true });
  await browser.close();
  return buffer;
}`,
      4: `export async function signCheckoutMandate(cart: KuroCart): Promise<Mandate> {
  const payload = JSON.stringify({
    sku: cart.sku,
    amount: 185.00,
    currency: 'USD',
    nonce: crypto.randomUUID(),
    expiresAt: Date.now() + 900_000
  });

  const msgBytes = new TextEncoder().encode(payload);
  const buf = await crypto.subtle.digest('SHA-256', msgBytes);
  const digest = Array.from(new Uint8Array(buf))
    .map(b => b.toString(16).padStart(2, '0')).join('');

  return {
    signature: \`kuro_sig_\${digest.slice(0, 16)}\`,
    settlementUrl: \`https://kuro-agentic-web.vercel.app/checkout?sig=\${digest}\`
  };
}`
    };

    const updateTitle = () => {
      if (!windowTitle) return;
      windowTitle.textContent =
        currentMode === "preview"
          ? (previewTitles[currentAct] || "● Kuro Agent Host")
          : (codeTitles[currentAct] || "● Kuro Protocol");
    };

    const activateAct = (actNum: number, scrollIntoView = false) => {
      currentAct = actNum;

      // Update narrative cards
      actCards.forEach((card) => {
        const num = Number(card.dataset.act);
        if (num === actNum) {
          card.classList.add("is-active");
          if (scrollIntoView) {
            card.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        } else {
          card.classList.remove("is-active");
        }
      });

      // Update tabs
      tabBtns.forEach((btn) => {
        const target = Number(btn.dataset.targetAct);
        btn.classList.toggle("active", target === actNum);
      });

      // Update preview panels
      panels.forEach((p, idx) => {
        p.classList.toggle("active", idx + 1 === actNum);
      });

      // Update code panels
      codePanels.forEach((p, idx) => {
        p.classList.toggle("active", idx + 1 === actNum);
      });

      // Update code metadata
      const meta = codeMeta[actNum];
      if (meta) {
        if (codeFilename) codeFilename.textContent = meta.file;
        if (codeLang) codeLang.textContent = meta.lang;
        if (codeFooterLeft) codeFooterLeft.textContent = meta.left;
        if (codeFooterRight) codeFooterRight.textContent = meta.right;
      }

      updateTitle();
    };

    // Mode Toggle (UI Preview vs Code Protocol)
    modeBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const mode = btn.dataset.mode as "preview" | "code";
        if (!mode || mode === currentMode) return;
        currentMode = mode;

        modeBtns.forEach((b) => b.classList.toggle("active", b === btn));
        simWindow?.classList.toggle("is-code-mode", currentMode === "code");
        updateTitle();
      });
    });

    // Copy Code Button
    copyBtn?.addEventListener("click", async () => {
      const code = rawCodeSnippets[currentAct];
      if (!code) return;
      try {
        await navigator.clipboard.writeText(code);
        copyBtn.classList.add("copied");
        if (copyText) copyText.textContent = "Copied!";
        setTimeout(() => {
          copyBtn.classList.remove("copied");
          if (copyText) copyText.textContent = "Copy";
        }, 2000);
      } catch (err) {
        console.error("Clipboard copy failed", err);
      }
    });

    // Tab buttons click to switch act
    tabBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        const target = Number(btn.dataset.targetAct);
        if (target) activateAct(target, true);
      });
    });

    // Swatches in panel 2
    const colorMap: Record<string, string> = {
      "Deep Indigo": "/images/kuro-indigo.png",
      "Obsidian Black": "/images/kuro-obsidian.png",
      "Raw Chalk": "/images/kuro-chalk.png"
    };

    simColorBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        simColorBtns.forEach((b) => {
          b.style.borderColor = "var(--border-subtle)";
          b.style.background = "var(--bg-card)";
          b.style.color = "var(--accent-muted)";
        });
        btn.style.borderColor = "var(--accent-cyan)";
        btn.style.background = "rgba(56, 189, 248, 0.1)";
        btn.style.color = "var(--accent-cyan)";

        const color = btn.dataset.color || "Deep Indigo";
        if (simShoeImg && colorMap[color]) {
          simShoeImg.style.opacity = "0.3";
          setTimeout(() => {
            simShoeImg.src = colorMap[color];
            simShoeImg.style.opacity = "1";
          }, 100);
        }
      });
    });

    // Touch ID button in panel 4
    touchIdBtn?.addEventListener("click", () => {
      if (touchIdFeedback) {
        touchIdFeedback.style.display = "block";
        touchIdBtn.style.background = "var(--accent-success)";
        touchIdBtn.style.color = "#ffffff";
        touchIdBtn.textContent = "✓ Biometric Signature Confirmed";
      }
    });

    // IntersectionObserver for scroll-driven switching
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const actNum = Number((entry.target as HTMLElement).dataset.act);
              if (actNum) activateAct(actNum, false);
            }
          });
        },
        {
          rootMargin: "-25% 0px -45% 0px",
          threshold: 0.1
        }
      );

      actCards.forEach((card) => observer.observe(card));
    }
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
