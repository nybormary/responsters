// Which language a page is in, and the visitor's saved choice (RSP-97, URL per language RSP-138).
// Shared by the app (state.js, app.js) and the small chooser pages at the language-less URLs
// (/, /http/, /http/<code>/), which the page build writes for local runs; Netlify redirects those URLs itself.
import { store } from './store.js';
import { LOCALES } from '../i18n/index.js';

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

// The visitor's language when the URL doesn't say it:
// 1. the language saved with the switcher (localStorage httpon.lang, then the nf_lang cookie);
// 2. the first supported language in the browser list, by its first part: 'uk-UA' → 'uk', 'en-GB' → 'en';
// 3. otherwise English.
// Unsupported languages are never mapped to another one (e.g. 'ru' does not become 'uk').
export function pickLang() {
  const saved = store.get('lang', null);
  if (known(saved)) return saved;
  const c = cookieLang();
  if (c) return c;
  const list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const l of list) {
    const code = String(l || '')
      .toLowerCase()
      .split('-')[0];
    if (known(code)) return code;
  }
  return 'en';
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
