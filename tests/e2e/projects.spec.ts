import { expect, test } from '@playwright/test';

for (const locale of ['fr', 'en']) {
  test(`${locale} project listing links to the available case studies`, async ({ page }) => {
    const response = await page.goto(`/${locale}/projects/`);

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.project-card a')).toHaveCount(4);
    await expect(page.locator('.project-card').first().getByRole('link')).toHaveAttribute('href', `/${locale}/projects/atlas/`);
  });

  test(`${locale} case study renders the required sections without an unprovided demo`, async ({ page }) => {
    const response = await page.goto(`/${locale}/projects/signal/`);

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('[data-project-section="problem"]')).toBeVisible();
    await expect(page.locator('[data-project-section="context-role"]')).toBeVisible();
    await expect(page.locator('[data-project-section="solution"]')).toBeVisible();
    await expect(page.locator('[data-project-section="technology"]')).toBeVisible();
    await expect(page.locator('[data-project-section="outcomes"]')).toBeVisible();
    await expect(page.locator('.external-project-links').getByRole('link', { name: /demo/i })).toHaveCount(0);
    await expect(page.locator('[data-project-image-fallback]')).toHaveAttribute('aria-hidden', 'true');
  });
}
