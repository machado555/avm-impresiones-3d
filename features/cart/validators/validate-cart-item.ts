import { createSupabaseServerClient } from "@/lib/supabase/server";

type ValidateCartItemInput = {
  productId: string;
  variantId?: string | null;
  quantity: number;
};

export async function validateCartItem({ productId, variantId, quantity }: ValidateCartItemInput) {
  const supabase = await createSupabaseServerClient();
  const { data: product } = await supabase
    .from("products")
    .select("id,name,slug,price,stock,status,points_reward,product_images(url,sort_order)")
    .eq("id", productId)
    .single();

  if (!product || product.status !== "active" || product.stock <= 0) {
    return { ok: false as const, message: "Producto no disponible." };
  }

  if (variantId) {
    const { data: variant } = await supabase
      .from("product_variants")
      .select("id,sku,color,material,size,finish,price_modifier,stock,active")
      .eq("id", variantId)
      .eq("product_id", productId)
      .single();

    if (!variant || !variant.active || variant.stock <= 0) {
      return { ok: false as const, message: "Variante no disponible." };
    }

    const adjustedQuantity = Math.min(quantity, variant.stock);

    return {
      ok: true as const,
      product,
      variant,
      adjustedQuantity,
      stock: variant.stock,
      unitPrice: Number(product.price) + Number(variant.price_modifier ?? 0)
    };
  }

  const adjustedQuantity = Math.min(quantity, product.stock);

  return {
    ok: true as const,
    product,
    variant: null,
    adjustedQuantity,
    stock: product.stock,
    unitPrice: Number(product.price)
  };
}
