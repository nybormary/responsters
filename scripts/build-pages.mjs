// Page build (RSP-90, URL scheme RSP-138): copies site/ to dist/ and writes one static page per creature
// and language at /<lang>/http/<code>/. Netlify runs it before every deploy (netlify.toml) and publishes dist/.
// Texts and data come from the same files the app uses (site/data, site/i18n, site/js/render.js),
// so a text changed for the app changes on the pages too.
//
// Run locally: npm run build, then npx serve dist (npm test does both by itself).
// dist/ is generated: never edit it, never commit it.
import { cp, rm, mkdir, writeFile } from 'node:fs/promises';
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

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const SITE = path.join(ROOT, 'site');
const DIST = path.join(ROOT, 'dist');
const ORIGIN = 'https://mnemozoo.com'; // canonical and hreflang links always name production
const LANGS = Object.keys(LOCALES);

/** Path of a creature page, e.g. creatureUrl('uk', 401) → '/uk/http/401/'. */
const creatureUrl = (lang, c) => `/${lang}/http/${c}/`;

/** One creature page in one language. */
function creaturePage(lang, tx, d) {
  const c = d.c;
  const L = tx.cards[c];
  const ui = tx.ui;
  const title = `${c} ${d.s}: ${d.n}`;
  const alternates = LANGS.map((l) => `<link rel="alternate" hreflang="${l}" href="${ORIGIN}${creatureUrl(l, c)}" />`)
    .concat(`<link rel="alternate" hreflang="x-default" href="${ORIGIN}${creatureUrl('en', c)}" />`)
    .join('\n    ');
  const langLinks = LANGS.map((l) =>
    l === lang
      ? `<a href="${creatureUrl(l, c)}" lang="${l}" aria-current="page">${LANG_NAMES[l][0]}</a>`
      : `<a href="${creatureUrl(l, c)}" lang="${l}" hreflang="${l}">${LANG_NAMES[l][0]}</a>`,
  ).join('');
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
    ${alternates}
    <link rel="icon" href="/favicon.png" type="image/png" />
    <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      rel="stylesheet"
      href="https://fonts.googleapis.com/css2?family=Baloo+2:wght@600;700;800&family=Atkinson+Hyperlegible:wght@400;700&family=JetBrains+Mono:wght@600;800&display=swap"
    />
    <link rel="stylesheet" href="/css/base.css" />
    <link rel="stylesheet" href="/css/card.css" />
    <link rel="stylesheet" href="/css/detail.css" />
  </head>
  <body>
    <div class="wrap">
      <header>
        <div class="brand"><div class="brand-name"><a class="home-link" href="/">Responsters</a></div></div>
        <nav class="page-langs" aria-label="${esc(ui.lang)}">${langLinks}</nav>
      </header>
      <main class="page" data-testid="creature-page">
        <article class="sheet" style="--cls: ${CLS[cls(c)].c}">
          <div class="in">
            <h1 class="sr">${esc(title)}</h1>
            <div class="card cf-static">${cardBody(d, L.line, '/')}</div>
            <h2>${esc(ui.mean)}</h2>
            <p>${esc(L.mean)}</p>
            <h2>${esc(ui.when)}</h2>
            <p>${esc(L.when)}</p>
            <h2>${esc(ui.qa)}</h2>
            <ul class="qa">${qa}</ul>
            <h2>${esc(ui.links)}</h2>
            <ul class="links">${links}</ul>${
              conf
                ? `
            <h2>${esc(ui.conf)}</h2>
            <div class="mini">${conf}</div>`
                : ''
            }
          </div>
          <a class="back" href="/#collection">← ${esc(ui.back)}</a>
        </article>
      </main>
      <footer>${esc(ui.foot)}</footer>
    </div>
  </body>
</html>
`;
}

/** sitemap.xml: the app and every creature page. */
function sitemap(today) {
  const urls = ['/'].concat(LANGS.flatMap((l) => D.map((d) => creatureUrl(l, d.c))));
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map((u) => `  <url>\n    <loc>${ORIGIN}${u}</loc>\n    <lastmod>${today}</lastmod>\n  </url>`).join('\n')}
</urlset>
`;
}

async function build() {
  await rm(DIST, { recursive: true, force: true });
  await cp(SITE, DIST, { recursive: true });

  let pages = 0;
  for (const lang of LANGS) {
    const tx = lang === 'en' ? en : fill((await LOCALES[lang]()).default, en, '', lang);
    for (const d of D) {
      const dir = path.join(DIST, lang, 'http', String(d.c));
      await mkdir(dir, { recursive: true });
      await writeFile(path.join(dir, 'index.html'), creaturePage(lang, tx, d));
      pages++;
    }
  }
  await writeFile(path.join(DIST, 'sitemap.xml'), sitemap(new Date().toISOString().slice(0, 10)));
  console.log(`build-pages: ${pages} creature pages (${LANGS.length} languages × ${D.length} cards) → dist/`);
}

await build();
