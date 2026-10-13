// The app's shared state. Every module reads and changes it through this one object,
// e.g. state.lang = 'en'. Saved parts (lang, weight, streak, howtoSeen) come from localStorage.
import { store } from './store.js';
import { uk } from '../i18n/uk.js';
import { en } from '../i18n/en.js';

const T = { uk, en };                                           // supported languages = the keys here
export const LANGS = Object.keys(T);                            // what the language menu lists (only languages with texts)
// Each language in its own language, and the short code shown on phones (RSP-109). Add a line per new locale.
export const LANG_NAMES = { uk:['Українська','UA'], en:['English','EN'], pl:['Polski','PL'], da:['Dansk','DA'], lt:['Lietuvių','LT'] };

// Which language to show (RSP-97):
// 1. the language saved with the switcher (httpon.lang);
// 2. the first supported language in the browser list, by its first part: 'uk-UA' → 'uk', 'en-GB' → 'en';
// 3. otherwise English.
// Unsupported languages are never mapped to another one (e.g. 'ru' does not become 'uk').
// Nothing is saved here: only the switcher saves a choice.
function pickLang(){
  const saved = store.get('lang', null);
  if (Object.hasOwn(T, saved)) return saved;
  const list = navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language];
  for (const l of list){
    const code = String(l||'').toLowerCase().split('-')[0];
    if (Object.hasOwn(T, code)) return code;
  }
  return 'en';
}

export const state = {
  lang: pickLang(),                // 'uk' | 'en'
  view: 'collection',              // 'collection' | 'practice' | 'traps'
  filter: 0,                       // Collection class filter: 0 = all, 1–5 = 1xx–5xx
  mode: 'art',                     // Practice: 'art' (picture → code) | 'code' (code → creature) | 'nerd' (meaning → code, text only) | 'hard' (code → status name)
  weight: store.get('weight',{}),  // Practice: how often each code comes back (missed codes weigh more)
  streakBy: store.get('streak',{}),// correct answers in a row per code
  stats: {r:0,t:0,s:0},            // this session: right, total, current streak
  cur: null,                       // the current Practice round
  last: null,                      // code of the previous round (never repeated twice in a row)
  howtoOpen: !store.get('howtoSeen', false)   // "How to use" is shown on the first visit until dismissed
};

export const t = () => T[state.lang];                          // UI texts in the current language
export const isKnown = c => (state.streakBy[c]||0) >= 2;       // "known" = 2 correct answers in a row
