import { AdminPlaceholderPanel } from "@/features/admin/components/admin-placeholder-panel";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { requireCapability } from "@/features/auth/guards/require-role";

export default async function AdminProductsPage() {
  await requireCapability("products:manage");

  return (
    <AdminShell>
      <AdminSectionHeader title="Productos" description="Gestion futura de catalogo, variantes, imagenes, stock y SEO." />
      <AdminPlaceholderPanel title="Gestion de productos" />
    </AdminShell>
  );
}
