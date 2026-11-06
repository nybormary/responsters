// The card frame (RSP-45): creature art + code badge + status name, then name, move and the card line.
// Everything except the art is real text, so it is translated, readable by screen readers and the same size on every card.
// The markup itself is in render.js, shared with the generated pages.
import { state, t, tx, isKnown } from './state.js';
import { cardBody as body } from './render.js';

// Inner parts of one card in the current language. Used by the Collection grid and by the card detail.
export const cardBody = (d) => body(d, tx().cards[d.c].line);

// A card in the Collection grid: a link to its card page /<lang>/http/<code>/ (RSP-90), a real page instead of a modal.
// The "known" check is decoration; screen readers hear the word instead.
export function renderCard(d) {
  const k = isKnown(d.c);
  return `<a class="card" href="/${state.lang}/http/${d.c}/" data-testid="card-${d.c}">${cardBody(d)}${k ? `<span class="badge" aria-hidden="true">✓</span><span class="sr">${t().known}</span>` : ''}</a>`;
}
