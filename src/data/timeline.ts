import { z } from "zod";
import { timelineEntrySchema, TODO, type TimelineEntry } from "./schema";

/**
 * Trayectoria completa: trabajo, formacion y certificaciones.
 *
 * Giunti y NTT DATA aparecen aqui como empleadores, con rol y fechas. Eso es
 * historial laboral publico. Lo que nunca entra es el detalle de sus proyectos,
 * sistemas o metricas: para eso esta la lista negra de projects.
 */
export const timeline: TimelineEntry[] = z.array(timelineEntrySchema).parse([
  {
    id: "giunti-product-manager",
    kind: "work",
    org: "Giunti Psychometrics",
    start: "2026-02",
    end: null,
    role: { es: "Product Manager", en: "Product Manager" },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["delivery", "stakeholders"],
  },
  {
    id: "ntt-data-agile-coach",
    kind: "work",
    org: "NTT DATA",
    start: TODO,
    end: TODO,
    role: { es: "Agile Coach", en: "Agile Coach" },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["agile"],
  },
  {
    id: "inesdi-master-business-analytics-ia",
    kind: "education",
    org: "INESDI Business Techschool · UNIE Universidad",
    start: "2025-10",
    // Fecha de emision del certificado segun la ficha. Pendiente de confirmar
    // que coincide con el fin del programa.
    end: "2026-09",
    role: {
      es: "Máster de Formación Permanente en Business Analytics e IA",
      en: "Postgraduate Master's in Business Analytics and AI",
    },
    summary: {
      es: "Edición Madrid 2510, curso 2025-2026. Diez módulos, 60 ECTS y trabajo de fin de máster. Programa apoyado en Python, SQL, Power BI, Tableau, Azure y GA4.",
      en: "Madrid 2510 cohort, 2025-2026. Ten modules, 60 ECTS and a final master's project. The programme runs on Python, SQL, Power BI, Tableau, Azure and GA4.",
    },
    highlights: [
      {
        es: "Trabajo de fin de máster: Panoplia, análisis del mix de géneros del catálogo para una estrategia de exportación.",
        en: "Final master's project: Panoplia, an analysis of catalogue genre mix for an export strategy.",
      },
    ],
    tags: ["data", "ai"],
  },
  {
    id: "safe-rte",
    kind: "certification",
    org: TODO,
    start: TODO,
    // null aqui significa que no se ha declarado caducidad.
    end: null,
    role: {
      es: "SAFe Release Train Engineer (RTE)",
      en: "SAFe Release Train Engineer (RTE)",
    },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["agile", "delivery"],
  },
]);
