export type CartMode = "guest" | "authenticated";
export type CartStatus = "active" | "converted" | "abandoned";

export type CartDiscount = {
  id?: string;
  type: "fixed" | "percentage" | "free_shipping" | "coupon";
  value: number;
  description: string | null;
};

export type CartItem = {
  id: string;
  productId: string;
  variantId: string | null;
  name: string;
  slug: string;
  imageUrl: string | null;
  quantity: number;
  unitPrice: number;
  estimatedPoints: number;
  variantSnapshot: Record<string, unknown> | null;
};

export type CartState = {
  id: string | null;
  mode: CartMode;
  status: CartStatus;
  items: CartItem[];
  subtotal: number;
  discounts: number;
  shipping: number;
  total: number;
  estimatedPoints: number;
  isDrawerOpen: boolean;
};

export type CartTotals = {
  subtotal: number;
  discounts: number;
  shipping: number;
  total: number;
  estimatedPoints: number;
};
