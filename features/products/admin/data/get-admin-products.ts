"use server";

import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { productSelect } from "@/features/products/data/product-select";
import { mapProduct } from "@/features/products/mappers/map-product";

export async function getAdminProducts() {
  await requireCapability("products:manage");
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .order("created_at", { ascending: false });

  if (error || !data) return [];
  return data.map((row) => mapProduct(row as any));
}
