"use server";

import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type BlogPostDetail = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  coverImage: string | null;
  categoryId: string | null;
  status: string;
  seoTitle: string | null;
  seoDescription: string | null;
  createdAt: string;
};

export async function getAdminBlogPostById(id: string): Promise<BlogPostDetail | null> {
  await requireCapability("blog:manage");
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("*")
    .eq("id", id)
    .single();

  if (error || !data) return null;

  return {
    id: data.id,
    title: data.title,
    slug: data.slug,
    excerpt: data.excerpt,
    content: data.content,
    coverImage: data.cover_image,
    categoryId: data.category_id,
    status: data.status,
    seoTitle: data.seo_title,
    seoDescription: data.seo_description,
    createdAt: data.created_at
  };
}

export async function getBlogCategories() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("blog_categories").select("*").order("name");
  if (error || !data) return [];
  return data;
}
