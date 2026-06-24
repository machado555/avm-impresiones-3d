import { Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { GlassCard } from "@/components/ui/glass-card";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { FavoriteButton } from "@/features/favorites/components/favorite-button";
import type { Product } from "@/types/products";

type ProductCardProps = Partial<{
  name: string;
  category: string;
  price: string;
  points: number;
  description: string;
}> & {
  product?: Product;
  isFavorite?: boolean;
  isAuthenticated?: boolean;
};

export function ProductCard({ name, category, price, points, description, product, isFavorite = false, isAuthenticated = false }: ProductCardProps) {
  const displayName = product?.name ?? name ?? "";
  const displayDescription = product?.shortDescription ?? product?.description ?? description ?? "";
  const displayPrice = product ? formatPrice(product.price) : price ?? "";
  const displayPoints = product?.pointsReward ?? points ?? 0;
  const image = product?.images?.[0];
  const maxStock = product?.variants?.[0]?.stock ?? product?.stock ?? 0;
  const guestItem = product
    ? {
        id: `${product.id}:${product.variants?.[0]?.id ?? "base"}`,
        productId: product.id,
        variantId: product.variants?.[0]?.id ?? null,
        name: product.name,
        slug: product.slug,
        imageUrl: image?.url ?? null,
        quantity: 1,
        unitPrice: product.price + (product.variants?.[0]?.priceModifier ?? 0),
        estimatedPoints: product.pointsReward ?? 0,
        variantSnapshot: product.variants?.[0] ? { ...product.variants[0], stock: maxStock } : { stock: maxStock }
      }
    : null;

  const cardContent = (
    <>
      <div className="relative h-48 border-b border-white/10 bg-gradient-to-br from-white/12 via-cyan-300/12 to-violet-400/16">
        {image && <Image src={image.url} alt={image.alt ?? displayName} fill className="object-cover" sizes="(min-width: 1024px) 33vw, 100vw" />}
        {product && (
          <div className="absolute right-3 top-3 z-20">
            <FavoriteButton productId={product.id} initialIsFavorite={isFavorite} isAuthenticated={isAuthenticated} />
          </div>
        )}
      </div>
      <div className="p-5">
        <p className="text-xs uppercase tracking-[0.2em] text-cyan-300">{category ?? "AVM"}</p>
        <h3 className="mt-3 text-lg font-semibold text-white">{displayName}</h3>
        <p className="mt-3 text-sm leading-6 text-slate-400">{displayDescription}</p>
        <div className="mt-5 flex items-center justify-between text-sm">
          <span className="font-semibold text-white">{displayPrice}</span>
          <span className="inline-flex items-center gap-1 text-violet-200">
            <Star size={15} /> {displayPoints}
          </span>
        </div>
        {product && guestItem && (
          <div className="relative z-20 mt-4">
            <AddToCartButton productId={product.id} variantId={guestItem.variantId} isAuthenticated={isAuthenticated} guestItem={guestItem} maxStock={maxStock} />
          </div>
        )}
      </div>
    </>
  );

  if (product?.slug) {
    return (
      <div className="relative">
        <GlassCard className="h-full overflow-hidden p-0 transition hover:-translate-y-1 hover:border-cyan-300/40">
          {cardContent}
        </GlassCard>
        <Link
          href={`/productos/${product.slug}`}
          className="absolute inset-0 z-10 cursor-pointer rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/50"
          aria-label={`Ver ${product.name}`}
        />
      </div>
    );
  }

  return (
    <GlassCard className="h-full overflow-hidden p-0 transition hover:-translate-y-1 hover:border-cyan-300/40">
      {cardContent}
    </GlassCard>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0
  }).format(value);
}
