# How to run and report UI tests

This file is the source of truth. The Confluence page "How to run and report UI tests" mirrors it and adds a part for people; change this file, not the mirror (rule: `.github/copilot-instructions.md`, "Documentation: repo first, Confluence mirrors").

It is written so it can become a Claude skill: each variant says when to use it, what it needs, the command, and how to tell it worked.

## Purpose

Run the Playwright UI tests against the right copy of the site and record the result in testomat.io, so every check leaves a trustworthy artifact: who ran what, where, when, with which result.

## Before you start

- Node installed; in the repo: `npm install` (again after any change to `package.json`).
- Browser for Playwright, once: `npx playwright install chromium`.
- You are on the right commit: `git status` clean, `git log --oneline -1` shows what you expect.
- Variants 8–11: the testomat.io project API key (project settings in testomat.io). Never paste it into a chat, a file or a commit.

By default every test gets a **random site language** (`uk`, `en`, `pl`, `da`, `lt`, `et`) and a **random screen size** (`desktop-1280`, `tablet-600`, `edge-599`, `phone-375`). The report shows both for each test. Variants 5–7 pin them.

The site address and the testomat.io environment come from the target in `tests/targets.ts`; you never type a URL or `Target:…` by hand.

## Pick your run

| # | Variant | When | Goes to testomat.io |
|---|---------|------|---------------------|
| 1 | [Before a commit](#1-before-a-commit) | Before a commit that touches `site/` or `tests/` | No |
| 2 | [One group while working on an area](#2-one-group-while-working-on-an-area) | Quick look while you work on one part of the site | No |
| 3 | [New or changed spec](#3-new-or-changed-spec) | Before committing a new or changed spec | No |
| 4 | [All screens](#4-all-screens) | After CSS changes, before a release | No |
| 5 | [One screen size](#5-one-screen-size) | Check one screen size, e.g. after a phone layout change | No |
| 6 | [One language](#6-one-language) | Check one language, e.g. after changing a locale file | No |
| 7 | [Repeat a failure exactly](#7-repeat-a-failure-exactly) | A test failed and you want the same conditions again | No |
| 8 | [Deploy preview of a PR](#8-deploy-preview-of-a-pr) | A PR is open and its Netlify check is green | Yes |
| 9 | [Production after a release](#9-production-after-a-release) | After a merge, the production deploy is live | Yes |
| 10 | [Production smoke](#10-production-smoke) | Quick production check without a release, e.g. after a config change | Yes |
| 11 | [Late production check](#11-late-production-check) | A release went out without a recorded check | Yes |

Replace only the parts in `<angle brackets>`. Variants 8–11 report to testomat.io; the lines they share are explained in [Reporting lines](#reporting-lines).

### 1. Before a commit

- **When:** before a commit that touches `site/` or `tests/`.
- **Runs against:** your local copy (Playwright starts `npx serve site` itself).
- **Tests / language / screen:** all; random.
- **Needs:** `npm install` done; `git status` shows what you plan to commit.

```sh
npm run typecheck && npm test
```

- **Check:** Playwright prints `N passed`, nothing failed or flaky. If something failed: `npx playwright show-report`, then variant 7.

### 2. One group while working on an area

- **When:** quick look while you work on one part of the site.
- **Runs against:** your local copy.
- **Tests / language / screen:** one group: `@collection`, `@practice`, `@traps`, `@language`, `@progress`, `@navigation`; random.
- **Needs:** nothing extra.

```sh
npm test -- --grep @<group>
```

- **Check:** the group passes. This is not a replacement for variant 1 before the commit.

### 3. New or changed spec

- **When:** before committing a new or changed spec.
- **Runs against:** your local copy.
- **Tests / language / screen:** all, every test 3× in random order (finds tests that depend on each other); random.
- **Needs:** nothing extra.

```sh
npm run test:shuffle
```

- **Check:** all repeats pass. A test that fails only in some orders depends on another test: fix it before the commit. To repeat the same order, use the seed Playwright printed: `npx playwright test --shuffle <seed>`.

### 4. All screens

- **When:** after CSS changes, before a release.
- **Runs against:** your local copy.
- **Tests / language / screen:** all; random language; every test on **all four** screens.
- **Needs:** nothing extra.

```sh
npm run test:all-screens
```

- **Check:** all pass. A failure on one screen only is a layout bug at that width: repeat it with variant 5.

### 5. One screen size

- **When:** check one screen size, e.g. after a phone layout change.
- **Runs against:** your local copy.
- **Tests / language / screen:** all; random language; one screen: `desktop-1280`, `tablet-600`, `edge-599` or `phone-375`.
- **Needs:** nothing extra.

```sh
TEST_SCREEN=<screen> npm test
```

- **Check:** all pass; the report shows `screen` = the one you chose for every test.

### 6. One language

- **When:** check one language, e.g. after changing a locale file.
- **Runs against:** your local copy.
- **Tests / language / screen:** all; one language: `uk`, `en`, `pl`, `da`, `lt` or `et`; random screen.
- **Needs:** for a locale change also `node scripts/check-locales.mjs` passes.

```sh
TEST_LANG=<lang> npm test
```

- **Check:** all pass; the report shows `lang` = the one you chose for every test.

### 7. Repeat a failure exactly

- **When:** a test failed and you want the same conditions again.
- **Runs against:** your local copy.
- **Tests / language / screen:** the failed test only; language and screen pinned to the values from the report (each test shows `lang` and `screen`).
- **Needs:** the report of the failed run (`npx playwright show-report`).

```sh
TEST_LANG=<lang> TEST_SCREEN=<screen> npx playwright test -g "<part of the test title>"
```

- **Check:** the test fails the same way (a real bug: file it or fix it) or passes (flaky or order-dependent: try variant 3).

### 8. Deploy preview of a PR

- **When:** a PR is open and its Netlify check is green.
- **Runs against:** the PR's deploy preview.
- **Tests / language / screen:** all; random.
- **Goes to testomat.io:** yes, environment `Target:deploy-preview,Browser:Chrome`.
- **Needs:** the PR number; the testomat.io key; deploy previews are public in Netlify (project visibility Public, since 2026-10-28).

```sh
read -s TESTOMATIO && export TESTOMATIO
echo ${#TESTOMATIO}
export TESTOMATIO_TITLE="🦭 PR #<PR> on deploy preview: <what> (<RSP-…>)"
PR=<PR> npm run test:preview
unset TESTOMATIO
```

- **Check:** see [Check a reported run](#check-a-reported-run).
- **Then:** link the run in the ticket comment.

### 9. Production after a release

- **When:** after a merge, the production deploy is live.
- **Runs against:** production.
- **Tests / language / screen:** all; random.
- **Goes to testomat.io:** yes, environment `Target:production,Browser:Chrome`.
- **Needs:** the Jira version and its tickets; the testomat.io key; the Netlify production deploy is published.

```sh
read -s TESTOMATIO && export TESTOMATIO
echo ${#TESTOMATIO}
export TESTOMATIO_TITLE="🦭 Production check: <version> (<RSP-…>)"
npm run test:prod
unset TESTOMATIO
```

- **Check:** see [Check a reported run](#check-a-reported-run).
- **Then:** link the run in the tickets and in the release notes.

### 10. Production smoke

- **When:** quick production check without a release, e.g. after a config change.
- **Runs against:** production.
- **Tests / language / screen:** `@smoke` only; random.
- **Goes to testomat.io:** yes, environment `Target:production,Browser:Chrome`.
- **Needs:** the reason for the check; the testomat.io key.

```sh
read -s TESTOMATIO && export TESTOMATIO
echo ${#TESTOMATIO}
export TESTOMATIO_TITLE="🦭 Production smoke: <why>"
npm run test:prod:smoke
unset TESTOMATIO
```

- **Check:** see [Check a reported run](#check-a-reported-run); the count equals the number of `@smoke` tests.

### 11. Late production check

- **When:** a release went out without a recorded check.
- **Runs against:** production.
- **Tests / language / screen:** all; random.
- **Goes to testomat.io:** yes, a run dated **today**; the title says "late".
- **Needs:** the Jira version and its tickets; the testomat.io key.

```sh
read -s TESTOMATIO && export TESTOMATIO
echo ${#TESTOMATIO}
export TESTOMATIO_TITLE="🦭 Production check (late): <version> (<RSP-…>)"
npm run test:prod
unset TESTOMATIO
```

- **Check:** see [Check a reported run](#check-a-reported-run).
- **Then:** link the run in the release notes with the date of the check. Never backdate it.

### Combining

`TEST_LANG` and `TEST_SCREEN` also work in variants 8–11: put them before the npm command on the same line, e.g. `TEST_SCREEN=phone-375 npm run test:prod` or `TEST_LANG=et PR=14 npm run test:preview`. For any other address (one-off): `BASE_URL=https://… npm test`.

## Reporting lines

What the lines in variants 8–11 do:

- `read -s TESTOMATIO && export TESTOMATIO`: the terminal waits silently; paste the key (Cmd+V) and press Enter. Nothing is shown and nothing goes into the history.
- `echo ${#TESTOMATIO}`: prints the key's length, not the key. `0` means the paste didn't work; repeat the first line.
- `export TESTOMATIO_TITLE=…`: the run's name in testomat.io (see [Naming](#naming)). Without it the run gets a default name from the target, e.g. "🦭 Production check".
- `npm run test:preview` / `test:prod` / `test:prod:smoke`: the run itself.
- `unset TESTOMATIO`: switches reporting off in this window. Always the last line.

Run the whole block in **one terminal window**: the key lives only there.

## Naming

- Title starts with 🦭 and says what was checked, with ticket keys: `🦭 PR #12 on deploy preview: class symbols, logo link, 502/504 texts (RSP-124, 125, 126)`, `🦭 Production check: …`, `🦭 Production check (late): …`.
- Environment is **one string**, comma-separated, e.g. `Target:production,Browser:Chrome`. The target sets it; set `TESTOMATIO_ENV` by hand only for a special case.

## Check a reported run

1. `echo ${#TESTOMATIO}` printed a number above 0.
2. The run appears in testomat.io with the title and environment you set.
3. Its test count equals what Playwright printed (e.g. 19/19).
4. No "Tests Not Matched": every Playwright test has the `@T…` id of an existing case. Several tests can share one id (e.g. one per locale); they show as separate entries under that case.
5. Cases with automated results show as **automated**; that is expected (decision 2026-10-28, RSP-80). Their manual steps stay as the human-readable spec.
6. Claude can check the run through MCP: "check run `<id>`" lists the results per case and anything unmatched.

## Other commands

```sh
npm run typecheck              # type check only
npm run test:smoke             # @smoke tests on your local copy
npx playwright test language   # one spec file
npm run test:ui                # Playwright UI mode: step through tests in a browser
npx playwright show-report     # last report: steps, screenshots of failures, lang / screen
```

## Known pitfalls

| What you see | Why | Fix |
|---|---|---|
| Tests fail on a deploy preview with `element(s) not found`; the log shows `app.netlify.com/edge-access` | Previews are private (Netlify team login); the test browser never reaches the site | Netlify project visibility: Public (done 2026-10-28) |
| `[TESTOMATIO] ⚠️ … did not return S3 credentials …` | No artifact storage configured; screenshots and traces aren't uploaded | Nothing; results are reported. Use `npx playwright show-report` for screenshots |
| An empty run appears in testomat.io | The key was still set during `--list`, `test:ui` or a quick try: every run with the key creates a run | Always end with `unset TESTOMATIO` |
| `TEST_SCREEN=…: not one of …` or `TEST_LANG=…: not one of …` | A typo in the screen or language name | Use exactly one of the names in variants 5 and 6 |
| `TARGET=preview needs the PR number` | `npm run test:preview` without `PR=<number>` | Put the PR number before the command: `PR=14 npm run test:preview` |
| Tests pass locally but time out on a preview | Preview not built yet, or a network blip | Wait for the green Netlify check; the config already retries once and waits longer for remote targets |

## Rules

- The key never goes into a file, a commit, a screenshot or a chat. Only `read -s` into the current terminal.
- Never use `TESTOMATIO_CREATE`: it would create duplicate tests next to the reviewed cases.
- Never set results by hand for a check that didn't happen. A late check gets a run dated the day of the check, and the title says it is late.
- Don't report local runs (variants 1–7): they test your working copy, not a deployed site.

## CI (coming with RSP-127)

GitHub Actions will run variant 8 automatically for every PR that changes `site/` and report with the key from a GitHub secret. This section gets the details when the workflow exists.
