// The Cloudflare Web Analytics beacon on a page (RSP-175): the loader the build puts in every page a visitor stays on,
// and the beacon tag it adds on mnemozoo.com. Requests to the beacon are always blocked in tests (../analytics.ts).
import type { Browser, BrowserContext, Page, ViewportSize } from '@playwright/test';
import { ANALYTICS_HOSTS, blockAnalytics } from '../analytics';

/** The production domain: the only host the loader adds the beacon on. */
export const PRODUCTION_HOST = 'mnemozoo.com';

/** A beacon tag the loader added: its script address and its data-cf-beacon settings. */
export type BeaconTag = { src: string; settings: string | null };

/** Requests of a page to the analytics hosts, each with its error ('' while not failed). */
export class BeaconRequests {
  readonly urls: string[] = [];
  readonly errors: string[] = [];

  constructor(page: Page) {
    const isBeacon = (url: string) => ANALYTICS_HOSTS.some((h) => new URL(url).host.endsWith(h));
    page.on('request', (r) => isBeacon(r.url()) && this.urls.push(r.url()));
    page.on('requestfailed', (r) => isBeacon(r.url()) && this.errors.push(r.failure()?.errorText ?? ''));
    page.on('requestfinished', (r) => isBeacon(r.url()) && this.errors.push('finished: reached the network'));
  }
}

export class AnalyticsBeacon {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** How many beacon loaders the page's HTML has (the build puts exactly one in a page a visitor stays on). */
  async loaders(): Promise<number> {
    return this.page.locator('script[data-analytics="cloudflare"]').count();
  }

  /** The beacon tags in the page (the loader adds one on mnemozoo.com only). */
  async beacons(): Promise<BeaconTag[]> {
    return this.page.$$eval('script[data-cf-beacon]', (tags) =>
      tags.map((t) => ({ src: (t as HTMLScriptElement).src, settings: t.getAttribute('data-cf-beacon') })),
    );
  }

  /** Cookie names of the page's browser context, without the site's own saved language (nf_lang, RSP-138). */
  static async foreignCookies(context: BrowserContext): Promise<string[]> {
    return (await context.cookies()).map((c) => c.name).filter((n) => n !== 'nf_lang');
  }

  /**
   * A fresh page where https://mnemozoo.com/… is answered with the same path from `baseURL`, so the loader sees
   * the production domain while production itself is never asked (on a production run `baseURL` is production).
   * Requests to the beacon are blocked, as on every test page. Close its context when done.
   */
  static async asProduction(
    browser: Browser,
    baseURL: string,
    viewport: ViewportSize | null,
  ): Promise<{ page: Page; beacon: AnalyticsBeacon; requests: BeaconRequests; context: BrowserContext }> {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    await blockAnalytics(page);
    const origin = new URL(baseURL).origin;
    await page.route(`https://${PRODUCTION_HOST}/**`, async (route) => {
      const u = new URL(route.request().url());
      const response = await route.fetch({ url: `${origin}${u.pathname}${u.search}`, maxRedirects: 0 });
      await route.fulfill({ response });
    });
    return { page, beacon: new AnalyticsBeacon(page), requests: new BeaconRequests(page), context };
  }
}
