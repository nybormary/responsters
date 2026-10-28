// Playwright config for the UI tests (RSP-113).
// Where the tests run comes from tests/targets.ts (RSP-127): local by default (Playwright starts
// `npx serve site` itself), or TARGET=preview PR=<n> / TARGET=production (see the npm scripts).
import { defineConfig, devices } from '@playwright/test';
import { SCREEN_NAMES } from './tests/fixtures/screens';
import { resolveTarget } from './tests/targets';
import type { Options } from './tests/fixtures';

const target = resolveTarget(process.env, process.argv.includes('@smoke'));
const BASE_URL = target.baseURL;
const isLocal = target.name === 'local';
// testomat.io run environment: from the target, unless set by hand.
process.env.TESTOMATIO_ENV ||= target.testomatioEnv;

export default defineConfig<Options>({
  testDir: './tests/ui',
  fullyParallel: true,                    // tests never depend on each other or on order
  forbidOnly: !!process.env.CI,           // a forgotten test.only fails CI
  // A deployed site (BASE_URL) is reached over the network: fewer parallel browsers so we don't
  // flood it, more time for files that load on demand (locale files), one retry for network blips.
  // A retry that passes is reported as "flaky", so a real problem still shows up.
  retries: process.env.CI || !isLocal ? 1 : 0,
  workers: isLocal ? undefined : 2,
  expect: { timeout: isLocal ? 5_000 : 10_000 },
  // testomat.io (RSP-80): only when the TESTOMATIO env variable (project API key) is set, so a normal run
  // behaves as before and the key never has to live in the repo. Title and environment of the run come from
  // TESTOMATIO_TITLE and TESTOMATIO_ENV (both default to the target, tests/targets.ts).
  // Results land on the cases whose @T… id is in the test title.
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    ...(process.env.TESTOMATIO
      ? [['@testomatio/reporter/playwright', {
          apiKey: process.env.TESTOMATIO,
          title: process.env.TESTOMATIO_TITLE || target.title,   // own title wins; otherwise the target's
        }] as const]
      : []),
  ],

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
