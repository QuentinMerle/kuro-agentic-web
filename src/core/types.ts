/**
 * Core type definitions for Kuro Agentic Web
 * Embraces WebMCP (navigator.modelContext) and Agent Feed specifications.
 */

export type ShoeColor = "Obsidian Black" | "Deep Indigo" | "Raw Chalk";
export type ShoeSize = 7 | 8 | 9 | 10 | 11;

export interface ToolParameterSchema {
  type: string;
  properties?: Record<string, {
    type: string;
    enum?: (string | number)[];
    description?: string;
  }>;
  required?: string[];
}

export interface WebMCPTool {
  name: string;
  description: string;
  parameters: ToolParameterSchema;
  execute: (args: Record<string, unknown>) => Promise<unknown>;
}

export interface ModelContextRegistry {
  registerTool: (tool: WebMCPTool) => void;
  unregisterTool: (toolName: string) => boolean;
  listTools: () => WebMCPTool[];
  callTool: (toolName: string, args: Record<string, unknown>) => Promise<unknown>;
}

export interface AgentFeedUI {
  type: "web-component" | "iframe" | "modal";
  entrypoint: string;
  tag?: string;
  height?: string;
  themeable?: boolean;
}

export interface AgentFeedHandoff {
  type: "checkout-deep-link" | "oauth-device-flow";
  template: string;
  description?: string;
}

export interface AgentFeedTool {
  name: string;
  description: string;
  ui?: AgentFeedUI;
  parameters: ToolParameterSchema;
  handoff?: AgentFeedHandoff;
}

export interface AgentFeedManifest {
  $schema: string;
  version: string;
  name: string;
  description: string;
  publisher?: {
    name: string;
    url: string;
  };
  tools: AgentFeedTool[];
}

export interface CartItem {
  sku: string;
  productName: string;
  size: ShoeSize;
  color: ShoeColor;
  price: number;
  quantity: number;
  addedAt: number;
}

export interface StoreState {
  selectedColor: ShoeColor;
  selectedSize: ShoeSize;
  cart: CartItem[];
  inventory: Record<string, number>;
  isCartDrawerOpen: boolean;
  isFeedInspectorOpen: boolean;
}

declare global {
  interface Navigator {
    modelContext?: ModelContextRegistry;
  }
}
