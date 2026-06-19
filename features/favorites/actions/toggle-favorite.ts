"use server";

import { addFavorite } from "@/features/favorites/actions/add-favorite";
import { removeFavorite } from "@/features/favorites/actions/remove-favorite";
import { isFavorite } from "@/features/favorites/data/is-favorite";

export async function toggleFavorite(productId: string) {
  const current = await isFavorite(productId);
  return current ? removeFavorite(productId) : addFavorite(productId);
}
