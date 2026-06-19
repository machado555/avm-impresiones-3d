import { requireAuth } from "@/features/auth/guards/require-auth";
import { mapOrder } from "@/features/orders/mappers/map-order";
import { orderSelect } from "@/features/orders/data/order-select";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getOrderByNumber(orderNumber: string) {
  const user = await requireAuth(`/pedidos/${orderNumber}`);
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("orders")
    .select(orderSelect)
    .eq("order_number", orderNumber)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapOrder(data);
}
