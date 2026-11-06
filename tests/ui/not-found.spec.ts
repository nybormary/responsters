// Page for a missing address (RSP-148). testomat.io folder "Navigation", suite "Not-found page (RSP-148)".
// Manual only: 7c451de6 (the language of the 404 page: picked by Netlify rules, deploy preview or production).
import { test, expect, TAG } from '../fixtures';

const MAX_HTML_BYTES = 10 * 1024; // AC6: bots ask for missing paths thousands of times

// ── 9e5aa065 ────────────────────────────────────────────────────────────────────────────────────

test(
  'A missing address answers with status 404 and shows the 404 creature @T9e5aa065',
  { tag: [TAG.navigation] },
  async ({ notFoundPage, site, homePage, page }) => {
    for (const path of ['/no-such-page', '/en/http/999/']) {
      await test.step(`${path}: status 404, the 404 creature, small HTML`, async () => {
        const response = await notFoundPage.open(path);
        expect(response.status()).toBe(404);
        expect((await response.body()).length).toBeLessThan(MAX_HTML_BYTES);
        await expect(notFoundPage.h1).toBeVisible();
        await expect(notFoundPage.card).toBeVisible();
        await expect(notFoundPage.cardPicture).toHaveAttribute('loading', 'lazy');
        await expect(notFoundPage.cardPicture).not.toHaveAttribute('src', /^data:/);
        await expect(site.header).toBeVisible();
        await expect(site.footer).toBeVisible();
      });
    }

    await test.step('"Back to the zoo" opens the home page in the page language', async () => {
      const lang = await notFoundPage.html.getAttribute('lang');
      await notFoundPage.back.click();
      await expect(page).toHaveURL(new RegExp(`/${lang}/$`));
      await expect(homePage.root).toBeVisible();
    });
  },
);
