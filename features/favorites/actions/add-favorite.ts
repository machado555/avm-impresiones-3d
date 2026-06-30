"use server";

import { revalidatePath } from "next/cache";
import { requireAuth } from "@/features/auth/guards/require-auth";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function addFavorite(productId: string) {
  const user = await requireAuth("/favoritos");
  const supabase = await createSupabaseServerClient();
  const { data: product } = await supabase.from("products").select("id,status").eq("id", productId).eq("status", "active").single();

  if (!product) {
    return { ok: false, message: "Producto no disponible." };
  }

  const { error } = await supabase.from("favorites").upsert({
    user_id: user.id,
    product_id: productId,
    updated_at: new Date().toISOString()
  }, { onConflict: 'user_id,product_id' });

  revalidatePath("/favoritos");
  return { ok: !error, message: error ? "No se pudo agregar favorito." : "Agregado a favoritos." };
}
