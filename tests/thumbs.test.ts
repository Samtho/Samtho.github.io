import { existsSync } from "node:fs";
import path from "node:path";
import { describe, expect, it } from "vitest";
import { SHOTS, THUMB_WIDTHS, thumbFile } from "../scripts/thumbs.mjs";
import { projectsByGroup } from "@/data/projects";

type Shot = { slug: string; project: string; url: string };

const shots = SHOTS as Shot[];
const apps = projectsByGroup("apps");

/**
 * El script de miniaturas lleva su propia lista de URLs. Estos tests son lo
 * que impide que se quede atras cuando cambie src/data/projects.ts.
 */
describe("miniaturas", () => {
  it("cubre todas las URLs publicadas de las apps", () => {
    const published = apps.flatMap((app) =>
      app.embeds.length > 0
        ? app.embeds.map((embed) => embed.url)
        : [app.liveUrl].filter((url): url is string => Boolean(url)),
    );
    const captured = shots.map((shot) => shot.url);

    expect(new Set(captured)).toEqual(new Set(published));
  });

  it("apunta cada captura a una app que existe", () => {
    const ids = new Set(apps.map((app) => app.id));
    for (const shot of shots) {
      expect(ids, `${shot.slug} apunta a ${shot.project}`).toContain(
        shot.project,
      );
    }
  });

  it("da una captura a cada tarjeta del catalogo", () => {
    const slugs = new Set(shots.map((shot) => shot.slug));
    for (const app of apps) {
      const slug = app.thumb ?? app.id;
      expect(slugs, `${app.name} encabeza con ${slug}`).toContain(slug);
    }
  });

  it("no repite slugs", () => {
    const slugs = shots.map((shot) => shot.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("tiene los tres anchos generados de cada captura", () => {
    for (const shot of shots) {
      for (const width of THUMB_WIDTHS as number[]) {
        const name = thumbFile(shot.slug, width) as string;
        const file = path.join(process.cwd(), "public", "thumbs", name);
        expect(existsSync(file), `falta public/thumbs/${name}`).toBe(true);
      }
    }
  });
});
