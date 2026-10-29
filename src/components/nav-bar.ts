import { shopStore } from "../core/store.ts";

export function initNavBar(container: HTMLElement): void {
  function render(): void {
    const state = shopStore.getState();
    const cartCount = state.cart.reduce((total, item) => total + item.quantity, 0);

    container.innerHTML = `
      <header class="floating-nav" role="banner">
        <a href="#" class="brand-badge" aria-label="Kuro Footwear Accueil">
          <span class="brand-dot"></span>
          <span>KURO / LAB</span>
        </a>

        <div class="nav-actions">
          <button 
            id="open-inspector-btn" 
            class="btn btn-feed-pill"
            title="Inspecter le flux agent-feed.json et WebMCP"
            aria-label="Inspecter le flux agent-feed.json"
          >
            <span style="color: var(--accent-success);">●</span> /agent-feed.json
          </button>

          <button 
            id="open-cart-btn" 
            class="btn btn-secondary" 
            aria-label="Voir le panier (${cartCount} articles)"
          >
            <span>Panier</span>
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
