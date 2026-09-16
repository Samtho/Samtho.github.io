import type { Locale } from "./config";
import en from "./dictionaries/en.json";
import es from "./dictionaries/es.json";

/**
 * El tipo sale del diccionario espanol. Si al ingles le falta una clave o le
 * sobra, TypeScript lo rechaza aqui, antes de que lo haga el test de i18n.
 */
export type Dictionary = typeof es;

const dictionaries: Record<Locale, Dictionary> = { es, en };

export function getDictionary(locale: Locale): Dictionary {
  return dictionaries[locale];
}
