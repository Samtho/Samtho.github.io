import type { MetadataRoute } from "next";
import { localePath, locales } from "@/i18n/config";
import { SITE_URL } from "@/lib/metadata";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: new URL(localePath[locale], SITE_URL).toString(),
    lastModified: new Date(),
    alternates: {
      languages: Object.fromEntries(
        locales.map((other) => [
          other,
          new URL(localePath[other], SITE_URL).toString(),
        ]),
      ),
    },
  }));
}
