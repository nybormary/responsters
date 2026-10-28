# Instructions for AI assistants (GitHub Copilot, Claude)

Responsters is a static site (`site/`, no build step) for learning HTTP status codes. These rules apply to every change in this repo, and especially to the Playwright tests in `tests/`.

## Repo basics
- Languages: code, comments, commit messages and docs in English.
- Commits and branches carry the Jira key: `RSP-113: …`, branch `RSP-113-…`.
- Changes in `site/` or `netlify/` trigger a paid production deploy on merge; everything else doesn't. Don't touch `site/` in a test-only change.
- All site texts live in `site/i18n/<lang>.js`; data that is the same in every language lives in `site/data/`.
- Progress and settings are in localStorage under the prefix `httpon.` (see `site/js/store.js`).

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
9. **No secrets.** API keys (testomat.io) only through environment variables or `.env` (git-ignored).

### Running
- `npm test` — all tests, each in a random language on a random screen (starts `npx serve site` itself).
- `TEST_LANG=pl npm test`, `TEST_SCREEN=phone-375 npm test` — pin the language / screen for the whole run.
- `npm run test:all-screens` — every test on all four screens (before a release, or after CSS changes).
- `npm test -- --grep @language` — one group. `npm run test:smoke` — the smoke set.
- `PR=<n> npm run test:preview`, `npm run test:prod`, `npm run test:prod:smoke` — against a deployed site. Addresses live only in `tests/targets.ts`; never write a site URL in a spec or a command.
- `npm run typecheck` — TypeScript check without running tests.
- `npm run test:shuffle` — every test 3× in random order. **Run it before committing a new or changed spec**: a test that fails only here depends on another test or on order. To replay a failing order: `npx playwright test --shuffle <seed>` with the seed from that run.
