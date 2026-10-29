import { shopStore } from "../core/store.ts";

export function initCartDrawer(container: HTMLElement): void {
  function render(): void {
    const state = shopStore.getState();
    const isOpen = state.isCartDrawerOpen;
    const cart = state.cart;
    const totalAmount = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    const primaryItem = cart[0];
    const deepLinkUrl = primaryItem
      ? `/checkout?sku=${encodeURIComponent(primaryItem.sku)}&source=agent_feed`
      : "#";

    container.innerHTML = `
      <div class="drawer-backdrop ${isOpen ? "open" : ""}" id="cart-backdrop"></div>
      <aside class="drawer-panel ${isOpen ? "open" : ""}" role="dialog" aria-label="Shopping Cart">
        <div class="drawer-header">
          <div>
            <h2 style="font-size: var(--text-lg); font-weight: 600;">Active Cart</h2>
            <p style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono);">
              In-memory DOM session
            </p>
          </div>
          <button id="close-cart-btn" class="btn btn-secondary" style="padding: var(--space-50) var(--space-100);" aria-label="Close cart">
            ✕
          </button>
        </div>

        <div class="drawer-body">
          ${
            cart.length === 0
              ? `
              <div style="text-align: center; padding: var(--space-600) 0; color: var(--accent-muted);">
                <p style="font-size: var(--text-sm);">Your cart is empty.</p>
                <p style="font-size: var(--text-xs); margin-top: var(--space-100);">
                  Select options above or trigger an in-DOM WebMCP action.
                </p>
              </div>
            `
              : `
              <div style="display: flex; flex-direction: column; gap: var(--space-200);">
                ${cart
                  .map(
                    (item) => `
                  <div style="
                    background: var(--bg-surface);
                    border: 1px solid var(--border-subtle);
                    border-radius: var(--radius-md);
                    padding: var(--space-200);
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                  ">
                    <div>
                      <div style="font-weight: 600; font-size: var(--text-sm);">${item.productName}</div>
                      <div style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono); margin-top: 2px;">
                        ${item.color} · Size ${item.size} US
                      </div>
                      <div style="font-size: var(--text-xs); color: var(--accent-subtle); font-family: var(--font-mono);">
                        SKU: ${item.sku}
                      </div>
                    </div>
                    <div style="text-align: right;">
                      <div style="font-weight: 600; font-family: var(--font-mono); font-size: var(--text-sm);">$${item.price}</div>
                      <div style="font-size: var(--text-xs); color: var(--accent-muted);">Qty: ${item.quantity}</div>
                    </div>
                  </div>
                `
                  )
                  .join("")}
              </div>

              <!-- Handoff Deep Link Section -->
              <div style="
                margin-top: auto; 
                padding: var(--space-300); 
                background: var(--bg-surface); 
                border: 1px solid var(--border-subtle); 
                border-radius: var(--radius-lg);
              ">
                <div style="display: flex; justify-content: space-between; align-items: baseline; margin-bottom: var(--space-200);">
                  <span style="font-size: var(--text-sm); color: var(--accent-muted);">Subtotal</span>
                  <span style="font-size: var(--text-2xl); font-weight: 700; font-family: var(--font-mono);">$${totalAmount}</span>
                </div>

                <div style="margin-bottom: var(--space-200);">
                  <span class="option-label" style="display: block; margin-bottom: 4px;">Delegated Checkout Handoff</span>
                  <div class="json-viewer" style="font-size: 11px; word-break: break-all; padding: 8px;">
                    ${deepLinkUrl}
                  </div>
                </div>

                <a 
                  href="${deepLinkUrl}" 
                  class="btn btn-primary" 
                  style="width: 100%; text-align: center; justify-content: center;"
                  onclick="alert('Handoff Simulation: Redirecting to Stripe / Shopify Checkout with locked SKU.'); return false;"
                >
                  Pay with Apple Pay or Card
                </a>
              </div>
            `
          }
        </div>
      </aside>
    `;

    container.querySelector("#cart-backdrop")?.addEventListener("click", () => {
      shopStore.toggleCartDrawer(false);
    });

    container.querySelector("#close-cart-btn")?.addEventListener("click", () => {
      shopStore.toggleCartDrawer(false);
    });
  }

  shopStore.subscribe(() => {
    render();
  });
}
