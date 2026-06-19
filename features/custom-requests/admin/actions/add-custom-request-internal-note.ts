"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createCustomRequestEvent } from "@/features/custom-requests/services/request-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function addCustomRequestInternalNote(formData: FormData) {
  const user = await requireCapability("requests:manage");
  const requestId = String(formData.get("requestId"));
  const requestNumber = String(formData.get("requestNumber"));
  const note = String(formData.get("internalNote") ?? "").trim();
  if (!note) return;
  const supabase = await createSupabaseServerClient();
  await supabase.from("custom_requests").update({ internal_notes: note }).eq("id", requestId);
  await createCustomRequestEvent({ requestId, event: "internal_note_added", actorType: "admin", actorId: user.id });
  revalidatePath(`/admin/solicitudes/${requestNumber}`);
}
