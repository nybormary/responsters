// Home page /<lang>/ (RSP-156): the page per language, and language-less / going to it.
// testomat.io folder "Home", suite "Home page (RSP-156)". Manual only: a395f99d (hero).
import { test, expect, TAG, LANGS, ORIGIN, type Lang } from '../fixtures';

// ── 38210569 ────────────────────────────────────────────────────────────────────────────────────

test(
  'Home page opens in its language with a matching head @T38210569',
  { tag: [TAG.home] },
  async ({ homePage, lang, texts, page }) => {
    await test.step(`open /${lang}/`, async () => {
      await homePage.open(lang);
      await expect(homePage.h1).toHaveCount(1);
    });

    await test.step(`<html lang>, title and description in ${lang}`, async () => {
      await expect(homePage.html).toHaveAttribute('lang', lang);
      await expect(page).toHaveTitle(texts.home.title);
      await expect(homePage.description).toHaveAttribute('content', texts.home.description);
    });

    await test.step('canonical and hreflang point to the production home pages', async () => {
      await expect(homePage.canonical).toHaveAttribute('href', `${ORIGIN}/${lang}/`);
      await expect(homePage.alternates).toHaveCount(LANGS.length + 1);
      for (const l of LANGS) await expect(homePage.alternate(l)).toHaveAttribute('href', `${ORIGIN}/${l}/`);
      await expect(homePage.alternate('x-default')).toHaveAttribute('href', `${ORIGIN}/`);
    });
  },
);

// Language-less URLs: these tests check how the language is chosen, so no random language is saved.
test.describe('language-less /', () => {
  test.use({ randomLang: false });

  // ── dbd1834c ──────────────────────────────────────────────────────────────────────────────────

  test.describe('with a saved language', () => {
    test.use({ seed: { lang: 'da' } }); // the browser stays en-US (playwright.config.ts)

    test(
      'Language-less / opens the home page in the saved language @Tdbd1834c',
      { tag: [TAG.home] },
      async ({ homePage, page }) => {
        await homePage.openLanguageless('/');
        await expect(page).toHaveURL(/\/da\/$/); // no ?via=lang left in the address
        await expect(homePage.root).toBeVisible();
        await expect(homePage.html).toHaveAttribute('lang', 'da');
      },
    );
  });

  // ── cefb4fde ──────────────────────────────────────────────────────────────────────────────────
  // Nothing saved: the browser language decides; one the site doesn't have falls back to English.
  // One test per browser language, so each runs in its own fresh context.
  const BROWSER_CASES: { locale: string; expected: Lang }[] = [
    { locale: 'pl-PL', expected: 'pl' },
    { locale: 'fi-FI', expected: 'en' }, // not a site language
  ];

  for (const { locale, expected } of BROWSER_CASES) {
    test.describe(`browser language ${locale}`, () => {
      test.use({ locale });

      test(
        `Language-less / opens the home page in the browser language, English as fallback: ${locale} → ${expected} @Tcefb4fde`,
        { tag: [TAG.home] },
        async ({ homePage, page }) => {
          await homePage.openLanguageless('/');
          await expect(page).toHaveURL(new RegExp(`/${expected}/$`));
          await expect(homePage.root).toBeVisible();
          await expect(homePage.html).toHaveAttribute('lang', expected);
        },
      );
    });
  }

  // ── d27aaf82 ──────────────────────────────────────────────────────────────────────────────────

  test(
    'Old app links /#collection, /#practice, /#traps still open the app tab @Td27aaf82',
    { tag: [TAG.home] },
    async ({ homePage, app, page }) => {
      for (const view of ['traps', 'practice', 'collection'] as const) {
        await test.step(`/#${view} → /en/http/#${view}, ${view} open`, async () => {
          await homePage.openLanguageless(`/#${view}`);
          await expect(page).toHaveURL(new RegExp(`/en/http/#${view}$`));
          await app.ready();
          await expect(app.view(view)).toBeVisible();
        });
      }

      await test.step('/#about is a home page section: it stays on /en/#about', async () => {
        await homePage.openLanguageless('/#about');
        await expect(page).toHaveURL(/\/en\/#about$/);
        await expect(homePage.about).toBeInViewport();
      });
    },
  );
});
