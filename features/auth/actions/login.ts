"use server";
import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import { createClient } from "@supabase/supabase-js";
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

  const adminClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      }
    }
  );

  const { data: profile, error: profileError } = await adminClient
    .from("profiles")
    .select("role,status,is_active")
    .eq("id", data.user.id)
    .single();

  if (profileError || !profile) {
    await supabase.auth.signOut();
    return { status: "error", message: "Error al verificar tu cuenta. Intentá de nuevo." };
  }

  if (profile.status !== "active" || !profile.is_active) {
    await supabase.auth.signOut();
    return { status: "error", message: "La cuenta no está activa. Contactá a AVM para revisar el acceso." };
  }

  await adminClient
    .from("profiles")
    .update({ last_login_at: new Date().toISOString() })
    .eq("id", data.user.id);

  if (profile.role === "admin" || profile.role === "superadmin") {
    redirect(redirectTo.startsWith("/admin") ? redirectTo : "/admin");
  }

  redirect(redirectTo);
}
