import type { AdminPermission } from "@/types/admin";

export const adminNavItems: Array<{
  label: string;
  href: string;
  permission: AdminPermission;
}> = [
  { label: "Dashboard", href: "/admin", permission: "admin:access" },
  { label: "Productos", href: "/admin/productos", permission: "products:manage" },
  { label: "Categorias", href: "/admin/categorias", permission: "categories:manage" },
  { label: "Pedidos", href: "/admin/pedidos", permission: "orders:manage" },
  { label: "Solicitudes", href: "/admin/solicitudes", permission: "requests:manage" },
  { label: "Materiales", href: "/admin/materiales", permission: "materials:manage" },
  { label: "Recompensas", href: "/admin/recompensas", permission: "rewards:manage" },
  { label: "Blog", href: "/admin/blog", permission: "blog:manage" },
  { label: "Apariencia", href: "/admin/apariencia", permission: "cms:manage" },
  { label: "Usuarios", href: "/admin/usuarios", permission: "users:manage" },
  { label: "Logs", href: "/admin/logs", permission: "logs:read" }
];
