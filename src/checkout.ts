import "./design-system/tokens.css";

/**
 * Demo checkout handoff page.
 * Target of the `handoff.template` declared in /agent-feed.json and of the widget's
 * "Checkout" button. No payment is processed: this page only proves that the deep link
 * resolves to a locked, pre-filled basket that a human confirms.
 */

const COLORS: Record<string, { image: string; hex: string }> = {
  "Obsidian Black": { image: "/images/kuro-obsidian.png", hex: "#181818" },
  "Deep Indigo": { image: "/images/kuro-indigo.png", hex: "#22355E" },
  "Raw Chalk": { image: "/images/kuro-chalk.png", hex: "#D8D4C7" },
};
const SIZES = [7, 8, 9, 10, 11];
const PRICE = 185;

interface ParsedSku {
  sku: string;
  color: string;
  size: number;
}

// Accepts both "KURO-V1-Obsidian Black-7" (store format) and "KURO-V1-Obsidian-Black-7" (URL-safe format)
function parseSku(raw: string | null): ParsedSku | null {
  if (!raw) return null;
  const match = /^KURO-V1-(.+)-(\d+)$/.exec(raw.trim());
  if (!match) return null;
  const color = match[1].replace(/-/g, " ");
  const size = Number(match[2]);
  if (!COLORS[color] || !SIZES.includes(size)) return null;
  return { sku: `KURO-V1-${color.replace(/ /g, "-")}-${size}`, color, size };
}

const params = new URLSearchParams(window.location.search);
const parsed = parseSku(params.get("sku"));
const source = params.get("source") ?? "direct";
const root = document.getElementById("checkout-root") as HTMLElement;

const card = (inner: string) => `
  <div style="max-width: 480px; margin: 0 auto; padding: calc(var(--space-600) + 24px) var(--space-300) var(--space-600);">
    <a href="/" style="font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-muted);">← Kuro · REX #04</a>
    <div style="margin-top: var(--space-200); background: var(--bg-card); border: 1px solid var(--border-subtle); border-radius: var(--radius-xl); overflow: hidden;">
      ${inner}
    </div>
    <p style="margin-top: var(--space-200); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-subtle); line-height: 1.6; text-align: center;">
      Demo handoff page. No payment is processed and no card data is collected.
    </p>
  </div>
`;

if (!parsed) {
  root.innerHTML = card(`
    <div style="padding: var(--space-400); text-align: center;">
      <h1 style="font-size: var(--text-lg); font-weight: 600;">Invalid or missing SKU</h1>
      <p style="margin-top: var(--space-100); font-size: var(--text-sm); color: var(--accent-muted);">
        Expected <code>?sku=KURO-V1-{Color}-{Size}</code> with a size between 7 and 11 US.
      </p>
      <a href="/#configurator-stage" class="btn btn-primary" style="margin-top: var(--space-300);">Configure a pair</a>
    </div>
  `);
} else {
  const { sku, color, size } = parsed;
  root.innerHTML = card(`
    <div style="background: radial-gradient(circle at 50% 60%, #1f1f24 0%, #0d0d0f 80%); display: flex; justify-content: center; padding: var(--space-200);">
      <img src="${COLORS[color].image}" alt="Kuro Runner V1 in ${color}" style="max-width: 100%; height: 190px; object-fit: contain;" />
    </div>
    <div id="checkout-body" style="padding: var(--space-300); display: flex; flex-direction: column; gap: var(--space-200);">
      <div style="display: flex; justify-content: space-between; align-items: baseline;">
        <h1 style="font-size: var(--text-lg); font-weight: 600;">Kuro Runner V1</h1>
        <span style="font-family: var(--font-mono); font-weight: 700;">$${PRICE}</span>
      </div>
      <ul style="list-style: none; font-family: var(--font-mono); font-size: var(--text-xs); display: flex; flex-direction: column; gap: 6px;">
        <li style="display: flex; justify-content: space-between;"><span style="color: var(--accent-muted);">Colorway</span><span>${color}</span></li>
        <li style="display: flex; justify-content: space-between;"><span style="color: var(--accent-muted);">Size</span><span>${size} US</span></li>
        <li style="display: flex; justify-content: space-between;"><span style="color: var(--accent-muted);">SKU</span><span>${sku}</span></li>
        <li style="display: flex; justify-content: space-between;"><span style="color: var(--accent-muted);">Source</span><span id="source-value"></span></li>
      </ul>
      <div style="font-size: var(--text-xs); color: var(--accent-muted); line-height: 1.6; border-left: 2px solid var(--accent-success); padding: 8px 12px; background: var(--bg-surface);">
        The agent prepared and locked this basket. The human confirms the payment here.
        In production, this step would be a biometric wallet (Apple Pay, Google Pay, Passkeys)
        or a delegated payment token. That handoff is the open question of this PoC.
      </div>
      <button id="pay-btn" class="btn btn-primary" style="width: 100%; padding: 12px 16px;">Confirm order (demo)</button>
    </div>
  `);

  // Untrusted query value: rendered as text only
  (document.getElementById("source-value") as HTMLElement).textContent = source;

  document.getElementById("pay-btn")?.addEventListener("click", () => {
    const body = document.getElementById("checkout-body") as HTMLElement;
    body.innerHTML = `
      <div style="text-align: center; padding: var(--space-200) 0;">
        <div style="font-size: 28px; color: var(--accent-success);">✓</div>
        <h2 style="font-size: var(--text-lg); font-weight: 600; margin-top: var(--space-100);">Order simulated</h2>
        <p style="margin-top: var(--space-100); font-family: var(--font-mono); font-size: var(--text-xs); color: var(--accent-muted);">
          ${sku} · $${PRICE} · nothing was charged
        </p>
        <a href="/" class="btn btn-secondary" style="margin-top: var(--space-300);">Back to the lab</a>
      </div>
    `;
  });
}
