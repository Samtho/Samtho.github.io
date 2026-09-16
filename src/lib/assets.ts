import { existsSync } from "node:fs";
import { join } from "node:path";
import { profile } from "@/data/profile";

/**
 * Se resuelve en build time, que es cuando existe el sistema de archivos.
 * Mientras no haya PDF, la pagina no ofrece un enlace roto.
 */
export const hasCv = existsSync(
  join(process.cwd(), "public", profile.cvPath.replace(/^\//, "")),
);
