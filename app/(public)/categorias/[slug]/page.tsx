import { ProductCard } from "@/components/product/product-card";
import { Section } from "@/components/ui/section";
import { getCategoryBySlug } from "@/features/products/data/get-category-by-slug";
import { getCategories } from "@/features/products/data/get-categories";
import { getProductsByCategory } from "@/features/products/data/get-products-by-category";

type CategoryPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const [category, products] = await Promise.all([getCategoryBySlug(slug), getProductsByCategory(slug)]);

  return (
    <Section
      eyebrow="Categoria"
      title={category?.name ?? "Categoria AVM"}
      description={category?.description ?? "Productos disponibles en esta categoria."}
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {products.map((product: Awaited<ReturnType<typeof getProductsByCategory>>[number]) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </Section>
  );
}
