import { CartSummary } from "@/features/cart/components/cart-summary";
import { OrderItemsList } from "@/features/orders/components/order-items-list";
import type { CartState } from "@/types/cart";

type CheckoutSummaryProps = {
  cart: CartState;
};

export function CheckoutSummary({ cart }: CheckoutSummaryProps) {
  const items = cart.items.map((item) => ({
    id: item.id,
    productId: item.productId,
    variantId: item.variantId,
    quantity: item.quantity,
    unitPrice: item.unitPrice,
    productName: item.name,
    productSlug: item.slug,
    productImage: item.imageUrl,
    variantSnapshot: item.variantSnapshot,
    createdAt: new Date().toISOString()
  }));

  return (
    <div className="grid gap-4">
      <OrderItemsList items={items} />
      <CartSummary cart={cart} />
    </div>
  );
}
