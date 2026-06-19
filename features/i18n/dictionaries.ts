import en from "@/messages/en.json";
import es from "@/messages/es.json";
import type { Locale } from "@/types/i18n";

export const dictionaries = {
  es,
  en
} as const;

export function getDictionary(locale: Locale = "es") {
  return dictionaries[locale];
}
