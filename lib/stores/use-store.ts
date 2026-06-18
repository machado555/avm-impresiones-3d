"use client";

import { useSyncExternalStore } from "react";
import type { Store } from "@/lib/stores/store";

export function useStore<TState extends Record<string, unknown>, TValue>(
  store: Store<TState>,
  selector: (state: TState) => TValue
) {
  return useSyncExternalStore(store.subscribe, () => selector(store.getState()), () => selector(store.getState()));
}
