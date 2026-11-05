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
import { cardBody, cardLinks, esc, homeUrl, langMenu, siteHeader, siteFooter } from '../site/js/render.js';
import { cls, art } from '../site/js/util.js';

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
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="${FONTS}" />
    <link rel="stylesheet" href="/css/base.css" />
    <link rel="stylesheet" href="/css/card.css" />
    <link rel="stylesheet" href="/css/detail.css" />
    <script type="module">
      import { followSavedLanguage } from '/js/lang.js';
      followSavedLanguage();
    </script>
  </head>
  <body>
    <div class="wrap" id="top">
      <header>
        <div class="brand"><div class="brand-name"><a class="home-link" href="${appUrl(lang)}">Responsters</a></div></div>
        <div class="tools">${menu}</div>
      </header>
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
      <footer>${esc(ui.foot)}</footer>
    </div>
  </body>
</html>
`;
}

/** The creatures in the hero of the home page (RSP-156 AC2): one from each status class, so all five colours show. */
const HERO = [102, 201, 304, 418, 502];

/** Home page /<lang>/ (RSP-156): what the zoo is, what is open and who builds it. Texts: i18n `home`, `site`. */
function homePage(lang, tx) {
  const h = tx.home;
  const app = appUrl(lang);
  const hero = HERO.map(
    (c) => `<figure class="hero-card">
            <img src="${art(c)}" alt="${esc(tx.cards[c].art)}" width="640" height="573" />
            <figcaption>${c}</figcaption>
          </figure>`,
  ).join('\n          ');
  const steps = h.steps
    .map(
      ([title, text]) => `<li class="home-step">
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
    ${alternates((l) => (l ? homeUrl(l) : '/'))}
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="stylesheet" href="${FONTS}" />
    <link rel="stylesheet" href="/css/base.css" />
    <link rel="stylesheet" href="/css/site.css" />
    <link rel="stylesheet" href="/css/home.css" />
    <script type="module" src="/js/site.js"></script>
  </head>
  <body>
    <div class="wrap">
    ${siteHeader(lang, tx.site, langMenu(lang, homeUrl, LANG_NAMES, tx.ui.lang), true)}
    <main class="home" data-testid="home-page">
      <section class="home-hero" aria-labelledby="home-title">
        <div class="home-hero-text">
          <p class="home-kicker">${esc(h.kicker)}</p>
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
              <span class="enclosure-top"><span class="enclosure-zone">${esc(h.httpZone)}</span><span class="badge badge-open">${esc(h.open)}</span></span>
              <span class="enclosure-name">${esc(h.httpName)}</span>
              <span>${esc(h.httpText(D.length, D[0].c, D[D.length - 1].c))}</span>
              <span class="enclosure-go">${esc(h.enter)}</span>
            </a>
          </li>
          <li class="enclosure enclosure-soon" style="--stripe: var(--c4)" data-testid="enclosure-git">
            <span class="enclosure-top"><span class="enclosure-zone">${esc(h.gitZone)}</span><span class="badge badge-date">${esc(h.gitDate)}</span></span>
            <span class="enclosure-name">Git</span>
            <span>${esc(h.gitText)}</span>
          </li>
        </ul>
        <div class="pavilions">
          <h3>${esc(h.pavilions)}</h3>
          <ul class="pavilion-list">
            <li class="pavilion">
              <a href="${app}#traps" data-testid="pavilion-traps">
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
        <ol class="home-steps">
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
 * Chooser page at a language-less path. Locally it answers every visitor (npx serve dist knows no redirects);
 * on Netlify only the visitors whose first browser language isn't one of ours (see redirects()).
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
 * The browser keeps the #hash across a redirect, so /#traps lands on /<lang>/http/#traps.
 * ?via=lang marks the target: there js/lang.js followSavedLanguage() lets a language saved before RSP-138
 * (localStorage only, no cookie yet) win, then removes the marker.
 */
function redirects() {
  const rules = [
    ['/', (l) => `${appUrl(l)}?via=lang`], // → the home page /<lang>/ once it exists (RSP-156)
    ['/http', (l) => `${appUrl(l)}?via=lang`],
    ['/http/*', (l) => `${appUrl(l)}:splat?via=lang`],
  ];
  const lines = rules.flatMap(([from, to]) => LANGS.map((l) => `${from}  ${to(l)}  302!  Language=${l}`));
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
    await page(homeUrl(lang), homePage(lang, tx));
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
    `build-pages: ${LANGS.length} home pages + ${LANGS.length} app pages + ${pages} creature pages (${LANGS.length} languages × ${D.length} cards), chooser pages, _redirects → dist/`,
  );
}

await build();
