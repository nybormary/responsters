// Playwright config for the UI tests (RSP-113).
// Local run: Playwright starts `npx serve site` itself and tests http://localhost:3000.
// Another target (deploy preview, production): BASE_URL=https://… npx playwright test
import { defineConfig, devices } from '@playwright/test';

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';
const isLocal = !process.env.BASE_URL;

export default defineConfig({
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

  // Viewports are projects, not tags. More browsers come later as more projects.
  // 599/600 sit on both sides of the site's main breakpoint (css: max-width:599px / min-width:600px).
  projects: [
    { name: 'desktop-1280', use: { ...devices['Desktop Chrome'], viewport: { width: 1280, height: 800 } } },
    { name: 'tablet-600',   use: { ...devices['Desktop Chrome'], viewport: { width: 600, height: 900 }, hasTouch: true } },
    { name: 'edge-599',     use: { ...devices['Desktop Chrome'], viewport: { width: 599, height: 900 }, hasTouch: true } },
    { name: 'phone-375',    use: { ...devices['Pixel 7'], viewport: { width: 375, height: 740 } } },
  ],

  // Only for local runs: serve the site folder the same way we do by hand.
  webServer: isLocal ? {
    command: 'npx serve site -l 3000',
    url: 'http://localhost:3000',
    reuseExistingServer: true,            // an already running `npx serve site` is reused
  } : undefined,
});
