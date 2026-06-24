import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminStatCard } from "@/features/admin/components/admin-stat-card";
import { getAdminDashboardMetrics } from "@/features/admin/data/get-admin-dashboard-metrics";

export const metadata = {
  title: "Admin"
};

export default async function AdminPage() {
  const metrics = await getAdminDashboardMetrics();

  return (
    <AdminShell>
      <AdminSectionHeader title="Panel admin" description="Metricas operativas, pedidos, solicitudes, productos y configuracion comercial." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Solicitudes pendientes" value={metrics.pendingRequests} />
        <AdminStatCard label="Solicitudes urgentes" value={metrics.urgentRequests} />
        <AdminStatCard label="Sin cotizar" value={metrics.unquotedRequests} />
        <AdminStatCard label="Pedidos activos" value={metrics.activeOrders} />
        <AdminStatCard label="Pendientes de pago" value={metrics.pendingPaymentOrders} />
        <AdminStatCard label="Productos" value={metrics.totalProducts} />
        <AdminStatCard label="Ingresos estimados" value={formatPrice(metrics.estimatedRevenue)} />
        <AdminStatCard label="Ingresos del mes" value={formatPrice(metrics.monthRevenue)} />
        <AdminStatCard label="Usuarios registrados" value={metrics.registeredUsers} hint={`${metrics.newUsersMonth} nuevos este mes`} />
        <AdminStatCard label="Productos sin stock" value={metrics.outOfStockProducts} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <GlassCard>
          <h2 className="text-lg font-semibold text-white">Solicitudes por estado</h2>
          <div className="mt-4 grid gap-2">
            {Object.entries(metrics.requestsByStatus).map(([status, count]) => (
              <div key={status} className="flex justify-between rounded-[8px] border border-white/10 p-3 text-sm text-slate-300">
                <span>{status}</span>
                <span>{count}</span>
              </div>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-lg font-semibold text-white">Ultimas solicitudes</h2>
          <div className="mt-4 grid gap-3">
            {metrics.latestRequests.map((request) => (
              <Link key={request.request_number} href={`/admin/solicitudes/${request.request_number}`} className="cursor-pointer rounded-[8px] border border-white/10 p-3 text-sm text-slate-300 hover:bg-white/10">
                {request.request_number} · {request.project_name} · {request.status}
              </Link>
            ))}
          </div>
        </GlassCard>
        <GlassCard>
          <h2 className="text-lg font-semibold text-white">Ultimos pedidos</h2>
          <div className="mt-4 grid gap-3">
            {metrics.latestOrders.map((order) => (
              <Link key={order.order_number} href={`/pedidos/${order.order_number}`} className="cursor-pointer rounded-[8px] border border-white/10 p-3 text-sm text-slate-300 hover:bg-white/10">
                {order.order_number} · {order.status} · {formatPrice(Number(order.total))}
              </Link>
            ))}
          </div>
        </GlassCard>
      </div>
    </AdminShell>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}
