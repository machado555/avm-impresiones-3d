import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";

export default async function AdminCategoriasPage() {
  return (
    <AdminShell>
      <AdminSectionHeader title="Categorias" description="Gestión del árbol de categorías del catálogo." />
      <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-white/60">
        Módulo en construcción.
      </div>
    </AdminShell>
  );
}
