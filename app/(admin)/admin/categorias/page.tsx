import { Button } from "@/components/ui/button";
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
      <AdminSectionHeader title="Categorias" description="Gestiona las categorias de productos." />
      <form action={handleCreate} className="mb-6 flex flex-col gap-3 sm:flex-row">
        <input name="name" placeholder="Nombre" required className="avm-input flex-1" />
        <input name="slug" placeholder="slug" required className="avm-input flex-1" />
        <Button type="submit">Crear</Button>
      </form>
      <div className="avm-table">
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Slug</th>
              <th>Activa</th>
              <th>Orden</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {(allCategories ?? []).map((cat) => (
              <tr key={cat.id}>
                <td className="font-medium text-white">{cat.name}</td>
                <td className="text-xs">{cat.slug}</td>
                <td>
                  <span className={`avm-status-badge ${cat.is_active ? "avm-status-badge--success" : "avm-status-badge--danger"}`}>
                    {cat.is_active ? "Si" : "No"}
                  </span>
                </td>
                <td>{cat.sort_order}</td>
                <td>
                  <form action={handleDelete.bind(null, cat.id)}>
                    <Button type="submit" variant="danger" size="sm">Desactivar</Button>
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
