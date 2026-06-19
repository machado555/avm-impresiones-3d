"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { createOrderEvent } from "@/features/orders/services/order-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const cancellableStatuses = ["draft", "pending_payment", "payment_processing"] as const;

export async function cancelOrder(orderId: string) {
  const user = await requireAuth("/pedidos");
  const supabase = await createSupabaseServerClient();
  const { data: order } = await supabase
    .from("orders")
    .select("id,status,order_number")
    .eq("id", orderId)
    .eq("user_id", user.id)
    .single();

  if (!order) {
    return { ok: false, message: "Pedido no encontrado." };
  }

  if (!cancellableStatuses.includes(order.status)) {
    return { ok: false, message: "Este pedido ya no puede cancelarse desde la cuenta." };
  }

  await supabase.from("orders").update({ status: "cancelled" }).eq("id", orderId);
  await createOrderEvent({
    orderId,
    event: "order_cancelled",
    actorType: "customer",
    actorId: user.id
  });

  revalidatePath("/pedidos");
  revalidatePath(`/pedidos/${order.order_number}`);
  return { ok: true, message: "Pedido cancelado." };
}
