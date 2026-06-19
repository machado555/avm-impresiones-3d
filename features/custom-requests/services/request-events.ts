import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CustomRequestActorType } from "@/types/custom-requests";

type CreateCustomRequestEventInput = {
  requestId: string;
  event: string;
  actorType: CustomRequestActorType;
  actorId?: string | null;
  metadata?: Record<string, unknown>;
};

export async function createCustomRequestEvent({
  requestId,
  event,
  actorType,
  actorId = null,
  metadata = {}
}: CreateCustomRequestEventInput) {
  const supabase = await createSupabaseServerClient();

  return supabase.from("custom_request_events").insert({
    request_id: requestId,
    event,
    actor_type: actorType,
    actor_id: actorId,
    metadata
  });
}
