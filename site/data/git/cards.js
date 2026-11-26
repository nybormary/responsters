// The git cards (RSP-117), in advent order (RSP-146). The order is a learning path (Maryna, 2026-11-16): a new flat and
// the first box (init … diff), then moving in (.gitignore, clone), the rooms (restore, stash, branches), the post
// (fetch … cherry-pick), archive and detective work (reset … tag). 2026-11-17 (Maryna): init is day 1 (a newly built
// flat), clone day 8 (a furnished rented one), so the advent has 25 days; the advent is how cards open in the season,
// not a limit of the collection. id = URL slug (/<lang>/git/<id>/), name = the badge label
// (English in every language), group = key of groups.js, day = advent day (1, 2, … with no gaps); a card added after
// the season has no day: it is not on the wall and opens together with the last advent day's next day,
// danger = the brick-red danger mark: the command changes the repository in a way that can't be undone (Maryna's rule,
// RSP-200 AC5, 2026-11-21): restore, reset --hard, push --force; a dangerous option of a calm card (stash drop/clear,
// switch --discard-changes) gets only the "Careful" box (texts: git.cards.<id>.careful), not the mark,
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
  // a newly built flat: nothing in it yet (Maryna, 2026-11-17); texts and picture to come
  { id: 'init', name: 'git init', group: 'start', day: 1, art: '/img/git/init.svg', conf: ['git clone'] },
  { id: 'status', name: 'git status', group: 'visit', day: 2, art: '/img/git/status.svg', conf: ['git diff'] },
  { id: 'add', name: 'git add', group: 'home', day: 3, art: '/img/git/add.svg', conf: ['git commit'] },
  {
    id: 'commit',
    name: 'git commit',
    group: 'archive',
    day: 4,
    art: '/img/git/commit.svg',
    conf: ['git add', 'git push'],
  },
  { id: 'log', name: 'git log', group: 'visit', day: 5, art: '/img/git/log.svg', conf: ['git show', 'git reflog'] },
  { id: 'diff', name: 'git diff', group: 'visit', day: 6, art: '/img/git/diff.svg', conf: ['git status', 'git show'] },
  {
    id: 'gitignore',
    name: '.gitignore',
    group: 'home',
    day: 7,
    art: '/img/git/gitignore.svg',
    help: { list: '--user-interfaces', section: 'User-facing repository, command and file interfaces' },
    conf: ['git rm'],
  }, // a file, not a command: no "git" in front
  {
    id: 'clone',
    name: 'git clone',
    group: 'start',
    day: 8,
    art: '/img/git/clone.svg',
    conf: ['git init', 'git pull'],
    links: [
      {
        u: 'https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo',
        label: {
          en: 'GitHub Docs: Fork a repository',
          uk: 'GitHub Docs: як зробити fork',
          pl: 'GitHub Docs: jak zrobić fork',
          da: 'GitHub Docs: sådan laver du en fork',
          lt: 'GitHub Docs: kaip padaryti fork',
          et: 'GitHub Docs: kuidas teha forki',
        },
        mark: 'github',
      },
    ],
  },
  {
    id: 'restore',
    name: 'git restore',
    group: 'home',
    day: 9,
    art: '/img/git/restore.svg',
    danger: true,
    conf: ['git reset', 'git checkout'],
  },
  {
    id: 'stash',
    name: 'git stash',
    group: 'home',
    day: 10,
    art: '/img/git/stash.svg',
    help: { list: '-a', section: 'Main Porcelain Commands' },
    conf: ['git commit'],
  },
  { id: 'branch', name: 'git branch', group: 'archive', day: 11, art: '/img/git/branch.svg', conf: ['git switch'] },
  {
    id: 'switch',
    name: 'git switch',
    group: 'archive',
    day: 12,
    art: '/img/git/switch.svg',
    conf: ['git branch', 'git checkout'],
  },
  { id: 'merge', name: 'git merge', group: 'archive', day: 13, art: '/img/git/merge.svg' },
  { id: 'fetch', name: 'git fetch', group: 'post', day: 14, art: '/img/git/fetch.svg' },
  { id: 'pull', name: 'git pull', group: 'post', day: 15, art: '/img/git/pull.svg' },
  { id: 'push', name: 'git push', group: 'post', day: 16, danger: true, art: '/img/git/push.svg' },
  { id: 'show', name: 'git show', group: 'visit', day: 17, art: '/img/git/show.svg' },
  {
    id: 'revert',
    name: 'git revert',
    group: 'archive',
    day: 18,
    help: { list: '-a', section: 'Main Porcelain Commands' },
    art: '/img/git/revert.svg',
  },
  {
    id: 'cherry-pick',
    name: 'git cherry-pick',
    group: 'archive',
    day: 19,
    help: { list: '-a', section: 'Main Porcelain Commands' },
    art: '/img/git/cherry-pick.svg',
  },
  { id: 'reset', name: 'git reset', group: 'archive', day: 20, danger: true, art: '/img/git/reset.svg' },
  {
    id: 'reflog',
    name: 'git reflog',
    group: 'visit',
    day: 21,
    help: { list: '-a', section: 'Ancillary Commands / Manipulators' },
    art: '/img/git/reflog.svg',
  },
  // no danger mark (Maryna's rule, 2026-11-21): locally a rebase can be undone via `git reflog`; it is irreversible only
  // together with `git push --force`, which is push's danger
  { id: 'rebase', name: 'git rebase', group: 'archive', day: 22, art: '/img/git/rebase.svg' },
  {
    id: 'blame',
    name: 'git blame',
    group: 'visit',
    day: 23,
    help: { list: '-a', section: 'Ancillary Commands / Interrogators' },
    art: '/img/git/blame.svg',
  },
  { id: 'bisect', name: 'git bisect', group: 'visit', day: 24, art: '/img/git/bisect.svg' },
  { id: 'tag', name: 'git tag', group: 'archive', day: 25, art: '/img/git/tag.svg' },
];

