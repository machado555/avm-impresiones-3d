import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { requireCapability } from "@/features/auth/guards/require-role";
import { getBlogCategories } from "@/features/blog/admin/data/get-admin-blog-post-by-id";
import { BlogForm } from "@/features/blog/admin/components/blog-form";

export default async function NewBlogPostPage() {
  await requireCapability("blog:manage");
  const categories = await getBlogCategories();

  return (
    <AdminShell>
      <AdminSectionHeader title="Nuevo articulo" description="Crea un nuevo articulo para el blog." />
      <BlogForm post={null} categories={categories} />
    </AdminShell>
  );
}
