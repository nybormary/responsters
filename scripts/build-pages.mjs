// Page build (RSP-90, URL scheme RSP-138, home page RSP-156): copies site/ to dist/ and writes, per language,
// the home page at /<lang>/, the app at /<lang>/http/, one static page per creature at /<lang>/http/<code>/ and one per
// git card at /<lang>/git/<id>/ (RSP-199). Language-less URLs (/, /http/, /http/<code>/, /git/<id>/) show the English
// page itself, with a hint to open the visitor's language (RSP-216): no redirect at all, so nothing flashes. The same
// file on Netlify and in a local run; no server-side language redirect (RSP-183).
// Netlify runs the build before every deploy (netlify.toml) and publishes dist/.
// Texts and data come from the same files the app uses (site/data, site/i18n, site/js/render.js),
// so a text changed for the app changes on the pages too.
//
// Run locally: npm run build, then npx serve dist (npm test does both by itself).
// dist/ is generated: never edit it, never commit it.
import { cp, rm, mkdir, writeFile, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { D, BY } from '../site/data/http/cards.js';
import { CLS } from '../site/data/http/classes.js';
import { CONF, PAIRS } from '../site/data/http/traps.js';
import { NEWS } from '../site/data/news.js';
import { GIT, EGG, WALL, TILT } from '../site/data/git/cards.js';
import { GROUPS } from '../site/data/git/groups.js';
import { gitCardBody, gitMain, gitSide, groupIcon, inline } from '../site/js/gitcard.js';
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
import { cls, art, addDays, dayMonth } from '../site/js/util.js';

// The Git trademark line (git-scm.com/about/trademark, checked 2026-11-21): as the policy words it, in English on every
// page, under the logo credit in "About"; the intro above the advent wall marks the first prominent "Git™".
const TRADEMARK =
  'Git and the Git logo are either registered trademarks or trademarks of Software Freedom Conservancy, Inc., corporate home of the Git Project, in the United States and/or other countries.';
const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SITE = path.join(ROOT, 'site');
// BUILD_OUT=<folder> writes the build elsewhere (the noindex test builds several dates without touching dist/, RSP-199).
const DIST = process.env.BUILD_OUT ? path.resolve(process.env.BUILD_OUT) : path.join(ROOT, 'dist');
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
 * the HTML instead of one import level at a time (app.js → chrome.js → render.js → data/http/links.js). Read from the
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
  git: ['fonts', 'base', 'site', 'card', 'detail', 'git'],
  wall: ['fonts', 'base', 'site', 'advent'],
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
/** Path of the git rubric (the advent wall, RSP-195), e.g. gitHome('uk') → '/uk/git/'. */
const gitHome = (lang) => (lang ? `/${lang}` : '') + '/git/';
/** Path of a git card page, e.g. gitUrl('uk', 'stash') → '/uk/git/stash/'; gitUrl(null, 'stash') → '/git/stash/'. */
const gitUrl = (lang, id) => `${gitHome(lang)}${id}/`;

// Git card pages are hidden from search until their advent day (RSP-199 AC3, AC4 decided 2026-11-15): the build
// compares each card's day with the build date (Copenhagen time). A day already reached → indexed and in the
// sitemap; a later day → noindex, not in the sitemap. BUILD_DATE=YYYY-MM-DD pins the date (tests, a rebuild of an old
// state).
// The advent start is a setting (RSP-196 comment 10499, decided 2026-11-16): ADVENT_START=YYYY-MM-DD is day 1, day N
// opens N−1 days later. Default 1 December 2026; Netlify deploy previews build with 1 November (netlify.toml), so the
// wall can be clicked through before the season. The build only writes the state on its own date (the fallback
// without JS and what search engines see); in the browser the wall and the home page's Git enclosure decide by the
// visitor's own date (js/advent.js), so no deploy is needed on the day a door opens.
const BUILD_DATE =
  process.env.BUILD_DATE || new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/Copenhagen' }).format(new Date());
const ADVENT_START = process.env.ADVENT_START || '2026-12-01';
for (const [name, value] of [
  ['BUILD_DATE', BUILD_DATE],
  ['ADVENT_START', ADVENT_START],
])
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) throw new Error(`build-pages: ${name}=${value} is not YYYY-MM-DD`);
/** The advent days (25 since init joined on 2026-11-17); cards added after the season have no day. */
const ADVENT_DAYS = GIT.filter((g) => g.day).length;
/** The date a card opens: adventDay(1) is ADVENT_START; a card without a day opens the day after the advent. */
const adventDay = (day) => addDays(ADVENT_START, (day ?? ADVENT_DAYS + 1) - 1);
/** True when the advent has started on the build date (the wall is indexed, the home enclosure is open). */
const adventStarted = BUILD_DATE >= ADVENT_START;
/** The group colour for the page's --cls accent. */
const gitColourVar = (g) => GROUPS[g.group].c || 'var(--line)';
/** True when the card's advent day has been reached on the build date. */
const gitOpen = (g) => BUILD_DATE >= adventDay(g.day);

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

