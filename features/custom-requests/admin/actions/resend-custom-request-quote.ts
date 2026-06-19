"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createCustomRequestEvent } from "@/features/custom-requests/services/request-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function resendCustomRequestQuote(quoteId: string, requestId: string, requestNumber: string) {
  const user = await requireCapability("requests:manage");
  const supabase = await createSupabaseServerClient();
  await supabase.from("custom_request_quotes").update({ sent_at: new Date().toISOString() }).eq("id", quoteId);
  await createCustomRequestEvent({ requestId, event: "quote_resent", actorType: "admin", actorId: user.id, metadata: { quoteId, emailPrepared: true } });
  revalidatePath(`/admin/solicitudes/${requestNumber}`);
}
