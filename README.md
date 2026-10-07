# Responsters

Original creatures for learning HTTP status codes, and a Playwright API test suite organised by status code.

**Live:** https://responsters.netlify.app

Every status code has its own creature, a pun name and a "move" that explains what the code means: Nowherret vanishes (404), Spamster spins its wheel too fast (429), Cachameleon holds up a photo of itself (304).

## The site

- **Collection**: cards grouped by status class (1xx–5xx), with what the code means, where you meet it, what to test and which codes it's often confused with.
- **Practice**: picture → code and code → creature. Codes you miss come back more often; two correct answers in a row mark a code as known.
- **Traps**: drills for pairs people mix up (401/403, 301/302, 200/201/204, 408/503, 500/502, 429/503, 400/404).
- UI in Ukrainian and English.

The site is a single static page (`site/index.html`) with no build step.

## Roadmap

- **API + tests:** a small Responsters API on Netlify Functions where each endpoint returns real status codes, covered by Playwright API tests tagged by code (`npx playwright test --grep @404`).
- **Second edition:** six new creatures (405, 409, 413, 415, 422, 504).
- **Hand-drawn edition:** all creatures redrawn by a human illustrator, with the card frame built in code.

Backlog lives in Jira (project RSP); commits and PRs reference ticket keys.

## Repository layout

```
site/            static site, published by Netlify
  index.html     the whole app: markup, styles, script, data
  img/           card images
  _headers       cache rules (images and icons: one week)
```

## Credits

Characters, card concepts and copy by Maryna Bortnyk. Status names per RFC 9110.
