import { PackageCheck } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export function EmptyOrdersState() {
  return (
    <GlassCard className="mx-auto max-w-xl text-center">
      <PackageCheck className="mx-auto text-cyan-200" size={34} />
      <p className="mt-5 text-lg font-semibold text-white">Todavia no tenes pedidos</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">Cuando confirmes una compra, vas a poder seguirla desde aca.</p>
      <ButtonLink href="/productos" className="mt-6">Ver productos</ButtonLink>
    </GlassCard>
  );
}
