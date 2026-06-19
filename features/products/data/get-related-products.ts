import { getProducts } from "@/features/products/data/get-products";
import { getRelatedProducts as rankRelatedProducts } from "@/features/products/related-products";
import type { Product } from "@/types/products";

export async function getRelatedProducts(product: Product, limit = 4) {
  const products = await getProducts({ inStock: false });
  return rankRelatedProducts(product, products, limit);
}
