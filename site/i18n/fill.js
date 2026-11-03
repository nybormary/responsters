// Fill a locale up from English (RSP-85): a missing key shows the English text and logs a warning,
// so a half-done translation never breaks the page. Used by the app (js/state.js) and by the page build
// (scripts/build-pages.mjs), so both show the same texts.
export function fill(loc, base, path, lang) {
  if (loc === undefined) {
    console.warn(`[i18n] ${lang}: missing ${path}, using English`);
    return base;
  }
  if (base && typeof base === 'object' && !Array.isArray(base)) {
    const out = {};
    for (const k of Object.keys(base)) out[k] = fill(loc[k], base[k], path ? `${path}.${k}` : k, lang);
    return out;
  }
  return loc;
}
