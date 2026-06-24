import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { requireCapability } from "@/features/auth/guards/require-role";
import { getAdminProductById } from "@/features/products/admin/data/get-admin-product-by-id";
import { getCategories } from "@/features/products/data/get-categories";
import { ProductForm } from "@/features/products/admin/components/product-form";

type EditProductPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditProductPage({ params }: EditProductPageProps) {
  await requireCapability("products:manage");
  const { id } = await params;
  const [product, categories] = await Promise.all([
    getAdminProductById(id),
    getCategories()
  ]);

  if (!product) notFound();

  return (
    <AdminShell>
      <AdminSectionHeader title={product.name} description={`Editando producto #${product.id.slice(0, 8)}`} />
      <Link href="/admin/productos" className="mb-4 inline-block text-sm text-cyan-200 hover:underline">&larr; Volver al listado</Link>
      <ProductForm product={product} categories={categories} />
    </AdminShell>
  );
}
