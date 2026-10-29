import { shopStore } from "../core/store.ts";
import type { ShoeColor, ShoeSize } from "../core/types.ts";
import { initThreeViewport, type ThreeViewportController } from "./three-viewport.ts";

export function initProductStudio(container: HTMLElement): void {
  const colors: { name: ShoeColor; hex: string; desc: string }[] = [
    { name: "Obsidian Black", hex: "#181818", desc: "Mesh technique noir mat haute densité" },
    { name: "Deep Indigo", hex: "#22355E", desc: "Teinte indigo minérale profonde" },
    { name: "Raw Chalk", hex: "#D8D4C7", desc: "Craie brute non teintée éco-conçue" },
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
        Du scraping au RSS de l'IA.<br>Le front-end est déjà l'API.
      </h1>

      <p class="hero-subheading">
        Kuro Runner V1 expose ses fonctions métier au protocole WebMCP et syndique son catalogue 
        dans un flux statique /agent-feed.json. Vos agents explorent en 3D et règlent sans scraping.
      </p>

      <div class="proof-signal">
        <span>⚡ 15 ms de découverte</span>
        <span>·</span>
        <span>Zéro navigateur headless</span>
        <span>·</span>
        <span>Protocole JSON-RPC 2.0</span>
      </div>
    </section>

    <!-- 2. STUDIO 3D HERO INTERACTIVE (Three.js WebGL) -->
    <div class="studio-grid" id="configurator-stage">
      <!-- 3D WebGL Viewport -->
      <div class="studio-card">
        <div class="viewport-area" id="three-container">
          <div class="viewport-loading" id="three-loader" style="z-index: 5;">
            <div class="spinner"></div>
            <span>Chargement du modèle 3D PBR...</span>
          </div>
          <div class="viewport-hint" style="z-index: 5;">
            <span>⟲ Glissez pour pivoter en 3D à 360°</span>
          </div>
        </div>

        <div style="padding: var(--space-300); display: flex; justify-content: space-between; align-items: center; background-color: var(--bg-card);">
          <div>
            <span style="font-size: var(--text-xs); color: var(--accent-muted); font-family: var(--font-mono); display: block;">SKU ACTIF</span>
            <span id="active-sku-display" style="font-family: var(--font-mono); font-size: var(--text-sm); font-weight: 600;">${currentSku}</span>
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
            Sneaker technique éco-conçue avec tige tricotée sans couture et amorti réactif.
          </p>
        </div>

        <!-- Color Selector -->
        <div class="option-group">
          <span class="option-label">Coloris de l'empeigne</span>
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

        <!-- Stock Pill -->
        <div id="stock-pill-display" style="font-size: var(--text-xs); font-family: var(--font-mono); color: ${isAvailable ? 'var(--accent-success)' : 'var(--accent-muted)'};">
          ● ${isAvailable ? `${stock} paires disponibles en stock` : 'Rupture temporaire pour cette pointure'}
        </div>

        <!-- Action Buttons -->
        <div style="margin-top: auto; display: flex; flex-direction: column; gap: var(--space-100);">
          <button 
            id="add-to-cart-btn" 
            class="btn btn-primary" 
            style="width: 100%; padding: 12px 16px; font-size: var(--text-base);"
            ${!isAvailable ? "disabled" : ""}
          >
            ${isAvailable ? "Commander la paire (185 €)" : "Taille épuisée"}
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

    <!-- 3. MANDATORY TAGLINE REVEAL SECTION (B11) -->
    <section class="tagline-section" aria-label="Manifeste d'architecture">
      <p class="tagline-text" id="reveal-target">
        Le front-end n'a plus besoin d'être rétro-ingéniéré par des scripts aveugles. Il est déjà la couche d'exécution native la plus rapide et la plus sécurisée du Web.
      </p>
    </section>

    <!-- 4. PROBLEM TO SOLUTION (A2 #6) -->
    <section class="content-section" id="solution">
      <div class="section-header">
        <span class="section-label">L'autopsie technique</span>
        <h2 class="section-title">Pourquoi l'approche actuelle craque sous charge</h2>
        <p class="section-subtitle">
          Le scraping visuel (Computer Use) compense l'absence de protocole par une débauche de ressources matérielles.
        </p>
      </div>

      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-title" style="color: var(--accent-muted);">
            <span>✕</span>
            <span>Scraping DOM & Computer Use</span>
          </div>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            L'agent lance une instance Chromium de 500 Mo en tâche de fond, prend des captures d'écran toutes les deux secondes, et tente de cliquer à tâtons sur des sélecteurs CSS qui cassent à chaque déploiement.
          </p>
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-subtle); margin-top: auto;">
            Latence : 5 à 15s · VRAM : Saturée · Déterminisme : Faible
          </div>
        </div>

        <div class="comparison-card highlight">
          <div class="comparison-title" style="color: var(--accent-primary);">
            <span>✓</span>
            <span>WebMCP + Manifeste /agent-feed.json</span>
          </div>
          <p style="font-size: var(--text-sm); color: var(--accent-primary); line-height: 1.6;">
            Le site expose directement ses fonctions métier et ses composants 3D. L'agent externe découvre les outils à froid via un simple fetch HTTP de 2 Ko, et l'IA in-browser exécute les actions en 0 ms avec la session active.
          </p>
          <div style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-success); margin-top: auto;">
            Latence : 15 ms · VRAM : Gérée · Déterminisme : Absolu
          </div>
        </div>
      </div>
    </section>

    <!-- 5. BENEFITS SECTION (A2 #7) -->
    <section class="content-section" id="benefits">
      <div class="section-header">
        <span class="section-label">Bénéfices concrets</span>
        <h2 class="section-title">Une architecture taillée pour le monde réel</h2>
        <p class="section-subtitle">
          Pensée pour les contraintes physiques du navigateur et les impératifs de rentabilité.
        </p>
      </div>

      <div class="benefits-grid">
        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>
          </div>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Découverte à froid en 15 ms</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            Le fichier <code>/agent-feed.json</code> délivre la signature d'outils et l'URL du configurateur en une seule requête HTTP sans initialiser de moteur de rendu.
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          </div>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Micro-UI 3D Just-in-Time</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            Le composant Three.js s'invite dans la bulle de chat de l'agent sans obliger le marchand à maintenir deux bases de code Front-End séparées.
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          </div>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Isolation Zero-Trust (VRAM libre)</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            L'iframe sandboxée communique exclusivement en JSON-RPC. À la validation, la scène 3D se fige en carte bitmap pour libérer instantanément la mémoire GPU.
          </p>
        </div>

        <div class="benefit-card">
          <div class="benefit-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8M12 6v2m0 8v2"/></svg>
          </div>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Paiement Handoff sécurisé</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            L'agent ne manipule aucun numéro de carte. La transaction se conclut via un Checkout Deep-Link Stripe pré-rempli validé par l'humain en un clic.
          </p>
        </div>
      </div>
    </section>

    <!-- 6. HOW IT WORKS (A2 #8) -->
    <section class="content-section" id="how-it-works">
      <div class="section-header">
        <span class="section-label">Le flux transactionnel</span>
        <h2 class="section-title">Comment l'agent interagit en trois étapes</h2>
        <p class="section-subtitle">
          Une séparation nette entre découverte d'outils, manipulation visuelle et validation déléguée.
        </p>
      </div>

      <div class="steps-grid">
        <div class="step-card">
          <span class="step-number">01</span>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Découverte à froid</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            L'agent externe lit le fichier statique <code>/agent-feed.json</code> dans le <code>&lt;head&gt;</code> pour identifier les outils disponibles et l'URI du Web Component.
          </p>
        </div>

        <div class="step-card">
          <span class="step-number">02</span>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Hydratation de la Micro-UI</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            L'agent monte l'iframe sandboxée dans le chat. L'utilisateur inspecte la sneaker sous tous les angles et sélectionne son coloris à 60 images par seconde.
          </p>
        </div>

        <div class="step-card">
          <span class="step-number">03</span>
          <h3 style="font-size: var(--text-base); font-weight: 600;">Règlement délégué (Handoff)</h3>
          <p style="font-size: var(--text-sm); color: var(--accent-muted); line-height: 1.6;">
            La validation génère une URL de checkout pré-remplie. L'utilisateur confirme son achat avec Apple Pay ou son moyen de paiement habituel sans friction.
          </p>
        </div>
      </div>
    </section>

    <!-- 7. FAQ ACCORDION (A2 #10) -->
    <section class="content-section" id="faq">
      <div class="section-header">
        <span class="section-label">Foire aux questions</span>
        <h2 class="section-title">Les réponses aux objections d'ingénierie</h2>
        <p class="section-subtitle">
          Tout ce qu'un directeur technique ou un architecte web veut savoir avant d'adopter le standard.
        </p>
      </div>

      <div class="faq-list">
        <div class="faq-item">
          <button class="faq-question">
            <span>Pourquoi ne pas simplement exposer une API REST ou GraphQL ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            Une API externe exige de créer un serveur dédié, de gérer l'infrastructure, d'implémenter des flux OAuth complexes et de maintenir deux versions de vos règles métier. Avec WebMCP, le navigateur possède déjà l'état en mémoire, les cookies de session et les fonctions JS compilées : le front-end est déjà votre API.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>Comment empêcher un composant tiers d'espionner le fil de discussion ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            L'interface injectée s'exécute dans une iframe isolée sous <code>sandbox="allow-scripts"</code> en proscrivant strictement <code>allow-same-origin</code>. Elle ne possède aucun accès au DOM de l'agent hôte, ni à l'historique de la conversation, ni au stockage local. Les échanges transitent exclusivement par un canal typé en JSON-RPC 2.0.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>Comment gérer un catalogue de 15 000 références sans gonfler le JSON ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            Le fichier <code>/agent-feed.json</code> ne contient pas l'intégralité des produits : il expose les contrats d'actions génériques (recherche, configuration, checkout) et l'URL du Web Component paramétré par l'ID du produit. C'est le composant qui hydrate l'état précis via une requête légère vers le backend.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>Que se passe-t-il avec la mémoire VRAM si l'utilisateur ouvre 5 widgets 3D ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            C'est la règle d'or du cycle de vie mémoire : dès que l'action est validée, le Web Component capture une image bitmap (toDataURL), détruit proprement la scène Three.js et force la perte de contexte WebGL (forceContextLoss) pour restituer 100% de la VRAM au système.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>L'agent a-t-il accès au numéro de carte de l'utilisateur ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            Non. La transaction ne transite jamais par les mains du LLM. Le protocole utilise un Checkout Deep-Link pré-rempli (Stripe Checkout ou Shopify) que l'utilisateur valide lui-même dans son environnement de paiement sécurisé habituel.
          </div>
        </div>

        <div class="faq-item">
          <button class="faq-question">
            <span>Quel est le statut réel de l'objet navigator.modelContext ?</span>
            <span class="faq-icon">+</span>
          </button>
          <div class="faq-answer">
            L'API est actuellement en phase d'incubation exploratoire au sein du W3C (WICG) et dans les expérimentations Chrome Built-in AI. Ce PoC fournit un polyfill Vanilla JS de 25 lignes pour tester son ergonomie dès aujourd'hui sans attendre la finalisation du standard.
          </div>
        </div>
      </div>
    </section>

    <!-- 8. FINAL CTA BANNER (A2 #12) -->
    <section class="cta-banner">
      <h2 style="font-size: var(--text-3xl); margin-bottom: var(--space-200); letter-spacing: -0.02em;">
        Prêt à tester l'interface agentique ?
      </h2>
      <p style="font-size: var(--text-base); color: var(--accent-muted); max-width: 580px; margin-bottom: var(--space-400); line-height: 1.6;">
        Le code source est entièrement accessible, sans dépendances opaques, prêt à être exploré et testé sur votre machine.
      </p>
      <div style="display: flex; gap: var(--space-200); flex-wrap: wrap; justify-content: center;">
        <a href="#configurator-stage" class="btn btn-primary" style="padding: 12px 24px; font-size: var(--text-base);">
          Configurer la Kuro Runner V1
        </a>
        <button id="cta-open-inspector-btn" class="btn btn-secondary" style="padding: 12px 24px; font-size: var(--text-base);">
          Ouvrir l'Inspecteur de Flux
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
      stockPill.textContent = `● ${avail ? `${stk} paires disponibles en stock` : 'Rupture temporaire pour cette pointure'}`;
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
      addBtn.textContent = avail ? "Commander la paire (185 €)" : "Taille épuisée";
    }
  }
}
