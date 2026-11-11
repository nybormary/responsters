// Card images and web fonts from the repo instead of the host, in runs against a deployed site (RSP-186).
//
// Why: every test starts with a fresh browser context, so a full run against a deploy preview or production
// downloaded every card image and font again: ~2,500 requests and ~18 MB per run, ~80% of the site's Netlify
// traffic (measured 2026-11-10). On Netlify Free those requests and bytes use the credits that keep the site up.
//
// What: on a deployed target, a request for /img/… or /fonts/… on the site's own host is answered with the
// same file from site/ (what the build copies to dist/). Rendering stays real: same bytes, same sizes.
// A file that is not in the repo goes to the host as usual, so a broken path still fails as it would.
// Local runs (target "local") are unchanged.
//
// How: Chrome's own request interception (CDP Fetch), limited to /img/ and /fonts/. Not page.route():
// Playwright's routing turns the browser cache off, and then every reload and every new page downloads CSS and
// scripts again in full (measured: +40% bytes on the other files, which would eat part of the saving).
//
// Tests that check the host's own files opt out: test.use({ realAssets: true }).
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import type { Page } from '@playwright/test';

const SITE = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../site');
const TYPES: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
  '.avif': 'image/avif',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
};

type Paused = { requestId: string; request: { url: string } };

/** The repo file for a request URL on the site's host, or null when the host should answer. */
async function repoFile(url: string, origin: string): Promise<{ body: Buffer; type: string } | null> {
  const u = new URL(url);
  if (u.origin !== origin) return null;
  const file = path.join(SITE, decodeURIComponent(u.pathname));
  const type = TYPES[path.extname(file).toLowerCase()];
  if (!file.startsWith(SITE + path.sep) || !type) return null;
  try {
    return { body: await readFile(file), type };
  } catch {
    return null; // not in the repo: let the host answer (a broken path stays broken)
  }
}

/** Answers /img/… and /fonts/… of `baseURL` from site/ for this page (Chromium). */
export async function serveAssetsFromRepo(page: Page, baseURL: string): Promise<void> {
  const origin = new URL(baseURL).origin;
  const cdp = await page.context().newCDPSession(page);
  cdp.on('Fetch.requestPaused', async ({ requestId, request }: Paused) => {
    try {
      const hit = await repoFile(request.url, origin);
      if (!hit) return void (await cdp.send('Fetch.continueRequest', { requestId }));
      await cdp.send('Fetch.fulfillRequest', {
        requestId,
        responseCode: 200,
        responseHeaders: [{ name: 'Content-Type', value: hit.type }],
        body: hit.body.toString('base64'),
      });
    } catch {
      /* the page or the test has already closed */
    }
  });
  await cdp.send('Fetch.enable', {
    patterns: ['/img/', '/fonts/'].map((folder) => ({ urlPattern: `${origin}${folder}*` })),
  });
}
