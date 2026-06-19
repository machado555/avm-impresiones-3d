import type { CartState } from "@/types/cart";

type CartSummaryProps = {
  cart: Pick<CartState, "subtotal" | "discounts" | "shipping" | "total" | "estimatedPoints">;
};

export function CartSummary({ cart }: CartSummaryProps) {
  return (
    <div className="glass rounded-[8px] p-5">
      <p className="text-lg font-semibold text-white">Resumen</p>
      <div className="mt-5 grid gap-3 text-sm">
        <Row label="Subtotal" value={formatPrice(cart.subtotal)} />
        <Row label="Descuentos" value={formatPrice(cart.discounts)} />
        <Row label="Envio" value="A calcular" />
        <div className="border-t border-white/10 pt-3">
          <Row label="Total" value={formatPrice(cart.total)} strong />
        </div>
        <Row label="Puntos estimados" value={`${cart.estimatedPoints}`} />
      </div>
    </div>
  );
}

function Row({ label, value, strong = false }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className={strong ? "flex justify-between text-base font-semibold text-white" : "flex justify-between text-slate-300"}>
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}

function formatPrice(value: number) {
  return new Intl.NumberFormat("es-AR", { style: "currency", currency: "ARS", maximumFractionDigits: 0 }).format(value);
}
