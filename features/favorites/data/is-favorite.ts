import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function isFavorite(productId: string) {
  const user = await getCurrentProfile();

  if (!user) {
    return false;
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase
    .from("favorites")
    .select("product_id")
    .eq("user_id", user.id)
    .eq("product_id", productId)
    .maybeSingle();

  return Boolean(!error && data);
}
