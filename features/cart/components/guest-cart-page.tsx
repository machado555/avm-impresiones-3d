"use client";

import { ButtonLink } from "@/components/ui/button";
import { CartLineItem } from "@/features/cart/components/cart-line-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { EmptyCartState } from "@/features/cart/components/empty-cart-state";
import { cartStore } from "@/lib/stores/cart-store";
import { useStore } from "@/lib/stores/use-store";

export function GuestCartPage() {
  const cart = useStore(cartStore, (state) => state);

  if (cart.items.length === 0) {
    return <EmptyCartState />;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
      <div className="grid gap-3">
        {cart.items.map((item) => (
          <CartLineItem key={item.id} item={item} mode="guest" />
        ))}
      </div>
      <div className="grid h-fit gap-4">
        <CartSummary cart={cart} />
        <ButtonLink href="/login?redirectTo=/checkout" className="w-full">
          Iniciar sesion para confirmar
        </ButtonLink>
      </div>
    </div>
  );
}
