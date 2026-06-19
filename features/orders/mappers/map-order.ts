import type { DeliveryMethod, OrderDetail, OrderEvent, OrderItem, OrderStatus, PaymentStatus } from "@/types/orders";

type OrderRow = {
  id: string;
  cart_id: string | null;
  order_number: string;
  status: OrderStatus;
  payment_status: PaymentStatus;
  currency: string;
  subtotal: number;
  discounts: number;
  shipping: number;
  total: number;
  estimated_points: number;
  delivery_method: DeliveryMethod;
  notes: string | null;
  contact_snapshot: Record<string, unknown>;
  shipping_snapshot: Record<string, unknown>;
  points_awarded_at: string | null;
  created_at: string;
  order_items?: OrderItemRow[];
};

type OrderItemRow = {
  id: string;
  product_id: string | null;
  variant_id: string | null;
  quantity: number;
  unit_price: number;
  product_name: string;
  product_slug: string;
  product_image: string | null;
  variant_snapshot: Record<string, unknown> | null;
  created_at: string;
};

type OrderEventRow = {
  id: string;
  order_id: string;
  event: string;
  actor_type: OrderEvent["actorType"];
  actor_id: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
};

export function mapOrder(row: OrderRow): OrderDetail {
  return {
    id: row.id,
    cartId: row.cart_id,
    orderNumber: row.order_number,
    status: row.status,
    paymentStatus: row.payment_status,
    currency: row.currency,
    subtotal: Number(row.subtotal),
    discounts: Number(row.discounts),
    shipping: Number(row.shipping),
    total: Number(row.total),
    estimatedPoints: row.estimated_points,
    deliveryMethod: row.delivery_method,
    notes: row.notes,
    contactSnapshot: row.contact_snapshot,
    shippingSnapshot: row.shipping_snapshot,
    pointsAwardedAt: row.points_awarded_at,
    createdAt: row.created_at,
    items: (row.order_items ?? []).map(mapOrderItem)
  };
}

export function mapOrderItem(row: OrderItemRow): OrderItem {
  return {
    id: row.id,
    productId: row.product_id,
    variantId: row.variant_id,
    quantity: row.quantity,
    unitPrice: Number(row.unit_price),
    productName: row.product_name,
    productSlug: row.product_slug,
    productImage: row.product_image,
    variantSnapshot: row.variant_snapshot,
    createdAt: row.created_at
  };
}

export function mapOrderEvent(row: OrderEventRow): OrderEvent {
  return {
    id: row.id,
    orderId: row.order_id,
    event: row.event,
    actorType: row.actor_type,
    actorId: row.actor_id,
    metadata: row.metadata,
    createdAt: row.created_at
  };
}
