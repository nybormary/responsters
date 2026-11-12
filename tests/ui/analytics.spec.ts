// Analytics beacon (RSP-175). testomat.io folder "Privacy", suite "Analytics beacon (RSP-175)".
// Cloudflare Web Analytics: the build puts one loader in every page a visitor stays on; it adds the beacon only on
// mnemozoo.com. Requests to the beacon are blocked in every test (fixtures/analytics.ts): nothing reaches Cloudflare.
// AC4 (the loader exactly once in every generated page, none on chooser pages) is checked by the build itself.
import { test, expect, TAG, AnalyticsBeacon, BeaconRequests, PRODUCTION_HOST, type Lang } from '../fixtures';

const BEACON_SRC = 'https://static.cloudflareinsights.com/beacon.min.js';
const TOKEN = '0b35d40b48384f0eac7566c199b949a6'; // public: it is in every page's source

const CODES = [102, 404, 504] as const; // the same cards as site-header.spec.ts and a11y.spec.ts

/** The four pages a visitor stays on, in one language, with a random card. */
const pagesOf = (lang: Lang) => {
  const code = CODES[Math.floor(Math.random() * CODES.length)];
  return [`/${lang}/`, `/${lang}/http/`, `/${lang}/http/${code}/`, `/${lang}/no-such-page/`];
};

// ── 0bb00e39 ────────────────────────────────────────────────────────────────────────────────────

test(
  'The analytics beacon loads once per page, only on mnemozoo.com, and sets no cookies @T0bb00e39',
  { tag: [TAG.privacy] },
  async ({ page, browser, baseURL, lang }) => {
    const paths = pagesOf(lang);
    const onProduction = new URL(baseURL!).hostname === PRODUCTION_HOST;
    const here = new AnalyticsBeacon(page);
    const hereRequests = new BeaconRequests(page);

    await test.step(`On the address under test${onProduction ? ' (production: the beacon loads)' : ''}`, async () => {
      for (const path of paths) {
        const before = hereRequests.urls.length;
        await page.goto(path);
        await page.waitForLoadState('networkidle');
        expect(await here.loaders(), `${path}: beacon loaders in the HTML`).toBe(1);
        expect((await here.beacons()).length, `${path}: beacon tags`).toBe(onProduction ? 1 : 0);
        expect(hereRequests.urls.length - before, `${path}: beacon requests`).toBe(onProduction ? 1 : 0);
      }
    });

    const prod = await AnalyticsBeacon.asProduction(browser, baseURL!, page.viewportSize());
    try {
      await test.step('The same pages as on mnemozoo.com: one beacon each, blocked', async () => {
        for (const path of paths) {
          const before = prod.requests.urls.length;
          await prod.page.goto(`https://${PRODUCTION_HOST}${path}`);
          await prod.page.waitForLoadState('networkidle');
          expect(await prod.beacon.loaders(), `${path}: beacon loaders in the HTML`).toBe(1);
          const tags = await prod.beacon.beacons();
          expect(
            tags.map((t) => t.src),
            `${path}: beacon tags`,
          ).toEqual([BEACON_SRC]);
          expect(JSON.parse(tags[0].settings ?? '{}'), `${path}: beacon settings`).toEqual({ token: TOKEN });
          expect(prod.requests.urls.slice(before), `${path}: beacon requests`).toEqual([BEACON_SRC]);
        }
        expect(
          prod.requests.errors.filter((e) => !e.includes('ERR_BLOCKED_BY_CLIENT')),
          'beacon requests that were not blocked',
        ).toEqual([]);
      });

      await test.step('mnemozoo.com/ → /<lang>/: one beacon request for the visit', async () => {
        const before = prod.requests.urls.length;
        await prod.page.goto(`https://${PRODUCTION_HOST}/`);
        await prod.page.waitForURL(/\/[a-z]{2}\/$/);
        await prod.page.waitForLoadState('networkidle');
        expect(prod.requests.urls.length - before, 'beacon requests: the chooser page sends none').toBe(1);
      });

      await test.step('No cookie from the beacon, no consent banner', async () => {
        expect(await AnalyticsBeacon.foreignCookies(page.context()), 'cookies on the address under test').toEqual([]);
        expect(await AnalyticsBeacon.foreignCookies(prod.context), 'cookies on mnemozoo.com').toEqual([]);
        await expect(prod.page.getByRole('dialog'), 'consent banner').toHaveCount(0);
      });
    } finally {
      await prod.context.close();
    }
  },
);
