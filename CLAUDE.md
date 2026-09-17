# CLAUDE.md

Contexto permanente del proyecto. Léelo entero antes de escribir código.

## Qué es esto

Portfolio web personal de Samuel Ortega, Product Manager en Madrid.
Es la URL que va en su CV. **No es una landing con scroll: es una aplicación con
barra lateral y paneles.** El producto es su trayectoria, y la prueba son sus
aplicaciones, embebidas y usables dentro de la propia web.

Audiencia: hiring managers, recruiters y contactos profesionales que dedican
90 segundos a la página antes de decidir si siguen leyendo.

URL final: https://samtho.github.io

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
que renderizan el mismo shell con un locale distinto. Es más simple, evita la
gimnasia de redirects en export estático y deja el español en la raíz.

### Paneles, no scroll

El shell tiene barra lateral y un área de contenido. Cada elemento de la barra
abre un panel. **Los paneles se enrutan por hash** (`/#jano`, `/en/#jano`), no
por ruta propia:

- mantiene dos páginas en el export estático, no treinta y dos;
- el conmutador de idioma conserva el hash, así que cambiar de idioma no te
  saca del panel en el que estabas;
- los enlaces siguen siendo compartibles.

La visibilidad del panel activo se resuelve **con CSS `:target`**, no con estado
de React. Así no hay ni un fotograma de panel equivocado al abrir un enlace
directo, y sin JavaScript la web degrada a un documento largo y legible.

Consecuencia que hay que respetar: **el conmutador de idioma navega de verdad**
(`location.assign`), no con `router.push`. El navegador no reevalúa `:target` en
una navegación de cliente, y el panel se perdería.

### Grupos de la barra lateral

| Grupo | Paneles |
|---|---|
| PERFIL | Overview, Trayectoria, Método, Competencias, FAQ |
| APPS | Jano, Umbral, Aura Closet, PI Planning Lite, Panoplia, The Movies Database |
| ANÁLISIS | SaludPlus, Grupo B, LogiFast, Rentabilidad ML |
| SISTEMA IA | Mis skills, Integraciones MCP |

Los contadores de la barra **se derivan de los datos** (`src/lib/nav.ts`),
nunca se escriben a mano.

En móvil no hay barra lateral: cabecera arriba y barra inferior de cuatro
pestañas (Overview, Apps, Trayectoria, Más). "Más" abre una hoja con el resto,
más ES/EN, tema y CV.

### Anatomía de un panel de app

Fija para todos los paneles con ficha, incluidos los de Análisis y Sistema IA:

```
[etiqueta mono]  APP
[titular]        Nombre
[subtítulo]      Una frase de qué hace

El problema  ·  Mi papel  ·  La decisión  ·  Stack   (rejilla de cuatro)

[botones]        Abrir en pestaña nueva  ·  Repositorio
─────────────────────────────────────────────────────
[embed, altura mínima 640px]
```

La ficha es el argumento; el embed es la prueba.

### Los embeds son perezosos, siempre

**El iframe no se monta al abrir el panel.** Se pinta un marco con el nombre de
la app y un botón "Cargar aplicación"; el iframe aparece al pulsarlo. Sin esto
se caen los 97 de Lighthouse, que es el motivo de la regla. Hay un test e2e que
comprueba que no existe ningún iframe antes de pulsar.

En móvil no hay iframe: ficha completa y un botón que abre la app en otra
pestaña.

### Antes de embeber una app

El embed deja la aplicación a un clic de un recruiter. Hay que abrir la versión
publicada y comprobar que no arrastra datos reales de ningún empleador: nombres
de personas, clientes, costes o métricas de negocio. Si los arrastra, no se
embebe.

### Árbol

```
src/
├── app/
│   ├── layout.tsx              root layout, fuentes, script de arranque
│   ├── page.tsx                <AppShell locale="es" />
│   ├── en/page.tsx             <AppShell locale="en" />
│   ├── opengraph-image.tsx     imagen OG generada
│   ├── sitemap.ts, robots.ts
│   └── globals.css
├── components/
│   ├── AppShell.tsx            barra lateral + paneles + navegación móvil
│   ├── Sidebar.tsx, MobileNav.tsx, NavHighlight.tsx
│   ├── panels/
│   │   ├── Panel.tsx           carcasa común de panel
│   │   ├── AppPanel.tsx        la anatomía de ficha de arriba
│   │   ├── LazyEmbed.tsx       marco con botón "Cargar aplicación"
│   │   ├── Overview.tsx, AppsIndex.tsx, ProfilePanels.tsx
│   └── ui/                     shadcn
├── data/                       (sin cambios respecto a la v1)
├── i18n/
└── lib/
    ├── nav.ts                  estructura y contadores de la barra
    ├── metadata.ts, date.ts, assets.ts
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

Lenguaje visual aprobado en Claude Design. No improvisar sobre esto.

- **Fondo de página crema cálido** en claro, **negro real** en oscuro.
- **Índigo, un solo acento.** Ningún segundo color de marca.
- Tres papeles tipográficos: **sans geométrica** en titulares (Outfit), **sans
  neutra** en cuerpo (Geist), y **monoespaciada para todo lo que sea dato**:
  fechas, tags, contadores y etiquetas de sección (Geist Mono).
- **Etiqueta de sección** en mono, mayúsculas, tracking amplio, gris medio,
  encima de cada titular de panel.
- **Tarjetas** con borde de 1px y radio suave. Sin sombras pesadas.
- **Avatar cuadrado** con las iniciales SO sobre índigo, arriba de la barra.
- Modo claro y oscuro, con `prefers-color-scheme` y override manual.
- Móvil primero. Se revisa a 375px antes de dar nada por terminado.

## Huecos pendientes

Dos marcadores distintos, y no son intercambiables:

- `TODO: Sam debe rellenar` **nunca se renderiza**. Es un dato que falta.
- `[por definir]` **se pinta en la página a propósito**, para que Sam vea el
  hueco en su sitio y lo corrija mirándolo.

Antes de publicar la URL en el CV hay que quitar el `.skip` del test
`no queda ningun [por definir] en los datos`.

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
5. Ninguna cifra inventada; los huecos llevan el marcador que toque.
6. Lighthouse en móvil sigue en 95 o más de Performance y 100 de Accessibility.

## Cómo trabajar conmigo

- Un milestone por vez. Termina, enseña el resultado y espera confirmación.
- Si una decisión tiene más de un camino razonable, plantéala con opciones
  y una recomendación antes de implementar.
- Commits pequeños en inglés, formato conventional commits.
