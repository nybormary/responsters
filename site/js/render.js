// Pure markup for a card and its links (RSP-90): no DOM and no app state, so the app in the browser
// and the page build (scripts/build-pages.mjs) make the same HTML from the same data.
import { CLS, clsSym } from '../data/classes.js';
import { BY } from '../data/cards.js';
import { TOOLS, REF, MORE } from '../data/links.js';
import { cls, art, contactHref } from './util.js';
import { GLOBE, CHEVRON, CHECK, EXTERNAL } from './icons.js';

// Text for HTML: & < > " become entities.
export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inner parts of one card: art, code badge + status name, then name, move and the card line.
// Only phrasing elements (span, img) so the markup is valid inside a <button>.
// alt: text for the art; '' (decoration) in the Collection grid, where the card's own text says it all.
export function cardBody(d, line, alt = '') {
  return `<span class="cf-art"><img src="${art(d.c)}" alt="${esc(alt)}" loading="lazy" data-testid="card-art"></span>
  <span class="cf-status"><span class="cf-badgerow"><span class="cf-code" style="background:${CLS[cls(d.c)].c}">${d.c}</span><span class="cf-sym">${clsSym(cls(d.c))}</span></span><span class="cf-name">${d.s}</span></span>
  <span class="cf-panel"><span class="cf-creature">${d.n}</span><span class="cf-move">${d.m}</span><span class="cf-line">${line}</span></span>`;
}

