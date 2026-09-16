import { profileSchema, type Profile } from "./schema";

/**
 * La bio en espanol es el borrador aprobado por Sam, tal cual.
 * La version en inglesa es traduccion de ese mismo texto: el resumen original
 * de LinkedIn no estaba disponible al escribirla. Pendiente de revision suya.
 *
 * Los parrafos se separan con dos saltos de linea.
 */
const bioEs = [
  "Empecé como ingeniero de telecomunicaciones en Venezuela. Cables, protocolos, infraestructura: el tipo de trabajo donde si algo se rompe te enteras al instante. De ahí me quedó una idea que sigo aplicando. Los sistemas tienen lógica, y cuando algo falla hay una causa. Encontrarla vale más que parchear el síntoma.",
  "Con los años me moví a producto. Product Owner técnico en una startup de transporte, PM en proyectos de utilities y banca, y casi seis años en NTT DATA como Agile Lead liderando transformaciones en equipos distribuidos de Chile y LATAM. Ahí aprendí a facilitar, a priorizar, a trabajar con stakeholders que lo quieren todo para ayer, y a construir procesos donde no existía ninguno.",
  "En 2025 me mudé a Madrid para cursar un máster en Business Analytics e Inteligencia Artificial. En 2026 entré en Giunti Psychometrics como Product Owner del canal de ecommerce global, con sitios en varios países de Europa y LATAM. Un rol donde el trabajo real consiste en crear claridad: quién es dueño de qué, qué se prioriza y por qué, y cómo cada decisión llega a la persona correcta en el momento correcto.",
  "Hoy uso IA como parte de mi sistema de trabajo diario, en flujos que cierran el hueco entre una reunión y una acción.",
  "Hacia dónde voy: un entorno donde producto tenga influencia estratégica real y donde las decisiones se tomen con criterio.",
].join("\n\n");

const bioEn = [
  "I started out as a telecommunications engineer in Venezuela. Cables, protocols, infrastructure: the kind of work where you find out the instant something breaks. It left me with an idea I still apply. Systems have a logic, and when something fails there is a cause. Finding it is worth more than patching the symptom.",
  "Over the years I moved into product. Technical Product Owner at a transport startup, PM on utilities and banking projects, and almost six years at NTT DATA as an Agile Lead leading transformations across distributed teams in Chile and LATAM. That is where I learned to facilitate, to prioritise, to work with stakeholders who want everything by yesterday, and to build processes where none existed.",
  "In 2025 I moved to Madrid for a master's degree in Business Analytics and Artificial Intelligence. In 2026 I joined Giunti Psychometrics as Product Owner of the global ecommerce channel, with sites across several countries in Europe and LATAM. It is a role where the real work is creating clarity: who owns what, what gets prioritised and why, and how each decision reaches the right person at the right time.",
  "Today I use AI as part of my daily working system, in flows that close the gap between a meeting and an action.",
  "Where I am heading: an environment where product has real strategic influence and where decisions are made with judgement.",
].join("\n\n");

export const profile: Profile = profileSchema.parse({
  name: "Samuel Ortega",
  // Opcion A de la ficha. El puesto es Product Owner; el titular del hero
  // dice Product Manager, igual que en su LinkedIn.
  headline: {
    es: "Product Manager de ecommerce multirregional. Creo claridad donde hay muchos mercados, varios países y ninguna estructura previa.",
    en: "Product Manager for multi-regional ecommerce. I create clarity where there are many markets, several countries and no structure in place.",
  },
  bio: { es: bioEs, en: bioEn },
  location: { es: "Madrid, España", en: "Madrid, Spain" },
  email: "stortega.11@gmail.com",
  linkedin: "https://www.linkedin.com/in/ortegasamuel",
  github: "https://github.com/Samtho",
  // Decisiones de Sam: el telefono no se publica y el blog personal
  // (thepandoramachine.blogspot.com) no se enlaza por ahora.
  cvPath: "/cv-samuel-ortega.pdf",
});
