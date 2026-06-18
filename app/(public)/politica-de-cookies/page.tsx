import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Politica de Cookies"
};

export default function CookiesPage() {
  return (
    <Section eyebrow="Legal" title="Politica de Cookies" description="Cookies tecnicas y futuras integraciones.">
      <GlassCard className="prose prose-invert max-w-none text-slate-300">
        <p>AVM-Impresiones 3D utiliza cookies tecnicas necesarias para el funcionamiento del sitio, autenticacion, carrito y seguridad.</p>
        <p>En el futuro podran incorporarse cookies analiticas o publicitarias, siempre informando su finalidad cuando corresponda.</p>
        <h2>Cookies tecnicas</h2>
        <p>Permiten mantener sesiones, proteger rutas y conservar preferencias esenciales.</p>
        <h2>Cookies futuras</h2>
        <p>Las integraciones de analitica o publicidad se agregaran respetando la normativa aplicable y la informacion al usuario.</p>
      </GlassCard>
    </Section>
  );
}
