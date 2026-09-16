"use client";

import { ChevronDownIcon } from "lucide-react";
import { useMemo, useState } from "react";
import {
  COMPETENCY_TAGS,
  type CompetencyTag,
  type TimelineEntry,
} from "@/data/schema";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { formatRange } from "@/lib/date";

type Kind = TimelineEntry["kind"];
type KindFilter = Kind | "all";

type Props = {
  entries: TimelineEntry[];
  locale: Locale;
  dictionary: Dictionary["timeline"];
  tagLabels: Dictionary["tags"];
  recentFrom: string;
};

const KINDS: Array<{ value: KindFilter; key: keyof Dictionary["timeline"] }> = [
  { value: "all", key: "kindAll" },
  { value: "work", key: "kindWork" },
  { value: "education", key: "kindEducation" },
  { value: "certification", key: "kindCertification" },
];

export function TimelineBrowser({
  entries,
  locale,
  dictionary,
  tagLabels,
  recentFrom,
}: Props) {
  const [kind, setKind] = useState<KindFilter>("all");
  const [tags, setTags] = useState<CompetencyTag[]>([]);
  const [recentOnly, setRecentOnly] = useState(true);
  const [expanded, setExpanded] = useState<string[]>([]);

  const visibleIds = useMemo(() => {
    const matches = entries.filter((entry) => {
      if (kind !== "all" && entry.kind !== kind) return false;
      if (recentOnly && String(entry.start) < recentFrom) return false;
      // Union: basta con que la entrada tenga una de las competencias elegidas.
      if (tags.length > 0 && !tags.some((tag) => entry.tags.includes(tag))) {
        return false;
      }
      return true;
    });
    return new Set(matches.map((entry) => entry.id));
  }, [entries, kind, tags, recentOnly, recentFrom]);

  const isFiltered = kind !== "all" || tags.length > 0 || recentOnly;

  function toggleTag(tag: CompetencyTag) {
    setTags((current) =>
      current.includes(tag)
        ? current.filter((item) => item !== tag)
        : [...current, tag],
    );
  }

  function clearFilters() {
    setKind("all");
    setTags([]);
    setRecentOnly(false);
  }

  return (
    <div>
      <div className="flex flex-col gap-4">
        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">{dictionary.filterByKind}</legend>
          {KINDS.map(({ value, key }) => (
            <FilterButton
              key={value}
              pressed={kind === value}
              onClick={() => setKind(value)}
            >
              {dictionary[key]}
            </FilterButton>
          ))}
          <FilterButton
            pressed={recentOnly}
            onClick={() => setRecentOnly((current) => !current)}
          >
            {dictionary.recentOnly}
          </FilterButton>
        </fieldset>

        <fieldset className="flex flex-wrap items-center gap-2">
          <legend className="sr-only">{dictionary.filterByTag}</legend>
          {COMPETENCY_TAGS.map((tag) => (
            <FilterButton
              key={tag}
              pressed={tags.includes(tag)}
              onClick={() => toggleTag(tag)}
            >
              {tagLabels[tag]}
            </FilterButton>
          ))}
        </fieldset>
      </div>

      <p
        className="mt-5 font-mono text-xs text-muted-foreground"
        role="status"
        aria-live="polite"
        data-testid="timeline-count"
      >
        {dictionary.showing
          .replace("{visible}", String(visibleIds.size))
          .replace("{total}", String(entries.length))}
      </p>

      {visibleIds.size === 0 ? (
        <div
          className="mt-8 rounded-lg border border-dashed border-border p-6 text-center"
          data-testid="timeline-empty"
        >
          <p className="text-sm text-muted-foreground">
            {dictionary.emptyTitle}
          </p>
          <button
            type="button"
            onClick={clearFilters}
            className="mt-4 rounded-md bg-brand px-3 py-2 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {dictionary.clearFilters}
          </button>
        </div>
      ) : null}

      <ol className="mt-8">
        {entries.map((entry) => (
          <Entry
            key={entry.id}
            entry={entry}
            locale={locale}
            dictionary={dictionary}
            tagLabels={tagLabels}
            hidden={!visibleIds.has(entry.id)}
            open={expanded.includes(entry.id)}
            onToggle={() =>
              setExpanded((current) =>
                current.includes(entry.id)
                  ? current.filter((id) => id !== entry.id)
                  : [...current, entry.id],
              )
            }
          />
        ))}
      </ol>

      {isFiltered && visibleIds.size > 0 ? (
        <button
          type="button"
          onClick={clearFilters}
          className="mt-6 text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
        >
          {dictionary.showEverything}
        </button>
      ) : null}
    </div>
  );
}

