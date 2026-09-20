import { z } from "zod";
import { faqItemSchema, type FaqItem } from "./schema";

/**
 * Las preguntas que hace todo recruiter en los primeros cinco minutos.
 *
 * La de disponibilidad se quito a proposito: Sam esta empleado y esa
 * respuesta no compensa el riesgo de publicarla.
 */
export const faq: FaqItem[] = z.array(faqItemSchema).parse([
  {
    id: "role",
    question: {
      es: "¿Qué tipo de rol buscas?",
      en: "What kind of role are you looking for?",
    },
    answer: {
      es: "Product Manager especializado en IA aplicada a producto. Me interesan equipos donde la IA forme parte del producto o del sistema de trabajo, no como capa de marketing.",
      en: "A Product Manager focused on AI applied to the product. I am interested in teams where AI is part of the product or of the working system, not a marketing layer.",
    },
  },
  {
    id: "work-mode",
    question: {
      es: "¿En qué modalidad trabajas?",
      en: "What working arrangement do you want?",
    },
    answer: {
      es: "Remoto, con disponibilidad para viajar. He coordinado equipos en tres países y sé lo que cuesta que eso funcione.",
      en: "Remote, with availability to travel. I have coordinated teams across three countries and I know what it takes to make that work.",
    },
  },
  {
    id: "industries",
    question: {
      es: "¿En qué industrias te mueves mejor?",
      en: "Which industries do you know best?",
    },
    answer: {
      es: "Ecommerce, banca, utilities, telecomunicaciones, transporte y evaluación psicométrica.",
      en: "Ecommerce, banking, utilities, telecommunications, transport and psychometric assessment.",
    },
  },
  {
    id: "languages",
    question: {
      es: "¿En qué idiomas trabajas?",
      en: "Which languages do you work in?",
    },
    answer: {
      es: "Español nativo, inglés C1 y portugués B1.",
      en: "Native Spanish, C1 English and B1 Portuguese.",
    },
  },
]);
