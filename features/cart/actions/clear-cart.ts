"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function clearCart() {
  const user = await requireAuth("/carrito");
  const supabase = await createSupabaseServerClient();
  const { data: cart } = await supabase.from("carts").select("id").eq("user_id", user.id).eq("status", "active").maybeSingle();

  if (!cart) {
    return { ok: true, message: "Carrito vacio." };
  }

  await supabase.from("cart_items").delete().eq("cart_id", cart.id);
  await supabase.from("carts").update({ last_activity_at: new Date().toISOString() }).eq("id", cart.id);
  revalidatePath("/carrito");
  return { ok: true, message: "Carrito vaciado." };
}
