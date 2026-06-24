"use server";

import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { productSelect } from "@/features/products/data/product-select";
import { mapProduct } from "@/features/products/mappers/map-product";

export async function getAdminProductById(id: string) {
  await requireCapability("products:manage");
  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase
    .from("products")
    .select(productSelect)
    .eq("id", id)
    .single();

  if (error || !data) return null;
  return mapProduct(data as any);
}
