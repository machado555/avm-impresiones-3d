import { ProductCard } from "@/components/product/product-card";
import type { Product } from "@/types/products";

type RelatedProductsProps = {
  products: Product[];
};

export function RelatedProducts({ products }: RelatedProductsProps) {
  if (products.length === 0) {
    return null;
  }

  return (
    <section className="mt-14">
      <h2 className="text-2xl font-semibold text-white">Productos relacionados</h2>
      <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
