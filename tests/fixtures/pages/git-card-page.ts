// A git card page /<lang>/git/<id>/ (RSP-199): the git card, its sections (texts from RSP-200) and the side column
// ("Often confused with", "In git help").
import type { Page, Locator, Response } from '@playwright/test';
import { TID } from '../locators';
import type { Lang } from '../texts';

export class GitCardPage {
  readonly page: Page;
  readonly root: Locator;

  constructor(page: Page) {
    this.page = page;
    this.root = page.getByTestId(TID.gitCardPage);
  }

  /** Open the page of git card `id` in `lang`. Paths, not addresses: the base URL comes from tests/targets.ts. */
  async open(lang: Lang, id: string): Promise<Response> {
    const response = await this.page.goto(`/${lang}/git/${id}/`);
    if (!response) throw new Error(`no response for /${lang}/git/${id}/`);
    return response;
  }

  /** The <html> element; its lang attribute is the language the page is shown in. */
  get html(): Locator {
    return this.page.locator('html');
  }

  /** The card frame; a danger card has the class "danger" (brick-red frame). */
  get card(): Locator {
    return this.root.getByTestId(TID.gitCard);
  }

  /** The badge with the command, e.g. "git stash" (the space after "git" is a no-break space). */
  get command(): Locator {
    return this.root.getByTestId(TID.gitCommand);
  }

  /** The group name under the badge, in the page language. */
  get group(): Locator {
    return this.root.getByTestId(TID.gitGroup);
  }

  /** The card picture: the drawn scene, or the placeholder egg while it isn't drawn. */
  get art(): Locator {
    return this.root.getByTestId(TID.cardArt);
  }

  /** True when the picture has loaded (a broken or missing file has naturalWidth 0). */
  async artLoaded(): Promise<boolean> {
    return this.art.evaluate((img) => (img as HTMLImageElement).complete && (img as HTMLImageElement).naturalWidth > 0);
  }

  /** The "!" danger mark on the picture (danger cards only). */
  get dangerMark(): Locator {
    return this.root.getByTestId(TID.gitDanger);
  }

  /** The "Careful" box in the main column (danger cards with texts only). */
  get careful(): Locator {
    return this.root.getByTestId(TID.gitCareful);
  }

  /** Section headings of the main column (What it does, Options, Careful): h2. */
  get mainHeadings(): Locator {
    return this.root.locator('.page-main').getByRole('heading', { level: 2 });
  }

  /** "Often confused with": the commands (absent while the card has none). */
  get confused(): Locator {
    return this.root.getByTestId(TID.gitConf);
  }

  /** "In git help": the heading naming the list (`git help`, `git help -a`, …), the section, the manual line. */
  get helpTitle(): Locator {
    return this.root.getByTestId(TID.gitHelpTitle);
  }
  get helpSection(): Locator {
    return this.root.getByTestId(TID.gitHelp);
  }
  get helpMore(): Locator {
    return this.root.getByTestId(TID.gitHelpMore);
  }
}
