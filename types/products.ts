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

export type Product = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  price: number;
  images?: string[];
  category?: string;
  stock?: number;
  created_at?: string;
};
