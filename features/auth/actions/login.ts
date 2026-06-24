"use server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AuthActionState } from "@/features/auth/actions/types";
import { normalizeRedirectTo } from "@/features/auth/utils/redirects";

export async function loginAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = normalizeRedirectTo(formData.get("redirectTo"), "/panel");

  if (!email || !password) {
    return { status: "error", message: "Ingresa email y password." };
  }

  const supabase = await createSupabaseServerClient();

  const { data, error } = await supabase.auth.signInWithPassword({ email, password });

  if (error || !data.user) {
    return { status: "error", message: "Credenciales invalidas." };
  }

  // Leemos el perfil desde los metadatos del usuario en auth.users
  // o directamente desde data.user que ya tenemos sin necesitar otra query
  const userId = data.user.id;

  // Segundo cliente para leer perfil (las cookies ya están seteadas en este punto)
  const supabase2 = await createSupabaseServerClient();

  const { data: profile, error: profileError } = await supabase2
    .from("profiles")
    .select("role,status,is_active")
    .eq("id", userId)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    return { status: "error", message: `DEBUG: ${profileError?.message} | ${profileError?.code}` };
  }

  if (profile.status !== "active" || !profile.is_active) {
    await supabase.auth.signOut();
    return { status: "error", message: "La cuenta no está activa." };
  }

  await supabase2
    .from("profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", userId);

  if (profile.role === "admin" || profile.role === "superadmin") {
    redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
  }

  redirect(redirectTo);
}
