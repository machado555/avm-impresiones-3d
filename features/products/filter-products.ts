import type { Product, ProductFilters } from "@/types/products";

export function filterProducts(products: Product[], filters: ProductFilters) {
  return products
    .filter((product) => {
      if (filters.query) {
        const query = filters.query.toLowerCase();
        const text = `${product.name} ${product.shortDescription ?? ""} ${product.description ?? ""}`.toLowerCase();
        if (!text.includes(query)) {
          return false;
        }
      }

      if (filters.inStock && (product.stock ?? 0) <= 0) {
        return false;
      }

      if (typeof filters.isFeatured === "boolean" && product.isFeatured !== filters.isFeatured) {
        return false;
      }

      if (filters.color && !product.variants?.some((variant) => variant.color === filters.color)) {
        return false;
      }

      if (filters.size && !product.variants?.some((variant) => variant.size === filters.size)) {
        return false;
      }

      if (filters.finish && !product.variants?.some((variant) => variant.finish === filters.finish)) {
        return false;
      }

      if (typeof filters.minPrice === "number" && product.price < filters.minPrice) {
        return false;
      }

      if (typeof filters.maxPrice === "number" && product.price > filters.maxPrice) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (filters.sort === "price-asc") {
        return a.price - b.price;
      }

      if (filters.sort === "price-desc") {
        return b.price - a.price;
      }

      if (filters.sort === "featured") {
        return Number(b.isFeatured) - Number(a.isFeatured);
      }

      return 0;
    });
}
