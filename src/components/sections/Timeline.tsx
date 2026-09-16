import { DEFAULT_TIMELINE_FROM, timeline } from "@/data/timeline";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "../Section";
import { TimelineBrowser } from "../TimelineBrowser";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

/**
 * Envoltorio de servidor. Los datos se pasan por props para que Zod y los
 * archivos de src/data no acaben en el bundle del navegador.
 */
export function Timeline({ locale, dictionary }: Props) {
  const entries = [...timeline].sort((a, b) =>
    String(b.start).localeCompare(String(a.start)),
  );

  return (
    <Section id="timeline" title={dictionary.sections.timeline}>
      <TimelineBrowser
        entries={entries}
        locale={locale}
        dictionary={dictionary.timeline}
        tagLabels={dictionary.tags}
        recentFrom={DEFAULT_TIMELINE_FROM}
      />
    </Section>
  );
}
