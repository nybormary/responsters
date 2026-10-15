// Site texts for tests. Never copy a text from the site into a test: take it from the locale file.
// A copy change then doesn't break a test, and a missing key does.
import { LOCALES } from '../../site/i18n/index.js';
import en from '../../site/i18n/en.js';

export type Lang = keyof typeof LOCALES;
export type Texts = typeof en;
export const LANGS = Object.keys(LOCALES) as Lang[];

export async function textsFor(lang: Lang): Promise<Texts> {
  return (await LOCALES[lang]()).default as Texts;
}
