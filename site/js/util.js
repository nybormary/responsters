// Small helpers used everywhere.
export const $ = (id) => document.getElementById(id); // element by id
export const cls = (c) => Math.floor(c / 100); // 404 → 4 (status class)
export const art = (c) => `/img/${c}-art.jpg`; // creature art without the card text (absolute: pages live at /<lang>/http/…)

// Footer mail link (RSP-139, RSP-147): the subject in the page language and, when known, the page the visitor writes
// from, so a bug report says where the bug is. The build writes the address it knows; a click puts in the address
// actually open (the app's tab, a missing page's path). No form, no service: the visitor's own mail program.
export const CONTACT = 'clapsy@mnemozoo.com';
export const contactHref = (subject, label, url) =>
  `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}` +
  (url ? `&body=${encodeURIComponent(`${label}: ${url}`)}` : '');
export function contactOnClick(e) {
  const a = e.target instanceof Element ? e.target.closest('[data-testid="foot-contact"]') : null;
  if (a instanceof HTMLAnchorElement) a.href = contactHref(a.dataset.subject, a.dataset.page, location.href);
}
