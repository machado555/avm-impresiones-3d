import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { canAccessCapability, canAccessRole } from "@/lib/security/auth";
import type { AdminPermission } from "@/types/admin";
import type { UserRole } from "@/types/auth";

export async function requireRole(minimumRole: UserRole, redirectTo = "/no-autorizado") {
  const user = await getCurrentProfile();

  if (!canAccessRole(user, minimumRole)) {
    redirect(redirectTo);
  }

  return user;
}

export async function requireCapability(permission: AdminPermission, redirectTo = "/no-autorizado") {
  const user = await getCurrentProfile();

  if (!canAccessCapability(user, permission)) {
    redirect(redirectTo);
  }

  return user;
}
