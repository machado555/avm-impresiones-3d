import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { getOrderByNumber } from "@/features/orders/data/get-order-by-number";
import { getOrderTimeline } from "@/features/orders/data/get-order-timeline";
import { OrderItemsList } from "@/features/orders/components/order-items-list";
import { OrderStatusBadge } from "@/features/orders/components/order-status-badge";
import { OrderTimeline } from "@/features/orders/components/order-timeline";

type OrderDetailPageProps = {
  params: Promise<{ orderNumber: string }>;
};

export async function generateMetadata({ params }: OrderDetailPageProps) {
  const { orderNumber } = await params;

  return {
    title: `Pedido ${orderNumber}`
  };
}

export default async function OrderDetailPage({ params }: OrderDetailPageProps) {
  const { orderNumber } = await params;
  const order = await getOrderByNumber(orderNumber);

  if (!order) {
    notFound();
  }

  const timeline = await getOrderTimeline(order.id);

  return (
    <Section eyebrow="Pedido" title={order.orderNumber} description="Resumen completo de tu pedido con los items y el estado actual.">
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Items</h2>
            <div className="mt-5">
              <OrderItemsList items={order.items ?? []} />
            </div>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Timeline</h2>
            <div className="mt-5">
              <OrderTimeline events={timeline} />
            </div>
          </GlassCard>
        </div>
        <GlassCard className="h-fit">
          <div className="flex items-center justify-between gap-3">
            <span className="text-sm text-slate-400">Estado</span>
            <OrderStatusBadge status={order.status} />
          </div>
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-sm text-slate-400">Pago</span>
            <OrderStatusBadge status={order.paymentStatus} />
          </div>
          <div className="mt-6 border-t border-white/10 pt-4 text-sm text-slate-300">
            <Row label="Subtotal" value={formatPrice(order.subtotal)} />
            <Row label="Descuentos" value={formatPrice(order.discounts)} />
            <Row label="Envio" value={formatPrice(order.shipping)} />
            <Row label="Total" value={formatPrice(order.total)} strong />
            <Row label="Puntos estimados" value={`${order.estimatedPoints}`} />
            <Row label="Entrega" value={order.deliveryMethod === "pickup" ? "Retiro" : "Envio"} />
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "mt-3 flex justify-between text-base font-semibold text-white" : "mt-3 flex justify-between"}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}
