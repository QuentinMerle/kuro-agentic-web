import fs from "fs";
import path from "path";

const rootDir = "/Users/quentin/Documents/ai/kuro-agentic-web";
const brainDir = "/Users/quentin/.gemini/antigravity/brain/6d44166d-6ec3-4ce5-b379-37adfbdcf892";

const indigoB64 = fs.readFileSync(path.join(rootDir, "public/images/kuro-indigo.png")).toString("base64");
const obsidianB64 = fs.readFileSync(path.join(rootDir, "public/images/kuro-obsidian.png")).toString("base64");
const chalkB64 = fs.readFileSync(path.join(rootDir, "public/images/kuro-chalk.png")).toString("base64");

const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kuro Runner V1 · Prerendered PBR Micro-UI</title>
  <style>
    *, *::before, *::after {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    :root {
      --bg: #09090b;
      --card: #141416;
      --card-inner: #1c1c1f;
      --border: #27272a;
      --border-subtle: #1f1f23;
      --border-active: #ffffff;
      --text-main: #f4f4f5;
      --text-muted: #a1a1aa;
      --text-faint: #71717a;
      --accent-emerald: #10b981;
      --accent-sky: #38bdf8;
      --font-sans: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif;
      --font-mono: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    }

    body {
      background: transparent;
      color: var(--text-main);
      font-family: var(--font-sans);
      font-size: 13px;
      line-height: 1.4;
      padding: 8px;
      user-select: none;
      -webkit-user-select: none;
      -webkit-font-smoothing: antialiased;
    }

    .widget-container {
      background: var(--card);
      border: 1px solid var(--border);
      border-radius: 16px;
      overflow: hidden;
      max-width: 440px;
      margin: 0 auto;
      box-shadow: 0 20px 40px -15px rgba(0, 0, 0, 0.7);
      transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }

    /* Top Bar */
    .top-bar {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 10px 14px;
      background: var(--bg);
      border-bottom: 1px solid var(--border);
    }

    .status-badge {
      display: flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
      font-weight: 600;
      letter-spacing: 0.04em;
      color: var(--text-muted);
    }

    .status-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: var(--accent-emerald);
      box-shadow: 0 0 8px var(--accent-emerald);
    }

    .protocol-tag {
      font-family: var(--font-mono);
      font-size: 10px;
      background: var(--card-inner);
      border: 1px solid var(--border);
      color: var(--text-muted);
      padding: 2px 7px;
      border-radius: 9999px;
    }

    /* Resilience Banner */
    .resilience-banner {
      background: rgba(16, 185, 129, 0.08);
      border-bottom: 1px solid rgba(16, 185, 129, 0.2);
      padding: 6px 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 10.5px;
      color: #34d399;
    }

    /* 3D Photorealistic Stage */
    .stage {
      position: relative;
      height: 220px;
      background: radial-gradient(circle at 50% 60%, #1f1f24 0%, #0d0d0f 80%);
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      padding: 6px;
    }

    .stage-badge {
      position: absolute;
      top: 10px;
      right: 12px;
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--text-muted);
      background: rgba(0, 0, 0, 0.65);
      backdrop-filter: blur(8px);
      padding: 2px 8px;
      border-radius: 6px;
      border: 1px solid rgba(255, 255, 255, 0.08);
      z-index: 10;
    }

    .stage-shoe-img {
      max-width: 95%;
      max-height: 205px;
      object-fit: contain;
      filter: drop-shadow(0 16px 28px rgba(0, 0, 0, 0.7));
      transition: opacity 0.2s cubic-bezier(0.16, 1, 0.3, 1), transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .stage-shoe-img:hover {
      transform: scale(1.02) translateY(-2px);
    }

    /* Controls Panel */
    .controls {
      padding: 14px;
      display: flex;
      flex-direction: column;
      gap: 12px;
      background: var(--card);
    }

    .product-header {
      display: flex;
      align-items: baseline;
      justify-content: space-between;
    }

    .product-title {
      font-size: 14px;
      font-weight: 600;
      letter-spacing: -0.01em;
      color: var(--text-main);
    }

    .product-price {
      font-family: var(--font-mono);
      font-size: 15px;
      font-weight: 700;
      color: var(--text-main);
    }

    .label-meta {
      display: flex;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 10.5px;
      text-transform: uppercase;
      letter-spacing: 0.05em;
      color: var(--text-muted);
      margin-bottom: 6px;
    }

    /* Color Grid */
    .color-grid {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }

    .color-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 7px;
      padding: 7px 8px;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 8px;
      color: var(--text-main);
      font-size: 11px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.15s ease;
    }

    .color-btn:hover {
      border-color: rgba(255, 255, 255, 0.3);
    }

    .color-btn.active {
      border: 2px solid var(--border-active);
      background: var(--card-inner);
    }

    .color-swatch {
      width: 11px;
      height: 11px;
      border-radius: 50%;
      border: 1px solid rgba(255, 255, 255, 0.2);
    }

    /* Size Grid */
    .size-grid {
      display: grid;
      grid-template-columns: repeat(5, 1fr);
      gap: 5px;
    }

    .size-btn {
      padding: 7px 0;
      background: var(--bg);
      border: 1px solid var(--border);
      border-radius: 6px;
      color: var(--text-main);
      font-family: var(--font-mono);
      font-size: 11.5px;
      cursor: pointer;
      text-align: center;
      transition: all 0.15s ease;
    }

    .size-btn:hover {
      border-color: rgba(255, 255, 255, 0.3);
    }

    .size-btn.active {
      background: #ffffff;
      color: #000000;
      border-color: #ffffff;
      font-weight: 600;
    }

    /* Stock & Submit */
    .stock-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-family: var(--font-mono);
      font-size: 11px;
      color: #34d399;
      padding-top: 2px;
    }

    .submit-btn {
      width: 100%;
      padding: 10px 14px;
      background: #ffffff;
      color: #000000;
      font-family: var(--font-sans);
      font-size: 12.5px;
      font-weight: 600;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 6px;
      transition: opacity 0.15s ease, transform 0.1s ease;
    }

    .submit-btn:hover {
      opacity: 0.92;
    }

    .submit-btn:active {
      transform: scale(0.99);
    }

    /* Receipt State View */
    .receipt-view {
      display: none;
      padding: 18px 14px;
      flex-direction: column;
      align-items: center;
      text-align: center;
      gap: 12px;
      background: var(--card);
    }

    .receipt-badge {
      display: inline-flex;
      align-items: center;
      gap: 6px;
      font-family: var(--font-mono);
      font-size: 11px;
      color: #34d399;
      background: rgba(16, 185, 129, 0.1);
      border: 1px solid rgba(16, 185, 129, 0.3);
      padding: 4px 10px;
      border-radius: 9999px;
    }

    .receipt-summary {
      display: flex;
      flex-direction: column;
      gap: 2px;
    }

    .receipt-title {
      font-size: 15px;
      font-weight: 600;
    }

    .receipt-sku {
      font-family: var(--font-mono);
      font-size: 11.5px;
      color: var(--text-muted);
    }

    .receipt-img {
      max-width: 90%;
      max-height: 160px;
      object-fit: contain;
      filter: drop-shadow(0 14px 24px rgba(0, 0, 0, 0.6));
      border-radius: 8px;
    }

    .perf-pill {
      font-family: var(--font-mono);
      font-size: 10.5px;
      color: var(--text-faint);
      background: var(--bg);
      border: 1px solid var(--border);
      padding: 3px 10px;
      border-radius: 6px;
    }

    .handoff-box {
      width: 100%;
      padding-top: 10px;
      border-top: 1px solid var(--border);
      display: flex;
      flex-direction: column;
      gap: 8px;
      text-align: left;
    }

    .handoff-url {
      background: var(--bg);
      border: 1px solid var(--border);
      padding: 8px 10px;
      border-radius: 6px;
      font-family: var(--font-mono);
      font-size: 10px;
      color: var(--accent-sky);
      word-break: break-all;
      user-select: all;
    }

    .checkout-btn {
      width: 100%;
      padding: 10px;
      background: #ffffff;
      color: #000000;
      font-size: 12px;
      font-weight: 600;
      border-radius: 6px;
      text-align: center;
      text-decoration: none;
      display: block;
      transition: opacity 0.15s ease;
      cursor: pointer;
    }

    .checkout-btn:hover {
      opacity: 0.9;
    }

    .back-btn {
      background: transparent;
      border: none;
      color: var(--text-faint);
      font-family: var(--font-mono);
      font-size: 11px;
      cursor: pointer;
      text-decoration: underline;
    }

    .back-btn:hover {
      color: var(--text-muted);
    }
  </style>
