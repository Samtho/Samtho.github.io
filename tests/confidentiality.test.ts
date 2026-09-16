import { describe, expect, it } from "vitest";
import { projects, publicProjects } from "@/data/projects";
import {
  CONFIDENTIAL_TERMS,
  findConfidentialTerms,
  projectSchema,
} from "@/data/schema";
import { timeline } from "@/data/timeline";

/**
 * La regla que no se puede romper: nada de un empleador sale publicado.
 * Se comprueba sobre los datos actuales y tambien sobre el esquema, para que
 * la garantia siga en pie cuando se anadan proyectos nuevos.
 */

const validProject = {
  id: "ejemplo",
  name: "Ejemplo",
  tagline: { es: "Una frase", en: "One line" },
  description: { es: "Una descripcion", en: "A description" },
  year: "2026",
  role: { es: "Producto", en: "Product" },
  stack: ["React"],
  tags: ["delivery"],
  confidential: false,
  source: "personal",
};

describe("proyectos de un empleador", () => {
  it("ninguno de los datos actuales esta marcado como publicable", () => {
    for (const project of projects) {
      if (project.source !== "employer") continue;
      expect(project.confidential, project.id).toBe(true);
    }
  });

  it("el esquema rechaza uno publicable", () => {
    const result = projectSchema.safeParse({
      ...validProject,
      source: "employer",
      confidential: false,
    });
    expect(result.success).toBe(false);
  });

  it("el esquema lo acepta si esta marcado como confidencial", () => {
    const result = projectSchema.safeParse({
      ...validProject,
      source: "employer",
      confidential: true,
    });
    expect(result.success).toBe(true);
  });
});

describe("publicProjects", () => {
  it("nunca devuelve un proyecto confidencial", () => {
    for (const project of publicProjects()) {
      expect(project.confidential, project.id).toBe(false);
    }
  });

  it("filtra de verdad y no devuelve la lista entera sin mirar", () => {
    const confidentialCount = projects.filter((p) => p.confidential).length;
    expect(publicProjects()).toHaveLength(
      projects.length - confidentialCount,
    );
  });
});

describe("lista negra", () => {
  it("ningun proyecto publico menciona un termino prohibido", () => {
    for (const project of publicProjects()) {
      const texts = [
        project.name,
        project.tagline.es,
        project.tagline.en,
        project.description.es,
        project.description.en,
      ];
      for (const text of texts) {
        expect(findConfidentialTerms(text), `${project.id}: ${text}`).toEqual(
          [],
        );
      }
    }
  });

  it("el esquema rechaza un proyecto publico que mencione un empleador", () => {
    const result = projectSchema.safeParse({
      ...validProject,
      description: {
        es: "Un proyecto interno de Giunti Psychometrics",
        en: "An internal Giunti Psychometrics project",
      },
    });
    expect(result.success).toBe(false);
  });

  it("no distingue mayusculas", () => {
    expect(findConfidentialTerms("Proyecto de GIUNTI")).toContain("giunti");
  });

  // La lista negra es de projects. La timeline necesita nombrar empleadores.
  it("no se aplica a la timeline, donde el empleador es historial publico", () => {
    const orgs = timeline.map((entry) => entry.org.toLowerCase());
    const blocked = CONFIDENTIAL_TERMS.filter((term) =>
      orgs.some((org) => org.includes(term)),
    );
    expect(blocked.length).toBeGreaterThan(0);
  });
});
