"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function saveCmsText(section: string, key: string, value: string): Promise<{ ok: boolean; message: string }> {
  await requireCapability("cms:manage");
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("cms_texts").upsert(
    { section, key, value },
    { onConflict: "section,key" }
  );

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/apariencia");
  return { ok: true, message: "Texto guardado." };
}

export async function deleteCmsImage(id: string): Promise<{ ok: boolean; message: string }> {
  await requireCapability("cms:manage");
  const supabase = await createSupabaseServerClient();

  const { data: img } = await supabase.from("cms_images").select("url").eq("id", id).single();
  if (img?.url) {
    const filePath = img.url.split("/cms-images/").pop();
    if (filePath) await supabase.storage.from("cms-images").remove([filePath]);
  }

  const { error } = await supabase.from("cms_images").delete().eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/apariencia");
  return { ok: true, message: "Imagen eliminada." };
}
