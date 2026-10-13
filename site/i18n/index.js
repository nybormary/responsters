// Languages the site offers (RSP-85). Only locales that are complete go here: node scripts/check-locales.mjs
// compares every file with en.js. To add a language: create i18n/<code>.js, run the check, add one line to each list.
// Files are loaded on demand, so a visitor downloads only English (the fallback) and their own language.
export const LOCALES = {
  uk: () => import('./uk.js'),
  en: () => import('./en.js'),
};
// Each language in its own language, and the short code shown on phones (RSP-109).
export const LANG_NAMES = { uk:['Українська','UA'], en:['English','EN'], pl:['Polski','PL'], da:['Dansk','DA'], lt:['Lietuvių','LT'] };
