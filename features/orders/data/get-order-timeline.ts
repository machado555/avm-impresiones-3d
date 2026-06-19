import { requireAuth } from "@/features/auth/guards/require-auth";
import { mapOrderEvent } from "@/features/orders/mappers/map-order";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getOrderTimeline(orderId: string) {
  await requireAuth("/pedidos");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("order_events")
    .select("id,order_id,event,actor_type,actor_id,metadata,created_at")
    .eq("order_id", orderId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map(mapOrderEvent);
}
