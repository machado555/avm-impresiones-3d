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

  const userId = data.user.id;

  // DEBUG TEMPORAL - borrar después
  if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return { status: "error", message: "DEBUG: SERVICE_ROLE_KEY is undefined" };
  }
  return { status: "error", message: `DEBUG: key starts with ${process.env.SUPABASE_SERVICE_ROLE_KEY.substring(0, 10)}` };
}
