import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { GuestCartStorage } from "@/features/cart/components/guest-cart-storage";
import { AuthStoreSync } from "@/features/auth/components/auth-store-sync";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: {
    default: "AVM-Impresiones 3D",
    template: "%s | AVM-Impresiones 3D"
  },
  description:
    "Tienda online futurista para impresiones 3D, electronica, pequenos electrodomesticos y servicios personalizados.",
  openGraph: {
    title: "AVM-Impresiones 3D",
    description: "Impresion 3D, tecnologia y diseno personalizado con experiencia premium.",
    type: "website",
    locale: "es_AR"
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getCurrentProfile();

  return (
    <html lang="es">
      <body>
        <AuthStoreSync user={user} />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
        <GuestCartStorage />
        <CartDrawer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
