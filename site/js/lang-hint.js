// Language hint on the language-less pages (RSP-216). /, /http/, /http/<code>/, /git/<id>/ … show the English page
// itself (no redirect, so nothing flashes); when the visitor's language (pickLang: saved choice, nf_lang cookie,
// browser languages, never Russian) isn't English, a line under the header offers the same page in that language.
// The texts of every language are in the page (#lang-hint-texts, written by the build): these pages load no locale
// file. Closing the hint is remembered. Opening the language saves it, as a choice in the language menu does.
import { pickLang, saveLang } from './lang.js';
import { store } from './store.js';
import { esc } from './util.js';

const CLOSED = 'langHintClosed';

export function showLangHint() {
  const data = document.getElementById('lang-hint-texts');
  if (!document.documentElement.hasAttribute('data-bare') || !data) return;
  if (store.get(CLOSED, false)) return;
  const lang = pickLang();
  const t = JSON.parse(data.textContent)[lang];
  if (lang === 'en' || !t) return;
  const href = `/${lang}${location.pathname}${location.search}${location.hash}`;
  const hint = document.createElement('aside');
  hint.className = 'lang-hint';
  hint.lang = lang;
  hint.setAttribute('aria-label', t.label);
  hint.dataset.testid = 'lang-hint';
  hint.innerHTML = `<p>${esc(t.text)}</p><a class="lang-hint-open" href="${esc(href)}" hreflang="${lang}" data-testid="lang-hint-open">${esc(t.open)}</a><button type="button" class="lang-hint-close" aria-label="${esc(t.close)}" data-testid="lang-hint-close"><span aria-hidden="true">×</span></button>`;
  hint.querySelector('a').addEventListener('click', () => saveLang(lang));
  hint.querySelector('button').addEventListener('click', () => {
    store.set(CLOSED, true);
    hint.remove();
  });
  const header = document.querySelector('.site-header');
  if (header) header.after(hint);
  else document.body.prepend(hint);
}

/** The app left the language-less address (a language was picked in its menu): the hint has done its job. */
export function hideLangHint() {
  document.querySelector('[data-testid="lang-hint"]')?.remove();
}
