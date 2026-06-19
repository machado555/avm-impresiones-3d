import { requireAuth } from "@/features/auth/guards/require-auth";
import { mapProduct } from "@/features/products/mappers/map-product";
import { productSelect } from "@/features/products/data/product-select";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getFavorites() {
  const user = await requireAuth("/favoritos");
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("favorites")
    .select(`product_id, created_at, updated_at, products (${productSelect})`)
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  if (error || !data) {
    return [];
  }

  return data.flatMap((favorite) => (favorite.products ? [mapProduct(favorite.products)] : []));
}