// The placeholder picture for a card whose art isn't drawn yet (RSP-199): a big egg with Maryna's handwritten note
// "This time I couldn't stop Claude from drawing", English in every language (the note is part of the picture).
// The advent wall (RSP-195): the advent days in the order the doors hang (25 → 5 × 5 on a wide screen), scattered like on a real advent calendar, and a
// small tilt per door (degrees) so the wall looks hand-hung. From the prototype on the canvas (artboard Advent).
export const WALL = [17, 3, 22, 9, 1, 14, 6, 25, 20, 11, 24, 4, 15, 8, 19, 2, 12, 23, 7, 16, 10, 5, 21, 13, 18];
export const TILT = [
  -2, 1.5, -1, 2, -1.5, 1, 0.5, -2, 1.5, -0.5, 2, -1, -2, 1.5, -1, 2, -1.5, 1, 0.5, -2, 1.5, -0.5, 2, -1, 1,
];

export const EGG = {
  src: '/img/git/egg.svg',
  alt: "A big egg wobbling on the floor, with a handwritten note on its shell: This time I couldn't stop Claude from drawing",
};

// Lookup by id: BY_ID.stash → the stash card.
export const BY_ID = Object.fromEntries(GIT.map((g) => [g.id, g]));

// The command's line from `git help` (its NAME line, git 2.43), shown in English in every language under "Read more"
// (Maryna, 2026-11-21): git help itself is English, so the reader recognises the line in the terminal.
export const ABOUT = {
  init: 'Create an empty Git repository or reinitialize an existing one',
  status: 'Show the working tree status',
  add: 'Add file contents to the index',
  commit: 'Record changes to the repository',
  log: 'Show commit logs',
  diff: 'Show changes between commits, commit and working tree, etc',
  clone: 'Clone a repository into a new directory',
  restore: 'Restore working tree files',
  stash: 'Stash the changes in a dirty working directory away',
  branch: 'List, create, or delete branches',
  switch: 'Switch branches',
  merge: 'Join two or more development histories together',
  fetch: 'Download objects and refs from another repository',
  pull: 'Fetch from and integrate with another repository or a local branch',
  push: 'Update remote refs along with associated objects',
  show: 'Show various types of objects',
  revert: 'Revert some existing commits',
  'cherry-pick': 'Apply the changes introduced by some existing commits',
  reset: 'Reset current HEAD to the specified state',
  reflog: 'Manage reflog information',
  rebase: 'Reapply commits on top of another base tip',
  blame: 'Show what revision and author last modified each line of a file',
  bisect: 'Use binary search to find the commit that introduced a bug',
  tag: 'Create, list, delete or verify a tag object signed with GPG',
  gitignore: 'Specifies intentionally untracked files to ignore',
};
