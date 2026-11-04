// Page build (RSP-90, URL scheme RSP-138): copies site/ to dist/ and writes, per language,
// the app at /<lang>/http/ and one static page per creature at /<lang>/http/<code>/. Language-less URLs
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
import { CONF } from '../site/data/traps.js';
import { LOCALES, LANG_NAMES } from '../site/i18n/index.js';
import en from '../site/i18n/en.js';
import { fill } from '../site/i18n/fill.js';
import { cardBody, cardLinks, esc } from '../site/js/render.js';
import { cls } from '../site/js/util.js';
import { GLOBE, CHEVRON, CHECK } from '../site/js/icons.js';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SITE = path.join(ROOT, 'site');
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://mnemozoo.com'; // canonical and hreflang links always name production
const LANGS = Object.keys(LOCALES);
// The app template (RSP-138): written per language, never served as is.
const APP = await readFile(path.join(SITE, 'app.html'), 'utf8');
// The web fonts link is taken from the app template, so the app and the pages always load the same fonts.
const FONTS = APP.match(/href="(https:\/\/fonts\.googleapis\.com\/css2\?[^"]+)"/)[1];

/** Path of the app, e.g. appUrl('uk') → '/uk/http/'; appUrl(null) → '/http/', the language-less one. */
const appUrl = (lang) => (lang ? `/${lang}` : '') + '/http/';
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
  const [name, code] = LANG_NAMES[lang];
  const langMenu = `<details class="langmenu">
          <summary class="langbtn" aria-label="${esc(`${ui.lang}: ${name}`)}">${GLOBE}<span class="lang-code" aria-hidden="true">${code}</span><span class="lang-name" lang="${lang}">${name}</span>${CHEVRON}</summary>
          <ul class="langlist" aria-label="${esc(ui.lang)}">${LANGS.map((l) =>
            l === lang
              ? `<li><a href="${creatureUrl(l, c)}" lang="${l}" aria-current="page"><span>${LANG_NAMES[l][0]}</span><span class="lang-check">${CHECK}</span></a></li>`
              : `<li><a href="${creatureUrl(l, c)}" lang="${l}" hreflang="${l}"><span>${LANG_NAMES[l][0]}</span><span class="lang-check"></span></a></li>`,
          ).join('')}</ul>
        </details>`;
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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="${FONTS}" />
    <link rel="stylesheet" href="/css/base.css" />
    <link rel="stylesheet" href="/css/card.css" />
    <link rel="stylesheet" href="/css/detail.css" />
  </head>
  <body>
    <div class="wrap" id="top">
      <header>
        <div class="brand"><div class="brand-name"><a class="home-link" href="${appUrl(lang)}">Responsters</a></div></div>
        <div class="tools">${langMenu}</div>
      </header>
      <main class="page" data-testid="card-page">
        <a class="page-back" href="${appUrl(lang)}#collection">← ${esc(ui.back)}</a>
        <article class="sheet" style="--cls: ${CLS[cls(c)].c}">
          <div class="in page-grid">
            <h1 class="sr">${esc(title)}</h1>
            <div class="page-card"><div class="card cf-static">${cardBody(d, L.line)}</div></div>
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
      <footer>${esc(ui.foot)}</footer>
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
    [/<title>[^<]*<\/title>/, `<title>${esc(tx.ui.appTitle)}</title>`],
    [/<meta\s+name="description"\s+content="[^"]*"\s*\/>/, `<meta name="description" content="${esc(tx.ui.tag)}" />`],
    [
      '<!-- build: canonical and hreflang -->',
      `<link rel="canonical" href="${ORIGIN}${appUrl(lang)}" />\n    ${alternates(appUrl)}`,
    ],
  ];
  return fills.reduce((html, [from, to]) => {
    if (!html.match(from)) throw new Error(`build-pages: site/app.html has no ${from}`);
    return html.replace(from, to);
  }, APP);
}

/**
 * Chooser page at a language-less path (local runs only: on Netlify, dist/_redirects answers first).
 * It sends the visitor on to `/<lang><rest>` with the same hash (old links like /#traps keep working);
 * without JavaScript it lists the languages. Until the home page exists (RSP-156), / leads to the app.
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
    <ul>${links}</ul>
  </body>
</html>
`;
}

/**
 * dist/_redirects (RSP-138): language-less URLs → the visitor's language. Netlify takes the language from the
 * nf_lang cookie (set by the switcher, js/lang.js), otherwise from the browser's Accept-Language; English is
 * the fallback. 302, not 301: the target depends on the visitor. "!" forces the rule, because dist/ has a
 * chooser page at the same path. The browser keeps the #hash across a redirect, so /#traps lands on /<lang>/http/#traps.
 */
function redirects() {
  const rules = [
    ['/', (l) => appUrl(l)], // → the home page /<lang>/ once it exists (RSP-156)
    ['/http', (l) => appUrl(l)],
    ['/http/*', (l) => `${appUrl(l)}:splat`],
  ];
  const lines = rules.flatMap(([from, to]) =>
    LANGS.map((l) => `${from}  ${to(l)}  302!  Language=${l}`).concat(`${from}  ${to('en')}  302!`),
  );
  return `# Generated by scripts/build-pages.mjs (RSP-138): never edit dist/, change the build.\n${lines.join('\n')}\n`;
}

/** sitemap.xml: the app and every creature page in every language, each with its hreflang alternates. */
function sitemap(today) {
  const groups = [appUrl].concat(D.map((d) => (l) => creatureUrl(l, d.c)));
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

async function build() {
  await rm(DIST, { recursive: true, force: true });
  await cp(SITE, DIST, { recursive: true });
  await rm(path.join(DIST, 'app.html')); // the template is not a page

  let pages = 0;
  for (const lang of LANGS) {
    const tx = lang === 'en' ? en : fill((await LOCALES[lang]()).default, en, '', lang);
    await page(appUrl(lang), appPage(lang, tx));
    for (const d of D) {
      await page(creatureUrl(lang, d.c), creaturePage(lang, tx, d));
      pages++;
    }
  }
  for (const rest of [appUrl(null)].concat(D.map((d) => creatureUrl(null, d.c)))) await page(rest, chooserPage(rest));
  await page('/', chooserPage(appUrl(null)));
  await writeFile(path.join(DIST, '_redirects'), redirects());
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(new Date().toISOString().slice(0, 10)));
  console.log(
    `build-pages: ${LANGS.length} app pages + ${pages} creature pages (${LANGS.length} languages × ${D.length} cards), chooser pages, _redirects → dist/`,
  );
}

await build();
