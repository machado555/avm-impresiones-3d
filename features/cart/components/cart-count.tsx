"use client";

import { ShoppingBag } from "lucide-react";
import { cartStore, openCartDrawer } from "@/lib/stores/cart-store";
import { useStore } from "@/lib/stores/use-store";

export function CartCount() {
  const count = useStore(cartStore, (state) => state.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <button type="button" onClick={openCartDrawer} className="relative inline-flex" aria-label="Abrir carrito">
      <ShoppingBag size={20} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-violet-300 px-1 text-[10px] font-bold text-slate-950">
          {count}
        </span>
      )}
    </button>
  );
}
