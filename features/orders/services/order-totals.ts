import type { CartItem } from "@/types/cart";

export function calculateOrderTotals(items: CartItem[], discounts = 0, shipping = 0) {
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const total = Math.max(subtotal - discounts + shipping, 0);
  const estimatedPoints = items.reduce((totalPoints, item) => totalPoints + item.estimatedPoints * item.quantity, 0);

  return {
    subtotal,
    discounts,
    shipping,
    total,
    estimatedPoints
  };
}
