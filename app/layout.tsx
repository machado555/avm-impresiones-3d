import type { Metadata } from "next";
import type { ReactNode } from "react";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";
import { WhatsAppButton } from "@/components/layout/whatsapp-button";
import { CartDrawer } from "@/features/cart/components/cart-drawer";
import { GuestCartStorage } from "@/features/cart/components/guest-cart-storage";
import { AuthStoreSync } from "@/features/auth/components/auth-store-sync";
import { ToastProvider } from "@/components/ui/toast-provider";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001"),
  title: {
    default: "AVM — Digital Manufacturing",
    template: "%s | AVM"
  },
  description:
    "De la pantalla a tus manos. Fabricación digital, objetos tech y piezas a medida con precisión de ingeniería.",
  openGraph: {
    title: "AVM — Digital Manufacturing",
    description: "De la pantalla a tus manos.",
    type: "website",
    locale: "es_AR",
    images: [{ url: "/svg/avm-og-image.svg" }]
  },
  twitter: {
    card: "summary_large_image",
    images: ["/svg/avm-og-image.svg"]
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }]
  }
};

type RootLayoutProps = {
  children: ReactNode;
};

export default async function RootLayout({ children }: RootLayoutProps) {
  const user = await getCurrentProfile();

  return (
    <html lang="es">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
        <link rel="stylesheet" href="/css/avm-tokens.css" />
        <link rel="stylesheet" href="/css/avm-logo.css" />
      </head>
      <body>
        <AuthStoreSync user={user} />
        <ToastProvider>
          <SiteHeader />
          <main>{children}</main>
          <SiteFooter />
          <GuestCartStorage />
          <CartDrawer />
          <WhatsAppButton />
        </ToastProvider>
      </body>
    </html>
  );
}
