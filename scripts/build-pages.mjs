// Page build (RSP-90, URL scheme RSP-138, home page RSP-156): copies site/ to dist/ and writes, per language,
// the home page at /<lang>/, the app at /<lang>/http/ and one static page per creature at /<lang>/http/<code>/. Language-less URLs
// (/, /http/, /http/<code>/) go to the visitor's language through small chooser pages at those paths (the same
// file on Netlify and in a local run); no server-side language redirect (RSP-183).
// Netlify runs the build before every deploy (netlify.toml) and publishes dist/.
// Texts and data come from the same files the app uses (site/data, site/i18n, site/js/render.js),
// so a text changed for the app changes on the pages too.
//
// Run locally: npm run build, then npx serve dist (npm test does both by itself).
// dist/ is generated: never edit it, never commit it.
import { cp, rm, mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { D, BY } from '../site/data/cards.js';
import { CLS } from '../site/data/classes.js';
import { CONF, PAIRS } from '../site/data/traps.js';
import { NEWS } from '../site/data/news.js';
import { LOCALES, LANG_NAMES } from '../site/i18n/index.js';
import en from '../site/i18n/en.js';
import { fill } from '../site/i18n/fill.js';
import {
  cardBody,
  cardLinks,
  esc,
  homeUrl,
  langMenu,
  siteHeader,
  siteFooter,
  APP_LANG_MENU,
} from '../site/js/render.js';
import { cls, art } from '../site/js/util.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SITE = path.join(ROOT, 'site');
const DIST = path.join(ROOT, 'dist');
// Footer copyright (RSP-139): the first year, and the build year once it's later: "© 2026", then "© 2026–2027".
const FIRST_YEAR = 2026;
const BUILD_YEAR = new Date().getFullYear();
const COPY = `© ${BUILD_YEAR > FIRST_YEAR ? `${FIRST_YEAR}–${BUILD_YEAR}` : FIRST_YEAR} Mnemozoo`;
const ORIGIN = 'https://mnemozoo.com'; // canonical and hreflang links always name production
const LANGS = Object.keys(LOCALES);
// The app template (RSP-138): written per language, never served as is.
const APP = await readFile(path.join(SITE, 'app.html'), 'utf8');
// Font preloads (RSP-188): exactly the files the first screen shows BEFORE ANY SCRIPT RUNS, per page type and
// language, so the browser starts them with the HTML instead of finding them only in the CSS. Fonts that only the
// script's content uses (the app's collection) are left to the CSS: preloading them too made the CSS arrive later
// and First Contentful Paint worse (local Lighthouse, RSP-188 "Scope change").
// Measured 2026-11-12 in Chrome with JavaScript off (phone 390×844 and desktop 1280×800, all 23 card pages): text
// in the viewport, matched to @font-face by family, weight and unicode-range. A file is listed when the first screen
// uses it on either size and every page of that type downloads it (a preload the page never uses is wasted
// bandwidth and a console warning). Atkinson has no Cyrillic: Ukrainian body text uses the system font.
// tests/ui/preloads.spec.ts measures the same way: when a CSS or text change moves a font, it fails and names the
// files to add or remove here.
const FONT_DIRS = {
  atkinson: 'atkinson-hyperlegible-next-5.3.0',
  bitter: 'bitter-5.3.0',
  jetbrains: 'jetbrains-mono-5.3.0',
};
const FONT_NAMES = { atkinson: 'atkinson-hyperlegible-next', bitter: 'bitter', jetbrains: 'jetbrains-mono' };
/** fontFile('bitter latin-ext 800') → '/fonts/bitter-5.3.0/bitter-latin-ext-800-normal.woff2' */
const fontFile = (spec) => {
  const [family, subset, weight] = spec.split(' ');
  return `/fonts/${FONT_DIRS[family]}/${FONT_NAMES[family]}-${subset}-${weight}-normal.woff2`;
};
// Pages built as HTML (home, card, 404): body text 400 and 700, headings (Bitter 800 and 700), codes (JetBrains Mono).
const PAGE_FONTS = [
  'atkinson latin 400',
  'atkinson latin 700',
  'bitter latin 700',
  'bitter latin 800',
  'jetbrains latin 800',
];
// The app before its script: the site header and footer, and the rubric name "Responsters".
const APP_FONTS = ['atkinson latin 400', 'atkinson latin 700', 'bitter latin 800'];
const NEWS_FONTS = ['atkinson latin 400', 'atkinson latin 700', 'bitter latin 700', 'bitter latin 800'];
const ATKINSON_EXT = ['atkinson latin-ext 400', 'atkinson latin-ext 700']; // ą ę ł ś ž ė ų … in body text (pl, lt)
const FIRST_SCREEN_FONTS = {
  home: {
    uk: [...PAGE_FONTS, 'bitter cyrillic 700', 'bitter cyrillic 800'],
    pl: [...PAGE_FONTS, ...ATKINSON_EXT, 'bitter latin-ext 700', 'bitter latin-ext 800'],
    lt: [...PAGE_FONTS, ...ATKINSON_EXT, 'bitter latin-ext 700', 'bitter latin-ext 800'],
    et: [...PAGE_FONTS, 'atkinson latin-ext 400'],
  },
  app: {
    pl: [...APP_FONTS, 'atkinson latin-ext 400'],
    lt: [...APP_FONTS, ...ATKINSON_EXT],
  },
  creature: {
    uk: [...PAGE_FONTS, 'bitter cyrillic 800'],
    pl: [...PAGE_FONTS, ...ATKINSON_EXT, 'bitter latin-ext 800'],
    lt: [...PAGE_FONTS, ...ATKINSON_EXT, 'bitter latin-ext 800'],
  },
  // "What's new" (RSP-145): no codes (no JetBrains Mono); headings in Bitter 800 (h1) and 700 (entries).
  news: {
    uk: [...NEWS_FONTS, 'bitter cyrillic 700', 'bitter cyrillic 800'],
    pl: [...NEWS_FONTS, ...ATKINSON_EXT, 'bitter latin-ext 700'],
    lt: [...NEWS_FONTS, ...ATKINSON_EXT, 'bitter latin-ext 700'],
  },
  'not-found': {
    uk: [...PAGE_FONTS, 'bitter cyrillic 800'],
    pl: [...PAGE_FONTS, ...ATKINSON_EXT],
    lt: [...PAGE_FONTS, ...ATKINSON_EXT, 'bitter latin-ext 800'],
  },
};
// One card page needs more than its language's list: the Estonian 503 text has a š in the first screen's body text
// (wider screens only; the page loads the file on every screen).
const CARD_FONTS = { et: { 503: ['atkinson latin-ext 400'] } };
// Every page type × language not listed above uses its type's common set.
const firstScreenFonts = (type, lang, code) =>
  [
    ...(FIRST_SCREEN_FONTS[type][lang] || { app: APP_FONTS, news: NEWS_FONTS }[type] || PAGE_FONTS),
    ...((type === 'creature' && CARD_FONTS[lang]?.[code]) || []),
  ].map(fontFile);

/**
 * Module preloads (RSP-188): every module the page's entry script imports, at any depth, so they all start with
 * the HTML instead of one import level at a time (app.js → chrome.js → render.js → data/links.js). Read from the
 * import statements, so a new import is preloaded without touching this file. The entry script itself is already
 * in the HTML (<script type="module" src>).
 */
async function moduleGraph(entry) {
  const found = new Set();
  const queue = [entry];
  while (queue.length) {
    const url = queue.shift();
    const source = await readFile(path.join(SITE, url), 'utf8');
    // Static imports only: `import x from '…'`, `import { a, b } from '…'` (may span lines), `import '…'`.
    for (const [, spec] of source.matchAll(/^import\s+(?:[\w*\s{},]+?\s+from\s+)?'([^']+)';/gm)) {
      const dep = new URL(spec, `https://site${url}`).pathname;
      if (found.has(dep)) continue;
      found.add(dep);
      queue.push(dep);
    }
  }
  return [...found].sort();
}
const MODULES = { app: await moduleGraph('/js/app.js'), site: await moduleGraph('/js/site.js') };

