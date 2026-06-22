export type ProductStatus = "active" | "inactive" | "draft";

export type ProductFilters = {
  category?: string;
  categorySlug?: string;
  tagSlug?: string;
  materialSlug?: string;
  color?: string;
  size?: string;
  finish?: string;
  inStock?: boolean;
  isFeatured?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  query?: string;
  sort?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "popular";
};

export type ProductVariant = {
  id: string;
  productId?: string;
  sku?: string | null;
  name?: string;
  price?: number;
  priceModifier?: number;
  stock?: number;
  active?: boolean;
  color?: string | null;
  material?: string | null;
  size?: string | null;
  finish?: string | null;
};

export type ProductImage = {
  id?: string;
  productId?: string;
  variantId?: string | null;
  url: string;
  alt?: string | null;
  sortOrder?: number;
};

export type ProductTag = {
  id: string;
  name: string;
  slug: string;
};

export type ProductCategory = {
  id: string;
  parentId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  image?: string | null;
  imageUrl?: string | null;
  sortOrder?: number;
  isActive?: boolean;
  productCount?: number;
};

export type Product = {
  id: string;
  categoryId?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  shortDescription?: string | null;
  price: number;
  compareAtPrice?: number | null;
  sku?: string | null;
  weightGrams?: number | null;
  estimatedPrintTime?: number | null;
  stock?: number;
  status?: ProductStatus;
  isFeatured?: boolean;
  isCustomizable?: boolean;
  allowFileUpload?: boolean;
  pointsReward?: number;
  points?: number;
  brand?: string | null;
  gtin?: string | null;
  mpn?: string | null;
  seoTitle?: string | null;
  seoDescription?: string | null;
  images?: ProductImage[];
  variants?: ProductVariant[];
  tags?: ProductTag[];
  created_at?: string;
};
