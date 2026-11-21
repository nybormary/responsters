# Card schema (RSP-117)

One schema for every rubric (HTTP now, git next, more later). Rubrics share the **slots** of a card, not their
presentation: each rubric decides how a slot looks. Decided 2026-11-13 (Jira RSP-117).

## Where things live

| What | Where |
| --- | --- |
| The list of rubrics: URL path, data folder, storage prefix, front-line kind | `site/data/rubrics.js` |
| A rubric's data (cards, groups, rubric-only data) | `site/data/<rubric>/` — `http/`, `git/` |
| Texts in every language | `site/i18n/<lang>.js`: HTTP under `cards`, `classes`, `traps`; git under `git` |
| Progress and settings in the browser | localStorage, `<prefix>.<key>`; prefix per rubric: `httpon.` (HTTP, also the saved language), `gitty.` (git) |
| URLs | `/<lang>/<path>/` (rubric page), `/<lang>/<path>/<id>/` (card page) |

Data is English and language-free (codes, command names, group keys, flags). Everything a visitor reads in their
language is a text in `i18n/<lang>.js`.

## Shared slots

| Slot | HTTP (`site/data/http/`) | Git (`site/data/git/`) |
| --- | --- | --- |
| id (URL) | code: `404` | slug: `stash`, `cherry-pick`; `.gitignore` → `gitignore` |
| badge | code, round badge over the art | `name` (`git stash`, `.gitignore`), one-line label under the art |
| group (badge colour) | status class 1xx–5xx: `classes.js` | `git help` section: `groups.js` (start, home, visit, archive, post) |
| line under the badge | status name (`s`) | group's household name (text: `git.groups.<key>`) |
| title | creature name (`n`) | scene title (text) |
| front line | kind `move`: the move as a pill, **no `$`** (`m`) | kind `command`: `$ …` + short explanation (texts; may differ from the name, e.g. `$ git status -s`) |
| card line | `cards.<code>.line` | household caption, written by Maryna (text) |
| picture description (alt) | `cards.<code>.art` | text |
| card page sections | meaning, where you meet it, what to test, tools and read more | what it does, options, careful, often confused with, "у git help: …", tip, read more |
| look-alikes | trap pairs: `traps.js` | `conf`: commands often confused with it (`cards.js`) |

The `$` prompt is git-only: on an HTTP card it would suggest that a code or a move is a command to run. That's why
the front line has a kind (`RUBRICS.<rubric>.front`).

## Git-only data

`site/data/git/cards.js`, one entry per card in advent order: `id`, `name`, `group`, `day` (advent day 1, 2, … with no gaps; 25 days since init joined on 2026-11-17; a card added after the season has no day and opens the day after the advent),
`danger` (the brick-red danger mark: the command changes the repository in a way that can't be undone — restore, reset, push; a calm card with a dangerous option, e.g. stash drop, gets only "Careful"). The danger mark is a flag, not a group, because
it appears in several groups. `scripts/check-locales.mjs` checks the git data: advent days 1, 2, … once each, the wall (`WALL`, `TILT`) hangs every advent day once, unique ids, known
groups, never two danger marks on neighbouring days.

Optional per card: `help` (where `git help` lists a command outside its short list: `{ list: '-a', section }`; the
others show their group's section), `art` (the picture; without it the placeholder egg `EGG`), `vigs` (pictures for the
options, only where drawn), `conf`, `links` ("Read more": `u`, `label` per language with English as the fallback,
optional `mark: 'github'` = GitHub's own logo file, unchanged, `site/img/brand/`). The build stops when a picture it names is missing in `site/`.

## Git card page (RSP-199)

`/<lang>/git/<id>/`, built by `scripts/build-pages.mjs` with the markup of `site/js/gitcard.js` and the styles of
`site/css/git.css`, in the HTTP card page layout: the card | what it does, options, careful (danger cards) |
often confused with, in git help, tip, read more (the tip moved to the side column in the RSP-200 review). A section shows only when its texts exist, so a card builds before its texts.

Texts per card, `git.cards.<id>` in every `site/i18n/<lang>.js` (RSP-200; added for all languages together, the build
reads the keys from `en.js`): `title`, `line` (caption), `move` + `hint` (the `$` line), `art` (picture description),
`does: { text, meta }`, `tip`, `opts: [{ cmd, text, meta, vig? }]`, `careful: [paragraphs, the first in bold]`.
`text` is the technical explanation, `meta` the one sentence with the household metaphor; `` `code` `` marks commands.

Search engines see a card page from its advent day on: the build compares `day` with the build date (Copenhagen
time; `BUILD_DATE=YYYY-MM-DD` pins it). Days not reached yet: `noindex`, not in `sitemap.xml`. So each deploy in
December opens the days reached by then, the first deploy after the advent all of them.

## Adding a rubric

1. Add it to `site/data/rubrics.js` with its own path and its own storage prefix.
2. Put its data in `site/data/<rubric>/` and its texts under its own key in every `site/i18n/<lang>.js`.
3. Fill the shared slots; add rubric-only fields to its own data, not to the shared slots.

## Advent wall and start (RSP-195)

`/<lang>/git/` shows one door per advent day (25: 5 × 5 on a wide screen; on a phone 4 in a row with today's door big above) in the order of `WALL` (with `TILT`, both in `cards.js`). Day N opens `ADVENT_START`
+ (N−1) days; `ADVENT_START` is a build setting (default `2026-12-01`, deploy previews `2026-11-01` in `netlify.toml`).
The build writes each door's state and the home page's Git enclosure as on the build date (`BUILD_DATE`): that is
what search engines and visitors without JS get, and it decides `noindex` and the sitemap. `site/js/advent.js`
repaints both by the visitor's own date, so nothing needs a deploy on the day a door opens.