</head>
<body>

  <div class="widget-container" id="widget-root">
    
    <!-- Top Bar -->
    <div class="top-bar">
      <div class="status-badge">
        <span class="status-dot"></span>
        <span>KURO RUNNER V1 · TIER 2 PRERENDERED MICRO-UI</span>
      </div>
      <span class="protocol-tag">JSON-RPC 2.0</span>
    </div>

    <!-- Resilience Note -->
    <div class="resilience-banner">
      <span>⚡ Baked PBR 3D Snapshots (0ms)</span>
      <span>0 MB VRAM · 100% CSP-Safe</span>
    </div>

    <!-- Active View -->
    <div id="active-view">
      <!-- 3D PBR Photorealistic Stage -->
      <div class="stage">
        <span class="stage-badge">📸 3D Baked Render · 0 WebGL</span>
        <img id="stage-shoe-img" class="stage-shoe-img" src="data:image/png;base64,${indigoB64}" alt="Kuro Runner V1 3D PBR Snapshot" />
      </div>

      <!-- Controls Panel -->
      <div class="controls">
        <div class="product-header">
          <span class="product-title">Kuro Runner V1</span>
          <span class="product-price">$185</span>
        </div>

        <!-- Colorway Selector -->
        <div>
          <div class="label-meta">
            <span>Colorway</span>
            <span id="color-label" style="color: var(--text-main); font-weight: 600;">Deep Indigo</span>
          </div>
          <div class="color-grid" id="color-picker">
            <button class="color-btn" data-color="Obsidian Black">
              <span class="color-swatch" style="background: #18181b;"></span>
              <span>Obsidian</span>
            </button>
            <button class="color-btn active" data-color="Deep Indigo">
              <span class="color-swatch" style="background: #2a4365;"></span>
              <span>Indigo</span>
            </button>
            <button class="color-btn" data-color="Raw Chalk">
              <span class="color-swatch" style="background: #d8d4c7;"></span>
              <span>Chalk</span>
            </button>
          </div>
        </div>

        <!-- Size Selector -->
        <div>
          <div class="label-meta">
            <span>Size (US)</span>
            <span id="size-label" style="color: var(--text-main); font-weight: 600;">9 US</span>
          </div>
          <div class="size-grid" id="size-picker">
            <button class="size-btn" data-size="7">7</button>
            <button class="size-btn" data-size="8">8</button>
            <button class="size-btn active" data-size="9">9</button>
            <button class="size-btn" data-size="10">10</button>
            <button class="size-btn" data-size="11">11</button>
          </div>
        </div>

        <!-- Live Stock & SKU -->
        <div class="stock-row">
          <span id="stock-count">● 8 pairs available in stock</span>
          <span style="color: var(--text-faint);">SKU: <span id="sku-preview" style="font-family: var(--font-mono); color: var(--text-muted);">KURO-V1-Deep-Indigo-9</span></span>
        </div>

        <button class="submit-btn" id="confirm-btn">
          <span>Confirm Selection in Chat</span>
          <span>→</span>
        </button>
      </div>
    </div>

    <!-- Receipt State View -->
    <div class="receipt-view" id="receipt-view">
      <div class="receipt-badge">
        <span>✓</span>
        <span>Action Dispatched via JSON-RPC 2.0</span>
      </div>

      <img id="receipt-shoe-img" class="receipt-img" src="data:image/png;base64,${indigoB64}" alt="Kuro Runner V1 Receipt" />

      <div class="receipt-summary">
        <span class="receipt-title">Kuro Runner V1</span>
        <span class="receipt-sku" id="receipt-sku-text">Deep Indigo · Size 9 US</span>
      </div>

      <div class="perf-pill">
        0 MB VRAM · 0ms load · 100% CSP-Safe
      </div>

      <div class="handoff-box">
        <div class="label-meta">
          <span>Delegated 1-Click Checkout Deep-Link</span>
          <span style="color: #34d399;">Ready</span>
        </div>
        <div class="handoff-url" id="receipt-url-box">
          https://kuro-agentic-web.vercel.app/checkout?sku=KURO-V1-Deep-Indigo-9&source=mcp_agent
        </div>
        <a 
          href="https://kuro-agentic-web.vercel.app/checkout?sku=KURO-V1-Deep-Indigo-9&source=mcp_agent" 
          target="_blank"
          class="checkout-btn"
          id="checkout-action-btn"
          onclick="alert('Delegated Handoff: Redirecting to Stripe / Shopify Checkout with locked SKU.'); return false;"
        >
          Proceed to 1-Click Checkout ($185)
        </a>
      </div>

      <button class="back-btn" id="back-btn">← Modify Configuration</button>
    </div>

  </div>

  <script>
    (function() {
      const images = {
        "Deep Indigo": "data:image/png;base64,${indigoB64}",
        "Obsidian Black": "data:image/png;base64,${obsidianB64}",
        "Raw Chalk": "data:image/png;base64,${chalkB64}",
      };

      let selectedColor = "Deep Indigo";
      let selectedSize = 9;

      const inventory = {
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

      const stageImg = document.getElementById("stage-shoe-img");
      const colorLabel = document.getElementById("color-label");
      const sizeLabel = document.getElementById("size-label");
      const stockCount = document.getElementById("stock-count");
      const skuPreview = document.getElementById("sku-preview");
      const activeView = document.getElementById("active-view");
      const receiptView = document.getElementById("receipt-view");
      const receiptImg = document.getElementById("receipt-shoe-img");
      const confirmBtn = document.getElementById("confirm-btn");
      const backBtn = document.getElementById("back-btn");
      const receiptSkuText = document.getElementById("receipt-sku-text");
      const receiptUrlBox = document.getElementById("receipt-url-box");
      const checkoutActionBtn = document.getElementById("checkout-action-btn");

      function updateUI() {
        stageImg.style.opacity = "0.4";
        setTimeout(() => {
          stageImg.src = images[selectedColor] || images["Deep Indigo"];
          stageImg.style.opacity = "1";
        }, 80);

        colorLabel.textContent = selectedColor;
        sizeLabel.textContent = selectedSize + " US";

        const sku = "KURO-V1-" + selectedColor.replace(/ /g, "-") + "-" + selectedSize;
        skuPreview.textContent = sku;

        const count = inventory["KURO-V1-" + selectedColor + "-" + selectedSize] ?? 0;
        if (count > 0) {
          stockCount.innerHTML = "● " + count + " pairs available in stock";
          stockCount.style.color = "#34d399";
          confirmBtn.disabled = false;
          confirmBtn.style.opacity = "1";
          confirmBtn.style.cursor = "pointer";
          confirmBtn.innerHTML = "<span>Confirm Selection in Chat</span><span>→</span>";
        } else {
          stockCount.innerHTML = "✕ Out of stock in this size";
          stockCount.style.color = "#f87171";
          confirmBtn.disabled = true;
          confirmBtn.style.opacity = "0.5";
          confirmBtn.style.cursor = "not-allowed";
          confirmBtn.innerHTML = "<span>Size Unavailable</span>";
        }
      }

      document.querySelectorAll(".color-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".color-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          selectedColor = btn.getAttribute("data-color");
          updateUI();
        });
      });

      document.querySelectorAll(".size-btn").forEach(btn => {
        btn.addEventListener("click", () => {
          document.querySelectorAll(".size-btn").forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
          selectedSize = parseInt(btn.getAttribute("data-size"), 10);
          updateUI();
        });
      });

      confirmBtn.addEventListener("click", () => {
        const sku = "KURO-V1-" + selectedColor.replace(/ /g, "-") + "-" + selectedSize;
        const checkoutUrl = "https://kuro-agentic-web.vercel.app/checkout?sku=" + sku + "&source=mcp_agent";

        receiptImg.src = images[selectedColor] || images["Deep Indigo"];
        receiptSkuText.textContent = selectedColor + " · Size " + selectedSize + " US";
        receiptUrlBox.textContent = checkoutUrl;
        checkoutActionBtn.href = checkoutUrl;

        activeView.style.display = "none";
        receiptView.style.display = "flex";

        try {
          if (window.parent && window.parent !== window) {
            window.parent.postMessage({
              jsonrpc: "2.0",
              method: "ui/notifications/action",
              params: {
                action: "order_kuro_shoe",
                data: {
                  color: selectedColor,
                  size: selectedSize,
                  sku: sku,
                  checkoutUrl: checkoutUrl
                }
              }
            }, "*");
          }
        } catch(e) {
          console.warn("[KuroWidget] postMessage dispatch error:", e);
        }
      });

      backBtn.addEventListener("click", () => {
        receiptView.style.display = "none";
        activeView.style.display = "block";
      });

      updateUI();
    })();
  </script>
</body>
</html>
`;

fs.writeFileSync(path.join(rootDir, "public/widget.html"), html);
fs.writeFileSync(path.join(brainDir, "kuro-configurator-widget.html"), html);
console.log("Successfully built prerendered 3D widget in public/widget.html and brain/kuro-configurator-widget.html!");
