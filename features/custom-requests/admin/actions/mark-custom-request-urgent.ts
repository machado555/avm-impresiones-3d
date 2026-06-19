"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createCustomRequestEvent } from "@/features/custom-requests/services/request-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function markCustomRequestUrgent(requestId: string, requestNumber: string) {
  const user = await requireCapability("requests:manage");
  const supabase = await createSupabaseServerClient();
  await supabase.from("custom_requests").update({ is_urgent: true, priority: "urgent" }).eq("id", requestId);
  await createCustomRequestEvent({ requestId, event: "marked_urgent", actorType: "admin", actorId: user.id });
  revalidatePath(`/admin/solicitudes/${requestNumber}`);
}
