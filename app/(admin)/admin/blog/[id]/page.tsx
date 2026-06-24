import { notFound } from "next/navigation";
import Link from "next/link";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { requireCapability } from "@/features/auth/guards/require-role";
import { getAdminBlogPostById, getBlogCategories } from "@/features/blog/admin/data/get-admin-blog-post-by-id";
import { BlogForm } from "@/features/blog/admin/components/blog-form";

type EditBlogPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditBlogPostPage({ params }: EditBlogPostPageProps) {
  await requireCapability("blog:manage");
  const { id } = await params;
  const [post, categories] = await Promise.all([
    getAdminBlogPostById(id),
    getBlogCategories()
  ]);

  if (!post) notFound();

  return (
    <AdminShell>
      <AdminSectionHeader title={post.title} description="Editando articulo del blog." />
      <Link href="/admin/blog" className="mb-4 inline-block text-sm text-cyan-200 hover:underline">&larr; Volver al blog</Link>
      <BlogForm post={post} categories={categories} />
    </AdminShell>
  );
}
