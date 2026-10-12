// The app's shared state. Every module reads and changes it through this one object,
// e.g. state.lang = 'en'. Saved parts (lang, weight, streak, howtoSeen) come from localStorage.
import { store } from './store.js';
import { uk } from '../i18n/uk.js';
import { en } from '../i18n/en.js';

export const state = {
  lang: store.get('lang','uk'),    // 'uk' | 'en'
  view: 'collection',              // 'collection' | 'practice' | 'traps'
  filter: 0,                       // Collection class filter: 0 = all, 1–5 = 1xx–5xx
  mode: 'art',                     // Practice: 'art' (picture → code) | 'code' (code → creature)
  weight: store.get('weight',{}),  // Practice: how often each code comes back (missed codes weigh more)
  streakBy: store.get('streak',{}),// correct answers in a row per code
  stats: {r:0,t:0,s:0},            // this session: right, total, current streak
  cur: null,                       // the current Practice round
  last: null,                      // code of the previous round (never repeated twice in a row)
  howtoOpen: !store.get('howtoSeen', false)   // "How to use" is shown on the first visit until dismissed
};

const T = { uk, en };
export const t = () => T[state.lang];                          // UI texts in the current language
export const isKnown = c => (state.streakBy[c]||0) >= 2;       // "known" = 2 correct answers in a row
