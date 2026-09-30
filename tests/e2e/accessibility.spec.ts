import AxeBuilder from '@axe-core/playwright';
import { expect, test } from '@playwright/test';

const routes = ['/fr/', '/en/', '/fr/projects/livecontrol/', '/en/projects/livecontrol/', '/fr/journey/', '/en/journey/', '/fr/contact/', '/en/contact/'];

test.describe('accessibility and metadata', () => {
  for (const route of routes) {
    test(`${route} has no detectable accessibility violations`, async ({ page }) => {
      await page.goto(route);

      const results = await new AxeBuilder({ page }).analyze();

      expect(results.violations).toEqual([]);
    });
  }

  for (const locale of ['fr', 'en']) {
    test(`${locale} homepage publishes localized metadata`, async ({ page }) => {
      await page.goto(`/${locale}/`);

      await expect(page.locator('html')).toHaveAttribute('lang', locale);
      await expect(page).toHaveTitle(/.+/);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
      await expect(page.locator('link[rel="canonical"]')).toHaveAttribute('href', `https://auguste0904.github.io/${locale}/`);
    });
  }

  test('provides visible keyboard focus', async ({ page }) => {
    await page.goto('/fr/');
    await page.keyboard.press('Tab');

    await expect(page.locator('.skip-link')).toBeFocused();
    await expect(page.locator('.skip-link')).toHaveCSS('top', '16px');
  });

  test('disables animation when reduced motion is requested', async ({ page }) => {
    await page.emulateMedia({ reducedMotion: 'reduce' });
    await page.goto('/fr/');

    await expect(page.locator('.hero')).toHaveCSS('animation-duration', '1e-05s');
  });
});
