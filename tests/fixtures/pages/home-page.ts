// The home page /<lang>/ (RSP-156): hero, zoo map, how it works, about. Built by scripts/build-pages.mjs.
import { expect, type Page, type Locator } from '@playwright/test';
import { TID } from '../locators';
import { PRODUCTION_URL } from '../../targets';
import type { Lang } from '../texts';

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
