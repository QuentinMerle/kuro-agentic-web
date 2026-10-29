import "./design-system/tokens.css";
import { initNavBar } from "./components/nav-bar.ts";
import { initProductStudio } from "./components/product-studio.ts";
import { initCartDrawer } from "./components/cart-drawer.ts";
import { initFeedInspector } from "./components/agent-feed-inspector.ts";
import { shopStore } from "./core/store.ts";

document.addEventListener("DOMContentLoaded", () => {
  const navRoot = document.getElementById("nav-root");
  const studioRoot = document.getElementById("studio-root");
  const cartRoot = document.getElementById("cart-root");
  const inspectorRoot = document.getElementById("inspector-root");

  if (navRoot) initNavBar(navRoot);
  if (studioRoot) initProductStudio(studioRoot);
  if (cartRoot) initCartDrawer(cartRoot);
  if (inspectorRoot) initFeedInspector(inspectorRoot);

  // Expose store for debugging in console
  (window as unknown as { __KURO_STORE__: typeof shopStore }).__KURO_STORE__ = shopStore;

  // Visual toast for WebMCP tool invocations
  window.addEventListener("webmcp:tool-called", (e) => {
    const detail = (e as CustomEvent).detail;
    console.info(`[WebMCP] ⚡ Tool executed by agent:`, detail);
  });
});
