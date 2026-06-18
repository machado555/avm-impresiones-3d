import { AdminPlaceholderPanel } from "@/features/admin/components/admin-placeholder-panel";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { requireCapability } from "@/features/auth/guards/require-role";

export default async function AdminMaterialsPage() {
  await requireCapability("materials:manage");

  return (
    <AdminShell>
      <AdminSectionHeader title="Materiales y colores" description="Gestion futura de materiales, costos por gramo, colores disponibles y margenes." />
      <AdminPlaceholderPanel title="Gestion de materiales" />
    </AdminShell>
  );
}
