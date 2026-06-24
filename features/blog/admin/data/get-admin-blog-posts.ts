"use server";

import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type BlogPostSummary = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  coverImage: string | null;
  status: string;
  categoryName: string | null;
  createdAt: string;
};

export async function getAdminBlogPosts(): Promise<BlogPostSummary[]> {
  await requireCapability("blog:manage");
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("blog_posts")
    .select("id,title,slug,excerpt,cover_image,status,category_id,created_at,blog_categories(name)")
    .order("created_at", { ascending: false });

  if (error || !data) return [];

  return data.map((row: any) => ({
    id: row.id,
    title: row.title,
    slug: row.slug,
    excerpt: row.excerpt,
    coverImage: row.cover_image,
    status: row.status,
    categoryName: row.blog_categories?.name ?? null,
    createdAt: row.created_at
  }));
}
