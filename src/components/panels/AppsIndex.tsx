import { ArrowUpRightIcon } from "lucide-react";
import { projectsByGroup } from "@/data/projects";
import { PENDING } from "@/data/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Pending } from "../Pending";
import { Panel } from "./Panel";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

/** Indice de las apps. Cada tarjeta abre el panel de su aplicacion. */
export function AppsIndex({ locale, dictionary }: Props) {
  const apps = projectsByGroup("apps");

  return (
    <Panel
      id="apps"
      eyebrow={dictionary.sidebar.groupApps}
      title={dictionary.sidebar.appsTitle}
      lead={dictionary.sidebar.appsLead}
      width="wide"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {apps.map((app) => (
          <li key={app.id}>
            <a
              href={`#${app.id}`}
              className="flex h-full flex-col rounded-xl border border-border bg-card p-5 transition-colors hover:border-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <span className="flex items-center justify-between gap-3">
                <span className="font-display text-lg font-medium">
                  {app.name}
                </span>
                <ArrowUpRightIcon
                  className="size-4 shrink-0 text-muted-foreground"
                  aria-hidden="true"
                />
              </span>
              <span className="mt-2 text-sm text-pretty text-muted-foreground">
                {app.tagline[locale] === PENDING ? (
                  <Pending />
                ) : (
                  app.tagline[locale]
                )}
              </span>
              {app.stack.length > 0 ? (
                <span className="mt-4 flex flex-wrap gap-1.5">
                  {app.stack.slice(0, 3).map((item) => (
                    <span
                      key={item}
                      className="rounded border border-border px-1.5 py-0.5 font-mono text-xs text-muted-foreground"
                    >
                      {item}
                    </span>
                  ))}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </Panel>
  );
}
