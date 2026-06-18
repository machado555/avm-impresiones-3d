import { EmptyFavoritesState } from "@/features/favorites/components/empty-favorites-state";
import { FavoritesGrid } from "@/features/favorites/components/favorites-grid";
import { getFavorites } from "@/features/favorites/data/get-favorites";
import { Section } from "@/components/ui/section";

export const metadata = {
  title: "Favoritos"
};

export default async function FavoritesPage() {
  const products = await getFavorites();

  return (
    <Section eyebrow="Mi cuenta" title="Favoritos" description="Productos guardados para comprar o revisar mas tarde.">
      {products.length > 0 ? <FavoritesGrid products={products} /> : <EmptyFavoritesState />}
    </Section>
  );
}
