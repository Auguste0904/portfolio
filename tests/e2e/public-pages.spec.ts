import { expect, test } from '@playwright/test';
import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';

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
      await expect(page.getByRole('link', { name: /télécharger le cv|download the résumé/i })).toHaveAttribute('download', 'CV_2026-09-30_Auguste_ALEXANDRE.pdf');
      await expect(page.locator('main')).not.toContainText(/disponible prochainement|available soon/i);
    }
  });

  test('localizes timeline dates on journey pages linked from the homepage', async ({ page }) => {
    await page.goto('/fr/');
    await expect(page.locator('#about a[href="/fr/journey/"]')).toBeVisible();
    await page.goto('/fr/journey/');
    await expect(page.locator('.timeline__dates').first()).toHaveText('mars 2023 - Aujourd’hui');

    await page.goto('/en/');
    await expect(page.locator('#about a[href="/en/journey/"]')).toBeVisible();
    await page.goto('/en/journey/');
    await expect(page.locator('.timeline__dates').first()).toHaveText('Mar 2023 - Present');
  });

  test('the downloadable CV is the latest provided PDF', async ({ page }) => {
    await page.goto('/fr/');
    const link = page.getByRole('link', { name: /télécharger mon cv/i });
    await expect(link).toHaveAttribute('href', '/documents/CV_2026-09-30_Auguste_ALEXANDRE.pdf');
    const response = await page.request.get('/documents/CV_2026-09-30_Auguste_ALEXANDRE.pdf');
    expect(response.ok()).toBe(true);
    expect(await response.body()).toEqual(await readFile(resolve('public/documents/CV_2026-09-30_Auguste_ALEXANDRE.pdf')));
  });

  for (const locale of locales) {
    test(`${locale} journey orders entries by end date and shows the corrected Bachelor dates`, async ({ page }) => {
      await page.goto(`/${locale}/journey/`);
      const entries = page.locator('.timeline > li');
      const headings = await entries.locator('h2').allTextContents();
      expect(headings).toEqual(locale === 'fr' ? [
        'Ingénieur développement et production · Orange Business',
        'Formation Angular · Ninja Squad',
        'Titre d’expert de la technologie et de l’innovation · EPITECH Paris',
        'Développeur full-stack ASP.NET · Cybille',
        'Bachelor d’expert de la technologie et de l’innovation · EPITECH Paris',
        'Développeur opérationnel · OPENCELL',
        'Développeur front-end · OPENCELL',
        'Certificat d’apprentissage en anglais · Everest Language School',
      ] : [
        'Development and production engineer · Orange Business',
        'Angular training · Ninja Squad',
        'Expert qualification in technology and innovation · EPITECH Paris',
        'Full-stack ASP.NET developer · Cybille',
        'Bachelor in technology and innovation · EPITECH Paris',
        'Operations developer · OPENCELL',
        'Front-end developer · OPENCELL',
        'English language certificate · Everest Language School',
      ]);
      await expect(entries.nth(4).locator('.timeline__dates')).toHaveText(
        locale === 'fr' ? 'sept. 2018 - 2021' : 'Sep 2018 - 2021',
      );
      await expect(entries.nth(7).locator('.timeline__dates')).toHaveText(
        locale === 'fr' ? 'sept. 2019 - déc. 2019' : 'Sep 2019 - Dec 2019',
      );
      await page.goto(`/${locale}/about/`);
      await expect(page.locator('main')).toContainText('2018–2021');
      await expect(page.locator('main')).toContainText(locale === 'fr' ? 'Dublin en 2019' : 'Dublin in 2019');
    });

    test(`${locale} journey displays the EPITECH and OPENCELL logos on their entries`, async ({ page }) => {
      await page.goto(`/${locale}/journey/`);
      const entries = page.locator('.timeline > li');

      const expectedLogos = [
        { title: 'EPITECH Paris', src: '/images/entreprises/Epitech.png', count: 2 },
        { title: 'OPENCELL', src: '/images/entreprises/opencell.png', count: 2 },
      ];

      for (const { title, src, count } of expectedLogos) {
        const logos = entries.filter({ has: page.locator('h2', { hasText: title }) }).locator('.timeline__logo');
        await expect(logos).toHaveCount(count);
        for (let index = 0; index < count; index++) {
          const logo = logos.nth(index);
          await expect(logo).toHaveAttribute('src', src);
          await expect(logo).toHaveAttribute('alt', title);
          await expect.poll(() => logo.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
        }
      }

      const everest = entries.filter({ has: page.locator('h2', { hasText: 'Everest Language School' }) }).locator('.timeline__logo');
      await expect(everest).toHaveAttribute('src', '/images/entreprises/everest-language-school.webp');
      await expect(everest).toHaveAttribute('alt', 'Everest Language School');
      await expect.poll(() => everest.evaluate((image: HTMLImageElement) => image.complete && image.naturalWidth > 0)).toBe(true);
    });

    test(`${locale} journey shows both EPITECH diplomas and the Dublin certificate`, async ({ page }) => {
      await page.goto(`/${locale}/journey/`);
      const timeline = page.locator('.timeline');
      await expect(timeline.locator(':scope > li')).toHaveCount(8);
      await expect(timeline).toContainText(locale === 'fr' ? 'Bachelor d’expert de la technologie et de l’innovation' : 'Bachelor in technology and innovation');
      await expect(timeline).toContainText(locale === 'fr' ? 'Titre d’expert de la technologie et de l’innovation' : 'Expert qualification in technology and innovation');
      await expect(timeline).toContainText('Everest Language School');
      await expect(timeline).toContainText(locale === 'fr' ? 'Angular 19' : 'Angular 19');
    });

    test(`${locale} journey describes the CV-confirmed missions`, async ({ page }) => {
      await page.goto(`/${locale}/journey/`);
      const timeline = page.locator('.timeline');
      await expect(timeline).toContainText('LiveControl');
      await expect(timeline).toContainText('MyThesis');
      await expect(timeline).toContainText('Terraform');
      await expect(timeline).toContainText(locale === 'fr' ? 'commerce en ligne' : 'e-commerce');
    });
  }
});
