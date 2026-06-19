"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { CartLineItem } from "@/features/cart/components/cart-line-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { cartStore, clearGuestCart, closeCartDrawer } from "@/lib/stores/cart-store";
import { useStore } from "@/lib/stores/use-store";

export function CartDrawer() {
  const cart = useStore(cartStore, (state) => state);

  if (!cart.isDrawerOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50">
      <button type="button" className="absolute inset-0 bg-black/60" onClick={closeCartDrawer} aria-label="Cerrar carrito" />
      <aside className="glass absolute right-0 top-0 flex h-full w-full max-w-md flex-col rounded-none border-y-0 border-r-0 p-5">
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-white">Carrito</p>
          <button type="button" onClick={closeCartDrawer} className="grid h-9 w-9 place-items-center rounded-full hover:bg-white/10" aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>
        <div className="mt-5 flex-1 space-y-3 overflow-y-auto">
          {cart.items.length === 0 ? (
            <p className="rounded-[8px] border border-white/10 p-5 text-center text-sm text-slate-400">Tu carrito esta vacio.</p>
          ) : (
            cart.items.map((item) => <CartLineItem key={item.id} item={item} mode={cart.mode} />)
          )}
        </div>
        <div className="mt-5 grid gap-3">
          <CartSummary cart={cart} />
          <Link href="/carrito" onClick={closeCartDrawer} className="inline-flex min-h-11 items-center justify-center rounded-full bg-gradient-to-r from-[var(--avm-blue)] to-[var(--avm-violet)] px-5 py-2 text-sm font-semibold text-white">
            Ver carrito
          </Link>
          {cart.mode === "guest" && cart.items.length > 0 && (
            <button type="button" onClick={clearGuestCart} className="text-sm text-slate-400 hover:text-white">Vaciar carrito</button>
          )}
        </div>
      </aside>
    </div>
  );
}
