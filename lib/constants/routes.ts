import type { AdminPermission } from "@/types/admin";

export const publicRoutes = [
  "/",
  "/productos",
  "/categorias",
  "/blog",
  "/carrito",
  "/servicios",
  "/contacto",
  "/solicitar-diseno"
] as const;

export const authRoutes = ["/login", "/registro", "/recuperar-password"] as const;

export const accountRoutes = ["/panel", "/pedidos", "/puntos", "/favoritos", "/solicitudes", "/perfil"] as const;

export const adminRoutes = [
  "/admin",
  "/admin/productos",
  "/admin/categorias",
  "/admin/pedidos",
  "/admin/solicitudes",
  "/admin/materiales",
  "/admin/recompensas",
  "/admin/usuarios",
  "/admin/blog",
  "/admin/logs"
] as const;

export const routeCapabilities: Record<string, AdminPermission[]> = {
  "/admin": ["admin:access"],
  "/admin/productos": ["products:manage"],
  "/admin/categorias": ["categories:manage"],
  "/admin/pedidos": ["orders:manage"],
  "/admin/solicitudes": ["requests:manage"],
  "/admin/materiales": ["materials:manage"],
  "/admin/recompensas": ["rewards:manage"],
  "/admin/blog": ["blog:manage"],
  "/admin/logs": ["logs:read"],
  "/admin/usuarios": ["users:manage"]
};
