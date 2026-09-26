import { expect, test } from '@playwright/test';

test('serves the static site without a pre-existing build', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle('Portfolio');
});
