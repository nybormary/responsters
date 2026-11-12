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
- **Runs against:** your local copy (Playwright runs `npm run build` and serves `dist/` itself).
- **Tests / language / screen:** all; random.
- **Needs:** `npm install` done; `git status` shows what you plan to commit.

```sh
npm run typecheck && npm test
```

- **Check:** Playwright prints `N passed`, nothing failed or flaky. If something failed: `npx playwright show-report`, then variant 7.

### 2. One group while working on an area

- **When:** quick look while you work on one part of the site.
- **Runs against:** your local copy.
- **Tests / language / screen:** one group: `@collection`, `@practice`, `@traps`, `@language`, `@progress`, `@navigation`, `@home` (the home page and language-less `/`), `@privacy` (what leaves the browser: requests to other hosts), `@a11y` (automated accessibility checks: landmarks, alt text); random.
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

## Language checks by hand

Links without a language (`/`, `/http/`, `/http/<code>/`) work the same locally and on Netlify: a chooser page at that path picks the language in the browser (saved choice, `nf_lang` cookie, the whole browser list, else English) and moves on with `location.replace`. There is no server-side language redirect any more (RSP-183: Netlify's edge answered two requests for the same URL with the same browser language, arriving together, with one redirect, whatever their cookie). A missing address without a language gets the English 404 page; with a language, the 404 page in that language. What still needs a real browser by hand:

- **Use a clean Chrome profile.** Your normal profile may send more languages than its settings show (on macOS the system languages come first; check `navigator.languages` in the console). A clean profile sends exactly the list you give it:

  ```sh
  open -na "Google Chrome" --args --user-data-dir="$HOME/chrome-lang-test" --accept-lang=<list> "<url>"
  ```

  `<list>` is comma-separated, first language first, e.g. `be,pl`. Delete the folder after the check.
- **Without a browser:** `curl -s -o /dev/null -w '%{http_code}\n' <url>` on a language-less URL must show `200` (the chooser page), never a `302`: the language is picked by the page's script, so curl can't show which one.
- **Where `/` should land:** on the home page `/<lang>/`; old app links like `/#traps` go on from there to `/<lang>/http/#traps`.
- **A saved choice in localStorage:** values are JSON, so a language is a quoted string. In the DevTools console: `localStorage.setItem("httpon.lang", '"pl"')`. Without the inner quotes the site reads no saved language.

## Accessibility: what axe checks and what stays manual

The `@a11y` tests run [axe-core](https://github.com/dequelabs/axe-core) (`tests/fixtures/pages/axe.ts`, RSP-162) on every page type and state: the app on Collection, Practice with the feedback after an answer, Traps, "How to use" open and the language menu open; a card page, the home page and the 404 page. Each page is checked in the light and the dark theme, in a random language on a random screen size.

- **Rules:** WCAG 2.0, 2.1 and 2.2, levels A and AA, plus axe best-practice (landmarks such as `landmark-one-main`).
- **A failure** names the rule, its help link and the elements. Whenever axe finds anything, its raw violations are attached to the report, listed exceptions included, so a known violation stays visible.
- **Known violations** with their own ticket are listed in `tests/fixtures/a11y-exceptions.ts`: one rule on one element (by test id), with the ticket key. An entry without a ticket doesn't compile. Remove the entry in the PR that fixes the ticket.

axe finds what can be computed from the page: missing names and labels, contrast, landmarks and headings, ARIA roles and states, alt attributes that are missing. It can't judge meaning or use. These stay manual, with the **KAZOO** checklist (Confluence "Mnemozoo — concept and ideas"):

- **K**eyboard: everything reachable and usable with the keyboard, no keyboard trap, focus always visible.
- **A**lt text makes sense: axe checks that it exists, not what it says.
- **Z**oom: 200 % and 400 % page zoom, text size 130 % and 150 % on a phone; nothing overlaps or disappears.
- **O**rder: focus follows the visual order; what a screen reader announces makes sense (e.g. the Practice feedback).
- **O**nly colour? Meaning is never carried by colour alone.

## Images and fonts in deployed runs

On a deploy preview, production or `BASE_URL` (variants 8–11 and CI), card images (`/img/…`) and web fonts (`/fonts/…`) come from the repo files in `site/`, not from the host (RSP-186, `tests/fixtures/local-assets.ts`). Every test starts with an empty browser cache, so a full run used to download them all again: ~2,500 requests and ~18 MB, about 80% of the site's Netlify traffic, which uses the Netlify Free credits that keep the site up. Now a run is ~1,550 requests and ~2.9 MB (counted 2026-11-11 against the "as deployed" build).

- The bytes are the same files the build copies to `dist/`, so the pages look and lay out exactly as on the host.
- A file that is not in the repo still goes to the host, so a broken path fails as before.
- Local runs (variants 1–7) are unchanged: there everything comes from your own `dist/`.
- A test that checks the host's own files opts out with `test.use({ realAssets: true })`. Today: `privacy.spec.ts` (only the site's own host, fonts from `/fonts/` and in use) and `host-files.spec.ts` (every card picture and the fonts load from the host; tagged `@smoke`, so Production smoke catches a release where the host doesn't serve them).
- In a trace or the Network tab of a deployed run, these files show as answered by the test, not by Netlify. That is expected.

## Known pitfalls

| What you see | Why | Fix |
|---|---|---|
| Tests fail on a deploy preview with `element(s) not found`; the log shows `app.netlify.com/edge-access` | Previews are private (Netlify team login); the test browser never reaches the site | Netlify project visibility: Public (done 2026-10-28) |
| `[TESTOMATIO] ⚠️ … did not return S3 credentials …` | No artifact storage configured; screenshots and traces aren't uploaded | Nothing; results are reported. Use `npx playwright show-report` for screenshots |
| An empty run appears in testomat.io | The key was still set during `--list`, `test:ui` or a quick try: every run with the key creates a run | Always end with `unset TESTOMATIO` |
| `TEST_SCREEN=…: not one of …` or `TEST_LANG=…: not one of …` | A typo in the screen or language name | Use exactly one of the names in variants 5 and 6 |
| `TARGET=preview needs the PR number` | `npm run test:preview` without `PR=<number>` | Put the PR number before the command: `PR=14 npm run test:preview` |
| Tests pass locally but time out on a preview | Preview not built yet, or a network blip | Wait for the green Netlify check; the config waits longer for remote targets and retries once, but a test that passes only on the retry still fails the run (RSP-184): find the cause, don't re-run |
| A language check by hand gives the wrong language | Your Chrome profile sends other languages first (macOS system languages), or the localStorage value isn't JSON | Use a clean profile and a quoted value, see [Language checks by hand](#language-checks-by-hand) |
| CI: `No ready deploy preview after 10 minutes` | Netlify's build is slow or failed, or Netlify names its status differently | The step lists the statuses it saw on the commit; check the build in Netlify. A re-run of the same commit always ends red (RSP-184), so once Netlify is fine, push an empty commit: `git commit --allow-empty -m "RSP-N: re-run CI after Netlify (<why>)"`, then `git push` |

## Rules

- The key never goes into a file, a commit, a screenshot or a chat. Only `read -s` into the current terminal.
- Never use `TESTOMATIO_CREATE`: it would create duplicate tests next to the reviewed cases.
- Never set results by hand for a check that didn't happen. A late check gets a run dated the day of the check, and the title says it is late.
- Don't report local runs (variants 1–7): they test your working copy, not a deployed site.

## CI

Workflow: `.github/workflows/ui-tests.yml` (RSP-127). It runs by itself on every pull request to `master`; a new push to the PR stops the run that is still going.

| The PR changes | What CI does | Goes to testomat.io |
|---|---|---|
| `site/`, `netlify/`, `scripts/build-pages.mjs` or `netlify.toml` | Waits until Netlify reports the deploy preview of the PR's last commit as ready (up to 10 minutes), then runs [variant 8](#8-deploy-preview-of-a-pr) | Yes: title `🦭 CI · PR #<n> (<branch>) on deploy preview`, environment `Target:deploy-preview,Browser:Chrome` |
| Anything else | No deploy preview exists (Netlify's `ignore` rule), so it runs [variant 1](#1-before-a-commit) on the PR's own files | No |

**A push with only tests or docs in a PR that changes the site** (RSP-174): Netlify compares the push with its last built preview, not with `master`, finds no site change and cancels the preview ("Deploy Preview canceled"). CI then runs [variant 1](#1-before-a-commit) on the PR's own files, not reported, and says so in the log. A failed Netlify build, or no preview after 10 minutes, still fails the check.

Every run also does `npm run typecheck` and `npm run check-locales`.

- **Result:** the PR's checks → **UI tests**. A failing test, type error or locale problem makes the check red.
- **Report:** the run's page → **Artifacts** → `playwright-report-pr-<n>`. Download, unzip, then `npx playwright show-report <folder>`. Kept for 14 days.
- **testomat.io key:** only the GitHub secret `TESTOMATIO` (repo Settings → Secrets and variables → Actions). Never in the repo, never in the logs. Without the secret the tests still run; nothing is reported.
- **Check the run:** as in [Check a reported run](#check-a-reported-run), then link it in the ticket comment.
- **Required check:** `master` is protected (RSP-99): a merge needs a pull request with a green **UI tests** check, up to date with `master`.
- **Alert on a red run** (RSP-179): the last step posts one message to Slack **#ci-alerts**: PR, branch, commit, the step that failed, how many tests failed and the names of up to five failed or flaky tests (with file and line; flaky ones marked "flaky"), a link to the run (with the HTML report) and to its testomat.io run, or "not reported" when the tests ran on the PR's own files (nothing about testomat.io when the run stopped before the tests). The test steps that pipe into `tee` run with `shell: bash`, which adds `pipefail`: GitHub's default shell doesn't, and failed tests would show green. A green run posts nothing; why the channel is quiet is answered by the daily CI line in the evening report (RSP-180). The webhook is only the GitHub secret `SLACK_WEBHOOK_URL`. The alert is best effort: without the secret, or if Slack is down, the log says "alert not sent" and the check result doesn't change. To turn alerts off, delete the secret. Script: `scripts/ci-alert.mjs`; counts and failed tests come from `ci-results.json` (JSON reporter, written only on CI), the testomat.io link from the reporter's "Report URL" line kept in `testomat-run.log`.
- **No green by retry or re-run** (RSP-184): a flaky or failing test is never made green by trying again. Two guards:
  - Playwright retries a failed test once on a deployed target, but `failOnFlakyTests: true` (`playwright.config.ts`) makes a test that passes only on the retry fail the run. The report and the alert mark it "flaky".
  - The last test-related step of both workflows, **No green by re-run**, fails every re-run of the same commit (**Re-run jobs**, **Re-run failed jobs**). It runs after the tests, so a re-run to diagnose still shows their results; only a new commit can go green.
  - What to do instead: find the cause; if it is outside our code, create a ticket and skip the test with the ticket key in the reason (`tests/fixtures/known-issues.ts`, `test.use({ langRedirect: true })` pattern), then push. Remove the skip in the PR that fixes the ticket.
  - Known limit: an empty commit or a new **Run workflow** of Production smoke starts a fresh run. The guard stops the habit, not a deliberate bypass.
- **Production smoke from GitHub** (RSP-179): Actions → **Production smoke** → **Run workflow** runs [variant 10](#10-production-smoke) on mnemozoo.com, reports it to testomat.io and alerts #ci-alerts when red. The button appears once `.github/workflows/prod-smoke.yml` is on `master`.
- **Not yet:** starting the production smoke by itself after a deploy (RSP-161).
