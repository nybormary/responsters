// Preloads (RSP-188). testomat.io folder "Performance", suite "Preloads (RSP-188)".
// The build writes, per page type and language, font preloads for the fonts the first screen shows before any script
// runs, and modulepreloads for every script the page loads (scripts/build-pages.mjs). These tests measure the page
// itself, so a CSS, text or import change that the build's lists don't follow fails here, naming the files.
import { test, expect, TAG, CARD_CODES, SCREENS, type Lang } from '../fixtures';

/** The four page types in one language: home, the HTTP rubric, a random card page, the 404 page. */
const pagesOf = (lang: Lang) => {
  const code = CARD_CODES[Math.floor(Math.random() * CARD_CODES.length)];
  return [
    { name: 'home', path: `/${lang}/` },
    { name: 'HTTP rubric', path: `/${lang}/http/` },
    { name: `card page ${code}`, path: `/${lang}/http/${code}/` },
    // A missing address shows this file (with status 404 on Netlify; a local run shows the English one, dist/404.html).
    { name: '404 page', path: `/${lang}/no-such-page/` },
  ];
};

// ── 26163b27 ────────────────────────────────────────────────────────────────────────────────────

test(
  'Each page preloads exactly the fonts its first screen shows before the script @T26163b27',
  { tag: [TAG.performance] },
  async ({ page, browser, preloads, network, lang }) => {
    for (const p of pagesOf(lang)) {
      await test.step(`${p.name} ${p.path}`, async () => {
        await page.goto(p.path);
        await network.settled();
        const preloaded = await preloads.fonts();
        const paths = preloaded.map((f) => f.path).sort();
        // The first screen of this test's screen, and of every screen the tests use: a font the home page shows
        // above the fold only on a wide screen is still preloaded for everyone (the build has one list per page).
        const firstScreens = await Promise.all(
          Object.values(SCREENS).map(({ viewport }) => preloads.firstScreenFontFiles(browser, p.path, viewport)),
        );
        const mine = Object.values(SCREENS).findIndex(({ viewport }) => viewport.width === page.viewportSize()?.width);
        const firstScreen = firstScreens[mine];
        const anyScreen = new Set(firstScreens.flat());

        // Expected 1 and 2: the preloads are the first screen's fonts (scripts/build-pages.mjs, FIRST_SCREEN_FONTS).
        expect(
          firstScreen.filter((f) => !paths.includes(f)),
          'first-screen fonts without a preload: add them to FIRST_SCREEN_FONTS',
        ).toEqual([]);
        expect(
          paths.filter((f) => !anyScreen.has(f)),
          'preloaded fonts no first screen shows before the script: remove them from FIRST_SCREEN_FONTS',
        ).toEqual([]);
        // Expected 3: every preloaded file is used by the page with its script ("preloaded but not used").
        await page.waitForLoadState('networkidle');
        await network.settled();
        const inUse = await preloads.fontFilesInUse();
        expect(
          paths.filter((f) => !inUse.includes(f)),
          'preloaded fonts the page never uses',
        ).toEqual([]);
        // Expected 4: without crossorigin the browser downloads a preloaded font twice.
        for (const f of preloaded) {
          expect(f.crossorigin, `${f.path}: crossorigin`).not.toBeNull();
          expect(f.type, `${f.path}: type`).toBe('font/woff2');
        }
      });
    }
  },
);

// ── fd60d2a5 ────────────────────────────────────────────────────────────────────────────────────

test(
  'Each page modulepreloads exactly the scripts it loads @Tfd60d2a5',
  { tag: [TAG.performance] },
  async ({ page, preloads, lang }) => {
    for (const p of pagesOf(lang)) {
      await test.step(`${p.name} ${p.path}`, async () => {
        await page.goto(p.path);
        await page.waitForLoadState('networkidle');
        const entry = await preloads.entryScript();
        const modules = (await preloads.modules()).sort();
        const loads = (await preloads.scriptLoads()).filter((s) => s.path !== entry);
        const loaded = [...new Set(loads.map((s) => s.path))].sort();
        const pageLang = await page.locator('html').getAttribute('lang');

        // Expected 1: every script the page downloads, apart from its entry script, has a modulepreload. (The other
        // way round can't be seen from the page: a modulepreload downloads its file even when nothing imports it.
        // The build takes the list from the imports; Expected 2 catches the one file that isn't imported.)
        expect(
          loaded.filter((m) => !modules.includes(m)),
          'scripts downloaded without a modulepreload',
        ).toEqual([]);
        // Expected 2: only the app loads (and preloads) its language file.
        const localeFiles = modules.filter((m) => /^\/i18n\/(?!index|fill)\w+\.js$/.test(m));
        if (p.name === 'HTTP rubric') expect(localeFiles, 'language file preloaded').toContain(`/i18n/${pageLang}.js`);
        else expect(localeFiles, 'no language file on this page').toEqual([]);
        // Expected 3: none of them was found through an import, one level at a time. Chrome's resource timing says
        // 'script' for a module the loader found in an import, 'other' for one a <link rel="modulepreload"> started.
        expect(
          loads.filter((s) => s.initiatorType === 'script').map((s) => s.path),
          'scripts found one import level at a time',
        ).toEqual([]);
      });
    }
  },
);
