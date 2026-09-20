import { profile } from "@/data/profile";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { hasCv } from "@/lib/assets";
import { navGroups, type NavGroup } from "@/lib/nav";
import { Avatar } from "./Avatar";
import { LanguageToggle } from "./LanguageToggle";
import { Pending } from "./Pending";
import { ThemeToggle } from "./ThemeToggle";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

export function Sidebar({ locale, dictionary }: Props) {
  const groups = navGroups(dictionary);

  return (
    <div className="flex h-full flex-col border-r border-border bg-sidebar">
      <div className="px-5 py-6">
        <div className="flex items-center gap-3">
          <Avatar name={profile.name} className="size-10 text-sm" />
          <div className="min-w-0">
            <p className="truncate font-display font-semibold">{profile.name}</p>
            <p className="font-mono text-[0.6875rem] leading-tight text-muted-foreground">
              {dictionary.sidebar.role}
            </p>
          </div>
        </div>

        <p className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <span
            className="size-2 shrink-0 rounded-full bg-emerald-500"
            aria-hidden="true"
          />
          {dictionary.sidebar.availability}
        </p>
      </div>

      <nav
        aria-label={dictionary.sidebar.nav}
        className="flex-1 overflow-y-auto px-3 pb-6"
      >
        {groups.map((group) => (
          <NavGroupBlock key={group.label} group={group} />
        ))}
      </nav>

      <div className="border-t border-border px-5 py-4">
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

        {/**
         * Solo el marcador. El boton de descarga es una llamada a la accion y
         * esas viven todas juntas en la portada, al lado del nombre.
         */}
        {hasCv ? null : (
          <p className="mt-3 flex items-center justify-center gap-2 font-mono text-[0.6875rem] text-muted-foreground">
            {dictionary.cta.cv}
            <Pending />
          </p>
        )}
      </div>
    </div>
  );
}

export function NavGroupBlock({ group }: { group: NavGroup }) {
  return (
    <div className="mt-5 first:mt-0">
      <p className="px-2 font-mono text-[0.625rem] tracking-[0.18em] text-muted-foreground uppercase">
        {group.label}
      </p>
      <ul className="mt-2">
        {group.items.map((item) => (
          <li key={item.id}>
            <a
              href={`#${item.id}`}
              data-nav={item.id}
              className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring aria-[current=page]:bg-accent aria-[current=page]:font-medium"
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
  );
}
