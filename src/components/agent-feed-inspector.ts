import { shopStore } from "../core/store.ts";

export function initFeedInspector(container: HTMLElement): void {
  let activeTab: "feed" | "webmcp" = "feed";
  let executionLog: string | null = null;

  async function fetchFeedContent(): Promise<string> {
    try {
      const res = await fetch("/agent-feed.json");
      const json = await res.json();
      return JSON.stringify(json, null, 2);
    } catch {
      return "// Impossible de charger /agent-feed.json";
    }
  }

  function getWebMCPContent(): string {
    if (!navigator.modelContext) {
      return "// navigator.modelContext non initialisé";
    }
    const tools = navigator.modelContext.listTools().map((t) => ({
      name: t.name,
      description: t.description,
      parameters: t.parameters,
    }));
    return JSON.stringify({ inDomTools: tools }, null, 2);
  }

  async function render(): Promise<void> {
    const state = shopStore.getState();
    const isOpen = state.isFeedInspectorOpen;
    const feedJson = await fetchFeedContent();
    const webmcpJson = getWebMCPContent();

    container.innerHTML = `
      <div class="drawer-backdrop ${isOpen ? "open" : ""}" id="inspector-backdrop"></div>
      <aside class="drawer-panel ${isOpen ? "open" : ""}" role="dialog" aria-label="Inspecteur de flux agentique">
        <div class="drawer-header">
          <div>
            <h2 style="font-size: var(--text-lg); font-weight: 600;">Inspecteur Agentique</h2>
            <p style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono);">
              Ce que l'IA découvre sur cette page
            </p>
          </div>
          <button id="close-inspector-btn" class="btn btn-secondary" style="padding: var(--space-50) var(--space-100);" aria-label="Fermer l'inspecteur">
            ✕
          </button>
        </div>

        <div class="drawer-body">
          <div style="display: flex; gap: var(--space-75); border-bottom: 1px solid var(--border-subtle); padding-bottom: var(--space-100);">
            <button 
              id="tab-feed-btn" 
              class="btn ${activeTab === "feed" ? "btn-primary" : "btn-secondary"}" 
              style="flex: 1; font-size: var(--text-xs);"
            >
              1. RSS de l'IA (/agent-feed.json)
            </button>
            <button 
              id="tab-webmcp-btn" 
              class="btn ${activeTab === "webmcp" ? "btn-primary" : "btn-secondary"}" 
              style="flex: 1; font-size: var(--text-xs);"
            >
              2. WebMCP (In-DOM)
            </button>
          </div>

          ${
            activeTab === "feed"
              ? `
              <div>
                <p style="font-size: var(--text-xs); color: var(--accent-muted); margin-bottom: var(--space-100);">
                  Manifeste statique découvert à froid par les agents externes (IDE, CLI, Desktop) en 15 ms via une requête HTTP simple :
                </p>
                <pre class="json-viewer"><code>${escapeHtml(feedJson)}</code></pre>
              </div>
            `
              : `
              <div>
                <p style="font-size: var(--text-xs); color: var(--accent-muted); margin-bottom: var(--space-100);">
                  Outils enregistrés dynamiquement dans <code>navigator.modelContext</code>, exploitables en 0 ms par l'IA native du navigateur :
                </p>
                <pre class="json-viewer"><code>${escapeHtml(webmcpJson)}</code></pre>

                <div style="margin-top: var(--space-300);">
                  <button 
                    id="trigger-calltool-btn" 
                    class="btn btn-primary" 
                    style="width: 100%;"
                  >
                    Simuler l'appel Agent (order_kuro_shoe)
                  </button>
                </div>

                ${
                  executionLog
                    ? `
                  <div style="margin-top: var(--space-200);">
                    <span class="option-label">Résultat de l'appel execute() :</span>
                    <pre class="json-viewer" style="margin-top: 4px; color: var(--accent-success);"><code>${escapeHtml(executionLog)}</code></pre>
                  </div>
                `
                    : ""
                }
              </div>
            `
          }
        </div>
      </aside>
    `;

    container.querySelector("#inspector-backdrop")?.addEventListener("click", () => {
      shopStore.toggleFeedInspector(false);
    });

    container.querySelector("#close-inspector-btn")?.addEventListener("click", () => {
      shopStore.toggleFeedInspector(false);
    });

    container.querySelector("#tab-feed-btn")?.addEventListener("click", () => {
      activeTab = "feed";
      render();
    });

    container.querySelector("#tab-webmcp-btn")?.addEventListener("click", () => {
      activeTab = "webmcp";
      render();
    });

    container.querySelector("#trigger-calltool-btn")?.addEventListener("click", async () => {
      if (navigator.modelContext) {
        try {
          const res = await navigator.modelContext.callTool("order_kuro_shoe", {
            size: 42,
            color: "Deep Indigo",
          });
          executionLog = JSON.stringify(res, null, 2);
        } catch (err) {
          executionLog = `Erreur: ${String(err)}`;
        }
        render();
      }
    });
  }

  function escapeHtml(str: string): string {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  shopStore.subscribe(() => {
    render();
  });
}
