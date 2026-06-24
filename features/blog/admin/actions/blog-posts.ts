"use server";

import { revalidatePath } from "next/cache";
import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type BlogPostState = { ok: boolean; message: string };

export async function createBlogPost(_prev: BlogPostState, formData: FormData): Promise<BlogPostState> {
  await requireCapability("blog:manage");

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim() || null;
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "draft");

  if (!title || !slug) return { ok: false, message: "Titulo y slug son obligatorios." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("blog_posts").insert({
    title, slug, excerpt, content, cover_image: coverImage,
    category_id: categoryId, status
  });

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { ok: true, message: "Articulo creado." };
}

export async function updateBlogPost(id: string, _prev: BlogPostState, formData: FormData): Promise<BlogPostState> {
  await requireCapability("blog:manage");

  const title = String(formData.get("title") ?? "").trim();
  const slug = String(formData.get("slug") ?? "").trim();
  const excerpt = String(formData.get("excerpt") ?? "").trim() || null;
  const content = String(formData.get("content") ?? "").trim() || null;
  const coverImage = String(formData.get("coverImage") ?? "").trim() || null;
  const categoryId = String(formData.get("categoryId") ?? "").trim() || null;
  const status = String(formData.get("status") ?? "draft");

  if (!title || !slug) return { ok: false, message: "Titulo y slug son obligatorios." };

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("blog_posts").update({
    title, slug, excerpt, content, cover_image: coverImage,
    category_id: categoryId, status
  }).eq("id", id);

  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
  return { ok: true, message: "Articulo actualizado." };
}

export async function deleteBlogPost(id: string): Promise<BlogPostState> {
  await requireCapability("blog:manage");
  const supabase = await createSupabaseServerClient();

  const { error } = await supabase.from("blog_posts").update({ status: "archived" }).eq("id", id);
  if (error) return { ok: false, message: error.message };
  revalidatePath("/admin/blog");
  revalidatePath("/blog");
  return { ok: true, message: "Articulo archivado." };
}
