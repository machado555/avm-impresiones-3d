import { requireCapability } from "@/features/auth/guards/require-role";
import { customRequestSelect } from "@/features/custom-requests/data/custom-request-select";
import { mapCustomRequest } from "@/features/custom-requests/mappers/map-custom-request";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type AdminCustomRequestFilters = {
  status?: string;
  priority?: string;
  requestType?: string;
  from?: string;
  to?: string;
  query?: string;
};

export async function getAdminCustomRequests(filters: AdminCustomRequestFilters = {}) {
  await requireCapability("requests:manage");
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("custom_requests").select(customRequestSelect).order("created_at", { ascending: false });

  if (filters.status) query = query.eq("status", filters.status);
  if (filters.priority) query = query.eq("priority", filters.priority);
  if (filters.requestType) query = query.eq("request_type", filters.requestType);
  if (filters.from) query = query.gte("created_at", filters.from);
  if (filters.to) query = query.lte("created_at", filters.to);
  if (filters.query) {
    const value = `%${filters.query}%`;
    query = query.or(`request_number.ilike.${value},contact_name.ilike.${value},contact_email.ilike.${value}`);
  }

  const { data, error } = await query;
  return error || !data ? [] : data.map(mapCustomRequest);
}
