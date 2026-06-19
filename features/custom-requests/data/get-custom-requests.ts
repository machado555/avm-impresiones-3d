import { requireAuth } from "@/features/auth/guards/require-auth";
import { customRequestSelect } from "@/features/custom-requests/data/custom-request-select";
import { mapCustomRequest } from "@/features/custom-requests/mappers/map-custom-request";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCustomRequests() {
  const user = await requireAuth("/solicitudes");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("custom_requests")
    .select(customRequestSelect)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapCustomRequest);
}
