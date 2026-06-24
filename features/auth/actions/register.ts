"use server";

import { redirect } from "next/navigation";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { AuthActionState } from "@/features/auth/actions/types";

export async function registerAction(_state: AuthActionState, formData: FormData): Promise<AuthActionState> {
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const fullName = `${firstName} ${lastName}`.trim();
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();
  const termsAccepted = formData.get("termsAccepted") === "on";

  if (!firstName || !lastName || !email || !password) {
    return { status: "error", message: "Completa nombre, apellido, email y password." };
  }

  if (!termsAccepted) {
    return { status: "error", message: "Debes aceptar los terminos y condiciones." };
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
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        phone,
        address,
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
        first_name: firstName,
        last_name: lastName,
        full_name: fullName,
        phone: phone || null,
        address: address || null,
        terms_accepted: true,
        terms_accepted_at: new Date().toISOString(),
        privacy_accepted: true,
        privacy_accepted_at: new Date().toISOString()
      })
      .eq("id", data.user.id);
  }

  redirect("/panel");
}
