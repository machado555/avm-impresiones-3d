export type DeliveryMethod = "pickup" | "delivery" | "shipping";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_production"
  | "ready"
  | "delivered"
  | "cancelled";

export type OrderItem = {
  id: string;
  orderId: string;
  productId: string;
  variantId?: string | null;
  name: string;
  slug: string;
  imageUrl?: string | null;
  quantity: number;
  unitPrice: number;
  subtotal: number;
  variantSnapshot?: Record<string, unknown> | null;
};

export type Order = {
  id: string;
  userId: string;
  status: OrderStatus;
  deliveryMethod: DeliveryMethod;
  total: number;
  subtotal: number;
  discounts: number;
  shipping: number;
  estimatedPoints: number;
  notes?: string | null;
  items?: OrderItem[];
  createdAt?: string;
  updatedAt?: string;
};
