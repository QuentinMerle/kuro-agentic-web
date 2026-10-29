import type { AgentFeedManifest } from "../core/types.ts";

export function initAgentHost(container: HTMLElement): void {
  let activeMode: "step1-schema" | "step2-mcp-app" = "step2-mcp-app";
  let orderResult: { sku: string; productName: string; color: string; size: number; price: number } | null = null;
  let textSelectedColor = "Deep Indigo";
  let textSelectedSize = 42;

  async function loadManifest(): Promise<AgentFeedManifest | null> {
    try {
      const res = await fetch("/agent-feed.json");
      return await res.json();
    } catch (e) {
      console.error("[AgentHost] Failed to fetch /agent-feed.json:", e);
      return null;
    }
  }

  function render(): void {
    const deepLinkUrl = orderResult
      ? `/checkout?sku=${encodeURIComponent(orderResult.sku)}&source=agent_feed`
      : "#";

    container.innerHTML = `
      <div class="ide-wrapper">
        <!-- Top IDE Mock Bar -->
        <header class="ide-header">
          <div class="ide-title">
            <span class="ide-dot"></span>
            <span>ANTIGRAVITY / MCP AGENT CHAT (420PX)</span>
          </div>
          <div class="ide-actions">
            <a href="/" class="ide-link">← Return to Store</a>
          </div>
        </header>

        <!-- Mode Switcher -->
        <div class="mode-bar">
          <button 
            id="btn-mode-step1" 
            class="mode-btn ${activeMode === "step1-schema" ? "active" : ""}"
          >
            Step 1: Schema-Only (Text)
          </button>
          <button 
            id="btn-mode-step2" 
            class="mode-btn ${activeMode === "step2-mcp-app" ? "active" : ""}"
          >
            Step 2: MCP App (3D UI)
          </button>
        </div>

        <!-- Chat Stream (420px width) -->
        <main class="chat-stream">
          <!-- Cold Discovery Log -->
          <div class="discovery-pill">
            <span>⚡ Cold Discovery via HTTP GET /agent-feed.json (15 ms) · Zero Headless Chromium</span>
          </div>

          <!-- User Message -->
          <div class="msg msg-user">
            <div class="msg-author">You</div>
            <div class="msg-bubble">
              I want to order a pair of Kuro Runner V1 sneakers from the PoC store.
            </div>
          </div>

          <!-- Agent Response -->
          <div class="msg msg-agent">
            <div class="msg-author">Agent (Antigravity)</div>
            <div class="msg-bubble">
              ${
                activeMode === "step1-schema"
                  ? `
                  <p style="margin-bottom: 12px;">
                    I discovered the tool <code>order_kuro_shoe</code> with input schema parameters. Please pick your configuration:
                  </p>

                  <div class="text-elicitation-box">
                    <div class="field">
                      <label>Colorway (Enum)</label>
                      <select id="text-color-select" class="select-input">
                        <option value="Obsidian Black" ${textSelectedColor === "Obsidian Black" ? "selected" : ""}>Obsidian Black</option>
                        <option value="Deep Indigo" ${textSelectedColor === "Deep Indigo" ? "selected" : ""}>Deep Indigo</option>
                        <option value="Raw Chalk" ${textSelectedColor === "Raw Chalk" ? "selected" : ""}>Raw Chalk</option>
                      </select>
                    </div>

                    <div class="field" style="margin-top: 8px;">
                      <label>Size (Enum)</label>
                      <select id="text-size-select" class="select-input">
                        <option value="40" ${textSelectedSize === 40 ? "selected" : ""}>40 EU</option>
                        <option value="41" ${textSelectedSize === 41 ? "selected" : ""}>41 EU</option>
                        <option value="42" ${textSelectedSize === 42 ? "selected" : ""}>42 EU</option>
                        <option value="43" ${textSelectedSize === 43 ? "selected" : ""}>43 EU</option>
                        <option value="44" ${textSelectedSize === 44 ? "selected" : ""}>44 EU</option>
                      </select>
                    </div>

                    <button id="text-submit-btn" class="btn btn-primary" style="margin-top: 12px; width: 100%;">
                      Execute order_kuro_shoe
                    </button>
                  </div>

                  <div class="ux-limitation-callout">
                    ⚠️ <strong>UX Limit of Pure Text:</strong> Choosing blindly between "Deep Indigo" and "Obsidian Black" without seeing the sneaker makes no sense for e-commerce.
                  </div>
                `
                  : `
                  <p style="margin-bottom: 12px;">
                    The site provides an interactive 3D configurator (<code>@modelcontextprotocol/ext-apps</code>). I mounted the sandboxed micro-UI below:
                  </p>

                  <!-- Sandboxed MCP App Iframe -->
                  <div class="iframe-card">
                    <div class="iframe-badge">
                      <span>SANDBOX: allow-scripts</span>
                      <span>·</span>
                      <span>JSON-RPC 2.0</span>
                    </div>
                    <iframe 
                      id="mcp-app-iframe"
                      src="/mcp-app.html" 
                      sandbox="allow-scripts"
                      title="Kuro 3D Configurator MCP App"
                      style="width: 100%; height: 490px; border: none;"
                    ></iframe>
                  </div>
                `
              }
            </div>
          </div>

          <!-- Order Confirmation from PostMessage -->
          ${
            orderResult
              ? `
              <div class="msg msg-agent">
                <div class="msg-author">Agent (Antigravity)</div>
                <div class="msg-bubble highlight-success">
                  <div style="font-size: 15px; font-weight: 600; margin-bottom: 4px;">
                    Order Prepared: ${orderResult.productName}
                  </div>
                  <div style="font-family: monospace; font-size: 12px; color: var(--accent-muted); margin-bottom: 12px;">
                    SKU: ${orderResult.sku} · Price: $${orderResult.price}
                  </div>

                  <p style="font-size: 13px; color: var(--accent-muted); margin-bottom: 12px;">
                    Sensitive credit card tokens never pass through the LLM. Complete your order via the pre-filled checkout link:
                  </p>

                  <div class="json-viewer" style="font-size: 11px; margin-bottom: 12px; word-break: break-all;">
                    ${deepLinkUrl}
                  </div>

                  <a 
                    href="${deepLinkUrl}" 
                    class="btn btn-primary" 
                    style="width: 100%; text-align: center; justify-content: center;"
                    onclick="alert('Handoff Simulation: Redirecting to Stripe / Shopify Checkout with locked SKU.'); return false;"
                  >
                    Proceed to 1-Click Checkout ($${orderResult.price})
                  </a>
                </div>
              </div>
            `
              : ""
          }
        </main>
      </div>
    `;

    bindEvents();
  }

  function bindEvents(): void {
    container.querySelector("#btn-mode-step1")?.addEventListener("click", () => {
      activeMode = "step1-schema";
      orderResult = null;
      render();
    });

    container.querySelector("#btn-mode-step2")?.addEventListener("click", () => {
      activeMode = "step2-mcp-app";
      orderResult = null;
      render();
    });

    container.querySelector("#text-color-select")?.addEventListener("change", (e) => {
      textSelectedColor = (e.target as HTMLSelectElement).value;
    });

    container.querySelector("#text-size-select")?.addEventListener("change", (e) => {
      textSelectedSize = Number((e.target as HTMLSelectElement).value);
    });

    container.querySelector("#text-submit-btn")?.addEventListener("click", () => {
      orderResult = {
        sku: `KURO-V1-${textSelectedColor}-${textSelectedSize}`,
        productName: "Kuro Runner V1",
        color: textSelectedColor,
        size: textSelectedSize,
        price: 185,
      };
      render();
    });
  }

  // Listen to JSON-RPC 2.0 messages from the sandboxed MCP App iframe
  window.addEventListener("message", (event) => {
    const data = event.data;
    if (data && data.jsonrpc === "2.0") {
      if (data.method === "ui/notifications/action") {
        const payload = data.params?.data;
        if (payload) {
          orderResult = payload;
          render();
        }
      } else if (data.method === "ui/notifications/ready") {
        console.info("[AgentHost] Received MCP App ready handshake:", data.params);
      }
    }
  });

  loadManifest().then(() => {
    render();
  });
}
