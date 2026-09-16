export const locales = ["es", "en"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "es";

/**
 * Ruta de cada idioma. El espanol vive en la raiz y el ingles en /en.
 * No hay segmento dinamico [locale]: son dos rutas explicitas, que en un
 * export estatico evita la gimnasia de redirects.
 */
export const localePath: Record<Locale, string> = {
  es: "/",
  en: "/en/",
};
