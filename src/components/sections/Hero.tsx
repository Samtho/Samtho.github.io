import Link from "next/link";
import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { hasCv } from "@/lib/assets";
import { Pending } from "../Pending";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Hero({ locale, dictionary }: Props) {
  // El titular son dos frases: la primera dice que hace, la segunda que
  // problema resuelve. Se separan para darles peso tipografico distinto.
  const [lead, ...rest] = profile.headline[locale].split(/\.\s+/);
  const support = rest.join(". ");

  return (
    <section
      id="hero"
      data-spine-node
      className="spine-node relative scroll-mt-24 py-20 pl-6 md:py-28 md:pl-8"
    >
      <div className="grid gap-10 md:grid-cols-[1fr_auto] md:items-start md:gap-14">
        <div>
          <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
            {profile.location[locale]}
          </p>

          <h1 className="mt-5 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl md:text-6xl">
            {profile.name}
          </h1>

          <p className="mt-6 max-w-[22ch] font-display text-2xl leading-tight font-medium text-balance sm:text-3xl">
            {lead}.
          </p>

          {support ? (
            <p className="mt-4 max-w-[46ch] text-lg text-pretty text-muted-foreground">
              {support}
            </p>
          ) : null}
        </div>

        <PhotoSlot dictionary={dictionary} />
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        <Link
          href="#projects"
          className="rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {dictionary.hero.viewProjects}
        </Link>

        {hasCv ? (
          <a
            href={profile.cvPath}
            download
            className="rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {dictionary.hero.downloadCv}
          </a>
        ) : (
          <span className="inline-flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground">
            {dictionary.hero.downloadCv}
            <Pending />
          </span>
        )}
      </div>
    </section>
  );
}

/** El hueco de la foto se ve aunque la foto no exista todavia. */
function PhotoSlot({ dictionary }: { dictionary: Dictionary }) {
  if (profile.photo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element -- export estatico sin optimizador
      <img
        src={profile.photo}
        alt={dictionary.hero.photoAlt}
        width={176}
        height={220}
        className="w-32 rounded-md object-cover md:w-44"
      />
    );
  }

  return (
    <div className="flex aspect-[4/5] w-32 flex-col items-center justify-center gap-2 rounded-md border border-dashed border-border md:w-44">
      <span className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
        {dictionary.hero.photoPending}
      </span>
      <Pending />
    </div>
  );
}
