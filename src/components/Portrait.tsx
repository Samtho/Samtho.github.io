import { profile } from "@/data/profile";

/**
 * El retrato de la portada. Mientras no haya foto, el hueco lo ocupa el
 * monograma: un marcador que se sostiene solo, no un aviso de que falta algo.
 * En cuanto profile.photo tenga valor, la foto lo sustituye sin tocar nada.
 */
export function Portrait({ alt }: { alt: string }) {
  if (profile.photo) {
    return (
      <img
        src={profile.photo}
        alt={alt}
        width={512}
        height={640}
        className="aspect-4/5 w-full rounded-2xl border border-masthead-border object-cover"
      />
    );
  }

  const initials = profile.name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <div
      aria-hidden="true"
      className="grid aspect-4/5 w-full place-items-center rounded-2xl border border-masthead-border bg-[radial-gradient(120%_95%_at_50%_0%,color-mix(in_oklab,var(--brand)_28%,transparent),transparent_72%)]"
    >
      <span className="font-display text-7xl font-semibold tracking-tight text-masthead-foreground/35">
        {initials}
      </span>
    </div>
  );
}
