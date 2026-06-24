"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function uploadProductImage(productId: string, formData: FormData): Promise<{ ok: boolean; url?: string; message: string }> {
  await requireCapability("products:manage");

  const file = formData.get("file") as File | null;
  if (!file) return { ok: false, message: "No se envio ninguna imagen." };

  const ext = file.name.split(".").pop() ?? "jpg";
  const filePath = `${productId}/${Date.now()}.${ext}`;

  const supabase = await createSupabaseServerClient();
  const { error: uploadError } = await supabase.storage
    .from("product-images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) return { ok: false, message: uploadError.message };

  const { data: publicUrlData } = supabase.storage.from("product-images").getPublicUrl(filePath);
  const url = publicUrlData.publicUrl;

  const { data: maxOrder } = await supabase
    .from("product_images")
    .select("sort_order")
    .eq("product_id", productId)
    .order("sort_order", { ascending: false })
    .limit(1)
    .maybeSingle();

  const nextOrder = (maxOrder?.sort_order ?? -1) + 1;

  const { error: insertError } = await supabase
    .from("product_images")
    .insert({ product_id: productId, url, sort_order: nextOrder });

  if (insertError) return { ok: false, message: insertError.message };

  revalidatePath(`/admin/productos/${productId}`);
  return { ok: true, url, message: "Imagen subida." };
}

export async function deleteProductImage(imageId: string, url: string): Promise<{ ok: boolean; message: string }> {
  await requireCapability("products:manage");

  const supabase = await createSupabaseServerClient();
  const { error: dbError } = await supabase.from("product_images").delete().eq("id", imageId);
  if (dbError) return { ok: false, message: dbError.message };

  const filePath = url.split("/product-images/").pop();
  if (filePath) {
    await supabase.storage.from("product-images").remove([filePath]);
  }

  revalidatePath("/admin/productos");
  return { ok: true, message: "Imagen eliminada." };
}

export async function setMainProductImage(productId: string, imageId: string): Promise<{ ok: boolean; message: string }> {
  await requireCapability("products:manage");

  const supabase = await createSupabaseServerClient();
  const { data: images } = await supabase
    .from("product_images")
    .select("id,sort_order")
    .eq("product_id", productId)
    .order("sort_order");

  if (!images) return { ok: false, message: "Sin imagenes." };

  const updates = images.map((img) =>
    supabase
      .from("product_images")
      .update({ sort_order: img.id === imageId ? 0 : (img.sort_order + 1) })
      .eq("id", img.id)
  );

  await Promise.all(updates);
  revalidatePath(`/admin/productos/${productId}`);
  return { ok: true, message: "Imagen principal actualizada." };
}
