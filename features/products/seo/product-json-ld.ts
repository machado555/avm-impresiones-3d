import type { Product } from "@/types/products";

export function createProductJsonLd(product: Product, siteUrl: string) {
  const images = product.images?.map((image) => image.url) ?? [];

  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.shortDescription ?? product.description ?? product.name,
    image: images,
    sku: product.sku ?? undefined,
    gtin: product.gtin ?? undefined,
    mpn: product.mpn ?? undefined,
    brand: {
      "@type": "Brand",
      name: product.brand ?? "AVM-Impresiones 3D"
    },
    url: `${siteUrl}/productos/${product.slug}`,
    offers: {
      "@type": "Offer",
      priceCurrency: "ARS",
      price: product.price,
      availability: product.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock"
    }
  };
}
