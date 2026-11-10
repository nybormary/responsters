// The page as a whole: opening it and what is true for every view.
import { expect, type Page, type Locator } from '@playwright/test';
import { TID, type View } from '../locators';
import { PathSteps } from './path-steps';

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

  /** Click an empty spot in the top-left corner, outside every control. */
  async clickOutside() {
    await this.page.mouse.click(2, 2);
  }

  /** "How to use" (glossary #18): the panel and its steps, the path steps component (RSP-172). */
  get howto(): Locator {
    return this.page.getByTestId(TID.howto);
  }
  get howtoSteps(): PathSteps {
    return new PathSteps(this.howto.getByTestId(TID.howtoSteps));
  }
  /** Show "How to use": a first visit opens it by itself; otherwise the header button opens it. */
  async openHowto() {
    if (await this.howto.isHidden()) await this.page.getByTestId(TID.howtoOpen).click();
    await expect(this.howto).toBeVisible();
  }

  /** Practice answers (RSP-162 test ids) and the feedback after an answer. */
  get answers(): Locator {
    return this.view('practice').locator(TID.anyAnswer);
  }
  answer(code: number): Locator {
    return this.view('practice').getByTestId(TID.answer(code));
  }
  get feedback(): Locator {
    return this.view('practice').getByTestId(TID.feedback);
  }
  /** The right code of the current Practice question in the default mode (picture → code): the picture's file name. */
  async rightCode(): Promise<number> {
    const src = await this.view('practice').getByTestId(TID.question).locator('img').getAttribute('src');
    const code = Number(src?.match(/(\d{3})-art/)?.[1]);
    if (!code) throw new Error(`No code in the question picture (${src}): is Practice in "picture → code"?`);
    return code;
  }
  /** Codes of the answers shown, in order. */
  async answerCodes(): Promise<number[]> {
    return this.answers.evaluateAll((els) => els.map((el) => Number(el.getAttribute('data-testid')?.slice(7))));
  }

  /** One situation in Traps (pair index, line index) and its code buttons. */
  situation(pair: number, line: number): Locator {
    return this.view('traps').getByTestId(TID.situation(pair, line));
  }
  /** How many situations a trap has. */
  async situationCount(pair: number): Promise<number> {
    return this.view('traps').locator(`[data-testid^="situation-${pair}-"]`).count();
  }
  situationAnswers(pair: number, line: number): Locator {
    return this.situation(pair, line).locator(TID.anyAnswer);
  }
}
