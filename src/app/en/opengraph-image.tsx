import { ImageResponse } from "next/og";
import { profile } from "@/data/profile";
import { getDictionary } from "@/i18n/getDictionary";
import { ogImage } from "@/lib/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Samuel Ortega";

export default function Image() {
  return new ImageResponse(
    ogImage({
      name: profile.name,
      headline: profile.headline.en,
      location: profile.location.en,
      site: getDictionary("en").meta.title,
    }),
    size,
  );
}
