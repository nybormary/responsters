// RSP-220 AC2: every text size on the site comes from the font-size scale (--fs-* in site/css/base.css). A literal
// px size in a font or font-size declaration fails, unless the line says why it is exempt: "fs-exempt: <reason>"
// (decoration, a door label scaled with the door, a fluid title with clamp(), a mark drawn as text).
import { readFileSync, readdirSync } from 'node:fs';

const dir = new URL('../site/css/', import.meta.url);
const problems = [];
for (const file of readdirSync(dir).filter((f) => f.endsWith('.css') && f !== 'fonts.css')) {
  const css = readFileSync(new URL(file, dir), 'utf8');
  // one declaration may span lines (font: … , …;): read declarations, not lines
  for (const m of css.matchAll(/(?:^|[;{\s])(font(?:-size)?)\s*:([^;{}]*);([^\n]*)/g)) {
    const [, prop, value, rest] = m;
    if (/^\s*--/.test(prop)) continue;
    const literal = /\d*\.?\d+px/.test(value.replace(/var\([^)]*\)/g, ''));
    if (!literal || /fs-exempt:\s*\S/.test(rest)) continue;
    const line = css.slice(0, m.index).split('\n').length;
    problems.push(`${file}:${line}  ${prop}:${value.trim()}`);
  }
}
if (problems.length) {
  console.error(`✗ ${problems.length} font size(s) outside the scale (use var(--fs-…) or add "fs-exempt: <reason>"):`);
  for (const p of problems) console.error('  ' + p);
  process.exit(1);
}
console.log('✓ every font size comes from the scale (or says why not)');
