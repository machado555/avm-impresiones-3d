import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getFavoriteProductIds() {
  const user = await getCurrentProfile();

  if (!user) {
    return [];
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.from("favorites").select("product_id").eq("user_id", user.id);

  if (error || !data) {
    return [];
  }

  return data.map((favorite) => favorite.product_id);
}
