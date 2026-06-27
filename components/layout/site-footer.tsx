import Link from "next/link";
import { siteConfig } from "@/lib/constants/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-white/10 bg-black/20">
      <div className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr_1fr] lg:px-8">
        <div>
          <a href="/" className="avm-logo avm-logo--sm">
            <img src="/svg/avm-isotipo-color.svg" width="24" height="24" alt="AVM" />
            <span className="avm-logo__wordmark" style={{ fontSize: 18 }}>AVM</span>
          </a>
          <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
            Tienda online premium para impresion 3D, productos tech y soluciones personalizadas con foco en calidad, velocidad y detalle.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Explorar</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            {siteConfig.navItems.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-cyan-300">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Cuenta</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/login" className="transition hover:text-cyan-300">Iniciar sesion</Link>
            <Link href="/registro" className="transition hover:text-cyan-300">Crear cuenta</Link>
            <Link href="/panel" className="transition hover:text-cyan-300">Panel de usuario</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">Legal</p>
          <div className="mt-3 grid gap-2 text-sm text-slate-400">
            <Link href="/terminos-y-condiciones" className="transition hover:text-cyan-300">Terminos y Condiciones</Link>
            <Link href="/politica-de-privacidad" className="transition hover:text-cyan-300">Politica de Privacidad</Link>
            <Link href="/politica-de-cookies" className="transition hover:text-cyan-300">Politica de Cookies</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
