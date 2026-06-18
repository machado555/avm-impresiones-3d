import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { getCategories } from "@/features/products/data/get-categories";

export const metadata = {
  title: "Categorias",
  description: "Categorias de productos y servicios de AVM-Impresiones 3D."
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Section eyebrow="Categorias" title="Explora por necesidad" description="Estructura preparada para categorias padre, subcategorias, imagenes y slugs SEO.">
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => {
          return (
            <Link key={category.slug} href={`/categorias/${category.slug}`}>
              <GlassCard className="flex min-h-44 items-start gap-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-gradient-to-br from-cyan-400 to-blue-500 text-slate-950">
                  <span className="text-sm font-black">AVM</span>
                </div>
                <div>
                  <h2 className="text-xl font-semibold text-white">{category.name}</h2>
                  <p className="mt-3 text-sm leading-6 text-slate-400">{category.description}</p>
                </div>
              </GlassCard>
            </Link>
          );
        })}
      </div>
    </Section>
  );
}
