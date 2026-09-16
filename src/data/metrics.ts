import { z } from "zod";
import { metricSchema, type Metric } from "./schema";

/**
 * Numeros de la trayectoria. Las cuatro que Sam decidio publicar.
 * Todas tienen que poder defenderse en una entrevista.
 */
export const metrics: Metric[] = z.array(metricSchema).parse([
  {
    id: "experience",
    value: 10,
    suffix: "+",
    label: {
      es: "años en producto y agilidad",
      en: "years in product and agile",
    },
  },
  {
    id: "reach",
    value: 4,
    label: {
      es: "regiones y 3 países coordinados",
      en: "regions and 3 countries coordinated",
    },
  },
  {
    id: "certifications",
    value: 4,
    label: {
      es: "certificaciones en marcos de producto y agilidad",
      en: "certifications in product and agile frameworks",
    },
  },
  {
    id: "agility-index",
    value: 3.6,
    baseline: 3.1,
    suffix: "/5",
    label: {
      es: "índice de agilidad de equipo",
      en: "team agility index",
    },
    source: {
      es: "Medido con Scrum of Scrums en una organización del sector financiero.",
      en: "Measured with Scrum of Scrums at a financial services organisation.",
    },
  },
]);
