// Site texts for tests. Never copy a text from the site into a test: take it from the locale file.
// A copy change then doesn't break a test. A missing translation shows English on the site (i18n/fill.js), and the
// tests expect the same (Maryna, 2026-11-20: easier to review texts before they are translated); a missing key is
// caught by `npm run check-locales`, which runs in CI before the tests, so nothing untranslated reaches production.
import { LOCALES, LANG_NAMES } from '../../site/i18n/index.js';
import en from '../../site/i18n/en.js';

export type Lang = keyof typeof LOCALES;
export type Texts = typeof en;
export const LANGS = Object.keys(LOCALES) as Lang[]; // in menu order

/** Each language's name in its own language, as the menu shows it: 'Polski', 'Dansk', … */
export const langName = (lang: Lang): string => LANG_NAMES[lang][0];

/** The same filling as i18n/fill.js, without its console warnings: English wherever the language has no text yet. */
function fillQuiet(loc: unknown, base: unknown): unknown {
  if (loc === undefined) return base;
  if (base && typeof base === 'object' && !Array.isArray(base)) {
    const l = (loc ?? {}) as Record<string, unknown>;
    return Object.fromEntries(Object.entries(base).map(([k, v]) => [k, fillQuiet(l[k], v)]));
  }
  return loc;
}

export async function textsFor(lang: Lang): Promise<Texts> {
  return fillQuiet((await LOCALES[lang]()).default, en) as Texts;
}
