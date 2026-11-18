// Git card pages /<lang>/git/<id>/ (RSP-199). testomat.io folder "Git cards", suite "Git card pages (RSP-199)".
// Manual only: cc96d414 ("In git help" names the right list, section and manual).
// 2b281d82: step 1 (a card with texts, RSP-200 batch 1) and step 2 (a card without texts, while there are any).
import { test, expect, TAG, GIT_CARDS, GIT_EGG, LANGS, THEMES, buildOn, type GitCard } from '../fixtures';

const pick = <T>(list: T[]): T => list[Math.floor(Math.random() * list.length)];
/** The badge text as a visitor reads it: the no-break space after "git" counts as a space. */
const plain = (s: string | null) => (s ?? '').replace(/ /g, ' ').trim();

// ── aefc6e30 ────────────────────────────────────────────────────────────────────────────────────

test(
  'Every git card page opens in a random site language with its command, group and picture @Taefc6e30',
  { tag: [TAG.git] },
  async ({ gitCardPage, page, lang, texts }) => {
    const problems: string[] = [];
    page.on('console', (m) => m.type() === 'error' && problems.push(`console: ${m.text()}`));
    page.on('pageerror', (e) => problems.push(`page error: ${e.message}`));
    page.on('requestfailed', (r) => {
      if (!/cloudflareinsights/.test(r.url())) problems.push(`request failed: ${r.url()}`); // analytics is blocked on purpose
    });

    for (const g of GIT_CARDS) {
      await test.step(`${g.name}: page, command, group, picture`, async () => {
        const response = await gitCardPage.open(lang, g.id);
        expect(response.status()).toBe(200);
        await expect(gitCardPage.html).toHaveAttribute('lang', lang);
        await expect(page).toHaveTitle(new RegExp(`^${g.name.replace('.', '\\.')}(: .+)? · Mnemozoo$`));
        expect(plain(await gitCardPage.command.textContent())).toBe(g.name);
        await expect(gitCardPage.group).toHaveText(texts.git.groups[g.group as keyof typeof texts.git.groups]);
        if (g.art) await expect(gitCardPage.art).toHaveAttribute('src', g.art);
        else {
          await expect(gitCardPage.art).toHaveAttribute('src', GIT_EGG.src);
          await expect(gitCardPage.art).toHaveAttribute('alt', GIT_EGG.alt);
        }
        await expect.poll(() => gitCardPage.artLoaded()).toBe(true);
      });
    }
    expect(problems, 'console errors and failed requests').toEqual([]);
  },
);

// ── b91ec8f5 ────────────────────────────────────────────────────────────────────────────────────

test.describe('Builds with a pinned date', () => {
  test.setTimeout(120_000); // four builds of the whole site

  const opensBy = (g: GitCard, date: string) => date >= `2026-12-${String(g.day).padStart(2, '0')}`;

  test(
    'A git card page is hidden from search engines until its advent day @Tb91ec8f5',
    { tag: [TAG.git] },
    async ({}, testInfo) => {
      for (const date of ['2026-11-30', '2026-12-09', '2027-01-02']) {
        await test.step(`build on ${date}: open days indexed and in the sitemap, the rest noindex`, async () => {
          const build = await buildOn(date, testInfo.outputPath(`build-${date}`));
          const sitemap = await build.file('sitemap.xml');
          // The cards by name in the report (RSP-207): which are open on this date and which stay hidden.
          const names = (open: boolean) =>
            GIT_CARDS.filter((g) => opensBy(g, date) === open)
              .map((g) => g.id)
              .join(', ') || 'none';
          await test.step(`indexed, in the sitemap: ${names(true)}`, async () => {});
          await test.step(`noindex, not in the sitemap: ${names(false)}`, async () => {});
          await test.step(`checked in ${LANGS.join(', ')}`, async () => {});
          for (const lang of LANGS)
            for (const g of GIT_CARDS) {
              const url = `/${lang}/git/${g.id}/`;
              const html = await build.file(`${lang}/git/${g.id}/index.html`);
              const open = opensBy(g, date);
              expect(html.includes('<meta name="robots" content="noindex"'), `${url} noindex on ${date}`).toBe(!open);
              expect(sitemap.includes(`<loc>https://mnemozoo.com${url}</loc>`), `${url} in sitemap on ${date}`).toBe(
                open,
              );
              expect(html, `${url} canonical`).toContain(`<link rel="canonical" href="https://mnemozoo.com${url}"`);
              expect(html, `${url} hreflang`).toContain('hreflang="x-default"');
            }
          const openCount = GIT_CARDS.filter((g) => opensBy(g, date)).length;
          testInfo.annotations.push({
            type: 'open cards',
            description: `${date}: ${openCount} of ${GIT_CARDS.length}`,
          });
        });
      }

      await test.step('a date that is not YYYY-MM-DD stops the build', async () => {
        await expect(buildOn('not-a-date', testInfo.outputPath('build-bad'))).rejects.toThrow(
          /BUILD_DATE=not-a-date is not YYYY-MM-DD/,
        );
      });
    },
  );
});

