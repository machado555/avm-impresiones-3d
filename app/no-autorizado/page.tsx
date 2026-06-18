import { ShieldAlert } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "No autorizado"
};

export default function UnauthorizedPage() {
  return (
    <Section eyebrow="Seguridad" title="Acceso no autorizado" description="Tu cuenta no tiene permisos suficientes para ver esta seccion.">
      <GlassCard className="mx-auto max-w-xl text-center">
        <ShieldAlert className="mx-auto text-violet-200" size={36} />
        <p className="mt-5 text-sm leading-6 text-slate-400">
          Si crees que deberias tener acceso, contacta a un administrador de AVM.
        </p>
        <ButtonLink href="/panel" className="mt-6">
          Volver al panel
        </ButtonLink>
      </GlassCard>
    </Section>
  );
}
