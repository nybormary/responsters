// Accessibility: landmarks and alt text (automated part; manual checks follow KAZOO).
// testomat.io folder "Accessibility", suite "Landmarks and alt text (RSP-138)". Later: axe (RSP-162).
import {
  test,
  expect,
  TAG,
  VIEWS,
  markOf,
  boxes,
  controlBorderContrasts,
  type MarkerLook,
  type Mark,
} from '../fixtures';

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

// ── fb7f85e7 ────────────────────────────────────────────────────────────────────────────────────
// RSP-169 AC8 (WCAG 1.4.1): right = thicker frame (ring), wrong = ✕ badge, not picked = plain. Read from the
// computed style, never from colour; the ✕ is decoration (empty alt text), so not in the accessibility tree.

test(
  'Right and wrong answers differ without colour in Practice and Traps @Tfb7f85e7',
  { tag: [TAG.a11y] },
  async ({ app, texts }) => {
    await test.step('Practice (picture → code): a wrong pick shows ✕ on it, the ring on the right one', async () => {
      await app.open('practice');
      const right = await app.rightCode();
      const codes = await app.answerCodes();
      const wrong = codes.find((c) => c !== right) as number;
      const before = await boxes(app.answers);
      await app.answer(wrong).click();
      await expect(app.feedback).toBeVisible();
      expect(await boxes(app.answers), 'no answer moves or changes size').toEqual(before);
      for (const c of codes) {
        const expected: Mark = c === right ? 'right' : c === wrong ? 'wrong' : 'plain';
        expect(await markOf(app.answer(c)), `answer ${c}`).toBe(expected);
      }
      expect(await app.answer(wrong).ariaSnapshot(), 'the ✕ is not read').not.toContain('✕');
      await expect(app.feedback).toContainText(texts.ui.no);
    });

    await test.step('Traps: one ring per situation; a wrong pick shows ✕; nothing moves', async () => {
      await app.open('traps');
      let wrongSeen = false;
      for (let pair = 0; pair < 3 && !wrongSeen; pair++) {
        const lines = await app.situationCount(pair);
        for (let line = 0; line < lines && !wrongSeen; line++) {
          const buttons = app.situationAnswers(pair, line);
          const before = await boxes(buttons);
          await buttons.first().click();
          expect(await boxes(buttons), `situation ${pair}-${line}: nothing moves`).toEqual(before);
          const marks: Mark[] = [];
          for (let i = 0; i < (await buttons.count()); i++) marks.push(await markOf(buttons.nth(i)));
          expect(
            marks.filter((m) => m === 'right'),
            `situation ${pair}-${line}: ${marks}`,
          ).toHaveLength(1);
          expect(['right', 'wrong'], `situation ${pair}-${line}: the picked code is marked`).toContain(marks[0]);
          expect(marks.slice(1).includes('wrong'), 'only the picked code can be wrong').toBe(false);
          if (marks[0] === 'wrong') {
            wrongSeen = true;
            expect(await buttons.first().ariaSnapshot(), 'the ✕ is not read').not.toContain('✕');
          }
        }
      }
      expect(wrongSeen, 'some situation had a wrong first pick').toBe(true);
    });
  },
);

// ── 2b75b29c ────────────────────────────────────────────────────────────────────────────────────
// RSP-169 AC2 (WCAG 1.4.11): every bordered control (button, link, summary) against the colour behind it, ≥ 3:1.
// Dividers are not controls, so --line on them doesn't count. axe doesn't check this.

test(
  'Control borders have at least 3:1 contrast to the background, light and dark @T2b75b29c',
  { tag: [TAG.a11y] },
  async ({ app, cardPage, langMenu, lang, page }) => {
    for (const theme of ['light', 'dark'] as const) {
      await test.step(`${theme} theme`, async () => {
        await page.emulateMedia({ colorScheme: theme });
        const low: string[] = [];
        let checked = 0;
        const check = async (where: string, scope: typeof app.main) => {
          const list = await controlBorderContrasts(scope);
          checked += list.length;
          for (const r of list)
            if (r.ratio < 3) low.push(`${where}: ${r.control} ${r.ratio}:1 (${r.border} on ${r.background})`);
        };

        await app.open('collection');
        await app.openHowto();
        await check('collection + how to use', app.main);
        await langMenu.open();
        await check('header + language menu', app.banner);
        await langMenu.button.click();

        await app.open('practice');
        const right = await app.rightCode();
        const wrong = (await app.answerCodes()).find((c) => c !== right) as number;
        await app.answer(wrong).click();
        await check('practice, answered', app.main);

        await app.open('traps');
        await app.situationAnswers(0, 0).first().click();
        await check('traps, answered', app.main);

        await cardPage.open(lang, 418);
        await check('card page', app.main);
        await check('card page header', app.banner);

        expect(checked, 'controls with a border were found').toBeGreaterThan(10);
        expect(low, 'control borders below 3:1').toEqual([]);
      });
    }
  },
);
