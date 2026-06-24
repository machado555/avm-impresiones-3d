import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";
import { MotionReveal } from "@/components/ui/motion-reveal";
import { Section } from "@/components/ui/section";
import { processSteps } from "@/lib/constants/mock-data";

export function CustomProcess() {
  return (
    <Section
      eyebrow="Servicio personalizado"
      title="Del boceto a la pieza final en tres pasos"
      description="Contanos tu idea y la hacemos realidad: archivos, medidas, material, color y presupuesto a medida."
    >
      <div className="grid gap-4 lg:grid-cols-[1fr_1fr_1fr_0.9fr]">
        {processSteps.map((step, index) => {
          const Icon = step.icon;

          return (
            <MotionReveal key={step.title} delay={index * 0.05}>
              <GlassCard className="h-full">
                <Icon className="text-cyan-200" size={26} />
                <p className="mt-5 text-xl font-semibold text-white">{step.title}</p>
                <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
              </GlassCard>
            </MotionReveal>
          );
        })}
        <MotionReveal delay={0.18}>
          <div className="flex h-full flex-col justify-between rounded-[8px] border border-cyan-300/25 bg-cyan-300/10 p-5">
            <p className="text-lg font-semibold text-white">Cotizacion express</p>
            <p className="mt-3 text-sm leading-6 text-slate-300">Ideal para piezas funcionales, regalos, repuestos, soportes, prototipos y pequenas series.</p>
            <ButtonLink href="/solicitar-diseno" className="mt-6 w-full">
              Iniciar solicitud
            </ButtonLink>
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
