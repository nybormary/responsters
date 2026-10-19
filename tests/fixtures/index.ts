// The one place specs import from: import { test, expect, TAG } from '../fixtures';
//
// Independence: every test gets a fresh browser context (Playwright's default) and sets its own
// starting state with `seed` before the page loads. No test relies on another test or on order.
//
//   test.use({ seed: { lang: 'pl', howtoSeen: true } });     // for a whole file or describe block
//
// Language: every test runs in a random site language, so all six get covered over time without
// repeating every test six times. The chosen language is shown in the report (annotation "lang").
//   - pin it for a run:            TEST_LANG=pl npm test
//   - pin it for one test/file:    test.use({ seed: { lang: 'pl' } })
//   - turn it off (language tests): test.use({ randomLang: false })  → nothing saved, browser language decides
//
// Screen: the same idea for screen sizes (fixtures/screens.ts). Annotation "screen" in the report.
//   - pin it for a run:            TEST_SCREEN=phone-375 npm test
//   - pin it for one test/file:    test.use({ screenPreset: 'phone-375' })
//   - every test on every screen:  npm run test:all-screens
//
// Page objects (one per part of the page, built from TID in locators.ts) live in pages/ and are
// handed to tests as fixtures: async ({ app, langMenu }) => { … }.
import { test as base, expect } from '@playwright/test';
import { textsFor, LANGS, type Lang, type Texts } from './texts';
import { SCREENS, SCREEN_NAMES, type ScreenName } from './screens';
import { App } from './pages/app';
import { LanguageMenu } from './pages/language-menu';

// What the site keeps in localStorage (site/js/store.js adds the prefix "httpon." to every key).
export type Seed = {
  lang?: Lang;                          // language saved with the switcher
  howtoSeen?: boolean;                  // "How to use" hint dismissed
  streak?: Record<string, number>;      // correct answers in a row per code; 2+ = known
  weight?: Record<string, number>;      // how often each code comes back in Practice
};

export type Options = {
  seed: Seed;
  randomLang: boolean;
  screenPreset: ScreenName | 'random';   // not `screen`: that name is Playwright's own option
};

type Fixtures = {
  screenName: ScreenName;
  lang: Lang;
  texts: Texts;
  app: App;
  langMenu: LanguageMenu;
};

export const test = base.extend<Options & Omit<Fixtures, keyof Options>>({
  // Default: a first-time visitor with nothing saved.
  seed: [{}, { option: true }],
  randomLang: [true, { option: true }],
  screenPreset: ['random', { option: true }],

  // The screen of this test: test.use / project > TEST_SCREEN > random.
  screenName: async ({ screenPreset }, use, testInfo) => {
    let name: ScreenName;
    if (screenPreset !== 'random') name = screenPreset;
    else {
      const pinned = process.env.TEST_SCREEN as ScreenName | undefined;
      if (pinned && !SCREEN_NAMES.includes(pinned)) throw new Error(`TEST_SCREEN=${pinned}: not one of ${SCREEN_NAMES.join(', ')}`);
      name = pinned ?? SCREEN_NAMES[Math.floor(Math.random() * SCREEN_NAMES.length)];
    }
    testInfo.annotations.push({ type: 'screen', description: name });
    await use(name);
  },
  // Playwright's own context options, taken from the chosen screen.
  viewport: async ({ screenName }, use) => { await use(SCREENS[screenName].viewport); },
  isMobile: async ({ screenName }, use) => { await use(SCREENS[screenName].isMobile); },
  hasTouch: async ({ screenName }, use) => { await use(SCREENS[screenName].hasTouch); },

  // The site language of this test: seeded > TEST_LANG > random; with randomLang off, English (config pins en-US).
  lang: async ({ seed, randomLang }, use, testInfo) => {
    let lang: Lang;
    if (seed.lang) lang = seed.lang;
    else if (!randomLang) lang = 'en';
    else {
      const pinned = process.env.TEST_LANG as Lang | undefined;
      if (pinned && !LANGS.includes(pinned)) throw new Error(`TEST_LANG=${pinned}: not one of ${LANGS.join(', ')}`);
      lang = pinned ?? LANGS[Math.floor(Math.random() * LANGS.length)];
    }
    testInfo.annotations.push({ type: 'lang', description: lang });
    await use(lang);
  },

  // Writes the seed into localStorage before any site script runs, once per tab:
  // a reload inside the test keeps what the site saved (e.g. a language picked in the test).
  page: async ({ page, seed, randomLang, lang }, use) => {
    const stored: Seed = randomLang ? { ...seed, lang } : seed;   // the random language is saved like a menu choice
    await page.addInitScript((s: Record<string, unknown>) => {
      try {
        if (sessionStorage.getItem('pw.seeded')) return;
        for (const [k, v] of Object.entries(s)) localStorage.setItem('httpon.' + k, JSON.stringify(v));
        sessionStorage.setItem('pw.seeded', '1');
      } catch { /* about:blank and other pages without storage */ }
    }, stored);
    await use(page);
  },

  // Texts of the language the test runs in.
  texts: async ({ lang }, use) => {
    await use(await textsFor(lang));
  },

  app: async ({ page }, use) => { await use(new App(page)); },
  langMenu: async ({ page }, use) => { await use(new LanguageMenu(page)); },
});

export { expect };
export { TAG } from './tags';
export { TID, type View } from './locators';
export { SCREENS, SCREEN_NAMES, type ScreenName } from './screens';
export type { App } from './pages/app';
export type { LanguageMenu } from './pages/language-menu';
export { textsFor, langName, LANGS, type Lang, type Texts } from './texts';
