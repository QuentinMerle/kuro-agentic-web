import { shopStore } from "../core/store.ts";

export function initNavBar(container: HTMLElement): void {
  function render(): void {
    const state = shopStore.getState();
    const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);

    container.innerHTML = `
      <header class="floating-nav" role="banner">
        <a href="#" class="brand-badge" aria-label="Kuro Footwear Home">
          <span class="brand-dot"></span>
          <span style="font-weight: 700; letter-spacing: -0.02em;">KURO</span>
          <span class="brand-tag">REX #04</span>
        </a>

        <nav class="nav-links" aria-label="Main Navigation">
          <a href="#test-bench" class="nav-link">Bench</a>
          <a href="#configurator-stage" class="nav-link nav-secondary">Storefront</a>
          <a href="#telemetry" class="nav-link">Telemetry</a>
          <a href="#frictions" class="nav-link">Frictions</a>
          <a href="#faq" class="nav-link nav-secondary">Q&A</a>
        </nav>

        <div class="nav-actions">
          <a 
            href="/agent.html" 
            class="btn btn-feed-pill"
            style="color: #79C0FF; border-color: rgba(56, 139, 253, 0.25);"
            title="Open simulated IDE / Desktop AI Agent interface"
          >
            <span>🤖</span> <span>Agent Mock</span>
          </a>

          <button 
            id="open-inspector-btn" 
            class="btn btn-feed-pill"
            title="Inspect agent-feed.json and WebMCP live registry"
            aria-label="Inspect agent-feed.json"
          >
            <span style="color: var(--accent-success);">●</span> <span>/agent-feed.json</span>
          </button>

          <button 
            id="open-cart-btn" 
            class="btn btn-secondary cart-btn" 
            aria-label="View shopping cart (${cartCount} items)"
          >
            <span>Cart</span>
            <span class="cart-badge">${cartCount}</span>
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
