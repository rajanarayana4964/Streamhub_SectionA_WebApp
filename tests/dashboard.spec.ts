import { test, expect } from "@playwright/test";

test.describe("FinTrack Dashboard", () => {
  test("should display the dashboard summary", async ({ page }) => {
    await page.goto("http://localhost:5173/");

    await expect(
      page.getByRole("heading", { name: "FinTrack Dashboard" }),
    ).toBeVisible();

    await expect(page.getByText("Total Income")).toBeVisible();
    await expect(page.getByText("Total Expenses")).toBeVisible();
    await expect(page.getByText("Current Balance")).toBeVisible();
    await expect(page.getByText("Savings Rate")).toBeVisible();

    await expect(page.getByText("₹87,000")).toBeVisible();
    await expect(page.getByText("₹14,800")).toBeVisible();
    await expect(page.getByText("₹72,200")).toBeVisible();
  });
});