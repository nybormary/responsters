// Home page /<lang>/ (RSP-156): the page per language, and language-less / going to it.
// testomat.io folder "Home", suite "Home page (RSP-156)". Manual only: a395f99d (hero).
// RSP-172: "How it works" as path steps (9da0bb5b) and the tilted hero cards (3b389713).
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

// ── 9da0bb5b ────────────────────────────────────────────────────────────────────────────────────
// Path steps change at 760 px: side by side with the line across on wide screens, one column with the line down below.

test(
  '"How it works" on the home page is a path of three steps with pictures @T9da0bb5b',
  { tag: [TAG.home] },
  async ({ homePage, lang, texts, screenName }) => {
    const steps = homePage.steps;
    const line = screenName === 'desktop-1280' ? 'across' : 'down';

    await test.step(`open /${lang}/`, async () => {
      await homePage.open(lang);
    });

    await test.step('three steps in order: markers 1, 2, 3; title and text in the page language', async () => {
      await expect(steps.items).toHaveCount(3);
      await expect(steps.markers).toHaveText(['1', '2', '3']);
      for (const [i, [title, text]] of texts.home.steps.entries()) {
        await expect(steps.heading(i)).toHaveText(title);
        await expect(steps.item(i)).toContainText(text);
      }
    });

    await test.step('step art: creature 418; 304 → "304 ✓"; "502 ≠ 504"', async () => {
      await expect(steps.pictures(0)).toHaveAttribute('src', /\/418-art\.jpg$/);
      await expect(steps.chips(0)).toHaveCount(0);
      await expect(steps.pictures(1)).toHaveAttribute('src', /\/304-art\.jpg$/);
      await expect(steps.chips(1)).toHaveText(['304 ✓']);
      await expect(steps.pictures(2)).toHaveCount(0);
      await expect(steps.chips(2)).toHaveText(['502', '504']);
    });

    await test.step('the pictures load (they are lazy: scroll them into view first)', async () => {
      for (const i of [0, 1]) {
        await steps.art(i).scrollIntoViewIfNeeded();
        await expect.poll(() => steps.picturesLoaded(i)).toBe(true);
      }
    });

    await test.step(`dashed line ${line} after steps 1 and 2, none after 3; no tinted step cards`, async () => {
      expect(await steps.lineAfter(0)).toBe(line);
      expect(await steps.lineAfter(1)).toBe(line);
      expect(await steps.lineAfter(2)).toBe('none');
      for (const i of [0, 1, 2]) expect(await steps.background(i)).toBe('rgba(0, 0, 0, 0)');
    });

    await test.step('no sideways scroll; at 320 px one column with the line down, still no sideways scroll', async () => {
      expect(await homePage.fitsWidth()).toBe(true);
      await homePage.setWidth(320);
      expect(await steps.lineAfter(0)).toBe('down');
      expect(await homePage.fitsWidth()).toBe(true);
    });
  },
);

// ── 3b389713 ────────────────────────────────────────────────────────────────────────────────────

const HERO = [102, 201, 304, 418, 502] as const;

test(
  'Hero cards are tilted at different small angles and their codes stay visible @T3b389713',
  { tag: [TAG.home] },
  async ({ homePage, lang, texts }) => {
    await test.step(`open /${lang}/`, async () => {
      await homePage.open(lang);
    });

    await test.step('five figures: the picture with its art text as alt, the code as caption (and not in the alt)', async () => {
      for (const code of HERO) {
        await expect(homePage.heroCard(code)).toHaveRole('figure');
        await expect(homePage.heroPicture(code)).toHaveAttribute('alt', texts.cards[code].art);
        await expect(homePage.heroPicture(code)).not.toHaveAttribute('alt', new RegExp(`\\b${code}\\b`));
        await expect(homePage.heroCaption(code)).toHaveText(String(code));
      }
    });

    await test.step('five different tilts, each above 0° and at most 2°', async () => {
      const tilts: number[] = [];
      for (const code of HERO) tilts.push(await homePage.heroTilt(code));
      expect(new Set(tilts).size, `tilts ${tilts.join(', ')}`).toBe(HERO.length);
      for (const t of tilts) {
        expect(Math.abs(t)).toBeGreaterThan(0);
        expect(Math.abs(t)).toBeLessThanOrEqual(2);
      }
    });

    await test.step('static: no animation or transition on any card', async () => {
      for (const code of HERO) expect(await homePage.heroAnimations(code)).toBe(0);
    });

    await test.step('every code fully inside the hero and not covered by a neighbouring card', async () => {
      for (const code of HERO) {
        await homePage.heroCaption(code).scrollIntoViewIfNeeded();
        await expect(homePage.heroCaption(code)).toBeVisible();
        // Inside the hero, not just "in the window": a caption pushed sideways would scroll into view and pass.
        // toBeInViewport({ ratio: 1 }) was flaky on CI (0.99999 for a tilted card, PR #36); the hero check has a 5px slack for the corners of tilted cards.
        expect(await homePage.heroCaptionInsideHero(code), `caption ${code} inside the hero`).toBe(true);
        expect(await homePage.heroCaptionOnTop(code), `caption ${code}`).toBe(true);
      }
    });
  },
);

// Language-less URLs: these tests check how the language is chosen, so no random language is saved.
test.describe('language-less /', () => {
  test.use({ randomLang: false, langRedirect: true });

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
