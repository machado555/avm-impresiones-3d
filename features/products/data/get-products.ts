import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCategoryBySlug } from "@/features/products/data/get-category-by-slug";
import { mapProduct } from "@/features/products/mappers/map-product";
import { productSelect } from "@/features/products/data/product-select";
import type { ProductFilters } from "@/types/products";

export async function getProducts(filters: ProductFilters = {}) {
  const supabase = await createSupabaseServerClient();
  let query = supabase.from("products").select(productSelect).eq("status", "active");

  if (filters.categorySlug) {
    const category = await getCategoryBySlug(filters.categorySlug);

    if (!category) {
      return [];
    }

    query = query.eq("category_id", category.id);
  }

  if (filters.minPrice !== undefined) {
    query = query.gte("price", filters.minPrice);
  }

  if (filters.maxPrice !== undefined) {
    query = query.lte("price", filters.maxPrice);
  }

  if (filters.inStock) {
    query = query.gt("stock", 0);
  }

  if (filters.isFeatured !== undefined) {
    query = query.eq("is_featured", filters.isFeatured);
  }

  if (filters.query) {
    const value = `%${filters.query}%`;
    query = query.or(`name.ilike.${value},short_description.ilike.${value},description.ilike.${value}`);
  }

  if (filters.sort === "price-asc") {
    query = query.order("price", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("price", { ascending: false });
  } else if (filters.sort === "newest") {
    query = query.order("created_at", { ascending: false });
  } else {
    query = query.order("is_featured", { ascending: false }).order("created_at", { ascending: false });
  }

  const { data, error } = await query;

  if (error || !data) {
    return [];
  }

  let products = data.map(mapProduct);

  if (filters.tagSlug) {
    products = products.filter((product) => product.tags?.some((tag) => tag.slug === filters.tagSlug));
  }

  if (filters.materialSlug) {
    products = products.filter((product) => product.variants?.some((variant) => variant.material === filters.materialSlug));
  }

  if (filters.color) {
    products = products.filter((product) => product.variants?.some((variant) => variant.color === filters.color));
  }

  if (filters.size) {
    products = products.filter((product) => product.variants?.some((variant) => variant.size === filters.size));
  }

  if (filters.finish) {
    products = products.filter((product) => product.variants?.some((variant) => variant.finish === filters.finish));
  }

  return products;
}
