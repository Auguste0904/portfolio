/// <reference types="vitest/config" />
import { getViteConfig } from 'astro/config';
import { configDefaults } from 'vitest/config';

export default getViteConfig({
  test: {
    environment: 'node',
    exclude: [...configDefaults.exclude, '.worktrees/**', 'tests/e2e/**'],
    include: ['src/**/*.test.ts', 'tests/**/*.test.ts'],
    setupFiles: ['./tests/setup.ts'],
  },
});
