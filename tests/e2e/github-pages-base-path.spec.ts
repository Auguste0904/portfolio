import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';

test.skip(process.env.BASE_PATH !== '/portfolio/', 'This spec is exercised by the dedicated GitHub Pages build command.');

test('GitHub Pages build prefixes internal routes and assets with the configured base path', async () => {
  const html = await readFile(resolve('dist/fr/index.html'), 'utf8');

  expect(html).toContain('href="/portfolio/en/"');
  expect(html).toContain('href="/portfolio/fr/projects/"');
  expect(html).toMatch(/href="\/portfolio\/_astro\/.+\.css"/);

  const cvHtml = await readFile(resolve('dist/fr/cv/index.html'), 'utf8');

  expect(cvHtml).toContain('href="/portfolio/documents/cv.pdf"');
});
