// The home page /<lang>/ (RSP-156): hero, zoo map, how it works, about. Built by scripts/build-pages.mjs.
import { expect, type Page, type Locator } from '@playwright/test';
import { TID } from '../locators';
import { PRODUCTION_URL } from '../../targets';
import type { Lang } from '../texts';
import { PathSteps } from './path-steps';

/** Canonical and hreflang links always point to production, whatever site the test runs on. */
export const ORIGIN = PRODUCTION_URL;

export class HomePage {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId(TID.homePage);
  }

  /** Open the home page in `lang`. A path, not an address: the base URL comes from tests/targets.ts. */
  async open(lang: Lang) {
    await this.page.goto(`/${lang}/`);
    await expect(this.root).toBeVisible();
  }

  /**
   * Open a language-less path ('/', '/#traps'): the site sends the browser on to its language
   * (Netlify by a redirect, a local run by the chooser page, RSP-138).
   */
  async openLanguageless(path: string) {
    await this.page.goto(path);
  }

  /** The <html> element; its lang attribute is the language the page is shown in. */
  get html(): Locator {
    return this.page.locator('html');
  }
  get h1(): Locator {
    return this.root.getByRole('heading', { level: 1 });
  }
  get hero(): Locator {
    return this.root.getByTestId(TID.homeHero);
  }
  get about(): Locator {
    return this.root.getByTestId(TID.homeAbout);
  }
  get zooMap(): Locator {
    return this.root.getByTestId(TID.zooMap);
  }

  /** "How it works" (RSP-172): the path steps component. */
  get steps(): PathSteps {
    return new PathSteps(this.root.getByTestId(TID.homeSteps));
  }

  /** One creature in the hero: a figure with the picture and the code as its caption. */
  heroCard(code: number): Locator {
    return this.hero.getByTestId(TID.heroCard(code));
  }
  heroPicture(code: number): Locator {
    return this.heroCard(code).getByRole('img');
  }
  heroCaption(code: number): Locator {
    return this.heroCard(code).locator('figcaption');
  }

  /** The tilt of a hero card in degrees, read from its computed transform (0 when it isn't turned). */
  async heroTilt(code: number): Promise<number> {
    return this.heroCard(code).evaluate((el) => {
      const t = getComputedStyle(el).transform;
      if (!t || t === 'none') return 0;
      const [a, b] = t
        .slice(t.indexOf('(') + 1, -1)
        .split(',')
        .map(Number);
      return Math.round(((Math.atan2(b, a) * 180) / Math.PI) * 10) / 10;
    });
  }

  /** Running animations or transitions on a hero card: the tilt is static, so there must be none. */
  async heroAnimations(code: number): Promise<number> {
    return this.heroCard(code).evaluate((el) => el.getAnimations({ subtree: true }).length);
  }

  /** True when the middle of the code caption is not covered by anything else (e.g. the next tilted card). */
  async heroCaptionOnTop(code: number): Promise<boolean> {
    return this.heroCaption(code).evaluate((el) => {
      const r = el.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
      return hit !== null && (hit === el || el.contains(hit));
    });
  }

  /** Nothing on the page is wider than the window (no sideways scroll). */
  async fitsWidth(): Promise<boolean> {
    return this.page.evaluate(() => document.documentElement.scrollWidth <= document.documentElement.clientWidth);
  }

  /** Narrow the window to `width` px, keeping the height (e.g. 320, the narrowest phone we support). */
  async setWidth(width: number) {
    const size = this.page.viewportSize();
    await this.page.setViewportSize({ width, height: size?.height ?? 740 });
  }

  /** Head: what search engines read. */
  get description(): Locator {
    return this.page.locator('head meta[name="description"]');
  }
  get canonical(): Locator {
    return this.page.locator('head link[rel="canonical"]');
  }
  /** All hreflang links in the head (one per language + x-default). */
  get alternates(): Locator {
    return this.page.locator('head link[rel="alternate"][hreflang]');
  }
  alternate(hreflang: string): Locator {
    return this.page.locator(`head link[rel="alternate"][hreflang="${hreflang}"]`);
  }
}
