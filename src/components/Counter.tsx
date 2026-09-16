"use client";

import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/i18n/config";

type Props = {
  value: number;
  baseline?: number;
  locale: Locale;
};

/**
 * Cuenta hasta el valor cuando entra en pantalla.
 * Con prefers-reduced-motion pinta la cifra final y no anima nada.
 */
export function Counter({ value, baseline, locale }: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [shown, setShown] = useState(value);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || started) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setStarted(true);
      setShown(value);
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
          setShown(from + (value - from) * eased);
          if (progress < 1) requestAnimationFrame(step);
        }

        requestAnimationFrame(step);
      },
      { threshold: 0.4 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [value, baseline, started]);

  const decimals = Number.isInteger(value) ? 0 : 1;
  const format = (input: number) =>
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(input);

  return (
    <span ref={ref}>
      {baseline !== undefined ? (
        <span className="text-muted-foreground">
          {format(baseline)}
          <span className="px-1 text-brand" aria-hidden="true">
            →
          </span>
        </span>
      ) : null}
      {/* Sin el observador, se lee ya la cifra final y no un cero. */}
      {format(started ? shown : value)}
    </span>
  );
}
