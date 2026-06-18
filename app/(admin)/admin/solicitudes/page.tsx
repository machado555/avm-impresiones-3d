import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminCustomRequestFilters } from "@/features/custom-requests/admin/components/admin-custom-request-filters";
import { AdminCustomRequestList } from "@/features/custom-requests/admin/components/admin-custom-request-list";
import { getAdminCustomRequests } from "@/features/custom-requests/admin/data/get-admin-custom-requests";

type AdminRequestsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function AdminRequestsPage({ searchParams }: AdminRequestsPageProps) {
  const params = await searchParams;
  const get = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };
  const requests = await getAdminCustomRequests({
    status: get("status"),
    priority: get("priority"),
    requestType: get("requestType"),
    from: get("from"),
    to: get("to"),
    query: get("query")
  });

  return (
    <AdminShell>
      <AdminSectionHeader title="Solicitudes personalizadas" description="Revision, filtros, archivos, cotizaciones y estados." />
      <AdminCustomRequestFilters />
      <AdminCustomRequestList requests={requests} />
    </AdminShell>
  );
}
