"use client";

import { useTransition } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { addToCart } from "@/features/cart/actions/add-to-cart";
import { addGuestCartItem, openCartDrawer } from "@/lib/stores/cart-store";
import type { CartItem } from "@/types/cart";

type AddToCartButtonProps = {
  productId: string;
  variantId?: string | null;
  quantity?: number;
  isAuthenticated?: boolean;
  guestItem: CartItem;
  maxStock: number;
};

export function AddToCartButton({ productId, variantId = null, quantity = 1, isAuthenticated = false, guestItem, maxStock }: AddToCartButtonProps) {
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!isAuthenticated) {
      addGuestCartItem({ ...guestItem, quantity }, maxStock);
      openCartDrawer();
      return;
    }

    startTransition(async () => {
      const result = await addToCart(productId, variantId, quantity);
      if (result.ok) {
        openCartDrawer();
      }
    });
  }

  return (
    <Button type="button" onClick={handleClick} disabled={isPending || maxStock <= 0} className="w-full">
      <ShoppingCart size={18} />
      {isPending ? "Agregando..." : "Agregar al carrito"}
    </Button>
  );
}
