import { createProductJsonLd } from "@/features/products/seo/product-json-ld";
import type { Product } from "@/types/products";

type StructuredProductDataProps = {
  product: Product;
};

export function StructuredProductData({ product }: StructuredProductDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  const jsonLd = createProductJsonLd(product, siteUrl);

  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />;
}
