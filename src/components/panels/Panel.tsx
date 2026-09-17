import type { ReactNode } from "react";

/**
 * Anchos del sistema. La columna de lectura manda en los paneles de texto;
 * las rejillas de tarjetas usan el ancho largo.
 */
export const PANEL_WIDTH = {
  prose: "max-w-[48.75rem]",
  wide: "max-w-[68rem]",
} as const;

type Props = {
  id: string;
  /** Etiqueta en mono sobre el titular. */
  eyebrow: string;
  title: string;
  lead?: string;
  /** "prose" para texto corrido, "wide" para rejillas de tarjetas. */
  width?: keyof typeof PANEL_WIDTH;
  children?: ReactNode;
};

/**
 * Carcasa comun de panel. El id alimenta el enrutado por :target, asi que
 * tiene que coincidir con el hash del enlace de la barra lateral.
 *
 * El contenedor se centra a si mismo: en un panel de texto la columna es el
 * panel entero, de modo que nada queda descolgado en una pantalla ancha.
 */
export function Panel({
  id,
  eyebrow,
  title,
  lead,
  width = "prose",
  children,
}: Props) {
  return (
    <section
      id={id}
      data-panel={id}
      aria-labelledby={`${id}-title`}
      className={`mx-auto w-full scroll-mt-4 px-5 py-8 sm:px-8 sm:py-12 ${PANEL_WIDTH[width]}`}
    >
      <header className="max-w-[46ch]">
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
          {eyebrow}
        </p>
        <h1
          id={`${id}-title`}
          className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          {title}
        </h1>
        {lead ? (
          <p className="mt-3 text-lg text-pretty text-muted-foreground">
            {lead}
          </p>
        ) : null}
      </header>

      {children ? <div className="mt-8">{children}</div> : null}
    </section>
  );
}
