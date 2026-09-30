import { expect, test } from '@playwright/test';

const locales = ['fr', 'en'];
const pages = ['', 'about', 'journey', 'cv', 'contact'];

test.describe('public portfolio pages', () => {
  test('redirects the root document to the French homepage', async ({ page }) => {
    const response = await page.request.get('/');

    expect(await response.text()).toContain('<meta name="robots" content="noindex"');

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

  test('CV pages offer the provided PDF instead of an availability notice', async ({ page }) => {
    for (const locale of locales) {
      await page.goto(`/${locale}/cv/`);
      await expect(page.getByRole('link', { name: /télécharger le cv|download the résumé/i })).toHaveAttribute('download', 'CV_2026-09-26_Auguste_ALEXANDRE.pdf');
      await expect(page.locator('main')).not.toContainText(/disponible prochainement|available soon/i);
    }
  });

  test('localizes timeline dates on journey pages linked from the homepage', async ({ page }) => {
    await page.goto('/fr/');
    await expect(page.locator('#about a[href="/fr/journey/"]')).toBeVisible();
    await page.goto('/fr/journey/');
    await expect(page.locator('.timeline__dates').first()).toHaveText('avr. 2025 - avr. 2025');

    await page.goto('/en/');
    await expect(page.locator('#about a[href="/en/journey/"]')).toBeVisible();
    await page.goto('/en/journey/');
    await expect(page.locator('.timeline__dates').first()).toHaveText('Apr 2025 - Apr 2025');
  });
});
