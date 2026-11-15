// Site header and footer on the app and the card pages (RSP-155; made for the home page in RSP-156).
// testomat.io folder "Navigation", suite "Site header and footer (RSP-155)".
import { test, expect, TAG, ORIGIN, textsFor, langName, type App, type CardPage, type Lang } from '../fixtures';

const escapeRe = (s: string) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** The footer's years, as the page build writes them (scripts/build-pages.mjs, RSP-139). */
const copyYears = () => {
  const y = new Date().getFullYear();
  return y > 2026 ? `2026–${y}` : '2026';
};

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

      await test.step('the language-less /http/404/ opens it in Polish', async () => {
        await cardPage.openLanguageless(404);
        await expect(page).toHaveURL(/\/pl\/http\/404\/$/);
        await expect(cardPage.html).toHaveAttribute('lang', 'pl');
      });
    },
  );
});

// ── 6add6dcb ────────────────────────────────────────────────────────────────────────────────────
// RSP-139 AC4, RSP-147, RSP-145: every footer link on every page type, in the page language. The mail link carries a
// subject in the page language and the page address (the production address from the build; in the app and after a
// click, the address actually open). The click itself is cancelled: a mailto: would leave the browser (no mail program in a test run).

/** subject and body of a mailto: link */
const mailParts = (href: string | null) => {
  const [to, query = ''] = (href ?? '').split('?');
  const q = new URLSearchParams(query);
  return { to, subject: q.get('subject'), body: q.get('body') };
};

test(
  "Footer links go to the map, About, What's new, LinkedIn, GitHub, the feedback mail and security.txt in the page language @T6add6dcb",
  { tag: [TAG.navigation] },
  async ({ app, cardPage, homePage, notFoundPage, site, langMenu, page, lang }) => {
    const pages = [
      { name: `home /${lang}/`, open: () => homePage.open(lang), path: `/${lang}/` },
      // The app draws its footer with its script: the body names the address actually open, from the start.
      { name: `app /${lang}/http/`, open: () => app.open(), path: 'open' },
      { name: `card page /${lang}/http/404/`, open: () => cardPage.open(lang, 404), path: `/${lang}/http/404/` },
      { name: `What's new /${lang}/news/`, open: () => page.goto(`/${lang}/news/`), path: `/${lang}/news/` },
      // A missing address: the build can't know it, so the mail body comes only with the click (step 5).
      { name: `404 page /${lang}/no-such-page/`, open: () => notFoundPage.open(`/${lang}/no-such-page/`), path: null },
    ];
    for (const p of pages) {
      await test.step(`${p.name}: links, mail, © and credits`, async () => {
        await p.open();
        // The 404 page of a local run is the English one (npx serve knows no per-language 404): take the page's own language.
        const pageLang = (await page.locator('html').getAttribute('lang')) as Lang;
        const t = await textsFor(pageLang);
        for (const [id, hash, text] of [
          ['map', '#map', t.site.map],
          ['about', '#about', t.site.about],
        ] as const) {
          await expect(site.foot(id)).toHaveText(text);
          await expect(site.foot(id)).toHaveAttribute('href', `/${pageLang}/${hash}`);
        }
        await expect(site.foot('news')).toHaveText(t.site.news);
        await expect(site.foot('news')).toHaveAttribute('href', `/${pageLang}/news/`);
        await expect(site.foot('linkedin')).toHaveAttribute('href', 'https://www.linkedin.com/in/maryna-bortnyk/');
        await expect(site.foot('github')).toHaveAttribute('href', 'https://github.com/nybormary/responsters');
        for (const id of ['linkedin', 'github'] as const)
          await expect(site.foot(id)).toHaveAccessibleName(new RegExp(`\\(${escapeRe(t.site.ext)}\\)$`));
        const mail = site.foot('contact');
        await expect(mail).toContainText(t.site.contact);
        await expect(mail).toHaveAccessibleName(new RegExp(`\\(${escapeRe(t.site.mail)}\\)$`));
        const parts = mailParts(await mail.getAttribute('href'));
        expect(parts.to).toBe('mailto:clapsy@mnemozoo.com');
        expect(parts.subject).toBe(`Mnemozoo: ${t.site.contact}`);
        const where = p.path === 'open' ? page.url() : p.path && `${ORIGIN}${p.path}`;
        expect(parts.body).toBe(where ? `${t.site.page}: ${where}` : null);
        await expect(site.foot('security')).toHaveAttribute('href', '/.well-known/security.txt');
        await expect(site.foot('copy')).toHaveText(`© ${copyYears()} Mnemozoo`);
        await expect(site.foot('credits')).toHaveText(t.site.foot);
      });
    }

    await test.step('a click puts the address actually open into the mail: the app on Practice, the 404 path', async () => {
      for (const open of [() => app.open('practice'), () => notFoundPage.open(`/${lang}/no-such-page/`)]) {
        await open();
        const t = await textsFor((await page.locator('html').getAttribute('lang')) as Lang);
        await site.foot('contact').evaluate((a) => a.addEventListener('click', (e) => e.preventDefault()));
        await site.foot('contact').click();
        expect(mailParts(await site.foot('contact').getAttribute('href')).body).toBe(`${t.site.page}: ${page.url()}`);
      }
    });

    await test.step('a language change in the app: the footer follows', async () => {
      const other = lang === 'pl' ? 'da' : 'pl';
      const t = await textsFor(other);
      await app.open();
      await langMenu.pick(other);
      await expect(site.foot('map')).toHaveAttribute('href', `/${other}/#map`);
      await expect(site.foot('about')).toHaveText(t.site.about);
      await expect(site.foot('news')).toHaveAttribute('href', `/${other}/news/`);
      await expect(site.foot('news')).toHaveText(t.site.news);
      await expect(site.foot('contact')).toContainText(t.site.contact);
      await expect(site.foot('contact')).toHaveAccessibleName(new RegExp(`\\(${escapeRe(t.site.mail)}\\)$`));
      await expect(site.foot('linkedin')).toHaveAccessibleName(new RegExp(`\\(${escapeRe(t.site.ext)}\\)$`));
      expect(mailParts(await site.foot('contact').getAttribute('href')).subject).toBe(`Mnemozoo: ${t.site.contact}`);
      await expect(site.foot('credits')).toHaveText(t.site.foot);
    });
  },
);
