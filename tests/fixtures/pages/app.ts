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

  /** Landmarks (RSP-138). Found by role on purpose: the role is what is checked. */
  get main(): Locator {
    return this.page.getByRole('main');
  }
  get banner(): Locator {
    return this.page.getByRole('banner');
  }
  get contentinfo(): Locator {
    return this.page.getByRole('contentinfo');
  }
  /** A tab or a view inside <main>. */
  tabInMain(view: View): Locator {
    return this.main.getByTestId(TID.tab(view));
  }
  viewInMain(view: View): Locator {
    return this.main.getByTestId(TID.view(view));
  }

  /** The picture of one card in the Collection grid. */
  collectionArt(code: number): Locator {
    return this.page.getByTestId(TID.card(code)).getByTestId(TID.cardArt);
  }

  tab(view: View): Locator {
    return this.page.getByTestId(TID.tab(view));
  }
  view(view: View): Locator {
    return this.page.getByTestId(TID.view(view));
  }

  /** "How to use" (the hint above the tabs) and the link that opens it. */
  get howto(): Locator {
    return this.page.getByTestId(TID.howto);
  }
  /** Show "How to use". A first-time visitor already sees it open; the link toggles it, so click only when closed. */
  async openHowto() {
    if (await this.howto.isHidden()) await this.page.getByTestId(TID.howtoOpen).click();
    await expect(this.howto).toBeVisible();
  }

  /** Practice (RSP-162): the answers of the current question and the feedback after an answer. */
  get answers(): Locator {
    return this.view('practice').locator(TID.anyAnswer);
  }
  get feedback(): Locator {
    return this.view('practice').getByTestId(TID.feedback);
  }
  /** Answer the current Practice question with its first answer (right or wrong) and wait for the feedback. */
  async answerPractice() {
    await this.answers.first().click();
    await expect(this.feedback).toBeVisible();
  }

  /** Click an empty spot in the top-left corner, outside every control. */
  async clickOutside() {
    await this.page.mouse.click(2, 2);
  }
}
