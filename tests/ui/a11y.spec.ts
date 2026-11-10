// Accessibility: landmarks and alt text (automated part; manual checks follow KAZOO).
// testomat.io folder "Accessibility", suite "Landmarks and alt text (RSP-138)". Later: axe (RSP-162).
import { test, expect, TAG, VIEWS, type MarkerLook, uppercaseElements, lookOf } from '../fixtures';

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

// ── 5cd29001 ────────────────────────────────────────────────────────────────────────────────────
// RSP-172: both lists of path steps keep list semantics; the step number (marker) and the step art are decoration.
// A marker text in the accessibility tree would show as a line "- text: 1".
const MARKER_TEXT = /^\s*- text: "?[123]"?$/m;

test(
  'Path steps on the home page and in the app\'s "How to use" are read once, without the decoration @T5cd29001',
  { tag: [TAG.a11y] },
  async ({ homePage, app, lang }) => {
    let homeMarker: MarkerLook | undefined;

    await test.step('home "How it works": a list of 3 items; markers and step art aria-hidden, pictures alt=""', async () => {
      await homePage.open(lang);
      const steps = homePage.steps;
      await expect(steps.root).toHaveRole('list');
      await expect(steps.root).toHaveAttribute('role', 'list'); // Chromium keeps <ol> a list anyway; Safari needs it
      await expect(steps.items).toHaveCount(3);
      for (const i of [0, 1, 2]) {
        await expect(steps.marker(i)).toHaveAttribute('aria-hidden', 'true');
        await expect(steps.art(i)).toHaveAttribute('aria-hidden', 'true');
      }
      for (const i of [0, 1]) await expect(steps.pictures(i)).toHaveAttribute('alt', '');
      homeMarker = await steps.markerLook(0);
    });

    await test.step('home: the accessibility tree has no step numbers, chips, arrow or "≠"', async () => {
      const tree = await homePage.steps.root.ariaSnapshot();
      expect(tree).not.toMatch(MARKER_TEXT);
      expect(tree).not.toMatch(/304 ✓|≠|→|img/);
    });

    await test.step('app "How to use": the same component, a list of 3 items, markers aria-hidden', async () => {
      await app.open();
      await app.openHowto();
      const steps = app.howtoSteps;
      await expect(steps.root).toHaveRole('list');
      await expect(steps.root).toHaveAttribute('role', 'list');
      await expect(steps.items).toHaveCount(3);
      for (const i of [0, 1, 2]) await expect(steps.marker(i)).toHaveAttribute('aria-hidden', 'true');
      expect(await steps.root.ariaSnapshot()).not.toMatch(MARKER_TEXT);
      expect(await steps.markerLook(0)).toEqual(homeMarker);
    });
  },
);

// ── 9aa6d08e ────────────────────────────────────────────────────────────────────────────────────
// RSP-170 AC2, AC3: no element is shown in capitals by CSS, except the English status name on a creature card
// (.cf-name, part of the card design). The card page section labels are normal h2 headings.

test(
  'No uppercase decorative labels on any page; card page section headings keep their levels @T9aa6d08e',
  { tag: [TAG.a11y] },
  async ({ app, homePage, cardPage, lang, texts, page }) => {
    const shouting: string[] = [];
    const collect = async (where: string) => {
      for (const e of await uppercaseElements(page)) {
        if (!/\bcf-name\b/.test(e.classes)) shouting.push(`${where}: <${e.tag} class="${e.classes}"> ${e.text}`);
      }
    };

    await test.step('home page', async () => {
      await homePage.open(lang);
      await collect('home');
    });
    await test.step('app: Collection with "How to use", Practice, Traps', async () => {
      await app.open('collection');
      await app.openHowto();
      await collect('collection');
      await app.open('practice');
      await collect('practice');
      await app.open('traps');
      await collect('traps');
    });
    await test.step('card page', async () => {
      await cardPage.open(lang, 404);
      await collect('card page');
    });

    await test.step('only the card status names are in capitals', async () => {
      expect(shouting).toEqual([]);
    });

    await test.step('card page: the section labels are h2 headings in normal case', async () => {
      const headings = cardPage.sectionHeadings;
      for (const label of [texts.ui.mean, texts.ui.when, texts.ui.qa, texts.ui.links]) {
        const h = headings.filter({ hasText: label });
        await expect(h, label).toHaveCount(1);
        expect((await lookOf(h)).textTransform, label).toBe('none');
      }
    });
  },
);
