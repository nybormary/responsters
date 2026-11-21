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
//
// Analytics: every test page fails requests to the Cloudflare beacon, so test runs never count as visits (analytics.ts,
// RSP-175).
//
// Assets: on a deployed target, card images and fonts come from the repo files, not the host (local-assets.ts,
// RSP-186: Netlify credits). A test that checks the host's own files opts out: test.use({ realAssets: true }).
import { test as base, expect } from '@playwright/test';
import { textsFor, LANGS, type Lang, type Texts } from './texts';
import { SCREENS, SCREEN_NAMES, type ScreenName } from './screens';
import { serveAssetsFromRepo } from './local-assets';
import { blockAnalytics } from './analytics';
import { resolveTarget } from '../targets';
import { App } from './pages/app';
import { LanguageMenu } from './pages/language-menu';
import { CardPage } from './pages/card-page';
import { GitCardPage } from './pages/git-card-page';
import { HomePage } from './pages/home-page';
import { AdventWall } from './pages/advent-wall';
import { SiteChrome } from './pages/site-chrome';
import { NotFoundPage } from './pages/not-found-page';
import { Axe } from './pages/axe';
import { Network } from './pages/network';
import { Preloads } from './pages/preloads';
import { D } from '../../site/data/http/cards.js';
import { GIT, EGG, ABOUT } from '../../site/data/git/cards.js';
import { GROUPS } from '../../site/data/git/groups.js';

// What the site keeps in localStorage (site/js/store.js adds the prefix "httpon." to every key).
export type Seed = {
  lang?: Lang; // language saved with the switcher
  howtoSeen?: boolean; // "How to use" hint dismissed
  streak?: Record<string, number>; // correct answers in a row per code; 2+ = known
  weight?: Record<string, number>; // how often each code comes back in Practice
};

export type Options = {
  seed: Seed;
  randomLang: boolean;
  screenPreset: ScreenName | 'random'; // not `screen`: that name is Playwright's own option
  // Load /img/ and /fonts/ from the host even on a deployed target (default: from the repo, RSP-186).
  realAssets: boolean;
};

type Fixtures = {
  runInfo: void;
  noAnalytics: void;
  localAssets: void;
  screenName: ScreenName;
  lang: Lang;
  texts: Texts;
  app: App;
  langMenu: LanguageMenu;
  cardPage: CardPage;
  gitCardPage: GitCardPage;
  homePage: HomePage;
  adventWall: AdventWall;
  site: SiteChrome;
  notFoundPage: NotFoundPage;
  axe: Axe;
  network: Network;
  preloads: Preloads;
};

export const test = base.extend<Options & Omit<Fixtures, keyof Options>>({
  // Default: a first-time visitor with nothing saved.
  seed: [{}, { option: true }],
  randomLang: [true, { option: true }],
  screenPreset: ['random', { option: true }],
  realAssets: [false, { option: true }],

  // The first step of every test names its language and screen and where they came from (RSP-207, Maryna 2026-11-18:
  // a test must show what it checked). With printSteps (playwright.config.ts) it is in the CI log, in the HTML report
  // and in testomat.io, not only in the annotations.
  runInfo: [
    async ({ lang, seed, randomLang, screenName, screenPreset }, use) => {
      const langFrom = seed.lang
        ? 'set by the test'
        : !randomLang
          ? 'browser language'
          : process.env.TEST_LANG
            ? 'TEST_LANG'
            : 'random';
      const screenFrom =
        screenPreset !== 'random' ? 'set by the test' : process.env.TEST_SCREEN ? 'TEST_SCREEN' : 'random';
      await test.step(`lang ${lang} (${langFrom}) · screen ${screenName} (${screenFrom})`, async () => {});
      await use();
    },
    { auto: true },
  ],

  // Every test page: requests to the analytics beacon fail at once, so no test run counts as a visit (RSP-175).
  noAnalytics: [
    async ({ page }, use) => {
      await blockAnalytics(page);
      await use();
    },
    { auto: true },
  ],

  // On a deployed target, /img/ and /fonts/ are answered from site/ (RSP-186); local runs are unchanged.
  localAssets: [
    async ({ page, baseURL, realAssets }, use) => {
      if (!realAssets && baseURL && resolveTarget(process.env).name !== 'local')
        await serveAssetsFromRepo(page, baseURL);
      await use();
    },
    { auto: true },
  ],

  // The screen of this test: test.use / project > TEST_SCREEN > random.
  screenName: async ({ screenPreset }, use, testInfo) => {
    let name: ScreenName;
    if (screenPreset !== 'random') name = screenPreset;
    else {
      const pinned = process.env.TEST_SCREEN as ScreenName | undefined;
      if (pinned && !SCREEN_NAMES.includes(pinned))
        throw new Error(`TEST_SCREEN=${pinned}: not one of ${SCREEN_NAMES.join(', ')}`);
      name = pinned ?? SCREEN_NAMES[Math.floor(Math.random() * SCREEN_NAMES.length)];
    }
    testInfo.annotations.push({ type: 'screen', description: name });
    await use(name);
  },
  // Playwright's own context options, taken from the chosen screen.
  viewport: async ({ screenName }, use) => {
    await use(SCREENS[screenName].viewport);
  },
  isMobile: async ({ screenName }, use) => {
    await use(SCREENS[screenName].isMobile);
  },
  hasTouch: async ({ screenName }, use) => {
    await use(SCREENS[screenName].hasTouch);
  },

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
  // A saved language is also set as the nf_lang cookie, as the site's switcher does (RSP-138): on Netlify the
  // language-less URLs (/http/) are redirected by that cookie before any page script runs.
  page: async ({ page, seed, randomLang, lang, baseURL }, use) => {
    const stored: Seed = randomLang ? { ...seed, lang } : seed; // the random language is saved like a menu choice
    if (stored.lang && baseURL)
      await page.context().addCookies([{ name: 'nf_lang', value: stored.lang, url: baseURL }]);
    await page.addInitScript((s: Record<string, unknown>) => {
      try {
        if (sessionStorage.getItem('pw.seeded')) return;
        for (const [k, v] of Object.entries(s)) localStorage.setItem('httpon.' + k, JSON.stringify(v));
        sessionStorage.setItem('pw.seeded', '1');
      } catch {
        /* about:blank and other pages without storage */
      }
    }, stored);
    await use(page);
  },

  // Texts of the language the test runs in.
  texts: async ({ lang }, use) => {
    await use(await textsFor(lang));
  },

  app: async ({ page, lang }, use) => {
    await use(new App(page, lang));
  },
  langMenu: async ({ page }, use) => {
    await use(new LanguageMenu(page));
  },
  cardPage: async ({ page }, use) => {
    await use(new CardPage(page));
  },
  gitCardPage: async ({ page }, use) => {
    await use(new GitCardPage(page));
  },
  homePage: async ({ page }, use) => {
    await use(new HomePage(page));
  },
  adventWall: async ({ page }, use) => {
    await use(new AdventWall(page));
  },
  site: async ({ page }, use) => {
    await use(new SiteChrome(page));
  },
  notFoundPage: async ({ page }, use) => {
    await use(new NotFoundPage(page));
  },
  axe: async ({ page }, use, testInfo) => {
    await use(new Axe(page, testInfo));
  },
  // Records requests from the moment a test asks for it: ask for it before the first navigation.
  network: async ({ page }, use) => {
    await use(new Network(page));
  },
  preloads: async ({ page }, use) => {
    await use(new Preloads(page));
  },
});

