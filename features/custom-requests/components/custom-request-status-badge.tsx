import type { CustomRequestStatus } from "@/types/custom-requests";

const labels: Record<CustomRequestStatus, string> = {
  received: "Recibida",
  pending: "Pendiente",
  reviewing: "En revision",
  quoted: "Cotizada",
  approved: "Aprobada",
  printing: "Imprimiendo",
  ready: "Lista",
  delivered: "Entregada",
  rejected: "Rechazada",
  cancelled: "Cancelada"
};

export function CustomRequestStatusBadge({ status }: { status: CustomRequestStatus }) {
  return (
    <span className="inline-flex rounded-full border border-violet-300/25 bg-violet-300/10 px-3 py-1 text-xs font-semibold text-violet-100">
      {labels[status]}
    </span>
  );
}
