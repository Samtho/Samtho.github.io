import { expect, test } from "@playwright/test";

// Smoke del Milestone 0. Los tests reales de la landing llegan en el Milestone 4.
test("la portada muestra el nombre", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Samuel Ortega",
  );
});
