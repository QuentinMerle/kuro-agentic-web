import { shopStore } from "../core/store.ts";

export function initNavBar(container: HTMLElement): void {
  function render(): void {
    const state = shopStore.getState();
    const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);

    container.innerHTML = `
      <header class="site-header" role="banner">
        <div class="header-inner">
          <a href="#" class="brand-badge" aria-label="Kuro Footwear Home">
            <span class="brand-dot"></span>
            <span style="font-weight: 700; letter-spacing: -0.02em;">KURO</span>
            <span class="brand-tag nav-tag-desktop">REX #04</span>
          </a>

          <nav class="nav-links" aria-label="Main Navigation">
            <a href="#hero-title" class="nav-link">Abstract</a>
            <a href="#storyline" class="nav-link">Protocol Spine</a>
            <a href="#telemetry" class="nav-link nav-secondary">Telemetry</a>
            <a href="#configurator-stage" class="nav-link">3D Specimen</a>
            <a href="#ux-laws" class="nav-link nav-secondary">UX Axioms</a>
            <a href="#synthesis" class="nav-link">Synthesis</a>
            <a href="#test-bench" class="nav-link nav-secondary">Test Bench</a>
          </nav>

          <div class="nav-actions">
            <a 
              href="https://github.com/QuentinMerle/kuro-agentic-web" 
              target="_blank" 
              rel="noopener noreferrer" 
              class="btn btn-feed-pill nav-action-github"
              title="View source code on GitHub"
              aria-label="GitHub Repository"
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor"><path fill-rule="evenodd" clip-rule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
              <span class="nav-label-desktop">GitHub</span>
            </a>

            <a 
              href="/agent.html" 
              class="btn btn-feed-pill"
              style="color: #2563eb; border-color: rgba(37, 99, 235, 0.25);"
              title="Open simulated IDE / Desktop AI Agent interface"
            >
              <span>🤖</span> <span class="nav-label-desktop">Agent Mock</span><span class="nav-label-mobile">Mock</span>
            </a>

            <button 
              id="open-inspector-btn" 
              class="btn btn-feed-pill"
              title="Inspect agent-feed.json and WebMCP live registry"
              aria-label="Inspect agent-feed.json"
            >
              <span style="color: var(--accent-success);">●</span> <span class="nav-label-desktop">/agent-feed.json</span><span class="nav-label-mobile">Feed</span>
            </button>

            <button 
              id="open-cart-btn" 
              class="btn btn-secondary cart-btn" 
              aria-label="View shopping cart (${cartCount} items)"
            >
              <span class="nav-label-desktop">Cart</span>
              <span class="cart-badge">${cartCount}</span>
            </button>
          </div>
        </div>
      </header>
    `;

    container.querySelector("#open-inspector-btn")?.addEventListener("click", () => {
      shopStore.toggleFeedInspector(true);
    });

    container.querySelector("#open-cart-btn")?.addEventListener("click", () => {
      shopStore.toggleCartDrawer(true);
    });
  }

  shopStore.subscribe(() => {
    render();
  });
}
