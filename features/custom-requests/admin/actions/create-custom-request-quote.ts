"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { calculateManualQuote } from "@/features/quote-calculator/calculate-manual-quote";
import { createCustomRequestEvent } from "@/features/custom-requests/services/request-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function createCustomRequestQuote(formData: FormData) {
  const user = await requireCapability("requests:manage");
  const requestId = String(formData.get("requestId"));
  const requestNumber = String(formData.get("requestNumber"));
  const materialCost = Number(formData.get("materialCost") ?? 0);
  const laborCost = Number(formData.get("laborCost") ?? 0);
  const machineCost = Number(formData.get("machineCost") ?? 0);
  const marginPercentage = Number(formData.get("marginPercentage") ?? 0);
  const quote = calculateManualQuote({ materialCost, laborCost, machineCost, marginPercentage });
  const supabase = await createSupabaseServerClient();
  const { data: latest } = await supabase
    .from("custom_request_quotes")
    .select("version")
    .eq("request_id", requestId)
    .order("version", { ascending: false })
    .limit(1)
    .maybeSingle();
  const version = Number(latest?.version ?? 0) + 1;

  await supabase.from("custom_request_quotes").update({ is_active: false }).eq("request_id", requestId);
  await supabase.from("custom_request_quotes").insert({
    request_id: requestId,
    material: String(formData.get("material") ?? "").trim(),
    estimated_weight_grams: Number(formData.get("estimatedWeightGrams") ?? 0),
    estimated_print_time_minutes: Number(formData.get("estimatedPrintTimeMinutes") ?? 0),
    material_cost: materialCost,
    labor_cost: laborCost,
    machine_cost: machineCost,
    margin_percentage: marginPercentage,
    subtotal: quote.subtotal,
    final_price: quote.finalPrice,
    currency: String(formData.get("currency") ?? "ARS"),
    version,
    is_active: true,
    valid_until: String(formData.get("validUntil") ?? "") || null,
    notes: String(formData.get("notes") ?? "").trim() || null,
    created_by: user.id
  });
  await supabase
    .from("custom_requests")
    .update({ status: "quoted", estimated_price: quote.finalPrice, quoted_at: new Date().toISOString(), last_status_change_at: new Date().toISOString() })
    .eq("id", requestId);
  await createCustomRequestEvent({ requestId, event: "quote_created", actorType: "admin", actorId: user.id, metadata: { version, finalPrice: quote.finalPrice } });
  revalidatePath(`/admin/solicitudes/${requestNumber}`);
}
