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

  /** The creature picture on the card page. */
  get art(): Locator {
    return this.root.getByTestId(TID.cardArt);
  }
}
