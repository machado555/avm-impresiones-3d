import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Politica de Privacidad"
};

export default function PrivacyPage() {
  return (
    <Section eyebrow="Legal" title="Politica de Privacidad" description="Uso y proteccion de datos personales.">
      <GlassCard className="prose prose-invert max-w-none text-slate-300">
        <p>AVM-Impresiones 3D recopila datos necesarios para gestionar cuentas, pedidos, solicitudes personalizadas, cotizaciones y comunicaciones relacionadas con el servicio.</p>
        <p>La informacion se utiliza exclusivamente para operar la tienda, responder consultas, procesar solicitudes y mejorar la experiencia del usuario.</p>
        <h2>Datos recopilados</h2>
        <p>Podemos solicitar nombre, email, telefono, archivos de referencia, datos de pedido y preferencias necesarias para prestar el servicio.</p>
        <h2>Proveedor tecnologico</h2>
        <p>La plataforma esta preparada para utilizar Supabase como proveedor de autenticacion, base de datos y almacenamiento.</p>
        <h2>Derechos del usuario</h2>
        <p>El usuario puede solicitar revision, actualizacion o eliminacion de sus datos mediante los canales de contacto publicados.</p>
      </GlassCard>
    </Section>
  );
}
