// The language menu in the header (RSP-109): a button with the current language and a list of languages.
import type { Page, Locator } from '@playwright/test';
import { TID } from '../locators';
import type { Lang } from '../texts';

export class LanguageMenu {
  readonly page: Page;
  readonly button: Locator;
  readonly list: Locator;

  constructor(page: Page) {
    this.page = page;
    this.button = page.getByTestId(TID.langButton);
    this.list = page.getByTestId(TID.langMenu);
  }

  option(lang: Lang): Locator { return this.page.getByTestId(TID.langOption(lang)); }

  /** All options, in menu order. */
  get options(): Locator { return this.list.getByRole('menuitemradio'); }

  /** The option marked as the current language. */
  get checked(): Locator { return this.list.locator('[aria-checked="true"]'); }

  async open() { await this.button.click(); }

  /** Open the menu and pick a language with the mouse. */
  async pick(lang: Lang) {
    await this.open();
    await this.option(lang).click();
  }
}
