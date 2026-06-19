"use client";

import { useState, useTransition } from "react";
import { Heart } from "lucide-react";
import { toggleFavoriteProductId } from "@/lib/stores/favorites-store";
import { toggleFavorite } from "@/features/favorites/actions/toggle-favorite";
import { cn } from "@/lib/utils/cn";

type FavoriteButtonProps = {
  productId: string;
  initialIsFavorite?: boolean;
  isAuthenticated?: boolean;
};

export function FavoriteButton({ productId, initialIsFavorite = false, isAuthenticated = false }: FavoriteButtonProps) {
  const [isFavorite, setIsFavorite] = useState(initialIsFavorite);
  const [isPending, startTransition] = useTransition();

  function handleClick() {
    if (!isAuthenticated) {
      window.location.href = `/login?redirectTo=${encodeURIComponent(window.location.pathname)}`;
      return;
    }

    startTransition(async () => {
      const result = await toggleFavorite(productId);
      if (result.ok) {
        setIsFavorite((current) => {
          const next = !current;
          toggleFavoriteProductId(productId, next);
          return next;
        });
      }
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      className={cn(
        "inline-grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-black/30 text-slate-300 transition hover:text-cyan-200",
        isFavorite && "text-red-300"
      )}
      aria-label={isFavorite ? "Quitar de favoritos" : "Agregar a favoritos"}
    >
      <Heart size={18} fill={isFavorite ? "currentColor" : "none"} />
    </button>
  );
}
