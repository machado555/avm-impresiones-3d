import type { AdminPermission } from "@/types/admin";
import type { AuthUser, UserRole } from "@/types/auth";
import { can, canAny, hasRole } from "@/lib/security/roles";

export function isAuthenticated(user: AuthUser | null): user is AuthUser {
  return Boolean(user && user.status === "active" && user.isActive);
}

export function canAccessRole(user: AuthUser | null, minimumRole: UserRole) {
  if (!isAuthenticated(user)) {
    return false;
  }
  return hasRole(user.role, minimumRole);
}

export function canAccessCapability(user: AuthUser | null, permission: AdminPermission) {
  if (!isAuthenticated(user)) {
    return false;
  }
  return can(user.role, permission);
}

export function canAccessAnyCapability(user: AuthUser | null, permissions: AdminPermission[]) {
  if (!isAuthenticated(user)) {
    return false;
  }
  return canAny(user.role, permissions);
}
