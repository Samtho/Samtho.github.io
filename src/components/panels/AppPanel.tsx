import { ArrowUpRightIcon, CodeXmlIcon } from "lucide-react";
import type { Project } from "@/data/schema";
import { PENDING as PENDING_MARK } from "@/data/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { PendingText } from "../Pending";
import { LazyEmbed } from "./LazyEmbed";

type Props = {
  project: Project;
  locale: Locale;
  dictionary: Dictionary;
  /** Nombre del panel hermano, cuando este se lee mejor junto a otro. */
  relatedName?: string;
};

const EYEBROW = {
  apps: "kindApp",
  ai: "kindAi",
} as const;

/** Cada grupo nombra sus bloques como le corresponde. */
const LABELS = {
  apps: { first: "problem", third: "decision", fourth: "stack" },
  ai: { first: "problem", third: "decision", fourth: "tools" },
} as const;

/**
 * Anatomia fija de un panel con ficha. La ficha es el argumento y el embed
 * es la prueba, en ese orden y nunca al reves.
 */
export function AppPanel({ project, locale, dictionary, relatedName }: Props) {
  const labels = LABELS[project.group];
  const blocks = [
    { label: dictionary.panel[labels.first], value: project.problem[locale] },
    { label: dictionary.panel.myRole, value: project.role[locale] },
    { label: dictionary.panel[labels.third], value: project.decision[locale] },
  ];

  return (
    <section
      id={project.id}
      data-panel={project.id}
      aria-labelledby={`${project.id}-title`}
      className="mx-auto w-full max-w-[68rem] scroll-mt-4 px-5 py-8 sm:px-8 sm:py-12"
    >
      <header className="max-w-[46ch]">
        <p className="font-mono text-[0.6875rem] tracking-[0.18em] text-muted-foreground uppercase">
          {dictionary.panel[EYEBROW[project.group]]}
        </p>
        <h1
          id={`${project.id}-title`}
          className="mt-2 font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
        >
          {project.headline ? project.headline[locale] : project.name}
        </h1>
        <p className="mt-3 text-lg text-pretty text-muted-foreground">
          <PendingText value={project.tagline[locale]} />
        </p>
      </header>

      <dl className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
        {blocks.map((block) => (
          <div key={block.label} className="bg-card p-5">
            <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
              {block.label}
            </dt>
            <dd className="mt-2 text-sm text-pretty">
              <PendingText value={block.value} />
            </dd>
          </div>
        ))}

        <div className="bg-card p-5">
          <dt className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
            {dictionary.panel[labels.fourth]}
          </dt>
          <dd className="mt-2 flex flex-wrap gap-1.5">
            {project.stack.length === 0 ? (
              <PendingText value={PENDING_MARK} />
            ) : (
              project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded border border-border px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                >
                  {item}
                </span>
              ))
            )}
          </dd>
        </div>
      </dl>

      {project.families.length > 0 ? (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {project.families.map((family) => (
            <li
              key={family.label.es}
              className="rounded-xl border border-border bg-card p-4"
            >
              <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-brand uppercase">
                {family.label[locale]}
              </p>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">
                {family.description[locale]}
              </p>
            </li>
          ))}
        </ul>
      ) : null}

      {project.description ? (
        <p className="mt-6 max-w-[68ch] text-sm text-pretty text-muted-foreground">
          {project.description[locale]}
        </p>
      ) : null}

      {project.related && relatedName ? (
        <p className="mt-6 text-sm text-muted-foreground">
          {dictionary.panel.related}{" "}
          <a
            href={`#${project.related}`}
            className="font-medium text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {relatedName}
          </a>
        </p>
      ) : null}

      <div className="mt-6 flex flex-wrap gap-3">
        {project.liveUrl && !project.liveUrl.includes(PENDING_MARK) ? (
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {dictionary.panel.openNewTab}
            <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
          </a>
        ) : null}

        {project.repoUrl && !project.repoUrl.includes(PENDING_MARK) ? (
          <a
            href={project.repoUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-lg border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <CodeXmlIcon className="size-3.5" aria-hidden="true" />
            {dictionary.panel.repo}
          </a>
        ) : null}
      </div>

      {project.embeds.length > 0 ? (
        <LazyEmbed
          embeds={project.embeds}
          name={project.name}
          locale={locale}
          dictionary={dictionary.embed}
        />
      ) : null}
    </section>
  );
}
