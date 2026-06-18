import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { StoreSettingsForm } from "@/features/admin/components/store-settings-form";
import { getStoreSettings } from "@/features/admin/data/get-store-settings";

export default async function AdminSettingsPage() {
  const settings = await getStoreSettings();

  return (
    <AdminShell>
      <AdminSectionHeader title="Configuracion" description="Datos del negocio, contacto, redes, envio, mantenimiento y AdSense." />
      <StoreSettingsForm settings={settings} />
    </AdminShell>
  );
}
