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
