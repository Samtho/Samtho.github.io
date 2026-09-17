/** Cuadrado con las iniciales sobre indigo. Ancla visual de la barra. */
export function Avatar({ name, className = "" }: { name: string; className?: string }) {
  const initials = name
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();

  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center rounded-lg bg-brand font-display font-semibold text-brand-foreground ${className}`}
    >
      {initials}
    </span>
  );
}
