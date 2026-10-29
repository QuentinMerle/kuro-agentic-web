import { shopStore } from "../core/store.ts";

export function initNavBar(container: HTMLElement): void {
  function render(): void {
    const state = shopStore.getState();
    const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);

    container.innerHTML = `
      <header class="floating-nav" role="banner">
        <a href="#" class="brand-badge" aria-label="Kuro Footwear Home">
          <span class="brand-dot"></span>
          <span>KURO · REX #04</span>
        </a>

        <nav class="nav-links" aria-label="Main Navigation">
          <a href="#test-bench" class="nav-link">Test Bench</a>
          <a href="#configurator-stage" class="nav-link">Storefront Subject</a>
          <a href="#telemetry" class="nav-link">Telemetry</a>
          <a href="#frictions" class="nav-link">Frictions Log</a>
          <a href="#faq" class="nav-link">Technical Q&A</a>
        </nav>

        <div class="nav-actions">
          <a 
            href="/agent.html" 
            class="btn btn-feed-pill"
            style="color: #79C0FF; border-color: #388BFD33;"
            title="Open simulated IDE / Desktop AI Agent interface"
          >
            <span>🤖</span> Agent Chat Mock
          </a>

          <button 
            id="open-inspector-btn" 
            class="btn btn-feed-pill"
            title="Inspect agent-feed.json and WebMCP live registry"
            aria-label="Inspect agent-feed.json"
          >
            <span style="color: var(--accent-success);">●</span> /agent-feed.json
          </button>

          <button 
            id="open-cart-btn" 
            class="btn btn-secondary" 
            aria-label="View shopping cart (${cartCount} items)"
          >
            <span>Cart</span>
            <span style="
              font-family: var(--font-mono); 
              font-size: var(--text-xs); 
              padding: 2px 6px; 
              background: var(--bg-card-subtle); 
              border-radius: var(--radius-full);
            ">${cartCount}</span>
          </button>
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
