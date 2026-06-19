import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { CartItem } from "@/types/cart";

export async function validateCartStockForOrder(items: CartItem[]) {
  const supabase = await createSupabaseServerClient();

  for (const item of items) {
    const { data: product } = await supabase.from("products").select("id,status,stock").eq("id", item.productId).single();

    if (!product || product.status !== "active" || product.stock <= 0) {
      return { ok: false as const, message: `${item.name} ya no esta disponible.` };
    }

    if (item.variantId) {
      const { data: variant } = await supabase
        .from("product_variants")
        .select("id,active,stock")
        .eq("id", item.variantId)
        .eq("product_id", item.productId)
        .single();

      if (!variant || !variant.active || variant.stock <= 0) {
        return { ok: false as const, message: `La variante de ${item.name} ya no esta disponible.` };
      }

      if (item.quantity > variant.stock) {
        return { ok: false as const, message: `Stock insuficiente para ${item.name}. Disponible: ${variant.stock}.` };
      }
    } else if (item.quantity > product.stock) {
      return { ok: false as const, message: `Stock insuficiente para ${item.name}. Disponible: ${product.stock}.` };
    }
  }

  return { ok: true as const };
}
