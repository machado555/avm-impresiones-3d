"use server";

import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AuthActionState } from "@/features/auth/actions/types";

export async function recoverPasswordAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const email = String(formData.get("email") ?? "").trim();

  if (!email) {
    return { status: "error", message: "Ingresa tu email." };
  }

  const supabase = await createSupabaseServerClient();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3001";
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${siteUrl}/login`
  });

  if (error) {
    return { status: "error", message: "No se pudo enviar el enlace de recuperacion." };
  }

  return { status: "success", message: "Te enviamos un enlace para recuperar tu password." };
}
