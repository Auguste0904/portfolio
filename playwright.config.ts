import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  use: {
    baseURL: 'http://127.0.0.1:4321/',
  },
  webServer: {
    command: 'npx cross-env BASE_PATH=/ npm run build && npx cross-env BASE_PATH=/ npm run preview -- --host 127.0.0.1',
    url: 'http://127.0.0.1:4321/',
    reuseExistingServer: !process.env.CI,
  },
});
