// Page build (RSP-90, URL scheme RSP-138, home page RSP-156): copies site/ to dist/ and writes, per language,
// the home page at /<lang>/, the app at /<lang>/http/ and one static page per creature at /<lang>/http/<code>/. Language-less URLs
// (/, /http/, /http/<code>/) go to the visitor's language: Netlify redirects them (dist/_redirects);
// for local runs (npx serve dist knows no redirects) small chooser pages at those paths do the same.
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
const ORIGIN = 'https://mnemozoo.com'; // canonical and hreflang links always name production
const LANGS = Object.keys(LOCALES);
// The app template (RSP-138): written per language, never served as is.
const APP = await readFile(path.join(SITE, 'app.html'), 'utf8');
// The fonts block (preloads + fonts.css, RSP-160) is taken from the app template, so the app and the pages
// always load the same fonts from the same place.
const FONTS = APP.match(/ *<!-- fonts [\s\S]*?<!-- \/fonts -->/)[0].trim();
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

/** Path of the app, e.g. appUrl('uk') → '/uk/http/'; appUrl(null) → '/http/', the language-less one. */
const appUrl = (lang) => (lang ? `/${lang}` : '') + '/http/';
/** Path of the home page; the language-less one is the site root: homeOrRoot('uk') → '/uk/', homeOrRoot(null) → '/'. */
const homeOrRoot = (lang) => (lang ? homeUrl(lang) : '/');
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
    <title>${esc(title)} · Responsters</title>
    <meta name="description" content="${esc(`${title}. ${L.mean}`)}" />
    <link rel="canonical" href="${ORIGIN}${creatureUrl(lang, c)}" />
    ${alternates((l) => creatureUrl(l, c))}
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ${FONTS}
    ${styles('creature')}
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
      ${siteFooter(tx.site)}
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
    <title>${esc(h.title)}</title>
    <meta name="description" content="${esc(h.description)}" />
    <link rel="canonical" href="${ORIGIN}${homeUrl(lang)}" />
    ${alternates(homeOrRoot)}
    <script type="application/ld+json">${WEBSITE}</script>
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    ${FONTS}
    ${styles('home')}
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
          <p class="home-links">
            <a href="https://github.com/nybormary/responsters">GitHub</a>
            <a href="https://www.linkedin.com/in/maryna-bortnyk/">LinkedIn</a>
          </p>
        </div>
      </section>
    </main>
    ${siteFooter(tx.site)}
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
    <meta name="robots" content="noindex" />
    <title>${esc(t.title)}</title>
    <link rel="icon" href="/favicon.png" type="image/png" />
    ${FONTS}
    ${styles('not-found')}
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
    ${siteFooter(tx.site)}
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
    [/<title>[^<]*<\/title>/, `<title>${esc(tx.ui.appTitle)}</title>`],
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(tx.ui.tag)}" />`],
    [
      '<!-- build: canonical and hreflang -->',
      `<link rel="canonical" href="${ORIGIN}${appUrl(lang)}" />\n    ${alternates(appUrl)}`,
    ],
    // RSP-155: the same site header and footer as on every page; in the header, the app's own JS language menu.
    ['<!-- build: site header -->', siteHeader(lang, tx.site, APP_LANG_MENU)],
    ['<!-- build: site footer -->', siteFooter(tx.site)],
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
 * dist/_redirects (RSP-138): language-less URLs → the visitor's language. Netlify takes the language from the
 * nf_lang cookie (set by the switcher, js/lang.js), otherwise from the browser's Accept-Language, but it looks
 * only at the FIRST browser language (seen on deploy preview #27: "ru, pl" got no match). So there is no
 * English fallback here: when nothing matches, Netlify serves the chooser page at the same path, which checks
 * the whole browser list (pickLang) and then falls back to English, the same as a local run.
 * 302, not 301: the target depends on the visitor. "!" forces the rule over the chooser page at the same path.
 * The browser keeps the #hash across a redirect: /#traps lands on /<lang>/#traps, and the home page sends the old
 * app hashes on to /<lang>/http/#traps (js/site.js).
 * ?via=lang marks the target: there js/lang.js followSavedLanguage() lets a language saved before RSP-138
 * (localStorage only, no cookie yet) win, then removes the marker.
 */
function redirects() {
  const rules = [
    ['/', (l) => `${homeUrl(l)}?via=lang`], // the home page (RSP-156)
    ['/http', (l) => `${appUrl(l)}?via=lang`],
    ['/http/*', (l) => `${appUrl(l)}:splat?via=lang`],
  ];
  const lines = rules.flatMap(([from, to]) => LANGS.map((l) => `${from}  ${to(l)}  302!  Language=${l}`));
  // RSP-148: a missing address gets the 404 page in its language, with status 404. Not forced, so only paths with
  // no file match. A path with a language uses that language; any other path the visitor's (cookie, then first
  // browser language); no match → Netlify's default dist/404.html (English).
  const notFound = LANGS.map((l) => `/${l}/*  /${l}/404.html  404`).concat(
    LANGS.map((l) => `/*  /${l}/404.html  404  Language=${l}`),
  );
  // Netlify reads dist/_redirects BEFORE the [[redirects]] in netlify.toml, so the catch-all 404 rules above would hide
  // them. They live here, first (found by Copilot code review, PR #31): the old Netlify address goes to the own domain
  // (RSP-136); scanners asking for /security.txt go to the file (RSP-137, RFC 9116).
  const first = [
    'https://responsters.netlify.app/*  https://mnemozoo.com/:splat  301!',
    '/security.txt  /.well-known/security.txt  301!',
  ];
  return `# Generated by scripts/build-pages.mjs (RSP-138, RSP-148): never edit dist/, change the build.\n${first
    .concat(lines, notFound)
    .join('\n')}\n`;
}

/** sitemap.xml: the home page, the app and every creature page in every language, each with its hreflang alternates. */
function sitemap(today) {
  const groups = [homeOrRoot, appUrl].concat(D.map((d) => (l) => creatureUrl(l, d.c)));
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

async function build() {
  await rm(DIST, { recursive: true, force: true });
  await cp(SITE, DIST, { recursive: true });
  await rm(path.join(DIST, 'app.html')); // the template is not a page
  await writeStyles();

  let pages = 0;
  for (const lang of LANGS) {
    const tx = lang === 'en' ? en : fill((await LOCALES[lang]()).default, en, '', lang);
    await page(homeUrl(lang), homePage(lang, tx));
    await writeFile(path.join(DIST, lang, '404.html'), notFoundPage(lang, tx));
    if (lang === 'en') await writeFile(path.join(DIST, '404.html'), notFoundPage(lang, tx)); // Netlify's default
    await page(appUrl(lang), appPage(lang, tx));
    for (const d of D) {
      await page(creatureUrl(lang, d.c), creaturePage(lang, tx, d));
      pages++;
    }
  }
  for (const rest of [appUrl(null)].concat(D.map((d) => creatureUrl(null, d.c)))) await page(rest, chooserPage(rest));
  await page('/', chooserPage('/'));
  await writeFile(path.join(DIST, '_redirects'), redirects());
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(new Date().toISOString().slice(0, 10)));
  console.log(
    `build-pages: ${LANGS.length} home pages + ${LANGS.length} app pages + ${pages} creature pages (${LANGS.length} languages × ${D.length} cards), chooser pages, _redirects → dist/`,
  );
}

await build();
