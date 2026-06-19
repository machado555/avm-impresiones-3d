import { requireAuth } from "@/features/auth/guards/require-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getOrCreateCart() {
  const user = await requireAuth("/carrito");
  const supabase = await createSupabaseServerClient();
  const { data: existingCart } = await supabase
    .from("carts")
    .select("id")
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (existingCart) {
    await supabase.from("carts").update({ last_activity_at: new Date().toISOString() }).eq("id", existingCart.id);
    return existingCart.id;
  }

  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 30);

  const { data, error } = await supabase
    .from("carts")
    .insert({
      user_id: user.id,
      status: "active",
      last_activity_at: new Date().toISOString(),
      expires_at: expiresAt.toISOString()
    })
    .select("id")
    .single();

  if (error || !data) {
    throw new Error("No se pudo crear el carrito.");
  }

  return data.id;
}
