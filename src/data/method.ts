import { z } from "zod";
import { methodStepSchema, type MethodStep } from "./schema";

/** Como Sam aborda un problema de producto. Tres pasos, en orden. */
export const method: MethodStep[] = z.array(methodStepSchema).parse([
  {
    id: "cause",
    title: {
      es: "Buscar la causa, no el síntoma.",
      en: "Look for the cause, not the symptom.",
    },
    description: {
      es: "Los sistemas tienen lógica. Cuando algo falla hay un motivo, y encontrarlo vale más que tapar el problema.",
      en: "Systems have a logic. When something fails there is a reason, and finding it is worth more than covering the problem up.",
    },
  },
  {
    id: "clarity",
    title: { es: "Crear claridad.", en: "Create clarity." },
    description: {
      es: "Quién es dueño de qué, qué se prioriza y por qué, y cómo cada decisión llega a la persona correcta en el momento correcto.",
      en: "Who owns what, what gets prioritised and why, and how each decision reaches the right person at the right time.",
    },
  },
  {
    id: "action",
    title: {
      es: "Cerrar el hueco entre la reunión y la acción.",
      en: "Close the gap between the meeting and the action.",
    },
    description: {
      es: "Flujos reales de trabajo donde lo que se acuerda se convierte en algo que alguien puede ejecutar.",
      en: "Real working flows where what gets agreed turns into something someone can execute.",
    },
  },
]);
