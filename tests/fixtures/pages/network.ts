// What the browser requests while a test runs (RSP-160): every request of the test's page, from the first
// navigation on. Used by the @privacy tests: a page must not send the visitor to other hosts just by opening.
import type { Page } from '@playwright/test';

export class Network {
  readonly page: Page;
  readonly urls: URL[] = [];
  readonly responses: { url: URL; status: number }[] = [];

  constructor(page: Page) {
    this.page = page;
    page.on('request', (request) => this.urls.push(new URL(request.url())));
    page.on('response', (response) => this.responses.push({ url: new URL(response.url()), status: response.status() }));
  }

  /** Wait until the page has loaded and every font it needs is in (fonts load only when text needs them). */
  async settled() {
    await this.page.waitForLoadState('load');
    await this.page.evaluate(() => document.fonts.ready.then(() => undefined));
  }

  /** Hosts of all requests so far, without repeats. data: and blob: URLs have no host and are left out. */
  hosts(): string[] {
    return [...new Set(this.urls.filter((u) => u.host).map((u) => u.host))];
  }

  /** Web fonts the current page has loaded and uses, as "family weight" (empty: the page shows system fonts). */
  async loadedFonts(): Promise<string[]> {
    return this.page.evaluate(() =>
      [...document.fonts].filter((f) => f.status === 'loaded').map((f) => `${f.family} ${f.weight}`),
    );
  }

  /** Paths answered from `folder` on `host` (e.g. '/img/'), each with its HTTP status (RSP-186). */
  served(host: string, folder: string): { path: string; status: number }[] {
    return this.responses
      .filter((r) => r.url.host === host && r.url.pathname.startsWith(folder))
      .map((r) => ({ path: r.url.pathname, status: r.status }));
  }

  /** Font files requested from the site so far (/fonts/…woff2), preloads included. */
  fontFiles(): string[] {
    return this.urls
      .filter((u) => u.pathname.startsWith('/fonts/') && u.pathname.endsWith('.woff2'))
      .map((u) => u.pathname);
  }
}
