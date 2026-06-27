import { Star } from "lucide-react";
import Image from "next/image";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { featuredProducts } from "@/lib/constants/mock-data";
import type { Product } from "@/types/products";

type ProductShowcaseProps = {
  products?: Product[];
};

export function ProductShowcase({ products = [] }: ProductShowcaseProps) {
  const hasRealProducts = products.length > 0;
  const items = hasRealProducts ? products : featuredProducts;

  return (
    <Section
      eyebrow="Destacados"
      title="Productos con estética maker y terminación premium"
      description="Explora nuestra selección de productos destacados, desde piezas funcionales hasta diseños exclusivos."
    >
      <div className="grid gap-4 lg:grid-cols-3">
        {items.map((product, index) => {
          const image = "images" in product ? product.images?.[0] : null;
          const name = product.name;
          const category = "category" in product ? product.category : "AVM";
          const price = "price" in product && typeof product.price === "number" ? formatPrice(product.price) : product.price;
          const description = "shortDescription" in product ? product.shortDescription ?? product.description ?? "" : product.description;
          const points = "pointsReward" in product ? product.pointsReward : product.points;

          return (
          <MotionReveal key={name} delay={index * 0.06}>
            <GlassCard className="overflow-hidden p-0">
              <div className="relative h-52 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent">
                {image && <Image src={image.url} alt={image.alt ?? name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />}
                <div className="absolute bottom-3 left-3 avm-badge">{category}</div>
              </div>
              <div className="p-6">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="text-lg font-semibold text-white">{name}</h3>
                  <span className="text-base font-semibold text-white whitespace-nowrap">{price}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-[var(--avm-muted)]">{description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-5 text-sm">
                  <span className="inline-flex items-center gap-2 text-[var(--avm-muted)]">
                    <Star size={14} className="text-[var(--avm-violet)]" /> {points} puntos
                  </span>
                  <span className="text-[var(--avm-blue)] text-xs font-semibold uppercase tracking-wider">Ver detalle</span>
                </div>
              </div>
            </GlassCard>
          </MotionReveal>
          );
        })}
      </div>
    </Section>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
}
