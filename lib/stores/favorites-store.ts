import { createStore } from "@/lib/stores/store";

type FavoritesState = {
  productIds: string[];
  isLoading: boolean;
};

export const favoritesStore = createStore<FavoritesState>({
  productIds: [],
  isLoading: false
});

export function setFavoriteProductIds(productIds: string[]) {
  favoritesStore.setState({ productIds, isLoading: false });
}

export function toggleFavoriteProductId(productId: string, isFavorite: boolean) {
  const state = favoritesStore.getState();
  const productIds = isFavorite
    ? Array.from(new Set([...state.productIds, productId]))
    : state.productIds.filter((id) => id !== productId);

  favoritesStore.setState({ productIds });
}
