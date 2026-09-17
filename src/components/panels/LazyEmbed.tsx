"use client";

import { ArrowUpRightIcon, PlayIcon } from "lucide-react";
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

/** La URL sin protocolo, como la pinta la barra de un navegador. */
function pretty(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

/**
 * Marco de aplicacion. Se lee como una ventana de navegador: barra con la URL
 * arriba y el contenido debajo.
 *
 * El iframe no se monta al abrir el panel, solo al pulsar. Cargar seis
 * aplicaciones de golpe hunde el rendimiento de la pagina, y ese es el motivo
 * de la regla.
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

      {/* En movil no hay iframe: la aplicacion se abre a pantalla completa. */}
      <div className="md:hidden">
        <div className="overflow-hidden rounded-xl border border-border bg-card">
          <FrameBar url={current.url} label={dictionary.openExternal} />
          <div className="flex flex-col items-center gap-3 px-5 py-8 text-center">
            <p className="font-display text-lg font-medium">{name}</p>
            <p className="max-w-[30ch] text-sm text-muted-foreground">
              {dictionary.mobileNote}
            </p>
            <a
              href={current.url}
              target="_blank"
              rel="noreferrer"
              className="mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-brand px-4 py-3 text-sm font-medium text-brand-foreground"
            >
              {dictionary.mobileOpen}
              <ArrowUpRightIcon className="size-4" aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>

      {/*
        El borde y la barra separan la aplicacion del sitio. Hace falta en modo
        oscuro sobre todo: la app de dentro trae su propio tema y puede venir
        en claro, asi que el limite no puede depender del color de fondo.
      */}
      <div className="hidden overflow-hidden rounded-xl border border-border bg-card ring-1 ring-border md:block">
        <FrameBar url={current.url} label={dictionary.openExternal} />

        {loaded ? (
          <iframe
            src={current.url}
            title={`${name} · ${dictionary.frameTitle}`}
            loading="lazy"
            className="block h-[640px] w-full border-0 bg-card"
          />
        ) : (
          <div className="flex h-[640px] w-full flex-col items-center justify-center gap-4 bg-muted/40">
            <p className="font-display text-xl font-medium">{name}</p>
            <button
              type="button"
              onClick={() => setLoaded(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <PlayIcon className="size-4" aria-hidden="true" />
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

/** Barra superior del marco: la URL y un boton para abrir fuera. */
function FrameBar({ url, label }: { url: string; label: string }) {
  return (
    <div className="flex items-center gap-3 border-b border-border bg-muted/50 px-3 py-2">
      <span className="flex gap-1.5" aria-hidden="true">
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
        <span className="size-2.5 rounded-full bg-border" />
      </span>
      <span className="min-w-0 flex-1 truncate rounded-md bg-background px-2.5 py-1 font-mono text-xs text-muted-foreground">
        {pretty(url)}
      </span>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        aria-label={label}
        title={label}
        className="shrink-0 rounded-md p-1 text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
      >
        <ArrowUpRightIcon className="size-4" aria-hidden="true" />
      </a>
    </div>
  );
}
