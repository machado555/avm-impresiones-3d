import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapProduct } from "@/features/products/mappers/map-product";
import { productSelect } from "@/features/products/data/product-select";

export async function getProductBySlug(slug: string) {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("slug", slug)
    .eq("status", "active")
    .single();
  if (error || !data) {
    return null;
  }
  return mapProduct(data as any);
}
