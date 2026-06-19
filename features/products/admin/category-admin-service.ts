"use server";

import { requireCapability } from "@/features/auth/guards/require-role";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type CategoryPayload = {
  parent_id?: string | null;
  name: string;
  slug: string;
  description?: string | null;
  image_url?: string | null;
  sort_order?: number;
  is_active?: boolean;
};

export async function createCategory(payload: CategoryPayload) {
  await requireCapability("categories:manage");
  const supabase = await createSupabaseServerClient();
  return supabase.from("categories").insert(payload).select().single();
}

export async function updateCategory(id: string, payload: Partial<CategoryPayload>) {
  await requireCapability("categories:manage");
  const supabase = await createSupabaseServerClient();
  return supabase.from("categories").update(payload).eq("id", id).select().single();
}

export async function deleteCategory(id: string) {
  await requireCapability("categories:manage");
  const supabase = await createSupabaseServerClient();
  return supabase.from("categories").update({ is_active: false }).eq("id", id);
}
