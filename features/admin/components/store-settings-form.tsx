"use client";

import { useActionState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { updateStoreSettings as updateStoreSettingsAction } from "@/features/admin/actions/update-store-settings";
import { addToast } from "@/lib/stores/toast-store";
import type { StoreSettings } from "@/features/admin/types";

async function wrappedAction(_prevState: { ok: boolean; message: string } | null, formData: FormData) {
  try {
    await updateStoreSettingsAction(formData);
    return { ok: true, message: "Configuracion guardada correctamente." };
  } catch {
    return { ok: false, message: "Error al guardar la configuracion." };
  }
}

const inputClass = "rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none";

export function StoreSettingsForm({ settings }: { settings: StoreSettings | null }) {
  const [state, formAction, isPending] = useActionState(wrappedAction, null);

  useEffect(() => {
    if (state) {
      addToast(state.ok ? "success" : "error", state.message);
    }
  }, [state]);

  return (
    <form action={formAction} className="glass grid gap-4 rounded-[8px] p-5">
      <input type="hidden" name="id" value={settings?.id ?? ""} />
      <div className="grid gap-4 md:grid-cols-2">
        <input className={inputClass} name="businessName" placeholder="Nombre del negocio" defaultValue={settings?.businessName ?? "AVM-Impresiones 3D"} />
        <input className={inputClass} name="whatsappNumber" placeholder="WhatsApp" defaultValue={settings?.whatsappNumber ?? ""} />
        <input className={inputClass} name="supportEmail" placeholder="Email soporte" defaultValue={settings?.supportEmail ?? ""} />
        <input className={inputClass} name="defaultCurrency" placeholder="Moneda" defaultValue={settings?.defaultCurrency ?? "ARS"} />
        <input className={inputClass} name="address" placeholder="Direccion" defaultValue={settings?.address ?? ""} />
        <input className={inputClass} name="instagramUrl" placeholder="Instagram URL" defaultValue={settings?.instagramUrl ?? ""} />
        <input className={inputClass} name="facebookUrl" placeholder="Facebook URL" defaultValue={settings?.facebookUrl ?? ""} />
        <input className={inputClass} name="logoUrl" placeholder="Logo URL" defaultValue={settings?.logoUrl ?? ""} />
        <input className={inputClass} name="faviconUrl" placeholder="Favicon URL" defaultValue={settings?.faviconUrl ?? ""} />
      </div>
      <textarea className={`${inputClass} min-h-24 resize-y`} name="maintenanceMessage" placeholder="Mensaje de mantenimiento" defaultValue={settings?.maintenanceMessage ?? ""} />
      <div className="grid gap-3 text-sm text-slate-300 md:grid-cols-2">
        <label><input name="shippingEnabled" type="checkbox" defaultChecked={settings?.shippingEnabled ?? true} /> Envios activos</label>
        <label><input name="customRequestsEnabled" type="checkbox" defaultChecked={settings?.customRequestsEnabled ?? true} /> Solicitudes activas</label>
        <label><input name="maintenanceMode" type="checkbox" defaultChecked={settings?.maintenanceMode ?? false} /> Modo mantenimiento</label>
        <label><input name="adsenseEnabled" type="checkbox" defaultChecked={settings?.adsenseEnabled ?? false} /> AdSense habilitado</label>
      </div>
      <Button type="submit" disabled={isPending}>{isPending ? "Guardando..." : "Guardar configuracion"}</Button>
    </form>
  );
}