function FilterButton({
  pressed,
  onClick,
  children,
}: {
  pressed: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={`rounded-full border px-3 py-1.5 font-mono text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${
        pressed
          ? "border-brand bg-brand text-brand-foreground"
          : "border-border text-muted-foreground hover:bg-accent hover:text-accent-foreground"
      }`}
    >
      {children}
    </button>
  );
}

type EntryProps = {
  entry: TimelineEntry;
  locale: Locale;
  dictionary: Dictionary["timeline"];
  tagLabels: Dictionary["tags"];
  hidden: boolean;
  open: boolean;
  onToggle: () => void;
};

function Entry({
  entry,
  locale,
  dictionary,
  tagLabels,
  hidden,
  open,
  onToggle,
}: EntryProps) {
  const hasDetail =
    Boolean(entry.summary) ||
    entry.highlights.length > 0 ||
    Boolean(entry.roles?.length);

  return (
    // Se queda en el DOM y colapsa a altura cero, para que entrada y salida
    // se animen. inert lo saca del foco y del arbol de accesibilidad.
    <li
      data-testid="timeline-entry"
      data-hidden={hidden}
      inert={hidden}
      aria-hidden={hidden}
      className="timeline-entry"
    >
      <div className="timeline-entry-inner">
        <div className="relative border-l border-border py-5 pl-6">
          <span
            className="absolute top-6 -left-[0.3125rem] size-2.5 rounded-full border border-border bg-background"
            aria-hidden="true"
          />

          <p className="font-mono text-xs text-muted-foreground">
            {formatRange(
              String(entry.start),
              entry.end === null ? null : String(entry.end),
              locale,
              dictionary.present,
            )}
          </p>

          <h3 className="mt-1 font-display text-lg font-medium">
            {entry.role[locale]}
          </h3>

          {entry.org ? (
            <p className="text-sm text-muted-foreground">{entry.org}</p>
          ) : null}

          {entry.tags.length > 0 ? (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {entry.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded border border-border px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground"
                >
                  {tagLabels[tag]}
                </li>
              ))}
            </ul>
          ) : null}

          {entry.summary ? (
            <p className="mt-3 max-w-prose text-sm text-pretty text-muted-foreground">
              {entry.summary[locale]}
            </p>
          ) : null}

          {hasDetail && (entry.roles?.length || entry.highlights.length) ? (
            <>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`detail-${entry.id}`}
                onClick={onToggle}
                className="mt-3 inline-flex items-center gap-1 text-sm text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
              >
                {open ? dictionary.collapse : dictionary.expand}
                <ChevronDownIcon
                  className={`size-3.5 transition-transform ${open ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>

              <div id={`detail-${entry.id}`} hidden={!open} className="mt-4">
                {entry.roles?.length ? (
                  <>
                    <p className="font-mono text-[0.6875rem] tracking-[0.14em] text-muted-foreground uppercase">
                      {dictionary.roles}
                    </p>
                    <ul className="mt-2 space-y-1.5">
                      {entry.roles.map((role) => (
                        <li
                          key={`${entry.id}-${role.start}`}
                          className="flex flex-wrap items-baseline gap-x-3 text-sm"
                        >
                          <span className="font-medium">
                            {role.role[locale]}
                          </span>
                          <span className="font-mono text-xs text-muted-foreground">
                            {formatRange(
                              String(role.start),
                              role.end === null ? null : String(role.end),
                              locale,
                              dictionary.present,
                            )}
                          </span>
                          {role.context ? (
                            <span className="text-xs text-muted-foreground">
                              {role.context[locale]}
                            </span>
                          ) : null}
                        </li>
                      ))}
                    </ul>
                  </>
                ) : null}

                {entry.highlights.length > 0 ? (
                  <ul className="mt-3 space-y-2">
                    {entry.highlights.map((highlight) => (
                      <li
                        key={highlight[locale]}
                        className="max-w-prose text-sm text-pretty text-muted-foreground"
                      >
                        {highlight[locale]}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </div>
            </>
          ) : null}
        </div>
      </div>
    </li>
  );
}
