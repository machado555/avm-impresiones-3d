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
      title="Productos con estetica maker y terminacion premium"
      description="Cards preparadas para imagenes desde Supabase Storage, variantes, stock, puntos y acciones de carrito."
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
              <div className="relative h-56 border-b border-white/10 bg-gradient-to-br from-cyan-400/18 via-violet-400/15 to-white/5">
                {image && <Image src={image.url} alt={image.alt ?? name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />}
                <div className="absolute inset-8 rounded-[8px] border border-white/15 bg-black/20" />
                <div className="absolute bottom-4 left-4 rounded-full bg-black/35 px-3 py-1 text-xs text-cyan-100">{category}</div>
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-4">
                  <h3 className="text-lg font-semibold text-white">{name}</h3>
                  <span className="text-base font-semibold text-cyan-200">{price}</span>
                </div>
                <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
                <div className="mt-5 flex items-center justify-between border-t border-white/10 pt-4 text-sm">
                  <span className="inline-flex items-center gap-2 text-violet-100">
                    <Star size={16} /> {points} puntos
                  </span>
                  <span className="text-cyan-200">Ver detalle</span>
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
