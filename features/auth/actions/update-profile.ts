"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export type UpdateProfileState = {
  ok: boolean;
  message: string;
};

export async function updateProfile(_prevState: UpdateProfileState, formData: FormData): Promise<UpdateProfileState> {
  const user = await requireAuth("/perfil");

  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const phone = String(formData.get("phone") ?? "").trim();
  const address = String(formData.get("address") ?? "").trim();

  if (!firstName || !lastName) {
    return { ok: false, message: "Nombre y apellido son obligatorios." };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase
    .from("profiles")
    .update({
      first_name: firstName,
      last_name: lastName,
      full_name: `${firstName} ${lastName}`.trim(),
      phone: phone || null,
      address: address || null
    })
    .eq("id", user.id);

  if (error) {
    return { ok: false, message: "No se pudo actualizar el perfil." };
  }

  revalidatePath("/perfil");
  return { ok: true, message: "Perfil actualizado correctamente." };
}
