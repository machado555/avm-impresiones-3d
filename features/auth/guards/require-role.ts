import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { canAccessCapability, canAccessRole } from "@/lib/security/auth";
import type { AdminPermission } from "@/types/admin";
import type { AuthUser, UserRole } from "@/types/auth";

export async function requireRole(minimumRole: UserRole, redirectTo = "/no-autorizado"): Promise<AuthUser> {
  const user = await getCurrentProfile();

  if (!user || !canAccessRole(user, minimumRole)) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireCapability(permission: AdminPermission, redirectTo = "/no-autorizado"): Promise<AuthUser> {
  const user = await getCurrentProfile();

  if (!user || !canAccessCapability(user, permission)) {
    redirect(redirectTo);
  }

  return user;
}
