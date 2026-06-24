import { createSupabaseServerClient } from "@/lib/supabase/server";
import { mapProfileToAuthUser } from "@/features/auth/data/map-profile";

export async function getCurrentProfile() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return null;
  }

  const { data: profile, error } = await supabase
    .from("profiles")
    .select("id,email,full_name,first_name,last_name,phone,address,avatar_url,role,status,points_balance,is_active,last_login_at")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    return null;
  }

  return mapProfileToAuthUser(profile);
}
