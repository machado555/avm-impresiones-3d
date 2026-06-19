import type { Product } from "@/types/products";

export function getRelatedProducts(product: Product, products: Product[], limit = 4) {
  return products
    .filter((candidate) => candidate.id !== product.id)
    .map((candidate) => {
      const sameCategoryScore = candidate.categoryId === product.categoryId ? 2 : 0;
      const tagScore = getSharedTagCount(product, candidate);

      return {
        product: candidate,
        score: sameCategoryScore + tagScore
      };
    })
    .filter((item) => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.product);
}

function getSharedTagCount(product: Product, candidate: Product) {
  const productTags = new Set(product.tags?.map((tag) => tag.id) ?? []);
  return candidate.tags?.filter((tag) => productTags.has(tag.id)).length ?? 0;
}
