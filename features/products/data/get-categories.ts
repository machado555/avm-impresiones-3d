import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapCategory } from "@/features/products/mappers/map-category";

export async function getCategories() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("categories")
    .select("id,parent_id,name,slug,description,image_url,sort_order,is_active")
    .eq("is_active", true)
    .order("sort_order", { ascending: true })
    .order("name", { ascending: true });

  if (error || !data) {
    return [];
  }

  return data.map(mapCategory);
}
