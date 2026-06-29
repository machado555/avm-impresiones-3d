import { Cpu, Pencil, Printer, type LucideProps, Zap } from "lucide-react";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { getCategories } from "@/features/products/data/get-categories";
import type { ForwardRefExoticComponent, RefAttributes } from "react";

const CATEGORY_ICONS: Record<string, { icon: ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>; accent: string }> = {
  'impresiones-3d':             { icon: Printer, accent: 'from-[var(--avm-blue)] to-[var(--avm-violet)]' },
  'electronica':                { icon: Cpu,     accent: 'from-[var(--avm-violet)] to-[var(--avm-blue)]' },
  'pequenos-electrodomesticos': { icon: Zap,     accent: 'from-[var(--avm-blue)] to-[var(--avm-violet)]' },
  'diseno-personalizado':       { icon: Pencil,  accent: 'from-[var(--avm-violet)] to-[var(--avm-blue)]' },
};

export const metadata = {
  title: "Categorías",
  description: "Categorías de productos y servicios de AVM-Impresiones 3D."
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <Section eyebrow="Categorías" title="Explora por necesidad" description="Encontrá lo que buscás por categoría: impresión 3D, electrónica y servicios personalizados.">
      <div className="grid gap-4 md:grid-cols-2">
        {categories.map((category) => {
          const meta = CATEGORY_ICONS[category.slug];
          const Icon = meta?.icon ?? null;
          return (
            <Link key={category.slug} href={`/categorias/${category.slug}`}>
              <GlassCard className="flex min-h-44 items-start gap-5 transition hover:-translate-y-1 hover:border-cyan-300/40">
                <div className={`grid h-12 w-12 shrink-0 place-items-center rounded-[8px] bg-gradient-to-br text-slate-950 ${meta?.accent ?? 'from-cyan-400 to-blue-500'}`}>
                  {Icon ? <Icon size={22} /> : <span className="text-sm font-black">AVM</span>}
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
