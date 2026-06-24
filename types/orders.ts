export type DeliveryMethod = "pickup" | "delivery" | "shipping";

export type OrderStatus =
  | "pending"
  | "confirmed"
  | "in_production"
  | "ready"
  | "delivered"
  | "cancelled";

export type PaymentStatus =
  | "pending"
  | "approved"
  | "rejected"
  | "refunded"
  | "cancelled";

export type OrderEventActorType = "customer" | "admin" | "system" | "guest";

export type OrderEvent = {
  id: string;
  orderId: string;
  event: string;
  status?: OrderStatus;
  actorType?: OrderEventActorType | string | null;
  actorId?: string | null;
  metadata?: Record<string, unknown>;
  note?: string | null;
  createdAt?: string;
};

export type OrderItem = {
  id: string;
  orderId?: string;
  productId?: string | null;
  variantId?: string | null;
  name?: string;
  productName?: string;
  slug?: string;
  productSlug?: string;
  imageUrl?: string | null;
  productImage?: string | null;
  quantity: number;
  unitPrice: number;
  subtotal?: number;
  variantSnapshot?: Record<string, unknown> | null;
  createdAt?: string;
};

export type OrderDetail = {
  id: string;
  cartId?: string | null;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  currency?: string;
  subtotal: number;
  discounts: number;
  shipping: number;
  total: number;
  estimatedPoints: number;
  deliveryMethod: DeliveryMethod;
  notes?: string | null;
  contactSnapshot?: Record<string, unknown>;
  shippingSnapshot?: Record<string, unknown>;
  pointsAwardedAt?: string | null;
  createdAt?: string;
  updatedAt?: string;
  items?: OrderItem[];
  events?: OrderEvent[];
};

export type OrderSummary = {
  id: string;
  orderNumber: string;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  total: number;
  createdAt?: string;
};

export type Order = {
  id: string;
  userId?: string;
  orderNumber?: string;
  status: OrderStatus;
  paymentStatus?: PaymentStatus;
  deliveryMethod?: DeliveryMethod;
  total: number;
  subtotal: number;
  discounts: number;
  shipping: number;
  estimatedPoints: number;
  notes?: string | null;
  items?: OrderItem[];
  events?: OrderEvent[];
  createdAt?: string;
  updatedAt?: string;
};
