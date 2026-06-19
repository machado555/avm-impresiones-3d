import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapCategory } from "@/features/products/mappers/map-category";

export async function getCategoryBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id,parent_id,name,slug,description,image_url,sort_order,is_active")
    .eq("slug", slug)
    .eq("is_active", true)
    .single();

  if (error || !data) {
    return null;
  }

  return mapCategory(data);
}
