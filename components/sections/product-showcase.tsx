"use client";

import { useCallback } from "react";
import Image from "next/image";
import { Button, ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { featuredProducts } from "@/lib/constants/mock-data";
import { addGuestCartItem, openCartDrawer } from "@/lib/stores/cart-store";
import { addToast } from "@/lib/stores/toast-store";
import { FavoriteButton } from "@/features/favorites/components/favorite-button";
import type { CartItem } from "@/types/cart";
import type { Product } from "@/types/products";

type ProductShowcaseProps = {
  products?: Product[];
};

export function ProductShowcase({ products = [] }: ProductShowcaseProps) {
  const hasRealProducts = products.length > 0;
  const items = hasRealProducts ? products : featuredProducts;

  const handleAddToCart = useCallback((product: Record<string, unknown> & { name: string; slug: string; price: number | string; points?: number; pointsReward?: number }) => {
    const rawPrice = typeof product.price === "number" ? product.price : parseInt(String(product.price).replace(/[^0-9]/g, ""), 10);
    const guestItem: CartItem = {
      id: `${product.slug}:base`,
      productId: product.slug,
      variantId: null,
      name: product.name,
      slug: product.slug,
      imageUrl: null,
      quantity: 1,
      unitPrice: isNaN(rawPrice) ? 0 : rawPrice,
      estimatedPoints: product.points ?? product.pointsReward ?? 0,
      variantSnapshot: null
    };
    addGuestCartItem(guestItem, 999);
    addToast("success", "Producto agregado al carrito.");
    openCartDrawer();
  }, []);

  return (
    <Section
      eyebrow="Destacados"
      title="Productos con estetica maker y terminacion premium"
      description="Explora nuestra seleccion de productos destacados, desde piezas funcionales hasta disenos exclusivos."
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((product, index) => {
          const rawImage = "images" in product ? (product as Product).images?.[0] : null;
          const image = rawImage?.url ? rawImage : null;
          const name = product.name;
          const category = (product as Product).categoryName ?? ("category" in product ? product.category as string : "AVM");
          const price = "price" in product && typeof product.price === "number" ? formatPrice(product.price) : product.price;
          const description = "shortDescription" in product ? (product.shortDescription ?? product.description ?? "") : product.description;
          const slug = product.slug;

          return (
            <MotionReveal key={name} delay={index * 0.06}>
              <GlassCard className="flex h-full flex-col overflow-hidden p-0">
                <div className="relative h-52 shrink-0 bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-transparent">
                  {image && <Image src={image.url} alt={image.alt ?? name} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />}
                  <div className="absolute bottom-3 left-3 avm-badge">{category}</div>
                  {"id" in product && (
                    <div className="absolute right-3 top-3 z-20">
                      <FavoriteButton productId={product.id} initialIsFavorite={false} isAuthenticated={false} />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-lg font-semibold text-white">{name}</h3>
                    <span className="whitespace-nowrap text-base font-semibold text-white">{price}</span>
                  </div>
                  <p className="mt-2 text-sm leading-6 text-[var(--avm-muted)]">{description}</p>
                  <div className="mt-auto border-t border-white/[0.07] pt-4">
                    <div className="flex gap-2">
                      <ButtonLink href={`/productos/${slug}`} full size="sm">
                        Comprar
                      </ButtonLink>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        full
                        onClick={() => handleAddToCart(product as Record<string, unknown> & { name: string; slug: string; price: number | string; points?: number; pointsReward?: number })}
                      >
                        + Carrito
                      </Button>
                    </div>
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

