import type { StoreState, ShoeColor, ShoeSize, CartItem } from "./types.ts";
import { initWebMCP } from "./webmcp-polyfill.ts";

type Listener = (state: StoreState) => void;

class ShopStore {
  private state: StoreState = {
    selectedColor: "Deep Indigo",
    selectedSize: 42,
    cart: [],
    inventory: {
      "KURO-V1-Obsidian Black-40": 4,
      "KURO-V1-Obsidian Black-41": 7,
      "KURO-V1-Obsidian Black-42": 12,
      "KURO-V1-Obsidian Black-43": 3,
      "KURO-V1-Obsidian Black-44": 1,
      "KURO-V1-Deep Indigo-40": 2,
      "KURO-V1-Deep Indigo-41": 5,
      "KURO-V1-Deep Indigo-42": 8,
      "KURO-V1-Deep Indigo-43": 4,
      "KURO-V1-Deep Indigo-44": 0, // En rupture pour le test
      "KURO-V1-Raw Chalk-40": 6,
      "KURO-V1-Raw Chalk-41": 9,
      "KURO-V1-Raw Chalk-42": 14,
      "KURO-V1-Raw Chalk-43": 5,
      "KURO-V1-Raw Chalk-44": 2,
    },
    isCartDrawerOpen: false,
    isFeedInspectorOpen: false,
  };

  private listeners = new Set<Listener>();

  constructor() {
    this.registerWebMCPTools();
  }

  getState(): Readonly<StoreState> {
    return this.state;
  }

  subscribe(listener: Listener): () => void {
    this.listeners.add(listener);
    listener(this.state);
    return () => this.listeners.delete(listener);
  }

  private emit(): void {
    for (const listener of this.listeners) {
      listener(this.state);
    }
  }

  setColor(color: ShoeColor): void {
    this.state = { ...this.state, selectedColor: color };
    this.emit();
  }

  setSize(size: ShoeSize): void {
    this.state = { ...this.state, selectedSize: size };
    this.emit();
  }

  toggleCartDrawer(open?: boolean): void {
    this.state = {
      ...this.state,
      isCartDrawerOpen: open !== undefined ? open : !this.state.isCartDrawerOpen,
    };
    this.emit();
  }

  toggleFeedInspector(open?: boolean): void {
    this.state = {
      ...this.state,
      isFeedInspectorOpen: open !== undefined ? open : !this.state.isFeedInspectorOpen,
    };
    this.emit();
  }

  addToCart(params: { color?: ShoeColor; size?: ShoeSize; quantity?: number } = {}): {
    success: boolean;
    item?: CartItem;
    message: string;
  } {
    const color = params.color || this.state.selectedColor;
    const size = params.size || this.state.selectedSize;
    const quantity = params.quantity || 1;
    const sku = `KURO-V1-${color}-${size}`;

    const stock = this.state.inventory[sku] ?? 0;
    if (stock < quantity) {
      return {
        success: false,
        message: `Rupture de stock pour ${color} en taille ${size}.`,
      };
    }

    const newItem: CartItem = {
      sku,
      productName: "Kuro Runner V1",
      size,
      color,
      price: 185,
      quantity,
      addedAt: Date.now(),
    };

    this.state = {
      ...this.state,
      cart: [newItem, ...this.state.cart],
      inventory: {
        ...this.state.inventory,
        [sku]: stock - quantity,
      },
      isCartDrawerOpen: true,
    };

    this.emit();

    return {
      success: true,
      item: newItem,
      message: `Paire Kuro Runner V1 (${color}, Taille ${size}) ajoutée au panier avec succès.`,
    };
  }

  /**
   * Registers tools onto navigator.modelContext
   * The Front-End is already the API!
   */
  private registerWebMCPTools(): void {
    const webmcp = initWebMCP();

    webmcp.registerTool({
      name: "order_kuro_shoe",
      description: "Configure et ajoute la paire de Kuro Runner V1 au panier actif",
      parameters: {
        type: "object",
        properties: {
          size: {
            type: "number",
            enum: [40, 41, 42, 43, 44],
            description: "Pointure EU disponible en stock",
          },
          color: {
            type: "string",
            enum: ["Obsidian Black", "Deep Indigo", "Raw Chalk"],
            description: "Coloris officiel de l'empeigne",
          },
        },
        required: ["size", "color"],
      },
      execute: async (args: Record<string, unknown>) => {
        const color = args.color as ShoeColor;
        const size = Number(args.size) as ShoeSize;
        return this.addToCart({ color, size });
      },
    });

    webmcp.registerTool({
      name: "get_kuro_inventory",
      description: "Consulte le stock exact pour un SKU Kuro",
      parameters: {
        type: "object",
        properties: {
          sku: {
            type: "string",
            description: "Identifiant produit (ex: KURO-V1-Deep Indigo-42)",
          },
        },
        required: ["sku"],
      },
      execute: async (args: Record<string, unknown>) => {
        const sku = String(args.sku);
        const inStock = (this.state.inventory[sku] ?? 0) > 0;
        return {
          sku,
          inStock,
          remaining: this.state.inventory[sku] ?? 0,
        };
      },
    });
  }
}

export const shopStore = new ShopStore();
