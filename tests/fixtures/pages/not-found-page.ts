// The page for a missing address (RSP-148): /<lang>/404.html, served with status 404.
import type { Page, Locator, Response } from '@playwright/test';
import { TID } from '../locators';

export class NotFoundPage {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId(TID.notFoundPage);
  }

  /** Open a path that doesn't exist; returns the HTTP response, to check its status and size. */
  async open(path: string): Promise<Response> {
    const response = await this.page.goto(path);
    if (!response) throw new Error(`no response for ${path}`);
    return response;
  }

  get html(): Locator {
    return this.page.locator('html');
  }
  get h1(): Locator {
    return this.root.getByRole('heading', { level: 1 });
  }
  get card(): Locator {
    return this.root.getByTestId(TID.card(404));
  }
  get cardPicture(): Locator {
    return this.card.getByTestId(TID.cardArt);
  }
  get back(): Locator {
    return this.root.getByTestId(TID.notFoundBack);
  }
}
