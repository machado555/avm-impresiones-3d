"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AuthActionState } from "@/features/auth/actions/types";

export async function registerAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const fullName = String(formData.get("fullName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const legalAccepted = formData.get("legalAccepted") === "on";

  if (!fullName || !email || !password) {
    return { status: "error", message: "Completa nombre, email y password." };
  }

  if (!legalAccepted) {
    return { status: "error", message: "Debes aceptar los terminos y la politica de privacidad." };
  }

  if (password.length < 8) {
    return { status: "error", message: "El password debe tener al menos 8 caracteres." };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName,
        phone,
        terms_accepted: true,
        privacy_accepted: true
      }
    }
  });

  if (error || !data.user) {
    return { status: "error", message: error?.message ?? "No se pudo crear la cuenta." };
  }

  if (data.session) {
    await supabase
      .from("profiles")
      .update({
        email,
        full_name: fullName,
        phone: phone || null,
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
        privacy_accepted: true,
        privacy_accepted_at: new Date().toISOString()
      })
      .eq("id", data.user.id);
  }

  redirect("/panel");
}