/**
 * The preload links of one page. The app also loads its language file (state.js imports it on start, after
 * all the modules above have run), so that one is preloaded too; the other pages load no language file.
 */
function preloads(type, lang, code) {
  const modules = type === 'app' ? [...new Set([...MODULES.app, `/i18n/${lang}.js`])] : MODULES.site;
  return firstScreenFonts(type, lang, code)
    .map((f) => `<link rel="preload" href="${f}" as="font" type="font/woff2" crossorigin />`)
    .concat(modules.map((m) => `<link rel="modulepreload" href="${m}" />`))
    .join('\n    ');
}

// One stylesheet per page type (RSP-160): the build joins the source files of site/css/, in this order, into
// dist/css/page-<type>.css, so a page waits for one CSS request instead of up to eight. The app's list is the
// styles block of the app template, so site/app.html stays readable on its own.
const STYLES = {
  app: [...APP.match(/<!-- styles [\s\S]*?<!-- \/styles -->/)[0].matchAll(/href="\/css\/([\w-]+)\.css"/g)].map(
    (m) => m[1],
  ),
  creature: ['fonts', 'base', 'site', 'card', 'detail'],
  home: ['fonts', 'base', 'site', 'home'],
  'not-found': ['fonts', 'base', 'site', 'card'],
  news: ['fonts', 'base', 'site', 'news'],
};
const styles = (type) => `<link rel="stylesheet" href="/css/page-${type}.css" />`;
// WebSite structured data on every home page (RSP-156 AC17): Google shows the site name "Mnemozoo" above the URL
// in search results, so rubric pages can keep their own name in the title ("Responsters: …").
const WEBSITE = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: 'Mnemozoo',
  url: `${ORIGIN}/`,
});

