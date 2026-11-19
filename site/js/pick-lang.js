// The visitor's language when the URL doesn't say it (RSP-97, RSP-138); one source for the rules (RSP-216), used by
// js/lang.js. On a language-less page it decides whether the language hint shows (js/lang-hint.js). Pure: only its
// arguments, no imports.
// 1. the language saved with the switcher (localStorage, then the nf_lang cookie);
// 2. the first supported language in the browser list, by its first part: 'uk-UA' → 'uk', 'en-GB' → 'en';
// 3. otherwise English.
// Unsupported languages are never mapped to another one (e.g. 'ru' does not become 'uk').
export function pickFrom(saved, cookie, list, known) {
  if (known.indexOf(saved) >= 0) return saved;
  if (known.indexOf(cookie) >= 0) return cookie;
  for (var i = 0; i < list.length; i++) {
    var code = String(list[i] || '')
      .toLowerCase()
      .split('-')[0];
    if (known.indexOf(code) >= 0) return code;
  }
  return 'en';
}
