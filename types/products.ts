export type ProductFilters = {
  category?: string;
  categorySlug?: string;
  tagSlug?: string;
  materialSlug?: string;
  color?: string;
  size?: string;
  finish?: string;
  inStock?: boolean;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  query?: string;
  sort?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "popular";
};

export type ProductVariant = {
  id: string;
  name?: string;
  price?: number;
  priceModifier?: number;
  stock?: number;
  color?: string;
  size?: string;
  finish?: string;
};

export type ProductImage = {
  url: string;
  alt?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  shortDescription?: string;
  price: number;
  compareAtPrice?: number;
  images?: ProductImage[];
  category?: string;
  stock?: number;
  variants?: ProductVariant[];
  pointsReward?: number;
  created_at?: string;
};
