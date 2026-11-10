// A list of path steps (RSP-172; glossary path steps, step marker, step art): the home page's "How it works" and the
// app's "How to use" use the same component. Built from the list's own test id, so one class serves both places.
import type { Locator } from '@playwright/test';
import { TID } from '../locators';

export type MarkerLook = { background: string; borderStyle: string; borderRadius: string };

export class PathSteps {
  readonly root: Locator;

  constructor(root: Locator) {
    this.root = root;
  }

  /** The steps, found by role: list semantics are part of what is checked (role="list" for Safari). */
  get items(): Locator {
    return this.root.getByRole('listitem');
  }
  item(i: number): Locator {
    return this.items.nth(i);
  }
  get markers(): Locator {
    return this.root.getByTestId(TID.stepMarker);
  }
  marker(i: number): Locator {
    return this.item(i).getByTestId(TID.stepMarker);
  }
  heading(i: number): Locator {
    return this.item(i).getByRole('heading', { level: 3 });
  }

  /** Step art (home page only): pictures and chips. aria-hidden on purpose, so found by test id and tag, not by role. */
  art(i: number): Locator {
    return this.item(i).getByTestId(TID.stepArt);
  }
  pictures(i: number): Locator {
    return this.art(i).locator('img');
  }
  chips(i: number): Locator {
    return this.art(i).getByTestId(TID.stepChip);
  }

  /** True when every picture of step i has loaded (a broken src has naturalWidth 0). */
  async picturesLoaded(i: number): Promise<boolean> {
    return this.pictures(i).evaluateAll((imgs) => imgs.every((img) => (img as HTMLImageElement).naturalWidth > 0));
  }

  /**
   * The dashed line after step i (the ::after of the step): 'down' (one column, phones), 'across' (side by side,
   * wide screens) or 'none' (the last step has no line). Its length is not checked: an absolutely placed line that
   * ran off the screen would make the page scroll sideways, and that is checked on the page.
   */
  async lineAfter(i: number): Promise<'down' | 'across' | 'none' | 'not dashed'> {
    return this.item(i).evaluate((el) => {
      const s = getComputedStyle(el, '::after');
      if (s.content === 'none' || s.content === 'normal') return 'none';
      if (s.borderLeftStyle === 'dashed') return 'down';
      if (s.borderTopStyle === 'dashed') return 'across';
      return 'not dashed';
    });
  }

  /** Background colour of step i: no pastel card, the step sits on the page. */
  async background(i: number): Promise<string> {
    return this.item(i).evaluate((el) => getComputedStyle(el).backgroundColor);
  }

  /** What makes a marker look like a step marker; compared between the two lists. */
  async markerLook(i: number): Promise<MarkerLook> {
    return this.marker(i).evaluate((el) => {
      const s = getComputedStyle(el);
      return { background: s.backgroundColor, borderStyle: s.borderTopStyle, borderRadius: s.borderRadius };
    });
  }
}
