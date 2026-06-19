"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createCustomRequestEvent } from "@/features/custom-requests/services/request-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CustomRequestStatus } from "@/types/custom-requests";

export async function updateCustomRequestStatus(formData: FormData) {
  const user = await requireCapability("requests:manage");
  const requestId = String(formData.get("requestId"));
  const requestNumber = String(formData.get("requestNumber"));
  const status = String(formData.get("status")) as CustomRequestStatus;
  const patch: Record<string, unknown> = { status, last_status_change_at: new Date().toISOString() };
  if (status === "approved") patch.approved_at = new Date().toISOString();

  const supabase = await createSupabaseServerClient();
  await supabase.from("custom_requests").update(patch).eq("id", requestId);
  await createCustomRequestEvent({ requestId, event: "status_changed", actorType: "admin", actorId: user.id, metadata: { status } });
  revalidatePath(`/admin/solicitudes/${requestNumber}`);
}