/** One git card page in one language (RSP-199): the HTTP card page layout with the git card and its sections. */
function gitPage(lang, tx, g) {
  const ui = tx.git.ui;
  const t = tx.git.cards[g.id] || {};
  const title = t.title ? `${g.name}: ${t.title}` : g.name;
  const description = (t.does?.text || '').replace(/`/g, '');
  const menu = langMenu(lang, (l) => gitUrl(l, g.id), LANG_NAMES, tx.ui.lang);
  const back = `<a class="back" href="${gitHome(lang)}">← ${esc(ui.back)}</a>`;

  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    ${BEACON}${gitOpen(g) ? '' : '\n    <meta name="robots" content="noindex" />'}
    <title>${esc(title)} · Mnemozoo</title>${description ? `\n    <meta name="description" content="${esc(description)}" />` : ''}
    <link rel="canonical" href="${ORIGIN}${gitUrl(lang, g.id)}" />
    ${alternates((l) => gitUrl(l, g.id))}
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ${styles('git')}
    ${preloads('creature', lang)}
    <script type="module" src="/js/site.js"></script>
  </head>
  <body>
    <div class="wrap" id="top">
      ${siteHeader(lang, tx.site, menu)}
      <main class="page git-page" data-testid="git-card-page">
        <a class="page-back" href="${gitHome(lang)}">← ${esc(ui.back)}</a>
        <article class="sheet" style="--cls: ${gitColourVar(g)}">
          <div class="in page-grid">
            <h1 class="sr">${esc(title)}</h1>
            <div class="page-card"><div class="card cf-static git${g.danger ? ' danger' : ''}" data-testid="git-card">${gitCardBody(g, tx)}</div></div>
            <div class="page-main">
              ${gitMain(g, tx)}
            </div>
            <aside class="page-side">
              ${gitSide(g, tx, (id) => gitUrl(lang, id), lang)}
            </aside>
          </div>
          <div class="page-bottom">
            ${back}
            <a class="back" href="#top">↑ ${esc(tx.ui.top)}</a>
          </div>
        </article>
      </main>
      ${siteFooter(lang, tx.site, COPY, `${ORIGIN}${gitUrl(lang, g.id)}`)}
    </div>
  </body>
</html>
`;
}

// The padlock on a door that can't be opened yet (decoration: the door's label says it).
const LOCK = `<svg class="door-lock" aria-hidden="true" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></svg>`;

/** The command on an open door (RSP-208): "git " in its own span, hidden on phones; ".gitignore" stays whole. */
const doorCmd = (name) =>
  name.startsWith('git ') ? `<span class="door-git">git </span>${esc(name.slice(4))}` : esc(name);

/**
 * The legend above the wall (RSP-208, moved up by Maryna on review): each group's icon on its colour and its name, so the groups can be told apart
 * without colour. Order of git help, as in data/git/groups.js.
 */
const wallLegend = (tx) =>
  `<ul class="wall-legend" aria-label="${esc(tx.git.wall.legend)}" data-testid="advent-legend">${Object.entries(GROUPS)
    .map(
      ([k, gr]) =>
        `<li data-testid="advent-legend-item"><span class="legend-chip" style="background: ${gr.c}">${groupIcon(k, 'legend-gi')}</span>${esc(tx.git.groups[k])}</li>`,
    )
    .join('')}</ul>`;

/**
 * One door of the advent wall (RSP-195). Three states: locked (its day hasn't come: no link, a padlock), paper (can
 * be opened: the number on paper), open (paper torn: picture, command, group colour; the danger frame and "!" only
 * now). The build writes the state on its own date; js/advent.js repaints by the visitor's date and handles the two
 * clicks (1st tears the paper, 2nd follows the link to the card page). Without JS a paper door is a plain link to
 * the card page. The labels for every state travel in data-* so the script needs no language file. role="link" keeps
 * the door a link for assistive tech while it has no href (locked): an <a> without href is a generic element, and
 * aria-label / aria-disabled are not allowed on it (RSP-198, axe aria-prohibited-attr).
 * A door's name holds its visible text in the same order (RSP-198, agreed 2026-11-19): the number comes before the
 * flag in the HTML (the flag sits in the corner by CSS), so "Day 5, today, open the door" contains "5 today". The
 * spaces between the spans matter: axe joins neighbouring spans without one ("5today"); flex items ignore them.
 * An open door has no aria-label: its name comes from its content, the visible number and command plus the words
 * around them as screen-reader text (the language's `open` template split at the number and the command), inside
 * the number's and the command's spans: between flex items a name gets extra spaces ("Day 9 : git restore ,"). On a
 * phone "git " is hidden for the eye only, so the name still says "git restore" while the door shows "restore"
 * (RSP-198, Maryna's choice 2a, 2026-11-19; with an aria-label axe found the name didn't match the visible text).
 * Its place on the wall: the HTML lists the doors by day (the Tab order), the scattered look comes from the grid
 * place of WALL position i, for 5 columns (wide) and 3 (phone): --c5 / --r5 and --c3 / --r3.
 */
function wallDoor(lang, tx, g, i) {
  const w = tx.git.wall;
  const date = adventDay(g.day);
  const when = dayMonth(lang, date);
  const locked = BUILD_DATE < date;
  const pic = g.art || EGG.src;
  const danger = g.danger ? `, ${tx.git.ui.danger}` : '';
  const labels = {
    locked: w.locked(g.day, when),
    today: w.paperToday(g.day),
    missed: w.paperMissed(g.day),
    big: w.bigToday(g.day),
    revealed: w.revealed(g.day, g.name + danger),
  };
  const paperLabel = date === BUILD_DATE ? labels.today : labels.missed;
  const [pre, rest] = w.open('\u0001', '\u0002').split('\u0001');
  const [mid, post] = rest.split('\u0002');
  const sr = (t) => (t ? `<span class="sr-only">${esc(t)}</span>` : '');
  const place = `--tilt: ${TILT[i]}deg; --c5: ${(i % 5) + 1}; --r5: ${Math.floor(i / 5) + 1}; --c3: ${(i % 3) + 1}; --r3: ${Math.floor(i / 3) + 1}`;
  const data = Object.entries(labels)
    .map(([k, v]) => `data-label-${k}="${esc(v)}"`)
    .join(' ');
  return `<li class="slot" style="${place}">
            <a class="door ${locked ? 'locked' : 'paper'}" role="link"${locked ? ' aria-disabled="true"' : ` href="${gitUrl(lang, g.id)}"`} aria-label="${esc(locked ? labels.locked : paperLabel)}" data-testid="advent-door" data-day="${g.day}" data-date="${date}" data-href="${gitUrl(lang, g.id)}"${g.danger ? ' data-danger=""' : ''} ${data}>
              <span class="door-paper" aria-hidden="true"><span class="door-num">${g.day}</span> <span class="door-flag" data-testid="door-flag"></span>${LOCK} <span class="door-hint">${esc(w.todayHint)}</span></span>
              <span class="door-inside"><span class="door-pic"><img src="${pic}" alt="" loading="lazy" width="640" height="573" /><span class="door-warn" aria-hidden="true">!</span></span> <span class="door-cap" style="background: ${gitColourVar(g)}"><span class="door-dn">${sr(pre)}${g.day}${sr(mid)}</span> ${groupIcon(g.group, 'door-gi')} <span class="door-cmd">${doorCmd(g.name)}${sr(post + danger)}</span></span></span>
            </a>
          </li>`;
}

/**
 * The advent wall /<lang>/git/ (RSP-195): a paper-covered door per advent day, scattered. Indexed from the advent start.
 * On a phone, js/advent.js also puts a big copy of today's door above the wall (.today-slot, prototype AdventPhone).
 */
function gitWallPage(lang, tx) {
  const w = tx.git.wall;
  const byDay = new Map(GIT.map((g) => [g.day, g]));
  // by day (the Tab order, RSP-198); each door takes its scattered place from its position in WALL
  const doors = [...byDay.keys()]
    .filter((day) => WALL.includes(day))
    .sort((a, b) => a - b)
    .map((day) => wallDoor(lang, tx, byDay.get(day), WALL.indexOf(day)))
    .join('\n          ');
  const lead = w.lead(dayMonth(lang, ADVENT_START), ADVENT_DAYS);
  const menu = langMenu(lang, gitHome, LANG_NAMES, tx.ui.lang);
  return `<!doctype html>
<html lang="${lang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
    ${BEACON}${adventStarted ? '' : '\n    <meta name="robots" content="noindex" />'}
    <title>${esc(w.title)} · Mnemozoo</title>
    <meta name="description" content="${esc(lead)}" />
    <link rel="canonical" href="${ORIGIN}${gitHome(lang)}" />
    ${alternates(gitHome)}
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ${styles('wall')}
    ${preloads('home', lang)}
    <script type="module" src="/js/site.js"></script>
  </head>
  <body>
    <div class="wrap" id="top">
      ${siteHeader(lang, tx.site, menu)}
      <main class="advent-page" data-testid="advent-page">
        <h1>${esc(w.title)}</h1>
        <p class="advent-lead">${esc(lead)}</p>
        <p class="advent-intro" data-testid="advent-intro">${inline(w.intro)}</p>
        ${wallLegend(tx)}
        <div class="today-slot" data-testid="advent-today-slot"></div>
        <ul class="wall" data-testid="advent-wall" data-flag-today="${esc(w.today)}" data-flag-missed="${esc(w.missed)}">
          ${doors}
        </ul>
        <p class="sr" aria-live="polite" data-testid="advent-live"></p>
      </main>
      ${siteFooter(lang, tx.site, COPY, `${ORIGIN}${gitHome(lang)}`)}
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
/**
 * The Git enclosure on the home page (RSP-195, decided 2026-11-16): before the advent start an announcement with the
 * start date in the page language; from the start an open enclosure that leads to the advent wall. The build writes
 * the state on its own date; js/advent.js swaps in the open one (kept in a <template>) once the visitor's date reaches
 * data-advent-start, so the enclosure opens on the day without a deploy.
 */
function gitEnclosure(lang, h) {
  const open = `<a href="${gitHome(lang)}" data-testid="enclosure-git-link">
              <span class="enclosure-top"><span class="sign sign-open" data-testid="sign-git">${esc(h.gitOpenSign)}</span></span>
              <span class="enclosure-name">Git</span>
              <span>${esc(h.gitText)}</span>
              <span class="enclosure-go">${esc(h.gitEnter)}</span>
            </a>`;
  if (adventStarted)
    return `<li class="enclosure" style="--stripe: var(--c4)" data-testid="enclosure-git" data-advent-start="${ADVENT_START}">
            ${open}
          </li>`;
  return `<li class="enclosure enclosure-soon" style="--stripe: var(--c4)" data-testid="enclosure-git" data-advent-start="${ADVENT_START}">
            <span class="enclosure-top"><span class="sign sign-notice" data-testid="sign-git">${esc(h.gitSign(dayMonth(lang, ADVENT_START)))}</span></span>
            <span class="enclosure-name">Git</span>
            <span>${esc(h.gitText)}</span>
            <template>${open}</template>
          </li>`;
}

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
          ${gitEnclosure(lang, h)}
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
          <p class="home-credits" data-testid="home-credits">${esc(h.gitLogo)} <a href="https://git-scm.com/community/logos">Jason Long</a>, <a href="https://creativecommons.org/licenses/by/3.0/">CC BY 3.0</a></p>
          <p class="home-credits" data-testid="home-trademark"${lang === 'en' ? '' : ' lang="en"'}>${TRADEMARK}</p>
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
 * The page at a language-less path (RSP-216): the English page itself, marked `data-bare` on <html>, with the
 * language hint's texts in every language (js/lang-hint.js shows the visitor's one; the pages load no locale file).
 * Canonical and hreflang stay the English page's: canonical /en/…, x-default = this language-less address.
 * Replaces the chooser pages, whose redirect ran after the page was parsed, so a bare language list flashed first.
 */
function barePage(enHtml, hints) {
  const json = JSON.stringify(hints).replace(/</g, '\\u003c');
  if (!enHtml.includes('<html lang="en"') || !enHtml.includes('</body>'))
    throw new Error('build-pages: an English page has no <html lang="en"> or </body> for its language-less copy');
  return enHtml
    .replace('<html lang="en"', '<html lang="en" data-bare')
    .replace('</body>', `<script type="application/json" id="lang-hint-texts">${json}</script>\n  </body>`);
}

/**
 * dist/_redirects (RSP-138, RSP-183). Language-less URLs (/, /http/, /http/<code>/) are NOT redirected here: they show
 * the English page with a hint to the visitor's language (RSP-216; until then a chooser page redirected in the browser),
 * on Netlify the same as in a local run.
 * Why not Netlify's `Language=` rules (used until RSP-183): Netlify's edge answers two requests for the same URL with
 * the same Accept-Language that arrive together with ONE redirect, whatever their nf_lang cookie (deploy preview
 * #40, 2026-11-11: 6 wrong answers of 20). A language-less page is the same file for everyone, so that can't go wrong.
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

/**
 * sitemap.xml: the home page, the app, "What's new", every creature page and every git card page whose advent day
 * has come (gitOpen, RSP-199) in every language, each with its hreflang alternates.
 */
function sitemap(today) {
  const groups = [homeOrRoot, appUrl, newsUrl]
    .concat(D.map((d) => (l) => creatureUrl(l, d.c)))
    .concat(adventStarted ? [gitHome] : [])
    .concat(GIT.filter(gitOpen).map((g) => (l) => gitUrl(l, g.id)));
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
 * RSP-175 AC4: every page a visitor stays on has the analytics beacon exactly once, the English copies at the
 * language-less paths too (RSP-216: they are pages, no longer chooser pages).
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
    `${gitHome(l).slice(1)}index.html`,
    ...GIT.map((g) => `${gitUrl(l, g.id).slice(1)}index.html`),
  ]).concat('404.html');
  const bare = [
    'index.html',
    `${appUrl(null).slice(1)}index.html`,
    `${newsUrl(null).slice(1)}index.html`,
    ...D.map((d) => `${creatureUrl(null, d.c).slice(1)}index.html`),
    `${gitHome(null).slice(1)}index.html`,
    ...GIT.map((g) => `${gitUrl(null, g.id).slice(1)}index.html`),
  ];
  for (const file of stay.concat(bare))
    if ((await count(file)) !== 1)
      throw new Error(`build-pages: ${file} has the analytics beacon ${await count(file)} times, not once`);
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

  // A git card picture (or the placeholder egg) that isn't in site/ would be a broken image on its page: stop instead.
  for (const src of new Set(
    GIT.map((g) => g.art || EGG.src).concat(GIT.flatMap((g) => (g.vigs || []).filter(Boolean))),
  ))
    await readFile(path.join(DIST, src)).catch(() => {
      throw new Error(`build-pages: git card picture ${src} is missing in site/`);
    });

  let pages = 0,
    gitPages = 0;
  const hints = {};
  for (const lang of LANGS) {
    const tx = lang === 'en' ? en : fill((await LOCALES[lang]()).default, en, '', lang);
    hints[lang] = tx.site.langHint;
    await page(homeUrl(lang), homePage(lang, tx));
    await writeFile(path.join(DIST, lang, '404.html'), notFoundPage(lang, tx));
    if (lang === 'en') await writeFile(path.join(DIST, '404.html'), notFoundPage(lang, tx)); // Netlify's default
    await page(appUrl(lang), appPage(lang, tx));
    await page(newsUrl(lang), newsPage(lang, tx));
    for (const d of D) {
      await page(creatureUrl(lang, d.c), creaturePage(lang, tx, d));
      pages++;
    }
    await page(gitHome(lang), gitWallPage(lang, tx));
    for (const g of GIT) {
      await page(gitUrl(lang, g.id), gitPage(lang, tx, g));
      gitPages++;
    }
  }
  for (const rest of ['/', appUrl(null), newsUrl(null), gitHome(null)]
    .concat(D.map((d) => creatureUrl(null, d.c)))
    .concat(GIT.map((g) => gitUrl(null, g.id))))
    await page(rest, barePage(await readFile(path.join(DIST, 'en', rest, 'index.html'), 'utf8'), hints));
  await writeFile(path.join(DIST, '_redirects'), redirects());
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(new Date().toISOString().slice(0, 10)));
  await checkBeacons();
  console.log(
    `build-pages: ${LANGS.length} home pages + ${LANGS.length} app pages + ${LANGS.length} news pages + ${pages} creature pages (${LANGS.length} languages × ${D.length} cards) + ${gitPages} git card pages (${GIT.filter(gitOpen).length} of ${GIT.length} cards open on ${BUILD_DATE}, advent start ${ADVENT_START}, ${ADVENT_DAYS} days) + the advent wall, the English pages at the language-less paths, _redirects → dist/`,
  );
}

await build();
