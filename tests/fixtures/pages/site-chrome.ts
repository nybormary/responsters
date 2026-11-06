// The site header and footer (RSP-156, RSP-155): the same on the home page, the app and every card page.
// Landmarks are found by role on purpose: the role is what is checked.
import type { Page, Locator } from '@playwright/test';
import { TID } from '../locators';

export class SiteChrome {
  readonly page: Page;
  readonly header: Locator;
  readonly footer: Locator;

  constructor(page: Page) {
    this.page = page;
    this.header = page.getByTestId(TID.siteHeader);
    this.footer = page.getByTestId(TID.siteFooter);
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
  /** The footer's note: the first child, the text before the security.txt link. */
  get footerNote(): Locator {
    return this.footer.locator(':scope > span');
  }
  get securityLink(): Locator {
    return this.footer.getByRole('link', { name: 'security.txt' });
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
