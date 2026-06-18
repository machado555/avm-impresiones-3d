import { ArrowRight, Box, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { MotionReveal } from "@/components/ui/motion-reveal";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      <div className="mesh-grid absolute inset-0 opacity-70" />
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <MotionReveal>
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-cyan-300/25 bg-cyan-300/10 px-4 py-2 text-sm font-medium text-cyan-100">
              <Sparkles size={16} />
              Fabricacion digital, objetos tech y piezas a medida
            </div>
            <h1 className="max-w-4xl text-5xl font-semibold leading-[1.02] text-white sm:text-6xl lg:text-7xl">
              AVM-Impresiones 3D
              <span className="block text-gradient">tecnologia hecha tangible.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300">
              Una tienda online premium para comprar impresiones 3D, electronica, pequenos electrodomesticos y solicitar disenos personalizados con experiencia rapida, clara y futurista.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="/productos">
                Ver catalogo <ArrowRight size={18} />
              </ButtonLink>
              <ButtonLink href="/solicitar-diseno" variant="secondary">
                Solicitar pieza personalizada
              </ButtonLink>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <div className="relative min-h-[420px]">
            <div className="absolute inset-4 rounded-full bg-cyan-400/20 blur-3xl" />
            <div className="glass relative mx-auto grid aspect-square max-w-[520px] place-items-center rounded-[8px] p-8">
              <div className="absolute left-6 top-6 rounded-full border border-cyan-300/30 px-3 py-1 text-xs text-cyan-100">PLA+ / PETG / Resina</div>
              <div className="absolute bottom-6 right-6 rounded-full border border-violet-300/30 px-3 py-1 text-xs text-violet-100">Rewards + puntos</div>
              <div className="relative grid h-64 w-64 place-items-center rounded-[8px] border border-white/15 bg-gradient-to-br from-white/16 to-white/5 shadow-[inset_0_0_50px_rgba(255,255,255,0.05)]">
                <Box className="text-cyan-200 drop-shadow-[0_0_28px_rgba(56,245,255,0.7)]" size={132} strokeWidth={1.2} />
              </div>
            </div>
          </div>
        </MotionReveal>
      </div>
    </section>
  );
}
