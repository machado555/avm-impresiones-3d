import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Terminos y Condiciones"
};

export default function TermsPage() {
  return (
    <Section eyebrow="Legal" title="Terminos y Condiciones" description="Condiciones generales de uso, compra y solicitudes personalizadas.">
      <GlassCard className="prose prose-invert max-w-none text-slate-300">
        <p>Estos Terminos y Condiciones regulan el uso de AVM-Impresiones 3D, la compra de productos, la solicitud de servicios personalizados y la carga de archivos para cotizacion o fabricacion.</p>
        <p>Al utilizar el sitio, el usuario acepta brindar informacion veraz, respetar derechos de terceros y utilizar la plataforma de forma licita.</p>
        <h2>Compras y disponibilidad</h2>
        <p>Los precios, productos, variantes y disponibilidad pueden modificarse. La confirmacion final queda sujeta a validacion de stock, pago y condiciones operativas.</p>
        <h2>Solicitudes personalizadas</h2>
        <p>Las cotizaciones de impresion 3D son estimativas hasta su aprobacion final. AVM-Impresiones 3D puede rechazar solicitudes que vulneren derechos de terceros o resulten tecnicamente inviables.</p>
        <h2>Archivos enviados</h2>
        <p>El usuario declara tener derechos suficientes sobre los archivos enviados y autoriza su uso exclusivo para cotizar y fabricar la pieza solicitada.</p>
      </GlassCard>
    </Section>
  );
}
