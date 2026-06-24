import { ProductCard } from "@/components/product/product-card";
import { Section } from "@/components/ui/section";
import { ProductFilters } from "@/features/products/components/product-filters";
import { getCategories } from "@/features/products/data/get-categories";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { getFavoriteProductIds } from "@/features/favorites/data/get-favorite-product-ids";
import { getProducts } from "@/features/products/data/get-products";
import type { ProductFilters as ProductFiltersType } from "@/types/products";

export const metadata = {
  title: "Productos",
  description: "Catalogo de impresiones 3D, electronica y pequenos electrodomesticos."
};

type ProductsPageProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function ProductsPage({ searchParams }: ProductsPageProps) {
  const params = await searchParams;
  const filters = parseProductFilters(params);
  const [products, categories, favoriteIds, user] = await Promise.all([
    getProducts(filters),
    getCategories(),
    getFavoriteProductIds(),
    getCurrentProfile()
  ]);
  const favoriteSet = new Set(favoriteIds);

  return (
    <Section
      eyebrow="Tienda"
      title="Catalogo AVM"
      description="Explora nuestro catalogo de productos: impresiones 3D, electronica y mas."
      className="pt-12"
    >
      <ProductFilters
        categories={categories}
        currentQuery={filters.query}
        currentSort={filters.sort}
        currentCategory={filters.categorySlug}
        currentMinPrice={filters.minPrice !== undefined ? String(filters.minPrice) : undefined}
        currentMaxPrice={filters.maxPrice !== undefined ? String(filters.maxPrice) : undefined}
      />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isFavorite={favoriteSet.has(product.id)} isAuthenticated={Boolean(user)} />
        ))}
      </div>
    </Section>
  );
}

function parseProductFilters(params: Record<string, string | string[] | undefined>): ProductFiltersType {
  const getString = (key: string) => {
    const value = params[key];
    return Array.isArray(value) ? value[0] : value;
  };

  return {
    query: getString("query"),
    categorySlug: getString("category") === "all" ? undefined : getString("category"),
    tagSlug: getString("tag"),
    materialSlug: getString("material"),
    color: getString("color"),
    size: getString("size"),
    finish: getString("finish"),
    minPrice: getString("minPrice") ? Number(getString("minPrice")) : undefined,
    maxPrice: getString("maxPrice") ? Number(getString("maxPrice")) : undefined,
    inStock: getString("inStock") === "true",
    sort: (getString("sort") as ProductFiltersType["sort"]) ?? "featured"
  };
}
