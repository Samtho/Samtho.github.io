import { ArrowUpRightIcon, CodeXmlIcon } from "lucide-react";
import { publicProjects } from "@/data/projects";
import { PENDING } from "@/data/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Pending } from "../Pending";
import { Section } from "../Section";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

/** Solo pinta lo que devuelve publicProjects. Nada confidencial pasa de aqui. */
export function Projects({ locale, dictionary }: Props) {
  return (
    <Section id="projects" title={dictionary.sections.projects}>
      <ul className="grid gap-px overflow-hidden rounded-lg border border-border bg-border">
        {publicProjects().map((project) => (
          <li key={project.id} className="bg-background p-5 sm:p-6">
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-xl font-medium">
                {project.name}
              </h3>
              <span className="font-mono text-xs text-muted-foreground">
                {project.year}
                {" · "}
                {project.source === "academic"
                  ? dictionary.projects.sourceAcademic
                  : dictionary.projects.sourcePersonal}
              </span>
            </div>

            <p className="mt-2 text-pretty">{project.tagline[locale]}</p>
            <p className="mt-3 text-sm text-pretty text-muted-foreground">
              {project.description[locale]}
            </p>

            <dl className="mt-4 grid gap-2 text-sm sm:grid-cols-[6rem_1fr]">
              <dt className="font-mono text-xs text-muted-foreground uppercase">
                {dictionary.projects.role}
              </dt>
              <dd>
                {project.role[locale] === PENDING ? (
                  <Pending />
                ) : (
                  project.role[locale]
                )}
              </dd>
              <dt className="font-mono text-xs text-muted-foreground uppercase">
                {dictionary.projects.stack}
              </dt>
              <dd className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded border border-border px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                  >
                    {item}
                  </span>
                ))}
              </dd>
            </dl>

            <div className="mt-5 flex flex-wrap gap-4 text-sm">
              {project.liveUrl && project.liveUrl !== PENDING ? (
                <a
                  href={project.liveUrl}
                  className="inline-flex items-center gap-1 font-medium text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  {dictionary.projects.live}
                  <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                </a>
              ) : null}
              {project.repoUrl && project.repoUrl !== PENDING ? (
                <a
                  href={project.repoUrl}
                  className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                >
                  <CodeXmlIcon className="size-3.5" aria-hidden="true" />
                  {dictionary.projects.repo}
                </a>
              ) : null}
            </div>
          </li>
        ))}
      </ul>
    </Section>
  );
}
