import { expect, type Page, test } from "@playwright/test";

const entries = (page: Page) =>
  page.getByTestId("timeline-entry").filter({ visible: true });

/** Lee el contador "N de M entradas". */
async function counts(page: Page) {
  const text = (await page.getByTestId("timeline-count").textContent()) ?? "";
  const [visible, total] = text.match(/\d+/g)?.map(Number) ?? [];
  return { visible: visible ?? 0, total: total ?? 0 };
}

test.describe("timeline", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/#timeline");
  });

  test("el contador cuadra con las entradas visibles", async ({ page }) => {
    const { visible } = await counts(page);
    await expect(entries(page)).toHaveCount(visible);
  });

  test("filtrar por un tag reduce las entradas y el contador cuadra", async ({
    page,
  }) => {
    const before = await counts(page);

    await page.getByRole("button", { name: "Datos", exact: true }).click();

    const after = await counts(page);
    expect(after.visible).toBeLessThan(before.visible);
    await expect(entries(page)).toHaveCount(after.visible);
  });

  test("combinar dos tags muestra la union", async ({ page }) => {
    await page.getByRole("button", { name: "Datos", exact: true }).click();
    const onlyData = (await counts(page)).visible;

    await page.getByRole("button", { name: "Agilidad", exact: true }).click();
    const both = (await counts(page)).visible;

    // Union, no interseccion: anadir un tag nunca puede mostrar menos.
    expect(both).toBeGreaterThanOrEqual(onlyData);
    await expect(entries(page)).toHaveCount(both);
  });

  test("limpiar filtros restaura el total", async ({ page }) => {
    await page.getByRole("button", { name: "Datos", exact: true }).click();
    await page.getByRole("button", { name: "Ver todo" }).click();

    const { visible, total } = await counts(page);
    expect(visible).toBe(total);
    await expect(entries(page)).toHaveCount(total);
  });

  test("el estado vacio aparece y su boton restaura el total", async ({
    page,
  }) => {
    // Certificaciones cruzado con Datos no da ninguna entrada.
    await page
      .getByRole("button", { name: "Certificaciones", exact: true })
      .click();
    await page.getByRole("button", { name: "Datos", exact: true }).click();

    const empty = page.getByTestId("timeline-empty");
    await expect(empty).toBeVisible();
    expect((await counts(page)).visible).toBe(0);

    await empty.getByRole("button", { name: "Limpiar filtros" }).click();
    const { visible, total } = await counts(page);
    expect(visible).toBe(total);
  });

  test("todos los filtros se alcanzan con el tabulador", async ({ page }) => {
    const first = page.getByRole("button", { name: "Todo", exact: true });
    await first.focus();
    await expect(first).toBeFocused();

    const labels = [
      "Trabajo",
      "Formación",
      "Certificaciones",
      "Desde 2018",
      "Discovery",
      "Estrategia",
      "Delivery",
      "Datos",
      "IA aplicada",
      "Agilidad",
      "Stakeholders",
    ];

    // Tabulando desde el primer filtro se recorren todos, en orden y sin saltos.
    for (const label of labels) {
      await page.keyboard.press("Tab");
      await expect(
        page.getByRole("button", { name: label, exact: true }),
        `no se llega a ${label} tabulando`,
      ).toBeFocused();
    }
  });

  test("una entrada se despliega con aria-expanded", async ({ page }) => {
    const toggle = page
      .getByRole("button", { name: "Ver detalle" })
      .first();

    await expect(toggle).toHaveAttribute("aria-expanded", "false");
    await toggle.click();
    await expect(
      page.getByRole("button", { name: "Ocultar detalle" }).first(),
    ).toHaveAttribute("aria-expanded", "true");
  });
});

test.describe("shell", () => {
  test("el toggle de idioma lleva a /en y cambia el contenido", async ({
    page,
  }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Ver esta página en inglés" }).click();
    await expect(page).toHaveURL(/\/en\/?$/);
    await expect(page.getByText("I create clarity")).toBeVisible();
  });

  test("el toggle de idioma conserva el ancla", async ({ page }) => {
    await page.goto("/#projects");
    await page.getByRole("link", { name: "Ver esta página en inglés" }).click();
    await expect(page).toHaveURL(/\/en\/#projects$/);
  });

  test("el enlace del CV apunta a un PDF que existe", async ({
    page,
    request,
  }) => {
    await page.goto("/");
    const cv = page.locator('a[href$=".pdf"]').first();

    if ((await cv.count()) === 0) {
      // Todavia no hay PDF: la pagina no puede ofrecer un enlace roto,
      // asi que muestra el hueco marcado en su lugar.
      await expect(page.getByText("[por definir]").first()).toBeVisible();
      return;
    }

    const href = await cv.getAttribute("href");
    const response = await request.get(href ?? "");
    expect(response.status()).toBe(200);
  });
});

test.describe("paneles", () => {
  test("solo hay un panel visible a la vez", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-panel]:visible")).toHaveCount(1);
    await expect(page.locator("[data-panel]:visible")).toHaveAttribute(
      "data-panel",
      "overview",
    );
  });

  test("un enlace directo abre su panel, sin pasar por overview", async ({
    page,
  }) => {
    await page.goto("/#jano");
    const visible = page.locator("[data-panel]:visible");
    await expect(visible).toHaveCount(1);
    await expect(visible).toHaveAttribute("data-panel", "jano");
    await expect(page.getByRole("heading", { level: 1 })).toHaveText("Jano");
  });

  test("el enlace de la barra marca el panel activo", async ({ page }) => {
    await page.goto("/#umbral");
    await expect(page.locator('[data-nav="umbral"]').first()).toHaveAttribute(
      "aria-current",
      "page",
    );
  });

  test("cambiar de idioma no te saca del panel", async ({ page }) => {
    await page.goto("/#jano");
    await page.getByRole("link", { name: "Ver esta página en inglés" }).click();
    await expect(page).toHaveURL(/\/en\/#jano$/);
    await expect(page.locator("[data-panel]:visible")).toHaveAttribute(
      "data-panel",
      "jano",
    );
  });

  // La regla que sostiene los 97 de Lighthouse.
  test("el iframe no existe hasta pulsar el boton", async ({ page }) => {
    await page.goto("/#jano");
    await expect(page.locator("iframe")).toHaveCount(0);

    await page.getByRole("button", { name: "Cargar aplicación" }).click();
    await expect(page.locator("iframe")).toHaveCount(1);
    await expect(page.locator("iframe")).toHaveAttribute(
      "src",
      "https://samtho.github.io/jano-web/",
    );
  });

  test("Jano y Umbral se enlazan entre si", async ({ page }) => {
    await page.goto("/#jano");
    await page.getByRole("link", { name: "Umbral", exact: true }).first().click();
    await expect(page.locator("[data-panel]:visible")).toHaveAttribute(
      "data-panel",
      "umbral",
    );
  });
});
