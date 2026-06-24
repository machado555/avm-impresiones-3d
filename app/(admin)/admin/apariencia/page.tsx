import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { requireCapability } from "@/features/auth/guards/require-role";
import { getCmsData } from "@/features/cms/admin/data/get-cms-data";
import { CmsManager } from "@/features/cms/admin/components/cms-manager";

export default async function AparienciaPage() {
  await requireCapability("cms:manage");
  const cmsData = await getCmsData();

  return (
    <AdminShell>
      <AdminSectionHeader title="Apariencia" description="Gestiona imagenes y textos del sitio web sin tocar codigo." />
      <CmsManager images={cmsData.images} texts={cmsData.texts} />
    </AdminShell>
  );
}
