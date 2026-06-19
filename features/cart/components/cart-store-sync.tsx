"use client";

import { useEffect } from "react";
import { cartStore, setCartItems } from "@/lib/stores/cart-store";
import type { CartState } from "@/types/cart";

type CartStoreSyncProps = {
  cart: CartState;
};

export function CartStoreSync({ cart }: CartStoreSyncProps) {
  useEffect(() => {
    if (cart.mode === "guest") {
      return;
    }

    cartStore.setState({
      id: cart.id,
      mode: cart.mode,
      status: cart.status,
      discounts: cart.discounts,
      shipping: cart.shipping,
      total: cart.total,
      estimatedPoints: cart.estimatedPoints
    });
    setCartItems(cart.items);
  }, [cart]);

  return null;
}
