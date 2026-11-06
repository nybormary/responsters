// Shared script of the pages built by scripts/build-pages.mjs (RSP-156, RSP-155): the home page and the card pages.
// The language menu there is a <details> with plain links (works without JS); a click on a
// language also saves it, like the switcher in the app, so the next language-less visit uses it (RSP-138).
import { saveLang, followSavedLanguage, langFromPath } from './lang.js';

// Old links to the app (/#collection, /#practice, /#traps) now land on the home page /<lang>/ with the same hash
// (dist/_redirects, chooser page at /): send them on to the app /<lang>/http/ (RSP-138, RSP-156).
const OLD_APP_HASHES = ['#collection', '#practice', '#traps'];

function followOldAppLink() {
  const lang = langFromPath();
  if (!lang || location.pathname !== `/${lang}/` || !OLD_APP_HASHES.includes(location.hash)) return;
  location.replace(`/${lang}/http/${location.hash}`);
}

if (!followSavedLanguage()) followOldAppLink();

document.addEventListener('click', (e) => {
  const a = e.target instanceof Element ? e.target.closest('.langlist a[lang]') : null;
  if (a) saveLang(a.getAttribute('lang'));
});
