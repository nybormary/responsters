// "Testing in circles" (RSP-211): test types drawn on one product circle. Used only by the page build
// (scripts/build-pages.mjs); the pages are static, no script draws them in the browser.
//
// The product circle, the same on every panel (design: project doc claude/test-types-circle.md, mockup on the Design
// canvas "Mnemozoo home — own look"):
// - outer circle: all existing functionality; inner circle (blue): the critical functionality;
// - the smallest circle in the centre: build and deploy, a layer of its own (purple);
// - a dashed sector between the core and the edge: new functionality; a red dot: a fixed bug.
// The legend on the page says how to read it: depth = fill type (hatching shallow, solid deep, stripes either); the
// critical functionality is checked when the inner circle is filled. Colours are CSS classes (site/css/lab.css), so dark
// mode works.

/** Sizes in the 160 × 160 viewBox: centre, outer radius, critical-functionality (core) radius, build radius. */
const C = 80;
const R = 60;
const CORE = 26;
const BUILD = 9;
/** The new-functionality sector, in degrees clockwise from 3 o'clock (negative = above the centre). */
const NEW = [-80, -30];
/** The sanity slice: a thin wedge through the new sector. */
const SLICE = [-60, -50];
/** The fixed bug: a dot in the old functionality, lower left. */
const BUG = { x: 42, y: 102, r: 4.5, ring: 12 };

const n = (v) => Number(v.toFixed(1));
const at = (r, a) => [n(C + r * Math.cos((a * Math.PI) / 180)), n(C + r * Math.sin((a * Math.PI) / 180))];
/** A full circle as a path (so it can be combined with holes, fill-rule evenodd). */
const circle = (r) => `M${C - r} ${C} A${r} ${r} 0 1 0 ${C + r} ${C} A${r} ${r} 0 1 0 ${C - r} ${C} Z`;
/** A ring sector between radii r1 < r2, from angle a1 to a2 (clockwise). */
const sector = (r1, r2, [a1, a2]) => {
  const [x1, y1] = at(r2, a1);
  const [x2, y2] = at(r2, a2);
  const [x3, y3] = at(r1, a2);
  const [x4, y4] = at(r1, a1);
  return `M${x1} ${y1} A${r2} ${r2} 0 0 1 ${x2} ${y2} L${x3} ${y3} A${r1} ${r1} 0 0 0 ${x4} ${y4} Z`;
};

/** Shapes the panels fill. "old" = everything but the new sector and the build centre. */
const SHAPES = {
  build: circle(BUILD),
  core: `${circle(CORE)} ${circle(BUILD)}`,
  slice: sector(BUILD, R, SLICE),
  old: `${circle(R)} ${sector(CORE, R, NEW)} ${circle(BUILD)}`,
  wedge: sector(BUILD, R, NEW),
  oldBesideWedge: `${circle(R)} ${sector(BUILD, R, NEW)} ${circle(BUILD)}`,
};
/** Fill kinds: hatching (shallow), solid (deep), stripes (either); build-hatch = hatching in the build colour. */
const FILL = {
  hatch: 'url(#lab-hatch)',
  buildHatch: 'url(#lab-hatch-build)',
  stripes: 'url(#lab-stripes)',
};

/**
 * The six panels of the main row, in page order. Each fill is [shape, kind]; "retest" adds the ring around the bug.
 * Texts (name, caption, sentence, picture description) are in i18n `lab.circles.panels.<id>`.
 */
export const PANELS = [
  { id: 'bvt', fills: [['build', 'buildHatch']] },
  { id: 'smoke', fills: [['core', 'hatch']] },
  { id: 'sanity', fills: [['slice', 'solid']] },
  { id: 'regression', fills: [['old', 'stripes']] },
  { id: 'retest', fills: [], retest: true },
  {
    id: 'tuesday',
    // a usual Tuesday is all of it together, so the build is hatched too: BVT runs on every build (Maryna, 2026-11-22)
    fills: [
      ['oldBesideWedge', 'stripes'],
      ['wedge', 'solid'],
      ['build', 'buildHatch'],
    ],
    retest: true,
  },
];

const fillPath = ([shape, kind]) =>
  kind === 'solid'
    ? `<path class="lab-solid" fill-rule="evenodd" d="${SHAPES[shape]}" />`
    : `<path fill="${FILL[kind]}" fill-rule="evenodd" d="${SHAPES[shape]}" />`;

