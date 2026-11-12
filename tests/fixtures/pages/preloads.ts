// What a page asks the browser to fetch early (RSP-188): font preloads and module preloads in the HTML, and what the
// page then really uses. The build writes the preloads (scripts/build-pages.mjs); tests/ui/preloads.spec.ts checks
// that they match the page.
import type { Browser, Page } from '@playwright/test';
import { serveAssetsFromRepo } from '../local-assets';
import { resolveTarget } from '../../targets';

/** A <link rel="preload" as="font"> of the page. */
export type FontPreload = { path: string; crossorigin: string | null; type: string | null };
/** A script the page downloaded and what made Chrome fetch it: 'script' = found through an import, 'other' = a modulepreload. */
export type ScriptLoad = { path: string; initiatorType: string };

/** Families, weights and unicode-ranges of the page's @font-face rules, each with its file path. Runs in the page. */
function fontFaces() {
  const faces: { family: string; weight: string; ranges: [number, number][]; path: string }[] = [];
  for (const sheet of [...document.styleSheets])
    for (const rule of [...sheet.cssRules])
      if (rule instanceof CSSFontFaceRule) {
        const src = rule.style.getPropertyValue('src').match(/url\("?([^")]+)"?\)/);
        if (!src) continue;
        faces.push({
          family: rule.style.getPropertyValue('font-family').replace(/['"]/g, '').trim(),
          weight: rule.style.getPropertyValue('font-weight').trim(),
          ranges: (rule.style.getPropertyValue('unicode-range') || 'U+0-10FFFF')
            .split(',')
            .map((r) => r.trim().replace(/^U\+/i, '').split('-'))
            .map(([a, b]) => [parseInt(a, 16), parseInt(b ?? a, 16)] as [number, number]),
          path: new URL(src[1], location.href).pathname,
        });
      }
  return faces;
}

export class Preloads {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  /** The font preloads in the page's HTML. */
  async fonts(): Promise<FontPreload[]> {
    return this.page.$$eval('link[rel="preload"][as="font"]', (links) =>
      links.map((l) => ({
        path: new URL((l as HTMLLinkElement).href).pathname,
        crossorigin: l.getAttribute('crossorigin'),
        type: l.getAttribute('type'),
      })),
    );
  }

  /** The module preloads in the page's HTML, as paths. */
  async modules(): Promise<string[]> {
    return this.page.$$eval('link[rel="modulepreload"]', (links) =>
      links.map((l) => new URL((l as HTMLLinkElement).href).pathname),
    );
  }

  /** The page's entry script (<script type="module" src>), as a path. */
  async entryScript(): Promise<string> {
    return this.page.$eval('script[type="module"][src]', (s) => new URL((s as HTMLScriptElement).src).pathname);
  }

  /** Scripts of the site the page has downloaded (/js/, /data/, /i18n/), from the browser's resource timing. */
  async scriptLoads(): Promise<ScriptLoad[]> {
    return this.page.evaluate(() =>
      (performance.getEntriesByType('resource') as PerformanceResourceTiming[])
        .map((e) => ({ path: new URL(e.name).pathname, initiatorType: e.initiatorType }))
        .filter((e) => /^\/(js|data|i18n)\/.+\.js$/.test(e.path)),
    );
  }

  /** Font files the page uses: every web font the page has loaded, mapped to its file through the @font-face rules. */
  async fontFilesInUse(): Promise<string[]> {
    return this.page.evaluate(`(() => {
      const faces = (${fontFaces.toString()})();
      const ranges = (text) => JSON.stringify((text || 'U+0-10FFFF').split(',')
        .map((r) => r.trim().replace(/^U\\+/i, '').split('-'))
        .map(([a, b]) => [parseInt(a, 16), parseInt(b ?? a, 16)]));
      const files = [...document.fonts].filter((f) => f.status === 'loaded').flatMap((f) => faces
        .filter((x) => x.family === f.family.replace(/['"]/g, '') && x.weight === f.weight)
        .filter((x) => JSON.stringify(x.ranges) === ranges(f.unicodeRange))
        .map((x) => x.path));
      return [...new Set(files)].sort();
    })()`);
  }

  /**
   * Font files that text on the first screen uses BEFORE ANY SCRIPT RUNS: `path` opened in a fresh page with
   * JavaScript off, in `viewport` (default: the test page's). Each text in the viewport is matched to @font-face by family, weight and
   * the unicode-range of its characters, the way the browser picks a file. The fonts do load there: without them the
   * text wraps differently and a heading can move below the fold. On a deployed site they come from the repo, as in
   * every test (local-assets.ts, RSP-186).
   */
  async firstScreenFontFiles(browser: Browser, path: string, viewport = this.page.viewportSize()): Promise<string[]> {
    const context = await browser.newContext({
      baseURL: new URL(this.page.url()).origin,
      viewport,
      javaScriptEnabled: false,
    });
    try {
      const page = await context.newPage();
      const origin = new URL(this.page.url()).origin;
      if (resolveTarget(process.env).name !== 'local') await serveAssetsFromRepo(page, origin);
      await page.goto(path);
      await page.evaluate(() => document.fonts.ready.then(() => undefined));
      return await page.evaluate(`(() => {
        const faces = (${fontFaces.toString()})();
        const used = new Set();
        const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let node; (node = walker.nextNode()); ) {
          if (!node.textContent.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          const onScreen = [...range.getClientRects()].some((b) => b.width && b.height && b.top < innerHeight &&
            b.bottom > 0 && b.left < innerWidth && b.right > 0);
          const style = getComputedStyle(node.parentElement);
          if (!onScreen || style.visibility === 'hidden' || Number(style.opacity) === 0) continue;
          const family = style.fontFamily.split(',')[0].trim().replace(/['"]/g, '');
          const codes = [...new Set([...node.textContent].map((c) => c.codePointAt(0)))];
          for (const f of faces)
            if (f.family === family && f.weight === style.fontWeight &&
                codes.some((cp) => f.ranges.some(([a, b]) => cp >= a && cp <= b))) used.add(f.path);
        }
        return [...used].sort();
      })()`);
    } finally {
      await context.close();
    }
  }
}
