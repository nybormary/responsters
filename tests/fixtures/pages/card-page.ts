// A card page /<lang>/http/<code>/ (RSP-90): a static page per creature and language.
import type { Page, Locator } from '@playwright/test';
import { TID } from '../locators';
import type { Lang } from '../texts';

export class CardPage {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId(TID.cardPage);
  }

  /** Open the card page of `code` in `lang`. Paths, not addresses: the base URL comes from tests/targets.ts. */
  async open(lang: Lang, code: number) {
    await this.page.goto(`/${lang}/http/${code}/`);
  }

  /** Open the language-less card page /http/<code>/: the site sends the browser on to its language (RSP-138). */
  async openLanguageless(code: number) {
    await this.page.goto(`/http/${code}/`);
  }

  /** The <html> element; its lang attribute is the language the page is shown in. */
  get html(): Locator {
    return this.page.locator('html');
  }

  /** The creature picture on the card page. */
  get art(): Locator {
    return this.root.getByTestId(TID.cardArt);
  }

  /** True when the creature picture has loaded (a broken or missing file has naturalWidth 0). */
  async artLoaded(): Promise<boolean> {
    return this.art.evaluate((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0);
  }

  /** The section headings of the card page (What it means, When you meet it, …): h2 (RSP-170 AC3). */
  get sectionHeadings(): Locator {
    return this.page.getByRole('main').getByRole('heading', { level: 2 });
  }
}