// ── 756d2279 ────────────────────────────────────────────────────────────────────────────────────

test(
  "A random dangerous git command's card shows the danger mark, a random other card doesn't @T756d2279",
  { tag: [TAG.git] },
  async ({ gitCardPage, lang, texts }) => {
    const danger = pick(GIT_CARDS.filter((g) => g.danger));
    const calm = pick(GIT_CARDS.filter((g) => !g.danger));
    const cards = texts.git.cards as Record<string, { careful?: string[] }>;

    await test.step(`${danger.name}: brick-red frame and one "!" with its label`, async () => {
      await gitCardPage.open(lang, danger.id);
      await expect(gitCardPage.card).toHaveClass(/\bdanger\b/);
      await expect(gitCardPage.dangerMark).toHaveCount(1);
      await expect(gitCardPage.dangerMark).toHaveAccessibleName(texts.git.ui.danger);
      await expect(gitCardPage.careful).toHaveCount(cards[danger.id]?.careful?.length ? 1 : 0);
    });

    await test.step(`${calm.name}: no danger frame, no "!", no "Careful"`, async () => {
      await gitCardPage.open(lang, calm.id);
      await expect(gitCardPage.card).not.toHaveClass(/\bdanger\b/);
      await expect(gitCardPage.dangerMark).toHaveCount(0);
      await expect(gitCardPage.careful).toHaveCount(0);
    });
  },
);

// ── 2b281d82 ────────────────────────────────────────────────────────────────────────────────────

