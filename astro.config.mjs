import { defineConfig } from 'astro/config';

export default defineConfig({
  base: process.env.BASE_PATH ?? '/portfolio/',
  output: 'static',
  site: process.env.PUBLIC_SITE_URL ?? 'https://portfolio.example.com',
});
