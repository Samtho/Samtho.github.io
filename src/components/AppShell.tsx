import { profile } from "@/data/profile";
import { projects, publicProjects } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import { getDictionary } from "@/i18n/getDictionary";
import { hasCv } from "@/lib/assets";
import { navGroups } from "@/lib/nav";
import { Avatar } from "./Avatar";
import { LanguageToggle } from "./LanguageToggle";
import { MobileNav } from "./MobileNav";
import { NavHighlight } from "./NavHighlight";
import { Sidebar } from "./Sidebar";
import { ThemeToggle } from "./ThemeToggle";
import { AppPanel } from "./panels/AppPanel";
import { AppsIndex } from "./panels/AppsIndex";
import { Overview } from "./panels/Overview";
import {
  CapabilitiesPanel,
  FaqPanel,
  MethodPanel,
  TimelinePanel,
} from "./panels/ProfilePanels";

type Props = {
  locale: Locale;
};

export function AppShell({ locale }: Props) {
  const dictionary = getDictionary(locale);
  const groups = navGroups(dictionary);

  const nameOf = (id?: string) =>
    id ? projects.find((project) => project.id === id)?.name : undefined;

  return (
    // El lang va aqui ademas de en <html>: las dos rutas comparten el root
    // layout, asi que este es el elemento que marca el idioma real del texto.
    <div lang={locale} className="flex min-h-dvh">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-lg focus:bg-brand focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-brand-foreground"
      >
        {dictionary.nav.skipToContent}
      </a>

      <aside className="sticky top-0 hidden h-dvh w-[17rem] shrink-0 md:block">
        <Sidebar locale={locale} dictionary={dictionary} />
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border bg-background/95 px-5 py-3 backdrop-blur md:hidden">
          <a href="#overview" className="flex items-center gap-2.5">
            <Avatar name={profile.name} className="size-8 text-xs" />
            <span className="font-display text-sm font-semibold">
              {profile.name}
            </span>
          </a>
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
        </header>

        <main id="main" className="mx-auto w-full max-w-4xl flex-1 pb-24 md:pb-0">
          <Overview locale={locale} dictionary={dictionary} />
          <TimelinePanel locale={locale} dictionary={dictionary} />
          <MethodPanel locale={locale} dictionary={dictionary} />
          <CapabilitiesPanel locale={locale} dictionary={dictionary} />
          <FaqPanel locale={locale} dictionary={dictionary} />
          <AppsIndex locale={locale} dictionary={dictionary} />

          {publicProjects().map((project) => (
            <AppPanel
              key={project.id}
              project={project}
              locale={locale}
              dictionary={dictionary}
              relatedName={nameOf(project.related)}
            />
          ))}
        </main>
      </div>

      <MobileNav
        groups={groups}
        dictionary={dictionary}
        locale={locale}
        hasCv={hasCv}
        cvPath={profile.cvPath}
      />
      <NavHighlight fallback="overview" />
    </div>
  );
}
