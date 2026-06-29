import type { Metadata } from "next";
import { notFound } from "next/navigation";
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
    <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "40px 24px" }}>
      <StructuredProductData product={product} />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "48px" }} className="product-detail-grid">
        <div>
          <ProductGallery images={product.images ?? []} productName={product.name} />
        </div>
        <div>
          <span style={{
            fontSize: "11px",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "var(--avm-blue)",
            fontFamily: "var(--avm-font-display)",
          }}>
            {product.category?.name ?? "Producto destacado"}
          </span>
          <h1 style={{
            fontFamily: "var(--avm-font-display)",
            fontSize: "clamp(22px, 2.5vw, 32px)",
            fontWeight: 700,
            color: "#FFFFFF",
            letterSpacing: "-0.02em",
            margin: "8px 0 16px",
          }}>
            {product.name}
          </h1>
          <div style={{
            fontSize: "36px",
            fontWeight: 700,
            fontFamily: "var(--avm-font-display)",
            color: "#FFFFFF",
            marginBottom: "24px",
            letterSpacing: "-0.02em",
          }}>
            ${product.price.toLocaleString("es-AR")}
            {product.compareAtPrice && (
              <span style={{
                fontSize: "16px",
                fontWeight: 400,
                color: "var(--avm-muted)",
                textDecoration: "line-through",
                marginLeft: "12px",
              }}>
                ${product.compareAtPrice.toLocaleString("es-AR")}
              </span>
            )}
          </div>
          <p style={{
            color: "var(--avm-muted)",
            fontSize: "15px",
            lineHeight: 1.75,
            marginBottom: "32px",
            borderTop: "1px solid rgba(255,255,255,0.07)",
            paddingTop: "24px",
          }}>
            {product.description ?? product.shortDescription}
          </p>
          <div style={{
            fontSize: "13px",
            color: "var(--avm-muted)",
            marginBottom: "28px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}>
            ☆ {product.pointsReward} puntos al comprar
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <button style={{
              width: "100%",
              background: "var(--avm-blue)",
              color: "var(--avm-bg)",
              fontFamily: "var(--avm-font-display)",
              fontSize: "15px",
              fontWeight: 700,
              padding: "14px",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              letterSpacing: "0.03em",
            }}>
              Comprar ahora
            </button>
            <div style={{ display: "flex", gap: "8px" }}>
              <div style={{ flex: 1 }}>
                <AddToCartButton productId={product.id} variantId={selectedVariant?.id ?? null} isAuthenticated={Boolean(user)} guestItem={guestItem} maxStock={maxStock} />
              </div>
              <FavoriteButton productId={product.id} initialIsFavorite={favorite} isAuthenticated={Boolean(user)} />
            </div>
          </div>
        </div>
      </div>

      <div style={{
        marginTop: "64px",
        paddingTop: "48px",
        borderTop: "1px solid rgba(255,255,255,0.07)",
      }}>
        <h2 style={{
          fontFamily: "var(--avm-font-display)",
          fontSize: "20px",
          fontWeight: 600,
          color: "#FFFFFF",
          marginBottom: "20px",
        }}>
          Descripción
        </h2>
        <div style={{ color: "var(--avm-muted)", fontSize: "15px", lineHeight: 1.8 }}>
          {product.description ?? product.shortDescription}
        </div>
      </div>

      <RelatedProducts products={relatedProducts} />
    </main>
  );
}
