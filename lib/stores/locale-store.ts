import { createStore } from "@/lib/stores/store";
import type { Locale } from "@/types/i18n";

type LocaleState = {
  locale: Locale;
};

export const localeStore = createStore<LocaleState>({
  locale: "es"
});
