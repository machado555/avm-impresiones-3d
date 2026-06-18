import { categories } from "@/lib/constants/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import type { ProductCategory } from "@/types/products";

type CategoryGridProps = {
  categoriesData?: ProductCategory[];
};

export function CategoryGrid({ categoriesData = [] }: CategoryGridProps) {
  const hasRealCategories = categoriesData.length > 0;
  const items = hasRealCategories ? categoriesData : categories;

  return (
    <Section
      eyebrow="Catalogo"
      title="Categorias pensadas para comprar rapido y pedir a medida"
      description="La arquitectura visual prioriza escaneo rapido, comparacion y conversion sin perder el tono premium."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((category, index) => {
          const Icon = "icon" in category ? category.icon : null;
          const accent = "accent" in category ? category.accent : "from-cyan-400 to-blue-500";

          return (
            <MotionReveal key={category.slug} delay={index * 0.05}>
              <GlassCard className="min-h-64 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <div className={`mb-5 grid h-12 w-12 place-items-center rounded-[8px] bg-gradient-to-br ${accent} text-slate-950`}>
                  {Icon ? <Icon size={24} /> : <span className="text-sm font-black">AVM</span>}
                </div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="mt-3 text-sm leading-6 text-slate-400">{category.description}</p>
              </GlassCard>
            </MotionReveal>
          );
        })}
      </div>
    </Section>
  );
}
