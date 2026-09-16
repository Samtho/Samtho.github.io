import { z } from "zod";
import { faqItemSchema, TODO, type FaqItem } from "./schema";

/** Las preguntas que hace todo recruiter en los primeros cinco minutos. */
export const faq: FaqItem[] = z.array(faqItemSchema).parse([
  {
    id: "role",
    question: {
      es: "¿Qué tipo de rol buscas?",
      en: "What kind of role are you looking for?",
    },
    answer: { es: TODO, en: TODO },
  },
  {
    id: "work-mode",
    question: {
      es: "¿Presencial, híbrido o remoto?",
      en: "On-site, hybrid or remote?",
    },
    answer: { es: TODO, en: TODO },
  },
  {
    id: "industries",
    question: {
      es: "¿En qué industrias te mueves mejor?",
      en: "Which industries do you know best?",
    },
    answer: { es: TODO, en: TODO },
  },
  {
    id: "languages",
    question: {
      es: "¿En qué idiomas trabajas?",
      en: "Which languages do you work in?",
    },
    answer: {
      es: "Español nativo, inglés avanzado y portugués B1.",
      en: "Native Spanish, advanced English and B1 Portuguese.",
    },
  },
  {
    id: "availability",
    question: {
      es: "¿Estás disponible ahora mismo?",
      en: "Are you available right now?",
    },
    answer: { es: TODO, en: TODO },
  },
]);
