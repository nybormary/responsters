// Locale check (RSP-85): every file in site/i18n/ must have the same keys as en.js, the same number of items
// in lists (test cases, trap situations), functions that take the same arguments, and no empty texts.
// It also checks that en.js covers every card, class, trap and tool in site/data/http/, and that the git data
// in site/data/git/ is consistent (RSP-117).
// Run from the repo root: node scripts/check-locales.mjs   (exit code 1 on any problem; a candidate for CI)
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const load = async (p) => await import(pathToFileURL(join(SITE, p)).href);
const en = (await load('i18n/en.js')).default;
const { LOCALES } = await load('i18n/index.js');
const { D } = await load('data/http/cards.js');
const { PAIRS } = await load('data/http/traps.js');
const { TOOLS } = await load('data/http/links.js');
const { GIT, WALL, TILT } = await load('data/git/cards.js');
const { GROUPS } = await load('data/git/groups.js');
const { NEWS, KINDS } = await load('data/news.js');

const problems = [];
// Git cards whose pl/da/lt/et texts wait for Maryna's review of uk/en (RSP-200, decided 2026-11-27): until she
// approves uk/en locally, those languages show English (i18n/fill.js), and a gap under git.cards.<id> here is a
// warning, not a problem. The list must be EMPTY before the Git launch release (RSP-146): translate, then delete the id.
const PENDING = new Set([
  // days 1–12: the new "$" line is the most common form, its hint not translated yet
  'init',
  'clone',
  'status',
  'add',
  'log',
  'diff',
  'restore',
  'stash',
  'branch',
  'switch',
  // days 13–25: all texts but the picture's (blame's picture text also changes: a potluck dinner list)
  'merge',
  'fetch',
  'pull',
  'push',
  'tag',
  'revert',
  'cherry-pick',
  'reset',
  'reflog',
  'rebase',
  'blame',
  'bisect',
  'show',
]);
const pending = [];
const isPending = (path) => {
  const m = /^git\.cards\.([^.[]+)/.exec(path);
  return !!m && PENDING.has(m[1]);
};
function compare(base, loc, path, lang) {
  if (loc === undefined && isPending(path)) {
    pending.push(`${lang}: ${path}`);
    return;
  }
  if (loc === undefined) {
    problems.push(`${lang}: missing ${path}`);
    return;
  }
  if (typeof base === 'function') {
    if (typeof loc !== 'function') problems.push(`${lang}: ${path} must be a function`);
    else if (loc.length !== base.length)
      problems.push(`${lang}: ${path} takes ${loc.length} arguments, en takes ${base.length}`);
    return;
  }
  if (Array.isArray(base)) {
    if (!Array.isArray(loc)) {
      problems.push(`${lang}: ${path} must be a list`);
      return;
    }
    if (loc.length !== base.length) problems.push(`${lang}: ${path} has ${loc.length} items, en has ${base.length}`);
    base.forEach((b, i) => compare(b, loc[i], `${path}[${i}]`, lang));
    return;
  }
  if (base && typeof base === 'object') {
    for (const k of Object.keys(base)) compare(base[k], loc[k], path ? `${path}.${k}` : k, lang);
    for (const k of Object.keys(loc))
      if (!(k in base)) problems.push(`${lang}: extra key ${path ? path + '.' : ''}${k} (not in en)`);
    return;
  }
  if (typeof loc !== 'string' || !loc.trim()) problems.push(`${lang}: ${path} is empty`);
}

// en covers the shared data
for (const d of D) if (!en.cards[d.c]) problems.push(`en: no cards.${d.c}`);
for (const n of [1, 2, 3, 4, 5]) if (!en.classes[n]) problems.push(`en: no classes.${n}`);
for (const p of PAIRS) {
  const k = p.codes.join('-'),
    tr = en.traps[k];
  if (!tr) problems.push(`en: no traps.${k}`);
  else if (tr.s.length !== p.s.length)
    problems.push(`en: traps.${k}.s has ${tr.s.length} situations, data/http/traps.js has ${p.s.length} answers`);
}
if (en.tools.length !== TOOLS.length)
  problems.push(`en: tools has ${en.tools.length} labels, data/http/links.js has ${TOOLS.length} tools`);

// git data (RSP-117): advent days 1, 2, … once each with no gaps (cards added after the season have no day, 2026-11-17),
// the wall hangs every advent day once, known groups, unique ids, never two danger marks in a row (RSP-146)
const days = GIT.filter((g) => g.day)
  .map((g) => g.day)
  .sort((a, b) => a - b);
if (days.join() !== Array.from({ length: days.length }, (_, i) => i + 1).join())
  problems.push(`data/git/cards.js: advent days must be 1, 2, … once each (got ${days.join(', ')})`);
if ([...WALL].sort((a, b) => a - b).join() !== days.join() || TILT.length !== WALL.length)
  problems.push('data/git/cards.js: WALL must hang every advent day once, with one TILT per door');
if (new Set(GIT.map((g) => g.id)).size !== GIT.length) problems.push('data/git/cards.js: ids must be unique');
for (const g of GIT) if (!GROUPS[g.group]) problems.push(`data/git/cards.js: ${g.id} has unknown group ${g.group}`);
const dangerDays = new Set(GIT.filter((g) => g.danger).map((g) => g.day));
for (const d of dangerDays)
  if (dangerDays.has(d + 1)) problems.push(`data/git/cards.js: danger marks on days ${d} and ${d + 1} in a row`);

// "What's new" (RSP-145): en has texts for every entry, one item per kind, kinds known, dates month or day
for (const e of NEWS) {
  const t = en.news.entries[e.id];
  if (!t) problems.push(`en: no news.entries.${e.id}`);
  else if (t.items.length !== e.kinds.length)
    problems.push(
      `en: news.entries.${e.id}.items has ${t.items.length} items, data/news.js has ${e.kinds.length} kinds`,
    );
  for (const k of e.kinds) if (!KINDS.includes(k)) problems.push(`data/news.js: ${e.id} has unknown kind ${k}`);
  if (!/^\d{4}-\d{2}(-\d{2})?$/.test(e.date))
    problems.push(`data/news.js: ${e.id} date ${e.date} is not YYYY-MM or YYYY-MM-DD`);
}
for (const id of Object.keys(en.news.entries))
  if (!NEWS.some((e) => e.id === id)) problems.push(`en: news.entries.${id} has no entry in data/news.js`);

// every locale file (listed or not) matches en
const files = readdirSync(join(SITE, 'i18n')).filter((f) => /^[a-z]{2}\.js$/.test(f));
for (const f of files) {
  const lang = f.slice(0, 2);
  if (lang === 'en') continue;
  compare(en, (await load('i18n/' + f)).default, '', lang);
}
for (const l of Object.keys(LOCALES))
  if (!files.includes(l + '.js')) problems.push(`index.js lists ${l}, but i18n/${l}.js doesn't exist`);

if (pending.length)
  console.warn(
    `⚠ ${pending.length} text(s) wait for translation (RSP-200, English for now; empty the PENDING list before the Git launch): ${[...PENDING].join(', ')}`,
  );
if (problems.length) {
  console.error(`✗ ${problems.length} problem(s):\n  ` + problems.join('\n  '));
  process.exit(1);
}
console.log(`✓ ${files.length} locale file(s) match en.js: ${files.join(', ')}`);
