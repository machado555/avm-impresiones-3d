"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function removeFavorite(productId: string) {
  const user = await requireAuth("/favoritos");
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.from("favorites").delete().eq("user_id", user.id).eq("product_id", productId);

  revalidatePath("/favoritos");
  return { ok: !error, message: error ? "No se pudo quitar favorito." : "Quitado de favoritos." };
}
