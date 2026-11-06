// All test ids in one place. Specs never write selectors: they use the page objects in
// fixtures/, and the page objects use these ids. When the markup changes, only this file changes.
//
// Each id is a data-testid attribute in the markup (site/app.html or the js/ that renders it).
// Planned for the first spec (RSP-97, language); the attributes are added to the markup in the next commit.

export const TID = {
  // Header
  langButton: 'lang-button',
  langMenu: 'lang-menu',
  langOption: (lang: string) => `lang-${lang}`,
  howtoOpen: 'howto-open',

  // "How to use" hint
  howto: 'howto',
  howtoClose: 'howto-close',

  // Cards (glossary: card, card picture) and the card page /<lang>/http/<code>/ (RSP-90)
  card: (code: number) => `card-${code}`,
  cardArt: 'card-art',
  cardPage: 'card-page',

  // Tabs and views
  tab: (view: View) => `tab-${view}`,
  view: (view: View) => `view-${view}`,

  // Site header and footer (RSP-156; on every page with RSP-155)
  siteHeader: 'site-header',
  siteFooter: 'site-footer',
  navMap: 'nav-map',
  navAbout: 'nav-about',

  // Home page /<lang>/ (RSP-156): glossary terms home page, hero, zoo map, enclosure, pavilion, about
  homePage: 'home-page',
  homeHero: 'home-hero',
  zooMap: 'zoo-map',
  enclosure: (rubric: 'http' | 'git') => `enclosure-${rubric}`,
  pavilionTraps: 'pavilion-traps',
  homeAbout: 'home-about',
} as const;

export type View = 'collection' | 'practice' | 'traps';
