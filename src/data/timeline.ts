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
    id: "giunti-product-owner",
    kind: "work",
    org: "Giunti Psychometrics",
    start: "2026-02",
    end: null,
    // La ficha antigua decia "Product Manager". RESPUESTAS lo da como firme:
    // Product Owner. Pendiente de que Sam confirme cual va publicado.
    role: { es: "Product Owner", en: "Product Owner" },
    // Falta el texto de la opcion B, que Sam eligio pero no llego en la ficha.
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["delivery", "stakeholders", "strategy"],
  },
  {
    // Una sola entrada de organizacion: la progresion de Product Manager a
    // Agile Lead es parte de lo que cuenta la historia.
    id: "ntt-data",
    kind: "work",
    org: "NTT DATA",
    start: "2019-09",
    end: "2025-07",
    role: { es: "Agile Lead", en: "Agile Lead" },
    roles: [
      {
        role: { es: "Agile Lead", en: "Agile Lead" },
        start: "2022-07",
        end: "2025-07",
      },
      {
        role: { es: "Product Team Leader", en: "Product Team Leader" },
        start: "2020-12",
        end: "2022-06",
      },
      {
        role: {
          es: "Agile Project Management Officer",
          en: "Agile Project Management Officer",
        },
        start: "2020-07",
        end: "2020-12",
      },
      {
        role: { es: "Product Manager", en: "Product Manager" },
        start: "2019-09",
        end: "2020-06",
      },
    ],
    // El borrador de RESPUESTAS sigue marcado como "Samuel aprueba o corrige".
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["agile", "stakeholders", "delivery", "discovery"],
  },
  {
    id: "inesdi-master-business-analytics-ia",
    kind: "education",
    org: "INESDI Business Techschool · UNIE Universidad",
    start: "2025-10",
    // Fin del programa. El certificado se emitio el 3 de septiembre de 2026,
    // que es un hito distinto.
    end: "2026-07",
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
    id: "iebs-mba-transformacion-digital",
    kind: "education",
    org: "IEBS Business School",
    start: "2021-10",
    end: "2023-02",
    role: {
      es: "MBA en Transformación Digital",
      en: "MBA in Digital Transformation",
    },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["strategy"],
  },
  {
    id: "kaplan-english",
    kind: "education",
    org: "Kaplan International College London",
    start: "2024-04",
    end: "2024-07",
    role: { es: "Programa de inglés", en: "English programme" },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: [],
  },
  {
    id: "ucab-ingenieria-telecomunicaciones",
    kind: "education",
    org: "Universidad Católica Andrés Bello",
    // Solo consta el anio, no el mes.
    start: "2007",
    end: "2013",
    role: {
      es: "Ingeniería de Telecomunicaciones",
      en: "Telecommunications Engineering",
    },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: [],
  },
  {
    // Sam confirma esta desde su CV. Queda por verificar si ademas tiene la
    // certificacion SAFe RTE (Release Train Engineer), que menciono antes.
    id: "safe-lean-portfolio-manager",
    kind: "certification",
    org: "Scaled Agile, Inc.",
    start: "2023",
    end: null,
    role: {
      es: "SAFe 6 Lean Portfolio Manager",
      en: "SAFe 6 Lean Portfolio Manager",
    },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["agile", "delivery"],
  },
  {
    id: "kanban-system-design",
    kind: "certification",
    org: "Kanban University",
    start: "2023",
    end: null,
    role: {
      es: "Kanban System Design (KSD)",
      en: "Kanban System Design (KSD)",
    },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["agile", "delivery"],
  },
  {
    id: "okr-foundation",
    kind: "certification",
    // RESPUESTAS deja la entidad certificadora por verificar.
    org: TODO,
    start: "2022",
    end: null,
    role: {
      es: "Certified OKR Foundation",
      en: "Certified OKR Foundation",
    },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["strategy"],
  },
  {
    id: "certified-scrum-master",
    kind: "certification",
    org: "Scrum Alliance",
    start: "2020",
    end: null,
    role: {
      es: "Certified Scrum Master (CSM)",
      en: "Certified Scrum Master (CSM)",
    },
    summary: { es: TODO, en: TODO },
    highlights: [],
    tags: ["agile"],
  },
]);
