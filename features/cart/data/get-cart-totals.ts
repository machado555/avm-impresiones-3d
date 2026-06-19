import type { CartDiscount, CartItem, CartTotals } from "@/types/cart";

export function getCartTotals(items: CartItem[], discountsData: CartDiscount[] = []): CartTotals {
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const discounts = discountsData.reduce((total, discount) => {
    if (discount.type === "percentage") {
      return total + subtotal * (discount.value / 100);
    }

    if (discount.type === "free_shipping") {
      return total;
    }

    return total + discount.value;
  }, 0);
  const shipping = 0;

  return {
    subtotal,
    discounts,
    shipping,
    total: Math.max(subtotal - discounts + shipping, 0),
    estimatedPoints: items.reduce((total, item) => total + item.estimatedPoints * item.quantity, 0)
  };
}
