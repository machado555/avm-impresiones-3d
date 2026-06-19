import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/products";

type FavoritesGridProps = {
  products: Product[];
};

export function FavoritesGrid({ products }: FavoritesGridProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} isFavorite isAuthenticated />
      ))}
    </div>
  );
}
