// The advent wall /<lang>/git/ and the home page's Git enclosure (RSP-195). testomat.io folder "Git cards", suite
// "Advent wall (RSP-195)". Doors and the enclosure open by the visitor's date: the tests set the browser clock and read
// the advent start from the page, so they hold on a preview (earlier start, netlify.toml) and on production alike.
// Remembering opened doors is RSP-196: until then a reload closes every door again.
import {
  test,
  expect,
  TAG,
  GIT_CARDS,
  ADVENT_DAYS,
  LANGS,
  buildOn,
  dayMonth,
  addDays,
  type GitCard,
} from '../fixtures';

const pick = <T>(list: T[]): T => list[Math.floor(Math.random() * list.length)];
const onDay = (day: number): GitCard => {
  const g = GIT_CARDS.find((c) => c.day === day);
  if (!g) throw new Error(`no git card for advent day ${day}`);
  return g;
};
const days = (from: number, to: number) => GIT_CARDS.filter((g) => g.day >= from && g.day <= to);

// ── 9a003ab9 ────────────────────────────────────────────────────────────────────────────────────
// One case, three tests: a locked, a today and a missed door give different results, so each fails on its own and the
// report says which state broke. All three report to 9a003ab9.

test.describe("Advent doors by the visitor's date, on day 9 of the advent", () => {
  const TODAY = 9;

  test(
    'Advent doors are locked, today or missed by the visitor\'s date: every day once, today\'s door is paper with the "today" flag @T9a003ab9',
    { tag: [TAG.git] },
    async ({ adventWall, lang, texts }) => {
      const g = onDay(TODAY);
      await adventWall.openOnDay(lang, TODAY);

      await test.step(`${ADVENT_DAYS} doors, every day 1–${ADVENT_DAYS} once`, async () => {
        await expect(adventWall.doors).toHaveCount(ADVENT_DAYS);
        const all = await adventWall.days();
        expect([...all].sort((a, b) => a - b)).toEqual(Array.from({ length: ADVENT_DAYS }, (_, i) => i + 1));
      });

      await test.step(`door ${TODAY} (${g.name}): paper, flag "${texts.git.wall.today}", a link to the card`, async () => {
        const door = adventWall.door(TODAY);
        await expect(door, 'paper with the today highlight').toHaveClass(/\bpaper\b.*\btoday\b|\btoday\b.*\bpaper\b/);
        await expect(adventWall.flag(TODAY)).toHaveText(texts.git.wall.today);
        await expect(door).toHaveAccessibleName(texts.git.wall.paper(TODAY));
        await expect(door).toHaveAttribute('href', `/${lang}/git/${g.id}/`);
      });
    },
  );

  test(
    'Advent doors are locked, today or missed by the visitor\'s date: an earlier day is paper with the "missed" flag @T9a003ab9',
    { tag: [TAG.git] },
    async ({ adventWall, lang, texts }) => {
      const g = pick(days(1, TODAY - 1));
      await adventWall.openOnDay(lang, TODAY);
      const door = adventWall.door(g.day);
      await expect(door, 'paper, flagged missed').toHaveClass(/\bmissed\b/);
      await expect(door).toHaveClass(/\bpaper\b/);
      await expect(door, 'not today').not.toHaveClass(/\btoday\b/);
      await expect(adventWall.flag(g.day)).toHaveText(texts.git.wall.missed);
      await expect(door).toHaveAccessibleName(texts.git.wall.paper(g.day));
      await expect(door).toHaveAttribute('href', `/${lang}/git/${g.id}/`);
    },
  );

  test(
    "Advent doors are locked, today or missed by the visitor's date: a later day is locked, says when it opens and can't be opened @T9a003ab9",
    { tag: [TAG.git] },
    async ({ adventWall, lang, texts, page }) => {
      const g = pick(days(TODAY + 1, ADVENT_DAYS));
      await adventWall.openOnDay(lang, TODAY);
      const opens = dayMonth(lang, addDays(await adventWall.start(), g.day - 1));
      const door = adventWall.door(g.day);

      await test.step(`door ${g.day}: locked, no link, no flag, "${texts.git.wall.locked(g.day, opens)}"`, async () => {
        await expect(door).toHaveClass(/\blocked\b/);
        await expect(door, 'no link: Tab skips it').not.toHaveAttribute('href');
        await expect(door).toHaveAttribute('aria-disabled', 'true');
        await expect(door).toHaveAccessibleName(texts.git.wall.locked(g.day, opens));
        await expect(adventWall.flag(g.day)).toHaveText('');
      });

      await test.step('a click changes nothing: still locked, same page', async () => {
        const before = page.url();
        await door.dispatchEvent('click'); // a real click would wait: Playwright treats aria-disabled as disabled
        await expect(door).toHaveClass(/\blocked\b/);
        await expect(door).not.toHaveClass(/\bopen\b/);
        expect(page.url()).toBe(before);
      });
    },
  );
});

// ── 8e6bff44 ────────────────────────────────────────────────────────────────────────────────────

