// The advent wall /<lang>/git/ (RSP-195): a paper-covered door per advent day, listed by day and scattered by CSS
// (RSP-198), so the HTML order is the Tab order. The page's
// script paints each door by the visitor's date, so the tests set the browser clock (openOnDay). The advent start comes
// from the page itself (data-date of door 1): deploy previews start earlier than production (netlify.toml).
import { expect, type Page, type Locator, type Response } from '@playwright/test';
import { TID } from '../locators';
import type { Lang } from '../texts';
import { addDays } from '../../../site/js/util.js';

export class AdventWall {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId(TID.adventPage);
  }

  /** Open the wall in `lang`. A path, not an address: the base URL comes from tests/targets.ts. */
  async open(lang: Lang): Promise<Response> {
    const response = await this.page.goto(`/${lang}/git/`);
    if (!response) throw new Error(`no response for /${lang}/git/`);
    await expect(this.wall).toBeVisible();
    return response;
  }

  /**
   * Open the wall with the browser clock at noon of advent day `day` (1 = the advent start of this build) and return
   * that date (YYYY-MM-DD). Noon keeps the date the same in any time zone the runner may have.
   */
  async openOnDay(lang: Lang, day: number): Promise<string> {
    await this.open(lang);
    const date = addDays(await this.start(), day - 1);
    await this.page.clock.setFixedTime(`${date}T12:00:00`);
    await this.page.reload();
    await expect(this.wall).toBeVisible();
    return date;
  }

  /** The advent start the build wrote on the wall: the date of door 1. */
  async start(): Promise<string> {
    const date = await this.door(1).getAttribute('data-date');
    if (!date) throw new Error('door 1 has no data-date');
    return date;
  }

  /** The date door `day` opens on, as the build wrote it. */
  dateOf(start: string, day: number): string {
    return addDays(start, day - 1);
  }

  get wall(): Locator {
    return this.root.getByTestId(TID.adventWall);
  }
  /** The doors on the wall, in HTML order = day order (not the big copy of today's door). */
  get doors(): Locator {
    return this.wall.getByTestId(TID.adventDoor);
  }
  /** The door of advent day `day`, by its data-day (not by position: the order itself is under test, RSP-198). */
  door(day: number): Locator {
    return this.doors.and(this.page.locator(`[data-day="${day}"]`));
  }
  /** The "today" / "missed" flag on the paper of door `day` (empty on other doors). */
  flag(day: number): Locator {
    return this.door(day).getByTestId(TID.doorFlag);
  }
  /** Resolves once the reveal animation of door `day` has finished (it fades in; a check mid-fade sees pale text). */
  async settled(day: number): Promise<void> {
    await this.door(day).evaluate((d) => Promise.all(d.getAnimations({ subtree: true }).map((a) => a.finished)));
  }
  /** The big copy of today's door above the wall, shown on phones only. */
  get todayCopy(): Locator {
    return this.root.getByTestId(TID.adventToday);
  }
  /** The polite live region that announces an opened door. */
  get live(): Locator {
    return this.root.getByTestId(TID.adventLive);
  }
  /**
   * The door that has keyboard focus: on the wall ('wall') or the big copy of today's door ('copy'), with its day and
   * its focus ring as computed; null when focus is on anything else (RSP-198).
   */
  async focusedDoor(): Promise<{ where: 'wall' | 'copy'; day: number; outline: string; outlineWidth: number } | null> {
    return this.page.evaluate(
      ({ door, copy }) => {
        const el = document.activeElement as HTMLElement | null;
        const id = el?.dataset.testid;
        if (!el || (id !== door && id !== copy)) return null;
        const style = getComputedStyle(el);
        return {
          where: id === copy ? ('copy' as const) : ('wall' as const),
          day: Number(el.dataset.day),
          outline: style.outlineStyle,
          outlineWidth: parseFloat(style.outlineWidth),
        };
      },
      { door: TID.adventDoor, copy: TID.adventToday },
    );
  }
  /** The advent day of every door on the wall, in HTML order. */
  async days(): Promise<number[]> {
    return this.doors.evaluateAll((ds) => ds.map((d) => Number((d as HTMLElement).dataset.day)));
  }
}
