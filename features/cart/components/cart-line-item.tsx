"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { removeCartItem } from "@/features/cart/actions/remove-cart-item";
import { updateCartItem } from "@/features/cart/actions/update-cart-item";
import { removeGuestCartItem, updateGuestCartItem } from "@/lib/stores/cart-store";
import type { CartItem } from "@/types/cart";

type CartLineItemProps = {
  item: CartItem;
  mode?: "guest" | "authenticated";
};

export function CartLineItem({ item, mode = "authenticated" }: CartLineItemProps) {
  const maxStock = Number(item.variantSnapshot?.stock ?? 999);

  function updateQuantity(quantity: number) {
    if (mode === "guest") {
      updateGuestCartItem(item.id, quantity, maxStock);
      return;
    }

    void updateCartItem(item.id, quantity);
  }

  function removeItem() {
    if (mode === "guest") {
      removeGuestCartItem(item.id);
      return;
    }

    void removeCartItem(item.id);
  }

  return (
    <div className="grid grid-cols-[72px_1fr_auto] gap-3 rounded-[var(--avm-radius-md)] border border-white/10 bg-white/[0.05] p-3">
      <div className="relative h-16 w-16 overflow-hidden rounded-[var(--avm-radius-md)] bg-white/10">
        {item.imageUrl && <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="72px" />}
      </div>
      <div>
        <Link href={`/productos/${item.slug}`} className="font-semibold text-white hover:text-cyan-200">{item.name}</Link>
        <p className="mt-1 text-sm text-slate-400">{formatPrice(item.unitPrice)}</p>
        <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/20 p-1">
          <Button type="button" variant="ghost" icon className="h-7 min-h-7 w-7 p-0" onClick={() => updateQuantity(item.quantity - 1)} aria-label="Restar">
            <Minus size={14} />
          </Button>
          <span className="min-w-6 text-center text-sm">{item.quantity}</span>
          <Button type="button" variant="ghost" icon className="h-7 min-h-7 w-7 p-0" onClick={() => updateQuantity(item.quantity + 1)} aria-label="Sumar">
            <Plus size={14} />
          </Button>
        </div>
      </div>
      <Button type="button" variant="ghost" icon onClick={removeItem} className="text-slate-400 hover:text-white" aria-label="Eliminar item">
        <X size={16} />
      </Button>
    </div>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}
