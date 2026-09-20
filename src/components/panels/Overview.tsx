import { ArrowUpRightIcon, MailIcon } from "lucide-react";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { projectsByGroup } from "@/data/projects";
import { PENDING } from "@/data/schema";
import { timeline } from "@/data/timeline";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Counter } from "../Counter";
import { Portrait } from "../Portrait";
import { AppsGrid } from "./AppsGrid";
import { PANEL_WIDTH } from "./Panel";

const PROOF_IDS = [
  "giunti-product-owner",
  "ntt-data",
  "inesdi-master-business-analytics-ia",
  "safe-lean-portfolio-manager",
  "iebs-mba-transformacion-digital",
  "ucab-ingenieria-telecomunicaciones",
];

/** Enlace secundario de la portada: contorno sobre la tinta, no relleno. */
const MASTHEAD_LINK =
  "inline-flex items-center gap-2 rounded-lg border border-masthead-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-masthead-foreground/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring";

const LABEL = "font-mono text-[0.6875rem] tracking-[0.18em] uppercase";

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
      className="scroll-mt-4"
    >
      {/**
       * Portada. Es el unico bloque del sitio que sangra de lado a lado. El
       * corte con el papel es seco a proposito: cualquier degradado deja una
       * costura horizontal a media altura y ensucia el bloque. El filete de
       * abajo no se nota sobre la crema, y en tema oscuro es lo que separa la
       * portada del negro real de la pagina.
       */}
      <div className="border-b border-masthead-border bg-masthead text-masthead-foreground">
        <div className="mx-auto grid max-w-[68rem] items-center gap-8 px-5 py-12 sm:px-8 sm:py-16 md:grid-cols-[15rem_minmax(0,1fr)] md:gap-12 lg:grid-cols-[17rem_minmax(0,1fr)] lg:py-20">
          <div className="w-40 sm:w-48 md:w-full">
            <Portrait alt={dictionary.hero.photoAlt} />
          </div>

          <div>
            <p className={`${LABEL} text-masthead-muted`}>
              {profile.location[locale]}
            </p>

            <h1
              id="overview-title"
              className="mt-3 font-display text-4xl leading-[1.02] font-semibold tracking-tight text-balance sm:text-5xl lg:text-6xl"
            >
              {profile.name}
            </h1>

            <p className="mt-5 max-w-[26ch] font-display text-2xl leading-tight font-medium text-balance sm:text-3xl">
              {lead}.
            </p>

            {support ? (
              <p className="mt-3 max-w-[54ch] text-base text-pretty text-masthead-muted sm:text-lg">
                {support}
              </p>
            ) : null}

            <div className="mt-8 flex flex-wrap gap-2.5">
              <a
                href="#apps"
                className="rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {dictionary.hero.viewProjects}
              </a>

              {profile.email === PENDING ? null : (
                <a href={`mailto:${profile.email}`} className={MASTHEAD_LINK}>
                  <MailIcon className="size-4" aria-hidden="true" />
                  {dictionary.cta.email}
                </a>
              )}

              {profile.linkedin === PENDING ? null : (
                <a href={profile.linkedin} className={MASTHEAD_LINK}>
                  {dictionary.cta.linkedin}
                  <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                </a>
              )}

              <a href={profile.github} className={MASTHEAD_LINK}>
                {dictionary.cta.github}
                <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/**
       * El catalogo va inmediatamente despues de la portada porque es el
       * argumento del sitio. Usa el ancho largo; el texto de abajo vuelve a la
       * columna de lectura.
       */}
      <div
        className={`mx-auto w-full px-5 pt-10 sm:px-8 sm:pt-14 ${PANEL_WIDTH.wide}`}
      >
        <p className={`${LABEL} text-muted-foreground`}>
          {dictionary.sections.catalogue}
        </p>
        <h2 className="mt-2 max-w-[24ch] font-display text-2xl font-semibold tracking-tight text-balance sm:text-3xl">
          {dictionary.sidebar.appsTitle}
        </h2>
        <p className="mt-3 max-w-[58ch] text-pretty text-muted-foreground">
          {dictionary.sidebar.appsLead}
        </p>

        <div className="mt-7">
          <AppsGrid
            apps={projectsByGroup("apps")}
            locale={locale}
            dictionary={dictionary}
          />
        </div>
      </div>

      {/**
       * El cuerpo comparte contenedor con el catalogo. Aqui no hay texto
       * corrido que justifique la columna de lectura: son listas y tarjetas,
       * y un escalon de ancho justo debajo de la rejilla se lee como un error.
       */}
      <div className={`mx-auto w-full px-5 pb-12 sm:px-8 ${PANEL_WIDTH.wide}`}>
        <div className="mt-12 border-t border-border pt-8">
          <p className={`${LABEL} text-muted-foreground`}>
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
          <p className={`${LABEL} text-muted-foreground`}>
            {dictionary.sections.metrics}
          </p>
          <dl className="mt-5 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
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
          <p className={`${LABEL} text-muted-foreground`}>
            {dictionary.sections.cta}
          </p>
          <p className="mt-4 max-w-[40ch] font-display text-xl text-balance">
            {dictionary.cta.intro}
          </p>
          {profile.email === PENDING ? null : (
            <a
              href={`mailto:${profile.email}`}
              className="mt-5 inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <MailIcon className="size-4" aria-hidden="true" />
              {dictionary.cta.email}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
