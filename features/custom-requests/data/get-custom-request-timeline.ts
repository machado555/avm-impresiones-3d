import { requireAuth } from "@/features/auth/guards/require-auth";
import { mapCustomRequestEvent } from "@/features/custom-requests/mappers/map-custom-request";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCustomRequestTimeline(requestId: string) {
  await requireAuth("/solicitudes");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("custom_request_events")
    .select("id,request_id,event,metadata,actor_type,actor_id,created_at")
    .eq("request_id", requestId)
    .order("created_at", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map(mapCustomRequestEvent);
}
