# Instructions for AI assistants (GitHub Copilot, Claude)

Responsters is a static site (`site/`, no build step) for learning HTTP status codes. These rules apply to every change in this repo, and especially to the Playwright tests in `tests/`.

## Repo basics
- Languages: code, comments, commit messages and docs in English.
- Commits and branches carry the Jira key: `RSP-113: …`, branch `RSP-113-…`.
- Every commit says why, what changed and how it was checked: subject `RSP-113: <what>`, body `Why: …` and `Checked: …` (e.g. `npm test`, `npm run test:prod:smoke`, a manual check on the deploy preview). One commit = one verifiable step.
- Changes in `site/` or `netlify/` trigger a paid production deploy on merge; everything else doesn't. Don't touch `site/` in a test-only change.
- All site texts live in `site/i18n/<lang>.js`; data that is the same in every language lives in `site/data/`.
- Progress and settings are in localStorage under the prefix `httpon.` (see `site/js/store.js`).

## How we change code
Adapted from Robert C. Martin's [ub-mode](https://github.com/unclebob/ub-mode) (Uncle Bob, the author of *Clean Code*), reduced to what fits this repo.

- **Subtract before you add.** Before adding something, check what can be removed or reused. One decision lives in one place (e.g. site addresses only in `tests/targets.ts`, class symbols only in `site/data/classes.js`).
- **Fix the root cause.** Reproduce the problem first. A guard, retry or test change that only hides a failure is not a fix: if a test fails on a deployed site, find out what differs before touching the test.
- **Check data where it enters, trust it inside.** Validate environment variables, URL hashes and stored values once, at the entry point, with a clear error; the rest of the code works with valid values.
- **Use the project's terms.** Card, creature, move, trap, class, "known": the same word for the same thing in code, tests, tickets and all six languages.
- **Small verifiable steps.** Finish one unit, check it, then start the next.

## Documentation: repo first, Confluence mirrors
- Docs that AI agents follow and people read (README, `docs/*.md`, e.g. the glossary or how to run the tests) live **in the repo**. That file is the source of truth: agents only see the repo.
- A Confluence page about the same topic has two parts: a **mirrored part**, copied from the repo file after each merge and marked "mirrored from `<file>` at `<commit>`, edit it in the repo", and a **part for people** (background, diagrams, examples) that lives only in Confluence.
- Never edit the mirrored part in Confluence: the next sync overwrites it. Change the repo file in a PR instead.
- Write repo docs so they can become an AI skill: purpose, when to use, inputs, exact steps, checks, don'ts.

## UI tests (Playwright + TypeScript)
Source of truth for test cases: testomat.io (project `responsters`). Automate only cases that exist there.

### Structure
- `tests/ui/*.spec.ts`: specs, one file per area (collection, practice, traps, language, progress).
- `tests/fixtures/`: everything a spec needs. Specs import only from `../fixtures`:
  `import { test, expect, TAG } from '../fixtures';`
- `tests/fixtures/locators.ts`: all `data-testid` values (`TID`). The only place selectors are written.
- `tests/fixtures/texts.ts`: site texts loaded from `site/i18n/`.

### Rules
1. **No locators in specs.** No CSS/XPath strings, no `getByTestId('…')`, no `getByText('literal')` in a spec. A spec calls page objects from fixtures; page objects use `TID`. A missing test id → add it to the markup with a `data-testid` attribute and to `TID`.
2. **No copied texts.** Expected texts come from the `texts` fixture (`texts.ui.tabs[1]`), never typed into the test. Status codes and creature names come from `site/data/`.
3. **Independent tests.** No shared state between tests, no order, no `test.describe.serial`. Each test sets its starting state with `test.use({ seed: { … } })` and opens the page itself. Never rely on what an earlier test clicked.
4. **Tags.** Every test has exactly one group tag from `TAG` (`@collection`, `@practice`, `@traps`, `@language`, `@progress`, `@navigation`) and optionally `TAG.smoke`, passed as `{ tag: [...] }`. Screen sizes are not tags either: they come at random (rule 8); browsers are projects in `playwright.config.ts`.
5. **testomat.io id.** The test title is the testomat.io case title followed by its id: `'Language from the browser is picked on first visit @T1a2b3c4d'`.
6. **Waiting.** Use web-first assertions (`await expect(locator).toBeVisible()`). No `waitForTimeout`, no fixed sleeps.
7. **One behaviour per test.** Steps follow the testomat.io case; use `test.step('…')` for its steps.
8. **Random language and screen.** Every test runs in a random site language and on a random screen size from `tests/fixtures/screens.ts` (1280, 600, 599, 375); both are shown as annotations (`lang`, `screen`) in the report. Never assume English or a size: take expected texts from the `texts` fixture. Reproduce a failure with `TEST_LANG=<code>` and/or `TEST_SCREEN=<name>`. Tests about choosing the language use `test.use({ randomLang: false })`; a test that only makes sense on one size uses `test.use({ screenPreset: 'phone-375' })`.
9. **A test must be able to fail.** If a test would still pass with the feature removed, or with every function returning nothing, it tests nothing: rewrite it so it checks what a user would see.
10. **No secrets.** API keys (testomat.io) only through environment variables or `.env` (git-ignored).

### Running
- `npm test` — all tests, each in a random language on a random screen (starts `npx serve site` itself).
- `TEST_LANG=pl npm test`, `TEST_SCREEN=phone-375 npm test` — pin the language / screen for the whole run.
- `npm run test:all-screens` — every test on all four screens (before a release, or after CSS changes).
- `npm test -- --grep @language` — one group. `npm run test:smoke` — the smoke set.
- `PR=<n> npm run test:preview`, `npm run test:prod`, `npm run test:prod:smoke` — against a deployed site. Addresses live only in `tests/targets.ts`; never write a site URL in a spec or a command.
- `npm run typecheck` — TypeScript check without running tests.
- `npm run test:shuffle` — every test 3× in random order. **Run it before committing a new or changed spec**: a test that fails only here depends on another test or on order. To replay a failing order: `npx playwright test --shuffle <seed>` with the seed from that run.
