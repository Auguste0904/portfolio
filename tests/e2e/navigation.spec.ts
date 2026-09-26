import { expect, test } from '@playwright/test';

test.describe('site navigation', () => {
  test('moves focus to main content through the skip link', async ({ page }) => {
    await page.goto('/');

    await page.keyboard.press('Tab');

    const skipLink = page.getByRole('link', { name: /skip to main content/i });
    await expect(skipLink).toBeFocused();
    await skipLink.press('Enter');
    await expect(page.locator('main')).toBeFocused();
  });

  test('provides keyboard-visible primary navigation', async ({ page }) => {
    await page.goto('/');

    const projectsLink = page.getByRole('link', { name: 'Projects' });
    await projectsLink.focus();

    await expect(projectsLink).toBeFocused();
    await expect(projectsLink).toHaveCSS('outline-style', 'solid');
  });

  test('links to the equivalent page in the other language', async ({ page }) => {
    await page.goto('/');

    const languageLink = page.getByRole('link', { name: 'Français' });
    await expect(languageLink).toHaveAttribute('href', '/fr/');
  });

  test('opens and closes the mobile navigation with keyboard controls', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    const menuButton = page.getByRole('button', { name: /open menu/i });
    await expect(menuButton).toBeVisible();
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');

    await menuButton.click();
    await expect(page.getByRole('button', { name: /close menu/i })).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();

    await page.keyboard.press('Escape');
    await expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    await expect(menuButton).toBeFocused();
  });

  test('localizes the French shell controls and footer', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/fr/');

    const menuButton = page.getByRole('button', { name: 'Ouvrir le menu' });
    await expect(menuButton).toBeVisible();
    await menuButton.click();
    await expect(page.getByRole('button', { name: 'Fermer le menu' })).toHaveAttribute('aria-expanded', 'true');
    await expect(page.getByRole('navigation', { name: 'Navigation principale' })).toBeVisible();
    await expect(page.locator('footer')).toContainText('Statique et accessible');
  });

  test('reveals navigation after resizing from mobile to desktop', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');

    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeHidden();
    await page.setViewportSize({ width: 1024, height: 768 });

    await expect(page.getByRole('navigation', { name: 'Primary navigation' })).toBeVisible();
  });
});
