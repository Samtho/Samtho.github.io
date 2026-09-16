import type { Locale } from "@/i18n/config";

const YEAR_ONLY = /^\d{4}$/;
const YEAR_MONTH = /^(\d{4})-(\d{2})$/;

/** Formatea YYYY-MM o YYYY segun el idioma. Lo que no encaje se deja tal cual. */
export function formatDate(value: string, locale: Locale): string {
  if (YEAR_ONLY.test(value)) return value;

  const match = YEAR_MONTH.exec(value);
  if (!match) return value;

  const date = new Date(Number(match[1]), Number(match[2]) - 1, 1);
  return new Intl.DateTimeFormat(locale, {
    month: "short",
    year: "numeric",
  }).format(date);
}

/** Rango de fechas. end null significa que sigue en curso. */
export function formatRange(
  start: string,
  end: string | null,
  locale: Locale,
  presentLabel: string,
): string {
  const from = formatDate(start, locale);
  const to = end === null ? presentLabel : formatDate(end, locale);
  return from === to ? from : `${from} — ${to}`;
}
