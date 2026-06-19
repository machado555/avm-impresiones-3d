"use server";

import { revalidatePath } from "next/cache";
import { getOrCreateCart } from "@/features/cart/data/get-or-create-cart";
import { validateCartItem } from "@/features/cart/validators/validate-cart-item";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function addToCart(productId: string, variantId: string | null = null, quantity = 1) {
  const cartId = await getOrCreateCart();
  const validation = await validateCartItem({ productId, variantId, quantity });

  if (!validation.ok) {
    return validation;
  }

  const supabase = await createSupabaseServerClient();
  let existingItemQuery = supabase
    .from("cart_items")
    .select("id,quantity")
    .eq("cart_id", cartId)
    .eq("product_id", productId);

  existingItemQuery = variantId ? existingItemQuery.eq("variant_id", variantId) : existingItemQuery.is("variant_id", null);
  const { data: existingItem } = await existingItemQuery.maybeSingle();

  const productImage = validation.product.product_images
    ?.sort((a, b) => a.sort_order - b.sort_order)
    ?.[0]?.url ?? null;
  const variantSnapshot = validation.variant
    ? {
        sku: validation.variant.sku,
        color: validation.variant.color,
        material: validation.variant.material,
        size: validation.variant.size,
        finish: validation.variant.finish,
        price_modifier: validation.variant.price_modifier
      }
    : null;

  if (existingItem) {
    const nextQuantity = Math.min(existingItem.quantity + validation.adjustedQuantity, validation.stock);
    await supabase.from("cart_items").update({ quantity: nextQuantity }).eq("id", existingItem.id);
  } else {
    await supabase.from("cart_items").insert({
      cart_id: cartId,
      product_id: productId,
      variant_id: variantId,
      quantity: validation.adjustedQuantity,
      unit_price: validation.unitPrice,
      product_name: validation.product.name,
      product_slug: validation.product.slug,
      product_image: productImage,
      variant_snapshot: variantSnapshot
    });
  }

  await supabase.from("carts").update({ last_activity_at: new Date().toISOString() }).eq("id", cartId);
  revalidatePath("/carrito");
  return { ok: true, message: "Producto agregado al carrito." };
}
