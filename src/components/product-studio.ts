import { shopStore } from "../core/store.ts";
import type { ShoeColor, ShoeSize } from "../core/types.ts";
import { initThreeViewport, type ThreeViewportController } from "./three-viewport.ts";

export function initProductStudio(container: HTMLElement): void {
  const colors: { name: ShoeColor; hex: string; desc: string }[] = [
    { name: "Obsidian Black", hex: "#181818", desc: "High-density matte black technical mesh" },
    { name: "Deep Indigo", hex: "#22355E", desc: "Deep mineral indigo dye" },
    { name: "Raw Chalk", hex: "#D8D4C7", desc: "Undyed eco-crafted raw chalk" },
  ];

  const sizes: ShoeSize[] = [40, 41, 42, 43, 44];
  let threeController: ThreeViewportController | null = null;

  const state = shopStore.getState();
  const currentSku = `KURO-V1-${state.selectedColor}-${state.selectedSize}`;
  const stock = state.inventory[currentSku] ?? 0;
  const isAvailable = stock > 0;

  // Mount the complete landing page DOM ONCE
  container.innerHTML = `
    <!-- 1. HERO SECTION (Above the fold per A2) -->
    <section class="hero-section" aria-labelledby="hero-title">
      <div class="hero-tag">
        <span class="hero-tag-pulse"></span>
        <span>WEBMCP READY · W3C INCUBATION PROPOSAL</span>
      </div>

      <h1 id="hero-title" class="hero-heading">
        From scraping to the RSS of AI.<br>The front-end is already the API.
      </h1>

      <p class="hero-subheading">
        Kuro Runner V1 exposes in-DOM functions to WebMCP and syndicates its catalog 
        via a static /agent-feed.json manifest. External agents explore in 3D and check out without scraping.
      </p>

      <div class="proof-signal">
        <span>⚡ 15 ms discovery</span>
        <span>·</span>
        <span>Zero headless browser</span>
        <span>·</span>
        <span>JSON-RPC 2.0 protocol</span>
      </div>
    </section>

    <!-- 2. STUDIO 3D HERO INTERACTIVE (Three.js WebGL) -->
    <div class="studio-grid" id="configurator-stage">
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

        <div style="padding: var(--space-300); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card);">
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
          <span class="option-label">Shoe Size (EU)</span>
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
            ${isAvailable ? "Order Pair ($185)" : "Sold Out"}
          </button>

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

    <!-- 3. MANDATORY TAGLINE REVEAL SECTION (B11) -->
    <section class="tagline-section" aria-label="Architecture Manifesto">
      <p class="tagline-text" id="reveal-target">
        The front-end no longer needs to be reverse-engineered by blind headless scrapers. It is already the fastest, most secure native execution layer on the Web.
      </p>
    </section>

    <!-- 4. PROBLEM TO SOLUTION (A2 #6) -->
    <section class="content-section" id="solution">
      <div class="section-header">
        <span class="section-label">Engineering Autopsy</span>
        <h2 class="section-title">Why the current approach cracks under real load</h2>
        <p class="section-subtitle">
          Computer Use scraping compensates for the lack of protocol with excessive computing resources.
        </p>
      </div>

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-title" style="color: var(--accent-muted);">
            <span>✕</span>
            <span>DOM Scraping & Computer Use</span>
          </div>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            Agents launch a 500 MB background Chromium instance, take screenshots every two seconds, and attempt to click brittle CSS selectors that break with every production release.
          </p>
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-subtle); margin-top: auto;">
            Latency: 5-15s · VRAM: Saturated · Determinism: Low
          </div>
        </div>

        <div class="comparison-card highlight">
          <div class="comparison-title" style="color: var(--accent-primary);">
            <span>✓</span>
            <span>WebMCP + /agent-feed.json Manifest</span>
          </div>
          <p style="font-size: var(--text-sm); color: var(--accent-primary); line-height: 1.6;">
            Websites expose business functions and 3D components directly. External agents discover tools cold via a 2 KB HTTP fetch, and in-browser models execute actions in 0 ms with active sessions.
          </p>
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-success); margin-top: auto;">
            Latency: 15 ms · VRAM: Managed · Determinism: Absolute
          </div>
        </div>
      </div>
    </section>

    <!-- 5. BENEFITS SECTION (A2 #7) -->
    <section class="content-section" id="benefits">
      <div class="section-header">
        <span class="section-label">Concrete Benefits</span>
        <h2 class="section-title">An architecture built for the physical Web</h2>
        <p class="section-subtitle">
          Engineered for real browser memory limits and production economics.
        </p>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h3 style="font-size: var(--text-base); font-weight: 600;">15 ms Cold Discovery</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            The <code>/agent-feed.json</code> manifest delivers tool schemas and configurator URLs in a single HTTP request without spinning up a browser engine.
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          </div>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Just-in-Time 3D Micro-UI</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            The Three.js component embeds directly inside the agent chat bubble without requiring merchants to maintain duplicate front-end codebases.
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Zero-Trust Isolation (VRAM Freed)</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            Sandboxed iframe communicates strictly via JSON-RPC. Upon order confirmation, the 3D scene freezes into a 2D receipt card to reclaim 100% GPU memory.
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 6v2m0 8v2"/></svg>
          </div>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Frictionless Payment Handoff</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            Models never touch credit card tokens. Transactions conclude via a pre-filled Stripe Checkout deep link confirmed by the human buyer in one click.
          </p>
        </div>
      </div>
    </section>

    <!-- 6. HOW IT WORKS (A2 #8) -->
    <section class="content-section" id="how-it-works">
      <div class="section-header">
        <span class="section-label">Transactional Flow</span>
        <h2 class="section-title">How agents interact in three steps</h2>
        <p class="section-subtitle">
          A clean separation between tool discovery, visual manipulation, and delegated checkout.
        </p>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <span class="step-number">01</span>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Cold Discovery</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            External agents read the static <code>/agent-feed.json</code> manifest in the <code>&lt;head&gt;</code> to discover available tools and the Web Component URI.
          </p>
        </div>

        <div class="step-card">
          <span class="step-number">02</span>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Micro-UI Hydration</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            The agent embeds the sandboxed iframe inside the chat. The user inspects the sneaker from every angle and selects colorways at 60 fps.
          </p>
        </div>

        <div class="step-card">
          <span class="step-number">03</span>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Delegated Checkout</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            Confirmation generates a pre-filled checkout URL. The buyer validates the transaction via Apple Pay or standard payment methods without friction.
          </p>
        </div>
      </div>
    </section>

    <!-- 7. FAQ ACCORDION (A2 #10) -->
    <section class="content-section" id="faq">
      <div class="section-header">
        <span class="section-label">Frequently Asked Questions</span>
        <h2 class="section-title">Engineering objections addressed</h2>
        <p class="section-subtitle">
          What technical directors and software architects need to know before adopting this pattern.
        </p>
      </div>

      <div class="faq-list">
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
            The API is in exploratory incubation within the W3C Web Incubator Community Group (WICG) and Chrome Built-in AI initiatives. This demonstrator uses a 25-line Vanilla JS polyfill to prove ergonomics today before the native standard finalizes.
          </div>
        </div>
      </div>
    </section>

    <!-- 8. FINAL CTA BANNER (A2 #12) -->
    <section class="cta-banner">
      <h2 style="font-size: var(--text-3xl); margin-bottom: var(--space-200); letter-spacing: -0.02em;">
        Ready to test the agentic interface?
      </h2>
      <p style="font-size: var(--text-base); color: var(--accent-muted); max-width: 580px; margin-bottom: var(--space-400); line-height: 1.6;">
        The codebase is completely open source, zero lock-in, and ready to inspect on your machine.
      </p>
      <div style="display: flex; gap: var(--space-200); flex-wrap: wrap; justify-content: center;">
        <a href="#configurator-stage" class="btn btn-primary" style="padding: 12px 24px; font-size: var(--text-base);">
          Configure Kuro Runner V1
        </a>
        <button id="cta-open-inspector-btn" class="btn btn-secondary" style="padding: 12px 24px; font-size: var(--text-base);">
          Open Agent Feed Inspector
        </button>
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

  // Setup Tagline Reveal with IntersectionObserver (B11)
  setupTaglineReveal(container);

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
