import { getProducts } from "@/features/products/data/get-products";

export async function searchProducts(query: string) {
  const normalizedQuery = query.trim();

  if (!normalizedQuery) {
    return [];
  }

  const products = await getProducts({ query: normalizedQuery });

  return products.filter((product) => {
    const searchableTags = product.tags?.map((tag) => `${tag.name} ${tag.slug}`).join(" ") ?? "";
    const searchableText = `${product.name} ${product.shortDescription ?? ""} ${product.description ?? ""} ${searchableTags}`.toLowerCase();
    return searchableText.includes(normalizedQuery.toLowerCase());
  });
}
