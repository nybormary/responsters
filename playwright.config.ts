// Playwright config for the UI tests (RSP-113).
// Local run: Playwright starts `npx serve site` itself and tests http://localhost:3000.
// Another target (deploy preview, production): BASE_URL=https://… npx playwright test
import { defineConfig, devices } from '@playwright/test';
import { SCREEN_NAMES } from './tests/fixtures/screens';
import type { Options } from './tests/fixtures';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const isLocal = !process.env.BASE_URL;

export default defineConfig<Options>({
  testDir: './tests/ui',
  fullyParallel: true,                    // tests never depend on each other or on order
  forbidOnly: !!process.env.CI,           // a forgotten test.only fails CI
  retries: process.env.CI ? 1 : 0,
  reporter: [['list'], ['html', { open: 'never' }]],

  use: {
    baseURL: BASE_URL,
    locale: 'en-US',                      // the site picks its language from the browser (RSP-97): pin it
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
  },

  // One browser. Each test gets a random screen size (tests/fixtures/screens.ts, annotation "screen").
  // ALL_SCREENS=1 (npm run test:all-screens) instead runs every test once per screen, one project each.
  // More browsers come later as more projects.
  projects: process.env.ALL_SCREENS
    ? SCREEN_NAMES.map(name => ({ name, use: { ...devices['Desktop Chrome'], screenPreset: name } }))
    : [{ name: 'chromium', use: { ...devices['Desktop Chrome'] } }],

  // Only for local runs: serve the site folder the same way we do by hand.
  webServer: isLocal ? {
    command: 'npx serve site -l 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: true,            // an already running `npx serve site` is reused
  } : undefined,
});
