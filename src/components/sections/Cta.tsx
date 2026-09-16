import { ArrowUpRightIcon, DownloadIcon, MailIcon } from "lucide-react";
import { profile } from "@/data/profile";
import { PENDING } from "@/data/schema";
import type { Dictionary } from "@/i18n/getDictionary";
import { hasCv } from "@/lib/assets";
import { Pending } from "../Pending";
import { Section } from "../Section";

export function Cta({ dictionary }: { dictionary: Dictionary }) {
  const hasEmail = profile.email !== PENDING;
  const hasLinkedin = profile.linkedin !== PENDING;

  return (
    <Section id="cta" title={dictionary.sections.cta}>
      <p className="max-w-[40ch] font-display text-xl text-balance">
        {dictionary.cta.intro}
      </p>

      <ul className="mt-6 flex flex-wrap gap-3">
        {hasEmail ? (
          <li>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-2 rounded-md bg-brand px-4 py-2.5 text-sm font-medium text-brand-foreground transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <MailIcon className="size-4" aria-hidden="true" />
              {dictionary.cta.email}
            </a>
          </li>
        ) : null}

        {hasLinkedin ? (
          <li>
            <a
              href={profile.linkedin}
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              {dictionary.cta.linkedin}
              <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
            </a>
          </li>
        ) : null}

        <li>
          <a
            href={profile.github}
            className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            {dictionary.cta.github}
            <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
          </a>
        </li>

        <li>
          {hasCv ? (
            <a
              href={profile.cvPath}
              download
              className="inline-flex items-center gap-2 rounded-md border border-border px-4 py-2.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
            >
              <DownloadIcon className="size-4" aria-hidden="true" />
              {dictionary.cta.cv}
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 rounded-md border border-dashed border-border px-4 py-2.5 text-sm text-muted-foreground">
              {dictionary.cta.cv}
              <Pending />
            </span>
          )}
        </li>
      </ul>
    </Section>
  );
}
