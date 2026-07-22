"use client";

import { useState } from "react";
import { Menu, UserRound, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, ButtonLink } from "@/components/ui/button";
import { CartCount } from "@/features/cart/components/cart-count";
import { FavoritesCount } from "@/features/favorites/components/favorites-count";
import { siteConfig } from "@/lib/constants/site";

export function SiteHeader() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  const mobileLinks = [
    ...siteConfig.navItems,
    { label: "Legal", href: "/terminos-y-condiciones" },
    { label: "Cotizar diseno", href: "/solicitar-diseno" },
    { label: "Panel", href: "/panel" },
    { label: "Favoritos", href: "/favoritos" }
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-40 w-full overflow-x-hidden border-b border-white/[0.04] bg-[#050712]/75 shadow-[0_1px_0_rgba(255,255,255,0.02)] backdrop-blur-2xl">
      <nav className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="avm-logo" aria-label="Ir al inicio">
          <img src="/svg/avm-isotipo-color.svg" width="36" height="36" alt="AVM" loading="eager" />
          <div className="avm-logo__text hidden sm:block">
            <span className="avm-logo__wordmark">AVM</span>
            <span className="avm-logo__tagline">Digital Manufacturing</span>
          </div>
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {siteConfig.navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={isActive(item.href) ? "nav-link nav-link--active" : "nav-link"}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/terminos-y-condiciones"
            className={isActive("/terminos-y-condiciones") ? "nav-link nav-link--active" : "nav-link"}
          >
            Legal
          </Link>
        </div>

        <div className="flex items-center gap-1 sm:gap-0.5">
          <ButtonLink href="/panel" variant="ghost" icon aria-label="Panel de usuario">
            <UserRound size={18} />
          </ButtonLink>
          <ButtonLink href="/favoritos" variant="ghost" icon aria-label="Ver favoritos">
            <FavoritesCount />
          </ButtonLink>
          <CartCount />
          <span className="hidden md:inline-flex">
            <ButtonLink href="/solicitar-diseno" size="sm">
              Cotizar diseno
            </ButtonLink>
          </span>
          <Button
            type="button"
            variant="ghost"
            icon
            className="md:hidden"
            aria-label={mobileOpen ? "Cerrar menu" : "Abrir menu"}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={18} /> : <Menu size={18} />}
          </Button>
        </div>
      </nav>

      {mobileOpen && (
        <div className="border-t border-white/[0.04] md:hidden">
          <div className="mx-4 mb-4 mt-2 overflow-hidden rounded-[var(--avm-radius-lg)] border border-white/[0.06] bg-[rgba(255,255,255,0.03)] backdrop-blur-2xl">
            {mobileLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="nav-link flex w-full rounded-none border-b border-white/[0.03] px-5 py-4 last:border-b-0"
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
