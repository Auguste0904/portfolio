import { expect, test } from '@playwright/test';

for (const locale of ['fr', 'en']) {
  test(`${locale} homepage has a layered hero and distinct section surfaces`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    await expect(page.locator('.hero')).toHaveCSS('background-image', /radial-gradient/);
    const about = await page.locator('#about').evaluate((node) => getComputedStyle(node).backgroundColor);
    const skills = await page.locator('#skills').evaluate((node) => getComputedStyle(node).backgroundColor);
    expect(about).not.toBe(skills);
  });
}

test('project listing uses the available desktop width', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/fr/projects/');

  const width = await page.locator('.project-grid--listing').evaluate((element) => element.getBoundingClientRect().width);
  expect(width).toBeGreaterThan(900);
});

test('project card responds to hover and keyboard focus', async ({ page }) => {
  await page.goto('/fr/projects/');
  const card = page.locator('.project-card').first();
  const link = card.getByRole('link');

  await card.hover();
  await expect(card).not.toHaveCSS('transform', 'none');

  await page.mouse.move(0, 0);
  await link.focus();
  await expect(card).not.toHaveCSS('transform', 'none');
});

test('reduced motion keeps project cards stationary on hover', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/fr/projects/');

  const card = page.locator('.project-card').first();
  await card.hover();
  await expect(card).toHaveCSS('transform', 'none');
});

test('project cards remain within the viewport on mobile', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });

  for (const route of ['/fr/', '/en/projects/']) {
    await page.goto(route);

    const layout = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      document: document.documentElement.scrollWidth,
    }));
    expect(layout.document).toBeLessThanOrEqual(layout.viewport);

    const card = page.locator('.project-card').first();
    const bounds = await card.boundingBox();
    expect(bounds).not.toBeNull();
    if (bounds) expect(bounds.x + bounds.width).toBeLessThanOrEqual(layout.viewport);
  }
});
