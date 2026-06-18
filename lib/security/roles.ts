import type { AdminPermission } from "@/types/admin";
import type { UserRole } from "@/types/auth";

export const roleHierarchy: Record<UserRole, number> = {
  guest: 0,
  customer: 1,
  moderator: 2,
  admin: 3,
  superadmin: 4
};

export const rolePermissions: Record<UserRole, AdminPermission[]> = {
  guest: [],
  customer: [],
  moderator: ["admin:access", "orders:manage", "requests:manage", "blog:manage", "logs:read"],
  admin: [
    "admin:access",
    "products:manage",
    "categories:manage",
    "orders:manage",
    "requests:manage",
    "materials:manage",
    "rewards:manage",
    "blog:manage",
    "logs:read"
  ],
  superadmin: [
    "admin:access",
    "products:manage",
    "categories:manage",
    "orders:manage",
    "requests:manage",
    "materials:manage",
    "rewards:manage",
    "blog:manage",
    "users:manage",
    "logs:read"
  ]
};

export function hasRole(currentRole: UserRole, minimumRole: UserRole) {
  return roleHierarchy[currentRole] >= roleHierarchy[minimumRole];
}

export function can(currentRole: UserRole, permission: AdminPermission) {
  return rolePermissions[currentRole].includes(permission);
}

export function canAny(currentRole: UserRole, permissions: AdminPermission[]) {
  return permissions.some((permission) => can(currentRole, permission));
}
