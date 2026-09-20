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

  // Sistema de IA.
  {
    id: "mis-skills",
    group: "ai",
    name: "Mis skills",
    headline: {
      es: "Mi trabajo, convertido en sistema",
      en: "My work, turned into a system",
    },
    tagline: {
      es: "Una docena de skills propias que ejecutan las tareas que más repito, con mi criterio dentro.",
      en: "A dozen skills of my own that run the tasks I repeat most, with my judgement built in.",
    },
    year: "2026",
    problem: {
      es: "Las tareas que más repito como PM tienen estructura fija. Convertir una petición suelta en un ticket listo para desarrollo, resumir una reunión en decisiones y tareas con responsable, escribir un PRD, redactar algo que suene a mí. Las hacía a mano cada vez, y la calidad dependía de cuánto tiempo tuviera ese día.",
      en: "The tasks I repeat most as a PM have a fixed structure. Turning a loose request into a ticket ready for development, condensing a meeting into decisions and owned tasks, writing a PRD, drafting something that sounds like me. I did each one by hand every time, and the quality depended on how much time I had that day.",
    },
    role: { es: "Diseño y construcción.", en: "Design and build." },
    decision: {
      es: "Cada skill codifica un criterio, no una plantilla. La de tickets no rellena campos: aplica un umbral de calidad y se niega a devolver un ticket sin criterios de aceptación. La de reuniones no resume: extrae decisiones, tareas con responsable y fecha, y bloqueos, y vuelve a revisarse a sí misma hasta pasar un checklist.",
      en: "Each skill encodes a standard, not a template. The ticket one does not fill in fields: it applies a quality bar and refuses to return a ticket without acceptance criteria. The meeting one does not summarise: it extracts decisions, tasks with an owner and a date, and blockers, then reviews itself again until it passes a checklist.",
    },
    // Las familias se quedan en generico a proposito. Hay skills construidas
    // sobre procesos internos de un empleador, y ni su nombre ni su flujo
    // concreto pueden aparecer aqui.
    families: [
      {
        label: { es: "Producto", en: "Product" },
        description: {
          es: "PRDs, briefs y tickets listos para desarrollo",
          en: "PRDs, briefs and tickets ready for development",
        },
      },
      {
        label: { es: "Reuniones", en: "Meetings" },
        description: {
          es: "De transcripción a informe de una página con decisiones, tareas y bloqueos",
          en: "From transcript to a one-page report with decisions, tasks and blockers",
        },
      },
      {
        label: { es: "Escritura", en: "Writing" },
        description: {
          es: "Voz editorial propia y varias técnicas narrativas",
          en: "A personal editorial voice and several narrative techniques",
        },
      },
      {
        label: { es: "Carrera", en: "Career" },
        description: {
          es: "Posicionamiento, marca personal, preparación de entrevistas",
          en: "Positioning, personal brand, interview preparation",
        },
      },
      {
        label: { es: "Construcción", en: "Build" },
        description: {
          es: "Stack estándar del portafolio y creación de skills nuevas",
          en: "The portfolio's standard stack and building new skills",
        },
      },
    ],
    description: {
      es: "El sistema se construye a sí mismo: una de las skills sirve para crear las demás.",
      en: "The system builds itself: one of the skills exists to create the others.",
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
