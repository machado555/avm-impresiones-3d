import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { markCustomRequestUrgent } from "@/features/custom-requests/admin/actions/mark-custom-request-urgent";
import { AdminRequestFiles } from "@/features/custom-requests/admin/components/admin-request-files";
import { AdminRequestInternalNoteForm } from "@/features/custom-requests/admin/components/admin-request-internal-note-form";
import { AdminRequestQuoteForm } from "@/features/custom-requests/admin/components/admin-request-quote-form";
import { AdminRequestQuotesList } from "@/features/custom-requests/admin/components/admin-request-quotes-list";
import { AdminRequestStatusForm } from "@/features/custom-requests/admin/components/admin-request-status-form";
import { getAdminCustomRequestByNumber } from "@/features/custom-requests/admin/data/get-admin-custom-request-by-number";
import { getAdminCustomRequestQuotes } from "@/features/custom-requests/admin/data/get-admin-custom-request-quotes";
import { CustomRequestTimeline } from "@/features/custom-requests/components/custom-request-timeline";
import { getCustomRequestTimeline } from "@/features/custom-requests/data/get-custom-request-timeline";

type AdminRequestDetailPageProps = {
  params: Promise<{ requestNumber: string }>;
};

export default async function AdminRequestDetailPage({ params }: AdminRequestDetailPageProps) {
  const { requestNumber } = await params;
  const request = await getAdminCustomRequestByNumber(requestNumber);
  if (!request) notFound();
  const [quotes, timeline] = await Promise.all([getAdminCustomRequestQuotes(request.id), getCustomRequestTimeline(request.id)]);

  return (
    <AdminShell>
      <AdminSectionHeader title={request.projectName} description={`${request.requestNumber} · ${request.contactName} · ${request.contactEmail}`} />
      <div className="grid gap-6 lg:grid-cols-[1fr_380px]">
        <div className="grid gap-6">
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Archivos</h2>
            <div className="mt-4"><AdminRequestFiles files={request.files ?? []} /></div>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Cotizador manual</h2>
            <div className="mt-4"><AdminRequestQuoteForm request={request} /></div>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Cotizaciones</h2>
            <div className="mt-4"><AdminRequestQuotesList quotes={quotes} requestId={request.id} requestNumber={request.requestNumber} /></div>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Timeline</h2>
            <div className="mt-4"><CustomRequestTimeline events={timeline} /></div>
          </GlassCard>
        </div>
        <div className="grid h-fit gap-4">
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Estado</h2>
            <div className="mt-4"><AdminRequestStatusForm request={request} /></div>
          </GlassCard>
          <GlassCard>
            <h2 className="text-lg font-semibold text-white">Nota interna</h2>
            <div className="mt-4"><AdminRequestInternalNoteForm request={request} /></div>
          </GlassCard>
          <form action={async () => { "use server"; await markCustomRequestUrgent(request.id, request.requestNumber); }}>
            <Button variant="secondary" className="w-full">Marcar urgente</Button>
          </form>
        </div>
      </div>
    </AdminShell>
  );
}
