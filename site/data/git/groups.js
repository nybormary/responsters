// Git groups (RSP-117; decided 2026-11-12, Confluence "Git cards — concept" 10387457): the official `git help`
// sections, like the HTTP status classes. help = the section as `git help` prints it (English in every language);
// c = colour token. The household names (Новосілля, Вдома, Візит, Родинний архів, Пошта) are texts: i18n/<lang>.js
// under git.groups (RSP-200).
// The danger mark is NOT a group: it is a flag on the card (cards.js), because it appears in several groups.
export const GROUPS = {
  start: { help: 'start a working area', c: null }, // Новосілля: colour still to choose (RSP-200; not red, ≥ 4.5:1 with ink)
  home: { help: 'work on the current change', c: '#7E9CCB' }, // Вдома
  visit: { help: 'examine the history and state', c: '#8DB07A' }, // Візит
  archive: { help: 'grow, mark and tweak your common history', c: '#E2B84A' }, // Родинний архів
  post: { help: 'collaborate', c: '#E39258' }, // Пошта
};
