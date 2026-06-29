import { AdminShell } from "@/features/admin/components/admin-shell";
import { AdminSectionHeader } from "@/features/admin/components/admin-section-header";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

async function handleCreate(formData: FormData) {
  "use server";
  await requireCapability("categories:manage");
  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  if (!name || !slug) return;

  const supabase = await createSupabaseServerClient();
  await supabase.from("categories").insert({ name, slug });
  revalidatePath("/admin/categorias");
}

async function handleDelete(id: string) {
  "use server";
  await requireCapability("categories:manage");
  const supabase = await createSupabaseServerClient();
  await supabase.from("categories").update({ is_active: false }).eq("id", id);
  revalidatePath("/admin/categorias");
}

export default async function AdminCategoriesPage() {
  await requireCapability("categories:manage");

  const supabase = await createSupabaseServerClient();
  const { data: allCategories } = await supabase
    .from("categories")
    .select("id,name,slug,is_active,sort_order")
    .order("sort_order");

  return (
    <AdminShell>
      <AdminSectionHeader title="Categorías" description="Gestiona las categorías de productos." />
      <form action={handleCreate} className="mb-6 flex gap-3">
        <input name="name" placeholder="Nombre" required className="flex-1 rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" />
        <input name="slug" placeholder="slug" required className="flex-1 rounded-[8px] border border-white/10 bg-white/[0.07] px-4 py-3 text-sm text-white outline-none" />
        <button type="submit" className="rounded-[8px] bg-cyan-400 px-5 py-3 text-sm font-medium text-black hover:bg-cyan-300">
          Crear
        </button>
      </form>
      <div className="overflow-x-auto rounded-[8px] border border-white/10">
        <table className="w-full text-sm text-slate-300">
          <thead className="border-b border-white/10 bg-white/[0.04] text-left text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-4 py-3">Nombre</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Activa</th>
              <th className="px-4 py-3">Orden</th>
              <th className="px-4 py-3">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {(allCategories ?? []).map((cat) => (
              <tr key={cat.id} className="transition hover:bg-white/[0.02]">
                <td className="px-4 py-3 font-medium text-white">{cat.name}</td>
                <td className="px-4 py-3 text-xs">{cat.slug}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2 py-0.5 text-xs ${cat.is_active ? "bg-emerald-400/10 text-emerald-300" : "bg-red-400/10 text-red-300"}`}>
                    {cat.is_active ? "Si" : "No"}
                  </span>
                </td>
                <td className="px-4 py-3">{cat.sort_order}</td>
                <td className="px-4 py-3">
                  <form action={handleDelete.bind(null, cat.id)}>
                    <button type="submit" className="rounded px-2 py-1 text-xs text-red-300 hover:bg-white/10">Desactivar</button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AdminShell>
  );
}
