import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { CustomRequestStatusBadge } from "@/features/custom-requests/components/custom-request-status-badge";
import { CustomRequestTimeline } from "@/features/custom-requests/components/custom-request-timeline";
import { getCustomRequestByNumber } from "@/features/custom-requests/data/get-custom-request-by-number";
import { getCustomRequestTimeline } from "@/features/custom-requests/data/get-custom-request-timeline";

type CustomRequestDetailPageProps = {
  params: Promise<{ requestNumber: string }>;
};

export async function generateMetadata({ params }: CustomRequestDetailPageProps) {
  const { requestNumber } = await params;

  return {
    title: `Solicitud ${requestNumber}`
  };
}

export default async function CustomRequestDetailPage({ params }: CustomRequestDetailPageProps) {
  const { requestNumber } = await params;
  const request = await getCustomRequestByNumber(requestNumber);

  if (!request) {
    notFound();
  }

  const timeline = await getCustomRequestTimeline(request.id);

  return (
    <Section eyebrow="Solicitud" title={request.projectName} description={request.requestNumber}>
      <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
        <div className="grid gap-6">
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Detalle</h2>
            <p className="mt-4 text-sm leading-6 text-slate-300">{request.description}</p>
            <div className="mt-5 grid gap-3 text-sm text-slate-300 md:grid-cols-2">
              <Row label="Cantidad" value={`${request.quantity}`} />
              <Row label="Material" value={request.material ?? "A definir"} />
              <Row label="Color" value={request.color ?? "A definir"} />
              <Row label="Calidad" value={request.quality ?? "Standard"} />
              <Row label="Tamano" value={request.estimatedSize ?? "A definir"} />
              <Row label="Prioridad" value={request.priority} />
            </div>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Timeline</h2>
            <div className="mt-5">
              <CustomRequestTimeline events={timeline} />
            </div>
          </GlassCard>
        </div>
        <GlassCard className="h-fit">
          <div className="flex items-center justify-between">
            <span className="text-sm text-slate-400">Estado</span>
            <CustomRequestStatusBadge status={request.status} />
          </div>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <Row label="Contacto" value={request.contactName} />
            <Row label="Email" value={request.contactEmail} />
            <Row label="Precio estimado" value={request.estimatedPrice ? formatPrice(request.estimatedPrice) : "Pendiente"} />
            <Row label="Archivos" value={`${request.files?.length ?? 0}`} />
          </div>
        </GlassCard>
      </div>
    </Section>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <span className="text-slate-500">{label}</span>
      <span className="text-right">{value}</span>
    </div>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}
