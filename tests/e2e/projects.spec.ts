import { expect, test } from '@playwright/test';

for (const locale of ['fr', 'en']) {
  test(`${locale} project listing links to the available case studies`, async ({ page }) => {
    const response = await page.goto(`/${locale}/projects/`);

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('.project-card a')).toHaveCount(6);
    const hrefs = await page.locator('.project-card a').evaluateAll((links) => links.map((link) => link.getAttribute('href')));
    expect(hrefs).toContain(`/${locale}/projects/teams-meeting-minutes/`);
    expect(hrefs).toContain(`/${locale}/projects/gargantua-onega/`);
  });

  test(`${locale} case study renders the required sections without an unprovided demo`, async ({ page }) => {
    const response = await page.goto(`/${locale}/projects/livecontrol/`);

    expect(response?.ok()).toBeTruthy();
    await expect(page.locator('h1')).toHaveCount(1);
    await expect(page.locator('[data-project-section="problem"]')).toBeVisible();
    await expect(page.locator('[data-project-section="context-role"]')).toBeVisible();
    await expect(page.locator('[data-project-section="solution"]')).toBeVisible();
    await expect(page.locator('[data-project-section="technology"]')).toBeVisible();
    await expect(page.locator('[data-project-section="outcomes"]')).toBeVisible();
    await expect(page.locator('.external-project-links').getByRole('link', { name: /demo/i })).toHaveCount(0);
    await expect(page.locator('.project-case-study__logos img')).toHaveCount(2);
  });
}

const selectedProjects = [
  {
    slug: 'teams-meeting-minutes',
    logos: ['/images/projects/live-intelligence.png'],
    fr: ['Live Intelligence pour Teams', 'chat LLM', 'transcription'],
    en: ['Live Intelligence for Teams', 'LLM chat', 'transcript'],
  },
  {
    slug: 'livecontrol',
    logos: ['/images/entreprises/orange-business.png', '/images/projects/JO-2024.webp'],
    fr: ['affluence en temps réel', 'billet', 'stades'],
    en: ['real-time attendance', 'ticket', 'stadiums'],
  },
  {
    slug: 'gargantua-onega',
    logos: ['/images/projects/convivio.png'],
    fr: ['gestion des stocks', 'négocier', 'fournisseurs'],
    en: ['stock management', 'negotiate', 'suppliers'],
  },
] as const;

for (const locale of ['fr', 'en'] as const) {
  test(`${locale} Live Intelligence for Teams shows React instead of Angular`, async ({ page }) => {
    for (const route of [`/${locale}/`, `/${locale}/projects/`]) {
      await page.goto(route);
      const card = page.locator('.project-card').filter({ has: page.locator(`a[href="/${locale}/projects/teams-meeting-minutes/"]`) });
      await expect(card).toContainText('React');
      await expect(card).not.toContainText('Angular');
    }

    await page.goto(`/${locale}/projects/teams-meeting-minutes/`);
    const technologies = page.locator('[data-project-section="technology"]');
    await expect(technologies).toContainText('React');
    await expect(technologies).not.toContainText('Angular');
  });

  test(`${locale} selected project cards display each title once with their logos`, async ({ page }) => {
    for (const route of [`/${locale}/`, `/${locale}/projects/`]) {
      await page.goto(route);
      for (const project of selectedProjects) {
        const card = page.locator('.project-card').filter({ has: page.locator(`a[href="/${locale}/projects/${project.slug}/"]`) });
        await expect(card).toHaveCount(1);
        const title = await card.locator('h3').textContent();
        expect(title).toBeTruthy();
        expect((await card.innerText()).split(title!.trim()).length - 1).toBe(1);
        if (route.endsWith('/projects/')) continue;
        const logos = card.locator('.project-card__art img');
        await expect(logos).toHaveCount(project.logos.length);
        for (const [index, filename] of project.logos.entries()) {
          await expect(logos.nth(index)).toHaveAttribute('src', filename);
          await expect.poll(() => logos.nth(index).evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        }
      }
    }
  });

  for (const project of selectedProjects) {
    test(`${locale} ${project.slug} case study explains the project and displays its logos`, async ({ page }) => {
      await page.goto(`/${locale}/projects/${project.slug}/`);
      await expect(page.locator('[data-project-image-fallback]')).toHaveCount(0);
      const logos = page.locator('.project-case-study__logos img');
      await expect(logos).toHaveCount(project.logos.length);
      for (const [index, filename] of project.logos.entries()) {
        await expect(logos.nth(index)).toHaveAttribute('src', filename);
        await expect.poll(() => logos.nth(index).evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
      }
      for (const phrase of project[locale]) {
        await expect(page.locator('main')).toContainText(phrase);
      }
    });
  }
}
