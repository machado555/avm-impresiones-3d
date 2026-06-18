import { Section } from "@/components/ui/section";
import { ButtonLink } from "@/components/ui/button";
import { CartLineItem } from "@/features/cart/components/cart-line-item";
import { CartSummary } from "@/features/cart/components/cart-summary";
import { CartStoreSync } from "@/features/cart/components/cart-store-sync";
import { EmptyCartState } from "@/features/cart/components/empty-cart-state";
import { GuestCartPage } from "@/features/cart/components/guest-cart-page";
import { getCart } from "@/features/cart/data/get-cart";

export const metadata = {
  title: "Carrito"
};

export default async function CartPage() {
  const cart = await getCart();

  return (
    <Section eyebrow="Compra" title="Carrito" description="Carrito persistente preparado para pedidos, cupones, puntos, checkout y Mercado Pago.">
      <CartStoreSync cart={cart} />
      {cart.mode === "guest" ? (
        <GuestCartPage />
      ) : cart.items.length === 0 ? (
        <EmptyCartState />
      ) : (
        <div className="grid gap-6 lg:grid-cols-[1fr_360px]">
          <div className="grid gap-3">
            {cart.items.map((item) => (
              <CartLineItem key={item.id} item={item} mode="authenticated" />
            ))}
          </div>
          <div className="grid h-fit gap-4">
            <CartSummary cart={cart} />
            <ButtonLink href="/checkout" className="w-full">
              Continuar al checkout
            </ButtonLink>
          </div>
        </div>
      )}
    </Section>
  );
}
