import { createStore } from "@/lib/stores/store";
import type { CartItem, CartState, CartTotals } from "@/types/cart";

const initialCartState: CartState = {
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

function calculateTotals(items: CartItem[]): CartTotals {
  const subtotal = items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);
  const discounts = 0;
  const shipping = 0;

  return {
    subtotal,
    discounts,
    shipping,
    total: subtotal - discounts + shipping,
    estimatedPoints: items.reduce((total, item) => total + item.estimatedPoints * item.quantity, 0)
  };
}

export const cartStore = createStore<CartState>(initialCartState);

export function setCartItems(items: CartItem[]) {
  cartStore.setState({ items, ...calculateTotals(items) });
}

export function openCartDrawer() {
  cartStore.setState({ isDrawerOpen: true });
}

export function closeCartDrawer() {
  cartStore.setState({ isDrawerOpen: false });
}

export function addGuestCartItem(item: CartItem, maxStock: number) {
  const state = cartStore.getState();
  const existingItem = state.items.find((cartItem) => cartItem.productId === item.productId && cartItem.variantId === item.variantId);
  const nextItems = existingItem
    ? state.items.map((cartItem) =>
        cartItem.id === existingItem.id
          ? { ...cartItem, quantity: Math.min(cartItem.quantity + item.quantity, maxStock) }
          : cartItem
      )
    : [...state.items, { ...item, quantity: Math.min(item.quantity, maxStock) }];

  cartStore.setState({ mode: "guest", items: nextItems, ...calculateTotals(nextItems), isDrawerOpen: true });
}

export function updateGuestCartItem(id: string, quantity: number, maxStock: number) {
  const state = cartStore.getState();
  const nextQuantity = Math.min(quantity, maxStock);
  const nextItems = nextQuantity <= 0
    ? state.items.filter((item) => item.id !== id)
    : state.items.map((item) => (item.id === id ? { ...item, quantity: nextQuantity } : item));

  cartStore.setState({ items: nextItems, ...calculateTotals(nextItems) });
}

export function removeGuestCartItem(id: string) {
  const nextItems = cartStore.getState().items.filter((item) => item.id !== id);
  cartStore.setState({ items: nextItems, ...calculateTotals(nextItems) });
}

export function clearGuestCart() {
  cartStore.setState({ items: [], ...calculateTotals([]) });
}
