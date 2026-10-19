// Language: browser language, language menu (mouse and keyboard).
// testomat.io folder "Language", suite "Language menu and locales". Tickets: RSP-97, RSP-109.
import { test, expect, TAG, LANGS, textsFor, langName, type Lang, type App } from '../fixtures';

// These tests check how the language is chosen, so no random language is saved before they start.
test.use({ randomLang: false });

/** The page is shown in `lang`: <html lang> and the tab names come from that language's file. */
async function expectLanguage(app: App, lang: Lang) {
  const tabs = (await textsFor(lang)).ui.tabs;
  await expect(app.html).toHaveAttribute('lang', lang);
  await expect(app.tab('collection')).toHaveText(tabs[0]);
  await expect(app.tab('practice')).toHaveText(tabs[1]);
  await expect(app.tab('traps')).toHaveText(tabs[2]);
}

// ── c727f8eb: Browser language picks the site language (RSP-97) ────────────────────────────────
// One test per browser language, so each runs in its own fresh context with nothing saved.
const BROWSER_CASES: { locale: string; expected: Lang }[] = [
  { locale: 'pl-PL', expected: 'pl' },
  { locale: 'da-DK', expected: 'da' },
  { locale: 'et-EE', expected: 'et' },
  { locale: 'lt-LT', expected: 'lt' },
  { locale: 'uk-UA', expected: 'uk' },
  { locale: 'ru-RU', expected: 'en' },   // unsupported → English, never Ukrainian
];

for (const { locale, expected } of BROWSER_CASES) {
  test.describe(`browser language ${locale}`, () => {
    test.use({ locale });

    test(`Browser language picks the site language: ${locale} → ${expected} @Tc727f8eb`,
      { tag: [TAG.language] }, async ({ app }) => {
        await app.open();
        await expectLanguage(app, expected);
      });
  });
}

test.describe('browser language vs. saved choice', () => {
  test.use({ locale: 'pl-PL', seed: { lang: 'da' } });

  test('Browser language picks the site language: a language picked in the menu wins @Tc727f8eb',
    { tag: [TAG.language] }, async ({ app }) => {
      await app.open();
      await expectLanguage(app, 'da');
    });
});

// ── feda8226: Language menu: 6 languages, pick switches and is kept after reload (RSP-109) ──────

test('Language menu lists every language in its own language, current one checked @Tfeda8226',
  { tag: [TAG.language] }, async ({ app, langMenu }) => {
    await app.open();
    await langMenu.open();

    await expect(langMenu.list).toBeVisible();
    await expect(langMenu.options).toHaveText(LANGS.map(langName));
    await expect(langMenu.checked).toHaveCount(1);
    await expect(langMenu.checked).toHaveText(langName('en'));   // the config pins the browser to en-US
  });

test('Language menu: picking a language switches the page and is kept after reload @Tfeda8226',
  { tag: [TAG.language, TAG.smoke] }, async ({ app, langMenu, page }) => {
    await app.open();

    await test.step('pick each language in turn', async () => {
      for (const lang of LANGS) {
        await langMenu.pick(lang);
        await expect(langMenu.list).toBeHidden();
        await expectLanguage(app, lang);
        await expect(langMenu.button).toBeFocused();
      }
    });

    await test.step('pick Polski and reload', async () => {
      await langMenu.pick('pl');
      await expectLanguage(app, 'pl');
      await page.reload();
      await expectLanguage(app, 'pl');
    });
  });

test('Language menu: a click outside closes it @Tfeda8226',
  { tag: [TAG.language] }, async ({ app, langMenu }) => {
    await app.open();
    await langMenu.open();
    await expect(langMenu.list).toBeVisible();

    await app.clickOutside();
    await expect(langMenu.list).toBeHidden();
    await expectLanguage(app, 'en');
  });

// ── 641973be: Language menu with the keyboard (RSP-109) ─────────────────────────────────────────

test('Language menu with the keyboard @T641973be',
  { tag: [TAG.language] }, async ({ app, langMenu, page }) => {
    const first = LANGS[0];
    const last = LANGS[LANGS.length - 1];
    const current: Lang = 'en';                                  // the config pins the browser to en-US
    const next = LANGS[(LANGS.indexOf(current) + 1) % LANGS.length];

    await app.open();

    await test.step('Enter on the button opens the menu with focus on the current language', async () => {
      await langMenu.button.focus();
      await page.keyboard.press('Enter');
      await expect(langMenu.list).toBeVisible();
      await expect(langMenu.option(current)).toBeFocused();
    });

    await test.step('↓ / ↑ move and wrap around', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(langMenu.option(next)).toBeFocused();
      await page.keyboard.press('ArrowUp');
      await expect(langMenu.option(current)).toBeFocused();
      await page.keyboard.press('Home');
      await page.keyboard.press('ArrowUp');                      // from the first one, ↑ wraps to the last
      await expect(langMenu.option(last)).toBeFocused();
      await page.keyboard.press('ArrowDown');                    // and ↓ wraps back to the first
      await expect(langMenu.option(first)).toBeFocused();
    });

    await test.step('Home / End jump to the first / last language', async () => {
      await page.keyboard.press('End');
      await expect(langMenu.option(last)).toBeFocused();
      await page.keyboard.press('Home');
      await expect(langMenu.option(first)).toBeFocused();
    });

    await test.step('Enter picks a language, closes the menu and returns focus to the button', async () => {
      await page.keyboard.press('End');
      await page.keyboard.press('Enter');
      await expect(langMenu.list).toBeHidden();
      await expectLanguage(app, last);
      await expect(langMenu.button).toBeFocused();
    });

    await test.step('Escape closes the menu and returns focus to the button', async () => {
      await page.keyboard.press('Enter');
      await expect(langMenu.option(last)).toBeFocused();         // opens on the language just picked
      await page.keyboard.press('Escape');
      await expect(langMenu.list).toBeHidden();
      await expect(langMenu.button).toBeFocused();
    });

    await test.step('↓ on the button also opens the menu; Tab closes it', async () => {
      await page.keyboard.press('ArrowDown');
      await expect(langMenu.list).toBeVisible();
      await page.keyboard.press('Tab');
      await expect(langMenu.list).toBeHidden();
    });
  });
