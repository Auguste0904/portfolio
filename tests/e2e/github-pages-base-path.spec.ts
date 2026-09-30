import { readFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { expect, test } from '@playwright/test';

test.skip(process.env.BASE_PATH !== '/portfolio/', 'This spec is exercised by the dedicated GitHub Pages build command.');

test('GitHub Pages build prefixes internal routes and assets with the configured base path', async () => {
  const html = await readFile(resolve('dist/fr/index.html'), 'utf8');
  const index = await readFile(resolve('dist/index.html'), 'utf8');

  expect(index).toContain('url=/portfolio/fr/');
  expect(html).toContain('href="https://auguste0904.github.io/portfolio/fr/"');
  expect(html).toContain('href="/portfolio/en/"');
  expect(html).toContain('href="/portfolio/fr/projects/"');
  expect(html).toContain('href="/portfolio/fr/#projects"');
  expect(html).toMatch(/href="\/portfolio\/_astro\/.+\.css"/);

  expect(html).toContain('href="/portfolio/documents/CV_2026-09-30_Auguste_ALEXANDRE.pdf"');
  expect(html).toContain('download="CV_2026-09-30_Auguste_ALEXANDRE.pdf"');
  const pdf = await readFile(resolve('dist/documents/CV_2026-09-30_Auguste_ALEXANDRE.pdf'));
  expect(pdf.subarray(0, 5).toString()).toBe('%PDF-');
});
