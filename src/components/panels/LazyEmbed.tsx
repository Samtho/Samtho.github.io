"use client";

import { MonitorPlayIcon } from "lucide-react";
import { useState } from "react";
import type { Embed } from "@/data/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";

type Props = {
  embeds: Embed[];
  name: string;
  locale: Locale;
  dictionary: Dictionary["embed"];
};

/**
 * El iframe no se monta al abrir el panel: primero un marco con un boton.
 * Cargar seis aplicaciones de golpe hunde el rendimiento de la pagina, y ese
 * es justo el motivo de la regla.
 */
export function LazyEmbed({ embeds, name, locale, dictionary }: Props) {
  const [active, setActive] = useState(0);
  const [loaded, setLoaded] = useState(false);

  const current = embeds[active];
  if (!current) return null;

  return (
    <div className="mt-10 border-t border-border pt-8">
      {embeds.length > 1 ? (
        <div className="mb-4 flex flex-wrap gap-2">
          {embeds.map((embed, index) => (
            <button
              key={embed.url}
              type="button"
              aria-pressed={index === active}
              onClick={() => {
                setActive(index);
                setLoaded(false);
              }}
              className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
                index === active
                  ? "border-brand bg-brand text-brand-foreground"
                  : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              }`}
            >
              {embed.label[locale]}
            </button>
          ))}
        </div>
      ) : null}

      {/* En movil no hay iframe: la app se abre a pantalla completa. */}
      <div className="md:hidden">
        <div className="rounded-xl border border-border bg-card p-6 text-center">
          <p className="font-display text-lg font-medium">{name}</p>
          <p className="mt-2 text-sm text-muted-foreground">
            {dictionary.mobileNote}
          </p>
          <a
            href={current.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {dictionary.mobileOpen}
          </a>
        </div>
      </div>

      <div className="hidden md:block">
        {loaded ? (
          <iframe
            src={current.url}
            title={`${name} · ${dictionary.frameTitle}`}
            loading="lazy"
            className="h-[640px] w-full rounded-xl border border-border bg-card"
          />
        ) : (
          <div className="flex h-[640px] w-full flex-col items-center justify-center gap-4 rounded-xl border border-dashed border-border bg-card">
            <MonitorPlayIcon
              className="size-8 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="font-display text-xl font-medium">{name}</p>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {dictionary.load}
            </button>
            <p className="max-w-[34ch] text-center text-xs text-muted-foreground">
              {dictionary.note}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
