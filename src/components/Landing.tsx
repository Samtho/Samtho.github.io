import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import { getDictionary, type Dictionary } from "@/i18n/getDictionary";
import { LanguageToggle } from "./LanguageToggle";
import { ThemeToggle } from "./ThemeToggle";

/**
 * Orden de las secciones de la pagina. En el Milestone 2 cada una es un hueco
 * con su titulo; el Milestone 3 las sustituye por componentes de verdad.
 */
const SECTION_IDS = [
  "proof",
  "method",
  "capabilities",
  "timeline",
  "projects",
  "metrics",
  "faq",
  "cta",
] as const satisfies ReadonlyArray<keyof Dictionary["sections"]>;

type Props = {
  locale: Locale;
};

export function Landing({ locale }: Props) {
  const dictionary = getDictionary(locale);

  return (
    // El lang va aqui ademas de en <html>: las dos rutas comparten el root
    // layout, asi que este es el elemento que marca el idioma real del texto.
    <div lang={locale} className="flex min-h-dvh flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground"
      >
        {dictionary.nav.skipToContent}
      </a>

      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur">
        <div className="mx-auto flex w-full max-w-3xl items-center justify-between gap-4 px-6 py-3">
          <span className="text-sm font-medium">{profile.name}</span>
          <nav className="flex items-center gap-2">
            <LanguageToggle
              locale={locale}
              label={dictionary.nav.languageLabel}
              short={dictionary.nav.languageShort}
            />
            <ThemeToggle
              toDark={dictionary.nav.themeToDark}
              toLight={dictionary.nav.themeToLight}
            />
          </nav>
        </div>
      </header>

      <main id="main" className="mx-auto w-full max-w-3xl flex-1 px-6">
        <section
          id="hero"
          className="flex min-h-[60svh] flex-col justify-center gap-4 py-16"
        >
          <h1 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {profile.name}
          </h1>
          <p className="max-w-prose text-lg text-pretty text-muted-foreground">
            {profile.headline[locale]}
          </p>
        </section>

        {SECTION_IDS.map((id) => (
          <section
            key={id}
            id={id}
            className="scroll-mt-20 border-t border-border py-12"
          >
            <h2 className="text-sm font-medium tracking-wide text-brand uppercase">
              {dictionary.sections[id]}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {dictionary.shell.pending}
            </p>
          </section>
        ))}
      </main>
    </div>
  );
}
