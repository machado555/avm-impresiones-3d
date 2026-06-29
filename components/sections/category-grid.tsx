import { Cpu, Pencil, Printer, Zap } from "lucide-react";
import { categories } from "@/lib/constants/mock-data";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import type { ProductCategory } from "@/types/products";

const CATEGORY_ICONS: Record<string, { icon: React.ElementType; accent: string }> = {
  'impresiones-3d':          { icon: Printer, accent: 'from-[var(--avm-blue)] to-[var(--avm-violet)]' },
  'electronica':             { icon: Cpu,     accent: 'from-[var(--avm-violet)] to-[var(--avm-blue)]' },
  'pequenos-electrodomesticos': { icon: Zap,  accent: 'from-[var(--avm-blue)] to-[var(--avm-violet)]' },
  'diseno-personalizado':    { icon: Pencil,  accent: 'from-[var(--avm-violet)] to-[var(--avm-blue)]' },
}

type CategoryGridProps = {
  categoriesData?: ProductCategory[];
};

export function CategoryGrid({ categoriesData = [] }: CategoryGridProps) {
  const hasRealCategories = categoriesData.length > 0;
  const items = hasRealCategories ? categoriesData : categories;

  return (
    <Section
      eyebrow="Catálogo"
      title="Categorías pensadas para comprar rápido y pedir a medida"
      description="La arquitectura visual prioriza escaneo rápido, comparación y conversión sin perder el tono premium."
    >
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {items.map((category, index) => {
          const meta = CATEGORY_ICONS[category.slug] ?? {}
          const Icon = ("icon" in category ? category.icon : null) ?? meta.icon ?? null
          const accent = ("accent" in category ? category.accent : null)
                         ?? meta.accent
                         ?? 'from-[var(--avm-blue)] to-[var(--avm-violet)]'

          return (
            <MotionReveal key={category.slug} delay={index * 0.05}>
              <GlassCard className="min-h-56">
                <div className={`avm-card__icon bg-gradient-to-br ${accent} text-[var(--avm-bg)]`}>
                  {Icon ? <Icon size={20} /> : <span className="text-sm font-black">AVM</span>}
                </div>
                <h3 className="text-lg font-semibold text-white">{category.name}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--avm-muted)]">{category.description}</p>
              </GlassCard>
            </MotionReveal>
          );
        })}
      </div>
    </Section>
  );
}
