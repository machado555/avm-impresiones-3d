import { Button } from "@/components/ui/button";

export function CheckoutConfirmation() {
  return (
    <div className="rounded-[8px] border border-cyan-300/25 bg-cyan-300/10 p-4">
      <p className="text-sm leading-6 text-slate-300">
        Al confirmar se creara tu pedido. Te contactaremos para coordinar el pago y la entrega.
      </p>
      <Button type="submit" className="mt-4 w-full">
        Confirmar pedido
      </Button>
    </div>
  );
}
