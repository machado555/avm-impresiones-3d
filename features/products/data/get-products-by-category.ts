import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCategoryBySlug } from "@/features/products/data/get-category-by-slug";
import { mapProduct } from "@/features/products/mappers/map-product";
import { productSelect } from "@/features/products/data/product-select";
import type { ProductFilters } from "@/types/products";

export async function getProductsByCategory(categorySlug: string, filters: ProductFilters = {}) {
  const category = await getCategoryBySlug(categorySlug);

  if (!category) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  let query = supabase
    .from("products")
    .select(productSelect)
    .eq("status", "active")
    .eq("category_id", category.id);

  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }

  if (filters.inStock) {
    query = query.gt("stock", 0);
  }

  const { data, error } = await query.order("is_featured", { ascending: false }).order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.map(mapProduct);
}
