import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";

export default async function AdminLogsPage() {
  return (
    <AdminShell>
      <AdminSectionHeader title="Logs" description="Registro de actividad y eventos del sistema." />
      <div className="rounded-lg border border-white/10 bg-white/5 p-6 text-white/60">
        Módulo en construcción.
      </div>
    </AdminShell>
  );
}
