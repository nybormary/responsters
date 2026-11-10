// Keyboard focus outline (RSP-169 AC5, WCAG 2.4.7): walk a page with Tab and read the outline of every element that
// gets focus. Read from the computed style, so a token change in base.css doesn't need a test change.
import type { Page } from '@playwright/test';

export type FocusRing = { element: string; width: number; style: string; ratio: number };

/**
 * Press Tab from the top of the page until focus comes back to the first element (or `max` presses) and return the
 * outline of every focused element: width, style and its contrast to the colour behind the element (the outline
 * is drawn outside it, so the parent's background counts).
 */
export async function focusRingsByTab(page: Page, max = 120): Promise<FocusRing[]> {
  await page.locator('body').focus();
  const rings: FocusRing[] = [];
  let first: string | null = null;
  for (let i = 0; i < max; i++) {
    await page.keyboard.press('Tab');
    const ring = await page.evaluate(() => {
      const el = document.activeElement;
      if (!el || el === document.body) return null;
      const rgb = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number);
      const lum = ([r, g, b]: number[]) => {
        const f = (v: number) => {
          const s = v / 255;
          return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
        };
        return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
      };
      let behind = [255, 255, 255];
      for (let e = el.parentElement; e; e = e.parentElement) {
        const c = rgb(getComputedStyle(e).backgroundColor);
        if (c.length === 3 || (c.length === 4 && c[3] > 0)) {
          behind = c.slice(0, 3);
          break;
        }
      }
      const s = getComputedStyle(el);
      const [a, b] = [lum(rgb(s.outlineColor).slice(0, 3)), lum(behind)].sort((x, y) => y - x);
      const label = (el.getAttribute('data-testid') || el.textContent || '').trim().replace(/\s+/g, ' ').slice(0, 30);
      return {
        key: el.outerHTML.slice(0, 200),
        element: `${el.tagName.toLowerCase()} "${label}"`,
        width: parseFloat(s.outlineWidth),
        style: s.outlineStyle,
        ratio: Math.round(((a + 0.05) / (b + 0.05)) * 10) / 10,
      };
    });
    if (!ring) continue;
    if (ring.key === first) break;
    first ??= ring.key;
    const { key: _key, ...rest } = ring;
    rings.push(rest);
  }
  return rings;
}
