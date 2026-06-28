"use server";

import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { attachCustomRequestFiles } from "@/features/custom-requests/actions/attach-custom-request-files";
import { createRequestNumber } from "@/features/custom-requests/services/request-number";
import { createCustomRequestEvent } from "@/features/custom-requests/services/request-events";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CustomRequestPriority, CustomRequestType } from "@/types/custom-requests";

export async function createCustomRequest(formData: FormData) {
  const user = await getCurrentProfile();
  const contactName = String(formData.get("contactName") ?? user?.fullName ?? "").trim();
  const contactEmail = String(formData.get("contactEmail") ?? user?.email ?? "").trim();
  const contactPhone = String(formData.get("contactPhone") ?? user?.phone ?? "").trim() || null;
  const projectName = String(formData.get("projectName") ?? "").trim();
  const description = String(formData.get("description") ?? "").trim();
  const termsAccepted = formData.get("termsAccepted") === "on";
  const privacyAccepted = formData.get("privacyAccepted") === "on";
  const fileOwnershipAccepted = formData.get("fileOwnershipAccepted") === "on";

  if (!contactName || !contactEmail || !projectName || !description) {
    return { ok: false, message: "Completa nombre, email, proyecto y descripcion." };
  }

  if (!termsAccepted || !privacyAccepted || !fileOwnershipAccepted) {
    return { ok: false, message: "Debes aceptar las condiciones legales para enviar la solicitud." };
  }

  const requestNumber = createRequestNumber();
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("custom_requests")
    .insert({
      user_id: user?.id ?? null,
      request_number: requestNumber,
      status: "pending",
      contact_name: contactName,
      contact_email: contactEmail,
      contact_phone: contactPhone,
      request_type: String(formData.get("requestType") ?? "custom_model") as CustomRequestType,
      priority: String(formData.get("priority") ?? "normal") as CustomRequestPriority,
      project_name: projectName,
      description,
      quantity: Number(formData.get("quantity") ?? 1),
      material: String(formData.get("material") ?? "").trim() || null,
      color: String(formData.get("color") ?? "").trim() || null,
      quality: String(formData.get("quality") ?? "").trim() || null,
      estimated_size: String(formData.get("estimatedSize") ?? "").trim() || null,
      estimated_date: String(formData.get("estimatedDate") ?? "").trim() || null,
      notes: String(formData.get("notes") ?? "").trim() || null,
      terms_accepted: true,
      terms_accepted_at: new Date().toISOString(),
      privacy_accepted: true,
      privacy_accepted_at: new Date().toISOString(),
      file_ownership_accepted: true,
      file_ownership_accepted_at: new Date().toISOString()
    })
    .select("id,request_number")
    .single();

  if (error || !data) {
    return { ok: false, message: "No se pudo crear la solicitud." };
  }

  const files = formData.getAll("files").filter((file): file is File => file instanceof File && file.size > 0);
  await attachCustomRequestFiles({
    requestId: data.id,
    requestNumber: data.request_number,
    files,
    uploadedBy: user ? "customer" : "guest",
    actorId: user?.id ?? null
  });
  await createCustomRequestEvent({
    requestId: data.id,
    event: "request_created",
    actorType: user ? "customer" : "guest",
    actorId: user?.id ?? null,
    metadata: { requestNumber: data.request_number }
  });

  redirect(`/cotizar/confirmacion`);
}
