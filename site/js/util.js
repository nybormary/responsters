// Small helpers used everywhere.
export const $ = (id) => document.getElementById(id); // element by id
export const cls = (c) => Math.floor(c / 100); // 404 → 4 (status class)
export const art = (c) => `/img/${c}-art.jpg`; // creature art without the card text (absolute: pages live at /<lang>/http/…)

// Footer mail link (RSP-139, RSP-147): the subject in the page language. Written into the link by the build, no click
// handler: a script that changed the link on click stopped the mail program from opening (Maryna, 2026-11-13).
export const CONTACT = 'clapsy@mnemozoo.com';
export const contactHref = (subject) => `mailto:${CONTACT}?subject=${encodeURIComponent(subject)}`;
