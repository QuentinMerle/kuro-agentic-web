import type { ShoeColor, ShoeSize } from "../core/types.ts";
import { initThreeViewport, type ThreeViewportController } from "./three-viewport.ts";

/**
 * <kuro-configurator> Web Component
 * Dual-context component:
 * - context="web": Dispatches local events / calls navigator.modelContext directly.
 * - context="agent": Embeds inside sandboxed iframe (MCP App ui://) and communicates via JSON-RPC 2.0 postMessage.
 * 
 * Features:
 * - PBR Three.js 360° interactive shoe
 * - Color & size selectors
 * - Receipt State: freezes canvas into 2D snapshot & disposes WebGL context upon order to free VRAM.
 */
export class KuroConfigurator extends HTMLElement {
  private context: "web" | "agent" = "web";
  private selectedColor: ShoeColor = "Deep Indigo";
  private selectedSize: ShoeSize = 9;
  private threeController: ThreeViewportController | null = null;
  private isOrdered = false;

  private inventory: Record<string, number> = {
    "KURO-V1-Obsidian Black-7": 4,
    "KURO-V1-Obsidian Black-8": 7,
    "KURO-V1-Obsidian Black-9": 12,
    "KURO-V1-Obsidian Black-10": 3,
    "KURO-V1-Obsidian Black-11": 1,
    "KURO-V1-Deep Indigo-7": 2,
    "KURO-V1-Deep Indigo-8": 5,
    "KURO-V1-Deep Indigo-9": 8,
    "KURO-V1-Deep Indigo-10": 4,
    "KURO-V1-Deep Indigo-11": 0,
    "KURO-V1-Raw Chalk-7": 6,
    "KURO-V1-Raw Chalk-8": 9,
    "KURO-V1-Raw Chalk-9": 14,
    "KURO-V1-Raw Chalk-10": 5,
    "KURO-V1-Raw Chalk-11": 2,
  };

  static get observedAttributes(): string[] {
    return ["context", "color", "size"];
  }

  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback(): void {
    this.context = (this.getAttribute("context") as "web" | "agent") || "web";
    const initialColor = this.getAttribute("color") as ShoeColor;
    if (initialColor) this.selectedColor = initialColor;
    const initialSize = Number(this.getAttribute("size")) as ShoeSize;
    if (initialSize) this.selectedSize = initialSize;

    this.render();
    this.mount3D();
  }

  attributeChangedCallback(name: string, _oldVal: string, newVal: string): void {
    if (name === "context") {
      this.context = (newVal as "web" | "agent") || "web";
    }
  }

  private mount3D(): void {
    const container = this.shadowRoot?.querySelector("#wc-three-container") as HTMLElement;
    if (!container) return;

    initThreeViewport(container, this.selectedColor)
      .then((ctrl) => {
        this.threeController = ctrl;
      })
      .catch((err) => {
        console.error("[KuroConfigurator] Three.js mount failed:", err);
      });
  }

