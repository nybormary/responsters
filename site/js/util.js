import { IMG_V } from './img-v.js';

// Small helpers used everywhere.
export const $ = (id) => document.getElementById(id); // element by id
export const cls = (c) => Math.floor(c / 100); // 404 → 4 (status class)
// Text for HTML: & < > " become entities.
export const esc = (s) =>
  String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
// A picture URL with the build's version (RSP-228): imgUrl('/img/404-art.jpg') → '/img/404-art.jpg?v=500f081'.
export const imgUrl = (p) => (IMG_V ? `${p}?v=${IMG_V}` : p);
export const art = (c) => imgUrl(`/img/${c}-art.jpg`); // creature art without the card text (absolute: pages live at /<lang>/http/…)

// Calendar days as YYYY-MM-DD strings (RSP-195, RSP-196): the advent start, a door's day, the visitor's today. Strings
// compare in date order, and there is no time of day to go wrong with time zones.
/** The day `n` days after `iso`: addDays('2026-12-01', 23) → '2026-12-24'. */
export const addDays = (iso, n) => new Date(Date.parse(`${iso}T00:00:00Z`) + n * 864e5).toISOString().slice(0, 10);
/** Today in the visitor's own time zone (the advent opens by the visitor's date, not the server's). */
export function localToday(now = new Date()) {
  const two = (n) => String(n).padStart(2, '0');
  return `${now.getFullYear()}-${two(now.getMonth() + 1)}-${two(now.getDate())}`;
}
// English dates in the British order ("1 December"), like the rest of the English texts.
const DATE_LOCALE = { en: 'en-GB' };
/** Day and month in the page language: dayMonth('uk', '2026-12-01') → '1 грудня', 'lt' → 'gruodžio 1 d.'. */
export const dayMonth = (lang, iso) =>
  new Intl.DateTimeFormat(DATE_LOCALE[lang] || lang, { day: 'numeric', month: 'long', timeZone: 'UTC' }).format(
    new Date(`${iso}T00:00:00Z`),
  );

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
