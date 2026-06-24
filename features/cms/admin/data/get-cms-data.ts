"use server";

import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type CmsImage = {
  id: string;
  section: string;
  key: string;
  url: string;
  alt: string | null;
};

export type CmsText = {
  id: string;
  section: string;
  key: string;
  value: string | null;
};

export type CmsData = {
  images: CmsImage[];
  texts: CmsText[];
};

export async function getCmsData(): Promise<CmsData> {
  await requireCapability("cms:manage");
  const supabase = await createSupabaseServerClient();

  const [imagesRes, textsRes] = await Promise.all([
    supabase.from("cms_images").select("*").order("section").order("key"),
    supabase.from("cms_texts").select("*").order("section").order("key")
  ]);

  return {
    images: (imagesRes.data ?? []) as CmsImage[],
    texts: (textsRes.data ?? []) as CmsText[]
  };
}

export async function uploadCmsImage(formData: FormData): Promise<{ ok: boolean; url?: string; message: string }> {
  await requireCapability("cms:manage");

  const file = formData.get("file") as File | null;
  const section = String(formData.get("section") ?? "global");
  const key = String(formData.get("key") ?? "image");

  if (!file) return { ok: false, message: "No se envio ninguna imagen." };

  const ext = file.name.split(".").pop() ?? "jpg";
  const filePath = `cms/${section}/${key}-${Date.now()}.${ext}`;

  const supabase = await createSupabaseServerClient();
  const { error: uploadError } = await supabase.storage
    .from("cms-images")
    .upload(filePath, file, { upsert: true });

  if (uploadError) return { ok: false, message: uploadError.message };

  const { data: urlData } = supabase.storage.from("cms-images").getPublicUrl(filePath);
  const url = urlData.publicUrl;

  const { error: upsertError } = await supabase.from("cms_images").upsert(
    { section, key, url, alt: file.name },
    { onConflict: "section,key" }
  );

  if (upsertError) return { ok: false, message: upsertError.message };
  return { ok: true, url, message: "Imagen subida." };
}
