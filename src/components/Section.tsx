import type { ReactNode } from "react";

type Props = {
  id: string;
  title: string;
  children?: ReactNode;
};

/**
 * Carcasa comun de seccion. El titulo va en el rail izquierdo en escritorio
 * y encima del contenido en movil. Cada seccion es un nodo de la espina.
 */
export function Section({ id, title, children }: Props) {
  return (
    <section
      id={id}
      data-spine-node
      className="spine-node relative scroll-mt-24 border-t border-border/60 py-14 pl-6 first:border-t-0 md:grid md:grid-cols-[9rem_1fr] md:gap-10 md:pl-8"
    >
      <h2 className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
        {title}
      </h2>
      <div className="mt-6 md:mt-0">{children}</div>
    </section>
  );
}
