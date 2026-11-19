// The site header and footer (RSP-156, RSP-155): the same on the home page, the app and every card page.
// Landmarks are found by role on purpose: the role is what is checked.
import type { Page, Locator } from '@playwright/test';
import { expect } from '@playwright/test';
import { TID } from '../locators';
import { textsFor, type Lang } from '../texts';

export class SiteChrome {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId(TID.siteHeader);
    this.footer = page.getByTestId(TID.siteFooter);
  }

  /** The hint on a language-less page that offers the visitor's language (RSP-216). */
  get langHint(): Locator {
    return this.page.getByTestId(TID.langHint);
  }
  get langHintOpen(): Locator {
    return this.langHint.getByTestId(TID.langHintOpen);
  }
  get langHintClose(): Locator {
    return this.langHint.getByTestId(TID.langHintClose);
  }

  /**
   * The language hint offers `lang` for the language-less address `at` (path + query + hash): its text, button and
   * close label in that language, the button leading to /<lang><at>. For 'en' there is no hint at all.
   */
  async expectLangHint(lang: Lang, at: string) {
    if (lang === 'en') {
      await expect(this.langHint, 'no language hint for English').toHaveCount(0);
      return;
    }
    const t = (await textsFor(lang)).site.langHint;
    await expect(this.langHint).toBeVisible();
    await expect(this.langHint).toHaveAttribute('lang', lang);
    await expect(this.langHint).toContainText(t.text);
    await expect(this.langHintOpen).toHaveText(t.open);
    await expect(this.langHintOpen).toHaveAttribute('href', `/${lang}${at}`);
    await expect(this.langHintClose).toHaveAccessibleName(t.close);
  }

  get logo(): Locator {
    return this.header.getByTestId(TID.siteLogo);
  }
  get mapLink(): Locator {
    return this.header.getByTestId(TID.navMap);
  }
  get aboutLink(): Locator {
    return this.header.getByTestId(TID.navAbout);
  }
  /** The navigation landmark inside the site header. */
  get nav(): Locator {
    return this.header.getByRole('navigation');
  }
  /** The language menu button inside the site header (app: JS menu, generated pages: <details>). */
  get langButton(): Locator {
    return this.header.getByTestId(TID.langButton);
  }
  /** The footer's credits line (RSP-139: the second row, after © years Mnemozoo). */
  get footerNote(): Locator {
    return this.footer.getByTestId(TID.foot('credits'));
  }
  get securityLink(): Locator {
    return this.footer.getByTestId(TID.foot('security'));
  }
  /** A footer link or text by its id (RSP-139). */
  foot(id: Parameters<typeof TID.foot>[0]): Locator {
    return this.footer.getByTestId(TID.foot(id));
  }

  /** Landmarks of the whole page. */
  get banners(): Locator {
    return this.page.getByRole('banner');
  }
  get mains(): Locator {
    return this.page.getByRole('main');
  }
  get contentinfos(): Locator {
    return this.page.getByRole('contentinfo');
  }
  /** The app's own header (enclosure header) inside <main>. */
  get enclosureHeaderInMain(): Locator {
    return this.mains.getByTestId(TID.enclosureHeader);
  }
}
