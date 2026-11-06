// Accessibility: landmarks and alt text (automated part; manual checks follow KAZOO).
// testomat.io folder "Accessibility", suite "Landmarks and alt text (RSP-138)". Later: axe (RSP-162).
import { test, expect, TAG, VIEWS } from '../fixtures';

// ── d6f8bf2f ────────────────────────────────────────────────────────────────────────────────────

test('App has one main landmark with the tabs and the views @Td6f8bf2f', { tag: [TAG.a11y] }, async ({ app }) => {
  await test.step('open the app', async () => {
    await app.open();
  });

  await test.step('exactly one main, with the three tabs and the three views inside', async () => {
    await expect(app.main).toHaveCount(1);
    for (const v of VIEWS) {
      await expect(app.tabInMain(v)).toHaveCount(1);
      await expect(app.viewInMain(v)).toHaveCount(1);
    }
  });

  // <header> and <footer> are banner and contentinfo only outside <main>: so one of each means both are outside it.
  await test.step('one banner and one contentinfo, outside main', async () => {
    await expect(app.banner).toHaveCount(1);
    await expect(app.contentinfo).toHaveCount(1);
  });
});

// ── 012f5a01 ────────────────────────────────────────────────────────────────────────────────────

const CODES = [102, 404, 504] as const;

test(
  'Card page art has alt text in the page language @T012f5a01',
  { tag: [TAG.a11y] },
  async ({ app, cardPage, lang, texts }) => {
    for (const code of CODES) {
      await test.step(`card page ${code}: alt is the picture description in ${lang}`, async () => {
        await cardPage.open(lang, code);
        await expect(cardPage.art).toHaveCount(1);
        await expect(cardPage.art).toHaveAttribute('alt', texts.cards[code].art);
      });
    }

    await test.step('Collection grid: the same pictures have an empty alt', async () => {
      await app.open();
      for (const code of CODES) await expect(app.collectionArt(code)).toHaveAttribute('alt', '');
    });
  },
);

// ── 89fcd537 ────────────────────────────────────────────────────────────────────────────────────
// testomat.io suite "Site landmarks (RSP-155)": the site header and footer on the app and the card pages.

test(
  'App and card pages have one banner, one main and one contentinfo @T89fcd537',
  { tag: [TAG.a11y] },
  async ({ app, cardPage, site, lang, texts }) => {
    await test.step('app: one of each; the enclosure header is inside main', async () => {
      await app.open();
      await expect(site.banners).toHaveCount(1);
      await expect(site.mains).toHaveCount(1);
      await expect(site.contentinfos).toHaveCount(1);
      await expect(site.nav).toHaveAccessibleName(texts.site.nav);
      await expect(site.enclosureHeaderInMain).toHaveCount(1);
    });

    await test.step(`card page /${lang}/http/404/: one of each`, async () => {
      await cardPage.open(lang, 404);
      await expect(site.banners).toHaveCount(1);
      await expect(site.mains).toHaveCount(1);
      await expect(site.contentinfos).toHaveCount(1);
      await expect(site.nav).toHaveAccessibleName(texts.site.nav);
    });
  },
);
