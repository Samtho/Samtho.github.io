import { projectsByGroup } from "@/data/projects";
import type { Locale } from "@/i18n/config";
import type { Dictionary } from "@/i18n/getDictionary";
import { AppsGrid } from "./AppsGrid";
import { Panel } from "./Panel";

type Props = {
  locale: Locale;
  dictionary: Dictionary;
};

/** Indice de las apps. Cada tarjeta abre el panel de su aplicacion. */
export function AppsIndex({ locale, dictionary }: Props) {
  return (
    <Panel
      id="apps"
      eyebrow={dictionary.sidebar.groupApps}
      title={dictionary.sidebar.appsTitle}
      lead={dictionary.sidebar.appsLead}
      width="wide"
    >
      <AppsGrid
        apps={projectsByGroup("apps")}
        locale={locale}
        dictionary={dictionary}
      />
    </Panel>
  );
}
