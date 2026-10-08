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

The site is a single static page (`site/index.html`) with no build step.

## How to use it

1. **Meet the creatures.** Open **Collection** and tap a card. You'll see what the code means, where you meet it, what to test and which codes it's confused with. Start with one class, for example 4xx.
2. **Practise.** Open **Practice**:
   - **Picture → code:** see a creature, pick its code.
   - **Code → creature:** see a code, pick its creature.

   Codes you get wrong come back more often. After two correct answers in a row, a code gets a ✓ in the Collection.
3. **Check the traps.** Open **Traps** once the basics feel easy. Each trap is a pair of codes that people mix up, with a short rule and real-life scenarios to sort.
4. **Switch the language** with UA / EN at the top.

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
site/            static site, published by Netlify
  index.html     the whole app: markup, styles, script, data
  img/           card images
  _headers       cache rules (images and icons: one week)
netlify.toml     publish folder and the rule that skips builds without site changes
```

## Credits

Characters, card concepts and copy by Maryna Bortnyk. Status names per RFC 9110.
