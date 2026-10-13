// Locale check (RSP-85): every file in site/i18n/ must have the same keys as en.js, the same number of items
// in lists (test cases, trap situations), functions that take the same arguments, and no empty texts.
// It also checks that en.js covers every card, class, trap and tool in site/data/.
// Run from the repo root: node scripts/check-locales.mjs   (exit code 1 on any problem; a candidate for CI)
import { readdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import { dirname, join } from 'path';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const load = async p => (await import(pathToFileURL(join(SITE, p)).href));
const en = (await load('i18n/en.js')).default;
const { LOCALES } = await load('i18n/index.js');
const { D } = await load('data/cards.js');
const { PAIRS } = await load('data/traps.js');
const { TOOLS } = await load('data/links.js');

const problems = [];
function compare(base, loc, path, lang){
  if(loc === undefined){ problems.push(`${lang}: missing ${path}`); return; }
  if(typeof base === 'function'){
    if(typeof loc !== 'function') problems.push(`${lang}: ${path} must be a function`);
    else if(loc.length !== base.length) problems.push(`${lang}: ${path} takes ${loc.length} arguments, en takes ${base.length}`);
    return;
  }
  if(Array.isArray(base)){
    if(!Array.isArray(loc)) { problems.push(`${lang}: ${path} must be a list`); return; }
    if(loc.length !== base.length) problems.push(`${lang}: ${path} has ${loc.length} items, en has ${base.length}`);
    base.forEach((b,i)=>compare(b, loc[i], `${path}[${i}]`, lang));
    return;
  }
  if(base && typeof base === 'object'){
    for(const k of Object.keys(base)) compare(base[k], loc[k], path ? `${path}.${k}` : k, lang);
    for(const k of Object.keys(loc)) if(!(k in base)) problems.push(`${lang}: extra key ${path ? path+'.' : ''}${k} (not in en)`);
    return;
  }
  if(typeof loc !== 'string' || !loc.trim()) problems.push(`${lang}: ${path} is empty`);
}

// en covers the shared data
for(const d of D) if(!en.cards[d.c]) problems.push(`en: no cards.${d.c}`);
for(const n of [1,2,3,4,5]) if(!en.classes[n]) problems.push(`en: no classes.${n}`);
for(const p of PAIRS){ const k = p.codes.join('-'), tr = en.traps[k];
  if(!tr) problems.push(`en: no traps.${k}`);
  else if(tr.s.length !== p.s.length) problems.push(`en: traps.${k}.s has ${tr.s.length} situations, data/traps.js has ${p.s.length} answers`); }
if(en.tools.length !== TOOLS.length) problems.push(`en: tools has ${en.tools.length} labels, data/links.js has ${TOOLS.length} tools`);

// every locale file (listed or not) matches en
const files = readdirSync(join(SITE, 'i18n')).filter(f => /^[a-z]{2}\.js$/.test(f));
for(const f of files){
  const lang = f.slice(0,2); if(lang === 'en') continue;
  compare(en, (await load('i18n/' + f)).default, '', lang);
}
for(const l of Object.keys(LOCALES)) if(!files.includes(l + '.js')) problems.push(`index.js lists ${l}, but i18n/${l}.js doesn't exist`);

if(problems.length){ console.error(`✗ ${problems.length} problem(s):\n  ` + problems.join('\n  ')); process.exit(1); }
console.log(`✓ ${files.length} locale file(s) match en.js: ${files.join(', ')}`);
