// Test runs must not count as visits (RSP-175). The pages load the Cloudflare Web Analytics beacon only on
// mnemozoo.com; a production run would still send it, so every test page fails requests to cloudflareinsights.com
// at once, in Chrome itself (CDP Fetch): the page sees a network error, Cloudflare sees nothing.
// Not page.route(): that turns the browser cache off for the page (RSP-186).
import type { Page } from '@playwright/test';

type Paused = { requestId: string; request: { url: string } };

/** Hosts of the analytics beacon and of the reports it sends. */
export const ANALYTICS_HOSTS = ['static.cloudflareinsights.com', 'cloudflareinsights.com'];

/** Fails every request of this page to the analytics hosts (Chromium). */
export async function blockAnalytics(page: Page): Promise<void> {
  const cdp = await page.context().newCDPSession(page);
  cdp.on('Fetch.requestPaused', async ({ requestId }: Paused) => {
    try {
      await cdp.send('Fetch.failRequest', { requestId, errorReason: 'BlockedByClient' });
    } catch {
      /* the page or the test has already closed */
    }
  });
  await cdp.send('Fetch.enable', {
    patterns: ANALYTICS_HOSTS.flatMap((host) => [`*://${host}/*`, `*://*.${host}/*`]).map((urlPattern) => ({
      urlPattern,
    })),
  });
}
