import { Gift, PackageCheck, Star } from "lucide-react";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";
import { LogoutButton } from "@/features/auth/components/logout-button";
import { requireAuth } from "@/features/auth/guards/require-auth";

export const metadata = {
  title: "Panel de usuario"
};

export default async function AccountPage() {
  const user = await requireAuth("/panel");
  const stats = [
    { title: "Pedidos", value: "3 en historial", Icon: PackageCheck },
    { title: "Puntos", value: `${user.pointsBalance} disponibles`, Icon: Star },
    { title: "Recompensas", value: "2 canjeables", Icon: Gift }
  ];

  return (
    <Section eyebrow="Mi cuenta" title={`Hola${user.fullName ? `, ${user.fullName}` : ""}`} description="Dashboard protegido con Supabase Auth y perfil conectado.">
      <div className="mb-6 flex justify-end">
        <LogoutButton />
      </div>
      <div className="grid gap-4 md:grid-cols-3">
        {stats.map(({ title, value, Icon }) => (
          <GlassCard key={title}>
            <Icon className="text-cyan-200" size={26} />
            <p className="mt-5 text-sm text-slate-400">{title}</p>
            <p className="mt-2 text-2xl font-semibold text-white">{value}</p>
          </GlassCard>
        ))}
      </div>
    </Section>
  );
}
