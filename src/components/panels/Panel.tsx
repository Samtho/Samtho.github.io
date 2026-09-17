import type { ReactNode } from "react";

type Props = {
  id: string;
  /** Etiqueta en mono sobre el titular. */
  eyebrow: string;
  title: string;
  lead?: string;
  children?: ReactNode;
};

/**
 * Carcasa comun de panel. El id alimenta el enrutado por :target, asi que
 * tiene que coincidir con el hash del enlace de la barra lateral.
 */
export function Panel({ id, eyebrow, title, lead, children }: Props) {
  return (
    <section
      id={id}
      data-panel={id}
      aria-labelledby={`${id}-title`}
      className="scroll-mt-4 px-5 py-8 sm:px-8 sm:py-12"
    >
      <header className="max-w-[60ch]">
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
