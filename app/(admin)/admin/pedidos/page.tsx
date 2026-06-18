import { AdminPlaceholderPanel } from "@/features/admin/components/admin-placeholder-panel";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { requireCapability } from "@/features/auth/guards/require-role";

export default async function AdminOrdersPage() {
  await requireCapability("orders:manage");

  return (
    <AdminShell>
      <AdminSectionHeader title="Pedidos" description="Gestion futura de estados, pagos, envios, facturacion y eventos." />
      <AdminPlaceholderPanel title="Gestion de pedidos" />
    </AdminShell>
  );
}
