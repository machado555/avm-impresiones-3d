import { Heart, Menu, UserRound } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { CartCount } from "@/features/cart/components/cart-count";
import { FavoritesCount } from "@/features/favorites/components/favorites-count";
import { siteConfig } from "@/lib/constants/site";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050712]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label="Ir al inicio">
          <span className="grid h-9 w-9 place-items-center rounded-[8px] bg-gradient-to-br from-cyan-300 to-violet-500 text-sm font-black text-slate-950">
            AVM
          </span>
          <span className="hidden text-sm font-semibold text-white sm:inline">{siteConfig.name}</span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
              {item.label}
            </Link>
          ))}
          <Link href="/terminos-y-condiciones" className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
            Legal
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/panel" className="hidden rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white sm:inline-flex" aria-label="Panel de usuario">
            <UserRound size={20} />
          </Link>
          <Link href="/favoritos" className="hidden rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white sm:inline-flex" aria-label="Ver favoritos">
            <span className="hidden"><Heart size={20} /></span>
            <FavoritesCount />
          </Link>
          <span className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white">
            <CartCount />
          </span>
          <ButtonLink href="/solicitar-diseno" className="hidden sm:inline-flex">
            Cotizar diseno
          </ButtonLink>
          <Link href="/terminos-y-condiciones" className="rounded-full px-3 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden">
            Legal
          </Link>
          <button className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white lg:hidden" aria-label="Abrir menu">
            <Menu size={22} />
          </button>
        </div>
      </nav>
    </header>
  );
}
