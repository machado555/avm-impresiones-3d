import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { StoreSettings } from "@/features/admin/types";

export async function getStoreSettings(): Promise<StoreSettings | null> {
  try {
    const supabase = await createSupabaseServerClient();
    const { data, error } = await supabase.from("store_settings").select("*").limit(1).maybeSingle();

    if (error || !data) {
      return null;
    }

    return {
      id: data.id,
      businessName: data.business_name,
      whatsappNumber: data.whatsapp_number,
      supportEmail: data.support_email,
      address: data.address,
      instagramUrl: data.instagram_url,
      facebookUrl: data.facebook_url,
      logoUrl: data.logo_url,
      faviconUrl: data.favicon_url,
      defaultCurrency: data.default_currency,
      shippingEnabled: data.shipping_enabled,
      customRequestsEnabled: data.custom_requests_enabled,
      maintenanceMode: data.maintenance_mode,
      maintenanceMessage: data.maintenance_message,
      adsenseEnabled: data.adsense_enabled
    };
  } catch {
    return null;
  }
}
