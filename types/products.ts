export type ProductFilters = {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  search?: string;
  query?: string;
  sort?: string;
  sortBy?: "price_asc" | "price_desc" | "newest" | "popular";
};
