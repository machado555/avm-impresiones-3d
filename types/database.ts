export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type DatabaseTable =
  | "profiles"
  | "categories"
  | "print_materials"
  | "products"
  | "product_variants"
  | "product_images"
  | "tags"
  | "product_tags"
  | "favorites"
  | "carts"
  | "cart_items"
  | "orders"
  | "order_items"
  | "points_transactions"
  | "rewards"
  | "reward_redemptions"
  | "custom_requests"
  | "custom_request_files"
  | "quote_rules"
  | "custom_request_quotes"
  | "blog_categories"
  | "blog_posts"
  | "activity_logs";

export type DatabaseEntity = {
  id: string;
  created_at?: string;
  updated_at?: string;
};

export type PaginationParams = {
  page: number;
  pageSize: number;
};

export type PaginatedResult<T> = {
  data: T[];
  count: number;
  page: number;
  pageSize: number;
  pageCount: number;
};