/** Texts mark commands with backticks; the page shows them as <code>, so the visible text has no backticks. */
const visible = (s: string) => s.replace(/`/g, '');

type CardTexts = {
  title: string;
  line: string;
  move: string;
  hint: string;
  does: { text: string; meta: string };
  tip?: string;
  opts?: { cmd: string; text: string; meta: string }[];
};

test(
  'A git card page shows only the sections that have texts: a random card with texts and a random card without @T2b281d82',
  { tag: [TAG.git] },
  async ({ gitCardPage, lang, texts }) => {
    const cards = texts.git.cards as Record<string, CardTexts | undefined>;

    const g = pick(GIT_CARDS.filter((x) => cards[x.id]));
    const t = cards[g.id] as CardTexts;
    await test.step(`${g.name} (with texts): card texts, What it does, tip, Options, Often confused with`, async () => {
      await gitCardPage.open(lang, g.id);
      await expect(gitCardPage.title).toHaveText(t.title);
      await expect(gitCardPage.caption).toHaveText(t.line);
      await expect(gitCardPage.move).toHaveText(t.move);
      await expect(gitCardPage.hint).toHaveText(t.hint);
      await expect(gitCardPage.does).toContainText(visible(t.does.text));
      await expect(gitCardPage.metaOf(gitCardPage.does)).toHaveText(visible(t.does.meta));
      if (t.tip) await expect(gitCardPage.tip).toHaveText(`${texts.git.ui.tip}. ${visible(t.tip)}`);
      const opts = t.opts ?? [];
      await expect(gitCardPage.options).toHaveCount(opts.length);
      for (const [i, o] of opts.entries()) {
        const item = gitCardPage.options.nth(i);
        await expect(item, `option ${o.cmd}`).toContainText(o.cmd);
        await expect(item, `option ${o.cmd}: text`).toContainText(visible(o.text));
        await expect(gitCardPage.metaOf(item), `option ${o.cmd}: metaphor`).toHaveText(visible(o.meta));
      }
      for (const name of g.conf ?? []) {
        const own = GIT_CARDS.find((x) => x.name === name);
        const chip = gitCardPage.confused.getByText(name, { exact: true });
        await expect(chip, `often confused with: ${name}`).toBeVisible();
        if (own)
          await expect(gitCardPage.confused.getByRole('link', { name })).toHaveAttribute(
            'href',
            `/${lang}/git/${own.id}/`,
          );
        else await expect(gitCardPage.confused.getByRole('link', { name })).toHaveCount(0);
      }
      for (const l of g.links ?? []) {
        const a = gitCardPage.links.getByRole('link', { name: new RegExp(l.label[lang] ?? l.label.en) });
        await expect(a, `read more: ${l.u}`).toHaveAttribute('href', l.u);
      }
      await expect(gitCardPage.root).not.toContainText('undefined');
    });

    const bare = GIT_CARDS.filter((x) => !cards[x.id] && !x.conf);
    if (bare.length === 0) return; // RSP-200: once every card has texts, step 2 has nothing to check
    const b = pick(bare);
    await test.step(`${b.name} (no texts yet): no empty sections, the card and "In git help" only`, async () => {
      await gitCardPage.open(lang, b.id);
      await expect(gitCardPage.command).toBeVisible();
      await expect(gitCardPage.mainHeadings).toHaveCount(0);
      await expect(gitCardPage.careful).toHaveCount(0);
      await expect(gitCardPage.confused).toHaveCount(0);
      await expect(gitCardPage.tip).toHaveCount(0);
      await expect(gitCardPage.links).toHaveCount(0);
      await expect(gitCardPage.helpSection).toBeVisible();
      await expect(gitCardPage.root).not.toContainText('undefined');
    });
  },
);

// ── 4354a333 ────────────────────────────────────────────────────────────────────────────────────
// Found on PR #55 (2026-11-17): dark text on dark chips in the dark theme. axe's color-contrast rule (WCAG AA) measures
// every visible text; the wall is checked on advent day 10 with one door opened, so paper doors with both flags, a
// locked door and an open door are all on screen.

test(
  'Every text on a random git card page and the advent wall has enough contrast in the light and the dark theme @T4354a333',
  { tag: [TAG.git] },
  async ({ gitCardPage, adventWall, axe, lang }) => {
    const g = pick(GIT_CARDS.filter((x) => x.conf?.length && x.day <= 10));
    for (const theme of THEMES) {
      await test.step(`${theme}: ${g.name} card page (chips, code pills, tip, Read more)`, async () => {
        await axe.theme(theme);
        await gitCardPage.open(lang, g.id);
        await axe.expectNoViolations(`${theme}, git card page ${g.name}`);
      });
      // The first theme opens the door; the wall remembers it (RSP-196), so in the second theme it is already open.
      const first = theme === THEMES[0];
      await test.step(`${theme}: the advent wall on day 10, door ${g.day} ${first ? 'opened' : 'still open (remembered)'}`, async () => {
        await adventWall.openOnDay(lang, 10);
        if (first) await adventWall.door(g.day).click();
        await expect(adventWall.door(g.day)).toHaveClass(/\bopen\b/);
        await adventWall.settled(g.day);
        await axe.expectNoViolations(`${theme}, advent wall`);
      });
    }
  },
);
