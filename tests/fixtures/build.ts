// The page build with a pinned date (RSP-199): for tests of what the build writes, e.g. noindex and the sitemap of
// the git card pages. Builds into a folder of the test, so dist/ (served to the other tests) stays untouched.
import { execFile } from 'node:child_process';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { promisify } from 'node:util';
import type { Page } from '@playwright/test';

const run = promisify(execFile);

/** A finished build in `out`: read its files by their path in the site (e.g. 'sitemap.xml', 'uk/git/add/index.html'). */
export class Build {
  constructor(readonly out: string) {}
  file(rel: string): Promise<string> {
    return readFile(path.join(this.out, rel), 'utf8');
  }
  /**
   * Answer the browser's request for page `urlPath` (e.g. '/uk/') with this build's copy of it; everything else (JS,
   * CSS, pictures) still comes from the site under test. So a test can see a page as a pinned date built it, with
   * the browser clock where it wants.
   */
  async serve(page: Page, urlPath: string): Promise<void> {
    const body = await this.file(`${urlPath.replace(/^\//, '')}index.html`);
    await page.route(
      (url) => url.pathname === urlPath,
      (route) => route.fulfill({ status: 200, contentType: 'text/html; charset=utf-8', body }),
    );
  }
}

/**
 * Build the site as on `date` (YYYY-MM-DD, Copenhagen) into `out`, with the advent starting on `start` (ADVENT_START,
 * RSP-195; the production default unless a test says otherwise, so a test's dates don't depend on how the run was
 * started). Rejects with the build's error when it stops.
 */
export async function buildOn(date: string, out: string, start = '2026-12-01'): Promise<Build> {
  await run(process.execPath, ['scripts/build-pages.mjs'], {
    env: { ...process.env, BUILD_DATE: date, BUILD_OUT: out, ADVENT_START: start },
  });
  return new Build(out);
}
