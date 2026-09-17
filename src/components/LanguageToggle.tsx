"use client";

import Link from "next/link";
import type { MouseEvent } from "react";
import { localePath, type Locale } from "@/i18n/config";

type Props = {
  locale: Locale;
  label: string;
  short: string;
};

export function LanguageToggle({ locale, label, short }: Props) {
  const target = locale === "es" ? localePath.en : localePath.es;

  /**
   * Conserva el panel al cambiar de idioma: si estabas en #jano, sigues ahi
   * en el otro idioma.
   *
   * Navegacion completa y no router.push: los paneles se enrutan con :target,
   * y el navegador no reevalua esa pseudoclase en una navegacion de cliente.
   */
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    const { hash } = window.location;
    if (!hash) return;
    event.preventDefault();
    window.location.assign(`${target}${hash}`);
  }

  return (
    <Link
      href={target}
      hrefLang={locale === "es" ? "en" : "es"}
      onClick={handleClick}
      aria-label={label}
      title={label}
      className="rounded-md border border-border px-2.5 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
    >
      {short}
    </Link>
  );
}
