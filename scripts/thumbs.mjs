/**
 * Genera las miniaturas del catalogo de apps.
 *
 *   npm run thumbs               # las siete
 *   npm run thumbs -- jano       # solo las que coincidan con el filtro
 *
 * Abre cada app publicada con Chromium, espera a que termine de pintar y
 * guarda public/thumbs/<slug>.webp a 1280x800. Es reejecutable: cuando una
 * app cambie, se vuelve a correr y la miniatura se regenera sola.
 *
 * Dos cosas se comprueban antes de escribir cada archivo, y las dos abortan
 * la captura en vez de guardar algo que nadie mire:
 *
 *   1. Confidencialidad. Se lee el texto visible dentro del recorte y se pasa
 *      por la misma lista negra que valida los datos del sitio. Una app puede
 *      cambiar de maquetacion y subir al recorte una linea que menciona a un
 *      empleador o a un cliente: eso no puede entrar aqui en silencio.
 *   2. Contenido. Las apps que arrancan vacias llevan su propio `verify`. Sin
 *      miniatura antes que con una miniatura vacia sin enterarse.
 *
 * La lista de abajo tiene que cuadrar con src/data/projects.ts. Eso no se
 * vigila a ojo: lo comprueba tests/thumbs.test.ts.
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { chromium } from "@playwright/test";
import sharp from "sharp";
import { findConfidentialTerms } from "../src/data/schema.ts";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const OUT_DIR = path.join(ROOT, "public", "thumbs");

export const WIDTH = 1280;
export const HEIGHT = 800;

/**
 * Anchos que se escriben de cada captura. El de 1280 conserva el nombre limpio
 * porque es la captura canonica; los demas existen para que una tarjeta de 370
 * puntos no se descargue una imagen de 1280, que es la mitad del peso de la
 * pagina de entrada. El navegador elige con srcset.
 */
export const THUMB_WIDTHS = [480, 800, 1280];

export const thumbFile = (slug, width) =>
  width === WIDTH ? `${slug}.webp` : `${slug}-${width}.webp`;

/**
 * Cuantas epicas de ejemplo lleva el tablero de PI Planning Lite. Son las
 * justas para que la lista llene el recorte: con menos, la mitad de abajo de
 * la miniatura sale en blanco. El modo de datos genericos de la app trae
 * quince nombres distintos, asi que hasta quince no se repite ninguno.
 */
const PI_EPICS = 12;

/**
 * Una entrada por URL publicada, no por proyecto: Panoplia tiene dos.
 *
 *   settleMs  respiro extra para las apps que animan su entrada
 *   prepare   lo que hay que hacer antes de disparar, para las apps que abren
 *             sobre una capa que tapa el producto o que arrancan en blanco
 *   verify    lanza si la pagina no esta en el estado que la miniatura promete
 */
export const SHOTS = [
  { slug: "jano", project: "jano", url: "https://samtho.github.io/jano-web/" },
  { slug: "umbral", project: "umbral", url: "https://samtho.github.io/umbral/" },
  {
    slug: "aura-closet",
    project: "aura-closet",
    url: "https://samtho.github.io/Aura-closet/",
    // Arranca con un tour de siete pasos encima del inventario. Se cierra
    // con "Saltar tour", que pide confirmacion con un confirm() nativo.
    async prepare(page) {
      page.on("dialog", (dialog) => dialog.accept());
      await page.getByRole("button", { name: /saltar tour/i }).first().click();
    },
    // El aviso de "tour completado" tarda unos segundos en irse.
    settleMs: 6_000,
    async verify(page) {
      await page.getByRole("heading", { name: /^Inventario$/ }).waitFor({ timeout: 5_000 });
    },
  },
  {
    slug: "pi-planning-lite",
    project: "pi-planning-lite",
    url: "https://samtho.github.io/fantastic-management-quarter/",
    // Es una plantilla: abre en un asistente de tres pasos y termina en un
    // tablero a cero. Vacio no se entiende que es, asi que se rellena con un
    // quarter de ejemplo y se enciende el modo de datos genericos que trae la
    // propia app, que renombra las epicas y avisa en pantalla de que lo son.
    async prepare(page) {
      page.on("dialog", (dialog) => dialog.accept());
      const fields = page.locator("input[type=text], input:not([type])");
      await fields.nth(0).fill("Acme Corp");
      await fields.nth(1).fill("Plataforma Demo");
      await fields.nth(2).fill("Ana Ejemplo (CPO)");
      await page.getByRole("button", { name: /^siguiente/i }).first().click();
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: /saltar/i }).first().click();
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: /empezar/i }).first().click();
      await page.waitForTimeout(1_500);

      const epic = page.getByPlaceholder(/nueva épica/i);
      for (let i = 1; i <= PI_EPICS; i += 1) {
        await epic.fill(`Épica ${i}`);
        await epic.press("Enter");
        await page.waitForTimeout(200);
      }
      // La ultima anadida se abre en su formulario y tapa el tablero. Se
      // colapsa pulsando su chapa de prioridad, que siempre es la P1.
      await page.getByText(`P1/${PI_EPICS}`, { exact: true }).click();
      await page.waitForTimeout(400);

      // El modo de datos genericos vive en el panel de configuracion.
      await page.getByRole("button", { name: "⚙️" }).click();
      await page.waitForTimeout(500);
      await page.getByRole("button", { name: /datos genéricos/i }).click();
      await page.waitForTimeout(400);
      await page.getByRole("button", { name: /cerrar/i }).click();
    },
    settleMs: 1_500,
    async verify(page) {
      const rows = await page.getByText(/^P\d+\/\d+$/).count();
      if (rows < PI_EPICS) {
        throw new Error(`el tablero salio con ${rows} epicas, esperaba ${PI_EPICS}`);
      }
      // El modo generico renombra las epicas. Si sobrevive el nombre que puso
      // este script, no se encendio y el tablero pasaria por datos de verdad.
      if ((await page.getByText(/^Épica \d+$/).count()) > 0) {
        throw new Error("no se encendio el modo de datos genericos");
      }
    },
  },
  {
    slug: "panoplia-defensa",
    project: "panoplia",
    url: "https://samtho.github.io/panoplia-defensa-v4/",
  },
  {
    slug: "panoplia-dashboard",
    project: "panoplia",
    url: "https://samtho.github.io/panoplia-dashboard/",
  },
  {
    slug: "the-movies-database",
    project: "the-movies-database",
    url: "https://samtho.github.io/the-movies-database/",
  },
];

