// Pure markup for a card and its links (RSP-90): no DOM and no app state, so the app in the browser
// and the page build (scripts/build-pages.mjs) make the same HTML from the same data.
import { CLS, clsSym } from '../data/classes.js';
import { BY } from '../data/cards.js';
import { TOOLS, REF, MORE } from '../data/links.js';
import { cls, art } from './util.js';

// Text for HTML: & < > " become entities.
export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// Inner parts of one card: art, code badge + status name, then name, move and the card line.
// Only phrasing elements (span, img) so the markup is valid inside a <button>.
// alt: text for the art; '' (decoration) in the Collection grid, where the card's own text says it all.
export function cardBody(d, line, alt = '') {
  return `<span class="cf-art"><img src="${art(d.c)}" alt="${esc(alt)}" loading="lazy" data-testid="card-art"></span>
  <span class="cf-status"><span class="cf-badgerow"><span class="cf-code" style="background:${CLS[cls(d.c)].c}">${d.c}</span><span class="cf-sym">${clsSym(cls(d.c))}</span></span><span class="cf-name">${d.s}</span></span>
  <span class="cf-panel"><span class="cf-creature">${d.n}</span><span class="cf-move">${d.m}</span><span class="cf-line">${line}</span></span>`;
}

// Links for one code, in order: RFC section → MDN page → extra links → general tools.
// toolLabels: the tools' names in the page language (i18n tools), same order as TOOLS.
export function cardLinks(c, lang, toolLabels) {
  const r = REF[c],
    d = BY[c],
    out = [];
  if (r) out.push({ label: `RFC ${r[0]} §${r[1]}`, u: `https://www.rfc-editor.org/rfc/rfc${r[0]}#section-${r[1]}` });
  out.push({ label: `MDN: ${c} ${d.s}`, u: `https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/${c}` });
  const more = (MORE[c] || []).map((x) => ({ label: x.label[lang] || x.label.en, u: x.u }));
  return out.concat(
    more,
    TOOLS.map((x, i) => ({ label: toolLabels[i], u: x.u })),
  );
}
