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
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { capabilities } from "@/data/capabilities";
import { faq } from "@/data/faq";
import { method } from "@/data/method";
import { PENDING } from "@/data/schema";
import { DEFAULT_TIMELINE_FROM, timeline } from "@/data/timeline";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Pending } from "../Pending";
import { TimelineBrowser } from "../TimelineBrowser";
import { Panel } from "./Panel";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function TimelinePanel({ locale, dictionary }: Props) {
  const entries = [...timeline].sort((a, b) =>
    String(b.start).localeCompare(String(a.start)),
  );

  return (
    <Panel
      id="timeline"
      eyebrow={dictionary.sidebar.groupProfile}
      title={dictionary.sections.timeline}
    >
      <TimelineBrowser
        entries={entries}
        locale={locale}
        dictionary={dictionary.timeline}
        tagLabels={dictionary.tags}
        recentFrom={DEFAULT_TIMELINE_FROM}
      />
    </Panel>
  );
}

/** Aqui la numeracion si dice algo: los tres pasos van en orden. */
export function MethodPanel({ locale, dictionary }: Props) {
  return (
    <Panel
      id="method"
      eyebrow={dictionary.sidebar.groupProfile}
      title={dictionary.sections.method}
      width="wide"
    >
      <ol className="grid gap-4 sm:grid-cols-3">
        {method.map((step, index) => (
          <li
            key={step.id}
            className="rounded-xl border border-border bg-card p-5"
          >
            <span className="font-mono text-xs text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h2 className="mt-2 font-display text-lg font-medium text-balance">
              {step.title[locale]}
            </h2>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">
              {step.description[locale]}
            </p>
          </li>
        ))}
      </ol>
    </Panel>
  );
}

const ICONS: Record<string, LucideIcon> = {
  search: SearchIcon,
  compass: CompassIcon,
  rocket: RocketIcon,
  "chart-column": ChartColumnIcon,
  sparkles: SparklesIcon,
  "refresh-cw": RefreshCwIcon,
  users: UsersIcon,
};

export function CapabilitiesPanel({ locale, dictionary }: Props) {
  return (
    <Panel
      id="capabilities"
      eyebrow={dictionary.sidebar.groupProfile}
      title={dictionary.sections.capabilities}
      width="wide"
    >
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {capabilities.map((capability) => {
          const Icon = ICONS[capability.icon];
          return (
            <li
              key={capability.id}
              className="rounded-xl border border-border bg-card p-5"
            >
              <div className="flex items-center gap-2">
                {Icon ? (
                  <Icon className="size-4 text-brand" aria-hidden="true" />
                ) : null}
                <h2 className="font-display text-base font-medium">
                  {capability.title[locale]}
                </h2>
              </div>
              <p className="mt-2 text-sm text-pretty text-muted-foreground">
                {capability.description[locale]}
              </p>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

export function FaqPanel({ locale, dictionary }: Props) {
  return (
    <Panel
      id="faq"
      eyebrow={dictionary.sidebar.groupProfile}
      title={dictionary.sections.faq}
    >
      <Accordion type="single" collapsible className="max-w-[70ch]">
        {faq.map((item) => (
          <AccordionItem key={item.id} value={item.id}>
            <AccordionTrigger className="text-left font-display text-base font-medium">
              {item.question[locale]}
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              {item.answer[locale] === PENDING ? (
                <Pending />
              ) : (
                item.answer[locale]
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Panel>
  );
}
