import { capabilities } from "@/data/capabilities";
import { faq } from "@/data/faq";
import { method } from "@/data/method";
import { projectsByGroup } from "@/data/projects";
import { timeline } from "@/data/timeline";
import type { Dictionary } from "@/i18n/getDictionary";

export type NavItem = {
  id: string;
  label: string;
  /** Solo en los paneles de perfil, y siempre derivado de los datos. */
  count?: number;
};

export type NavGroup = {
  label: string;
  items: NavItem[];
};

/**
 * Estructura de la barra lateral. Los contadores salen de los datos, nunca
 * se escriben a mano: asi no pueden quedarse desfasados.
 */
export function navGroups(dictionary: Dictionary): NavGroup[] {
  const panels = (group: "apps" | "analysis" | "ai"): NavItem[] =>
    projectsByGroup(group).map((project) => ({
      id: project.id,
      label: project.name,
    }));

  return [
    {
      label: dictionary.sidebar.groupProfile,
      items: [
        { id: "overview", label: dictionary.sidebar.overview },
        {
          id: "timeline",
          label: dictionary.sidebar.timeline,
          count: timeline.length,
        },
        {
          id: "method",
          label: dictionary.sidebar.method,
          count: method.length,
        },
        {
          id: "capabilities",
          label: dictionary.sidebar.capabilities,
          count: capabilities.length,
        },
        { id: "faq", label: dictionary.sidebar.faq, count: faq.length },
      ],
    },
    { label: dictionary.sidebar.groupApps, items: panels("apps") },
    { label: dictionary.sidebar.groupAnalysis, items: panels("analysis") },
    { label: dictionary.sidebar.groupAi, items: panels("ai") },
  ];
}
