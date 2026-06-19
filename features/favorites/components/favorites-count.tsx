"use client";

import { Heart } from "lucide-react";
import { favoritesStore } from "@/lib/stores/favorites-store";
import { useStore } from "@/lib/stores/use-store";

export function FavoritesCount() {
  const count = useStore(favoritesStore, (state) => state.productIds.length);

  return (
    <span className="relative inline-flex">
      <Heart size={20} />
      {count > 0 && (
        <span className="absolute -right-2 -top-2 grid h-4 min-w-4 place-items-center rounded-full bg-cyan-300 px-1 text-[10px] font-bold text-slate-950">
          {count}
        </span>
      )}
    </span>
  );
}
