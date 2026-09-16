import { timeline } from "@/data/timeline";
import type { Dictionary } from "@/i18n/getDictionary";
import { Section } from "../Section";

/**
 * Sin logos de marca: solo los nombres, con tratamiento tipografico.
 * Las organizaciones salen de la timeline, que es la unica fuente de verdad.
 */
const PROOF_IDS = [
  "giunti-product-owner",
  "ntt-data",
  "inesdi-master-business-analytics-ia",
  "safe-lean-portfolio-manager",
  "iebs-mba-transformacion-digital",
  "ucab-ingenieria-telecomunicaciones",
];

export function Proof({ dictionary }: { dictionary: Dictionary }) {
  const orgs = PROOF_IDS.map(
    (id) => timeline.find((entry) => entry.id === id)?.org,
  ).filter((org): org is string => Boolean(org));

  return (
    <Section id="proof" title={dictionary.sections.proof}>
      <ul className="flex flex-wrap gap-x-6 gap-y-3">
        {orgs.map((org) => (
          <li
            key={org}
            className="font-display text-lg font-medium text-muted-foreground transition-colors hover:text-foreground sm:text-xl"
          >
            {org}
          </li>
        ))}
      </ul>
      <p className="mt-6 text-sm text-muted-foreground">
        {dictionary.proof.note}
      </p>
    </Section>
  );
}
