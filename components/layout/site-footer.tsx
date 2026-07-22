import Link from "next/link";
import { siteConfig } from "@/lib/constants/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/[0.04] bg-black/20">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-4 py-16 sm:px-6 md:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <Link href="/" className="avm-logo avm-logo--sm" aria-label="Ir al inicio">
            <img src="/svg/avm-isotipo-color.svg" width="24" height="24" alt="AVM" />
            <span className="avm-logo__wordmark text-lg">AVM</span>
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[var(--avm-muted)]">
            Tienda online premium para impresion 3D, productos tech y soluciones personalizadas con foco en calidad, velocidad y detalle.
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">Explorar</p>
          <div className="mt-4 grid gap-2.5 text-sm text-[var(--avm-muted)]">
            {siteConfig.navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition-colors hover:text-white">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">Cuenta</p>
          <div className="mt-4 grid gap-2.5 text-sm text-[var(--avm-muted)]">
            <Link href="/login" className="transition-colors hover:text-white">Iniciar sesion</Link>
            <Link href="/registro" className="transition-colors hover:text-white">Crear cuenta</Link>
            <Link href="/panel" className="transition-colors hover:text-white">Panel de usuario</Link>
          </div>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.12em] text-white/50">Legal</p>
          <div className="mt-4 grid gap-2.5 text-sm text-[var(--avm-muted)]">
            <Link href="/terminos-y-condiciones" className="transition-colors hover:text-white">Terminos y Condiciones</Link>
            <Link href="/politica-de-privacidad" className="transition-colors hover:text-white">Politica de Privacidad</Link>
            <Link href="/politica-de-cookies" className="transition-colors hover:text-white">Politica de Cookies</Link>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        &copy; 2026 AVM - Todos los derechos reservados.
      </div>
    </footer>
  );
}
