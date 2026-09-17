import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { PENDING } from "@/data/schema";
import { timeline } from "@/data/timeline";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Counter } from "../Counter";

const PROOF_IDS = [
  "giunti-product-owner",
  "ntt-data",
  "inesdi-master-business-analytics-ia",
  "safe-lean-portfolio-manager",
  "iebs-mba-transformacion-digital",
  "ucab-ingenieria-telecomunicaciones",
];

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Overview({ locale, dictionary }: Props) {
  // El titular son dos frases: la primera dice que hace, la segunda que
  // problema resuelve. Se separan para darles peso tipografico distinto.
  const [lead, ...rest] = profile.headline[locale].split(/\.\s+/);
  const support = rest.join(". ");

  const orgs = PROOF_IDS.map(
    (id) => timeline.find((entry) => entry.id === id)?.org,
  ).filter((org): org is string => Boolean(org));

  return (
    <section
      id="overview"
      data-panel="overview"
      aria-labelledby="overview-title"
      className="mx-auto w-full max-w-[48.75rem] scroll-mt-4 px-5 py-8 sm:px-8 sm:py-12"
    >
      <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
        {profile.location[locale]}
      </p>

      <h1
        id="overview-title"
        className="mt-3 font-display text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-5xl"
      >
        {profile.name}
      </h1>

      <p className="mt-5 max-w-[24ch] font-display text-2xl leading-tight font-medium text-balance sm:text-3xl">
        {lead}.
      </p>

      {support ? (
        <p className="mt-3 max-w-[52ch] text-lg text-pretty text-muted-foreground">
          {support}
        </p>
      ) : null}

      <div className="mt-7 flex flex-wrap gap-3">
        <a
          href="#apps"
          className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {dictionary.hero.viewProjects}
        </a>
        {profile.email === PENDING ? null : (
          <a
            href={`mailto:${profile.email}`}
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <MailIcon className="size-4" aria-hidden="true" />
            {dictionary.cta.email}
          </a>
        )}
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
          {dictionary.sections.proof}
        </p>
        <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
          {orgs.map((org) => (
            <li
              key={org}
              className="font-display text-base font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-lg"
            >
              {org}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
          {dictionary.sections.metrics}
        </p>
        <dl className="mt-5 grid gap-6 sm:grid-cols-2">
          {metrics.map((metric) => (
            <div
              key={metric.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <dt className="sr-only">{metric.label[locale]}</dt>
              <dd>
                <p className="font-display text-3xl font-semibold tracking-tight tabular-nums sm:text-4xl">
                  {typeof metric.value === "number" ? (
                    <Counter
                      value={metric.value}
                      baseline={metric.baseline}
                      locale={locale}
                    />
                  ) : (
                    metric.value
                  )}
                  {metric.suffix ? (
                    <span className="text-xl text-brand sm:text-2xl">
                      {metric.suffix}
                    </span>
                  ) : null}
                </p>
                <p className="mt-1.5 max-w-[28ch] text-sm text-pretty">
                  {metric.label[locale]}
                </p>
                {metric.source ? (
                  <p className="mt-1 max-w-[32ch] font-mono text-xs text-pretty text-muted-foreground">
                    {metric.source[locale]}
                  </p>
                ) : null}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-12 border-t border-border pt-8">
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
          {dictionary.sections.cta}
        </p>
        <p className="mt-4 max-w-[40ch] font-display text-xl text-balance">
          {dictionary.cta.intro}
        </p>
        <ul className="mt-5 flex flex-wrap gap-3">
          {profile.linkedin === PENDING ? null : (
            <li>
              <a
                href={profile.linkedin}
                className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {dictionary.cta.linkedin}
                <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
              </a>
            </li>
          )}
          <li>
            <a
              href={profile.github}
              className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {dictionary.cta.github}
              <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
            </a>
          </li>
        </ul>
      </div>
    </section>
  );
}
