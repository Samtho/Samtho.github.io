import { metrics } from "@/data/metrics";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { Counter } from "../Counter";
import { Section } from "../Section";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Metrics({ locale, dictionary }: Props) {
  return (
    <Section id="metrics" title={dictionary.sections.metrics}>
      <dl className="grid gap-8 sm:grid-cols-2">
        {metrics.map((metric) => (
          <div key={metric.id}>
            <dt className="sr-only">{metric.label[locale]}</dt>
            <dd>
              <p className="font-display text-4xl font-semibold tracking-tight tabular-nums sm:text-5xl">
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
                  <span className="text-2xl text-brand sm:text-3xl">
                    {metric.suffix}
                  </span>
                ) : null}
              </p>
              <p className="mt-1.5 max-w-[26ch] text-sm text-pretty">
                {metric.label[locale]}
              </p>
              {metric.source ? (
                <p className="mt-1 max-w-[30ch] font-mono text-xs text-pretty text-muted-foreground">
                  {metric.source[locale]}
                </p>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
