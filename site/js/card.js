// The card frame (RSP-45): creature art + code badge + status name, then name, move and the card line.
// Everything except the art is real text, so it is translated, readable by screen readers and the same size on every card.
import { CLS, clsSym } from '../data/classes.js';
import { t, tx, isKnown } from './state.js';
import { cls, art } from './util.js';

// Inner parts of one card. Used by the Collection grid (inside a button) and by the card detail.
// Only phrasing elements (span, img) so the markup is valid inside a <button>.
export function cardBody(d){
  return `<span class="cf-art"><img src="${art(d.c)}" alt="" loading="lazy"></span>
  <span class="cf-status"><span class="cf-badgerow"><span class="cf-code" style="background:${CLS[cls(d.c)].c}">${d.c}</span><span class="cf-sym">${clsSym(cls(d.c))}</span></span><span class="cf-name">${d.s}</span></span>
  <span class="cf-panel"><span class="cf-creature">${d.n}</span><span class="cf-move">${d.m}</span><span class="cf-line">${tx().cards[d.c].line}</span></span>`;
}

// A clickable card for the Collection grid. The "known" check is decoration; screen readers hear the word instead.
export function renderCard(d){
  const k = isKnown(d.c);
  return `<button class="card" data-open="${d.c}">${cardBody(d)}${k?`<span class="badge" aria-hidden="true">✓</span><span class="sr">${t().known}</span>`:''}</button>`;
}
