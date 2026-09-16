import type { Metadata } from "next";
import { profile } from "@/data/profile";
import { localePath, type Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";

export const SITE_URL = "https://samtho.github.io";

/** Metadata de una de las dos rutas de idioma. */
export function buildMetadata(locale: Locale): Metadata {
  const { meta } = getDictionary(locale);

  return {
    metadataBase: new URL(SITE_URL),
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: localePath[locale],
      languages: {
        es: localePath.es,
        en: localePath.en,
        // El espanol es el idioma por defecto para cualquier otro.
        "x-default": localePath.es,
      },
    },
    twitter: {
      card: "summary_large_image",
      title: meta.title,
      description: meta.description,
    },
    openGraph: {
      type: "website",
      siteName: profile.name,
      locale: locale === "es" ? "es_ES" : "en_US",
      url: localePath[locale],
      title: meta.title,
      description: meta.description,
      images: [
        {
          url: `${localePath[locale]}og.png`,
          width: 1200,
          height: 630,
          alt: meta.title,
        },
      ],
    },
  };
}
