import type { Product, ProductImage, ProductTag, ProductVariant } from "@/types/products";

type ProductRow = {
  id: string;
  category_id: string | null;
  name: string;
  slug: string;
  description: string | null;
  short_description: string | null;
  price: number;
  compare_at_price: number | null;
  sku: string | null;
  weight_grams: number | null;
  estimated_print_time: number | null;
  stock: number;
  status: Product["status"];
  is_featured: boolean;
  is_customizable: boolean;
  allow_file_upload: boolean;
  points_reward: number;
  brand: string | null;
  gtin: string | null;
  mpn: string | null;
  seo_title: string | null;
  seo_description: string | null;
  product_images?: ProductImageRow[];
  product_variants?: ProductVariantRow[];
  product_tags?: Array<{ tags: ProductTagRow | null }>;
};

type ProductImageRow = {
  id: string;
  product_id: string;
  variant_id: string | null;
  url: string;
  alt: string | null;
  sort_order: number;
};

type ProductVariantRow = {
  id: string;
  product_id: string;
  sku: string | null;
  color: string | null;
  material: string | null;
  size: string | null;
  finish: string | null;
  price_modifier: number;
  stock: number;
  active: boolean;
};

type ProductTagRow = {
  id: string;
  name: string;
  slug: string;
};

export function mapProduct(row: ProductRow): Product {
  return {
    id: row.id,
    categoryId: row.category_id,
    name: row.name,
    slug: row.slug,
    description: row.description,
    shortDescription: row.short_description,
    price: Number(row.price),
    compareAtPrice: row.compare_at_price === null ? null : Number(row.compare_at_price),
    sku: row.sku,
    weightGrams: row.weight_grams === null ? null : Number(row.weight_grams),
    estimatedPrintTime: row.estimated_print_time,
    stock: row.stock,
    status: row.status,
    isFeatured: row.is_featured,
    isCustomizable: row.is_customizable,
    allowFileUpload: row.allow_file_upload,
    pointsReward: row.points_reward,
    brand: row.brand,
    gtin: row.gtin,
    mpn: row.mpn,
    seoTitle: row.seo_title,
    seoDescription: row.seo_description,
    images: mapImages(row.product_images ?? []),
    variants: mapVariants(row.product_variants ?? []),
    tags: mapTags(row.product_tags ?? [])
  };
}

function mapImages(rows: ProductImageRow[]): ProductImage[] {
  return rows
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((row) => ({
      id: row.id,
      productId: row.product_id,
      variantId: row.variant_id,
      url: row.url,
      alt: row.alt,
      sortOrder: row.sort_order
    }));
}

function mapVariants(rows: ProductVariantRow[]): ProductVariant[] {
  return rows.map((row) => ({
    id: row.id,
    productId: row.product_id,
    sku: row.sku,
    color: row.color,
    material: row.material,
    size: row.size,
    finish: row.finish,
    priceModifier: Number(row.price_modifier),
    stock: row.stock,
    active: row.active
  }));
}

function mapTags(rows: Array<{ tags: ProductTagRow | null }>): ProductTag[] {
  return rows.flatMap((row) => (row.tags ? [row.tags] : []));
}
