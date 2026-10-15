// The one place specs import from: import { test, expect, TAG } from '../fixtures';
//
// Independence: every test gets a fresh browser context (Playwright's default) and sets its own
// starting state with `seed` before the page loads. No test relies on another test or on order.
//
//   test.use({ seed: { lang: 'pl', howtoSeen: true } });     // for a whole file or describe block
//
// Page objects (one per part of the page, built from TID in locators.ts) are added here as specs need them.
import { test as base, expect } from '@playwright/test';
import { textsFor, type Lang, type Texts } from './texts';

// What the site keeps in localStorage (site/js/store.js adds the prefix "httpon." to every key).
export type Seed = {
  lang?: Lang;                          // language saved with the switcher
  howtoSeen?: boolean;                  // "How to use" hint dismissed
  streak?: Record<string, number>;      // correct answers in a row per code; 2+ = known
  weight?: Record<string, number>;      // how often each code comes back in Practice
};

type Fixtures = {
  seed: Seed;
  texts: Texts;
};

export const test = base.extend<Fixtures>({
  // Default: a first-time visitor with nothing saved.
  seed: [{}, { option: true }],

  // Writes the seed into localStorage before any site script runs, once per tab:
  // a reload inside the test keeps what the site saved (e.g. a language picked in the test).
  page: async ({ page, seed }, use) => {
    await page.addInitScript((s: Record<string, unknown>) => {
      try {
        if (sessionStorage.getItem('pw.seeded')) return;
        for (const [k, v] of Object.entries(s)) localStorage.setItem('httpon.' + k, JSON.stringify(v));
        sessionStorage.setItem('pw.seeded', '1');
      } catch { /* about:blank and other pages without storage */ }
    }, seed);
    await use(page);
  },

  // Texts of the language the test runs in: the seeded one, otherwise English (the config pins en-US).
  texts: async ({ seed }, use) => {
    await use(await textsFor(seed.lang ?? 'en'));
  },
});

export { expect };
export { TAG } from './tags';
export { TID, type View } from './locators';
