// Computed-style helpers for the zoo signs and the "no uppercase labels" rule (RSP-170). Colours are compared as the
// browser resolves them (rgb), so a token change in base.css doesn't need a test change.
import type { Locator, Page } from '@playwright/test';

export type Look = { background: string; color: string; textTransform: string };

/** Background, text colour and text-transform of an element. */
export async function lookOf(el: Locator): Promise<Look> {
  return el.evaluate((e) => {
    const s = getComputedStyle(e);
    return { background: s.backgroundColor, color: s.color, textTransform: s.textTransform };
  });
}

/** The rgb() value a CSS custom property of the page resolves to (e.g. '--sign'), in the current theme. */
export async function resolveColor(page: Page, token: string): Promise<string> {
  return page.evaluate((t) => {
    const probe = document.createElement('i');
    probe.style.color = `var(${t})`;
    document.body.append(probe);
    const c = getComputedStyle(probe).color;
    probe.remove();
    return c;
  }, token);
}

/** WCAG contrast of an element's text colour against its own background (rounded to 0.1). */
export async function textContrast(el: Locator): Promise<number> {
  return el.evaluate((e) => {
    const s = getComputedStyle(e);
    const rgb = (c: string) => (c.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
    const lum = ([r, g, b]: number[]) => {
      const f = (v: number) => {
        const x = v / 255;
        return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
      };
      return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
    };
    const [a, b] = [lum(rgb(s.color)), lum(rgb(s.backgroundColor))].sort((x, y) => y - x);
    return Math.round(((a + 0.05) / (b + 0.05)) * 10) / 10;
  });
}

/** True when the element doesn't stick out of its parent (1px slack for rounding). */
export async function insideParent(el: Locator): Promise<boolean> {
  return el.evaluate((e) => {
    const r = e.getBoundingClientRect();
    const p = (e.parentElement as Element).getBoundingClientRect();
    return r.left >= p.left - 1 && r.right <= p.right + 1;
  });
}

export type Shouting = { tag: string; classes: string; text: string };

/** Every visible element on the page shown in capitals by CSS (text-transform: uppercase). */
export async function uppercaseElements(page: Page): Promise<Shouting[]> {
  return page.evaluate(() =>
    [...document.querySelectorAll('body *')]
      .filter((e) => {
        const r = e.getBoundingClientRect();
        return (
          r.width > 0 && r.height > 0 && getComputedStyle(e).textTransform === 'uppercase' && e.textContent?.trim()
        );
      })
      .map((e) => ({
        tag: e.tagName.toLowerCase(),
        classes: e.className.toString(),
        text: (e.textContent ?? '').trim().slice(0, 40),
      })),
  );
}
