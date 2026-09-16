import { z } from "zod";
import { metricSchema, type Metric } from "./schema";

/**
 * Numeros de la trayectoria.
 *
 * Vacio a proposito. La ficha de datos no trae ninguna metrica y el proyecto
 * prohibe inventar cifras: una cifra que no se pueda defender en una entrevista
 * es peor que no tener seccion. Se rellena cuando Sam de los numeros.
 */
export const metrics: Metric[] = z.array(metricSchema).parse([]);
