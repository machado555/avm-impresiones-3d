import { requireAuth } from "@/features/auth/guards/require-auth";
import { mapOrder } from "@/features/orders/mappers/map-order";
import { orderSelect } from "@/features/orders/data/order-select";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getOrders() {
  const user = await requireAuth("/pedidos");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("orders")
    .select(orderSelect)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapOrder);
}