export { expect };
/** Every status code with a card, in the site's order: for tests that pick a card page at random. */
export const CARD_CODES: number[] = D.map((d: { c: number }) => d.c);
/** The git cards (RSP-117 schema; 25 advent days since 2026-11-17) and the placeholder picture of a card not drawn yet (RSP-199). */
export type GitCard = {
  id: string;
  name: string;
  group: string;
  day: number;
  danger?: boolean;
  art?: string;
  conf?: string[];
  links?: { u: string; label: Record<string, string>; mark?: string }[];
  help?: { list: string; section: string };
};
export const GIT_CARDS: GitCard[] = GIT;
/** Where `git help` lists a card (its own list and section, or its group's section in plain `git help`) and the
 *  command's line there, English on every page (2026-11-21). */
export const gitHelpOf = (g: GitCard): { list: string; section: string } =>
  g.help ?? { list: '', section: (GROUPS as Record<string, { help: string }>)[g.group].help };
export const GIT_ABOUT: Record<string, string> = ABOUT;
export const GIT_EGG: { src: string; alt: string } = EGG;
/** Days of the advent: the cards that have a day (cards added after the season have none). */
export const ADVENT_DAYS: number = GIT.filter((g: { day?: number }) => g.day).length;
export { buildOn } from './build';

export { TAG } from './tags';
export { TID, type View } from './locators';
export { SCREENS, SCREEN_NAMES, type ScreenName } from './screens';
export { VIEWS, type App } from './pages/app';
export type { LanguageMenu } from './pages/language-menu';
export type { CardPage } from './pages/card-page';
export { ORIGIN, type HomePage } from './pages/home-page';
export { AdventWall } from './pages/advent-wall';
export type { SiteChrome } from './pages/site-chrome';
export type { NotFoundPage } from './pages/not-found-page';
export { THEMES, type Axe, type Theme } from './pages/axe';
export type { Network } from './pages/network';
export type { Preloads, FontPreload, ScriptLoad } from './pages/preloads';
export type { PathSteps, MarkerLook } from './pages/path-steps';
export {
  lookOf,
  resolveColor,
  textContrast,
  insideParent,
  uppercaseElements,
  type Look,
  type Shouting,
} from './pages/styles';
export { markOf, boxes, controlBorderContrasts, type Mark, type BorderContrast } from './pages/answer-marks';
export { focusRingsByTab, type FocusRing } from './pages/focus';
export { textsFor, langName, LANGS, type Lang, type Texts } from './texts';
// Dates in the page language, as the build writes them (RSP-195): dayMonth('uk', '2026-12-01') → '1 грудня'.
export { dayMonth, addDays } from '../../site/js/util.js';
// Analytics beacon (RSP-175).
export { AnalyticsBeacon, BeaconRequests, PRODUCTION_HOST, type BeaconTag } from './pages/analytics-beacon';
export { ANALYTICS_HOSTS } from './analytics';
