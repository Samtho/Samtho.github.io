import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { LanguageToggle } from "./LanguageToggle";
import { Spine } from "./Spine";
import { ThemeToggle } from "./ThemeToggle";
import { Capabilities } from "./sections/Capabilities";
import { Cta } from "./sections/Cta";
import { Faq } from "./sections/Faq";
import { Hero } from "./sections/Hero";
import { Method } from "./sections/Method";
import { Metrics } from "./sections/Metrics";
import { Proof } from "./sections/Proof";
import { Timeline } from "./sections/Timeline";
import { Projects } from "./sections/Projects";

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

      <header className="sticky top-0 z-40 border-b border-border bg-background/85 backdrop-blur">
        <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-4 px-6 py-3">
          <a
            href="#hero"
            className="font-display text-sm font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {profile.name}
          </a>
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

      <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-6">
        <div className="spine">
          <Hero locale={locale} dictionary={dictionary} />
          <Proof dictionary={dictionary} />
          <Method locale={locale} dictionary={dictionary} />
          <Capabilities locale={locale} dictionary={dictionary} />

          <Timeline locale={locale} dictionary={dictionary} />

          <Projects locale={locale} dictionary={dictionary} />
          <Metrics locale={locale} dictionary={dictionary} />
          <Faq locale={locale} dictionary={dictionary} />
          <Cta dictionary={dictionary} />
        </div>
      </main>

      <footer className="mx-auto w-full max-w-4xl px-6 py-10">
        <p className="border-t border-border pt-6 font-mono text-xs text-muted-foreground">
          {profile.name} · {new Date().getFullYear()}
        </p>
      </footer>

      <Spine />
    </div>
  );
}
