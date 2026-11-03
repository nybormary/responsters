// The card frame (RSP-45): creature art + code badge + status name, then name, move and the card line.
// Everything except the art is real text, so it is translated, readable by screen readers and the same size on every card.
// The markup itself is in render.js, shared with the generated pages.
import { t, tx, isKnown } from './state.js';
import { cardBody as body } from './render.js';

// Inner parts of one card in the current language. Used by the Collection grid and by the card detail.
export const cardBody = (d) => body(d, tx().cards[d.c].line);

// A clickable card for the Collection grid. The "known" check is decoration; screen readers hear the word instead.
export function renderCard(d) {
  const k = isKnown(d.c);
  return `<button class="card" data-open="${d.c}">${cardBody(d)}${k ? `<span class="badge" aria-hidden="true">✓</span><span class="sr">${t().known}</span>` : ''}</button>`;
}
