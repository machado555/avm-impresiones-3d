import { getCurrentProfile } from "@/features/auth/data/get-current-profile";

export async function getCurrentUser() {
  return getCurrentProfile();
}