/**
 * El texto que de verdad se ve dentro del recorte. No vale con el texto de la
 * pagina entera: lo que no entra en 1280x800 no sale en la miniatura.
 */
function readVisibleText(page) {
  return page.evaluate(
    ({ width, height }) => {
      const parts = [];
      const inside = (rect) =>
        rect.width > 0 &&
        rect.height > 0 &&
        rect.bottom > 0 &&
        rect.right > 0 &&
        rect.top < height &&
        rect.left < width;

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      for (let node = walker.nextNode(); node; node = walker.nextNode()) {
        const text = node.nodeValue?.trim();
        if (!text || !node.parentElement) continue;

        const style = getComputedStyle(node.parentElement);
        if (style.visibility === "hidden" || style.opacity === "0") continue;

        const range = document.createRange();
        range.selectNodeContents(node);
        if (inside(range.getBoundingClientRect())) parts.push(text);
      }

      for (const image of document.images) {
        if (image.alt && inside(image.getBoundingClientRect())) parts.push(image.alt);
      }

      return parts.join("\n");
    },
    { width: WIDTH, height: HEIGHT },
  );
}

async function capture(context, shot) {
  const page = await context.newPage();
  try {
    await page.goto(shot.url, { waitUntil: "load", timeout: 45_000 });
    // networkidle es orientativo: si la app mantiene un socket abierto no se
    // cumple nunca, y la captura sigue siendo valida.
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await shot.prepare?.(page);
    await page.waitForTimeout(shot.settleMs ?? 1_200);

    await shot.verify?.(page);

    const leaked = findConfidentialTerms(await readVisibleText(page));
    if (leaked.length > 0) {
      throw new Error(`lista negra en el recorte: ${leaked.join(", ")}`);
    }

    const png = await page.screenshot({ type: "png", animations: "disabled" });
    let bytes = 0;
    for (const width of THUMB_WIDTHS) {
      const webp = await sharp(png)
        .resize(width, Math.round((width * HEIGHT) / WIDTH), {
          fit: "cover",
          position: "top",
        })
        .webp({ quality: 80, effort: 6 })
        .toBuffer();
      await writeFile(path.join(OUT_DIR, thumbFile(shot.slug, width)), webp);
      if (width === WIDTH) bytes = webp.length;
    }
    return { bytes, title: await page.title() };
  } finally {
    await page.close();
  }
}

async function main() {
  const filters = process.argv.slice(2).filter((arg) => !arg.startsWith("-"));
  const shots = filters.length
    ? SHOTS.filter((shot) => filters.some((filter) => shot.slug.includes(filter)))
    : SHOTS;

  if (shots.length === 0) {
    console.error(`Ningun slug coincide con: ${filters.join(", ")}`);
    process.exitCode = 1;
    return;
  }

  await mkdir(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const context = await browser.newContext({
    viewport: { width: WIDTH, height: HEIGHT },
    // x2 y luego se reduce a 1280x800: el reescalado limpia los bordes.
    deviceScaleFactor: 2,
    colorScheme: "light",
    reducedMotion: "reduce",
  });

  const failures = [];
  for (const shot of shots) {
    process.stdout.write(`  ${shot.slug.padEnd(20)} `);
    try {
      const { bytes, title } = await capture(context, shot);
      console.log(`ok  ${(bytes / 1024).toFixed(0).padStart(4)} KB  ${title}`);
    } catch (error) {
      console.log(`FALLO  ${error.message.split("\n")[0]}`);
      failures.push(shot.slug);
    }
  }

  await browser.close();

  if (failures.length > 0) {
    console.error(`\nSin guardar ${failures.length}: ${failures.join(", ")}`);
    process.exitCode = 1;
  }
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await main();
}
