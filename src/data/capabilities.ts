import { z } from "zod";
import { capabilitySchema, TODO, type Capability } from "./schema";

/**
 * Competencias destacadas, la seccion de "features" de la pagina.
 * Cada una apunta a un tag del enum, para que filtrar por una competencia
 * en la timeline y leerla aqui sean lo mismo.
 *
 * Los nombres de icono son de lucide y se resuelven con un mapa explicito
 * en el componente, no por nombre dinamico.
 */
export const capabilities: Capability[] = z.array(capabilitySchema).parse([
  {
    id: "discovery",
    tag: "discovery",
    icon: "search",
    title: { es: "Discovery", en: "Discovery" },
    description: { es: TODO, en: TODO },
  },
  {
    id: "strategy",
    tag: "strategy",
    icon: "compass",
    title: { es: "Estrategia de producto", en: "Product strategy" },
    description: { es: TODO, en: TODO },
  },
  {
    id: "delivery",
    tag: "delivery",
    icon: "rocket",
    title: { es: "Delivery", en: "Delivery" },
    description: { es: TODO, en: TODO },
  },
  {
    id: "data",
    tag: "data",
    icon: "chart-column",
    title: { es: "Datos", en: "Data" },
    description: { es: TODO, en: TODO },
  },
  {
    id: "ai",
    tag: "ai",
    icon: "sparkles",
    title: { es: "IA aplicada", en: "Applied AI" },
    description: { es: TODO, en: TODO },
  },
  {
    id: "agile",
    tag: "agile",
    icon: "refresh-cw",
    title: { es: "Agilidad", en: "Agile" },
    description: { es: TODO, en: TODO },
  },
]);