// Cloudflare Web Analytics (RSP-175): cookieless visit counts. The domain is on Cloudflare DNS only, so Cloudflare
// can't add the beacon itself: every page a visitor stays on carries it here, once, right after the viewport meta.
// The token counts any page that sends it, whatever the host, so the beacon loads only on the production domain:
// deploy previews, local runs, tests and Lighthouse measurements stay out of the stats. A script added this way
// loads async, after the page: no effect on the first render. Chooser pages (they redirect at once) have none.
// UI tests also block the beacon's hosts (tests/fixtures/analytics.ts), in case a run targets production.
const ANALYTICS_HOST = 'mnemozoo.com';
const ANALYTICS_TOKEN = '0b35d40b48384f0eac7566c199b949a6'; // public: it is in every page's source anyway
const BEACON = `<script data-analytics="cloudflare">
      if (location.hostname === '${ANALYTICS_HOST}') {
        const beacon = document.createElement('script');
        beacon.src = 'https://static.cloudflareinsights.com/beacon.min.js';
        beacon.dataset.cfBeacon = '{"token": "${ANALYTICS_TOKEN}"}';
        document.head.append(beacon);
      }
    </script>`;

/** Path of the app, e.g. appUrl('uk') → '/uk/http/'; appUrl(null) → '/http/', the language-less one. */
const appUrl = (lang) => (lang ? `/${lang}` : '') + '/http/';
/** Path of the home page; the language-less one is the site root: homeOrRoot('uk') → '/uk/', homeOrRoot(null) → '/'. */
const homeOrRoot = (lang) => (lang ? homeUrl(lang) : '/');
/** Path of the "What's new" page (RSP-145), e.g. newsUrl('uk') → '/uk/news/'; newsUrl(null) → '/news/'. */
const newsUrl = (lang) => (lang ? `/${lang}` : '') + '/news/';
/** Path of a creature page, e.g. creatureUrl('uk', 401) → '/uk/http/401/'. */
const creatureUrl = (lang, c) => `${appUrl(lang)}${c}/`;

/**
 * hreflang links of one page in every language. x-default names the language-less URL,
 * which sends each visitor to their own language.
 */
