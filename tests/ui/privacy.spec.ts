// What leaves the visitor's browser (RSP-160). testomat.io folder "Privacy", suite "Third-party requests (RSP-160)".
import { test, expect, TAG, VIEWS } from '../fixtures';

// ── 4ff71157 ────────────────────────────────────────────────────────────────────────────────────

test(
  'Pages load only from the site itself: no request to another host @T4ff71157',
  { tag: [TAG.privacy] },
  async ({ network, homePage, app, cardPage, notFoundPage, lang, baseURL }) => {
    const own = new URL(baseURL!).host;
    const onlyOwnHost = async (where: string) => {
      await network.settled();
      expect(network.hosts(), `${where}: hosts requested`).toEqual([own]);
    };

    await test.step('Home page', async () => {
      await homePage.open(lang);
      await onlyOwnHost('home page');
    });

    await test.step('HTTP rubric: Collection, Practice, Traps', async () => {
      await app.open();
      await app.ready();
      for (const view of VIEWS) {
        await app.tab(view).click();
        await expect(app.view(view)).toBeVisible();
        await onlyOwnHost(`app, ${view}`);
      }
    });

    await test.step('Card page', async () => {
      await cardPage.open(lang, 404);
      await onlyOwnHost('card page');
    });

    await test.step('404 page', async () => {
      await notFoundPage.open(`/${lang}/no-such-page`);
      await onlyOwnHost('404 page');
    });

    await test.step('The fonts came from the site and are in use', async () => {
      // Both: requesting the files (preloads do that too) and the page actually using a web font.
      expect(network.fontFiles().length, 'font files from /fonts/').toBeGreaterThan(0);
      expect((await network.loadedFonts()).length, 'web fonts in use on the 404 page').toBeGreaterThan(0);
    });
  },
);
