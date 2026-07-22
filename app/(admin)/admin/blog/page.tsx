import { Button, ButtonLink } from "@/components/ui/button";
import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { requireCapability } from "@/features/auth/guards/require-role";
import { getAdminBlogPosts } from "@/features/blog/admin/data/get-admin-blog-posts";
import { deleteBlogPost } from "@/features/blog/admin/actions/blog-posts";

export default async function AdminBlogPage() {
  await requireCapability("blog:manage");
  const posts = await getAdminBlogPosts();
  return (
    <AdminShell>
      <AdminSectionHeader title="Blog" description="Gestiona los articulos del blog." />
      <ButtonLink href="/admin/blog/nuevo" className="mb-6">
        + Nuevo articulo
      </ButtonLink>
      <div className="avm-table">
        <table>
          <thead>
            <tr>
              <th>Titulo</th>
              <th>Categoria</th>
              <th>Estado</th>
              <th>Fecha</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="font-medium text-white">{post.title}</td>
                <td className="text-xs">{post.categoryName ?? "-"}</td>
                <td>
                  <span className={`avm-status-badge ${
                    post.status === "published" ? "avm-status-badge--success" :
                    post.status === "archived" ? "avm-status-badge--danger" :
                    ""
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="text-xs">{new Date(post.createdAt).toLocaleDateString("es-AR")}</td>
                <td>
                  <div className="flex items-center gap-2">
                    <ButtonLink href={`/admin/blog/${post.id}`} variant="ghost" size="sm">Editar</ButtonLink>
                    <form action={async () => { await deleteBlogPost(post.id); }}>
                      <Button type="submit" variant="danger" size="sm">Archivar</Button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="py-8 text-center text-slate-500">No hay articulos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
