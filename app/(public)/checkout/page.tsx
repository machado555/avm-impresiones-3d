import { redirect } from "next/navigation";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { getCart } from "@/features/cart/data/get-cart";
import { EmptyCartState } from "@/features/cart/components/empty-cart-state";
import { CheckoutConfirmation } from "@/features/orders/components/checkout-confirmation";
import { CheckoutContactForm } from "@/features/orders/components/checkout-contact-form";
import { CheckoutShippingForm } from "@/features/orders/components/checkout-shipping-form";
import { CheckoutSummary } from "@/features/orders/components/checkout-summary";

export const metadata = {
  title: "Checkout"
};

export default async function CheckoutPage() {
  const user = await getCurrentProfile();

  if (!user) {
    redirect("/login?redirectTo=/checkout");
  }

  const cart = await getCart();

  return (
    <Section eyebrow="Checkout" title="Confirmar pedido" description="Pedido pendiente de pago, preparado para Mercado Pago en una etapa posterior.">
      {cart.items.length === 0 ? (
        <EmptyCartState />
      ) : (
        <form className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <div className="grid gap-4">
            <GlassCard>
              <h2 className="text-lg font-semibold text-white">Datos de contacto</h2>
              <div className="mt-5">
                <CheckoutContactForm fullName={user.fullName} email={user.email} phone={user.phone} />
              </div>
            </GlassCard>
            <GlassCard>
              <h2 className="text-lg font-semibold text-white">Entrega</h2>
              <div className="mt-5">
                <CheckoutShippingForm />
              </div>
            </GlassCard>
          </div>
          <div className="grid h-fit gap-4">
            <CheckoutSummary cart={cart} />
            <CheckoutConfirmation />
          </div>
        </form>
      )}
    </Section>
  );
}
