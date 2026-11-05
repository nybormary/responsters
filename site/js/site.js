// Shared script of the pages built by scripts/build-pages.mjs (RSP-156): the home page now, the card pages
// with RSP-155. The language menu there is a <details> with plain links (works without JS); a click on a
// language also saves it, like the switcher in the app, so the next language-less visit uses it (RSP-138).
import { saveLang, followSavedLanguage } from './lang.js';

followSavedLanguage();

document.addEventListener('click', (e) => {
  const a = e.target instanceof Element ? e.target.closest('.langlist a[lang]') : null;
  if (a) saveLang(a.getAttribute('lang'));
});
