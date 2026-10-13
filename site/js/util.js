// Small helpers used everywhere.
export const $ = id => document.getElementById(id);   // element by id
export const cls = c => Math.floor(c/100);            // 404 → 4 (status class)
export const art = c => `img/${c}-art.jpg`;           // creature art without the card text
