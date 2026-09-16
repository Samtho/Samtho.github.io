import { z } from "zod";
import { projectSchema, TODO, type Project } from "./schema";

/**
 * Proyectos publicables.
 *
 * Regla dura: nada de un empleador entra aqui. El esquema rechaza cualquier
 * proyecto con source "employer" y confidential false, y cualquier proyecto
 * publico que mencione un termino de la lista negra.
 */
export const projects: Project[] = z.array(projectSchema).parse([
  {
    id: "panoplia",
    name: "Panoplia",
    tagline: {
      es: "Análisis del mix de géneros de un catálogo de libros para decidir una estrategia de exportación.",
      en: "Genre mix analysis of a book catalogue to decide an export strategy.",
    },
    description: {
      es: "Trabajo de fin de máster en INESDI, publicable con permiso. Estudia si conviene cambiar el mix de géneros del catálogo de cara a la exportación. El entregable es una aplicación React y Vite con dos registros visuales, visualizaciones en ECharts y un panel para perfil analista.",
      en: "Final master's project at INESDI, published with permission. It studies whether changing the catalogue's genre mix pays off for export. The deliverable is a React and Vite application with two visual registers, ECharts visualisations and an analyst dashboard.",
    },
    year: "2026",
    role: { es: TODO, en: TODO },
    stack: ["React", "Vite", "ECharts"],
    tags: ["data", "strategy"],
    liveUrl: TODO,
    repoUrl: TODO,
    confidential: false,
    source: "academic",
  },
  {
    id: "priostack",
    name: "PrioStack",
    tagline: {
      es: "Priorización de backlog con RICE y MoSCoW, con sugerencias asistidas por IA.",
      en: "Backlog prioritisation with RICE and MoSCoW, with AI-assisted suggestions.",
    },
    description: {
      es: "Herramienta propia para priorizar backlog. Combina scoring RICE y clasificación MoSCoW, y añade sugerencias asistidas por IA. Incluye un PRD y una aplicación React funcional.",
      en: "A personal tool for backlog prioritisation. It combines RICE scoring and MoSCoW classification, and adds AI-assisted suggestions. It ships with a PRD and a working React application.",
    },
    year: TODO,
    role: { es: "Producto y desarrollo", en: "Product and development" },
    stack: ["React"],
    tags: ["strategy", "ai"],
    liveUrl: TODO,
    repoUrl: TODO,
    confidential: false,
    source: "personal",
  },
  {
    id: "portfolio",
    name: "Portfolio personal",
    tagline: {
      es: "Este mismo sitio: un CV interactivo y bilingüe con forma de landing de producto.",
      en: "This very site: an interactive, bilingual CV shaped like a product landing page.",
    },
    description: {
      es: "Sitio estático en Next.js exportado a GitHub Pages. El contenido vive en archivos TypeScript validados con Zod, las reglas de confidencialidad se comprueban en tests y cada push a main pasa por tipos, tests y build antes de publicarse.",
      en: "A static Next.js site exported to GitHub Pages. Content lives in TypeScript files validated with Zod, confidentiality rules are enforced by tests, and every push to main goes through typechecking, tests and a build before it ships.",
    },
    year: "2026",
    role: { es: "Producto y desarrollo", en: "Product and development" },
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Zod",
      "Vitest",
      "Playwright",
    ],
    tags: ["delivery"],
    liveUrl: "https://samtho.github.io",
    repoUrl: "https://github.com/Samtho/Samtho.github.io",
    confidential: false,
    source: "personal",
  },
]);

/**
 * Unica via por la que la interfaz accede a los proyectos.
 * Nada confidencial sale de aqui.
 */
export function publicProjects(): Project[] {
  return projects.filter((project) => !project.confidential);
}
