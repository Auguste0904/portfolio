import { expect, test } from '@playwright/test';

const locales = ['fr', 'en'];
const pages = ['', 'about', 'journey', 'cv', 'contact'];

test.describe('public portfolio pages', () => {
  test('redirects the root document to the French homepage', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveURL(/\/fr\/$/);
  });

  for (const locale of locales) {
    for (const pagePath of pages) {
      const path = `/${locale}/${pagePath}`.replace(/\/$/, '/') + (pagePath ? '/' : '');

      test(`${path} exists and has one main heading`, async ({ page }) => {
        const response = await page.goto(path);

        expect(response?.ok()).toBeTruthy();
        await expect(page.locator('h1')).toHaveCount(1);
      });
    }
  }

  test('offers direct contact links without a form', async ({ page }) => {
    await page.goto('/en/contact/');

    await expect(page.locator('form')).toHaveCount(0);
    await expect(page.getByRole('link', { name: /email/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /linkedin/i })).toBeVisible();
    await expect(page.getByRole('link', { name: /github/i })).toBeVisible();
  });

  test('localizes timeline dates on homepage previews and journey pages', async ({ page }) => {
    await page.goto('/fr/');
    await expect(page.locator('.timeline__dates').first()).toHaveText('mars 2025 - Aujourd’hui');

    await page.goto('/fr/journey/');
    await expect(page.locator('.timeline__dates').first()).toHaveText('mars 2025 - Aujourd’hui');

    await page.goto('/en/');
    await expect(page.locator('.timeline__dates').first()).toHaveText('Mar 2025 - Present');

    await page.goto('/en/journey/');
    await expect(page.locator('.timeline__dates').first()).toHaveText('Mar 2025 - Present');
  });
});