// Links for one code, in order: RFC section → MDN page → extra links → general tools.
// toolLabels: the tools' names in the page language (i18n tools), same order as TOOLS.
export function cardLinks(c, lang, toolLabels) {
  const r = REF[c],
    d = BY[c],
    out = [];
  if (r) out.push({ label: `RFC ${r[0]} §${r[1]}`, u: `https://www.rfc-editor.org/rfc/rfc${r[0]}#section-${r[1]}` });
  out.push({ label: `MDN: ${c} ${d.s}`, u: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/${c}` });
  const more = (MORE[c] || []).map((x) => ({ label: x.label[lang] || x.label.en, u: x.u }));
  return out.concat(
    more,
    TOOLS.map((x, i) => ({ label: toolLabels[i], u: x.u })),
  );
}

// Site header and footer (RSP-156): the same on every page of the zoo. The home page uses them first;
// RSP-155 puts them on the app and the card pages. Pure markup, like the card above.

/**
 * The Mnemozoo logo: each letter in the next status class colour, 1xx to 5xx and round again (M n e m o = 1–5).
 * Screen readers get the word once; the coloured letters are hidden from them (some read single spans letter by letter).
 */
const LOGO = `<span class="logo-text">Mnemozoo</span><span aria-hidden="true">${[...'Mnemozoo']
  .map((ch, i) => `<span class="k${(i % 5) + 1}">${ch}</span>`)
  .join('')}</span>`;

/** Path of the home page, e.g. homeUrl('uk') → '/uk/'. */
export const homeUrl = (lang) => `/${lang}/`;

/**
 * Language menu (RSP-109): a pill with the current language opens a list of all languages, each in its own language.
 * Built on <details> with plain links, so it works without JS; js/site.js saves the choice on a click.
 * urlFor(l): the same page in language l. names: LANG_NAMES (i18n/index.js). label: ui.lang in the page language.
 */
export function langMenu(lang, urlFor, names, label) {
  const [name, code] = names[lang];
  const items = Object.keys(names)
    .map((l) =>
      l === lang
        ? `<li><a href="${urlFor(l)}" lang="${l}" data-testid="lang-${l}" aria-current="page"><span>${names[l][0]}</span><span class="lang-check">${CHECK}</span></a></li>`
        : `<li><a href="${urlFor(l)}" lang="${l}" hreflang="${l}" data-testid="lang-${l}"><span>${names[l][0]}</span><span class="lang-check"></span></a></li>`,
    )
    .join('');
  return `<details class="langmenu">
          <summary class="langbtn" data-testid="lang-button">${GLOBE}<span class="sr-only">${esc(label)}: </span><span class="lang-code">${code}</span><span class="lang-name" lang="${lang}">${name}</span>${CHEVRON}</summary>
          <ul class="langlist" data-testid="lang-menu" aria-label="${esc(label)}">${items}</ul>
        </details>`;
}

/**
 * Site header: Mnemozoo (home) · zoo map · about · language menu. A real banner landmark: it must stay outside <main>.
 * The language menu sits after the nav, not in it: on phones it moves up next to the logo (site.css).
 * site: i18n `site` block; onHome: the logo is the current page there.
 */
export function siteHeader(lang, site, menu, onHome = false) {
  const home = homeUrl(lang);
  return `<header class="site-header" data-testid="site-header">
      <a class="site-logo" href="${home}" data-testid="site-logo"${onHome ? ' aria-current="page"' : ''}>${LOGO}</a>
      <nav class="site-nav" aria-label="${esc(site.nav)}">
        <a href="${home}#map" data-testid="nav-map">${esc(site.map)}</a>
        <a href="${home}#about" data-testid="nav-about">${esc(site.about)}</a>
      </nav>
      ${menu}
    </header>`;
}

/**
 * The app's language menu (RSP-109, RSP-155): the same pill and list, but a JS menu button with keyboard support
 * (js/chrome.js fills it and redraws it on a language change). The app page puts it into the site header.
 */
export const APP_LANG_MENU = `<div class="langmenu" id="langmenu">
          <button class="langbtn" id="lang-btn" data-testid="lang-button" aria-haspopup="menu" aria-expanded="false" aria-controls="lang-list"></button>
          <ul class="langlist" id="lang-list" data-testid="lang-menu" role="menu" hidden></ul>
        </div>`;

/** Where the footer's links go (RSP-139). The same in every language; texts are in i18n `site`. */
export const FOOT_LINKS = {
  linkedin: 'https://www.linkedin.com/in/maryna-bortnyk/',
  github: 'https://github.com/nybormary/responsters',
};

/**
 * Site footer (RSP-137, RSP-139): a real contentinfo landmark, outside <main>. First row: map, about, What's new (RSP-145), LinkedIn and
 * GitHub (external: an arrow and a screen-reader note), bug or feedback (mail; screen readers also hear "email"), security.txt. Second row:
 * © years Mnemozoo and the credits line. copy: "© 2026 Mnemozoo", built by the page build (the year is build time). pageUrl: this page's production address
 * for the mail body (none on the 404 page: a click fills in the address actually open, util.js contactOnClick).
 */
export function siteFooter(lang, site, copy, pageUrl) {
  const home = homeUrl(lang);
  const subject = `Mnemozoo: ${site.contact}`;
  const ext = (id, label) =>
    `<li><a href="${FOOT_LINKS[id]}" data-testid="foot-${id}">${label}${EXTERNAL}<span class="sr-only foot-ext"> (${esc(site.ext)})</span></a></li>`;
  return `<footer class="site-footer" data-testid="site-footer">
      <ul class="foot-links">
        <li><a href="${home}#map" data-testid="foot-map">${esc(site.map)}</a></li>
        <li><a href="${home}#about" data-testid="foot-about">${esc(site.about)}</a></li>
        <li><a href="/${lang}/news/" data-testid="foot-news">${esc(site.news)}</a></li>
        ${ext('linkedin', 'LinkedIn')}
        ${ext('github', 'GitHub')}
        <li><a href="${esc(contactHref(subject, site.page, pageUrl))}" data-subject="${esc(subject)}" data-page="${esc(site.page)}" data-testid="foot-contact"><span class="foot-contact-text">${esc(site.contact)}</span><span class="sr-only foot-mail"> (${esc(site.mail)})</span></a></li>
        <li><a href="/.well-known/security.txt" data-testid="foot-security">security.txt</a></li>
      </ul>
      <p class="foot-note"><span data-testid="foot-copy">${esc(copy)}</span><span data-testid="foot-credits">${esc(site.foot)}</span></p>
    </footer>`;
}
