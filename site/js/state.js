// The app's shared state. Every module reads and changes it through this one object,
// e.g. state.lang = 'en'. Saved parts (lang, weight, streak, howtoSeen) come from localStorage.
import { store } from './store.js';
import { langFromPath, pickLang } from './lang.js';
import { LOCALES, LANG_NAMES } from '../i18n/index.js';
import en from '../i18n/en.js';
import { fill } from '../i18n/fill.js';

export { LANG_NAMES };
export const LANGS = Object.keys(LOCALES); // what the language menu lists (only complete locales)

// Which language to show (RSP-97, RSP-138): the language in the URL (/uk/http/) wins; on a language-less
// path the saved choice, then the browser language (lang.js). Opening a URL never saves a choice:
// only the switcher does.
export const state = {
  lang: langFromPath() || pickLang(), // a key of LOCALES: 'uk' | 'en' | …
  view: 'collection', // 'collection' | 'practice' | 'traps'
  filter: 0, // Collection class filter: 0 = all, 1–5 = 1xx–5xx
  mode: 'art', // Practice: 'art' (picture → code) | 'code' (code → creature) | 'nerd' (meaning → code, text only) | 'hard' (code → status name)
  weight: store.get('weight', {}), // Practice: how often each code comes back (missed codes weigh more)
  streakBy: store.get('streak', {}), // correct answers in a row per code
  stats: { r: 0, t: 0, s: 0 }, // this session: right, total, current streak
  cur: null, // the current Practice round
  last: null, // code of the previous round (never repeated twice in a row)
  howtoOpen: !store.get('howtoSeen', false), // "How to use" is shown on the first visit until dismissed
};

// Texts (RSP-85). Each locale is loaded once and filled up from English (i18n/fill.js).
const TX = { en };
export async function loadLang(lang) {
  if (!TX[lang]) TX[lang] = fill((await LOCALES[lang]()).default, en, '', lang);
}
await loadLang(state.lang);
export const tx = () => TX[state.lang]; // all texts in the current language: ui, classes, cards, qa, traps, tools
export const t = () => tx().ui; // UI texts in the current language
export const isKnown = (c) => (state.streakBy[c] || 0) >= 2; // "known" = 2 correct answers in a row
