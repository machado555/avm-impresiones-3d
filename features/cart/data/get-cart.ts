import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { getCartTotals } from "@/features/cart/data/get-cart-totals";
import type { CartItem, CartState } from "@/types/cart";

export async function getCart(): Promise<CartState> {
  const user = await getCurrentProfile();

  if (!user) {
    return emptyGuestCart();
  }

  const supabase = await createSupabaseServerClient();
  const { data: cart } = await supabase
    .from("carts")
    .select(`
      id,
      status,
      cart_items (
        id,
        product_id,
        variant_id,
        quantity,
        unit_price,
        product_name,
        product_slug,
        product_image,
        variant_snapshot,
        products (points_reward)
      ),
      cart_discounts (
        id,
        type,
        value,
        description
      )
    `)
    .eq("user_id", user.id)
    .eq("status", "active")
    .maybeSingle();

  if (!cart) {
    return emptyAuthenticatedCart();
  }

  const items: CartItem[] = (cart.cart_items ?? []).map((item) => ({
    id: item.id,
    productId: item.product_id,
    variantId: item.variant_id,
    name: item.product_name,
    slug: item.product_slug,
    imageUrl: item.product_image,
    quantity: item.quantity,
    unitPrice: Number(item.unit_price),
    estimatedPoints: Array.isArray(item.products) ? (item.products[0]?.points_reward ?? 0) : (item.products?.points_reward ?? 0),
    variantSnapshot: item.variant_snapshot
  }));
  const totals = getCartTotals(items, cart.cart_discounts ?? []);

  return {
    id: cart.id,
    mode: "authenticated",
    status: cart.status,
    items,
    ...totals,
    isDrawerOpen: false
  };
}

function emptyGuestCart(): CartState {
  return {
    id: null,
    mode: "guest",
    status: "active",
    items: [],
    subtotal: 0,
    discounts: 0,
    shipping: 0,
    total: 0,
    estimatedPoints: 0,
    isDrawerOpen: false
  };
}

function emptyAuthenticatedCart(): CartState {
  return {
    id: null,
    mode: "authenticated",
    status: "active",
    items: [],
    subtotal: 0,
    discounts: 0,
    shipping: 0,
    total: 0,
    estimatedPoints: 0,
    isDrawerOpen: false
  };
}
