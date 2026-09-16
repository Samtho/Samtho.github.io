# samtho.github.io

Portfolio personal de Samuel Ortega. Sitio estático en Next.js, bilingüe,
desplegado en GitHub Pages con GitHub Actions.

- Español: <https://samtho.github.io>
- Inglés: <https://samtho.github.io/en/>

El contexto completo del proyecto (stack, restricciones y reglas de contenido)
está en [`CLAUDE.md`](CLAUDE.md). Este README explica solo cómo editarlo.

## Empezar

```bash
npm install
npm run dev            # http://localhost:3000
```

| Comando | Qué hace |
|---|---|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Export estático a `./out` |
| `npm run test` | Tests unitarios (Vitest) |
| `npm run test:e2e` | Tests end to end (Playwright) |
| `npm run lint` | ESLint |
| `npx tsc --noEmit` | Chequeo de tipos |

Para los tests end to end hace falta el navegador una sola vez:
`npx playwright install chromium`.

## Añadir un proyecto

Todo el contenido vive en `src/data/`. Para publicar un proyecto nuevo se edita
**solo** `src/data/projects.ts`: se añade un objeto al array y ya aparece en la
página, en los dos idiomas.

```ts
{
  id: "mi-proyecto",
  name: "Mi Proyecto",
  tagline: { es: "Una frase.", en: "One line." },
  description: { es: "Qué es y qué resuelve.", en: "What it is and what it solves." },
  year: "2026",
  role: { es: "Producto y desarrollo", en: "Product and development" },
  stack: ["Next.js", "TypeScript"],
  tags: ["delivery"],                 // del enum de COMPETENCY_TAGS
  liveUrl: "https://ejemplo.com",     // opcional
  repoUrl: "https://github.com/...",  // opcional
  confidential: false,
  source: "personal",                 // "personal" | "academic" | "employer"
}
```

### La regla de confidencialidad

**Nada de un empleador se publica.** No es una recomendación: el esquema la
comprueba al parsear, así que un dato que la incumpla rompe el build antes de
llegar a producción.

1. Un proyecto con `source: "employer"` tiene que llevar `confidential: true`.
   El esquema rechaza la combinación contraria.
2. Un proyecto público no puede mencionar ningún término de `CONFIDENTIAL_TERMS`
   (en `src/data/schema.ts`) en su `name`, `tagline` ni `description`. Ahí están
   los empleadores, sus sistemas internos y sus clientes.
3. La lista negra aplica **solo a `projects`**. La timeline sí puede nombrar
   empleadores: el historial laboral es público.
4. La interfaz nunca lee el array directo, solo `publicProjects()`, que filtra
   lo confidencial.

Si añades un cliente o un sistema interno que no debe salir nunca, mételo en
`CONFIDENTIAL_TERMS`. La comparación ignora mayúsculas y tildes, y busca
palabras completas.

## Otros archivos de contenido

| Archivo | Qué contiene |
|---|---|
| `src/data/profile.ts` | Nombre, titular, bio, contacto, ruta del CV y de la foto |
| `src/data/timeline.ts` | Trabajo, formación y certificaciones |
| `src/data/capabilities.ts` | Las siete competencias |
| `src/data/method.ts` | Los tres pasos de método |
| `src/data/metrics.ts` | Los números de la trayectoria |
| `src/data/faq.ts` | Preguntas de recruiter |
| `src/i18n/dictionaries/` | Textos de interfaz, no contenido |

Todos validan con Zod al importarse, así que un dato mal formado rompe el build
y no la página.

## Huecos pendientes

Lo que todavía no está decidido se escribe con el literal `[por definir]` y **se
pinta en la página a propósito**, para verlo en su sitio y corregirlo mirándolo.

Antes de poner la URL en el CV, quita el `.skip` del test
`no queda ningun [por definir] en los datos` en `tests/data.test.ts`. A partir de
ahí el build falla si queda alguno.

## Despliegue

Cada push a `main` dispara `.github/workflows/deploy.yml`, que genera los tipos
de rutas, comprueba tipos, pasa los tests, construye y publica `./out`.
Si algo falla, no se publica nada.
