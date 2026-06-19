import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { isAuthenticated } from "@/lib/security/auth";
import type { AuthUser } from "@/types/auth";

export async function requireAuth(redirectTo = "/panel"): Promise<AuthUser> {
  const user = await getCurrentProfile();

  if (!user || !isAuthenticated(user)) {
    redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return user;
}
