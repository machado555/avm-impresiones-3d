"use server";

import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type ProductPayload = {
  category_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  short_description?: string | null;
  price: number;
  compare_at_price?: number | null;
  sku?: string | null;
  weight_grams?: number | null;
  estimated_print_time?: number | null;
  stock?: number;
  status?: "draft" | "active" | "out_of_stock" | "archived";
  is_featured?: boolean;
  is_customizable?: boolean;
  allow_file_upload?: boolean;
  points_reward?: number;
  brand?: string | null;
  gtin?: string | null;
  mpn?: string | null;
  seo_title?: string | null;
  seo_description?: string | null;
};

export async function createProduct(payload: ProductPayload) {
  await requireCapability("products:manage");
  const supabase = await createSupabaseServerClient();
  return supabase.from("products").insert(payload).select().single();
}

export async function updateProduct(id: string, payload: Partial<ProductPayload>) {
  await requireCapability("products:manage");
  const supabase = await createSupabaseServerClient();
  return supabase.from("products").update(payload).eq("id", id).select().single();
}

export async function deleteProduct(id: string) {
  await requireCapability("products:manage");
  const supabase = await createSupabaseServerClient();
  return supabase.from("products").update({ status: "archived" }).eq("id", id);
}
