export const siteConfig = {
  name: "AVM-Impresiones 3D",
  tagline: "Impresion 3D, electronica y diseno personalizado",
  whatsappNumber: process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "5491100000000",
  navItems: [
    { label: "Productos", href: "/productos" },
    { label: "Categorias", href: "/categorias" },
    { label: "Servicios", href: "/servicios" },
    { label: "Blog", href: "/blog" },
    { label: "Contacto", href: "/contacto" }
  ]
};
