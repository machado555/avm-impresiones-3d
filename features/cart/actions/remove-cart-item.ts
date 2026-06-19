"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function removeCartItem(cartItemId: string) {
  const user = await requireAuth("/carrito");
  const supabase = await createSupabaseServerClient();
  const { data: item } = await supabase
    .from("cart_items")
    .select("id,carts!inner(user_id)")
    .eq("id", cartItemId)
    .eq("carts.user_id", user.id)
    .single();

  if (!item) {
    return { ok: false, message: "Item no encontrado." };
  }

  await supabase.from("cart_items").delete().eq("id", cartItemId);
  revalidatePath("/carrito");
  return { ok: true, message: "Item eliminado." };
}