const alternates = (url) =>
  LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN}${url(l)}" />`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}${url(null)}" />`)
    .join('\n    ');

/** One creature page in one language. */
function creaturePage(lang, tx, d) {
  const c = d.c;
  const L = tx.cards[c];
  const ui = tx.ui;
  const title = `${c} ${d.s}: ${d.n}`;
  // Language menu: the same pill and list as in the app (RSP-109), built on <details> so it works without JS.
  const menu = langMenu(lang, (l) => creatureUrl(l, c), LANG_NAMES, ui.lang);
  const qa = (tx.qa[c] || []).map((x) => `<li>${esc(x)}</li>`).join('');
  const links = cardLinks(c, lang, tx.tools)
    .map((x) => `<li><a href="${x.u}" target="_blank" rel="noopener">${esc(x.label)} ↗</a></li>`)
    .join('');
  const conf = (CONF[c] || []).map((x) => `<a href="${creatureUrl(lang, x)}">${x} ${BY[x].n}</a>`).join('');

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    ${BEACON}
    <title>${esc(title)} · Responsters</title>
    <meta name="description" content="${esc(`${title}. ${L.mean}`)}" />
    <link rel="canonical" href="${ORIGIN}${creatureUrl(lang, c)}" />
    ${alternates((l) => creatureUrl(l, c))}
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ${styles('creature')}
    ${preloads('creature', lang, c)}
    <script type="module" src="/js/site.js"></script>
  </head>
  <body>
    <div class="wrap" id="top">
      ${siteHeader(lang, tx.site, menu)}
      <main class="page" data-testid="card-page">
        <a class="page-back" href="${appUrl(lang)}#collection">← ${esc(ui.back)}</a>
        <article class="sheet" style="--cls: ${CLS[cls(c)].c}">
          <div class="in page-grid">
            <h1 class="sr">${esc(title)}</h1>
            <div class="page-card"><div class="card cf-static">${cardBody(d, L.line, L.art)}</div></div>
            <div class="page-main">
              <h2>${esc(ui.mean)}</h2>
              <p>${esc(L.mean)}</p>
              <h2>${esc(ui.when)}</h2>
              <p>${esc(L.when)}</p>
              <h2>${esc(ui.qa)}</h2>
              <ul class="qa">${qa}</ul>
            </div>
            <aside class="page-side">
              <h2>${esc(ui.links)}</h2>
              <ul class="links">${links}</ul>${
                conf
                  ? `
              <h2>${esc(ui.conf)}</h2>
              <div class="mini">${conf}</div>`
                  : ''
              }
            </aside>
          </div>
          <div class="page-bottom">
            <a class="back" href="${appUrl(lang)}#collection">← ${esc(ui.back)}</a>
            <a class="back" href="#top">↑ ${esc(ui.top)}</a>
          </div>
        </article>
      </main>
      ${siteFooter(lang, tx.site, COPY, `${ORIGIN}${creatureUrl(lang, c)}`)}
    </div>
  </body>
</html>
`;
}

/** The creatures in the hero of the home page (RSP-156 AC2): one from each status class, so all five colours show. */
const HERO = [102, 201, 304, 418, 502];

/** What each "How it works" step shows (RSP-172 AC3): meet a creature, picture → code, codes that look alike.
 * Decoration only: the step text carries the meaning, so the block is aria-hidden and the pictures have empty alt. */
const stepImg = (c) => `<img src="${art(c)}" alt="" width="640" height="573" loading="lazy" />`;
const chip = (text) => `<span class="step-chip" data-testid="step-chip">${text}</span>`;
const STEP_ART = [
  stepImg(418),
  `${stepImg(304)}<span class="step-sign">→</span>${chip('304 ✓')}`,
  `${chip('502')}<span class="step-sign">≠</span>${chip('504')}`,
];

