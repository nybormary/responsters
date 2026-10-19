# Responsters

Learn HTTP status codes with original creatures. Also a portfolio project: built and tested with an AI pair, from Jira ticket to production.

**Live:** https://responsters.netlify.app

Every status code has its own creature, a pun name and a "move" that explains what the code means: Nowherret vanishes (404), Spamster spins its wheel too fast (429), Cachameleon holds up a photo of itself (304).

## The site

- **Collection:** 23 creatures grouped by status class (1xx–5xx). Each card says what the code means, where you meet it, what to test, and which codes it's often confused with.
- **Practice:** picture → code and code → creature. Codes you miss come back more often; two correct answers in a row mark a code as known.
- **Traps:** drills for the pairs people mix up most:
  - 401/403, 301/302, 200/201/204;
  - 408/503, 408/504, 500/502, 502/504, 429/503;
  - 400/404, 400/415, 400/422, 404/405, 409/422.
- The UI is in Ukrainian and English.

The site is static, with no build step: plain HTML, CSS and JavaScript modules that Netlify serves as they are.

## How to use it

1. **Meet the creatures.** Open **Collection** and tap a card. You'll see what the code means, where you meet it, what to test and which codes it's confused with. Start with one class, for example 4xx.
2. **Practise.** Open **Practice**:
   - **Picture → code:** see a creature, pick its code.
   - **Code → creature:** see a code, pick its creature.
   - **Nerd mode:** text only, no pictures. Read what a code means, pick the code.
   - **Hardcore:** only the code. Pick its status name; a hint shows the creature.

   Codes you get wrong come back more often. After two correct answers in a row, a code gets a ✓ in the Collection.
3. **Check the traps.** Open **Traps** once the basics feel easy. Each trap is a pair of codes that people mix up, with a short rule and real-life scenarios to sort.
4. **Switch the language** with the language button at the top (🌐).

Your progress is saved in your browser only. There's no account and nothing is sent anywhere, so a different browser or device starts fresh.

## Roadmap

- **Card frame in HTML/CSS:** the card text becomes real text instead of part of the image. This is the base for new languages and the hand-drawn art.
- **More languages:** Danish, Polish and Lithuanian, with the default language taken from the browser.
- **A page per creature and per trap:** so a single creature or an "X vs Y" trap can be found in search and shared.
- **API + tests:** a small Responsters API on Netlify Functions where each endpoint returns real status codes. It's covered by Playwright API tests tagged by code (`npx playwright test --grep @404`).
- **Hand-drawn edition:** all creatures redrawn by a human illustrator.

## How it's built

- **Backlog:** Jira project RSP. Branches, commits and pull requests carry the ticket key, so every change links back to its ticket.
- **Flow:** one branch per ticket → pull request → Netlify deploy preview → manual check → merge.
- **Daily updates:** a Slack channel gets an evening summary and a morning list of open questions, written by an AI helper.

### Deploys and Netlify credits

The site runs on Netlify's free plan (300 credits a month). When the credits run out, the site is paused until the next month.

- **Production deploys cost credits:** 15 per deploy. A deploy happens on every merge to `master` that changes `site/` or `netlify/`.
- **Deploy previews are free.** Open pull requests and test on the preview as often as needed.
- **Changes outside `site/` and `netlify/` don't deploy at all.** The `ignore` rule in `netlify.toml` skips the build.

**Rule:** check the credit balance before every merge to `master`, and aim for at most 10 production deploys a month. Batch several tickets into one merge when possible.

## Repository layout

```
site/              static site, published by Netlify
  index.html       markup only; loads css/ and js/app.js
  css/             styles: base, card (the card frame), collection, practice, traps, detail (card modal)
  data/            shared data, the same in every language: codes, status and creature names, colours, trap answers, links
  i18n/            all texts, one file per language: uk.js, en.js; index.js lists the languages the site offers
  js/              logic, one file per part of the page
    app.js         entry point: clicks, keys, first render
    state.js       shared state (language, view, progress), loads the language file + t(), tx() and isKnown()
    store.js       progress in localStorage (prefix "httpon.")
    util.js        small helpers
    card.js        the card frame: art, code badge, status, name, move, card line
    modes.js       the Practice modes shown as cards (add a line per new mode)
    chrome.js · collection.js · detail.js · practice.js · traps.js
  img/             creature art ({code}-art.jpg) and the old full card images ({code}.jpg)
  _headers         cache rules (images and icons: one week)
scripts/
  check-locales.mjs  checks that every language file has the same keys as en.js
tests/             Playwright UI tests (TypeScript); never deployed
  fixtures/        test ids (locators.ts), group tags, site texts, starting state for each test
  ui/              specs, one file per area
.github/
  copilot-instructions.md  rules for AI assistants, incl. how tests are written
playwright.config.ts  test targets; screen sizes are in tests/fixtures/screens.ts
netlify.toml       publish folder and the rule that skips builds without site changes
```

**Run locally:** `npx serve site`, then open http://localhost:3000. JavaScript modules don't load from `file://`, so opening `index.html` by double-click shows an empty page.

**Adding a language:** copy `site/i18n/en.js` to `site/i18n/<code>.js` and translate the texts (keep the keys, `{…}` functions and `<b>` tags). Run `node scripts/check-locales.mjs` until it passes, then add the language to `LOCALES` in `site/i18n/index.js`. A text that is still missing shows in English, with a warning in the browser console.

## Tests

UI tests with Playwright + TypeScript in `tests/`. Test cases live in testomat.io; every test carries its case id (`@T…`). The rules for writing tests are in `.github/copilot-instructions.md`.

**Setup (once):** `npm install`, then `npx playwright install chromium` (downloads the browser).

Every test runs in a **random site language** and on a **random screen size** (1280 / 600 / 599 / 375). The report shows both for each test (`lang`, `screen`), so a failure can be repeated with the same values.

| What | Command | When |
|---|---|---|
| All tests | `npm test` | Before every commit that touches `site/` or `tests/` |
| Smoke | `npm run test:smoke` | After a production deploy (with `BASE_URL`, see below) |
| Shuffle | `npm run test:shuffle` | Before committing a new or changed spec: every test 3× in random order, catches tests that depend on each other |
| All screens | `npm run test:all-screens` | After CSS changes and before a release: every test on all four sizes |
| One group | `npm test -- --grep @navigation` | Groups: `@collection`, `@practice`, `@traps`, `@language`, `@progress`, `@navigation` |
| One file | `npx playwright test language` | While working on one spec |
| Type check | `npm run typecheck` | Before committing test code |
| Watch it run | `npm run test:ui` | Playwright UI mode: step through tests in a browser |
| Report | `npx playwright show-report` | After a run: steps, screenshots of failures, `lang` / `screen` |

**Where the tests run.** Locally the tests start `npx serve site` themselves and use http://localhost:3000. For a deployed site, set `BASE_URL`:

```
BASE_URL=https://deploy-preview-<PR number>--responsters.netlify.app npm test   # deploy preview
BASE_URL=https://responsters.netlify.app npm run test:smoke                     # production
```

**Repeat a failure.** Pin what the report shows, alone or together:

```
TEST_LANG=et npm test                                  # one language for all tests
TEST_SCREEN=phone-375 npm test                         # one screen size for all tests
npx playwright test --shuffle <seed>                   # the same random order as a shuffle run
```

Languages: `uk`, `en`, `pl`, `da`, `lt`, `et`. Screens: `desktop-1280`, `tablet-600`, `edge-599`, `phone-375`.

## Credits

Characters, card concepts and copy by Maryna Bortnyk. Status names per RFC 9110.
