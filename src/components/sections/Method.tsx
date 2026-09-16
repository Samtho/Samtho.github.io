import { method } from "@/data/method";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "../Section";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

/** Aqui la numeracion si dice algo: los tres pasos van en orden. */
export function Method({ locale, dictionary }: Props) {
  return (
    <Section id="method" title={dictionary.sections.method}>
      <ol className="grid gap-8 sm:grid-cols-3 sm:gap-6">
        {method.map((step, index) => (
          <li key={step.id}>
            <span className="font-mono text-xs text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 font-display text-lg font-medium text-balance">
              {step.title[locale]}
            </h3>
            <p className="mt-2 text-sm text-pretty text-muted-foreground">
              {step.description[locale]}
            </p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
