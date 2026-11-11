// Files from the host (RSP-186). testomat.io folder "Collection", suite "Files from the host (RSP-186)".
// Deployed runs take /img/ and /fonts/ from the repo files to save Netlify credits (fixtures/local-assets.ts);
// this test opts out and checks that the host itself serves them. Tagged @smoke: it runs in Production smoke.
import { test, expect, TAG } from '../fixtures';

test.use({ realAssets: true });

// ── a868cc73 ────────────────────────────────────────────────────────────────────────────────────

test(
  'The host serves the card images and fonts the pages use @Ta868cc73',
  { tag: [TAG.collection, TAG.smoke] },
  async ({ network, app, cardPage, lang, baseURL }) => {
    const host = new URL(baseURL!).host;
    // 200, or 304 when the browser revalidates a file it already has (the card page after the Collection).
    const notOk = (folder: string) => network.served(host, folder).filter((r) => r.status !== 200 && r.status !== 304);

    await test.step('Collection: every card picture loads from /img/ on the host', async () => {
      await app.open();
      await app.ready();
      const arts = app.collectionArts();
      const count = await arts.count();
      expect(count, 'card pictures in the Collection').toBeGreaterThan(0);
      for (let i = 0; i < count; i++) await arts.nth(i).scrollIntoViewIfNeeded(); // they are lazy
      await expect.poll(() => app.collectionArtsLoaded(), { message: 'every card picture has loaded' }).toBe(true);
      expect(network.served(host, '/img/').length, 'pictures answered by the host').toBeGreaterThanOrEqual(count);
      expect(notOk('/img/'), 'pictures with a status other than 200 or 304').toEqual([]);
    });

    await test.step('Card page: the picture loads from /img/ on the host', async () => {
      await cardPage.open(lang, 404);
      await cardPage.art.scrollIntoViewIfNeeded();
      await expect.poll(() => cardPage.artLoaded(), { message: 'the card picture has loaded' }).toBe(true);
      expect(notOk('/img/'), 'pictures with a status other than 200 or 304').toEqual([]);
    });

    await test.step('The pages use web fonts from /fonts/ on the host', async () => {
      await network.settled();
      expect(network.served(host, '/fonts/').length, 'font files answered by the host').toBeGreaterThan(0);
      expect(notOk('/fonts/'), 'font files with a status other than 200 or 304').toEqual([]);
      expect((await network.loadedFonts()).length, 'web fonts in use on the card page').toBeGreaterThan(0);
    });
  },
);
