import { Section } from "@/components/ui/section";
import { CustomRequestList } from "@/features/custom-requests/components/custom-request-list";
import { EmptyCustomRequestsState } from "@/features/custom-requests/components/empty-custom-requests-state";
import { getCustomRequests } from "@/features/custom-requests/data/get-custom-requests";

export const metadata = {
  title: "Solicitudes"
};

export default async function CustomRequestsPage() {
  const requests = await getCustomRequests();

  return (
    <Section eyebrow="Mi cuenta" title="Solicitudes personalizadas" description="Seguimiento de trabajos de diseno, impresion 3D y cotizaciones.">
      {requests.length > 0 ? <CustomRequestList requests={requests} /> : <EmptyCustomRequestsState />}
    </Section>
  );
}
