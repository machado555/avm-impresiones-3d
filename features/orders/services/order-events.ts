import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { OrderEventActorType } from "@/types/orders";

type CreateOrderEventInput = {
  orderId: string;
  event: string;
  actorType: OrderEventActorType;
  actorId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function createOrderEvent({ orderId, event, actorType, actorId = null, metadata = {} }: CreateOrderEventInput) {
  const supabase = await createSupabaseServerClient();

  return supabase.from("order_events").insert({
    order_id: orderId,
    event,
    actor_type: actorType,
    actor_id: actorId,
    metadata
  });
}
