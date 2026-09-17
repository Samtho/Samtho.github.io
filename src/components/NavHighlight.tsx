"use client";

import { useEffect } from "react";

/**
 * Marca el enlace activo de la barra. La visibilidad del panel la resuelve
 * CSS con :target; esto solo anade el aria-current, que CSS no puede poner.
 */
export function NavHighlight({ fallback }: { fallback: string }) {
  useEffect(() => {
    function sync() {
      const current = window.location.hash.slice(1) || fallback;
      const known = document.getElementById(current) ? current : fallback;

      for (const link of document.querySelectorAll<HTMLElement>("[data-nav]")) {
        if (link.dataset.nav === known) {
          link.setAttribute("aria-current", "page");
        } else {
          link.removeAttribute("aria-current");
        }
      }
    }

    sync();
    window.addEventListener("hashchange", sync);
    return () => window.removeEventListener("hashchange", sync);
  }, [fallback]);

  return null;
}
