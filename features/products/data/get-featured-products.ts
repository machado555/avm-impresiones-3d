import { getProducts } from "@/features/products/data/get-products";

export async function getFeaturedProducts(limit = 6) {
  const products = await getProducts({ isFeatured: true, inStock: false, sort: "featured" });
  return products.slice(0, limit);
}