  private render(): void {
    if (!this.shadowRoot) return;

    const currentSku = `KURO-V1-${this.selectedColor}-${this.selectedSize}`;
    const stock = this.inventory[currentSku] ?? 0;
    const isAvailable = stock > 0;

    const colors: { name: ShoeColor; hex: string }[] = [
      { name: "Obsidian Black", hex: "#181818" },
      { name: "Deep Indigo", hex: "#22355E" },
      { name: "Raw Chalk", hex: "#D8D4C7" },
    ];

    const sizes: ShoeSize[] = [7, 8, 9, 10, 11];

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          font-family: var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif);
          background-color: var(--bg-card, #181818);
          color: var(--accent-primary, #FFFFFF);
          border-radius: 16px;
          border: 1px solid var(--border-subtle, #272727);
          overflow: hidden;
          box-sizing: border-box;
          max-width: 480px;
          margin: 0 auto;
        }

        *, *::before, *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .viewport {
          position: relative;
          height: 280px;
          background-color: #121212;
          border-bottom: 1px solid #272727;
          overflow: hidden;
        }

        .loader-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #9B9B9B;
          font-size: 12px;
          font-family: monospace;
          z-index: 5;
        }

        .hint {
          position: absolute;
          bottom: 8px;
          left: 50%;
          transform: translateX(-50%);
          font-family: monospace;
          font-size: 11px;
          color: #666666;
          background: rgba(24, 24, 24, 0.75);
          padding: 3px 8px;
          border-radius: 9999px;
          border: 1px solid #272727;
          pointer-events: none;
          z-index: 5;
        }

        .body {
          padding: 16px;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .header-row {
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }

        .title {
          font-size: 15px;
          font-weight: 600;
          letter-spacing: -0.01em;
        }

        .price {
          font-family: monospace;
          font-size: 16px;
          font-weight: 700;
        }

        .label {
          font-family: monospace;
          font-size: 11px;
          text-transform: uppercase;
          color: #9B9B9B;
          margin-bottom: 6px;
          display: block;
        }

        .color-row {
          display: flex;
          gap: 8px;
        }

        .color-pill {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px;
          background: #1F1F1F;
          border: 1px solid #272727;
          border-radius: 6px;
          color: #FFFFFF;
          font-size: 11px;
          cursor: pointer;
          transition: border-color 0.2s, background 0.2s;
        }

        .color-pill.active {
          border-color: #FFFFFF;
          background: #313131;
        }

        .swatch {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          border: 1px solid rgba(255,255,255,0.2);
        }

        .size-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }

        .size-btn {
          padding: 8px 0;
          background: #1F1F1F;
          border: 1px solid #272727;
          border-radius: 6px;
          color: #FFFFFF;
          font-family: monospace;
          font-size: 13px;
          cursor: pointer;
          text-align: center;
          transition: all 0.2s;
        }

        .size-btn.active {
          background: #FFFFFF;
          color: #000000;
          border-color: #FFFFFF;
        }

        .size-btn.out-of-stock {
          opacity: 0.35;
          cursor: not-allowed;
          text-decoration: line-through;
        }

        .footer {
          margin-top: 4px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .stock-pill {
          font-family: monospace;
          font-size: 11px;
          color: ${isAvailable ? "#22C55E" : "#9B9B9B"};
        }

        .btn-confirm {
          width: 100%;
          padding: 10px 16px;
          font-size: 14px;
          font-weight: 600;
          background: #FFFFFF;
          color: #000000;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          transition: transform 0.2s, opacity 0.2s;
        }

        .btn-confirm:hover {
          opacity: 0.92;
          transform: translateY(-1px);
        }

        .btn-confirm:disabled {
          opacity: 0.4;
          cursor: not-allowed;
          transform: none;
        }

        /* Receipt State (Post-order VRAM cleanup) */
        .receipt-card {
          padding: 24px;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
        }

        .receipt-img {
          width: 100%;
          max-height: 200px;
          object-fit: contain;
          filter: drop-shadow(0 12px 24px rgba(0,0,0,0.5));
          border-radius: 8px;
        }

        .receipt-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          font-family: monospace;
          font-size: 12px;
          color: #22C55E;
          background: #1F1F1F;
          border: 1px solid #272727;
          padding: 4px 10px;
          border-radius: 9999px;
        }
      </style>

      ${
        this.isOrdered
          ? `
          <div class="receipt-card">
            <div class="receipt-badge">
              <span>●</span> Order Dispatched to Agent
            </div>
            <img class="receipt-img" id="receipt-snapshot" alt="Kuro Runner V1 Receipt Snapshot" />
            <div style="font-size: 16px; font-weight: 600;">Kuro Runner V1</div>
            <div style="font-family: monospace; font-size: 13px; color: #9B9B9B;">
              ${this.selectedColor} · Size ${this.selectedSize} US
            </div>
            <div style="font-family: monospace; font-size: 11px; color: #666666;">
              WebGL context disposed · VRAM reclaimed
            </div>
          </div>
        `
          : `
          <div class="viewport" id="wc-three-container">
            <div class="loader-overlay" id="three-loader">Loading 3D asset...</div>
            <div class="hint">⟲ Drag to rotate 360°</div>
          </div>

          <div class="body">
            <div class="header-row">
              <span class="title">Kuro Runner V1</span>
              <span class="price">$185</span>
            </div>

            <div>
              <span class="label">Colorway</span>
              <div class="color-row">
                ${colors
                  .map(
                    (c) => `
                  <button class="color-pill ${c.name === this.selectedColor ? "active" : ""}" data-color="${c.name}">
                    <span class="swatch" style="background-color: ${c.hex};"></span>
                    <span>${c.name.split(" ")[0]}</span>
                  </button>
                `
                  )
                  .join("")}
              </div>
            </div>

            <div>
              <span class="label">Size (US)</span>
              <div class="size-grid">
                ${sizes
                  .map((sz) => {
                    const sku = `KURO-V1-${this.selectedColor}-${sz}`;
                    const avail = (this.inventory[sku] ?? 0) > 0;
                    return `
                      <button 
                        class="size-btn ${sz === this.selectedSize ? "active" : ""} ${!avail ? "out-of-stock" : ""}" 
                        data-size="${sz}"
                        ${!avail ? "disabled" : ""}
                      >
                        ${sz}
                      </button>
                    `;
                  })
                  .join("")}
              </div>
            </div>

            <div class="footer">
              <div class="stock-pill">
                ● ${isAvailable ? `${stock} pairs in stock` : "Sold out"}
              </div>

              <button class="btn-confirm" id="confirm-btn" ${!isAvailable ? "disabled" : ""}>
                ${this.context === "agent" ? "Confirm Selection in Chat" : "Add to Cart ($185)"}
              </button>
            </div>
          </div>
        `
      }
    `;

    this.bindEvents();
  }

  private bindEvents(): void {
    if (!this.shadowRoot) return;

    this.shadowRoot.querySelectorAll(".color-pill").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const c = (e.currentTarget as HTMLElement).dataset.color as ShoeColor;
        if (c) {
          this.selectedColor = c;
          this.threeController?.setColor(c);
          this.updateDOMSelection();
        }
      });
    });

    this.shadowRoot.querySelectorAll(".size-btn:not(.out-of-stock)").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const sz = Number((e.currentTarget as HTMLElement).dataset.size) as ShoeSize;
        if (sz) {
          this.selectedSize = sz;
          this.updateDOMSelection();
        }
      });
    });

    this.shadowRoot.querySelector("#confirm-btn")?.addEventListener("click", () => {
      this.handleOrder();
    });
  }

  private updateDOMSelection(): void {
    if (!this.shadowRoot) return;
    const currentSku = `KURO-V1-${this.selectedColor}-${this.selectedSize}`;
    const stock = this.inventory[currentSku] ?? 0;
    const isAvailable = stock > 0;

    this.shadowRoot.querySelectorAll(".color-pill").forEach((btn) => {
      btn.classList.toggle("active", (btn as HTMLElement).dataset.color === this.selectedColor);
    });

    this.shadowRoot.querySelectorAll(".size-btn").forEach((btn) => {
      const sz = Number((btn as HTMLElement).dataset.size);
      const sku = `KURO-V1-${this.selectedColor}-${sz}`;
      const avail = (this.inventory[sku] ?? 0) > 0;
      btn.classList.toggle("active", sz === this.selectedSize);
      btn.classList.toggle("out-of-stock", !avail);
      btn.toggleAttribute("disabled", !avail);
    });

    const stockEl = this.shadowRoot.querySelector(".stock-pill") as HTMLElement | null;
    if (stockEl) {
      stockEl.textContent = `● ${isAvailable ? `${stock} pairs in stock` : "Sold out"}`;
      stockEl.style.color = isAvailable ? "#22C55E" : "#9B9B9B";
    }

    const confirmBtn = this.shadowRoot.querySelector("#confirm-btn") as HTMLButtonElement | null;
    if (confirmBtn) {
      confirmBtn.disabled = !isAvailable;
    }
  }

  private async handleOrder(): Promise<void> {
    const sku = `KURO-V1-${this.selectedColor}-${this.selectedSize}`;
    const orderData = {
      sku,
      productName: "Kuro Runner V1",
      color: this.selectedColor,
      size: this.selectedSize,
      price: 185,
    };

    // 1. Capture 2D snapshot & dispose Three.js scene (Receipt State)
    let snapshotUrl = "";
    if (this.threeController) {
      snapshotUrl = this.threeController.captureSnapshotAndDispose();
      this.threeController = null;
    }

    this.isOrdered = true;
    this.render();

    const img = this.shadowRoot?.querySelector("#receipt-snapshot") as HTMLImageElement | null;
    if (img && snapshotUrl) {
      img.src = snapshotUrl;
    }

    // 2. Dispatch according to dual context
    if (this.context === "agent") {
      // MCP App JSON-RPC 2.0 communication with parent agent host
      window.parent.postMessage(
        {
          jsonrpc: "2.0",
          method: "ui/notifications/action",
          params: {
            action: "order_kuro_shoe",
            data: orderData,
          },
        },
        "*"
      );
    } else {
      // In-browser WebMCP or custom DOM event
      if (navigator.modelContext) {
        await navigator.modelContext.callTool("order_kuro_shoe", {
          color: this.selectedColor,
          size: this.selectedSize,
        });
      }
      this.dispatchEvent(new CustomEvent("kuro:order", { detail: orderData, bubbles: true, composed: true }));
    }
  }
}

// Register the custom element
if (!customElements.get("kuro-configurator")) {
  customElements.define("kuro-configurator", KuroConfigurator);
}
