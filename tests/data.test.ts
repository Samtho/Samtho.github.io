import { describe, expect, it } from "vitest";
import { capabilities } from "@/data/capabilities";
import { faq } from "@/data/faq";
import { method } from "@/data/method";
import { metrics } from "@/data/metrics";
import { profile } from "@/data/profile";
import { projects, projectsByGroup } from "@/data/projects";
import {
  capabilitySchema,
  COMPETENCY_TAGS,
  faqItemSchema,
  methodStepSchema,
  metricSchema,
  profileSchema,
  projectSchema,
  timelineEntrySchema,
  TODO,
  PENDING,
  dateSchema,
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

  it("method", () => {
    expect(() => z.array(methodStepSchema).parse(method)).not.toThrow();
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
    ["method", method],
  ] as const;

  it.each(collections)("%s no repite ningun id", (_name, items) => {
    const ids = items.map((item) => item.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("cada competencia destacada apunta a un tag distinto", () => {
    const tags = capabilities.map((capability) => capability.tag);
    expect(new Set(tags).size).toBe(tags.length);
  });

  // Si se anade un tag al enum sin describirlo, el filtro existe pero la
  // seccion de competencias se queda coja. Tienen que ir a la par.
  it("hay exactamente una competencia por cada tag del enum", () => {
    const tags = capabilities.map((capability) => capability.tag).sort();
    expect(tags).toEqual([...COMPETENCY_TAGS].sort());
  });
});

describe("fechas de la timeline", () => {
  const isDate = (value: unknown) => dateSchema.safeParse(value).success;

  it("ninguna entrada termina antes de empezar", () => {
    for (const entry of timeline) {
      if (!isDate(entry.start) || !isDate(entry.end)) continue;

      expect(
        String(entry.end) >= String(entry.start),
        `${entry.id}: ${entry.start} -> ${entry.end}`,
      ).toBe(true);
    }
  });

  // Los roles anidados no pueden salirse del periodo de la organizacion.
  it("los roles anidados caben dentro de su organizacion", () => {
    for (const entry of timeline) {
      for (const role of entry.roles ?? []) {
        if (isDate(entry.start) && isDate(role.start)) {
          expect(
            String(role.start) >= String(entry.start),
            `${entry.id}: un rol empieza antes que la organizacion`,
          ).toBe(true);
        }
        if (isDate(entry.end) && isDate(role.end)) {
          expect(
            String(role.end) <= String(entry.end),
            `${entry.id}: un rol termina despues que la organizacion`,
          ).toBe(true);
        }
      }
    }
  });

  // El esquema documenta que van de mas reciente a mas antiguo, y la UI
  // los va a pintar en ese orden sin volver a ordenarlos.
  it("los roles anidados van de mas reciente a mas antiguo", () => {
    for (const entry of timeline) {
      const starts = (entry.roles ?? []).map((role) => String(role.start));
      const descending = [...starts].sort().reverse();
      expect(starts, entry.id).toEqual(descending);
    }
  });

  it("cada rol anidado termina despues de empezar", () => {
    for (const entry of timeline) {
      for (const role of entry.roles ?? []) {
        if (!isDate(role.start) || !isDate(role.end)) continue;
        expect(
          String(role.end) >= String(role.start),
          `${entry.id}: ${role.start} -> ${role.end}`,
        ).toBe(true);
      }
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

describe("marcadores visibles", () => {
  /**
   * Activa este test (quita el .skip) antes de poner la URL en el CV.
   * Mientras tanto "[por definir]" se pinta a proposito en la pagina, para
   * que los huecos se vean y se corrijan mirandolos. El dia que la web se
   * publique de verdad, ninguno puede seguir ahi.
   */
  it.skip("no queda ningun [por definir] en los datos", () => {
    const pendings: string[] = [];

    for (const { file, value } of dataModules) {
      walk(value, (leaf, path) => {
        // includes y no igualdad: el marcador puede ir incrustado en prosa,
        // como en "Trabajo en equipo del máster. [por definir]".
        if (typeof leaf === "string" && leaf.includes(PENDING)) {
          pendings.push(`${file} en ${path}`);
        }
      });
    }

    expect(pendings, pendings.join("\n")).toEqual([]);
  });
});

describe("las apps publicadas", () => {
  /** Toda URL publicada del grupo de apps: la principal y la de cada embed. */
  const publishedUrls = new Set(
    projectsByGroup("apps").flatMap((app) => [
      ...(app.liveUrl && app.liveUrl !== PENDING ? [app.liveUrl] : []),
      ...app.embeds.map((embed) => embed.url),
    ]),
  );

  // La rejilla titula "Siete aplicaciones, construidas y publicadas".
  // Si el numero deja de cuadrar, el titular miente y este test lo dice.
  it("son siete, como dice el titular de la rejilla", () => {
    expect([...publishedUrls].sort()).toHaveLength(7);
  });

  it("todas apuntan a un sitio propio de Sam", () => {
    for (const url of publishedUrls) {
      expect(url, url).toMatch(/^https:\/\/samtho\.github\.io\//);
    }
  });
});
