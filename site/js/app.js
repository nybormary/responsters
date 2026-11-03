// Entry point: wires clicks and keys to the views and draws the first screen.
// Everything else lives in its own module; index.html only loads this file.
import { store } from './store.js';
import { $ } from './util.js';
import { state, loadLang } from './state.js';
import { renderChrome, langOpen, langClose, langKeys } from './chrome.js';
import { renderCollection } from './collection.js';
import { newRound, nextRound, renderPractice, answer, showHint } from './practice.js';
import { renderTraps, scAnswer } from './traps.js';

// Redraw the chrome and the current view.
function render() {
  renderChrome();
  if (state.view === 'collection') renderCollection();
  if (state.view === 'practice') renderPractice();
  if (state.view === 'traps') renderTraps();
}

// One click handler for the whole page: each button says what it does through a data- attribute or its id.
document.addEventListener('click', (e) => {
  const b = e.target.closest('button');
  if (!e.target.closest('#langmenu')) langClose(); // a click anywhere else closes the language menu
  // RSP-125: the title link sets #collection itself; on the Collection already the hash doesn't change, so scroll to the top.
  if (e.target.closest('.home-link') && state.view === 'collection') {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
    return;
  }
  if (!b) return;
  if (b.id === 'lang-btn') {
    // keyboard (detail 0) moves focus into the menu
    $('lang-list').hidden ? langOpen(e.detail === 0) : langClose();
  } else if (b.dataset.lang) {
    // the locale file loads on first use
    const l = b.dataset.lang;
    langClose();
    loadLang(l).then(() => {
      state.lang = l;
      store.set('lang', l);
      render();
      $('lang-btn').focus();
    });
  } else if (b.dataset.view) {
    // the hashchange listener below switches the view (RSP-114)
    location.hash = b.dataset.view;
  } else if (b.dataset.f != null) {
    state.filter = +b.dataset.f;
    renderCollection();
  } else if (b.dataset.mode) {
    state.mode = b.dataset.mode;
    renderChrome();
    newRound();
  } else if (b.dataset.ans) {
    answer(+b.dataset.ans);
  } else if (b.id === 'next') {
    nextRound();
  } else if (b.id === 'hint') {
    showHint();
  } else if (b.dataset.sc) {
    scAnswer(b.dataset.sc, +b.dataset.v);
  } else if (b.id === 'to-top') {
    // RSP-154: a button, not a link: href="#top" would change the hash and with it the tab (RSP-114).
    // Focus goes to the logo link, so the next Tab continues from the top of the page.
    document.querySelector('.home-link').focus({ preventScroll: true }); // focus first: it would stop a smooth scroll
    window.scrollTo({ top: 0, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  } else if (b.id === 'howto-open') {
    state.howtoOpen = !state.howtoOpen;
    renderChrome();
    if (state.howtoOpen) $('howto-close').focus();
  } else if (b.id === 'howto-close') {
    state.howtoOpen = false;
    store.set('howtoSeen', true);
    renderChrome();
    $('howto-open').focus();
  }
});
document.addEventListener('keydown', (e) => {
  langKeys(e);
});
// Focus leaving the language menu (e.g. Shift+Tab) closes it.
$('langmenu').addEventListener('focusout', (e) => {
  if (!$('langmenu').contains(e.relatedTarget) && e.relatedTarget) langClose();
});
// Tabs live in the URL hash (RSP-114): #collection, #practice, #traps. A tab click writes the hash, so reload,
// Back/Forward and shared links open the same tab. An empty or unknown hash opens the Collection.
const VIEWS = ['collection', 'practice', 'traps'];
const viewFromHash = () => {
  const h = location.hash.slice(1);
  return VIEWS.includes(h) ? h : 'collection';
};
window.addEventListener('hashchange', () => {
  const v = viewFromHash();
  if (v !== state.view) {
    state.view = v;
    render();
  }
});
// Start: open the view from the URL hash, if any.
state.view = viewFromHash();
render();
