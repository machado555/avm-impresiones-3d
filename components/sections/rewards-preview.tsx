import { Gift, ShieldCheck, Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export function RewardsPreview() {
  const rewards = [
    { title: "Compra y suma", description: "Puntos automaticos por pedido confirmado.", Icon: Trophy },
    { title: "Canje flexible", description: "Descuentos fijos, porcentuales o envio bonificado.", Icon: Gift },
    { title: "Cuenta segura", description: "RLS, perfiles propios y rutas protegidas con Supabase.", Icon: ShieldCheck }
  ];

  return (
    <Section
      eyebrow="Fidelizacion"
      title="Puntos y recompensas desde el ADN del producto"
      description="Cada compra suma puntos. El panel del usuario mostrara saldo, movimientos, recompensas disponibles y beneficios canjeables."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {rewards.map(({ title, description, Icon }) => (
          <GlassCard key={title}>
            <Icon className="text-violet-200" size={26} />
            <p className="mt-5 text-lg font-semibold text-white">{title}</p>
            <p className="mt-3 text-sm leading-6 text-slate-400">{description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