/** The outline every panel shares: outer circle, core, build centre, the dashed new sector, the bug. */
const OUTLINE = `<circle class="lab-line" cx="${C}" cy="${C}" r="${R}" />
          <circle class="lab-core" cx="${C}" cy="${C}" r="${CORE}" />
          <circle class="lab-build" cx="${C}" cy="${C}" r="${BUILD}" />
          <path class="lab-new" d="${sector(CORE, R, NEW)}" />
          <circle class="lab-bug" cx="${BUG.x}" cy="${BUG.y}" r="${BUG.r}" />`;

/**
 * One panel's picture: an <svg role="img"> with the picture description as its name (the sentence under it explains
 * the meaning). The patterns it uses are defined once per page (circleDefs).
 */
export function circleSvg(panel, label, esc) {
  const fills = panel.fills.map(fillPath);
  if (panel.retest) fills.push(`<circle class="lab-solid" cx="${BUG.x}" cy="${BUG.y}" r="${BUG.ring}" />`);
  return `<svg class="lab-circle" role="img" aria-label="${esc(label)}" width="160" height="160" viewBox="0 0 160 160">
          ${fills.join('\n          ')}
          ${OUTLINE}
        </svg>`;
}

/** The fill patterns, once per page (an aria-hidden svg of zero size). */
export const circleDefs = `<svg class="lab-defs" aria-hidden="true" width="0" height="0" focusable="false">
        <defs>
          <pattern id="lab-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="lab-hatch-line" x1="3" y1="0" x2="3" y2="6" /></pattern>
          <pattern id="lab-hatch-build" width="5" height="5" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><line class="lab-hatch-build-line" x1="2.5" y1="0" x2="2.5" y2="5" /></pattern>
          <pattern id="lab-stripes" width="16" height="16" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect class="lab-stripe-band" x="0" y="0" width="8" height="16" /><line class="lab-hatch-line" x1="11" y1="0" x2="11" y2="16" /><line class="lab-hatch-line" x1="14" y1="0" x2="14" y2="16" /></pattern>
        </defs>
      </svg>`;

/** The legend swatches (decorative: the word next to each says the same), in two groups: the parts of the circle
 * and the fills (RSP-211 polish, 2026-11-22: the legend replaced the reading rules, which only repeated it). */
export const LEGEND = [
  ['core', 'build', 'new', 'bug'],
  ['shallow', 'deep', 'either'],
];
export const SWATCH = {
  core: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22"><circle class="lab-core" cx="11" cy="11" r="9" /></svg>`,
  build: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22"><circle class="lab-build" cx="11" cy="11" r="6" /></svg>`,
  new: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22"><rect class="lab-new" x="2" y="2" width="18" height="18" rx="2" /></svg>`,
  bug: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22"><circle class="lab-bug" cx="11" cy="11" r="4.5" /></svg>`,
  shallow: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22"><rect class="lab-swatch" fill="url(#lab-hatch)" x="2" y="2" width="18" height="18" rx="2" /></svg>`,
  deep: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22"><rect class="lab-swatch lab-solid" x="2" y="2" width="18" height="18" rx="2" /></svg>`,
  either: `<svg aria-hidden="true" width="22" height="22" viewBox="0 0 22 22"><rect class="lab-swatch" fill="url(#lab-stripes)" x="2" y="2" width="18" height="18" rx="2" /></svg>`,
};

/** A small row of three circles (smoke, sanity, regression) for the link card to "In circles". Decorative. */
export const TEASER = `<svg class="lab-teaser" aria-hidden="true" width="260" height="76" viewBox="0 0 260 76">
              <circle class="lab-solid" cx="38" cy="38" r="14" />
              <path class="lab-solid" d="M130 38 L138.3 7.1 A32 32 0 0 1 156.2 19.6 Z" />
              <path fill="url(#lab-stripes)" fill-rule="evenodd" d="M190 38 A32 32 0 1 0 254 38 A32 32 0 1 0 190 38 Z M208 38 A14 14 0 1 0 236 38 A14 14 0 1 0 208 38 Z" />
              <circle class="lab-line" cx="38" cy="38" r="32" /><circle class="lab-core" cx="38" cy="38" r="14" />
              <circle class="lab-line" cx="130" cy="38" r="32" /><circle class="lab-core" cx="130" cy="38" r="14" />
              <circle class="lab-line" cx="222" cy="38" r="32" /><circle class="lab-core" cx="222" cy="38" r="14" />
            </svg>`;
