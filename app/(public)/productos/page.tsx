import { ProductCard } from "@/components/product/product-card";
import { Section } from "@/components/ui/section";
import { getCategories } from "@/features/products/data/get-categories";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { getFavoriteProductIds } from "@/features/favorites/data/get-favorite-product-ids";
import { getProducts } from "@/features/products/data/get-products";
import type { ProductFilters } from "@/types/products";

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
      <div className="mb-6 grid gap-3 rounded-[8px] border border-white/10 bg-white/[0.06] p-4 md:grid-cols-[1fr_auto_auto]">
        <input className="rounded-[8px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500" name="query" placeholder="Buscar producto" defaultValue={filters.query ?? ""} />
        <select className="rounded-[8px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none" name="sort" defaultValue={filters.sort ?? "featured"}>
          <option value="featured">Destacados</option>
          <option value="price-asc">Menor precio</option>
          <option value="price-desc">Mayor precio</option>
        </select>
        <select className="rounded-[8px] border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none" name="category" defaultValue={filters.categorySlug ?? "all"}>
          <option value="all">Todas las categorias</option>
          {categories.map((category) => (
            <option key={category.id} value={category.slug}>{category.name}</option>
          ))}
        </select>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} isFavorite={favoriteSet.has(product.id)} isAuthenticated={Boolean(user)} />
        ))}
      </div>
    </Section>
  );
}

function parseProductFilters(params: Record<string, string | string[] | undefined>): ProductFilters {
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
    sort: (getString("sort") as ProductFilters["sort"]) ?? "featured"
  };
}
