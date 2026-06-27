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
                <div className="avm-card__icon bg-[var(--avm-blue)]/10 text-[var(--avm-blue)]">
                  <Icon size={20} />
                </div>
                <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--avm-muted)]">{step.description}</p>
              </GlassCard>
            </MotionReveal>
          );
        })}
        <MotionReveal delay={0.18}>
          <div className="flex h-full flex-col justify-between rounded-[8px] border border-[var(--avm-blue)]/20 bg-[var(--avm-blue)]/8 p-6 backdrop-blur-[8px]">
            <div>
              <p className="text-lg font-semibold text-white">Cotización express</p>
              <p className="mt-2 text-sm leading-6 text-[var(--avm-muted)]">Ideal para piezas funcionales, regalos, repuestos, soportes, prototipos y pequeñas series.</p>
            </div>
            <ButtonLink href="/solicitar-diseno" variant="primary" full className="mt-6">
              Iniciar solicitud
            </ButtonLink>
          </div>
        </MotionReveal>
      </div>
    </Section>
  );
}
