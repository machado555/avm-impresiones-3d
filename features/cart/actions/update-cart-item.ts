"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { validateCartItem } from "@/features/cart/validators/validate-cart-item";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function updateCartItem(cartItemId: string, quantity: number) {
  const user = await requireAuth("/carrito");
  const supabase = await createSupabaseServerClient();
  const { data: item } = await supabase
    .from("cart_items")
    .select("id,product_id,variant_id,carts!inner(user_id)")
    .eq("id", cartItemId)
    .eq("carts.user_id", user.id)
    .single();

  if (!item) {
    return { ok: false, message: "Item no encontrado." };
  }

  if (quantity <= 0) {
    await supabase.from("cart_items").delete().eq("id", cartItemId);
    revalidatePath("/carrito");
    return { ok: true, message: "Item eliminado." };
  }

  const validation = await validateCartItem({ productId: item.product_id, variantId: item.variant_id, quantity });

  if (!validation.ok) {
    return validation;
  }

  await supabase.from("cart_items").update({ quantity: validation.adjustedQuantity }).eq("id", cartItemId);
  revalidatePath("/carrito");
  return { ok: true, message: "Cantidad actualizada." };
}
