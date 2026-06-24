import Link from "next/link";
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
      <Link
        href="/admin/blog/nuevo"
        className="mb-6 inline-flex items-center rounded-[8px] bg-cyan-400 px-5 py-3 text-sm font-medium text-black transition hover:bg-cyan-300"
      >
        + Nuevo articulo
      </Link>
      <div className="overflow-x-auto rounded-[8px] border border-white/10">
        <table className="w-full text-sm text-slate-300">
          <thead className="border-b border-white/10 bg-white/[0.04] text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Titulo</th>
              <th className="px-4 py-3">Categoria</th>
              <th className="px-4 py-3">Estado</th>
              <th className="px-4 py-3">Fecha</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {posts.map((post) => (
              <tr key={post.id} className="transition hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">{post.title}</td>
                <td className="px-4 py-3 text-xs">{post.categoryName ?? "—"}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                    post.status === "published" ? "bg-emerald-400/10 text-emerald-300" :
                    post.status === "archived" ? "bg-red-400/10 text-red-300" :
                    "bg-slate-400/10 text-slate-400"
                  }`}>
                    {post.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-xs">{new Date(post.createdAt).toLocaleDateString("es-AR")}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <Link href={`/admin/blog/${post.id}`} className="rounded px-2 py-1 text-xs text-cyan-200 hover:bg-white/10">Editar</Link>
                    <form action={async () => { await deleteBlogPost(post.id); }}>
                      <button type="submit" className="rounded px-2 py-1 text-xs text-red-300 hover:bg-white/10" onClick={(e) => { if (!confirm("Archivar articulo?")) e.preventDefault(); }}>Archivar</button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
            {posts.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-8 text-center text-slate-500">No hay articulos.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
