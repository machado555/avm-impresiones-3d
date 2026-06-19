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
  stock?: number;
  color?: string;
  size?: string;
  finish?: string;
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  images?: string[];
  category?: string;
  stock?: number;
  variants?: ProductVariant[];
  created_at?: string;
};
