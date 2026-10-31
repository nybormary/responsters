# Responsters

Learn HTTP status codes with original creatures. Also a portfolio project: a small product run with a full QA process, from Jira ticket to production.

**Live:** https://mnemozoo.com. Mnemozoo is the site's new name; this repository keeps the working name Responsters for now.

Every status code has its own creature, a pun name and a "move" that explains what the code means: Nowherret vanishes (404), Spamster spins its wheel too fast (429), Cachameleon holds up a photo of itself (304).

## What to look at

The backlog in Jira is private, so here is where the process shows in public:

- **Pull requests:** each one carries its ticket key, and its checks show the Playwright run against the Netlify deploy preview.
- **Commit messages:** ticket key, then *Why* and *Checked* (`RSP-N: … / Why: … / Checked: …`).
- **[docs/testing.md](docs/testing.md):** how tests are run and reported, from a local check to a production run after a release.
- **[docs/glossary.md](docs/glossary.md):** one name per concept across code, tests, texts and test ids.
- **[.github/copilot-instructions.md](.github/copilot-instructions.md):** the rules the AI follows when it writes code and tests here.

**Who does what:** AI writes code under my review; I own test design, acceptance and release decisions.

## The site

- **Collection:** 23 creatures grouped by status class (1xx–5xx). Each card says what the code means, where you meet it, what to test, and which codes it's often confused with.
- **Practice:** four modes: picture → code, code → creature, Nerd (text only) and Hardcore (code only). Codes you miss come back more often; two correct answers in a row mark a code as known.
- **Traps:** drills for the pairs people mix up most:
  - 401/403, 301/302, 200/201/204;
  - 408/503, 408/504, 500/502, 502/504, 429/503;
  - 400/404, 400/415, 400/422, 404/405, 409/422.
- **Six languages:** Ukrainian, English, Polish, Danish, Lithuanian and Estonian. The first language comes from the browser.

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

- **Home page and About:** what the site is and who made it; after that the site takes the name Mnemozoo everywhere.
- **A URL per language, a page per creature and per trap:** so a single creature or an "X vs Y" trap can be found in search and shared.
- **Accessibility pass:** WCAG 2.2 AA checks for the whole site.
- **Static checks:** linting and type checks in CI next to the UI tests.
- **Visitor feedback:** ideas and bug reports through GitHub Issues.
- **Git rubric:** a second collection, for Git commands.
- **API + tests:** a small Responsters API on Netlify Functions where each endpoint returns real status codes. It's covered by Playwright API tests tagged by code (`npx playwright test --grep @404`).
- **Hand-drawn edition:** all creatures redrawn by a human illustrator.

## How it's built

- **Backlog:** Jira project RSP. Branches, commits and pull requests carry the ticket key, so every change links back to its ticket.
- **Flow:** one branch per ticket → pull request → CI runs the Playwright tests on the Netlify deploy preview and reports them to testomat.io → manual check on the preview → merge.
- **Release:** tickets that go to production together share a Jira version. Before the merge a JQL query checks the version is complete; release notes go to Confluence; after the deploy a production test run decides whether the tickets move to Done.
- **Docs:** the repository is the source of truth (README, `docs/`); Confluence pages mirror them for people.
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
  i18n/            all texts, one file per language: uk, en, pl, da, lt, et; index.js lists the languages the site offers
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
  targets.ts       site addresses: local, deploy preview, production
  fixtures/        test ids (locators.ts), group tags, site texts, screen sizes, starting state for each test
  ui/              specs, one file per area
docs/
  testing.md       how to run and report UI tests; the Confluence page mirrors it
  glossary.md      one name per concept: code, test id, texts in each language
.github/
  workflows/ui-tests.yml   CI: Playwright tests on every pull request
  copilot-instructions.md  rules for AI assistants, incl. how tests are written
playwright.config.ts  test targets; screen sizes are in tests/fixtures/screens.ts
netlify.toml       publish folder and the rule that skips builds without site changes
```

**Run locally:** `npx serve site`, then open http://localhost:3000. JavaScript modules don't load from `file://`, so opening `index.html` by double-click shows an empty page.

**Adding a language:** copy `site/i18n/en.js` to `site/i18n/<code>.js` and translate the texts (keep the keys, `{…}` functions and `<b>` tags). Run `node scripts/check-locales.mjs` until it passes, then add the language to `LOCALES` in `site/i18n/index.js`. A text that is still missing shows in English, with a warning in the browser console.

## Tests

UI tests with Playwright + TypeScript in `tests/`. Test cases live in testomat.io; every test carries its case id (`@T…`). The rules for writing tests are in `.github/copilot-instructions.md`.

**Setup (once):** `npm install`, then `npx playwright install chromium` (downloads the browser).

Every test runs in a **random site language** and on a **random screen size**; the report shows both for each test, so a failure can be repeated with the same values.

```
npm test                         # local copy, before every commit that touches site/ or tests/
PR=12 npm run test:preview       # deploy preview of PR #12
npm run test:prod                # production
```

The site addresses live in `tests/targets.ts`; when the site moves to another host, only that file changes.

**CI:** every pull request runs the tests by itself (GitHub Actions): against its deploy preview when it changes `site/`, reported to testomat.io; otherwise on its own files. The result is a check on the PR, the HTML report an artifact of the run. Details: [docs/testing.md, CI](docs/testing.md#ci).

**All variants** (one language or screen, repeat a failure, report a run to testomat.io, late checks), pitfalls and rules: **[docs/testing.md](docs/testing.md)**.

## Credits

Characters, card concepts and copy by Maryna Bortnyk. Status names per RFC 9110.
