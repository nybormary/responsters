// Page chrome: everything outside the three views (site header and footer, language menu, tabs, "How to use",
// Practice mode cards)
// is redrawn in the current language and state.
import { state, t, tx, LANGS, LANG_NAMES } from './state.js';
import { $ } from './util.js';
import { MODES } from './modes.js';
import { GLOBE, CHEVRON, CHECK } from './icons.js';
import { homeUrl } from './render.js';

// Language menu (RSP-109): a button with the current language; the list holds every language that has texts,
// each written in its own language and marked with its own lang, so screen readers pronounce it right.
function renderLangMenu() {
  const [name, code] = LANG_NAMES[state.lang];
  const b = $('lang-btn');
  b.innerHTML = `${GLOBE}<span class="lang-code" aria-hidden="true">${code}</span><span class="lang-name" lang="${state.lang}">${name}</span>${CHEVRON}`;
  b.setAttribute('aria-label', `${t().lang}: ${name}`);
  $('lang-list').setAttribute('aria-label', t().lang);
  $('lang-list').innerHTML = LANGS.map(
    (l) =>
      `<li role="none"><button role="menuitemradio" tabindex="-1" data-lang="${l}" data-testid="lang-${l}" aria-checked="${l === state.lang}"><span>${LANG_NAMES[l][0]}</span><span class="lang-check">${l === state.lang ? CHECK : ''}</span></button></li>`,
  ).join('');
}

// Practice mode cards (RSP-109): icon, name, one-line hint; the chosen one is pressed and carries a check.
function renderModes() {
  $('modes-title').textContent = t().modes;
  $('modes').innerHTML = MODES.map(
    (m) =>
      `<button class="mode${m.hard ? ' hard' : ''}" data-mode="${m.id}" aria-pressed="${m.id === state.mode}">${m.icon}<span class="mode-name">${t()[m.name]}</span><span class="mode-hint">${t()[m.hint]}</span><span class="mode-check" aria-hidden="true">${CHECK}</span></button>`,
  ).join('');
}

// Page head in the current language (RSP-138): the build writes it for /<lang>/http/; after a language change
// in the app it has to follow, so a bookmark or a share made then carries the right title and address.
function renderHead() {
  document.documentElement.lang = state.lang;
  document.title = t().appTitle;
  document.querySelector('meta[name="description"]')?.setAttribute('content', t().tag);
  const canon = document.querySelector('link[rel="canonical"]'); // always names production: swap only the language
  canon?.setAttribute('href', canon.href.replace(/\/[a-z]{2}\/http\//, `/${state.lang}/http/`));
}

// Site header and footer (RSP-155): the build writes them in the page language (render.js); after a language change
// in the app their links and texts follow. Updated in place: the language menu inside keeps its listeners.
function renderSite() {
  const site = tx().site;
  const home = homeUrl(state.lang);
  document.querySelector('.site-logo')?.setAttribute('href', home);
  document.querySelector('.site-nav')?.setAttribute('aria-label', site.nav);
  for (const [id, hash, text] of [
    ['nav-map', '#map', site.map],
    ['nav-about', '#about', site.about],
  ]) {
    const a = document.querySelector(`[data-testid="${id}"]`);
    if (!a) continue;
    a.href = home + hash;
    a.textContent = text;
  }
  const note = document.querySelector('.site-footer > span');
  if (note) note.textContent = site.foot;
}

export function renderChrome() {
  renderHead();
  renderSite();
  $('tagline').textContent = t().tag;
  renderLangMenu();
  ['collection', 'practice', 'traps'].forEach((v, i) => {
    const b = $('tab-' + v);
    b.textContent = t().tabs[i];
    b.setAttribute('aria-selected', v === state.view);
  });
  ['collection', 'practice', 'traps'].forEach((v) => ($('view-' + v).hidden = v !== state.view));
  renderModes();
  $('howto-open').textContent = t().howto;
  $('howto-open').setAttribute('aria-expanded', state.howtoOpen);
  $('howto').hidden = !state.howtoOpen;
  $('howto-title').textContent = t().howto;
  $('howto-steps').innerHTML = t()
    .howtoSteps.map(
      (s, i) =>
        `<li class="path-step"><span class="path-mark" aria-hidden="true" data-testid="step-marker">${i + 1}</span>${s}</li>`,
    )
    .join('');
  $('howto-note').textContent = t().howtoNote;
  $('howto-close').textContent = t().howtoClose;
  $('traps-lede').textContent = t().traps;
  $('to-top').textContent = '↑ ' + t().top;
}

// Opening and closing the language menu. Keyboard: Enter/Space/↓ open and focus the current language,
// ↑/↓/Home/End move, Enter picks, Escape or Tab closes; Escape returns focus to the button.
const items = () => [...$('lang-list').querySelectorAll('button')];
export function langOpen(focusCurrent = true) {
  $('lang-list').hidden = false;
  $('lang-btn').setAttribute('aria-expanded', true);
  if (focusCurrent) {
    const cur = items().find((b) => b.getAttribute('aria-checked') === 'true') || items()[0];
    cur.focus();
  }
}
export function langClose(returnFocus = false) {
  if ($('lang-list').hidden) return;
  $('lang-list').hidden = true;
  $('lang-btn').setAttribute('aria-expanded', false);
  if (returnFocus) $('lang-btn').focus();
}
export function langKeys(e) {
  const list = $('lang-list'),
    inMenu = list.contains(e.target),
    onBtn = e.target.id === 'lang-btn';
  if (!inMenu && !onBtn) return;
  if (onBtn && (e.key === 'ArrowDown' || e.key === 'ArrowUp')) {
    e.preventDefault();
    langOpen();
    return;
  }
  if (!inMenu) return;
  const all = items(),
    i = all.indexOf(document.activeElement);
  if (e.key === 'ArrowDown') {
    e.preventDefault();
    all[(i + 1) % all.length].focus();
  } else if (e.key === 'ArrowUp') {
    e.preventDefault();
    all[(i - 1 + all.length) % all.length].focus();
  } else if (e.key === 'Home') {
    e.preventDefault();
    all[0].focus();
  } else if (e.key === 'End') {
    e.preventDefault();
    all[all.length - 1].focus();
  } else if (e.key === 'Escape') {
    e.preventDefault();
    langClose(true);
  } else if (e.key === 'Tab') {
    langClose();
  }
}
