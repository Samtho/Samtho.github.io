import { z } from "zod";
import { timelineEntrySchema, TODO, type TimelineEntry } from "./schema";

/**
 * Año desde el que arranca el filtro por defecto de la timeline.
 * Lo anterior sigue en los datos y aparece al quitar filtros: el arranque
 * como ingeniero de telecomunicaciones es parte del relato.
 */
export const DEFAULT_TIMELINE_FROM = "2018";

/**
 * Trayectoria completa: trabajo, formacion y certificaciones.
 *
 * Los empleadores y los clientes aparecen aqui como contexto de un rol, que es
 * historial laboral publico. Lo que nunca entra es el detalle de sus proyectos,
 * sistemas o metricas: para eso esta la lista negra, que aplica a projects.
 *
 * El campo summary es opcional. Se rellena cuando aporta algo.
 */
export const timeline: TimelineEntry[] = z.array(timelineEntrySchema).parse([
  {
    id: "giunti-product-owner",
    kind: "work",
    org: "Giunti Psychometrics",
    start: "2026-02",
    end: null,
    role: { es: "Product Owner", en: "Product Owner" },
    summary: {
      es: "Product Owner del canal de ecommerce global: 22 sitios en España, Italia, LATAM y Europa del Este, para mercados de psicología clínica, evaluación de RRHH y educación. Estructuré el proceso de equipo y de sprint en un canal que no tenía propiedad de producto previa, con gobernanza de tablero, flujos de validación y coordinación de despliegues entre equipos de tres países.",
      en: "Product Owner of the global ecommerce channel: 22 sites across Spain, Italy, LATAM and Eastern Europe, serving the clinical psychology, HR assessment and education markets. I structured the team and sprint process in a channel with no prior product ownership, with board governance, validation flows and release coordination across teams in three countries.",
    },
    highlights: [],
    tags: ["delivery", "stakeholders", "strategy"],
  },
  {
    // Una sola entrada de organizacion: la progresion de Product Manager a
    // Agile Lead es parte de lo que cuenta la historia.
    id: "ntt-data",
    kind: "work",
    org: "NTT DATA Europe & Latam",
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
        context: { es: "Cliente: Banco de Chile", en: "Client: Banco de Chile" },
      },
      {
        role: { es: "Product Manager", en: "Product Manager" },
        start: "2019-09",
        end: "2020-06",
        context: { es: "Cliente: Enel Chile", en: "Client: Enel Chile" },
      },
    ],
    summary: {
      es: "Casi seis años y cuatro roles, de Product Manager a Agile Lead. Lideré transformaciones ágiles en equipos distribuidos de Chile y LATAM, con clientes de banca y utilities. Facilité más de cincuenta sesiones de planificación y retrospectiva, y trabajé la relación con stakeholders en organizaciones grandes y con prioridades en conflicto.",
      en: "Almost six years and four roles, from Product Manager to Agile Lead. I led agile transformations across distributed teams in Chile and LATAM, with clients in banking and utilities. I facilitated more than fifty planning and retrospective sessions, and worked the stakeholder relationship in large organisations with conflicting priorities.",
    },
    highlights: [],
    tags: ["agile", "stakeholders", "delivery", "discovery"],
  },
  {
    id: "chattigo",
    kind: "work",
    org: "Chattigo",
    start: "2018-09",
    end: "2019-09",
    role: { es: "Product Owner", en: "Product Owner" },
    summary: {
      es: "Plataforma de chatbots. Implementación para Telefónica del Perú (Movistar) y clientes en Chile y México.",
      en: "Chatbot platform. Rollout for Telefónica del Perú (Movistar) and clients in Chile and Mexico.",
    },
    highlights: [],
    tags: ["delivery", "stakeholders"],
  },
  {
    id: "wultu",
    kind: "work",
    org: "Wultu Consultora ISAP",
    start: "2018-02",
    end: "2018-07",
    role: { es: "Product Owner", en: "Product Owner" },
    highlights: [],
    tags: ["delivery"],
  },
  {
    id: "kupos-technical-product-owner",
    kind: "work",
    org: "Kupos.cl",
    start: "2017-02",
    end: "2018-01",
    role: {
      es: "Technical Product Owner",
      en: "Technical Product Owner",
    },
    highlights: [],
    tags: ["delivery", "discovery"],
  },
  {
    id: "kupos-ingeniero-operaciones",
    kind: "work",
    org: "Kupos.cl",
    start: "2016-02",
    end: "2017-01",
    role: {
      es: "Ingeniero de Operaciones",
      en: "Operations Engineer",
    },
    highlights: [],
    tags: [],
  },
  {
    id: "beconsult",
    kind: "work",
    org: "Beconsult",
    start: "2015-03",
    end: "2015-12",
    role: { es: "Programador", en: "Developer" },
    highlights: [],
    tags: [],
  },
  {
    id: "inelectra",
    kind: "work",
    org: "Inelectra",
    start: "2013-11",
    end: "2015-03",
    role: {
      es: "Ingeniero de Proyectos de Telecomunicaciones",
      en: "Telecommunications Project Engineer",
    },
    highlights: [],
    tags: [],
  },
  {
    id: "banco-central-venezuela",
    kind: "work",
    org: "Banco Central de Venezuela",
    start: "2013-07",
    end: "2013-09",
    role: {
      es: "Pasante de Ingeniería de Telecomunicaciones",
      en: "Telecommunications Engineering Intern",
    },
    highlights: [],
    tags: [],
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
    id: "kaplan-english",
    kind: "education",
    org: "Kaplan International College London",
    start: "2024-04",
    end: "2024-07",
    role: { es: "Programa de inglés", en: "English programme" },
    highlights: [],
    tags: [],
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
    highlights: [],
    tags: ["strategy"],
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
    highlights: [],
    tags: [],
  },
  {
    // Queda por verificar si Sam ademas tiene la certificacion SAFe RTE
    // (Release Train Engineer), que menciono en conversaciones anteriores.
    id: "safe-lean-portfolio-manager",
    kind: "certification",
    org: "Scaled Agile, Inc.",
    start: "2023",
    end: null,
    role: {
      es: "SAFe 6 Lean Portfolio Manager",
      en: "SAFe 6 Lean Portfolio Manager",
    },
    highlights: [],
    // Es de nivel portfolio, no de tren de entrega.
    tags: ["strategy", "agile"],
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
    highlights: [],
    tags: ["agile", "delivery"],
  },
  {
    id: "okr-foundation",
    kind: "certification",
    org: TODO,
    start: "2022",
    end: null,
    role: {
      es: "Certified OKR Foundation",
      en: "Certified OKR Foundation",
    },
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
    highlights: [],
    tags: ["agile"],
  },
]);
