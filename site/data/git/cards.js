// The 24 git cards (RSP-117), in advent order (RSP-146). The order is a learning path (Maryna, 2026-11-16): week 1 moving
// in and the first box (clone … diff), week 2 the rooms (ignore, restore, stash, branches), week 3 the post (fetch …
// cherry-pick), week 4 archive and detective work (reset … tag). id = URL slug (/<lang>/git/<id>/), name = the badge label
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
// git.cards.<id> (RSP-200); pictures: RSP-191 … RSP-194.
export const GIT = [
  { id: 'clone', name: 'git clone', group: 'start', day: 1 },
  { id: 'status', name: 'git status', group: 'visit', day: 2 },
  { id: 'add', name: 'git add', group: 'home', day: 3 },
  { id: 'commit', name: 'git commit', group: 'archive', day: 4 },
  { id: 'log', name: 'git log', group: 'visit', day: 5 },
  { id: 'diff', name: 'git diff', group: 'visit', day: 6 },
  {
    id: 'gitignore',
    name: '.gitignore',
    group: 'home',
    day: 7,
    help: { list: '--user-interfaces', section: 'User-facing repository, command and file interfaces' },
  }, // a file, not a command: no "git" in front
  { id: 'restore', name: 'git restore', group: 'home', day: 8, danger: true },
  { id: 'stash', name: 'git stash', group: 'home', day: 9, help: { list: '-a', section: 'Main Porcelain Commands' } },
  { id: 'branch', name: 'git branch', group: 'archive', day: 10 },
  { id: 'switch', name: 'git switch', group: 'archive', day: 11 },
  { id: 'merge', name: 'git merge', group: 'archive', day: 12 },
  { id: 'fetch', name: 'git fetch', group: 'post', day: 13 },
  { id: 'pull', name: 'git pull', group: 'post', day: 14 },
  { id: 'push', name: 'git push', group: 'post', day: 15, danger: true },
  { id: 'show', name: 'git show', group: 'visit', day: 16 },
  {
    id: 'revert',
    name: 'git revert',
    group: 'archive',
    day: 17,
    help: { list: '-a', section: 'Main Porcelain Commands' },
  },
  {
    id: 'cherry-pick',
    name: 'git cherry-pick',
    group: 'archive',
    day: 18,
    help: { list: '-a', section: 'Main Porcelain Commands' },
  },
  { id: 'reset', name: 'git reset', group: 'archive', day: 19, danger: true },
  {
    id: 'reflog',
    name: 'git reflog',
    group: 'visit',
    day: 20,
    help: { list: '-a', section: 'Ancillary Commands / Manipulators' },
  },
  { id: 'rebase', name: 'git rebase', group: 'archive', day: 21, danger: true },
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
