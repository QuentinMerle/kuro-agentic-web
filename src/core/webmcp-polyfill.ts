import type { WebMCPTool, ModelContextRegistry } from "./types.ts";

/**
 * WebMCP Polyfill (navigator.modelContext)
 * Implements a lightweight, deterministic in-DOM tool registry aligned with W3C WICG drafts.
 */
class ModelContext implements ModelContextRegistry {
  private tools = new Map<string, WebMCPTool>();

  registerTool(tool: WebMCPTool): void {
    if (!tool.name || typeof tool.execute !== "function") {
      throw new Error(`[WebMCP] Invalid tool declaration for "${tool.name}"`);
    }

    this.tools.set(tool.name, tool);

    // Notify the DOM about tool availability for in-browser agents & inspectors
    window.dispatchEvent(
      new CustomEvent("webmcp:tool-registered", {
        detail: { name: tool.name, description: tool.description, parameters: tool.parameters }
      })
    );
  }

  unregisterTool(toolName: string): boolean {
    const deleted = this.tools.delete(toolName);
    if (deleted) {
      window.dispatchEvent(
        new CustomEvent("webmcp:tool-unregistered", { detail: { name: toolName } })
      );
    }
    return deleted;
  }

  listTools(): WebMCPTool[] {
    return Array.from(this.tools.values());
  }

  async callTool(toolName: string, args: Record<string, unknown> = {}): Promise<unknown> {
    const tool = this.tools.get(toolName);
    if (!tool) {
      throw new Error(`[WebMCP] Tool not found: "${toolName}"`);
    }

    window.dispatchEvent(
      new CustomEvent("webmcp:tool-called", {
        detail: { name: toolName, arguments: args }
      })
    );

    return await tool.execute(args);
  }
}

/**
 * Installs navigator.modelContext if not present natively.
 */
export function initWebMCP(): ModelContextRegistry {
  if (!navigator.modelContext) {
    const registry = new ModelContext();
    Object.defineProperty(navigator, "modelContext", {
      value: registry,
      writable: false,
      configurable: false,
      enumerable: true
    });
    return registry;
  }
  return navigator.modelContext as ModelContextRegistry;
}
