import { z } from "zod";

/**
 * Esquemas de todo el contenido del sitio.
 *
 * Cada archivo de src/data/ valida contra su esquema en el momento de exportar,
 * de forma que un dato mal formado rompe el build y no la pagina en produccion.
 */

/** Marcador literal para los datos que Sam todavia no ha dado. */
export const TODO = "TODO: Sam debe rellenar";

/**
 * Marcador visible. A diferencia de TODO, este se renderiza en la pagina:
 * Sam ve el hueco en su sitio y lo corrige mirandolo. Un test comprueba que
 * no queden antes de publicar la URL en el CV.
 */
export const PENDING = "[por definir]";

/**
 * Envuelve un esquema restrictivo (fecha, URL, email) para que tambien acepte
 * el marcador de pendiente. Los campos de texto libre no lo necesitan: TODO ya
 * es una cadena no vacia y pasa su validacion.
 */
const pending = <T extends z.ZodType>(schema: T) =>
  z.union([schema, z.literal(TODO)]);

/** Todo texto visible existe en los dos idiomas. Sin excepciones. */
export const bilingualSchema = z.object({
  es: z.string().min(1),
  en: z.string().min(1),
});
export type Bilingual = z.infer<typeof bilingualSchema>;

/**
 * Enum cerrado de competencias. Lo comparten timeline y projects, de modo que
 * los filtros de la timeline y las etiquetas de los proyectos hablan el mismo
 * idioma. Son competencias, no sectores ni tecnologias: un dominio como
 * ecommerce o un stack como React no entran aqui.
 *
 * Las etiquetas visibles de cada tag viven en los diccionarios de i18n, porque
 * son chrome de interfaz y no contenido.
 */
export const COMPETENCY_TAGS = [
  "discovery",
  "strategy",
  "delivery",
  "data",
  "ai",
  "agile",
  "stakeholders",
] as const;

export const competencyTagSchema = z.enum(COMPETENCY_TAGS);
export type CompetencyTag = z.infer<typeof competencyTagSchema>;

/**
 * Fechas de trayectoria. Admite YYYY-MM y tambien YYYY a secas, porque de la
 * formacion mas antigua solo consta el anio. El orden lexicografico sigue
 * siendo correcto: "2007" < "2007-01" < "2008".
 */
export const dateSchema = z
  .string()
  .regex(/^\d{4}(-(0[1-9]|1[0-2]))?$/, "usa el formato YYYY-MM o YYYY");

export const yearSchema = z
  .string()
  .regex(/^\d{4}$/, "usa el formato YYYY");

export const profileSchema = z.object({
  name: z.string().min(1),
  headline: bilingualSchema,
  bio: bilingualSchema,
  location: bilingualSchema,
  email: pending(z.email()),
  linkedin: pending(z.url()),
  github: z.url(),
  /** Foto del hero. Sin ella la seccion funciona igual. */
  photo: z.string().startsWith("/").optional(),
  cvPath: z.string().startsWith("/"),
});
export type Profile = z.infer<typeof profileSchema>;

/** Un rol dentro de una misma organizacion, para mostrar la progresion. */
export const timelineRoleSchema = z.object({
  role: bilingualSchema,
  start: pending(dateSchema),
  end: pending(dateSchema).nullable(),
  /** Contexto corto del encargo, por ejemplo el cliente. */
  context: bilingualSchema.optional(),
});
export type TimelineRole = z.infer<typeof timelineRoleSchema>;

const timelineEntryBaseSchema = z.object({
  id: z.string().min(1),
  kind: z.enum(["work", "education", "certification"]),
  /**
   * Empleador, centro o entidad emisora. Opcional solo para certificaciones:
   * el nombre de la certificacion ya identifica lo que importa, y publicar un
   * emisor sin verificar es peor que no publicarlo.
   */
  org: z.string().min(1).optional(),
  orgLogo: z.string().startsWith("/").optional(),
  start: pending(dateSchema),
  /** null significa "en curso". El marcador TODO significa "no lo se todavia". */
  end: pending(dateSchema).nullable(),
  /** Rol de cabecera. En una organizacion con varios roles, el ultimo. */
  role: bilingualSchema,
  /**
   * Progresion dentro de la misma organizacion, de mas reciente a mas antiguo.
   * Se omite cuando solo hubo un rol.
   */
  roles: z.array(timelineRoleSchema).optional(),
  /**
   * Opcional a proposito. Una certificacion o un rol de hace diez anios se
   * explican con su titulo; forzar un resumen solo produce relleno.
   */
  summary: bilingualSchema.optional(),
  highlights: z.array(bilingualSchema),
  tags: z.array(competencyTagSchema),
});

