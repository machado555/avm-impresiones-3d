import { requireCapability } from "@/features/auth/guards/require-role";
import { customRequestSelect } from "@/features/custom-requests/data/custom-request-select";
import { mapCustomRequest } from "@/features/custom-requests/mappers/map-custom-request";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getAdminCustomRequestByNumber(requestNumber: string) {
  await requireCapability("requests:manage");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("custom_requests").select(customRequestSelect).eq("request_number", requestNumber).single();
  return error || !data ? null : mapCustomRequest(data);
}
