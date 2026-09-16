"use client";

import { useEffect } from "react";

/**
 * Da vida a la espina, que es la firma visual del sitio:
 * enciende el nodo de cada seccion al entrar en pantalla y llena la linea
 * en indigo segun avanza la lectura.
 *
 * Vive aparte para que las secciones sigan siendo server components.
 */
export function Spine() {
  useEffect(() => {
    const spine = document.querySelector<HTMLElement>(".spine");
    const nodes = document.querySelectorAll<HTMLElement>("[data-spine-node]");

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-lit", "true");
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: "-25% 0px -25% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));

    if (!spine) return () => observer.disconnect();

    // Ligado al scroll, no animado: no hay nada que reducir con
    // prefers-reduced-motion porque el movimiento lo hace la persona.
    let frame = 0;

    function update() {
      frame = 0;
      if (!spine) return;
      const rect = spine.getBoundingClientRect();
      const anchor = window.innerHeight * 0.5;
      const progress = (anchor - rect.top) / rect.height;
      spine.style.setProperty(
        "--spine-progress",
        `${Math.min(Math.max(progress, 0), 1) * 100}%`,
      );
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return null;
}
