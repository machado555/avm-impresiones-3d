import { Star } from "lucide-react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { ProductGallery } from "@/components/product/product-gallery";
import { ProductPrice } from "@/components/product/product-price";
import { ProductVariants } from "@/components/product/product-variants";
import { RelatedProducts } from "@/components/product/related-products";
import { StructuredProductData } from "@/components/product/structured-product-data";
import { Section } from "@/components/ui/section";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { AddToCartButton } from "@/features/cart/components/add-to-cart-button";
import { FavoriteButton } from "@/features/favorites/components/favorite-button";
import { isFavorite } from "@/features/favorites/data/is-favorite";
import { getProductBySlug } from "@/features/products/data/get-product-by-slug";
import { getRelatedProducts } from "@/features/products/data/get-related-products";
import { createProductMetadata } from "@/features/products/seo/product-metadata";

type ProductDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: ProductDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return {
      title: "Producto no encontrado"
    };
  }

  return createProductMetadata(product);
}

export default async function ProductDetailPage({ params }: ProductDetailPageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const [relatedProducts, user, favorite] = await Promise.all([getRelatedProducts(product), getCurrentProfile(), isFavorite(product.id)]);
  const selectedVariant = product.variants?.[0] ?? null;
  const maxStock = selectedVariant?.stock ?? product.stock ?? 0;
  const primaryImage = product.images?.[0];
  const guestItem = {
    id: `${product.id}:${selectedVariant?.id ?? "base"}`,
    productId: product.id,
    variantId: selectedVariant?.id ?? null,
    name: product.name,
    slug: product.slug,
    imageUrl: primaryImage?.url ?? null,
    quantity: 1,
    unitPrice: product.price + (selectedVariant?.priceModifier ?? 0),
    estimatedPoints: product.pointsReward ?? 0,
    variantSnapshot: selectedVariant ? { ...selectedVariant, stock: maxStock } : { stock: maxStock }
  };

  return (
    <Section eyebrow="Producto" title={product.name} description={product.shortDescription ?? product.description ?? "Producto AVM-Impresiones 3D"}>
      <StructuredProductData product={product} />
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        <ProductGallery images={product.images ?? []} productName={product.name} />
        <GlassCard>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan-300">Producto destacado</p>
          <div className="mt-5">
            <ProductPrice price={product.price} compareAtPrice={product.compareAtPrice} />
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            {product.description ?? product.shortDescription}
          </p>
          <div className="mt-6 flex items-center gap-2 text-violet-100">
            <Star size={18} /> Suma {product.pointsReward} puntos
          </div>
          <div className="mt-8">
            <ProductVariants variants={product.variants ?? []} />
          </div>
          <div className="mt-8 flex gap-3">
            <FavoriteButton productId={product.id} initialIsFavorite={favorite} isAuthenticated={Boolean(user)} />
            <AddToCartButton productId={product.id} variantId={selectedVariant?.id ?? null} isAuthenticated={Boolean(user)} guestItem={guestItem} maxStock={maxStock} />
          </div>
        </GlassCard>
      </div>
      <RelatedProducts products={relatedProducts} />
    </Section>
  );
}
