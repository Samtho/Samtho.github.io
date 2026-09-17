import { z } from "zod";
import { PENDING, projectSchema, type Project } from "./schema";

/**
 * Paneles con ficha: las apps, los analisis y el sistema de IA.
 *
 * Regla dura: nada de un empleador entra aqui. El esquema rechaza cualquier
 * entrada con source "employer" y confidential false, y cualquier entrada
 * publica que mencione un termino de la lista negra.
 */
export const projects: Project[] = z.array(projectSchema).parse([
  {
    id: "jano",
    group: "apps",
    name: "Jano",
    tagline: {
      es: "Tu CV, adaptado a cada oferta. Sin inventar nada.",
      en: "Your CV, tailored to each job ad. Without making anything up.",
    },
    year: "2026",
    problem: {
      es: "Reescribir el CV para cada oferta cuesta horas, y la IA se inventa logros que no están en el original.",
      en: "Rewriting your CV for each job ad takes hours, and AI invents achievements that were never in the original.",
    },
    role: {
      es: "Producto de principio a fin.",
      en: "Product end to end.",
    },
    decision: {
      es: "Guardarraíl anti-invención. Cada bullet del CV adaptado es trazable a su origen en el CV real.",
      en: "An anti-fabrication guardrail. Every bullet in the tailored CV traces back to its source in the real one.",
    },
    stack: ["Next.js 16", "n8n", "Supabase pgvector", "OpenAI", "pdfjs"],
    tags: ["ai", "discovery", "delivery"],
    liveUrl: "https://samtho.github.io/jano-web/",
    repoUrl: "https://github.com/Samtho/jano-web",
    embeds: [
      {
        label: { es: "Aplicación", en: "Application" },
        url: "https://samtho.github.io/jano-web/",
      },
    ],
    related: "umbral",
    confidential: false,
    source: "personal",
  },
  {
    id: "umbral",
    group: "apps",
    name: "Umbral",
    tagline: {
      es: "No postules a ciegas.",
      en: "Do not apply blind.",
    },
    year: "2026",
    problem: {
      es: "Todos los productos del mercado te optimizan a ti para la oferta. Nadie evalúa si la oferta merece tu tiempo.",
      en: "Every product out there optimises you for the job ad. Nobody evaluates whether the ad deserves your time.",
    },
    role: {
      es: "Producto de principio a fin.",
      en: "Product end to end.",
    },
    decision: {
      es: "Invertir el espejo. Veredicto de tres estados sobre la oferta, y el CV deja de ser un PDF para ser un enlace verificable.",
      en: "Flip the mirror. A three-state verdict on the job ad, and the CV stops being a PDF and becomes a verifiable link.",
    },
    stack: ["Next.js 16", "Procesamiento en navegador", "Sin registro"],
    tags: ["ai", "strategy", "discovery"],
    liveUrl: "https://samtho.github.io/umbral/",
    repoUrl: "https://github.com/Samtho/umbral",
    embeds: [
      {
        label: { es: "Aplicación", en: "Application" },
        url: "https://samtho.github.io/umbral/",
      },
    ],
    related: "jano",
    confidential: false,
    source: "personal",
  },
  {
    id: "aura-closet",
    group: "apps",
    name: "Aura Closet",
    tagline: {
      es: "Prototipo de gestión de armario personal: inventario, outfits, calendario de uso y recomendaciones con IA.",
      en: "A personal wardrobe management prototype: inventory, outfits, a wear calendar and AI recommendations.",
    },
    description: {
      es: "Prototipo funcional en un solo archivo HTML con persistencia en localStorage. Siete secciones conectadas entre sí: inventario de prendas, composición de outfits, calendario, ciclo de lavado, perfil de estilo y un motor de recomendaciones que combina reglas, datos de Open-Meteo y un narrador opcional con IA.",
      en: "A working prototype in a single HTML file with localStorage persistence. Seven connected sections: garment inventory, outfit composition, calendar, laundry cycle, style profile and a recommendation engine combining rules, Open-Meteo data and an optional AI narrator.",
    },
    year: "2026",
    problem: { es: PENDING, en: PENDING },
    role: { es: "Producto y desarrollo", en: "Product and development" },
    decision: { es: PENDING, en: PENDING },
    stack: ["HTML", "CSS", "JavaScript", "Open-Meteo"],
    tags: ["discovery", "ai"],
    liveUrl: "https://samtho.github.io/Aura-closet/",
    repoUrl: "https://github.com/Samtho/Aura-closet",
    embeds: [
      {
        label: { es: "Aplicación", en: "Application" },
        url: "https://samtho.github.io/Aura-closet/",
      },
    ],
    confidential: false,
    // El README lo describe como trabajo de clase.
    source: "academic",
  },
  {
    id: "pi-planning-lite",
    group: "apps",
    name: "PI Planning Lite",
    tagline: {
      es: "Plantilla ligera de PI Planning.",
      en: "A lightweight PI Planning template.",
    },
    year: "2026",
    problem: { es: PENDING, en: PENDING },
    role: { es: PENDING, en: PENDING },
    decision: { es: PENDING, en: PENDING },
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["agile", "delivery", "strategy"],
    liveUrl: "https://samtho.github.io/fantastic-management-quarter/",
    repoUrl: "https://github.com/Samtho/fantastic-management-quarter",
    embeds: [
      {
        label: { es: "Plantilla", en: "Template" },
        url: "https://samtho.github.io/fantastic-management-quarter/",
      },
    ],
    confidential: false,
    source: "personal",
  },
  {
    id: "panoplia",
    group: "apps",
    name: "Panoplia",
    tagline: {
      es: "Análisis del mix de géneros de un catálogo de libros para decidir una estrategia de exportación.",
      en: "Genre mix analysis of a book catalogue to decide an export strategy.",
    },
    description: {
      es: "Trabajo de fin de máster en INESDI, publicable con permiso. Estudia si conviene cambiar el mix de géneros del catálogo de cara a la exportación.",
      en: "Final master's project at INESDI, published with permission. It studies whether changing the catalogue's genre mix pays off for export.",
    },
    year: "2026",
    problem: { es: PENDING, en: PENDING },
    role: { es: PENDING, en: PENDING },
    decision: { es: PENDING, en: PENDING },
    stack: ["React", "Vite", "ECharts"],
    tags: ["data", "strategy"],
    liveUrl: "https://samtho.github.io/panoplia-defensa-v4/",
    repoUrl: "https://github.com/Samtho/panoplia-defensa-v4",
    embeds: [
      {
        label: { es: "Defensa", en: "Defence" },
        url: "https://samtho.github.io/panoplia-defensa-v4/",
      },
      {
        label: { es: "Dashboard", en: "Dashboard" },
        url: "https://samtho.github.io/panoplia-dashboard/",
      },
    ],
    confidential: false,
    source: "academic",
  },
  {
    id: "the-movies-database",
    group: "apps",
    name: "The Movies Database",
    tagline: {
      es: "Catálogo personal de cine: el historial completo cruzado con 45.000 películas.",
      en: "A personal cinema catalogue: a full viewing history crossed with 45,000 films.",
    },
    year: "2026",
    problem: { es: PENDING, en: PENDING },
    role: { es: PENDING, en: PENDING },
    decision: { es: PENDING, en: PENDING },
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["data", "ai"],
    liveUrl: "https://samtho.github.io/the-movies-database/",
    repoUrl: "https://github.com/Samtho/the-movies-database",
    embeds: [
      {
        label: { es: "Aplicación", en: "Application" },
        url: "https://samtho.github.io/the-movies-database/",
      },
    ],
    confidential: false,
    source: "personal",
  },

  // Analisis. Sam rellena el contenido; la anatomia ya esta puesta.
  ...["saludplus", "grupo-b", "logifast", "rentabilidad-ml"].map((id, index) => ({
    id,
    group: "analysis" as const,
    name: ["SaludPlus", "Grupo B", "LogiFast", "Rentabilidad ML"][index],
    tagline: { es: PENDING, en: PENDING },
    year: PENDING,
    problem: { es: PENDING, en: PENDING },
    role: { es: PENDING, en: PENDING },
    decision: { es: PENDING, en: PENDING },
    stack: [],
    tags: [],
    embeds: [],
    confidential: false,
    source: "personal" as const,
  })),

  // Sistema de IA.
  ...["mis-skills", "integraciones-mcp"].map((id, index) => ({
    id,
    group: "ai" as const,
    name: ["Mis skills", "Integraciones MCP"][index],
    tagline: { es: PENDING, en: PENDING },
    year: PENDING,
    problem: { es: PENDING, en: PENDING },
    role: { es: PENDING, en: PENDING },
    decision: { es: PENDING, en: PENDING },
    stack: [],
    tags: [],
    embeds: [],
    confidential: false,
    source: "personal" as const,
  })),
]);

/**
 * Unica via por la que la interfaz accede a los proyectos.
 * Nada confidencial pasa de aqui.
 */
export function publicProjects(): Project[] {
  return projects.filter((project) => !project.confidential);
}

/** Los paneles de un grupo de la barra lateral, en orden. */
export function projectsByGroup(group: Project["group"]): Project[] {
  return publicProjects().filter((project) => project.group === group);
}
