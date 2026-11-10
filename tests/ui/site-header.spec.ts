// Site header and footer on the app and the card pages (RSP-155; made for the home page in RSP-156).
// testomat.io folder "Navigation", suite "Site header and footer (RSP-155)".
import { test, expect, TAG, textsFor, langName, LANG_REDIRECT, type App, type CardPage, type Lang } from '../fixtures';

const CODES = [102, 404, 504] as const;

/** The pages of this test: the app, then card pages. Each opens itself and names itself for the step title. */
const pages = (app: App, cardPage: CardPage, lang: Lang) => [
  { name: `app /${lang}/http/`, open: () => app.open() },
  ...CODES.map((code) => ({ name: `card page /${lang}/http/${code}/`, open: () => cardPage.open(lang, code) })),
];

// ── adf2cdff ────────────────────────────────────────────────────────────────────────────────────

test(
  'The app and card pages show the same site header and footer in the page language @Tadf2cdff',
  { tag: [TAG.navigation] },
  async ({ app, cardPage, site, lang, texts }) => {
    for (const p of pages(app, cardPage, lang)) {
      await test.step(`${p.name}: header and footer in ${lang}`, async () => {
        await p.open();
        await expect(site.logo).toHaveAttribute('href', `/${lang}/`);
        await expect(site.mapLink).toHaveText(texts.site.map);
        await expect(site.mapLink).toHaveAttribute('href', `/${lang}/#map`);
        await expect(site.aboutLink).toHaveText(texts.site.about);
        await expect(site.aboutLink).toHaveAttribute('href', `/${lang}/#about`);
        await expect(site.langButton).toContainText(langName(lang));
        await expect(site.footerNote).toHaveText(texts.site.foot);
        await expect(site.securityLink).toHaveAttribute('href', '/.well-known/security.txt');
      });
    }
  },
);

// ── 5a9cf576 ────────────────────────────────────────────────────────────────────────────────────

test(
  'Site header links go to the home page, the zoo map and About in the page language @T5a9cf576',
  { tag: [TAG.navigation] },
  async ({ app, cardPage, site, homePage, lang, page }) => {
    const from = [
      { name: `app /${lang}/http/`, open: () => app.open() },
      { name: `card page /${lang}/http/404/`, open: () => cardPage.open(lang, 404) },
    ];
    for (const p of from) {
      await test.step(`${p.name}: the logo opens /${lang}/`, async () => {
        await p.open();
        await site.logo.click();
        await expect(page).toHaveURL(new RegExp(`/${lang}/$`));
        await expect(homePage.root).toBeVisible();
      });
      await test.step(`${p.name}: the map link opens /${lang}/#map`, async () => {
        await p.open();
        await site.mapLink.click();
        await expect(page).toHaveURL(new RegExp(`/${lang}/#map$`));
        await expect(homePage.zooMap).toBeInViewport();
      });
      await test.step(`${p.name}: the about link opens /${lang}/#about`, async () => {
        await p.open();
        await site.aboutLink.click();
        await expect(page).toHaveURL(new RegExp(`/${lang}/#about$`));
        await expect(homePage.about).toBeInViewport();
      });
    }
  },
);

// Language changes: these tests check how the language is chosen, so no random language is saved.

// ── e6010331 ────────────────────────────────────────────────────────────────────────────────────

test.describe('the app, Ukrainian saved', () => {
  test.use({ randomLang: false, seed: { lang: 'uk' } });

  test(
    'A language change in the app updates the site header and footer @Te6010331',
    { tag: [TAG.navigation] },
    async ({ app, site, langMenu, page }) => {
      const pl = await textsFor('pl');

      await test.step('open /uk/http/#traps', async () => {
        await app.open('traps');
        await expect(page).toHaveURL(/\/uk\/http\/#traps$/);
      });

      await test.step('pick Polski in the site header', async () => {
        await langMenu.pick('pl');
        await expect(page).toHaveURL(/\/pl\/http\/#traps$/);
      });

      await test.step('header links, nav name and footer follow in Polish', async () => {
        await expect(site.logo).toHaveAttribute('href', '/pl/');
        await expect(site.mapLink).toHaveText(pl.site.map);
        await expect(site.mapLink).toHaveAttribute('href', '/pl/#map');
        await expect(site.aboutLink).toHaveText(pl.site.about);
        await expect(site.aboutLink).toHaveAttribute('href', '/pl/#about');
        await expect(site.nav).toHaveAccessibleName(pl.site.nav);
        await expect(site.footerNote).toHaveText(pl.site.foot);
      });

      await test.step('one language menu on the page, in the site header', async () => {
        await expect(langMenu.button).toHaveCount(1);
        await expect(site.langButton).toHaveCount(1);
      });
    },
  );
});

// ── e8a26193 ────────────────────────────────────────────────────────────────────────────────────

test.describe('a card page, nothing saved', () => {
  test.use({ randomLang: false }); // the browser stays en-US (playwright.config.ts)

  test(
    'The language menu on a card page opens the same card in the other language and saves the choice @Te8a26193',
    { tag: [TAG.navigation] },
    async ({ cardPage, langMenu, page }) => {
      await test.step('/en/http/404/: pick Polski', async () => {
        await cardPage.open('en', 404);
        await langMenu.pick('pl');
        await expect(page).toHaveURL(/\/pl\/http\/404\/$/);
        await expect(cardPage.html).toHaveAttribute('lang', 'pl');
      });

      await test.step('the language-less /http/404/ opens it in Polish', async (step) => {
        step.skip(LANG_REDIRECT.skip, LANG_REDIRECT.reason);
        await cardPage.openLanguageless(404);
        await expect(page).toHaveURL(/\/pl\/http\/404\/$/);
        await expect(cardPage.html).toHaveAttribute('lang', 'pl');
      });
    },
  );
});
