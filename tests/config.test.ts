import { existsSync } from "node:fs";
import { describe, expect, it } from "vitest";
import nextConfig from "../next.config";

// Estas tres opciones son la condicion para que GitHub Pages pueda servir el sitio.
// Si alguien las quita, el despliegue se rompe en silencio: mejor que falle aqui.
describe("next.config", () => {
  it("exporta el sitio como estatico", () => {
    expect(nextConfig.output).toBe("export");
  });

  it("desactiva la optimizacion de imagenes, que exigiria un servidor", () => {
    expect(nextConfig.images?.unoptimized).toBe(true);
  });

  it("usa trailing slash para que las rutas resuelvan como carpetas", () => {
    expect(nextConfig.trailingSlash).toBe(true);
  });
});

describe("public", () => {
  it("incluye .nojekyll, sin el cual Pages ignora las carpetas _next", () => {
    expect(existsSync(new URL("../public/.nojekyll", import.meta.url))).toBe(
      true,
    );
  });
});
