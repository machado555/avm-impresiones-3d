import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { requireCapability } from "@/features/auth/guards/require-role";
import { getCategories } from "@/features/products/data/get-categories";
import { getCategories as getAllCategories } from "@/features/products/data/get-categories";
import { ProductForm } from "@/features/products/admin/components/product-form";

export default async function NewProductPage() {
  await requireCapability("products:manage");
  const categories = await getAllCategories();

  return (
    <AdminShell>
      <AdminSectionHeader title="Nuevo producto" description="Crea un nuevo producto en el catalogo." />
      <ProductForm product={null} categories={categories} />
    </AdminShell>
  );
}
