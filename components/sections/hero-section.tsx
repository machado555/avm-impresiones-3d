import { Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { MotionReveal } from "@/components/ui/motion-reveal";

export function HeroSection() {
  return (
    <section className="hero avm-hero-fold relative overflow-hidden">
      <div className="mesh-grid absolute inset-0 opacity-70" />
      <div className="avm-grid-cad absolute inset-0 opacity-50" />
      <div className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-10 px-5 pb-14 pt-20 sm:px-6 md:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <MotionReveal>
          <div>
            <div className="avm-badge mb-6">
              <Sparkles size={14} />
              AVM - Digital Manufacturing
            </div>
            <h1 className="hero-heading">
              De la pantalla<br />a tus manos.
            </h1>
            <p className="hero-description mt-6">
              Impresiones 3D en PLA+, PETG y resina. Diseno CAD personalizado. Electronica y automatizacion. Todo desde un solo lugar, con tiempos reales y sin intermediarios.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/productos" size="lg">
                Ver catalogo
              </ButtonLink>
              <ButtonLink href="/solicitar-diseno" variant="secondary" size="lg">
                Solicitar pieza personalizada
              </ButtonLink>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <div className="hero-video-panel avm-corner-tl avm-corner-br relative h-full w-full">
            <div className="avm-badge hero-video-badge">
              PLA+ / PETG / Resina
            </div>
            <video
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="hero-video"
            >
              <source src="/videos/hero-3d-print.webm" type="video/webm" />
              <source src="/videos/hero-3d-print.mp4" type="video/mp4" />
            </video>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
