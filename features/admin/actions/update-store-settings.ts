"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateStoreSettings(formData: FormData) {
  await requireCapability("admin:access");
  const supabase = await createSupabaseServerClient();
  const id = String(formData.get("id") ?? "");
  const payload = {
    business_name: String(formData.get("businessName") ?? "").trim(),
    whatsapp_number: String(formData.get("whatsappNumber") ?? "").trim(),
    support_email: String(formData.get("supportEmail") ?? "").trim(),
    address: String(formData.get("address") ?? "").trim() || null,
    instagram_url: String(formData.get("instagramUrl") ?? "").trim() || null,
    facebook_url: String(formData.get("facebookUrl") ?? "").trim() || null,
    logo_url: String(formData.get("logoUrl") ?? "").trim() || null,
    favicon_url: String(formData.get("faviconUrl") ?? "").trim() || null,
    default_currency: String(formData.get("defaultCurrency") ?? "ARS").trim(),
    shipping_enabled: formData.get("shippingEnabled") === "on",
    custom_requests_enabled: formData.get("customRequestsEnabled") === "on",
    maintenance_mode: formData.get("maintenanceMode") === "on",
    maintenance_message: String(formData.get("maintenanceMessage") ?? "").trim() || null,
    adsense_enabled: formData.get("adsenseEnabled") === "on"
  };

  if (id) {
    await supabase.from("store_settings").update(payload).eq("id", id);
  } else {
    await supabase.from("store_settings").insert(payload);
  }

  revalidatePath("/admin/configuracion");
  return { ok: true };
}
