import { ShoppingBag } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export function EmptyCartState() {
  return (
    <GlassCard className="mx-auto max-w-xl text-center">
      <ShoppingBag className="mx-auto text-cyan-200" size={34} />
      <p className="mt-5 text-lg font-semibold text-white">Tu carrito esta vacio</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">Agrega productos, variantes o piezas personalizadas para preparar tu pedido.</p>
      <ButtonLink href="/productos" className="mt-6">Ver productos</ButtonLink>
    </GlassCard>
  );
}
