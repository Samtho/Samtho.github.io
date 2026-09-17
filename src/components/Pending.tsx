import { Fragment } from "react";
import { PENDING } from "@/data/schema";

/**
 * Hueco visible. Se pinta en la pagina a proposito, para que Sam vea la
 * estructura completa y corrija los huecos mirandolos.
 */
export function Pending({ label }: { label?: string }) {
  return (
    <span className="inline-flex items-center rounded border border-dashed border-brand/50 px-1.5 py-0.5 font-mono text-xs text-brand">
      {label ?? PENDING}
    </span>
  );
}

/**
 * Texto que puede llevar el marcador incrustado, no solo serlo entero:
 * "Trabajo en equipo del máster. [por definir]" se pinta como prosa mas chip.
 */
export function PendingText({ value }: { value: string }) {
  if (!value.includes(PENDING)) return <>{value}</>;

  const parts = value.split(PENDING);

  return (
    <>
      {parts.map((part, index) => (
        <Fragment key={index}>
          {part}
          {index < parts.length - 1 ? <Pending /> : null}
        </Fragment>
      ))}
    </>
  );
}
