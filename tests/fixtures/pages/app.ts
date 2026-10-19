// The page as a whole: opening it and what is true for every view.
import type { Page, Locator } from '@playwright/test';
import { TID, type View } from '../locators';

export class App {
  readonly page: Page;
  constructor(page: Page) { this.page = page; }

  /** Open the site, optionally on a view (#practice, #traps). */
  async open(view?: View) {
    await this.page.goto(view ? `/#${view}` : '/');
  }

  /** The <html> element; its lang attribute is the language the page is shown in. */
  get html(): Locator { return this.page.locator('html'); }

  tab(view: View): Locator { return this.page.getByTestId(TID.tab(view)); }
  view(view: View): Locator { return this.page.getByTestId(TID.view(view)); }

  /** Click an empty spot in the top-left corner, outside every control. */
  async clickOutside() {
    await this.page.mouse.click(2, 2);
  }
}
