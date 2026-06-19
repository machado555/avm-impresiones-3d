"use server";

import { redirect } from "next/navigation";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { getCart } from "@/features/cart/data/get-cart";
import { calculateOrderTotals } from "@/features/orders/services/order-totals";
import { createOrderEvent } from "@/features/orders/services/order-events";
import { createOrderNumber } from "@/features/orders/services/order-number";
import { validateCartStockForOrder } from "@/features/orders/services/stock-validation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { DeliveryMethod } from "@/types/orders";

export async function createOrderFromCart(formData: FormData) {
  const user = await requireAuth("/checkout");
  const cart = await getCart();

  if (!cart.id || cart.items.length === 0) {
    return { ok: false, message: "El carrito esta vacio." };
  }

  const stockValidation = await validateCartStockForOrder(cart.items);

  if (!stockValidation.ok) {
    return stockValidation;
  }

  const deliveryMethod = String(formData.get("deliveryMethod") ?? "pickup") as DeliveryMethod;
  const notes = String(formData.get("notes") ?? "").trim() || null;
  const contactSnapshot = {
    fullName: String(formData.get("fullName") ?? user.fullName ?? "").trim(),
    email: String(formData.get("email") ?? user.email ?? "").trim(),
    phone: String(formData.get("phone") ?? user.phone ?? "").trim()
  };
  const shippingSnapshot = {
    deliveryMethod,
    address: String(formData.get("address") ?? "").trim(),
    city: String(formData.get("city") ?? "").trim(),
    province: String(formData.get("province") ?? "").trim(),
    postalCode: String(formData.get("postalCode") ?? "").trim()
  };

  const totals = calculateOrderTotals(cart.items, cart.discounts, cart.shipping);
  const orderNumber = createOrderNumber();
  const supabase = await createSupabaseServerClient();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      user_id: user.id,
      cart_id: cart.id,
      order_number: orderNumber,
      status: "pending_payment",
      payment_status: "pending",
      currency: "ARS",
      subtotal: totals.subtotal,
      discounts: totals.discounts,
      shipping: totals.shipping,
      total: totals.total,
      estimated_points: totals.estimatedPoints,
      delivery_method: deliveryMethod,
      notes,
      contact_snapshot: contactSnapshot,
      shipping_snapshot: shippingSnapshot
    })
    .select("id,order_number")
    .single();

  if (orderError || !order) {
    return { ok: false, message: "No se pudo crear el pedido." };
  }

  const orderItems = cart.items.map((item) => ({
    order_id: order.id,
    product_id: item.productId,
    variant_id: item.variantId,
    quantity: item.quantity,
    unit_price: item.unitPrice,
    product_name: item.name,
    product_slug: item.slug,
    product_image: item.imageUrl,
    variant_snapshot: item.variantSnapshot
  }));

  await supabase.from("order_items").insert(orderItems);
  await supabase.from("payments").insert({
    order_id: order.id,
    provider: "pending",
    status: "pending",
    amount: totals.total
  });
  await supabase.from("carts").update({ status: "converted", last_activity_at: new Date().toISOString() }).eq("id", cart.id);

  await createOrderEvent({
    orderId: order.id,
    event: "order_created",
    actorType: "customer",
    actorId: user.id,
    metadata: { orderNumber: order.order_number, cartId: cart.id }
  });

  redirect(`/pedidos/${order.order_number}`);
}
