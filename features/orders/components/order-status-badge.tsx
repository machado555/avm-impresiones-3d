import type { OrderStatus, PaymentStatus } from "@/types/orders";

type OrderStatusBadgeProps = {
  status: OrderStatus | PaymentStatus;
};

const labels: Record<string, string> = {
  draft: "Borrador",
  pending_payment: "Pendiente de pago",
  payment_processing: "Pago en proceso",
  paid: "Pagado",
  processing: "En preparacion",
  printing: "Imprimiendo",
  ready_for_pickup: "Listo para retirar",
  shipped: "Enviado",
  delivered: "Entregado",
  cancelled: "Cancelado",
  refunded: "Reintegrado",
  pending: "Pendiente",
  approved: "Aprobado",
  rejected: "Rechazado"
};

export function OrderStatusBadge({ status }: OrderStatusBadgeProps) {
  return (
    <span className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-300/10 px-3 py-1 text-xs font-semibold text-cyan-100">
      {labels[status] ?? status}
    </span>
  );
}
