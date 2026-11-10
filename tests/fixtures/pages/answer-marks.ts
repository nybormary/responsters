// How answers look after answering (RSP-169 AC8, WCAG 1.4.1): the right answer has a thicker frame (a box-shadow
// ring), a wrong one a ✕ badge (::after), the others neither. Read from the computed style, so colour is never used.
// Also the control border contrast check of RSP-169 AC2 (WCAG 1.4.11), which axe doesn't do.
import type { Locator } from '@playwright/test';

export type Mark = 'right' | 'wrong' | 'plain' | 'both'; // 'both' = a bug: ring and badge together

/** The mark an answer shows: ring = right, ✕ badge = wrong, neither = not picked. */
export async function markOf(answer: Locator): Promise<Mark> {
  return answer.evaluate((el) => {
    const ring = getComputedStyle(el).boxShadow !== 'none';
    const after = getComputedStyle(el, '::after').content;
    const badge = after !== 'none' && after !== 'normal';
    return ring && badge ? 'both' : ring ? 'right' : badge ? 'wrong' : 'plain';
  });
}

/** Position (in the page, not the window: the page may scroll to the feedback) and size of each element, to
 * check that nothing moves when the marks appear. */
export async function boxes(items: Locator): Promise<string[]> {
  return items.evaluateAll((els) =>
    els.map((el) => {
      const r = el.getBoundingClientRect();
      return [r.x + scrollX, r.y + scrollY, r.width, r.height].map((n) => Math.round(n)).join(',');
    }),
  );
}

export type BorderContrast = { control: string; border: string; background: string; ratio: number };

/**
 * Every visible button, link and summary inside `scope` that has a border: the better contrast of its border or its
 * own fill against the colour behind the control (the first ancestor with a non-transparent background).
 * WCAG contrast ratio, rounded to 0.1.
 */
export async function controlBorderContrasts(scope: Locator): Promise<BorderContrast[]> {
  return scope.evaluate((root) => {
    const rgb = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number);
    const lum = ([r, g, b]: number[]) => {
      const f = (v: number) => {
        const s = v / 255;
        return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const behind = (el: Element) => {
      for (let e = el.parentElement; e; e = e.parentElement) {
        const c = rgb(getComputedStyle(e).backgroundColor);
        if (c.length === 3 || (c.length === 4 && c[3] > 0)) return c.slice(0, 3);
      }
      return [255, 255, 255];
    };
    const out: { control: string; border: string; background: string; ratio: number }[] = [];
    for (const el of root.querySelectorAll('button, a, summary')) {
      const s = getComputedStyle(el);
      const r = el.getBoundingClientRect();
      if (r.width === 0 || r.height === 0 || s.visibility === 'hidden') continue;
      if (s.borderTopStyle === 'none' || parseFloat(s.borderTopWidth) === 0) continue;
      const border = rgb(s.borderTopColor);
      if (border.length === 4 && border[3] === 0) continue; // a transparent border is no border
      const bg = behind(el);
      const ratio = (x: number[], y: number[]) => {
        const [a, b] = [lum(x), lum(y)].sort((p, q) => q - p);
        return (a + 0.05) / (b + 0.05);
      };
      // WCAG 1.4.11 asks that the control can be told from what is behind it: by its border OR by its own fill
      // (e.g. a creature card: dark ink frame, light paper inside). Take the better of the two.
      const fill = rgb(s.backgroundColor);
      const ownFill = fill.length === 3 || (fill.length === 4 && fill[3] > 0) ? ratio(fill.slice(0, 3), bg) : 0;
      const best = Math.max(ratio(border.slice(0, 3), bg), ownFill);
      const name = (el.getAttribute('data-testid') || el.textContent || el.tagName).trim().slice(0, 40);
      out.push({
        control: name,
        border: s.borderTopColor,
        background: `rgb(${bg.join(', ')})`,
        ratio: Math.round(best * 10) / 10,
      });
    }
    return out;
  });
}
