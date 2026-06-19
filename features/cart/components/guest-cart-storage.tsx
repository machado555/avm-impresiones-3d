"use client";

import { useEffect } from "react";
import { cartStore, setCartItems } from "@/lib/stores/cart-store";

const storageKey = "avm_guest_cart";

export function GuestCartStorage() {
  useEffect(() => {
    const raw = window.localStorage.getItem(storageKey);

    if (raw) {
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed.items)) {
          setCartItems(parsed.items);
        }
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }

    return cartStore.subscribe((state) => {
      if (state.mode === "guest") {
        window.localStorage.setItem(storageKey, JSON.stringify({ items: state.items }));
      }
    });
  }, []);

  return null;
}