/** Home page /<lang>/ (RSP-156): what the zoo is, what is open and who builds it. Texts: i18n `home`, `site`. */
function homePage(lang, tx) {
  const h = tx.home;
  const app = appUrl(lang);
  const hero = HERO.map(
    (c) => `<figure class="hero-card" data-testid="hero-card-${c}">
            <img src="${art(c)}" alt="${esc(tx.cards[c].art)}" width="640" height="573" />
            <figcaption>${c}</figcaption>
          </figure>`,
  ).join('\n          ');
  const steps = h.steps
    .map(
      ([title, text], i) => `<li class="path-step home-step">
            <span class="path-mark" aria-hidden="true" data-testid="step-marker">${i + 1}</span>
            <div class="step-art" aria-hidden="true" data-testid="step-art">${STEP_ART[i]}</div>
            <h3>${esc(title)}</h3>
            <p>${esc(text)}</p>
          </li>`,
    )
    .join('\n          ');
  const why = h.why.map((p) => `<p>${esc(p)}</p>`).join('\n          ');

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    ${BEACON}
    <title>${esc(h.title)}</title>
    <meta name="description" content="${esc(h.description)}" />
    <link rel="canonical" href="${ORIGIN}${homeUrl(lang)}" />
    ${alternates(homeOrRoot)}
    <script type="application/ld+json">${WEBSITE}</script>
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ${styles('home')}
    ${preloads('home', lang)}
    <script type="module" src="/js/site.js"></script>
  </head>
  <body>
    <div class="wrap">
    ${siteHeader(lang, tx.site, langMenu(lang, homeUrl, LANG_NAMES, tx.ui.lang), true)}
    <main class="home" data-testid="home-page">
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-text">
          <p class="sign sign-open home-kicker" data-testid="home-kicker">${esc(h.kicker)}</p>
          <h1 id="home-title">${esc(h.h1)}</h1>
          <p class="home-lead">${esc(h.lead)}</p>
        </div>
        <div class="home-hero-cards" data-testid="home-hero">
          ${hero}
        </div>
      </section>

      <section id="map" class="home-map" aria-labelledby="map-title" data-testid="zoo-map">
        <h2 id="map-title">${esc(h.mapTitle)}</h2>
        <ul class="enclosures">
          <li class="enclosure enclosure-wide" style="--stripe: var(--c5)">
            <a href="${app}#collection" data-testid="enclosure-http">
              <span class="enclosure-top"><span class="sign sign-open" data-testid="sign-http">${esc(h.httpSign)}</span></span>
              <span class="enclosure-name">${esc(h.httpName)}</span>
              <span>${esc(h.httpText(D.length, D[0].c, D[D.length - 1].c))}</span>
              <span class="enclosure-go">${esc(h.enter)}</span>
            </a>
          </li>
          <li class="enclosure enclosure-soon" style="--stripe: var(--c4)" data-testid="enclosure-git">
            <span class="enclosure-top"><span class="sign sign-notice" data-testid="sign-git">${esc(h.gitSign)}</span></span>
            <span class="enclosure-name">Git</span>
            <span>${esc(h.gitText)}</span>
          </li>
        </ul>
        <div class="pavilions">
          <ul class="pavilion-list">
            <li class="pavilion">
              <a href="${app}#traps" data-testid="pavilion-traps">
                <span class="sign" data-testid="sign-pavilion">${esc(h.pavilionSign)}</span>
                <span class="pavilion-name">${esc(h.pairsName)}</span>
                <span>${esc(h.pairsText)}</span>
                <span class="enclosure-go">${esc(h.pairsLink(PAIRS.length))}</span>
              </a>
            </li>
          </ul>
        </div>
      </section>

      <section id="how" class="home-how" aria-labelledby="how-title">
        <h2 id="how-title">${esc(h.howTitle)}</h2>
        <ol class="path-steps path-steps-row home-steps" role="list" data-testid="home-steps">
          ${steps}
        </ol>
      </section>

      <section id="about" class="home-about" aria-labelledby="why-title">
        <div class="home-why">
          <h2 id="why-title">${esc(h.whyTitle)}</h2>
          ${why}
        </div>
        <div class="home-author" data-testid="home-about">
          <h2>${esc(h.aboutTitle)}</h2>
          <p>${esc(h.aboutText)}</p>
        </div>
      </section>
    </main>
    ${siteFooter(lang, tx.site, COPY, `${ORIGIN}${homeUrl(lang)}`)}
    </div>
  </body>
</html>
`;
}

/**
 * "What's new" page (RSP-145), one per language: release notes for visitors, newest first (data/news.js). An entry's
 * date is a month until the release day ('2026-11' → "November 2026"), then a day; formatted in the page language.
 */
function newsPage(lang, tx) {
  const n = tx.news;
  const date = (d) => {
    const [y, m, day] = d.split('-').map(Number);
    const opts = day ? { day: 'numeric', month: 'long', year: 'numeric' } : { month: 'long', year: 'numeric' };
    return new Intl.DateTimeFormat(lang, { ...opts, timeZone: 'UTC' }).format(new Date(Date.UTC(y, m - 1, day || 1)));
  };
  const entries = NEWS.map((e) => {
    const t = n.entries[e.id];
    const items = t.items
      .map(
        (text, i) =>
          `<li><span class="news-kind news-kind-${e.kinds[i]}">${esc(n.kinds[e.kinds[i]])}</span>${esc(text)}</li>`,
      )
      .join('\n              ');
    return `<li class="news-entry" data-testid="news-entry-${e.id}">
            <time class="news-date" datetime="${e.date}">${esc(date(e.date))}</time>
            <div>
              <h2>${esc(t.title)}</h2>
              <p>${esc(t.line)}</p>
              <ul class="news-items">
              ${items}
              </ul>
            </div>
          </li>`;
  }).join('\n          ');
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    ${BEACON}
    <title>${esc(n.title)}</title>
    <meta name="description" content="${esc(n.lead)}" />
    <link rel="canonical" href="${ORIGIN}${newsUrl(lang)}" />
    ${alternates(newsUrl)}
    <link rel="icon" href="/favicon.png" type="image/png" />
    ${styles('news')}
    ${preloads('news', lang)}
    <script type="module" src="/js/site.js"></script>
  </head>
  <body>
    <div class="wrap">
    ${siteHeader(lang, tx.site, langMenu(lang, newsUrl, LANG_NAMES, tx.ui.lang))}
    <main class="news" data-testid="news-page">
      <h1>${esc(n.h1)}</h1>
      <p class="news-lead">${esc(n.lead)}</p>
      <ol class="news-list" role="list">
          ${entries}
      </ol>
    </main>
    ${siteFooter(lang, tx.site, COPY, `${ORIGIN}${newsUrl(lang)}`)}
    </div>
  </body>
</html>
`;
}

