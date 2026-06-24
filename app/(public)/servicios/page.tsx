import { CustomProcess } from "@/components/sections/custom-process";
import { GlassCard } from "@/components/ui/glass-card";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Servicios",
  description: "Servicios de diseno e impresion 3D personalizados."
};

export default function ServicesPage() {
  return (
    <>
      <Section
        eyebrow="Servicios"
        title="Diseno, prototipado e impresion 3D para proyectos reales"
        description="Desde una pieza unica hasta series cortas: te ayudamos a hacer realidad tu proyecto."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {["Modelado 3D", "Impresion bajo demanda", "Prototipos y series cortas"].map((service) => (
            <GlassCard key={service}>
              <h2 className="text-xl font-semibold text-white">{service}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Servicio profesional con materiales de calidad, tiempos de entrega claros y terminaciones premium.
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>
      <CustomProcess />
    </>
  );
}
