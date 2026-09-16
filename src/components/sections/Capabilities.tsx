import {
  ChartColumnIcon,
  CompassIcon,
  RefreshCwIcon,
  RocketIcon,
  SearchIcon,
  SparklesIcon,
  UsersIcon,
  type LucideIcon,
} from "lucide-react";
import { capabilities } from "@/data/capabilities";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "../Section";

/** Mapa explicito: nada de resolver iconos por nombre en tiempo de ejecucion. */
const ICONS: Record<string, LucideIcon> = {
  search: SearchIcon,
  compass: CompassIcon,
  rocket: RocketIcon,
  "chart-column": ChartColumnIcon,
  sparkles: SparklesIcon,
  "refresh-cw": RefreshCwIcon,
  users: UsersIcon,
};

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Capabilities({ locale, dictionary }: Props) {
  return (
    <Section id="capabilities" title={dictionary.sections.capabilities}>
      <ul className="grid gap-7 sm:grid-cols-2">
        {capabilities.map((capability) => {
          const Icon = ICONS[capability.icon];
          return (
            <li key={capability.id}>
              <div className="flex items-center gap-2">
                {Icon ? (
                  <Icon className="size-4 text-brand" aria-hidden="true" />
                ) : null}
                <h3 className="font-display text-base font-medium">
                  {capability.title[locale]}
                </h3>
              </div>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">
                {capability.description[locale]}
              </p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
