import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { EmptyOrdersState } from "@/features/orders/components/empty-orders-state";
import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";
import { getOrders } from "@/features/orders/data/get-orders";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <Section eyebrow="Mi cuenta" title="Historial de pedidos" description="Pedidos confirmados, estado de pago, timeline y puntos estimados.">
      {orders.length === 0 ? (
        <EmptyOrdersState />
      ) : (
        <div className="grid gap-3">
          {orders.map((order) => (
            <GlassCard key={order.id} className="grid gap-4 md:grid-cols-[1fr_auto_auto] md:items-center">
              <div>
                <p className="font-semibold text-white">{order.orderNumber}</p>
                <p className="mt-1 text-sm text-slate-400">{order.createdAt ? new Date(order.createdAt).toLocaleDateString("es-AR") : ""}
              </div>
              <div className="flex flex-wrap gap-2">
                <OrderStatusBadge status={order.status} />
                <OrderStatusBadge status={order.paymentStatus} />
              </div>
              <div className="grid gap-2 md:justify-items-end">
                <p className="font-semibold text-white">{formatPrice(order.total)}</p>
                <ButtonLink href={`/pedidos/${order.orderNumber}`} variant="secondary" className="min-h-9 px-4">
                  Ver detalle
                </ButtonLink>
              </div>
            </GlassCard>
          ))}
        </div>
      )}
    </Section>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}
