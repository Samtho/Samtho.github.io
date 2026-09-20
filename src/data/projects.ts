import { z } from "zod";
import { PENDING, projectSchema, type Project } from "./schema";

/**
 * Paneles con ficha: las apps, los analisis y el sistema de IA.
 *
 * Regla dura: nada de un empleador entra aqui. El esquema rechaza cualquier
 * entrada con source "employer" y confidential false, y cualquier entrada
 * publica que mencione un termino de la lista negra.
 */
export const projects: Project[] = z.array(projectSchema).parse([
  {
    id: "jano",
    group: "apps",
    name: "Jano",
    tagline: {
      es: "Tu CV, adaptado a cada oferta. Sin inventar nada.",
      en: "Your CV, tailored to each job ad. Without making anything up.",
    },
    year: "2026",
    problem: {
      es: "Reescribir el CV para cada oferta cuesta horas, y la IA se inventa logros que no están en el original.",
      en: "Rewriting your CV for each job ad takes hours, and AI invents achievements that were never in the original.",
    },
    role: {
      es: "Producto de principio a fin.",
      en: "Product end to end.",
    },
    decision: {
      es: "Guardarraíl anti-invención. Cada bullet del CV adaptado es trazable a su origen en el CV real.",
      en: "An anti-fabrication guardrail. Every bullet in the tailored CV traces back to its source in the real one.",
    },
    stack: ["Next.js 16", "n8n", "Supabase pgvector", "OpenAI", "pdfjs"],
    tags: ["ai", "discovery", "delivery"],
    liveUrl: "https://samtho.github.io/jano-web/",
    repoUrl: "https://github.com/Samtho/jano-web",
    embeds: [
      {
        label: { es: "Aplicación", en: "Application" },
        url: "https://samtho.github.io/jano-web/",
      },
    ],
    related: "umbral",
    confidential: false,
    source: "personal",
  },
  {
    id: "umbral",
    group: "apps",
    name: "Umbral",
    tagline: {
      es: "No postules a ciegas.",
      en: "Do not apply blind.",
    },
    year: "2026",
    problem: {
      es: "Todos los productos del mercado te optimizan a ti para la oferta. Nadie evalúa si la oferta merece tu tiempo.",
      en: "Every product out there optimises you for the job ad. Nobody evaluates whether the ad deserves your time.",
    },
    role: {
      es: "Producto de principio a fin.",
      en: "Product end to end.",
    },
    decision: {
      es: "Invertir el espejo. Veredicto de tres estados sobre la oferta, y el CV deja de ser un PDF para ser un enlace verificable.",
      en: "Flip the mirror. A three-state verdict on the job ad, and the CV stops being a PDF and becomes a verifiable link.",
    },
    stack: ["Next.js 16", "Procesamiento en navegador", "Sin registro"],
    tags: ["ai", "strategy", "discovery"],
    liveUrl: "https://samtho.github.io/umbral/",
    repoUrl: "https://github.com/Samtho/umbral",
    // Sin embed a proposito. La portada publicada de Umbral usa como ejemplo
    // de demo una linea del CV de Sam que nombra un sistema interno de su
    // empleador, y embeberla lo traeria dentro de este sitio. Se activa en
    // cuanto esa linea del repo umbral se escriba en generico.
    embeds: [],
    related: "jano",
    confidential: false,
    source: "personal",
  },
  {
    id: "aura-closet",
    group: "apps",
    name: "Aura Closet",
    tagline: {
      es: "Prototipo de gestión de armario personal: inventario, outfits, calendario de uso y recomendaciones con IA.",
      en: "A personal wardrobe management prototype: inventory, outfits, a wear calendar and AI recommendations.",
    },
    description: {
      es: "Prototipo funcional en un solo archivo HTML con persistencia en localStorage. Siete secciones conectadas entre sí: inventario de prendas, composición de outfits, calendario, ciclo de lavado, perfil de estilo y un motor de recomendaciones que combina reglas, datos de Open-Meteo y un narrador opcional con IA.",
      en: "A working prototype in a single HTML file with localStorage persistence. Seven connected sections: garment inventory, outfit composition, calendar, laundry cycle, style profile and a recommendation engine combining rules, Open-Meteo data and an optional AI narrator.",
    },
    year: "2026",
    problem: {
      es: "Tienes ropa que no te pones y cada mañana decides a ciegas, sin saber qué hay en el armario ni qué pega con el tiempo que va a hacer.",
      en: "You own clothes you never wear, and every morning you decide blind, with no idea what is in the wardrobe or what suits the weather ahead.",
    },
    role: { es: "Producto y desarrollo", en: "Product and development" },
    decision: {
      es: "Motor de reglas con el clima real en vez de un modelo generativo. Una recomendación de ropa tiene que ser explicable, y tiene que funcionar sin depender de una API de pago.",
      en: "A rules engine fed by real weather instead of a generative model. A clothing recommendation has to be explainable, and it has to work without depending on a paid API.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Open-Meteo"],
    tags: ["discovery", "ai"],
    liveUrl: "https://samtho.github.io/Aura-closet/",
    repoUrl: "https://github.com/Samtho/Aura-closet",
    embeds: [
      {
        label: { es: "Aplicación", en: "Application" },
        url: "https://samtho.github.io/Aura-closet/",
      },
    ],
    confidential: false,
    // El README lo describe como trabajo de clase.
    source: "academic",
  },
  {
    id: "pi-planning-lite",
    group: "apps",
    name: "PI Planning Lite",
    tagline: {
      es: "Plantilla ligera de PI Planning.",
      en: "A lightweight PI Planning template.",
    },
    description: {
      es: "Conecta la certificación SAFe Lean Portfolio Manager con algo construido: épicas del quarter, capacidad y confianza por sprint, dependencias, OKRs, timeline y estado semanal, en una sola pantalla.",
      en: "It connects the SAFe Lean Portfolio Manager certification with something actually built: quarter epics, capacity and confidence per sprint, dependencies, OKRs, timeline and weekly status, all on one screen.",
    },
    year: "2026",
    problem: {
      es: "Planificar un quarter acaba repartido entre una hoja de cálculo, un tablero y una presentación, y ninguna de las tres cuadra con las otras dos.",
      en: "Planning a quarter ends up split across a spreadsheet, a board and a deck, and none of the three agrees with the other two.",
    },
    role: { es: "Producto y desarrollo", en: "Product and development" },
    decision: {
      es: "Un solo archivo HTML, sin servidor ni cuentas. Arranca con un asistente de tres pasos y guarda en el navegador: la plantilla se abre y se usa, no se instala.",
      en: "A single HTML file, with no server and no accounts. It starts with a three-step wizard and saves in the browser: the template opens and gets used, it does not get installed.",
    },
    stack: ["HTML", "CSS", "JavaScript"],
    tags: ["agile", "delivery", "strategy"],
    liveUrl: "https://samtho.github.io/fantastic-management-quarter/",
    repoUrl: "https://github.com/Samtho/fantastic-management-quarter",
    embeds: [
      {
        label: { es: "Plantilla", en: "Template" },
        url: "https://samtho.github.io/fantastic-management-quarter/",
      },
    ],
    confidential: false,
    source: "personal",
  },
  {
    id: "panoplia",
    group: "apps",
    name: "Panoplia",
    tagline: {
      es: "Análisis del catálogo de una distribuidora de libros para decidir su estrategia de exportación.",
      en: "Catalogue analysis for a book distributor, to decide its export strategy.",
    },
    description: {
      es: "Trabajo de fin de máster en INESDI, publicable con permiso. Estudia si a una distribuidora de libros le conviene cambiar el mix de géneros que mueve de cara a la exportación.",
      en: "Final master's project at INESDI, published with permission. It studies whether a book distributor should change the genre mix it moves in order to export.",
    },
    year: "2026",
    problem: {
      es: "Una distribuidora decide qué géneros empuja fuera por intuición, sin mirar qué se vende de verdad en cada mercado.",
      en: "A distributor decides which genres to push abroad on instinct, without looking at what actually sells in each market.",
    },
    role: {
      es: `Producto y desarrollo, dentro de un equipo de cinco del máster. ${PENDING}`,
      en: `Product and development, within a team of five on the master's programme. ${PENDING}`,
    },
    decision: {
      es: "Dos registros visuales sobre los mismos datos. Uno para defender la conclusión en sala, otro para que cualquiera explore las cifras y llegue por su cuenta.",
      en: "Two visual registers over the same data. One to defend the conclusion in the room, another so anyone can explore the figures and get there on their own.",
    },
    stack: ["React", "Vite", "ECharts"],
    tags: ["data", "strategy"],
    liveUrl: "https://samtho.github.io/panoplia-defensa-v4/",
    repoUrl: "https://github.com/Samtho/panoplia-defensa-v4",
    thumb: "panoplia-defensa",
    embeds: [
      {
        label: { es: "Defensa", en: "Defence" },
        url: "https://samtho.github.io/panoplia-defensa-v4/",
      },
      {
        label: { es: "Dashboard", en: "Dashboard" },
        url: "https://samtho.github.io/panoplia-dashboard/",
      },
    ],
    confidential: false,
    source: "academic",
  },
  {
    id: "the-movies-database",
    group: "apps",
    name: "The Movies Database",
    tagline: {
      es: "Catálogo personal de cine: el historial completo cruzado con 45.000 películas.",
      en: "A personal cinema catalogue: a full viewing history crossed with 45,000 films.",
    },
    description: {
      es: "Seis vistas sobre el mismo historial: la vida en cine en números, una galaxia de títulos, el grafo de conexiones, qué ver esta noche, un recomendador entrenado con el gusto propio y una mirada a la industria.",
      en: "Six views over the same history: a life in cinema in numbers, a galaxy of titles, the graph of connections, what to watch tonight, a recommender trained on your own taste, and a look at the industry.",
    },
    year: "2026",
    problem: {
      es: "Un historial de visionado es una lista muerta: dice qué viste, no qué te gusta ni qué deberías ver esta noche.",
      en: "A viewing history is a dead list: it says what you watched, not what you like or what you should watch tonight.",
    },
    role: { es: "Producto y desarrollo", en: "Product and development" },
    decision: {
      es: "Entrenar el recomendador con el gusto propio, no con el de la plataforma. El historial completo de Trakt se cruza con 45.000 películas, y el modelo aprende de lo que uno ha visto de verdad.",
      en: "Train the recommender on your own taste, not the platform's. A full Trakt history is crossed with 45,000 films, and the model learns from what you actually watched.",
    },
    stack: ["HTML", "CSS", "JavaScript", "Trakt", "The Movies Dataset"],
    tags: ["data", "ai"],
    liveUrl: "https://samtho.github.io/the-movies-database/",
    repoUrl: "https://github.com/Samtho/the-movies-database",
    embeds: [
      {
        label: { es: "Aplicación", en: "Application" },
        url: "https://samtho.github.io/the-movies-database/",
      },
    ],
    confidential: false,
    source: "personal",
  },

  // Analisis. Trabajos del master.
  {
    id: "saludplus",
    group: "analysis",
    name: "SaludPlus",
    tagline: {
      es: "Gobierno del dato para un grupo hospitalario.",
      en: "Data governance for a hospital group.",
    },
    year: "2026",
    problem: {
      es: "Diseñar el modelo de gobierno del dato de un grupo hospitalario que crece por adquisiciones y tiene los datos de cada centro en un sistema distinto.",
      en: "Design the data governance model for a hospital group that grows by acquisition and keeps each site's data in a different system.",
    },
    role: {
      es: `Trabajo en equipo del máster. ${PENDING}`,
      en: `Team project on the master's programme. ${PENDING}`,
    },
    decision: {
      es: "La madurez se mide antes de proponer nada. Evaluamos al grupo contra CMMI y el roadmap salió de esa brecha real, en tres fases, en vez de salir de una lista de buenas prácticas genéricas.",
      en: "Maturity gets measured before anything is proposed. We assessed the group against CMMI and the roadmap came out of that real gap, in three phases, instead of out of a generic best-practice list.",
    },
    stack: ["CMMI", "Estructura de gobernanza", "Business case"],
    tags: ["data", "strategy"],
    embeds: [],
    confidential: false,
    source: "academic",
  },
  {
    id: "grupo-b",
    group: "analysis",
    name: "Grupo B",
    tagline: {
      es: "Automatizar extracción documental en un equipo de finanzas.",
      en: "Automating document extraction for a finance team.",
    },
    year: "2026",
    problem: {
      es: "Un equipo de finanzas sacaba datos estructurados de documentos a mano. Había que decidir con qué herramienta automatizarlo y justificar la inversión.",
      en: "A finance team was pulling structured data out of documents by hand. The job was to decide which tool would automate it and to justify the spend.",
    },
    role: {
      es: `Trabajo en equipo del máster. ${PENDING}`,
      en: `Team project on the master's programme. ${PENDING}`,
    },
    decision: {
      es: "La comparación entre Make y n8n se resolvió con coste real medido, no con una tabla de funcionalidades. El Go/No Go llevaba KPIs del proceso manual, así que el ahorro era comprobable.",
      en: "The Make versus n8n comparison was settled on measured real cost, not on a feature table. The Go/No Go carried KPIs from the manual process, so the saving was verifiable.",
    },
    stack: ["Make", "n8n", "Gemini", "Prompt estructurado PRISMA"],
    tags: ["data", "ai", "strategy"],
    embeds: [],
    confidential: false,
    source: "academic",
  },
  {
    id: "logifast",
    group: "analysis",
    name: "LogiFast",
    tagline: {
      es: "Modelo analítico para un escenario logístico.",
      en: "An analytical model for a logistics scenario.",
    },
    year: "2026",
    problem: {
      es: "Convertir datos sucios de operación logística en un modelo capaz de responder preguntas de negocio.",
      en: "Turn dirty logistics operations data into a model that can answer business questions.",
    },
    role: {
      es: "Trabajo del máster.",
      en: "Master's programme project.",
    },
    decision: {
      es: "El trabajo de verdad estaba en la limpieza y en el modelo en estrella. Con el modelo bien montado, las medidas de inteligencia temporal salen casi solas.",
      en: "The real work was in the cleaning and the star schema. With the model built right, the time intelligence measures almost write themselves.",
    },
    stack: ["Power BI", "ETL", "Modelo en estrella", "DAX"],
    tags: ["data"],
    embeds: [],
    confidential: false,
    source: "academic",
  },
  {
    id: "rentabilidad-ml",
    group: "analysis",
    name: "Rentabilidad ML",
    tagline: {
      es: "Predecir si un pedido va a ser rentable.",
      en: "Predicting whether an order will be profitable.",
    },
    year: "2026",
    problem: {
      es: "Clasificar pedidos de retail por rentabilidad sobre el dataset Sample Superstore, recorriendo el ciclo completo de machine learning.",
      en: "Classify retail orders by profitability over the Sample Superstore dataset, walking the full machine learning cycle.",
    },
    role: {
      es: "Trabajo del máster.",
      en: "Master's programme project.",
    },
    decision: {
      es: "El ciclo entero, de análisis exploratorio a evaluación, para ver dónde se decide de verdad la calidad de un modelo.",
      en: "The whole cycle, from exploratory analysis to evaluation, to see where a model's quality actually gets decided.",
    },
    stack: ["Python", "pandas", "scikit-learn", "Notebooks"],
    tags: ["data", "ai"],
    embeds: [],
    confidential: false,
    source: "academic",
  },

  // Sistema de IA.
  {
    id: "mis-skills",
    group: "ai",
    name: "Mis skills",
    tagline: {
      es: "Mi trabajo, convertido en sistema.",
      en: "My work, turned into a system.",
    },
    year: "2026",
    problem: {
      es: "Las tareas que más repito como PM tienen estructura fija: convertir una petición suelta en un ticket listo para desarrollo, resumir una reunión en decisiones y tareas con responsable, escribir un PRD. Las hacía a mano cada vez.",
      en: "The tasks I repeat most as a PM have a fixed structure: turning a loose request into a ticket ready for development, condensing a meeting into decisions and owned tasks, writing a PRD. I was doing each one by hand every time.",
    },
    role: { es: "Diseño y construcción.", en: "Design and build." },
    decision: {
      es: "Cada skill codifica un criterio, no un formato. La de tickets no rellena una plantilla: aplica un umbral de calidad y no deja pasar un ticket sin criterios de aceptación.",
      en: "Each skill encodes a standard, not a format. The ticket one does not fill in a template: it applies a quality bar and will not let a ticket through without acceptance criteria.",
    },
    stack: ["Claude Skills", "MCP"],
    tags: ["ai", "delivery"],
    embeds: [],
    confidential: false,
    source: "personal",
  },
  {
    id: "integraciones-mcp",
    group: "ai",
    name: "Integraciones MCP",
    tagline: {
      es: "Conectar el modelo a las herramientas donde trabajo.",
      en: "Connecting the model to the tools I work in.",
    },
    year: "2026",
    problem: {
      es: "Un asistente que no ve tus datos ni tus tableros devuelve texto genérico.",
      en: "An assistant that cannot see your data or your boards gives back generic text.",
    },
    role: { es: "Diseño y construcción.", en: "Design and build." },
    decision: {
      es: "Conectar el modelo directamente a Power BI y a Miro por MCP en vez de copiar y pegar contexto. Construí modelos en estrella con DAX y tablas de calendario contra una instancia local, y diagramas de arquitectura y tableros de retrospectiva en Miro.",
      en: "Connect the model straight to Power BI and Miro over MCP instead of copying and pasting context. I built star schemas with DAX and calendar tables against a local instance, plus architecture diagrams and retrospective boards in Miro.",
    },
    stack: ["MCP", "Power BI", "DAX", "Miro"],
    tags: ["ai", "data"],
    embeds: [],
    confidential: false,
    source: "personal",
  },
]);

/**
 * Unica via por la que la interfaz accede a los proyectos.
 * Nada confidencial pasa de aqui.
 */
export function publicProjects(): Project[] {
  return projects.filter((project) => !project.confidential);
}

/** Los paneles de un grupo de la barra lateral, en orden. */
export function projectsByGroup(group: Project["group"]): Project[] {
  return publicProjects().filter((project) => project.group === group);
}
