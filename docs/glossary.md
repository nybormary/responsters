# Glossary

This file is the source of truth for the words we use for the site, in code, tests, tickets and all six languages: one word for one thing. The Confluence page "Glossary" mirrors it and adds a part for people with numbered screenshots; change this file, not the mirror (rule: `.github/copilot-instructions.md`, "Documentation: repo first, Confluence mirrors").

## Purpose

Pick the right word before you write a ticket, a test title, an i18n key, a CSS class or a commit message. If a thing has no row here yet, add the row in the same PR that introduces the word.

## How to read it

- **#** is the number on the screenshots in the Confluence page.
- **Name in code**: data field, i18n key (`ui.*` in `site/i18n/<lang>.js`), CSS class or id, function. "—" means the word has no code name yet.
- **Don't use**: words people reach for that mean something else here, or nothing.
- **Test id**: the `data-testid` attributes in the markup, as listed in `TID` (`tests/fixtures/locators.ts`); "—" means no test can reach the element yet. Fill the column in the same PR that adds the attribute.
- **Naming a new test id**: the term from this glossary in kebab-case, plus the code or key for one instance: `card`, `card-401`, `known-badge`, `answer-401`, `trap-401-403`, `situation`.
- The words on the site in each language are in [Translations](#translations); they must match `site/i18n/*.js`.

## Shared (every rubric)

| # | Term | Definition | Name in code | Test id | Don't use |
|---|------|------------|--------------|---------|-----------|
| 1 | rubric | A topic with its own card set: HTTP status codes now, git commands later. | — (planned in RSP-117) | — | section, module, topic |
| 2 | collection | The first tab: all cards of a rubric, grouped. | view `collection`, `#view-collection`, `site/js/collection.js` | `tab-collection`, `view-collection` | gallery, bestiary, library |
| 3 | practice | The second tab: answer questions to make cards known. | view `practice`, `site/js/practice.js` | `tab-practice`, `view-practice` | quiz, exercise |
| 4 | practice mode | One way of practising: picture → code, code → creature, Nerd mode, Hardcore. | `MODES` in `site/js/modes.js` (ids `art`, `code`, `nerd`, `hard`); `ui.modes` | — | level, game |
| 5 | traps | The third tab: pairs (or a trio) of cards people mix up, with a rule and situations to sort. | view `traps`, `PAIRS` in `site/data/traps.js`, texts `traps["401-403"]` | `tab-traps`, `view-traps` | quiz, tricky pairs |
| 6 | trap | One pair from Traps: title, rule, situations. | `.pair`, `.rule`, `.scen`; `traps[key].title`, `.rule`, `.s` | — | puzzle |
| 7 | card | One tile in the collection: picture plus the front texts. The frame is shared by all rubrics. | `.card`, frame parts `.cf-*` in `site/css/card.css`, `renderCard()` / `cardBody()` in `site/js/card.js` | — | tile, item |
| 8 | card page | What opens when you tap a card: the card and its sections. | `.modal`, `site/js/detail.js`, sections `#m-*` | — | popup, details, modal (in texts) |
| 9 | group | Cards of one kind inside a rubric: an HTTP class or a git group. | `.group` | — | category |
| 10 | group colour | The colour of a group. Never the only cue: the group symbol says the same. | `CLS[n].c`, CSS `--c1`…`--c5` | — | — |
| 11 | group symbol | A shape that tells groups apart without colour (colour-blind cue, RSP-124). | `CLS[n].sym`, `clsSym(n)`, `.cf-sym`, `.pr-sym` | — | icon (icons belong to practice modes) |
| 12 | known | A card answered right twice in a row in Practice, without a hint; shown as ✓ on the card (a heart after RSP-132: "learn by heart"). One wrong answer resets it. | `isKnown(c)`, `state.streakBy`, `.badge`, `ui.known` | — | learned, mastered |
| 13 | progress | How many cards of the rubric are known: counter and bar above the collection. | `#mastered`, `#masterbar`, `ui.mastered` | — | score (score is Practice) |
| 14 | score | Right answers / questions and the current streak in Practice. | `ui.score` | — | progress |
| 15 | streak | Right answers in a row. | `state.streakBy` (per card), `ui.score` | — | combo |
| 16 | hint | Help in Practice that names the creature; an answer after a hint counts in the score but not toward known. | `ui.hint`, `.hintbtn`, `.hint-out` | — | clue, tip (tip is git) |
| 17 | often confused with | Card page section: the cards this one shares a trap with. | `CONF` in `site/data/traps.js`, `#m-conf`, `ui.conf` | — | related, see also |
| 18 | how to use | The short guide opened from the header. | `#howto`, `ui.howto`, `ui.howtoSteps` | `howto-open`, `howto`, `howto-close` | help, onboarding, tutorial |
| 19 | language menu | The menu in the header that switches the site language. | `#lang-btn`, `#lang-list`, `site/js/chrome.js` | `lang-button`, `lang-menu`, `lang-<code>` | locale switcher (in texts) |

## HTTP only

| # | Term | Definition | Name in code | Test id | Don't use |
|---|------|------------|--------------|---------|-----------|
| 20 | Responster | A creature of the HTTP rubric; every status code has one. | — (the name of the whole set) | — | monster, pokémon, mascot |
| 21 | creature name | The name of one Responster, e.g. Whoowl. The same in every language. | `D[].n`, `.cf-creature` | — | character name, nickname |
| 22 | status code | The three digits, e.g. 401. | `D[].c`, `.cf-code` | — | error code (2xx and 3xx aren't errors) |
| 23 | status name | The reason phrase from RFC 9110, e.g. Unauthorized. English in every language. | `D[].s`, `.cf-name` | — | status text, message |
| 24 | code badge | The coloured code with its class symbol on the card. | `.cf-badgerow` (`.cf-code` + `.cf-sym`) | — | badge (alone: `.badge` is the known ✓) |
| 25 | class | The HTTP group: 1xx, 2xx, 3xx, 4xx, 5xx. | `CLS`, `cls(c)` | — | category, family |
| 26 | class name | Our name of a class, e.g. Gatekeepers. Translated. | `classes[n].name` | — | — |
| 27 | official class name | The RFC name, e.g. Client Error. English in every language. | `CLS[n].o`, `.official` | — | — |
| 28 | class rule | One line under the class heading, e.g. "Client error: fix the request." | `classes[n].rule`, `.lede` | — | description |
| 29 | class filter | The chips above the collection: All or one class. HTTP only; no sticky header (RSP-131). | `.chip`, `state.filter`, `ui.all` | — | tabs (tabs are Collection / Practice / Traps) |
| 30 | move | The Responster's signature move, e.g. Who Goes There. English in every language. | `D[].m`, `.cf-move` | — | attack, ability, skill |
| 31 | card line | What the creature says on the card, max ~55 characters. | `cards[c].line`, `.cf-line` | — | quote, tagline (`ui.tag` is the site's tagline) |
| 32 | what it means | Card page section: the meaning of the code. | `cards[c].mean`, `#m-mean`, `ui.mean` | — | definition |
| 33 | where you meet it | Card page section: real situations with this code. | `cards[c].when`, `#m-when`, `ui.when` | — | examples, use cases |
| 34 | what to test | Card page section: short test cases, steps → expected result (RSP-11). | `qa[c]`, `#m-qa`, `ui.qa` | — | test ideas, checklist |
| 35 | tools and read more | Card page section: RFC, MDN, extra links and general tools. | `cardLinks(c)`, `REF`, `MORE`, `TOOLS`, `#m-links`, `ui.links` | — | references, links |

## Git only (planned, RSP-115)

The git rubric is not on the site yet; terms follow `claude/git-cards-concept.md` (project doc) and change with it. UK words are from the concept; other languages come with the rubric. "Slot" says which shared card slot the term fills (RSP-117).

| # | Term | UK | Definition | Slot | Don't use |
|---|------|----|------------|------|-----------|
| 36 | command | команда | The full command as typed, e.g. `git stash`, shown as one line under the picture. Never a bare `stash` or `-i`. | code badge | verb, keyword |
| 37 | git group | група (Візит, Вдома, Переїзд, Пошта, Рятуйте!) | The git groups by danger level, named after the household world. | class | category |
| 38 | scene title | назва сцени | The name of the picture's situation, e.g. "Guests at the door". | creature name | — |
| 39 | household caption | побутовий підпис | One line in the picture's language: things, cupboard, boxes — no files or commits. | card line | description |
| 40 | `$` line | рядок `$` | One command with a short plain explanation on the card front; `$` means "type this". | move | prompt, ★ line |
| 41 | technical sentence | технічне речення | What the command does and what it doesn't, or where the danger is. | what it means | — |
| 42 | bridge line | місток | One line that translates the metaphor back to git. | — | — |
| 43 | parameter | параметр | An option of the command (`-u`, `--staged`), always with its full command and an explanation. | — | flag, switch (in texts) |
| 44 | vignette | віньєтка | A small picture of the same scene with one change, only where a parameter changes the meaning or creates danger. | — | illustration (that is the main picture) |
| 45 | danger box | блок небезпеки | A "!" section: what happens without the safe option, with its own vignette. | — | warning |
| 46 | tip | порада | An optional real-life advice on the card page. | — | hint (hint is Practice) |

## Practice and Traps (shared)

Added after the first screenshots; the numbers continue so the screenshots stay valid.

| # | Term | Definition | Name in code | Test id | Don't use |
|---|------|------------|--------------|---------|-----------|
| 47 | situation | One line in a trap to sort into one of its codes, e.g. "The token has expired." | `traps[key].s[i]`, `.sc`, `.scen` | — | scenario, case, example |
| 48 | answer | One option to pick: a button in Practice or a code button in a trap. | Practice `.opt` (`.imgopt`, `.hardopt`), `data-ans`; Traps `.btns button`, `data-v`; states `.right`, `.wrong` | — | choice, variant |
| 49 | feedback | What appears after an answer: the verdict and the right code with its meaning. | Practice `.reveal`, `.verdict` (`ui.ok`, `ui.no`); Traps `.why` | — | result, explanation |
| 50 | question | The prompt in Practice; one per practice mode. | `.q`, `.nerdq`; `ui.qArt`, `ui.qCode`, `ui.qHard` | — | task, exercise |

## Translations

The words as they appear on the site (`site/i18n/<lang>.js`). Names, moves, status names and official class names stay English in every language. "Nerd mode" and "Hardcore" are not translated on purpose.

| # | Term | EN | UK | PL | DA | LT | ET |
|---|------|----|----|----|----|----|----|
| 2 | collection | Collection | Колекція | Kolekcja | Samling | Kolekcija | Kogu |
| 3 | practice | Practice | Тренування | Trening | Træning | Treniruotė | Harjutamine |
| 4 | practice mode | Practice mode | Режим тренування | Tryb treningu | Træningstilstand | Treniruotės režimas | Harjutusrežiim |
| 5 | traps | Traps | Пастки | Pułapki | Fælder | Spąstai | Lõksud |
| 12 | known | known | знаю | znam | kan | moku | tean |
| 13 | progress (counter) | 3 of 23 learned | Засвоєно 3 з 23 | 3 z 23 opanowanych | 3 af 23 lært | Išmokta 3 iš 23 | 3/23 selgeks õpitud |
| 15 | streak | streak | серія | seria | stime | serija | seeria |
| 16 | hint | Hint | Підказка | Podpowiedź | Hint | Užuomina | Vihje |
| 17 | often confused with | Often confused with | Часто плутають з | Często mylony z | Forveksles ofte med | Dažnai painiojamas su | Aetakse sageli segi |
| 18 | how to use | How to use | Як користуватися | Jak korzystać | Sådan bruger du det | Kaip naudotis | Kuidas kasutada |
| 19 | language menu | Language | Мова | Język | Sprog | Kalba | Keel |
| 20 | Responster (as "creature") | creature | істота | stworek | væsen | padaras | olend |
| 22 | status code (as "code") | code | код | kod | kode | kodas | kood |
| 29 | class filter "All" | All | Усі | Wszystkie | Alle | Visi | Kõik |
| 32 | what it means | What it means | Що означає | Co to znaczy | Hvad den betyder | Ką tai reiškia | Mida see tähendab |
| 33 | where you meet it | Where you meet it | Коли зустрічається | Gdzie go spotkasz | Hvor du møder den | Kur su juo susiduri | Kus sa sellega kokku puutud |
| 34 | what to test | What to test | Що тестуємо | Co testować | Hvad skal testes | Ką testuoti | Mida testida |
| 35 | tools and read more | Tools and Read more | Інструменти й довідка | Narzędzia i więcej | Værktøjer og læs mere | Įrankiai ir daugiau skaitymo | Tööriistad ja lisalugemine |
| 49 | feedback (verdict) | Yes! / Not this one. | Так! / Не цей. | Tak! / Nie ten. | Ja! / Ikke den. | Taip! / Ne tas. | Jah! / Mitte see. |
| 50 | question (picture → code, Nerd mode) | Which code is this? | Який це код? | Jaki to kod? | Hvilken kode er det? | Koks tai kodas? | Mis kood see on? |
| 50 | question (code → creature) | Which one is it? | Хто з них? | Który to? | Hvem er det? | Kuris iš jų? | Kes see on? |
| 50 | question (Hardcore) | What is this status called? | Як називається цей статус? | Jak nazywa się ten status? | Hvad hedder denne status? | Kaip vadinasi ši būsena? | Mis on selle oleku nimi? |

### Class names

| Class | Official (EN) | EN | UK | PL | DA | LT | ET |
|---|---|---|---|---|---|---|---|
| 1xx | Informational | Eggs | Яйця | Jajka | Æg | Kiaušiniai | Munad |
| 2xx | Successful | Friends | Друзі | Przyjaciele | Venner | Draugai | Sõbrad |
| 3xx | Redirection | Wanderers | Мандрівники | Wędrowcy | Vandrere | Klajokliai | Rändurid |
| 4xx | Client Error | Gatekeepers | Вартові | Strażnicy | Portvogtere | Sargai | Väravavahid |
| 5xx | Server Error | Server beasts | Серверні звірі | Serwerowe bestie | Serverbæster | Serverio žvėrys | Serverielukad |

## Known differences (to fix in separate tickets)

- **known / learned:** the ✓ says "known", the counter says "learned" in every language (UK «знаю» / «Засвоєно», PL «znam» / «opanowanych»). The glossary term is **known**.
- **where you meet it:** UK says «Коли зустрічається» ("when"); the other languages say "where".
- **badge:** `.badge` is the known ✓, while comments call the code row a "code badge" (`.cf-badgerow`).
- **httpon.:** localStorage keys keep the project's first name as prefix on purpose, so saved progress keeps working.
- **two checks on 2xx cards:** the known ✓ and the 2xx class symbol ✓ sit on the same card; the known badge becomes a heart in RSP-132.
