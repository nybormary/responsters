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

  /** Card texts (RSP-200): scene title, caption, the "$" line and its hint. */
  get title(): Locator {
    return this.root.getByTestId(TID.gitTitle);
  }
  get caption(): Locator {
    return this.root.getByTestId(TID.gitLine);
  }
  get move(): Locator {
    return this.root.getByTestId(TID.gitMove);
  }
  get hint(): Locator {
    return this.root.getByTestId(TID.gitHint);
  }

  /** "What it does": the technical text, then the one metaphor sentence (grey). */
  get does(): Locator {
    return this.root.getByTestId(TID.gitDoes);
  }

  /** The grey metaphor sentence inside a section or an option. */
  metaOf(section: Locator): Locator {
    return section.getByTestId(TID.gitMeta);
  }

  /** "Options": one item per option (command + text + metaphor). */
  get options(): Locator {
    return this.root.getByTestId(TID.gitOpt);
  }

  /** .gitignore: the piece of the file (name in its caption) and its lines, each with its explanation. */
  get file(): Locator {
    return this.root.getByTestId(TID.gitFile);
  }
  get fileLines(): Locator {
    return this.root.getByTestId(TID.gitFileLine);
  }

  /** The tip, in the side column (moved there in the RSP-200 review). */
  get tip(): Locator {
    return this.root.getByTestId(TID.gitTip);
  }

  /** "Read more": outside links (only cards with links). */
  get links(): Locator {
    return this.root.getByTestId(TID.gitLinks);
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
  /** In "Read more": the terminal command `git help <id>` and the link to its manual on git-scm.com. */
  get helpMore(): Locator {
    return this.root.getByTestId(TID.gitHelpMore);
  }
  /** The command's line from git help, in English on every page (`init — Create an empty Git repository…`). */
  get helpName(): Locator {
    return this.root.getByTestId(TID.gitHelpName);
  }
  get manual(): Locator {
    return this.root.getByTestId(TID.gitManual);
  }
}
