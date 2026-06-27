import { Sparkles } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { MotionReveal } from "@/components/ui/motion-reveal";

export function HeroSection() {
  return (
    <section className="hero relative overflow-hidden">
      <div className="mesh-grid absolute inset-0 opacity-70" />
      <div className="hero-glow absolute inset-0 pointer-events-none" />
      <div className="mx-auto grid min-h-[calc(100svh-4rem)] w-full max-w-7xl items-center gap-10 px-5 pb-14 pt-20 sm:px-6 md:pt-28 lg:grid-cols-[1.05fr_0.95fr] lg:px-8">
        <MotionReveal>
          <div>
            <div className="avm-label mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--avm-blue)]/25 bg-[var(--avm-blue)]/10 px-4 py-2 text-sm font-medium">
              <Sparkles size={16} />
              AVM — Digital Manufacturing
            </div>
            <h1 className="hero-heading">
              De la pan<span className="highlight">tall</span>a<br />
              a tus ma<span className="highlight">nos</span>.
            </h1>
            <p className="hero-description mt-6">
              Impresiones 3D en PLA+, PETG y resina. Diseño CAD personalizado. Electrónica y automatización. Todo desde un solo lugar, con tiempos reales y sin intermediarios.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/productos"
                className="avm-btn-primary"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  background: 'var(--avm-blue)',
                  color: 'var(--avm-bg)',
                  fontFamily: 'var(--avm-font-display)',
                  fontSize: '14px',
                  fontWeight: 600,
                  letterSpacing: '0.05em',
                  padding: '12px 24px',
                  borderRadius: '6px',
                  textDecoration: 'none',
                  cursor: 'pointer',
                }}
              >
                Ver catálogo →
              </Link>
              <ButtonLink href="/solicitar-diseno" variant="secondary">
                Solicitar pieza personalizada
              </ButtonLink>
            </div>
          </div>
        </MotionReveal>

        <MotionReveal delay={0.12}>
          <div className="hero-video-panel relative w-full h-full rounded-xl overflow-hidden" style={{ minHeight: '420px' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(135deg, rgba(8,12,20,0.45) 0%, rgba(8,12,20,0.15) 100%)',
                zIndex: 1,
                borderRadius: 'inherit',
              }}
            />
            <div
              style={{
                position: 'absolute',
                top: '20px',
                left: '20px',
                zIndex: 2,
                background: 'rgba(8,12,20,0.75)',
                backdropFilter: 'blur(8px)',
                border: '1px solid rgba(255,255,255,0.1)',
                borderRadius: '999px',
                padding: '6px 16px',
                fontSize: '12px',
                fontFamily: 'var(--avm-font-display)',
                letterSpacing: '0.08em',
                color: 'rgba(255,255,255,0.75)',
              }}
            >
              PLA+ / PETG / Resina
            </div>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: 'inherit',
              }}
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
