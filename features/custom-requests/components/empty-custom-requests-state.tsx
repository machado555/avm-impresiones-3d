import { Cuboid } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export function EmptyCustomRequestsState() {
  return (
    <GlassCard className="mx-auto max-w-xl text-center">
      <Cuboid className="mx-auto text-cyan-200" size={34} />
      <p className="mt-5 text-lg font-semibold text-white">Todavia no tenes solicitudes</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">Crea una solicitud para cotizar una pieza, repuesto o impresion personalizada.</p>
      <ButtonLink href="/solicitar-diseno" className="mt-6">Crear solicitud</ButtonLink>
    </GlassCard>
  );
}
