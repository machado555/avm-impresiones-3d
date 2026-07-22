import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { ProductGallery } from "@/components/product/product-gallery";
import { RelatedProducts } from "@/components/product/related-products";
import { StructuredProductData } from "@/components/product/structured-product-data";
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
    <main className="product-detail-page">
      <StructuredProductData product={product} />
      <div className="product-detail-grid">
        <div>
          <ProductGallery images={product.images ?? []} productName={product.name} />
        </div>
        <div>
          <span className="product-detail-eyebrow">
            {product.category?.name ?? "Producto destacado"}
          </span>
          <h1 className="product-detail-title">{product.name}</h1>
          <div className="product-detail-price">
            ${product.price.toLocaleString("es-AR")}
            {product.compareAtPrice && (
              <span className="product-detail-compare">
                ${product.compareAtPrice.toLocaleString("es-AR")}
              </span>
            )}
          </div>
          <p className="product-detail-description">
            {product.description ?? product.shortDescription}
          </p>
          <div className="product-detail-points">
            <span aria-hidden="true">â˜†</span> {product.pointsReward} puntos al comprar
          </div>
          <div className="product-detail-actions">
            <Button type="button" full>
              Comprar ahora
            </Button>
            <div className="product-detail-secondary-actions">
              <div className="flex-1">
                <AddToCartButton productId={product.id} variantId={selectedVariant?.id ?? null} isAuthenticated={Boolean(user)} guestItem={guestItem} maxStock={maxStock} />
              </div>
              <FavoriteButton productId={product.id} initialIsFavorite={favorite} isAuthenticated={Boolean(user)} />
            </div>
          </div>
        </div>
      </div>

      <div className="product-detail-copy">
        <h2>Descripcion</h2>
        <div>
          {product.description ?? product.shortDescription}
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
