// Navigation: the three tabs and the URL hash (RSP-114).
// testomat.io folder "Navigation", suite "Tabs and the URL (RSP-114)".
import { test, expect, TAG, VIEWS, LANGS, type App, type View } from '../fixtures';

/** `view` is the one open: its tab is selected, its section shown, the other two hidden. */
async function expectView(app: App, view: View) {
  for (const v of VIEWS) {
    await expect(app.tab(v)).toHaveAttribute('aria-selected', String(v === view));
    if (v === view) await expect(app.view(v)).toBeVisible();
    else await expect(app.view(v)).toBeHidden();
  }
}

// ── ff1239ee ────────────────────────────────────────────────────────────────────────────────────

test('Tab click writes the hash; reload keeps the tab @Tff1239ee',
  { tag: [TAG.navigation, TAG.smoke] }, async ({ app, page }) => {
    await app.open();
    await expectView(app, 'collection');

    for (const view of ['practice', 'traps', 'collection'] as View[]) {
      await test.step(`click ${view}, then reload`, async () => {
        await app.tab(view).click();
        await expect(page).toHaveURL(new RegExp(`#${view}$`));
        await expectView(app, view);
        await expect(app.tab(view)).toBeFocused();

        await app.reload();
        await expect(page).toHaveURL(new RegExp(`#${view}$`));
        await expectView(app, view);
      });
    }
  });

// ── 78f936fc ────────────────────────────────────────────────────────────────────────────────────

test('Back and Forward move between tabs @T78f936fc',
  { tag: [TAG.navigation] }, async ({ app, page }) => {
    await app.open();
    await app.tab('practice').click();
    await expectView(app, 'practice');
    await app.tab('traps').click();
    await expectView(app, 'traps');

    await test.step('Back → Practice', async () => {
      await app.back();
      await expect(page).toHaveURL(/#practice$/);
      await expectView(app, 'practice');
    });
    await test.step('Back → Collection', async () => {
      await app.back();
      expect(app.hash()).toBe('');
      await expectView(app, 'collection');
    });
    await test.step('Forward → Practice', async () => {
      await app.forward();
      await expect(page).toHaveURL(/#practice$/);
      await expectView(app, 'practice');
    });
  });

// ── e4db6705 ────────────────────────────────────────────────────────────────────────────────────

for (const view of VIEWS) {
  test(`Direct link opens its tab: #${view} @Te4db6705`,
    { tag: [TAG.navigation] }, async ({ app }) => {
      await app.open(view);
      await expectView(app, view);
      expect(app.errors).toEqual([]);
    });
}

for (const hash of ['nonsense', '']) {
  test(`Direct link: ${hash ? 'unknown hash #' + hash : 'no hash'} opens Collection @Te4db6705`,
    { tag: [TAG.navigation] }, async ({ app }) => {
      await app.open(hash);
      await expectView(app, 'collection');
      expect(app.errors).toEqual([]);
    });
}

// ── 19bfa018 ────────────────────────────────────────────────────────────────────────────────────

test('Switching language keeps the tab and the hash @T19bfa018',
  { tag: [TAG.navigation] }, async ({ app, langMenu, lang, page }) => {
    const other = LANGS.find(l => l !== lang)!;               // any language but the one the test runs in

    await app.open();
    await app.tab('practice').click();
    await expectView(app, 'practice');

    await langMenu.pick(other);
    await expect(app.html).toHaveAttribute('lang', other);
    await expect(page).toHaveURL(/#practice$/);
    await expectView(app, 'practice');

    await test.step('no history entry for the language switch: Back goes to Collection', async () => {
      await app.back();
      expect(app.hash()).toBe('');
      await expectView(app, 'collection');
      await expect(app.html).toHaveAttribute('lang', other);   // the language stays picked
    });
  });
