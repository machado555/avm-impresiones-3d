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
        description="Pagina orientada a conversion B2C y B2B: regalos, repuestos, piezas funcionales, prototipos y pequenas series."
      >
        <div className="grid gap-4 md:grid-cols-3">
          {["Modelado 3D", "Impresion bajo demanda", "Prototipos y series cortas"].map((service) => (
            <GlassCard key={service}>
              <h2 className="text-xl font-semibold text-white">{service}</h2>
              <p className="mt-4 text-sm leading-6 text-slate-400">
                Bloque preparado para detallar alcance, tiempos, materiales, terminaciones y casos de uso.
              </p>
            </GlassCard>
          ))}
        </div>
      </Section>
      <CustomProcess />
    </>
  );
}
