import { GlassCard } from "@/components/ui/glass-card";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { getAdminUsers } from "@/features/admin/data/get-admin-users";

export default async function AdminUsersPage() {
  const users = await getAdminUsers();

  return (
    <AdminShell>
      <AdminSectionHeader title="Usuarios" description="Listado operativo preparado para roles, estados y permisos." />
      <div className="grid gap-3">
        {users.map((user) => (
          <GlassCard key={user.id} className="grid gap-3 md:grid-cols-[1fr_auto] md:items-center">
            <div>
              <p className="font-semibold text-white">{user.full_name ?? user.email ?? "Usuario"}</p>
              <p className="mt-1 text-sm text-slate-400">{user.email} · {user.phone ?? "sin telefono"}</p>
            </div>
            <div className="text-sm text-slate-300">{user.role} · {user.status}</div>
          </GlassCard>
        ))}
      </div>
    </AdminShell>
  );
}
