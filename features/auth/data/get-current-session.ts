import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function getCurrentSession() {
  const supabase = await createSupabaseServerClient();
  const {
    data: { session },
    error
  } = await supabase.auth.getSession();

  if (error) {
    return null;
  }

  return session;
}
