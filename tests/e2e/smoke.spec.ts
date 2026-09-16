import { expect, test } from "@playwright/test";

// Smoke del shell bilingue. Los tests completos de la landing llegan en el
// Milestone 4, cuando exista la timeline interactiva.

test("la portada en espanol muestra el nombre y el titular", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Samuel Ortega",
  );
  await expect(page.getByText("Creo claridad")).toBeVisible();
});

test("el toggle de idioma lleva a /en y cambia el contenido", async ({
  page,
}) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Ver esta página en inglés" }).click();
  await expect(page).toHaveURL(/\/en\/?$/);
  await expect(page.getByText("I create clarity")).toBeVisible();
});

test("el toggle de tema alterna la clase dark", async ({ page }) => {
  await page.goto("/");
  const html = page.locator("html");
  const wasDark = await html.evaluate((el) => el.classList.contains("dark"));
  await page.getByRole("button", { name: /modo (oscuro|claro)/ }).click();
  await expect(html).toHaveClass(wasDark ? /^(?!.*\bdark\b).*$/ : /\bdark\b/);
});