export const timelineEntrySchema = timelineEntryBaseSchema.superRefine(
  (entry, ctx) => {
    if (entry.kind !== "certification" && !entry.org) {
      ctx.addIssue({
        code: "custom",
        path: ["org"],
        message: "Un trabajo o una formacion siempre tienen organizacion.",
      });
    }
  },
);
export type TimelineEntry = z.infer<typeof timelineEntrySchema>;

/**
 * Lista negra de confidencialidad.
 *
 * Aplica solo a projects, nunca a timeline: Giunti y NTT DATA son historial
 * laboral publico y deben poder aparecer como empleadores. Lo que no puede
 * aparecer es un proyecto, sistema o cliente de un empleador.
 *
 * Sam: anade aqui los nombres de sistemas internos, productos y clientes que
 * nunca deben salir publicados. La comparacion no distingue mayusculas.
 */
export const CONFIDENTIAL_TERMS = [
  // Empleadores
  "giunti",
  "psychometrics",
  "ntt data",
  // Sistemas de empleadores
  "galileo",
  "magento",
  // Clientes de empleadores anteriores
  "enel",
  "banco de chile",
  "telefonica",
  "movistar",
  "transbank",
  "metlife",
  "wom",
  "afp habitat",
  "evo payments",
  "intercam",
  "kupos",
  "pasajebus",
  "ticketsimply",
  "inelectra",
  "beconsult",
  "chattigo",
  "wultu",
] as const;

/** Minusculas y sin tildes, para que "Telefonica" y "Telefónica" sean lo mismo. */
function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

/**
 * Devuelve los terminos prohibidos que aparecen en un texto.
 *
 * Compara por palabra completa y no por subcadena: terminos cortos como "wom"
 * dispararian falsos positivos dentro de palabras como "women".
 */
export function findConfidentialTerms(text: string): string[] {
  const haystack = normalize(text);
  return CONFIDENTIAL_TERMS.filter((term) => {
    const escaped = normalize(term).replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`\\b${escaped}\\b`).test(haystack);
  });
}

export const projectSchema = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    tagline: bilingualSchema,
    description: bilingualSchema,
    year: pending(yearSchema),
    role: bilingualSchema,
    stack: z.array(z.string().min(1)),
    tags: z.array(competencyTagSchema),
    liveUrl: pending(z.url()).optional(),
    repoUrl: pending(z.url()).optional(),
    /** Obligatorio y sin valor por defecto: obliga a decidir en cada proyecto. */
    confidential: z.boolean(),
    source: z.enum(["personal", "academic", "employer"]),
  })
  // Las dos reglas de confidencialidad se validan al parsear, no solo en los
  // tests, para que el build falle antes de publicar nada.
  .superRefine((project, ctx) => {
    if (project.source === "employer" && !project.confidential) {
      ctx.addIssue({
        code: "custom",
        path: ["confidential"],
        message:
          "Un proyecto de un empleador siempre es confidential: true. Es trabajo que no te pertenece.",
      });
    }

    if (project.confidential) return;

    const publicText: Array<[string, string]> = [
      ["name", project.name],
      ["tagline.es", project.tagline.es],
      ["tagline.en", project.tagline.en],
      ["description.es", project.description.es],
      ["description.en", project.description.en],
    ];

    for (const [field, text] of publicText) {
      const found = findConfidentialTerms(text);
      if (found.length > 0) {
        ctx.addIssue({
          code: "custom",
          path: field.split("."),
          message: `Termino confidencial en un proyecto publico: ${found.join(", ")}`,
        });
      }
    }
  });
export type Project = z.infer<typeof projectSchema>;

export const capabilitySchema = z.object({
  id: z.string().min(1),
  /** Ata cada competencia destacada al mismo enum que filtra la timeline. */
  tag: competencyTagSchema,
  /** Nombre del icono de lucide, resuelto con un mapa explicito en la UI. */
  icon: z.string().min(1),
  title: bilingualSchema,
  description: bilingualSchema,
});
export type Capability = z.infer<typeof capabilitySchema>;

export const metricSchema = z.object({
  id: z.string().min(1),
  /** Valor numerico para el contador animado. */
  value: pending(z.number().nonnegative()),
  /** Punto de partida, para las metricas de tipo "de X a Y". */
  baseline: z.number().nonnegative().optional(),
  /** Se pinta pegado al numero: "+", "%", "/5". */
  suffix: z.string().optional(),
  label: bilingualSchema,
  /** De donde sale el numero, cuando hace falta explicarlo. */
  source: bilingualSchema.optional(),
});
export type Metric = z.infer<typeof metricSchema>;

export const faqItemSchema = z.object({
  id: z.string().min(1),
  question: bilingualSchema,
  answer: bilingualSchema,
});
export type FaqItem = z.infer<typeof faqItemSchema>;

export const methodStepSchema = z.object({
  id: z.string().min(1),
  title: bilingualSchema,
  description: bilingualSchema,
});
export type MethodStep = z.infer<typeof methodStepSchema>;
