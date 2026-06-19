import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CustomRequestQuote } from "@/types/custom-requests";

export async function getAdminCustomRequestQuotes(requestId: string): Promise<CustomRequestQuote[]> {
  await requireCapability("requests:manage");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("custom_request_quotes")
    .select("*")
    .eq("request_id", requestId)
    .order("version", { ascending: false });

  if (error || !data) return [];

  return data.map((row) => ({
    id: row.id,
    requestId: row.request_id,
    material: row.material,
    estimatedWeightGrams: Number(row.estimated_weight_grams),
    estimatedPrintTimeMinutes: row.estimated_print_time_minutes,
    materialCost: Number(row.material_cost),
    laborCost: Number(row.labor_cost),
    machineCost: Number(row.machine_cost),
    marginPercentage: Number(row.margin_percentage),
    subtotal: Number(row.subtotal),
    finalPrice: Number(row.final_price),
    currency: row.currency,
    version: row.version,
    isActive: row.is_active,
    validUntil: row.valid_until,
    sentAt: row.sent_at,
    acceptedAt: row.accepted_at,
    rejectedAt: row.rejected_at,
    notes: row.notes,
    createdBy: row.created_by,
    createdAt: row.created_at
  }));
}
