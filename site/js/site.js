// Shared script of the pages built by scripts/build-pages.mjs (RSP-156, RSP-155, RSP-148): the home page, the card
// pages and the 404 page.
// The language menu there is a <details> with plain links (works without JS); a click on a
// language also saves it, like the switcher in the app, so the next language-less visit uses it (RSP-138).
import { saveLang, followSavedLanguage, langFromPath, syncCookie } from './lang.js';

// Old links to the app (/#collection, /#practice, /#traps) now land on the home page /<lang>/ with the same hash
// (dist/_redirects, chooser page at /): send them on to the app /<lang>/http/ (RSP-138, RSP-156).
const OLD_APP_HASHES = ['#collection', '#practice', '#traps'];

function followOldAppLink() {
  const lang = langFromPath();
  if (!lang || location.pathname !== `/${lang}/` || !OLD_APP_HASHES.includes(location.hash)) return;
  location.replace(`/${lang}/http/${location.hash}`);
}

// Page for a missing address (RSP-148): the build links the language menu to the home pages (works without JS).
// With JS the menu keeps the address, as on every other page: /uk/foo → /pl/foo, /foo → /pl/foo. That address is
// still missing, so Netlify answers 404 again, now in the picked language. Not /pl/404.html: a real file, status 200.
function keepAddressInLangMenu() {
  if (!document.querySelector('[data-testid="not-found-page"]')) return;
  const here = langFromPath();
  const rest = here ? location.pathname.slice(here.length + 1) : location.pathname;
  for (const a of document.querySelectorAll('.langlist a[lang]')) {
    a.setAttribute('href', `/${a.getAttribute('lang')}${rest}${location.search}${location.hash}`);
  }
}
keepAddressInLangMenu();

// A language saved before RSP-138 lives only in localStorage: copy it to the nf_lang cookie, as the app does, so the
// next language-less visit is redirected by Netlify straight to it (found by Copilot code review, PR #30).
syncCookie();
if (!followSavedLanguage()) followOldAppLink();

document.addEventListener('click', (e) => {
  const a = e.target instanceof Element ? e.target.closest('.langlist a[lang]') : null;
  if (a) saveLang(a.getAttribute('lang'));
});
