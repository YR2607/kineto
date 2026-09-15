import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const widths = [1440, 390, 320] as const;

test("contact dialog has one accessible instance and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Связаться" }).first();
  await trigger.click();
  await expect(
    page.getByRole("dialog", { name: "Связаться с Kineto One" }),
  ).toHaveCount(1);
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog")).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

test("faq toggles with keyboard", async ({ page }) => {
  await page.goto("/");
  const question = page.getByRole("button", { name: "Сколько нужно занятий?" });
  await question.focus();
  await page.keyboard.press("Enter");
  await expect(question).toHaveAttribute("aria-expanded", "true");
});

test("mobile navigation closes with Escape", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const trigger = page.getByRole("button", { name: "Открыть меню" });
  await trigger.click();
  await expect(page.getByRole("dialog", { name: "Навигация" })).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(page.getByRole("dialog", { name: "Навигация" })).toHaveCount(0);
  await expect(trigger).toBeFocused();
});

for (const width of widths) {
  test(`has no horizontal overflow at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto("/");
    const sizes = await page.evaluate(() => ({
      scrollWidth: document.documentElement.scrollWidth,
      clientWidth: document.documentElement.clientWidth,
    }));
    expect(sizes.scrollWidth).toBe(sizes.clientWidth);
  });
}

test("has no automatically detectable serious accessibility violations", async ({
  page,
}) => {
  await page.goto("/");
  const results = await new AxeBuilder({ page }).analyze();
  expect(
    results.violations.filter((violation) =>
      ["critical", "serious"].includes(violation.impact ?? ""),
    ),
  ).toEqual([]);
});
