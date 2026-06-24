"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type SaveProductState = {
  ok: boolean;
  message: string;
  id?: string;
};

export async function createProductAction(_prev: SaveProductState, formData: FormData): Promise<SaveProductState> {
  await requireCapability("products:manage");

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;
  const price = Number(formData.get("price") ?? 0);
  const compareAtPrice = formData.get("compareAtPrice") ? Number(formData.get("compareAtPrice")) : null;
  const stock = Number(formData.get("stock") ?? 0);
  const description = String(formData.get("description") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "draft");
  const isFeatured = formData.get("isFeatured") === "on";
  const pointsReward = Number(formData.get("pointsReward") ?? 0);

  if (!name || !slug || price <= 0) {
    return { ok: false, message: "Nombre, slug y precio son obligatorios." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .insert({
      name, slug, category_id: categoryId, price,
      compare_at_price: compareAtPrice && compareAtPrice > 0 ? compareAtPrice : null,
      stock, description, status, is_featured: isFeatured, points_reward: pointsReward
    })
    .select("id")
    .single();

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/productos");
  return { ok: true, message: "Producto creado.", id: data.id };
}

export async function updateProductAction(id: string, _prev: SaveProductState, formData: FormData): Promise<SaveProductState> {
  await requireCapability("products:manage");

  const name = String(formData.get("name") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;
  const price = Number(formData.get("price") ?? 0);
  const compareAtPrice = formData.get("compareAtPrice") ? Number(formData.get("compareAtPrice")) : null;
  const stock = Number(formData.get("stock") ?? 0);
  const description = String(formData.get("description") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "draft");
  const isFeatured = formData.get("isFeatured") === "on";
  const pointsReward = Number(formData.get("pointsReward") ?? 0);

  if (!name || !slug || price <= 0) {
    return { ok: false, message: "Nombre, slug y precio son obligatorios." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("products")
    .update({
      name, slug, category_id: categoryId, price,
      compare_at_price: compareAtPrice && compareAtPrice > 0 ? compareAtPrice : null,
      stock, description, status, is_featured: isFeatured, points_reward: pointsReward
    })
    .eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/productos");
  revalidatePath(`/admin/productos/${id}`);
  return { ok: true, message: "Producto actualizado." };
}

export async function duplicateProductAction(id: string): Promise<{ ok: boolean; message: string }> {
  await requireCapability("products:manage");
  const supabase = await createSupabaseServerClient();

  const { data: original, error: fetchError } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !original) return { ok: false, message: "Producto no encontrado." };

  const { error: insertError } = await supabase.from("products").insert({
    category_id: original.category_id,
    name: `${original.name} (copia)`,
    slug: `${original.slug}-copia-${Date.now()}`,
    description: original.description,
    short_description: original.short_description,
    price: original.price,
    compare_at_price: original.compare_at_price,
    sku: original.sku ? `${original.sku}-COPY` : null,
    stock: original.stock,
    status: "draft",
    is_featured: false,
    points_reward: original.points_reward
  });

  if (insertError) return { ok: false, message: insertError.message };
  revalidatePath("/admin/productos");
  return { ok: true, message: "Producto duplicado." };
}

export async function deleteProductAction(id: string): Promise<{ ok: boolean; message: string }> {
  await requireCapability("products:manage");
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("products").update({ status: "archived" }).eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/productos");
  return { ok: true, message: "Producto archivado." };
}
