import { ArrowUpRightIcon } from "lucide-react";
import { PENDING, type Project } from "@/data/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Pending } from "../Pending";

/** Los anchos que escribe scripts/thumbs.mjs de cada captura. */
const WIDTHS = [480, 800, 1280] as const;

/** La captura que encabeza la tarjeta: la del id, salvo que el dato mande otra. */
const thumbOf = (app: Project) => app.thumb ?? app.id;

const srcSet = (slug: string) =>
  WIDTHS.map((width) =>
    width === 1280
      ? `/thumbs/${slug}.webp ${width}w`
      : `/thumbs/${slug}-${width}.webp ${width}w`,
  ).join(", ");

type Props = {
  apps: Project[];
  locale: Locale;
  dictionary: Dictionary;
};

/**
 * El catalogo. La miniatura manda y ocupa la mayor parte de la tarjeta: cada
 * app tiene que entrar por el ojo antes que por el texto.
 *
 * Las capturas las genera scripts/thumbs.mjs y viven en public/thumbs. El
 * nombre del archivo es el id del proyecto salvo que lleve `thumb`.
 */
export function AppsGrid({ apps, locale, dictionary }: Props) {
  return (
    <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
      {apps.map((app) => (
        <li key={app.id}>
          <a
            href={`#${app.id}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {/* eslint-disable-next-line @next/next/no-img-element -- export estatico: next/image no optimiza nada aqui y el srcset es nuestro */}
            <img
              src={`/thumbs/${thumbOf(app)}.webp`}
              srcSet={srcSet(thumbOf(app))}
              sizes="(min-width: 1024px) 21rem, (min-width: 640px) 45vw, 92vw"
              alt={dictionary.projects.thumbAlt.replace("{name}", app.name)}
              width={1280}
              height={800}
              loading="lazy"
              decoding="async"
              className="aspect-16/10 w-full border-b border-border bg-muted object-cover object-top"
            />

            <span className="flex flex-1 flex-col p-4">
              <span className="flex items-start justify-between gap-3">
                <span className="font-display text-base font-medium">
                  {app.name}
                </span>
                <ArrowUpRightIcon
                  className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-hover:text-brand"
                  aria-hidden="true"
                />
              </span>

              <span className="mt-1.5 text-sm text-pretty text-muted-foreground">
                {app.tagline[locale] === PENDING ? (
                  <Pending />
                ) : (
                  app.tagline[locale]
                )}
              </span>

              {app.stack.length > 0 ? (
                <span className="mt-auto flex flex-wrap gap-1.5 pt-4">
                  {app.stack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              ) : null}
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
