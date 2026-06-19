"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createCustomRequestEvent } from "@/features/custom-requests/services/request-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function duplicateCustomRequestQuote(quoteId: string, requestId: string, requestNumber: string) {
  const user = await requireCapability("requests:manage");
  const supabase = await createSupabaseServerClient();
  const { data: quote } = await supabase.from("custom_request_quotes").select("*").eq("id", quoteId).single();
  if (!quote) return { ok: false };

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
    material: quote.material,
    estimated_weight_grams: quote.estimated_weight_grams,
    estimated_print_time_minutes: quote.estimated_print_time_minutes,
    material_cost: quote.material_cost,
    labor_cost: quote.labor_cost,
    machine_cost: quote.machine_cost,
    margin_percentage: quote.margin_percentage,
    subtotal: quote.subtotal,
    final_price: quote.final_price,
    currency: quote.currency,
    version,
    is_active: true,
    valid_until: quote.valid_until,
    notes: quote.notes,
    created_by: user.id
  });
  await createCustomRequestEvent({ requestId, event: "quote_duplicated", actorType: "admin", actorId: user.id, metadata: { fromQuoteId: quoteId, version } });
  revalidatePath(`/admin/solicitudes/${requestNumber}`);
  return { ok: true };
}
