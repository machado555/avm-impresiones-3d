import { Heart } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { GlassCard } from "@/components/ui/glass-card";

export function EmptyFavoritesState() {
  return (
    <GlassCard className="mx-auto max-w-xl text-center">
      <Heart className="mx-auto text-cyan-200" size={34} />
      <p className="mt-5 text-lg font-semibold text-white">Todavia no guardaste favoritos</p>
      <p className="mt-3 text-sm leading-6 text-slate-400">Explora el catalogo y marca productos para encontrarlos rapido despues.</p>
      <ButtonLink href="/productos" className="mt-6">Ver productos</ButtonLink>
    </GlassCard>
  );
}
