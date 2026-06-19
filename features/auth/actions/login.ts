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
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
  });

  if (error || !data.user) {
    return { status: "error", message: "Credenciales invalidas." };
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("role,status,is_active")
    .eq("id", data.user.id)
    .single();

  if (!profile || profile.status !== "active" || !profile.is_active) {
    await supabase.auth.signOut();
    return { status: "error", message: "La cuenta no esta activa." };
  }

  await supabase.from("profiles").update({ last_login_at: new Date().toISOString() }).eq("id", data.user.id);

  if (profile.role === "admin" || profile.role === "superadmin") {
    redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
  }

  redirect(redirectTo);
}
