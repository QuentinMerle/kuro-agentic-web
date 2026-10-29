import { shopStore } from "../core/store.ts";
import type { ShoeColor, ShoeSize } from "../core/types.ts";

export function initProductStudio(container: HTMLElement): void {
  const colors: { name: ShoeColor; hex: string; desc: string }[] = [
    { name: "Obsidian Black", hex: "#1A1A1A", desc: "Mesh noir mat haute densité" },
    { name: "Deep Indigo", hex: "#2C3E6B", desc: "Teinte indigo minérale profonde" },
    { name: "Raw Chalk", hex: "#E3DFD5", desc: "Craie brute non teintée éco-conçue" },
  ];

  const sizes: ShoeSize[] = [40, 41, 42, 43, 44];

  function render(): void {
    const state = shopStore.getState();
    const currentSku = `KURO-V1-${state.selectedColor}-${state.selectedSize}`;
    const stock = state.inventory[currentSku] ?? 0;
    const isAvailable = stock > 0;

    container.innerHTML = `
      <section class="hero-section" aria-labelledby="hero-title">
        <div class="hero-tag">
          <span class="hero-tag-pulse"></span>
          <span>WEBMCP READY · W3C INCUBATION DRAFT</span>
        </div>

        <h1 id="hero-title" class="hero-heading">
          Du scraping au RSS de l'IA.<br>Le front-end est déjà l'API.
        </h1>

        <p class="hero-subheading">
          Explorez la paire Kuro Runner V1. Cette page expose ses actions directement 
          à l'IA via un manifeste statique et le registre natif du DOM.
        </p>
      </section>

      <div class="studio-grid">
        <!-- Viewport 3D / Preview Stage -->
        <div class="studio-card">
          <div class="viewport-area" id="viewport-stage">
            <!-- Low-poly SVG Stage (en attendant le Web Component Three.js autonome) -->
            <div style="
              width: 100%; 
              height: 100%; 
              display: flex; 
              flex-direction: column; 
              align-items: center; 
              justify-content: center; 
              padding: var(--space-400);
            ">
              <svg width="340" height="180" viewBox="0 0 340 180" fill="none" xmlns="http://www.w3.org/2000/svg" style="
                filter: drop-shadow(0 20px 30px rgba(0,0,0,0.7));
                transition: transform 0.5s var(--ease-out-quint);
              ">
                <!-- Sole -->
                <path d="M 30 145 C 50 145, 90 155, 170 155 C 240 155, 290 145, 315 135 C 318 148, 310 158, 290 160 C 230 165, 80 165, 25 156 C 22 150, 24 146, 30 145 Z" fill="#222222" stroke="#333333" stroke-width="2"/>
                <path d="M 35 138 C 90 144, 210 146, 305 128 L 310 136 C 270 148, 120 152, 28 144 Z" fill="#E8E8E8"/>
                <!-- Upper Mesh with reactive color -->
                <path d="M 32 135 C 50 100, 110 75, 175 90 C 210 100, 230 75, 260 70 C 290 65, 305 95, 308 126 C 230 142, 100 140, 32 135 Z" 
                  fill="${getColorHex(state.selectedColor)}" 
                  stroke="rgba(255,255,255,0.15)" 
                  stroke-width="1.5"
                  style="transition: fill 0.3s var(--ease-out-quint);"
                />
                <!-- Tongue & Laces -->
                <path d="M 180 88 C 195 60, 215 50, 235 52 C 245 53, 255 60, 258 68 C 240 70, 220 78, 180 88 Z" fill="#181818" stroke="#333333"/>
                <line x1="195" y1="84" x2="225" y2="72" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                <line x1="205" y1="92" x2="235" y2="80" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
                <line x1="215" y1="100" x2="245" y2="88" stroke="#FFFFFF" stroke-width="2" stroke-linecap="round"/>
              </svg>

              <div style="display: flex; gap: var(--space-100); margin-top: var(--space-300);">
                <span class="shoe-preview-badge">${state.selectedColor}</span>
                <span class="shoe-preview-badge">Taille ${state.selectedSize} EU</span>
                <span class="shoe-preview-badge" style="color: ${isAvailable ? 'var(--accent-success)' : 'var(--accent-muted)'};">
                  ${isAvailable ? `${stock} en stock` : 'Épuisé'}
                </span>
              </div>
            </div>
          </div>

          <div style="padding: var(--space-300); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card);">
            <div>
              <span style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono); display: block;">SKU ACTIF</span>
              <span style="font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 600;">${currentSku}</span>
            </div>
            <div style="text-align: right;">
              <span style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono); display: block;">PRIX UNITAIRE</span>
              <span style="font-family: var(--font-mono); font-size: var(--text-lg); font-weight: 700;">185 €</span>
            </div>
          </div>
        </div>

        <!-- Sidebar Configuration Options -->
        <div class="studio-card sidebar-panel">
          <div>
            <h2 style="font-size: var(--text-xl); font-weight: 600; margin-bottom: var(--space-50);">Kuro Runner V1</h2>
            <p style="font-size: var(--text-xs); color: var(--accent-muted);">
              Sneaker technique éco-conçue avec tige tricotée sans couture.
            </p>
          </div>

          <!-- Color Selector -->
          <div class="option-group">
            <span class="option-label">Coloris</span>
            <div class="color-pills" role="radiogroup" aria-label="Sélection du coloris">
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
            <span class="option-label">Pointure (EU)</span>
            <div class="size-grid" role="radiogroup" aria-label="Sélection de la pointure">
              ${sizes
                .map((sz) => {
                  const skuForSize = `KURO-V1-${state.selectedColor}-${sz}`;
                  const available = (state.inventory[skuForSize] ?? 0) > 0;
                  const isSelected = sz === state.selectedSize;
                  return `
                    <button 
                      class="size-btn ${isSelected ? "active" : ""} ${!available ? "out-of-stock" : ""}"
                      data-size="${sz}"
                      ${!available ? 'disabled title="Rupture de stock"' : ""}
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

          <!-- Action Button -->
          <div style="margin-top: auto; display: flex; flex-direction: column; gap: var(--space-100);">
            <button 
              id="add-to-cart-btn" 
              class="btn btn-primary" 
              style="width: 100%; padding: var(--space-200); font-size: var(--text-base);"
              ${!isAvailable ? "disabled" : ""}
            >
              ${isAvailable ? "Ajouter au panier (185 €)" : "Rupture de stock"}
            </button>

            <button 
              id="simulate-agent-call-btn" 
              class="btn btn-secondary" 
              style="width: 100%; font-family: var(--font-mono); font-size: var(--text-xs);"
            >
              ⚡ Invoquer navigator.modelContext
            </button>
          </div>
        </div>
      </div>
    `;

    // Event listeners
    container.querySelectorAll(".color-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const target = (e.currentTarget as HTMLElement).dataset.color as ShoeColor;
        if (target) shopStore.setColor(target);
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
          size: state.selectedSize,
          color: state.selectedColor,
        });
      }
    });
  }

  function getColorHex(color: ShoeColor): string {
    switch (color) {
      case "Obsidian Black":
        return "#1C1C1C";
      case "Deep Indigo":
        return "#2A3D66";
      case "Raw Chalk":
        return "#D5D1C6";
      default:
        return "#2A3D66";
    }
  }

  shopStore.subscribe(() => {
    render();
  });
}
