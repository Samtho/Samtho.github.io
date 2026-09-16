import { describe, expect, it } from "vitest";
import { COMPETENCY_TAGS } from "@/data/schema";
import { defaultLocale, locales, localePath } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import en from "@/i18n/dictionaries/en.json";
import es from "@/i18n/dictionaries/es.json";
import { dataModules, isBilingual, leafPaths, walk } from "./helpers";

describe("campos bilingues", () => {
  it("ninguno tiene el espanol o el ingles vacio", () => {
    for (const { file, value } of dataModules) {
      walk(value, (leaf, path) => {
        if (!isBilingual(leaf)) return;
        for (const locale of ["es", "en"] as const) {
          const text = leaf[locale];
          expect(typeof text, `${file} en ${path}.${locale}`).toBe("string");
          expect(
            String(text).trim().length,
            `${file} en ${path}.${locale}`,
          ).toBeGreaterThan(0);
        }
      });
    }
  });
});

describe("diccionarios de interfaz", () => {
  it("tienen exactamente el mismo conjunto de claves", () => {
    expect(leafPaths(es).sort()).toEqual(leafPaths(en).sort());
  });

  it("ninguna traduccion esta vacia", () => {
    for (const [locale, dictionary] of [
      ["es", es],
      ["en", en],
    ] as const) {
      walk(dictionary, (leaf, path) => {
        if (typeof leaf !== "string") return;
        expect(leaf.trim().length, `${locale} en ${path}`).toBeGreaterThan(0);
      });
    }
  });

  // Si se anade un tag al enum y nadie le pone etiqueta, el filtro sale en blanco.
  it("cada competencia del enum tiene etiqueta en los dos idiomas", () => {
    for (const tag of COMPETENCY_TAGS) {
      expect(Object.keys(es.tags), `es: ${tag}`).toContain(tag);
      expect(Object.keys(en.tags), `en: ${tag}`).toContain(tag);
    }
  });

  it("no sobra ninguna etiqueta de un tag que ya no existe", () => {
    expect(Object.keys(es.tags).sort()).toEqual([...COMPETENCY_TAGS].sort());
  });
});

describe("rutas e idiomas", () => {
  it("el espanol es el idioma por defecto y vive en la raiz", () => {
    expect(defaultLocale).toBe("es");
    expect(localePath.es).toBe("/");
  });

  it("cada idioma tiene una ruta propia y distinta", () => {
    const paths = locales.map((locale) => localePath[locale]);
    expect(paths).toHaveLength(locales.length);
    expect(new Set(paths).size).toBe(paths.length);
  });

  it("getDictionary devuelve el diccionario del idioma pedido", () => {
    expect(getDictionary("es").nav.skipToContent).toBe(es.nav.skipToContent);
    expect(getDictionary("en").nav.skipToContent).toBe(en.nav.skipToContent);
  });

  // Traducir es el trabajo; dejar el texto del otro idioma no lo es.
  it("ningun texto de navegacion quedo sin traducir", () => {
    for (const key of Object.keys(es.nav) as Array<keyof typeof es.nav>) {
      expect(es.nav[key], key).not.toBe(en.nav[key]);
    }
  });
});
