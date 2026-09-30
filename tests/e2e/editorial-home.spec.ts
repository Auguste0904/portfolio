import { expect, test } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';

for (const locale of ['fr', 'en']) {
  test(`${locale} home guides visitors through five sections and three selected projects`, async ({ page }) => {
    await page.goto(`/${locale}/`);
    const sections = page.locator('main > section');
    await expect(sections).toHaveCount(5);
    expect(await sections.evaluateAll((items) => items.map((item) => item.id))).toEqual(['intro', 'about', 'skills', 'projects', 'contact']);

    await expect(page.locator('#projects .project-card')).toHaveCount(3);
    expect(await page.locator('#projects .project-card a').evaluateAll((items) => items.map((item) => item.getAttribute('href')))).toEqual([
      `/${locale}/projects/teams-meeting-minutes/`,
      `/${locale}/projects/livecontrol/`,
      `/${locale}/projects/gargantua-onega/`,
    ]);
    await expect(page.locator('#intro').getByRole('link', { name: /github/i })).toHaveAttribute('href', /github.com/);
    await expect(page.locator('#intro').getByRole('link', { name: /linkedin/i })).toHaveAttribute('href', /linkedin.com/);
    const cvLink = page.locator('#intro').getByRole('link', { name: /télécharger mon cv|download my résumé/i });
    await expect(cvLink).toHaveAttribute('href', '/documents/CV_2026-09-26_Auguste_ALEXANDRE.pdf');
    await expect(cvLink).toHaveAttribute('download', 'CV_2026-09-26_Auguste_ALEXANDRE.pdf');
    const cvResponse = await page.request.get('/documents/CV_2026-09-26_Auguste_ALEXANDRE.pdf');
    expect(cvResponse.ok()).toBe(true);
    expect(cvResponse.headers()['content-type']).toContain('application/pdf');
    expect((await cvResponse.body()).subarray(0, 5).toString()).toBe('%PDF-');
  });
}

test('theme follows the system then remembers an explicit choice across pages', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'light' });
  await page.goto('/fr/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'light');
  await page.getByRole('button', { name: /mode sombre/i }).click();
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await page.goto('/en/projects/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  await expect(page.getByRole('button', { name: /light mode/i })).toBeVisible();
});

test('technology carousel moves by controls and stays still in reduced motion', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/en/');
  const track = page.locator('[data-carousel-track]');
  const initialScroll = await track.evaluate((node) => node.scrollLeft);
  await page.waitForTimeout(3500);
  await expect.poll(() => track.evaluate((node) => node.scrollLeft)).toBe(initialScroll);
  await page.getByRole('button', { name: 'Next technologies' }).click();
  await expect.poll(() => track.evaluate((node) => node.scrollLeft)).toBeGreaterThan(initialScroll);
  await page.getByRole('button', { name: 'Previous technologies' }).click();
  await expect.poll(() => track.evaluate((node) => node.scrollLeft)).toBeLessThanOrEqual(initialScroll);
});

test('both themes keep homepage and detail pages readable at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 812 });
  for (const theme of ['dark', 'light']) {
    await page.addInitScript((value) => localStorage.setItem('portfolio-theme', value), theme);
    for (const route of ['/fr/', '/en/', '/fr/projects/', '/en/projects/livecontrol/']) {
      await page.goto(route);
      await expect(page.locator('html')).toHaveAttribute('data-theme', theme);
      const width = await page.evaluate(() => ({ viewport: document.documentElement.clientWidth, page: document.documentElement.scrollWidth }));
      expect(width.page, `${theme} ${route}`).toBeLessThanOrEqual(width.viewport);
    }
  }
});

test('dark homepage has no detectable accessibility violations', async ({ page }) => {
  await page.emulateMedia({ colorScheme: 'dark' });
  await page.goto('/fr/');
  await expect(page.locator('html')).toHaveAttribute('data-theme', 'dark');
  const results = await new AxeBuilder({ page }).analyze();
  expect(results.violations).toEqual([]);
});

test('homepage links and technology list remain useful without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.goto('/fr/');
    await expect(page.locator('#skills .technology-badge')).toHaveCount(21);
    await expect(page.getByRole('button', { name: 'Technologies suivantes' })).toBeHidden();
    await expect(page.locator('#projects .project-card a')).toHaveCount(3);
    await expect(page.locator('.site-nav').getByRole('link', { name: 'Contact' })).toHaveAttribute('href', '/fr/#contact');
  } finally {
    await context.close();
  }
});

for (const width of [375, 768, 1440, 1920]) {
  test(`hero text and artwork keep readable widths at ${width}px`, async ({ page }) => {
    await page.setViewportSize({ width, height: 900 });
    await page.goto('/fr/');

    const layout = await page.evaluate(() => {
      const hero = document.querySelector<HTMLElement>('.hero');
      const content = document.querySelector<HTMLElement>('.hero__content');
      const title = document.querySelector<HTMLElement>('.hero h1');
      const artwork = document.querySelector<HTMLElement>('.hero-art');
      if (!hero || !content || !title || !artwork) throw new Error('Hero elements missing');
      return {
        viewport: document.documentElement.clientWidth,
        page: document.documentElement.scrollWidth,
        hero: hero.getBoundingClientRect().width,
        content: content.getBoundingClientRect().width,
        artwork: artwork.getBoundingClientRect().width,
        title: title.getBoundingClientRect().width,
        titleHeight: title.getBoundingClientRect().height,
        titleLineHeight: Number.parseFloat(getComputedStyle(title).lineHeight),
      };
    });

    expect(layout.page).toBeLessThanOrEqual(layout.viewport);
    expect(layout.hero).toBeGreaterThan(width * 0.8);
    expect(layout.content).toBeGreaterThan(width < 500 ? 260 : 320);
    expect(layout.artwork).toBeGreaterThan(width < 500 ? 260 : 300);
    expect(layout.title).toBeGreaterThan(width < 500 ? 260 : 320);
    expect(layout.titleHeight / layout.titleLineHeight).toBeLessThanOrEqual(3.1);
  });
}

test('about and featured projects retain readable columns on desktop', async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto('/fr/');

  const columns = await page.evaluate(() => {
    const about = document.querySelector<HTMLElement>('.about-copy');
    const cards = [...document.querySelectorAll<HTMLElement>('#projects .project-card')];
    if (!about || cards.length !== 3) throw new Error('Featured sections missing');
    return {
      about: about.getBoundingClientRect().width,
      cards: cards.map((card) => card.getBoundingClientRect().width),
      positions: cards.map((card) => Math.round(card.getBoundingClientRect().top)),
    };
  });

  expect(columns.about).toBeGreaterThan(320);
  for (const card of columns.cards) expect(card).toBeGreaterThan(280);
  expect(new Set(columns.positions).size).toBe(1);
});

for (const locale of ['fr', 'en']) {
  for (const width of [375, 768, 1024, 1440, 1920]) {
    test(`${locale} name stays on two readable lines at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`/${locale}/`);

      const heading = page.locator('#intro h1');
      const metrics = await heading.evaluate((element) => {
        const style = getComputedStyle(element);
        return {
          lines: element.getBoundingClientRect().height / Number.parseFloat(style.lineHeight),
          textFits: element.scrollWidth <= element.clientWidth + 1,
          pageFits: document.documentElement.scrollWidth <= document.documentElement.clientWidth,
        };
      });

      expect(metrics.lines).toBeGreaterThan(1.9);
      expect(metrics.lines).toBeLessThan(2.1);
      expect(metrics.textFits).toBe(true);
      expect(metrics.pageFits).toBe(true);
    });
  }
}
