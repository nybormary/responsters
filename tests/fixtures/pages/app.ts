// The page as a whole: opening it and what is true for every view.
import { expect, type Page, type Locator } from '@playwright/test';
import { TID, type View } from '../locators';

export const VIEWS: View[] = ['collection', 'practice', 'traps'];

export class App {
  readonly page: Page;
  /** Uncaught page errors since the page was created (e.g. a broken module). */
  readonly errors: Error[] = [];

  constructor(page: Page) {
    this.page = page;
    page.on('pageerror', (e) => this.errors.push(e));
  }

  /**
   * Open the app by its language-less URL /http/, optionally on a view (#practice, #traps) or any raw hash
   * ('nonsense'). The site sends the browser on to /<lang>/http/ (RSP-138): Netlify by a redirect, a local
   * run by a chooser page. Either way the saved language, then the browser language decides.
   */
  async open(view?: View | string) {
    await this.page.goto(view ? `/http/#${view}` : '/http/');
    await expect(this.page).toHaveURL(/\/[a-z]{2}\/http\/(#.*)?$/);
    await this.ready();
  }

  /** The language in the URL path: '/pl/http/#practice' → 'pl'. */
  pathLang(): string {
    return new URL(this.page.url()).pathname.split('/')[1];
  }

  /**
   * Wait until the app has drawn itself. The site loads the language file before it wires the click
   * handlers (top-level await in state.js), and the `load` event doesn't wait for that, so a click right
   * after goto() can be lost (any language but English, which is bundled). Tab labels are filled in only
   * by the first render, which runs after the handlers are wired.
   */
  async ready() {
    await expect(this.tab('collection')).not.toHaveText('');
  }

  /** The hash part of the current URL without '#': 'practice', or '' when there is none. */
  hash(): string {
    return new URL(this.page.url()).hash.slice(1);
  }

  async back() {
    await this.page.goBack();
  }
  async forward() {
    await this.page.goForward();
  }
  async reload() {
    await this.page.reload();
    await this.ready();
  }

  /** The <html> element; its lang attribute is the language the page is shown in. */
  get html(): Locator {
    return this.page.locator('html');
  }

  /** The page's <main> landmark (RSP-138): holds the tabs and the three views. */
  get main(): Locator {
    return this.page.getByRole('main');
  }

  tab(view: View): Locator {
    return this.page.getByTestId(TID.tab(view));
  }
  view(view: View): Locator {
    return this.page.getByTestId(TID.view(view));
  }

  /** Click an empty spot in the top-left corner, outside every control. */
  async clickOutside() {
    await this.page.mouse.click(2, 2);
  }
}
