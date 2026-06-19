import { redirect } from "next/navigation";
import { getCurrentProfile } from "@/features/auth/data/get-current-profile";
import { isAuthenticated } from "@/lib/security/auth";

export async function requireAuth(redirectTo = "/panel") {
  const user = await getCurrentProfile();

  if (!isAuthenticated(user)) {
    redirect(`/login?redirectTo=${encodeURIComponent(redirectTo)}`);
  }

  return user;
}
