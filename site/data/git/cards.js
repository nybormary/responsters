// The 24 git cards (RSP-117), in advent order (RSP-146): id = URL slug (/<lang>/git/<id>/), name = the badge label
// (English in every language), group = key of groups.js, day = advent day (1–24),
// danger = the brick-red danger mark (restore, reset --hard, rebase, push --force),
// help = where `git help` lists a command that is NOT in its short list (the others: their group's section, groups.js):
// list = which help prints it ('-a' → `git help -a`, '--user-interfaces' → `git help --user-interfaces`), section = the
// heading there (checked with git 2.43, 2026-11-15),
// art = the picture (path under site/); a card without it shows the placeholder egg EGG (RSP-199), so swapping in the
// real picture is this one field; vigs = pictures for the page's options, same order as git.cards.<id>.opts (only
// where drawn); conf = commands often confused with this one (a command with its own card links to its page).
// The "$" line is a text, not data: it can differ from the name (status: "$ git status -s").
// Texts (scene title, caption, "$" line and its explanation, page sections, picture description) are in i18n/<lang>.js under
// git.cards.<id> (RSP-200); pictures: RSP-191 … RSP-194. The day list comes from the project doc git-illustrations.md.
export const GIT = [
  { id: 'status', name: 'git status', group: 'visit', day: 1 },
  { id: 'add', name: 'git add', group: 'home', day: 2 },
  { id: 'fetch', name: 'git fetch', group: 'post', day: 3 },
  { id: 'commit', name: 'git commit', group: 'archive', day: 4 },
  { id: 'pull', name: 'git pull', group: 'post', day: 5 },
  { id: 'log', name: 'git log', group: 'visit', day: 6 },
  { id: 'restore', name: 'git restore', group: 'home', day: 7, danger: true },
  { id: 'branch', name: 'git branch', group: 'archive', day: 8 },
  { id: 'reset', name: 'git reset', group: 'archive', day: 9, danger: true },
  { id: 'switch', name: 'git switch', group: 'archive', day: 10 },
  {
    id: 'revert',
    name: 'git revert',
    group: 'archive',
    day: 11,
    help: { list: '-a', section: 'Main Porcelain Commands' },
  },
  { id: 'diff', name: 'git diff', group: 'visit', day: 12 },
  { id: 'merge', name: 'git merge', group: 'archive', day: 13 },
  { id: 'clone', name: 'git clone', group: 'start', day: 14 },
  { id: 'rebase', name: 'git rebase', group: 'archive', day: 15, danger: true },
  { id: 'stash', name: 'git stash', group: 'home', day: 16, help: { list: '-a', section: 'Main Porcelain Commands' } },
  { id: 'show', name: 'git show', group: 'visit', day: 17 },
  {
    id: 'cherry-pick',
    name: 'git cherry-pick',
    group: 'archive',
    day: 18,
    help: { list: '-a', section: 'Main Porcelain Commands' },
  },
  {
    id: 'gitignore',
    name: '.gitignore',
    group: 'home',
    day: 19,
    help: { list: '--user-interfaces', section: 'User-facing repository, command and file interfaces' },
  }, // a file, not a command: no "git" in front
  { id: 'push', name: 'git push', group: 'post', day: 20, danger: true },
  {
    id: 'reflog',
    name: 'git reflog',
    group: 'visit',
    day: 21,
    help: { list: '-a', section: 'Ancillary Commands / Manipulators' },
  },
  {
    id: 'blame',
    name: 'git blame',
    group: 'visit',
    day: 22,
    help: { list: '-a', section: 'Ancillary Commands / Interrogators' },
  },
  { id: 'bisect', name: 'git bisect', group: 'visit', day: 23 },
  { id: 'tag', name: 'git tag', group: 'archive', day: 24 },
];

// The placeholder picture for a card whose art isn't drawn yet (RSP-199): a big egg with Maryna's handwritten note
// "This time I couldn't stop Claude from drawing", English in every language (the note is part of the picture).
export const EGG = {
  src: '/img/git/egg.svg',
  alt: "A big egg wobbling on the floor, with a handwritten note on its shell: This time I couldn't stop Claude from drawing",
};

// Lookup by id: BY_ID.stash → the stash card.
export const BY_ID = Object.fromEntries(GIT.map((g) => [g.id, g]));