/**
 * Page for a missing address (RSP-148), one per language: dist/<lang>/404.html, and dist/404.html in English.
 * Netlify serves it with status 404 (dist/_redirects picks the language). Bots ask for missing paths thousands of
 * times, so the HTML stays small (AC6, under 10 KB): no inline images, the creature picture loads lazily.
 * The language menu links to the home page in each language; site.js turns them into the same address in the other
 * language (/uk/foo → /pl/foo), so the menu works as on every other page (Maryna, 2026-11-06).
 */
function notFoundPage(lang, tx) {
  const t = tx.notFound;
  const d = BY[404];
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    ${BEACON}
    <meta name="robots" content="noindex" />
    <title>${esc(t.title)}</title>
    <link rel="icon" href="/favicon.png" type="image/png" />
    ${styles('not-found')}
    ${preloads('not-found', lang)}
    <script type="module" src="/js/site.js"></script>
  </head>
  <body>
    <div class="wrap">
    ${siteHeader(lang, tx.site, langMenu(lang, homeUrl, LANG_NAMES, tx.ui.lang))}
    <main class="not-found" data-testid="not-found-page">
      <div class="not-found-text">
        <h1>${esc(t.h1)}</h1>
        <p>${esc(t.text)}</p>
        <a class="not-found-back" href="${homeUrl(lang)}" data-testid="not-found-back">${esc(t.back)}</a>
      </div>
      <div class="not-found-card"><div class="card cf-static" data-testid="card-404">${cardBody(d, tx.cards[404].line, tx.cards[404].art)}</div></div>
    </main>
    ${siteFooter(lang, tx.site, COPY)}
    </div>
  </body>
</html>
`;
}

/** The app in one language: the template with lang, title, description, canonical and hreflang filled in. */
function appPage(lang, tx) {
  const fills = [
    [/<!-- App template[\s\S]*?-->\n/, ''], // the note is for people reading the source, not for visitors
    [/<html lang="[^"]*">/, `<html lang="${lang}">`],
    [/<!-- styles [\s\S]*?<!-- \/styles -->/, styles('app')],
    [/<!-- build: preloads [\s\S]*?-->/, preloads('app', lang)],
    [/<title>[^<]*<\/title>/, `<title>${esc(tx.ui.appTitle)}</title>`],
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(tx.ui.tag)}" />`],
    [
      '<!-- build: canonical and hreflang -->',
      `<link rel="canonical" href="${ORIGIN}${appUrl(lang)}" />\n    ${alternates(appUrl)}`,
    ],
    // RSP-155: the same site header and footer as on every page; in the header, the app's own JS language menu.
    ['<!-- build: site header -->', siteHeader(lang, tx.site, APP_LANG_MENU)],
    ['<!-- build: site footer -->', siteFooter(lang, tx.site, COPY, `${ORIGIN}${appUrl(lang)}`)],
    ['<!-- build: analytics -->', BEACON],
  ];
  return fills.reduce((html, [from, to]) => {
    if (!html.match(from)) throw new Error(`build-pages: site/app.html has no ${from}`);
    return html.replace(from, to);
  }, APP);
}

