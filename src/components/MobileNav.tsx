"use client";

import {
  ClockIcon,
  DownloadIcon,
  LayoutGridIcon,
  MenuIcon,
  UserIcon,
  XIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import type { NavGroup } from "@/lib/nav";
import { LanguageToggle } from "./LanguageToggle";
import { Pending } from "./Pending";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  groups: NavGroup[];
  dictionary: Dictionary;
  locale: Locale;
  /** Se resuelve en build time, asi que llega por props. */
  hasCv: boolean;
  cvPath: string;
};

/**
 * Barra inferior de cuatro pestanas. "Mas" abre una hoja con el resto de
 * grupos, porque en movil no caben catorce destinos en pantalla.
 */
export function MobileNav({
  groups,
  dictionary,
  locale,
  hasCv,
  cvPath,
}: Props) {
  const [open, setOpen] = useState(false);

  // Cerrar la hoja al navegar: el hash cambia y el panel ya es otro.
  useEffect(() => {
    function close() {
      setOpen(false);
    }
    window.addEventListener("hashchange", close);
    return () => window.removeEventListener("hashchange", close);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const tabs = [
    { id: "overview", label: dictionary.sidebar.overview, Icon: UserIcon },
    { id: "apps", label: dictionary.sidebar.groupApps, Icon: LayoutGridIcon },
    { id: "timeline", label: dictionary.sections.timeline, Icon: ClockIcon },
  ];

  return (
    <>
      <nav
        aria-label={dictionary.sidebar.nav}
        className="fixed inset-x-0 bottom-0 z-40 grid grid-cols-4 border-t border-border bg-background/95 backdrop-blur md:hidden"
      >
        {tabs.map(({ id, label, Icon }) => (
          <a
            key={id}
            href={`#${id}`}
            data-nav={id}
            className="flex flex-col items-center gap-1 py-2.5 text-[0.6875rem] text-muted-foreground transition-colors aria-[current=page]:text-brand"
          >
            <Icon className="size-5" aria-hidden="true" />
            {label}
          </a>
        ))}

        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          className="flex flex-col items-center gap-1 py-2.5 text-[0.6875rem] text-muted-foreground"
        >
          <MenuIcon className="size-5" aria-hidden="true" />
          {dictionary.mobile.more}
        </button>
      </nav>

      {open ? (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-background md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label={dictionary.mobile.more}
        >
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <p className="font-display font-semibold">
              {dictionary.mobile.more}
            </p>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label={dictionary.mobile.close}
              className="rounded-lg border border-border p-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <XIcon className="size-4" aria-hidden="true" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4">
            {groups.map((group) => (
              <div key={group.label} className="mt-5 first:mt-0">
                <p className="px-2 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
                  {group.label}
                </p>
                <ul className="mt-2">
                  {group.items.map((item) => (
                    <li key={item.id}>
                      <a
                        href={`#${item.id}`}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between gap-2 rounded-lg px-2 py-2 text-sm hover:bg-accent"
                      >
                        <span className="truncate">{item.label}</span>
                        {item.count === undefined ? null : (
                          <span className="shrink-0 font-mono text-xs text-muted-foreground">
                            {item.count}
                          </span>
                        )}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-border px-4 py-4">
            <div className="flex items-center gap-2">
              <LanguageToggle
                locale={locale}
                label={dictionary.nav.languageLabel}
                short={dictionary.nav.languageShort}
              />
              <ThemeToggle
                toDark={dictionary.nav.themeToDark}
                toLight={dictionary.nav.themeToLight}
              />
            </div>

            {hasCv ? (
              <a
                href={cvPath}
                download
                className="mt-3 flex items-center justify-center gap-2 rounded-lg bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground"
              >
                <DownloadIcon className="size-4" aria-hidden="true" />
                {dictionary.cta.cv}
              </a>
            ) : (
              <p className="mt-3 flex items-center justify-center gap-2 font-mono text-[0.6875rem] text-muted-foreground">
                {dictionary.cta.cv}
                <Pending />
              </p>
            )}
          </div>
        </div>
      ) : null}
    </>
  );
}
