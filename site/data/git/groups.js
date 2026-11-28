// Git groups (RSP-117; decided 2026-11-12, Confluence "Git cards — concept" 10387457): the official `git help`
// sections, like the HTTP status classes. help = the section as `git help` prints it (English in every language);
// c = colour token: the warm set chosen by Maryna 2026-11-28 (RSP-227), every colour ≥ 6:1 with ink #2B211A.
// The household names (Новосілля, Вдома, Візит, Горище, Пошта) are texts: i18n/<lang>.js under git.groups (RSP-200).
// The danger mark is NOT a group: it is a flag on the card (cards.js), because it appears in several groups.
export const GROUPS = {
  start: { help: 'start a working area', c: '#B8A0C0' }, // Новосілля: heather, 6.6:1 with ink
  home: { help: 'work on the current change', c: '#8FA7BF' }, // Вдома
  visit: { help: 'examine the history and state', c: '#A3AE7A' }, // Візит
  archive: { help: 'grow, mark and tweak your common history', c: '#EFE05A' }, // Горище
  post: { help: 'collaborate', c: '#DE9668' }, // Пошта
};
