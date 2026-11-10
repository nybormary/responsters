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

  option(lang: Lang): Locator {
    return this.page.getByTestId(TID.langOption(lang));
  }

  /** All options, in menu order. */
  get options(): Locator {
    return this.list.getByRole('menuitemradio');
  }

  /** The option marked as the current language. */
  get checked(): Locator {
    return this.list.locator('[aria-checked="true"]');
  }

  async open() {
    await this.button.click();
  }

  /** Open the menu and pick a language with the mouse. */
  async pick(lang: Lang) {
    await this.open();
    await this.option(lang).click();
  }

  /** The text the button shows right now: the language name on wide screens, its code on phones (RSP-169). */
  async visibleText(): Promise<string> {
    return this.button.evaluate((el) =>
      [...el.children]
        .filter((c) => !c.classList.contains('sr-only') && getComputedStyle(c).display !== 'none')
        .map((c) => c.textContent?.trim() ?? '')
        .join(' ')
        .trim(),
    );
  }

  /** Click the top-left corner of the site footer: outside the menu, on nothing clickable, on every page (RSP-181).
   * Not the h1 (the open menu covers it on a card page) nor the corner of <main> (the app's title link is there). */
  async clickOutside() {
    await this.page.getByTestId(TID.siteFooter).click({ position: { x: 2, y: 2 } });
  }

  /** Open the menu with the keyboard and move the focus onto a language inside it (RSP-181): the app's menu takes
   * the focus by itself, the <details> menu needs a Tab. */
  async openWithKeyboardFocusInside() {
    await this.button.focus();
    await this.page.keyboard.press('Enter');
    if (await this.button.evaluate((b) => b === document.activeElement)) await this.page.keyboard.press('Tab');
  }

  /** Click inside the open menu on its edge, not on a language (RSP-181): the menu must stay open. */
  async clickInsideEdge() {
    await this.list.click({ position: { x: 2, y: 2 } });
  }
}
