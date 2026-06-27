"use client";

import { useState } from "react";
import { Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { ButtonLink } from "@/components/ui/button";
import { CartCount } from "@/features/cart/components/cart-count";
import { FavoritesCount } from "@/features/favorites/components/favorites-count";
import { siteConfig } from "@/lib/constants/site";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const mobileLinks = [
    ...siteConfig.navItems,
    { label: "Legal", href: "/terminos-y-condiciones" },
    { label: "Cotizar diseno", href: "/solicitar-diseno" },
    { label: "Panel", href: "/panel" },
    { label: "Favoritos", href: "/favoritos" }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050712]/80 backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="avm-logo" aria-label="Ir al inicio">
          <img src="/svg/avm-isotipo-color.svg" width="36" height="36" alt="AVM" loading="eager" />
          <div className="avm-logo__text">
            <span className="avm-logo__wordmark">AVM</span>
            <span className="avm-logo__tagline">Digital Manufacturing</span>
          </div>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {siteConfig.navItems.map((item) => (
            <Link key={item.href} href={item.href} className="cursor-pointer rounded-full px-4 py-2 text-sm text-white transition hover:bg-white/10 hover:text-[var(--avm-blue)]">
              {item.label}
            </Link>
          ))}
          <Link href="/terminos-y-condiciones" className="cursor-pointer rounded-full px-4 py-2 text-sm text-white transition hover:bg-white/10 hover:text-[var(--avm-blue)]">
            Legal
          </Link>
        </div>

        <div className="flex items-center gap-2">
          <Link href="/panel" className="cursor-pointer rounded-full p-2 text-white transition hover:bg-white/10 hover:text-[var(--avm-blue)]" aria-label="Panel de usuario">
            <UserRound size={20} />
          </Link>
          <Link href="/favoritos" className="cursor-pointer rounded-full p-2 text-white transition hover:bg-white/10 hover:text-[var(--avm-blue)]" aria-label="Ver favoritos">
            <FavoritesCount />
          </Link>
          <span className="rounded-full p-2 text-white transition hover:bg-white/10 hover:text-[var(--avm-blue)]">
            <CartCount />
          </span>
          <ButtonLink href="/solicitar-diseno" className="hidden sm:inline-flex">
            Cotizar diseno
          </ButtonLink>
          <button
            className="cursor-pointer rounded-full p-2 text-white transition hover:bg-white/10 hover:text-[var(--avm-blue)] lg:hidden"
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/10 lg:hidden">
          <div className="glass mx-4 mb-4 mt-2 overflow-hidden rounded-[12px] border border-white/15">
            {mobileLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="flex cursor-pointer px-5 py-4 text-sm text-white transition hover:bg-white/[0.06] hover:text-[var(--avm-blue)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
