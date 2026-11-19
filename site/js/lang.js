// Which language a page is in, and the visitor's saved choice (RSP-97, URL per language RSP-138).
// Used by the app (state.js, app.js), the pages (site.js) and the language hint on the language-less pages
// (lang-hint.js, RSP-216). The rules for picking a language live in js/pick-lang.js.
import { store } from './store.js';
import { LOCALES } from '../i18n/index.js';
import { pickFrom } from './pick-lang.js';

const known = (l) => Object.hasOwn(LOCALES, l);

/** The language in the URL path: '/uk/http/401/' → 'uk'; null for a language-less path. */
export function langFromPath(path = location.pathname) {
  const l = path.split('/')[1];
  return known(l) ? l : null;
}

const cookieLang = () => {
  const m = document.cookie.match(/(?:^|;\s*)nf_lang=([^;]+)/);
  return m && known(m[1]) ? m[1] : null;
};

// The visitor's language when the URL doesn't say it: saved choice, then the browser list, then English
// (rules in js/pick-lang.js).
export function pickLang() {
  const list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  return pickFrom(store.get('lang', null), cookieLang(), list, Object.keys(LOCALES));
}

// Save a choice made with the switcher: localStorage for the app, and the nf_lang cookie, which Netlify reads
// for its language redirects (a saved choice wins over the browser language there too).
export function saveLang(l) {
  store.set('lang', l);
  setCookie(l);
}

function setCookie(l) {
  document.cookie = `nf_lang=${l}; path=/; max-age=31536000; samesite=lax`;
}

// Visitors who picked a language before RSP-138 have it in localStorage only: copy it to the cookie once.
export function syncCookie() {
  const saved = store.get('lang', null);
  if (known(saved) && cookieLang() !== saved) setCookie(saved);
}

// Until RSP-183 (2026-11-11), Netlify's language redirect marked its target with ?via=lang; there a language saved
// only in localStorage (before RSP-138) won over Netlify's choice (found by Copilot code review, PR #27). The chooser
// pages that replaced the redirect already read the saved choice, so this only still matters for old links that
// carry the marker. The marker is always removed; a URL with a language and no marker is never overridden.
// Returns true when the page is moving to another language.
export function followSavedLanguage() {
  const params = new URLSearchParams(location.search);
  if (params.get('via') !== 'lang') return false;
  params.delete('via');
  const rest = params.toString();
  const saved = store.get('lang', null);
  const here = langFromPath();
  const path =
    known(saved) && here && saved !== here ? location.pathname.replace(`/${here}/`, `/${saved}/`) : location.pathname;
  const url = path + (rest ? `?${rest}` : '') + location.hash;
  if (path !== location.pathname) {
    location.replace(url);
    return true;
  }
  history.replaceState(history.state, '', url);
  return false;
}
