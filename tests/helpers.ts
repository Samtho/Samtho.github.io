import { capabilities } from "@/data/capabilities";
import { faq } from "@/data/faq";
import { method } from "@/data/method";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import { timeline } from "@/data/timeline";

/** Todos los archivos de contenido, para los tests que recorren el conjunto. */
export const dataModules = [
  { file: "src/data/profile.ts", value: profile as unknown },
  { file: "src/data/timeline.ts", value: timeline as unknown },
  { file: "src/data/projects.ts", value: projects as unknown },
  { file: "src/data/capabilities.ts", value: capabilities as unknown },
  { file: "src/data/metrics.ts", value: metrics as unknown },
  { file: "src/data/method.ts", value: method as unknown },
  { file: "src/data/faq.ts", value: faq as unknown },
];

/** Recorre cualquier estructura y visita cada valor junto con su ruta. */
export function walk(
  value: unknown,
  visit: (value: unknown, path: string) => void,
  path = "",
): void {
  visit(value, path);

  if (Array.isArray(value)) {
    value.forEach((item, index) => walk(item, visit, `${path}[${index}]`));
    return;
  }

  if (value !== null && typeof value === "object") {
    for (const [key, child] of Object.entries(value)) {
      walk(child, visit, path ? `${path}.${key}` : key);
    }
  }
}

/** Un campo bilingue es un objeto con exactamente las claves es y en. */
export function isBilingual(
  value: unknown,
): value is { es: unknown; en: unknown } {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return false;
  }
  const keys = Object.keys(value);
  return keys.length === 2 && keys.includes("es") && keys.includes("en");
}

/** Rutas de todas las hojas de un objeto, para comparar diccionarios. */
export function leafPaths(value: unknown, prefix = ""): string[] {
  if (value === null || typeof value !== "object" || Array.isArray(value)) {
    return [prefix];
  }
  return Object.entries(value).flatMap(([key, child]) =>
    leafPaths(child, prefix ? `${prefix}.${key}` : key),
  );
}