test(
  'An advent door opens in two clicks; a dangerous command shows its mark only after opening @T8e6bff44',
  { tag: [TAG.git] },
  async ({ adventWall, gitCardPage, lang, texts, page }) => {
    const TODAY = 10;
    const w = texts.git.wall;
    const calm = pick(days(1, TODAY).filter((g) => !g.danger));
    const danger = pick(days(1, TODAY).filter((g) => g.danger));
    await adventWall.openOnDay(lang, TODAY);

    await test.step(`${danger.name} (day ${danger.day}, dangerous) on paper: no red frame, no "!"`, async () => {
      const door = adventWall.door(danger.day);
      await expect(door).toHaveClass(/\bpaper\b/);
      await expect(door).not.toHaveClass(/\bdanger\b/);
      await expect(door).toHaveAccessibleName(w.paper(danger.day));
    });

    await test.step(`${danger.name}: Enter tears the paper; now the red frame and "!", said in its name`, async () => {
      const door = adventWall.door(danger.day);
      await door.focus();
      await page.keyboard.press('Enter');
      await expect(door).toHaveClass(/\bopen\b/);
      await expect(door).toHaveClass(/\bdanger\b/);
      await expect(door).toHaveAccessibleName(`${w.open(danger.day, danger.name)}, ${texts.git.ui.danger}`);
      await expect(adventWall.live).toHaveText(w.revealed(danger.day, danger.name));
    });

    await test.step(`${calm.name} (day ${calm.day}): the 1st click tears the paper, the page stays`, async () => {
      const door = adventWall.door(calm.day);
      const before = page.url();
      await door.click();
      await expect(door).toHaveClass(/\bopen\b/);
      await expect(door).not.toHaveClass(/\bdanger\b/);
      await expect(door).toContainText(calm.name);
      await expect(door).toHaveAccessibleName(w.open(calm.day, calm.name));
      await expect(adventWall.live).toHaveText(w.revealed(calm.day, calm.name));
      if (calm.day === TODAY && (await adventWall.todayCopy.isVisible()))
        await expect(adventWall.todayCopy, "today's big copy opens with it").toHaveClass(/\bopen\b/);
      expect(page.url()).toBe(before);
    });

    await test.step(`${calm.name}: the 2nd click opens its card page`, async () => {
      await adventWall.door(calm.day).click();
      await expect(page).toHaveURL(new RegExp(`/${lang}/git/${calm.id}/$`));
      await expect(gitCardPage.root).toBeVisible();
    });
  },
);

// ── cd1fdd02 ────────────────────────────────────────────────────────────────────────────────────
// The home page as a build of 30 November 2026 (advent start 1 December) wrote it: the served site may already be past
// its own start (previews start earlier), and the page's script only ever opens the enclosure, never closes it.
// Three results (announcement, open, no-JS fallback), so three tests, all reporting to cd1fdd02.

const START = '2026-12-01';
const BUILT = '2026-11-30';

test.describe(`The home page built on ${BUILT}, advent start ${START}`, () => {
  test.setTimeout(120_000); // a whole-site build per test

  test(
    "The home page's Git enclosure is an announcement until the advent start and leads to the wall from it: the day before, an announcement with the date @Tcd1fdd02",
    { tag: [TAG.git] },
    async ({ homePage, lang, texts, page }, testInfo) => {
      const build = await buildOn(BUILT, testInfo.outputPath('build'), START);
      await build.serve(page, `/${lang}/`);
      await page.clock.setFixedTime(`${BUILT}T12:00:00`);
      await homePage.open(lang);
      await expect(homePage.sign('git')).toHaveText(texts.home.gitSign(dayMonth(lang, START)));
      await expect(homePage.gitLink, 'no link to the wall yet').toHaveCount(0);
    },
  );

  test(
    "The home page's Git enclosure is an announcement until the advent start and leads to the wall from it: on the start day, open with a link to the wall @Tcd1fdd02",
    { tag: [TAG.git] },
    async ({ homePage, lang, texts, page }, testInfo) => {
      const build = await buildOn(BUILT, testInfo.outputPath('build'), START);
      await build.serve(page, `/${lang}/`);
      await page.clock.setFixedTime(`${START}T12:00:00`);
      await homePage.open(lang);
      await expect(homePage.sign('git')).toHaveText(texts.home.gitOpenSign);
      await expect(homePage.gitLink).toHaveAttribute('href', `/${lang}/git/`);
      await expect(homePage.gitLink).toContainText(texts.home.gitEnter);
    },
  );

  test.describe('without JavaScript', () => {
    test.use({ javaScriptEnabled: false });

    test(
      "The home page's Git enclosure is an announcement until the advent start and leads to the wall from it: without JS on the start day, the build's announcement stays @Tcd1fdd02",
      { tag: [TAG.git] },
      async ({ homePage, lang, texts, page }, testInfo) => {
        const build = await buildOn(BUILT, testInfo.outputPath('build'), START);
        await build.serve(page, `/${lang}/`);
        await page.clock.setFixedTime(`${START}T12:00:00`);
        await homePage.open(lang);
        await expect(homePage.sign('git')).toHaveText(texts.home.gitSign(dayMonth(lang, START)));
        await expect(homePage.gitLink).toHaveCount(0);
      },
    );
  });
});

// ── cfd7bd88 ────────────────────────────────────────────────────────────────────────────────────

test.describe('Advent wall builds with a pinned date', () => {
  test.setTimeout(120_000); // whole-site builds

  test(
    'The advent wall is hidden from search engines until the advent start @Tcfd7bd88',
    { tag: [TAG.git] },
    async ({}, testInfo) => {
      for (const [date, started] of [
        ['2026-11-30', false],
        ['2026-12-01', true],
      ] as const) {
        await test.step(`build on ${date}: the wall ${started ? 'indexed and in the sitemap' : 'noindex, not in the sitemap'}`, async () => {
          const build = await buildOn(date, testInfo.outputPath(`build-${date}`), '2026-12-01');
          const sitemap = await build.file('sitemap.xml');
          for (const lang of LANGS) {
            const html = await build.file(`${lang}/git/index.html`);
            expect(html.includes('<meta name="robots" content="noindex"'), `/${lang}/git/ noindex on ${date}`).toBe(
              !started,
            );
            expect(
              sitemap.includes(`<loc>https://mnemozoo.com/${lang}/git/</loc>`),
              `/${lang}/git/ in the sitemap on ${date}`,
            ).toBe(started);
          }
        });
      }
    },
  );
});
