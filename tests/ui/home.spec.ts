// Home page /<lang>/ (RSP-156): the page per language, and language-less / going to it.
// testomat.io folder "Home", suite "Home page (RSP-156)". Manual only: a395f99d (hero), cefb4fde (browser language).
import { test, expect, TAG, LANGS, ORIGIN } from '../fixtures';

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
      { tag: [TAG.home, TAG.language] },
      async ({ homePage, page }) => {
        await homePage.openLanguageless('/');
        await expect(page).toHaveURL(/\/da\/$/); // no ?via=lang left in the address
        await expect(homePage.root).toBeVisible();
        await expect(homePage.html).toHaveAttribute('lang', 'da');
      },
    );
  });

  // ── d27aaf82 ──────────────────────────────────────────────────────────────────────────────────

  test(
    'Old app links /#collection, /#practice, /#traps still open the app tab @Td27aaf82',
    { tag: [TAG.home, TAG.navigation] },
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
