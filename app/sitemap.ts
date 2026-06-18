import type { MetadataRoute } from "next";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/productos",
    "/categorias",
    "/servicios",
    "/solicitar-diseno",
    "/blog",
    "/contacto",
    "/terminos-y-condiciones",
    "/politica-de-privacidad",
    "/politica-de-cookies"
  ];

  return routes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" ? ("weekly" as const) : ("monthly" as const),
    priority: route === "" ? 1 : 0.8
  }));
}
