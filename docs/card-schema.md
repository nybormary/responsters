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
| card page sections | meaning, where you meet it, what to test, tools and read more | what it does + tip, options, careful, often confused with, "у git help: …" |
| look-alikes | trap pairs: `traps.js` | command pairs (later) |

The `$` prompt is git-only: on an HTTP card it would suggest that a code or a move is a command to run. That's why
the front line has a kind (`RUBRICS.<rubric>.front`).

## Git-only data

`site/data/git/cards.js`, one entry per card in advent order: `id`, `name`, `group`, `day` (advent day 1–24),
`danger` (the brick-red danger mark: restore, reset, rebase, push). The danger mark is a flag, not a group, because
it appears in several groups. `scripts/check-locales.mjs` checks the git data: days 1–24 once each, unique ids, known
groups, never two danger marks on neighbouring days.

## Adding a rubric

1. Add it to `site/data/rubrics.js` with its own path and its own storage prefix.
2. Put its data in `site/data/<rubric>/` and its texts under its own key in every `site/i18n/<lang>.js`.
3. Fill the shared slots; add rubric-only fields to its own data, not to the shared slots.