/**
 * Chooser page at a language-less path. Locally it answers every visitor (npx serve dist knows no redirects);
 * on Netlify only the visitors whose first browser language isn't one of ours (see redirects()).
 * It sends the visitor on to `/<lang><rest>` with the same hash; without JavaScript it lists the languages.
 * / leads to the home page /<lang>/; old links like /#traps go on from there to /<lang>/http/#traps (js/site.js).
 */
function chooserPage(rest) {
  const links = LANGS.map(
    (l) => `<li><a href="/${l}${rest}" lang="${l}" hreflang="${l}">${LANG_NAMES[l][0]}</a></li>`,
  ).join('');
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Mnemozoo</title>
    <script type="module">
      import { pickLang } from '/js/lang.js';
      location.replace('/' + pickLang() + ${JSON.stringify(rest)} + location.search + location.hash);
    </script>
  </head>
  <body>
    <main>
      <ul>${links}</ul>
    </main>
  </body>
</html>
`;
}

/**
 * dist/_redirects (RSP-138, RSP-183). Language-less URLs (/, /http/, /http/<code>/) are NOT redirected here: the chooser
 * page at the same path picks the language in the browser (pickLang: saved choice, nf_lang cookie, the whole browser
 * list, then English), on Netlify the same as in a local run.
 * Why not Netlify's `Language=` rules (used until RSP-183): Netlify's edge answers two requests for the same URL with
 * the same Accept-Language that arrive together with ONE redirect, whatever their nf_lang cookie (deploy preview
 * #40, 2026-11-11: 6 wrong answers of 20). A chooser page is the same file for everyone, so that can't go wrong.
 * The same goes for a missing address without a language: Netlify's default dist/404.html, in English (Maryna: in
 * every unknown case, English). A missing address with a language gets the 404 page in that language (RSP-148).
 */
function redirects() {
  const notFound = LANGS.map((l) => `/${l}/*  /${l}/404.html  404`);
  // Netlify reads dist/_redirects BEFORE the [[redirects]] in netlify.toml, so the catch-all 404 rules above would hide
  // them. They live here, first (found by Copilot code review, PR #31): the old Netlify address goes to the own domain
  // (RSP-136); scanners asking for /security.txt go to the file (RSP-137, RFC 9116).
  const first = [
    'https://responsters.netlify.app/*  https://mnemozoo.com/:splat  301!',
    '/security.txt  /.well-known/security.txt  301!',
  ];
  const rules = first.concat(notFound);
  // RSP-183: no rule may depend on the visitor's language or cookie (Language=, Cookie=), see above.
  const bad = rules.filter((r) => /\b(Language|Cookie)=/.test(r));
  if (bad.length) throw new Error(`_redirects: no Language=/Cookie= rules (RSP-183): ${bad.join(' | ')}`);
  return `# Generated by scripts/build-pages.mjs (RSP-138, RSP-148, RSP-183): never edit dist/, change the build.\n${rules.join('\n')}\n`;
}

/** sitemap.xml: the home page, the app, "What's new" and every creature page in every language, each with its hreflang alternates. */
function sitemap(today) {
  const groups = [homeOrRoot, appUrl, newsUrl].concat(D.map((d) => (l) => creatureUrl(l, d.c)));
  const alt = (url) =>
    LANGS.map((l) => `    <xhtml:link rel="alternate" hreflang="${l}" href="${ORIGIN}${url(l)}" />`)
      .concat(`    <xhtml:link rel="alternate" hreflang="x-default" href="${ORIGIN}${url(null)}" />`)
      .join('\n');
  const entries = groups.flatMap((url) =>
    LANGS.map(
      (l) => `  <url>\n    <loc>${ORIGIN}${url(l)}</loc>\n    <lastmod>${today}</lastmod>\n${alt(url)}\n  </url>`,
    ),
  );
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${entries.join('\n')}
</urlset>
`;
}

/** Write one page to dist/<url>index.html. */
async function page(url, html) {
  const dir = path.join(DIST, url);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, 'index.html'), html);
}

/** Writes dist/css/page-<type>.css for every page type in STYLES (RSP-160). */
async function writeStyles() {
  for (const [type, files] of Object.entries(STYLES)) {
    const parts = await Promise.all(
      files.map(async (f) => `/* ${f}.css */\n${await readFile(path.join(SITE, 'css', `${f}.css`), 'utf8')}`),
    );
    await writeFile(path.join(DIST, 'css', `page-${type}.css`), parts.join('\n'));
  }
}

/**
 * RSP-175 AC4: every page a visitor stays on has the analytics beacon exactly once, a chooser page none.
 * Counted in the written files, so a template change that drops or doubles it stops the build.
 */
async function checkBeacons() {
  const count = async (file) =>
    (await readFile(path.join(DIST, file), 'utf8')).split('data-analytics="cloudflare"').length - 1;
  const stay = LANGS.flatMap((l) => [
    `${l}/index.html`,
    `${l}/404.html`,
    `${appUrl(l).slice(1)}index.html`,
    ...D.map((d) => `${creatureUrl(l, d.c).slice(1)}index.html`),
  ]).concat('404.html');
  const choosers = [
    'index.html',
    `${appUrl(null).slice(1)}index.html`,
    ...D.map((d) => `${creatureUrl(null, d.c).slice(1)}index.html`),
  ];
  for (const file of stay)
    if ((await count(file)) !== 1)
      throw new Error(`build-pages: ${file} has the analytics beacon ${await count(file)} times, not once`);
  for (const file of choosers)
    if ((await count(file)) !== 0) throw new Error(`build-pages: chooser page ${file} has the analytics beacon`);
}

async function build() {
  await rm(DIST, { recursive: true, force: true });
  await cp(SITE, DIST, { recursive: true });
  await rm(path.join(DIST, 'app.html')); // the template is not a page
  await writeStyles();
  // A preload of a file that isn't there would be a 404 on every page view: stop the build instead.
  for (const type of Object.keys(FIRST_SCREEN_FONTS))
    for (const lang of LANGS)
      for (const f of [
        ...firstScreenFonts(type, lang),
        ...Object.keys(CARD_FONTS[lang] || {}).flatMap((code) => firstScreenFonts('creature', lang, Number(code))),
        ...(type === 'app' ? [`/i18n/${lang}.js`] : []),
      ])
        await readFile(path.join(DIST, f)).catch(() => {
          throw new Error(`build-pages: preload of a missing file ${f} (${type}, ${lang})`);
        });

  let pages = 0;
  for (const lang of LANGS) {
    const tx = lang === 'en' ? en : fill((await LOCALES[lang]()).default, en, '', lang);
    await page(homeUrl(lang), homePage(lang, tx));
    await writeFile(path.join(DIST, lang, '404.html'), notFoundPage(lang, tx));
    if (lang === 'en') await writeFile(path.join(DIST, '404.html'), notFoundPage(lang, tx)); // Netlify's default
    await page(appUrl(lang), appPage(lang, tx));
    await page(newsUrl(lang), newsPage(lang, tx));
    for (const d of D) {
      await page(creatureUrl(lang, d.c), creaturePage(lang, tx, d));
      pages++;
    }
  }
  for (const rest of [appUrl(null), newsUrl(null)].concat(D.map((d) => creatureUrl(null, d.c))))
    await page(rest, chooserPage(rest));
  await page('/', chooserPage('/'));
  await writeFile(path.join(DIST, '_redirects'), redirects());
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(new Date().toISOString().slice(0, 10)));
  await checkBeacons();
  console.log(
    `build-pages: ${LANGS.length} home pages + ${LANGS.length} app pages + ${LANGS.length} news pages + ${pages} creature pages (${LANGS.length} languages × ${D.length} cards), chooser pages, _redirects → dist/`,
  );
}

await build();
