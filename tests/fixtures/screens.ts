// Screen sizes the tests run on. 599/600 sit on both sides of the site's main breakpoint
// (css: max-width:599px / min-width:600px); 375 is a phone, 1280 a laptop.
// Every test gets one of them at random (see fixtures/index.ts); ALL_SCREENS=1 runs every test on all of them.

export type Screen = {
  viewport: { width: number; height: number };
  isMobile: boolean;      // mobile meta viewport + touch events, like a phone browser
  hasTouch: boolean;
};

export const SCREENS = {
  'desktop-1280': { viewport: { width: 1280, height: 800 }, isMobile: false, hasTouch: false },
  'tablet-600':   { viewport: { width: 600,  height: 900 }, isMobile: false, hasTouch: true },
  'edge-599':     { viewport: { width: 599,  height: 900 }, isMobile: false, hasTouch: true },
  'phone-375':    { viewport: { width: 375,  height: 740 }, isMobile: true,  hasTouch: true },
} satisfies Record<string, Screen>;

export type ScreenName = keyof typeof SCREENS;
export const SCREEN_NAMES = Object.keys(SCREENS) as ScreenName[];
