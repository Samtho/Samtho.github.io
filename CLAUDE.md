# CLAUDE.md

Contexto permanente del proyecto. Léelo entero antes de escribir código.

## Qué es esto

Portfolio web personal de Samuel Ortega, Product Manager en Madrid.
Es la URL que va en su CV. Funciona como una landing de producto donde el producto
es su trayectoria profesional: un CV interactivo, no un listado de trabajos.

Audiencia: hiring managers, recruiters y contactos profesionales que dedican
90 segundos a la página antes de decidir si siguen leyendo.

URL final: https://<TU-USUARIO>.github.io

## Stack

- Next.js 16, App Router, Turbopack
- TypeScript en modo strict
- Tailwind v4
- shadcn/ui
- Zod para validar los datos de contenido
- Vitest para tests unitarios, Playwright para end to end
- Deploy: GitHub Pages vía GitHub Actions

No hay backend, base de datos, auth ni pagos. Es un sitio estático.

## Restricciones de build

El sitio se exporta como estático. Esto NO es negociable y condiciona todo:

```ts
// next.config.ts
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
}
```

Consecuencias que debes respetar siempre:

- Prohibido: route handlers, server actions, middleware, ISR, `revalidate`,
  `next/image` con loader remoto, `redirect()` en server components.
- Todo dato viene de archivos TypeScript en `src/data/`, resueltos en build time.
- Cualquier interactividad va en client components marcados con `'use client'`.
- `public/.nojekyll` debe existir o GitHub Pages ignorará las carpetas `_next`.

## Reglas de contenido

### 1. Confidencialidad

Regla dura, se valida con un test automático.

**Permitido:**
- Nombrar a Giunti Psychometrics y NTT DATA como empleadores, con rol, fechas
  y una descripción genérica de responsabilidades. Esto es historial laboral público.
- Panoplia: es trabajo del máster en INESDI y hay permiso explícito para publicarlo.
- Los side projects propios (tracker de suscripciones, previsualizador de LinkedIn,
  bookmark manager, editor de CV, posters de mapas, closet virtual, Verbolario).

**Prohibido, sin excepción:**
- Cualquier proyecto, caso de éxito, captura, métrica, diagrama, nombre de sistema
  interno o documento de Giunti en la sección de proyectos.
- Datos de clientes, ventas, roadmap o arquitectura de cualquier empleador.

Todo elemento del array `projects` lleva el campo `confidential: boolean`.
Solo se renderiza lo que tiene `confidential: false`. El test
`tests/confidentiality.test.ts` falla el build si algo se cuela.

### 2. Nunca inventes datos

Si no tienes una cifra, una fecha o un logro concreto, escribe literalmente
`TODO: Sam debe rellenar` en el campo. No inventes métricas de impacto,
porcentajes, tamaños de equipo ni resultados. Una página con números falsos
es un riesgo real en una entrevista.

### 3. Bilingüe español e inglés

Español en la raíz `/`, inglés en `/en`. El español es el idioma por defecto.

Separación de responsabilidades:

- **Contenido** (descripciones de proyectos, bullets de la timeline, FAQ):
  vive en `src/data/` con la forma `{ es: string, en: string }`, validada con Zod.
- **Chrome de interfaz** (labels de botones, títulos de sección, aria-labels):
  vive en `src/i18n/dictionaries/es.json` y `en.json`.

Un test verifica que ningún campo bilingüe tiene una de las dos versiones vacía.

## Arquitectura

No se usa librería de i18n ni segmento dinámico `[locale]`. Dos rutas explícitas
que renderizan el mismo componente con un locale distinto. Es más simple,
evita la gimnasia de redirects en export estático y deja el español en la raíz.

```
src/
├── app/
│   ├── layout.tsx              root layout, fuentes, metadata base
│   ├── page.tsx                <Landing locale="es" />
│   ├── en/page.tsx             <Landing locale="en" />
│   └── globals.css
├── components/
│   ├── Landing.tsx             compone todas las secciones en orden
│   ├── sections/
│   │   ├── Hero.tsx
│   │   ├── Proof.tsx           logos de empresas e instituciones
│   │   ├── Method.tsx          cómo trabaja, en 3 pasos
│   │   ├── Capabilities.tsx    competencias como "features"
│   │   ├── Timeline.tsx        client component con filtros
│   │   ├── Projects.tsx        grid de proyectos no confidenciales
│   │   ├── Metrics.tsx         números de la trayectoria
│   │   ├── Faq.tsx
│   │   └── Cta.tsx             LinkedIn, email, descargar CV
│   ├── LanguageToggle.tsx
│   └── ui/                     shadcn
├── data/
│   ├── schema.ts               todos los esquemas Zod
│   ├── profile.ts              nombre, titular, bio, contacto
│   ├── timeline.ts             trabajo, formación, certificaciones
│   ├── projects.ts
│   ├── capabilities.ts
│   ├── metrics.ts
│   └── faq.ts
├── i18n/
│   ├── config.ts               type Locale = 'es' | 'en'
│   ├── dictionaries/{es,en}.json
│   └── getDictionary.ts
└── lib/utils.ts
public/
├── .nojekyll
├── cv-samuel-ortega.pdf
└── logos/
tests/
├── data.test.ts
├── confidentiality.test.ts
├── i18n.test.ts
└── e2e/landing.spec.ts
```

## Convenciones de código

- Explícito antes que ingenioso. Sin abstracciones prematuras.
  Si algo se repite dos veces, se deja; a la tercera se extrae.
- Nada de `any`. Los tipos salen de `z.infer` de los esquemas Zod.
- Todos los archivos de `src/data/` se validan con `schema.parse()` en el momento
  de importarlos, para que un dato mal formado rompa el build y no la página.
- Client components solo donde hace falta estado: `Timeline`, `LanguageToggle`.
  El resto son server components.
- Accesibilidad: contraste AA mínimo, foco visible, navegable con teclado,
  `prefers-reduced-motion` respetado en todas las animaciones.
- Sin librerías de animación pesadas. Transiciones CSS y `IntersectionObserver`.

## Diseño

- Base zinc, coherente con el resto del portafolio de side projects.
- Color de acento de este proyecto: **indigo**.
- Modo claro y oscuro, con `prefers-color-scheme` y un override manual opcional.
- Móvil primero. Se revisa a 375px antes de dar cualquier sección por terminada.

## Comandos

```bash
npm run dev            # desarrollo
npm run build          # export estático a ./out
npm run test           # Vitest
npm run test:e2e       # Playwright
npm run lint
npx tsc --noEmit       # chequeo de tipos
```

## Antes de decir que algo está terminado

1. `npx tsc --noEmit` pasa.
2. `npm run test` pasa.
3. `npm run build` genera `./out` sin errores.
4. Revisado a 375px de ancho.
5. Ninguna cifra inventada; los huecos llevan `TODO: Sam debe rellenar`.

## Cómo trabajar conmigo

- Un milestone por vez. Termina, enseña el resultado y espera confirmación.
- Si una decisión tiene más de un camino razonable, plantéala con opciones
  y una recomendación antes de implementar.
- Commits pequeños en inglés, formato conventional commits.
