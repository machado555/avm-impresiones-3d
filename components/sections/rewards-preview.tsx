import { Gift, ShieldCheck, Trophy } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export function RewardsPreview() {
  const rewards = [
    { title: "Compra y suma", description: "Puntos automáticos por pedido confirmado.", Icon: Trophy },
    { title: "Canje flexible", description: "Descuentos fijos, porcentuales o envío bonificado.", Icon: Gift },
    { title: "Cuenta segura", description: "Tus datos protegidos con los más altos estándares de seguridad.", Icon: ShieldCheck }
  ];

  return (
    <Section
      eyebrow="Fidelización"
      title="Puntos y recompensas desde el ADN del producto"
      description="Cada compra suma puntos que podés canjear por descuentos y beneficios exclusivos."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {rewards.map(({ title, description, Icon }) => (
          <GlassCard key={title}>
            <div className="avm-card__icon bg-[var(--avm-violet)]/10 text-[var(--avm-violet)]">
              <Icon size={20} />
            </div>
            <h3 className="text-lg font-semibold text-white">{title}</h3>
            <p className="mt-2 text-sm leading-6 text-[var(--avm-muted)]">{description}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
