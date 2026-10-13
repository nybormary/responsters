// Entry point: wires clicks and keys to the views and draws the first screen.
// Everything else lives in its own module; index.html only loads this file.
import { store } from './store.js';
import { $ } from './util.js';
import { state } from './state.js';
import { renderChrome } from './chrome.js';
import { renderCollection } from './collection.js';
import { openCard, closeModal } from './detail.js';
import { newRound, renderPractice, answer } from './practice.js';
import { renderTraps, scAnswer } from './traps.js';

// Redraw the chrome and the current view.
function render(){ renderChrome(); if(state.view==='collection') renderCollection(); if(state.view==='practice') renderPractice(); if(state.view==='traps') renderTraps(); }

// One click handler for the whole page: each button says what it does through a data- attribute or its id.
document.addEventListener('click', e=>{
  const b = e.target.closest('button'); if(!b){ if(e.target.id==='modal') closeModal(); return; }
  if(b.dataset.lang){ state.lang=b.dataset.lang; store.set('lang',state.lang); render(); }
  else if(b.dataset.view){ state.view=b.dataset.view; render(); }
  else if(b.dataset.f!=null){ state.filter=+b.dataset.f; renderCollection(); }
  else if(b.dataset.mode){ state.mode=b.dataset.mode; renderChrome(); newRound(); }
  else if(b.dataset.ans){ answer(+b.dataset.ans); }
  else if(b.id==='next'){ newRound(); }
  else if(b.dataset.sc){ scAnswer(b.dataset.sc, +b.dataset.v); }
  else if(b.dataset.open){ openCard(+b.dataset.open); }
  else if(b.id==='m-close' || b.id==='m-back'){ closeModal(); }
  else if(b.id==='howto-open'){ state.howtoOpen=!state.howtoOpen; renderChrome(); if(state.howtoOpen) $('howto-close').focus(); }
  else if(b.id==='howto-close'){ state.howtoOpen=false; store.set('howtoSeen',true); renderChrome(); $('howto-open').focus(); }
});
document.addEventListener('keydown', e=>{ if(e.key==='Escape' && !$('modal').hidden) closeModal(); });
// Start: open the view from the URL hash (#practice, #traps), if any.
const h = location.hash.slice(1); if(['collection','practice','traps'].includes(h)) state.view = h;
render();
