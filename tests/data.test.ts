import { describe, expect, it } from "vitest";
import { capabilities } from "@/data/capabilities";
import { faq } from "@/data/faq";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { projects } from "@/data/projects";
import {
  capabilitySchema,
  faqItemSchema,
  metricSchema,
  profileSchema,
  projectSchema,
  timelineEntrySchema,
  TODO,
  yearMonthSchema,
} from "@/data/schema";
import { timeline } from "@/data/timeline";
import { dataModules, walk } from "./helpers";
import { z } from "zod";

// Importar cada archivo ya lo valida, porque llaman a parse al exportar.
// Volver a parsear aqui deja la garantia explicita y falla con un mensaje util.
describe("los datos cumplen su esquema", () => {
  it("profile", () => {
    expect(() => profileSchema.parse(profile)).not.toThrow();
  });

  it("timeline", () => {
    expect(() => z.array(timelineEntrySchema).parse(timeline)).not.toThrow();
  });

  it("projects", () => {
    expect(() => z.array(projectSchema).parse(projects)).not.toThrow();
  });

  it("capabilities", () => {
    expect(() => z.array(capabilitySchema).parse(capabilities)).not.toThrow();
  });

  it("metrics", () => {
    expect(() => z.array(metricSchema).parse(metrics)).not.toThrow();
  });

  it("faq", () => {
    expect(() => z.array(faqItemSchema).parse(faq)).not.toThrow();
  });
});

describe("identificadores", () => {
  const collections = [
    ["timeline", timeline],
    ["projects", projects],
    ["capabilities", capabilities],
    ["metrics", metrics],
    ["faq", faq],
  ] as const;

  it.each(collections)("%s no repite ningun id", (_name, items) => {
    const ids = items.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cada competencia destacada apunta a un tag distinto", () => {
    const tags = capabilities.map((capability) => capability.tag);
    expect(new Set(tags).size).toBe(tags.length);
  });
});

describe("fechas de la timeline", () => {
  it("ninguna entrada termina antes de empezar", () => {
    for (const entry of timeline) {
      const startIsDate = yearMonthSchema.safeParse(entry.start).success;
      const endIsDate = yearMonthSchema.safeParse(entry.end).success;
      if (!startIsDate || !endIsDate) continue;

      expect(
        String(entry.end) >= String(entry.start),
        `${entry.id}: ${entry.start} -> ${entry.end}`,
      ).toBe(true);
    }
  });
});

describe("marcador de pendiente", () => {
  // Un TODO escrito de otra forma no aparece en la lista de pendientes
  // y acaba publicado. Tiene que ser siempre el literal exacto.
  it("siempre se escribe con el literal exacto", () => {
    for (const { file, value } of dataModules) {
      walk(value, (leaf, path) => {
        if (typeof leaf !== "string" || !leaf.includes("TODO")) return;
        expect(leaf, `${file} en ${path}`).toBe(TODO);
      });
    }
  });
});
