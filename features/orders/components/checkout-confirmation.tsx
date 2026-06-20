import { Button } from "@/components/ui/button";
import { createOrderFromCart } from "@/features/orders/actions/create-order-from-cart";

export function CheckoutConfirmation() {
  return (
    <div className="rounded-[8px] border border-cyan-300/25 bg-cyan-300/10 p-4">
      <p className="text-sm leading-6 text-slate-300">
        Al confirmar se creara un pedido pendiente de pago. Mercado Pago se integrara en una etapa posterior.
      </p>
      <Button formAction={async (formData: FormData) => { await createOrderFromCart(formData); }} className="mt-4 w-full">
        Confirmar pedido
      </Button>
    </div>
  );
}
