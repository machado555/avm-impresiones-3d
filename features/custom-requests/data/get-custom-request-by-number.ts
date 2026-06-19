import { requireAuth } from "@/features/auth/guards/require-auth";
import { customRequestSelect } from "@/features/custom-requests/data/custom-request-select";
import { mapCustomRequest } from "@/features/custom-requests/mappers/map-custom-request";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCustomRequestByNumber(requestNumber: string) {
  const user = await requireAuth(`/solicitudes/${requestNumber}`);
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("custom_requests")
    .select(customRequestSelect)
    .eq("request_number", requestNumber)
    .eq("user_id", user.id)
    .single();

  if (error || !data) {
    return null;
  }

  return mapCustomRequest(data);
}
