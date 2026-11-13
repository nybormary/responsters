// "What's new" (RSP-145): one entry per release that changes something a visitor sees (cards, rules, pages), newest
// first. Releases with only tests, CI or docs get none. date: 'YYYY-MM' until the release day (shown as the month),
// then 'YYYY-MM-DD' (shown as the day) — set on release day, a step of the release flow. kinds: one per item, in the
// order of the texts: 'new' | 'improved' | 'fixed'. Texts (title, one line, up to 3 items) in i18n/<lang>.js under
// news.entries.<id>: plain language, what the visitor gets, no ticket numbers.
export const NEWS = [
  { id: 'footer-news', date: '2026-11', kinds: ['new', 'new', 'improved'] },
  { id: 'visitors', date: '2026-11-12', kinds: ['improved', 'improved', 'new'] },
];

export const KINDS = ['new', 'improved', 'fixed'];
