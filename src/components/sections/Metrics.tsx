"use client";

import { useEffect, useRef, useState } from "react";
import { metrics } from "@/data/metrics";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
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
                <Counter
                  value={metric.value}
                  baseline={metric.baseline}
                  locale={locale}
                />
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

type CounterProps = {
  /** Puede venir como marcador si la metrica no tiene cifra todavia. */
  value: number | string;
  baseline?: number;
  locale: Locale;
};

/**
 * Cuenta hasta el valor cuando entra en pantalla.
 * Con prefers-reduced-motion pinta la cifra final y no anima nada.
 */
function Counter({ value, baseline, locale }: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const target = typeof value === "number" ? value : 0;
  const [shown, setShown] = useState(target);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    if (reduced) {
      setStarted(true);
      setShown(target);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0]?.isIntersecting) return;
        observer.disconnect();
        setStarted(true);

        const from = baseline ?? 0;
        const duration = 900;
        const startedAt = performance.now();

        function step(now: number) {
          const progress = Math.min((now - startedAt) / duration, 1);
          // easeOutCubic: arranca rapido y frena, se lee mejor que lineal
          const eased = 1 - Math.pow(1 - progress, 3);
          setShown(from + (target - from) * eased);
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [target, baseline, started]);

  // Antes de entrar en pantalla se muestra ya el valor final, para que quien
  // no ejecute el observador siga leyendo la cifra correcta.
  const decimals = Number.isInteger(target) ? 0 : 1;
  const display = new Intl.NumberFormat(locale, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(started ? shown : target);

  return (
    <span ref={ref}>
      {baseline !== undefined ? (
        <span className="text-muted-foreground">
          {new Intl.NumberFormat(locale, {
            minimumFractionDigits: decimals,
            maximumFractionDigits: decimals,
          }).format(baseline)}
          <span className="px-1 text-brand">→</span>
        </span>
      ) : null}
      {display}
    </span>
  );
}
