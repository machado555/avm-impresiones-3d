export type DeliveryMethod = "pickup" | "delivery" | "shipping";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_production"
  | "ready"
  | "delivered"
  | "cancelled";

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
  createdAt?: string;
  updatedAt?: string;
};
