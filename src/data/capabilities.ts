import { z } from "zod";
import { capabilitySchema, type Capability } from "./schema";

/**
 * Competencias destacadas, la seccion de "features" de la pagina.
 *
 * Son exactamente las siete del enum: una competencia por tag, sin huecos.
 * Un test lo comprueba, para que anadir un tag obligue a describirlo.
 *
 * Los textos en espanol son los aprobados por Sam. El ingles es traduccion
 * pendiente de su revision. Los nombres de icono son de lucide y se resuelven
 * con un mapa explicito en el componente, no por nombre dinamico.
 */
export const capabilities: Capability[] = z.array(capabilitySchema).parse([
  {
    id: "discovery",
    tag: "discovery",
    icon: "search",
    title: { es: "Discovery", en: "Discovery" },
    description: {
      es: "Entender el problema antes de construir. Hablar con quien lo sufre y separar el síntoma de la causa.",
      en: "Understand the problem before building. Talk to the people living it and separate the symptom from the cause.",
    },
  },
  {
    id: "strategy",
    tag: "strategy",
    icon: "compass",
    title: { es: "Estrategia", en: "Strategy" },
    description: {
      es: "Decidir qué entra y qué espera, con un porqué que resiste la pregunta de cualquiera.",
      en: "Decide what ships and what waits, with a rationale that holds up to anyone's question.",
    },
  },
  {
    id: "delivery",
    tag: "delivery",
    icon: "rocket",
    title: { es: "Delivery", en: "Delivery" },
    description: {
      es: "Llevar producto a producción en entornos con varios países, varios equipos y ninguna estructura previa.",
      en: "Ship product in settings with several countries, several teams and no structure in place.",
    },
  },
  {
    id: "data",
    tag: "data",
    icon: "chart-column",
    title: { es: "Datos", en: "Data" },
    description: {
      es: "Convertir datos en decisiones con Python, SQL y Power BI, y reconocer cuándo los datos todavía no alcanzan.",
      en: "Turn data into decisions with Python, SQL and Power BI, and recognise when the data is not enough yet.",
    },
  },
  {
    id: "ai",
    tag: "ai",
    icon: "sparkles",
    title: { es: "IA aplicada", en: "Applied AI" },
    description: {
      es: "Usar IA dentro del sistema de trabajo diario, en flujos que cierran el hueco entre una reunión y una acción.",
      en: "Use AI inside the daily working system, in flows that close the gap between a meeting and an action.",
    },
  },
  {
    id: "agile",
    tag: "agile",
    icon: "refresh-cw",
    title: { es: "Agilidad", en: "Agile" },
    description: {
      es: "Facilitar equipos y marcos de trabajo manteniendo el foco en el resultado.",
      en: "Facilitate teams and frameworks while keeping the focus on the outcome.",
    },
  },
  {
    id: "stakeholders",
    tag: "stakeholders",
    icon: "users",
    title: { es: "Stakeholders", en: "Stakeholders" },
    description: {
      es: "Coordinar áreas, equipos y países que no comparten prioridades ni huso horario.",
      en: "Coordinate areas, teams and countries that share neither priorities nor time zone.",
    },
  },
]);
