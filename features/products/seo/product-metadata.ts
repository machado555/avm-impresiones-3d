import type { Metadata } from "next";
import type { Product } from "@/types/products";

export function createProductMetadata(product: Product): Metadata {
  const title = product.seoTitle ?? product.name;
  const description = product.seoDescription ?? product.shortDescription ?? product.description ?? "Producto AVM-Impresiones 3D";
  const image = product.images?.[0]?.url;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: image ? [{ url: image, alt: product.images?.[0]?.alt ?? product.name }] : undefined
    }
  };
}
