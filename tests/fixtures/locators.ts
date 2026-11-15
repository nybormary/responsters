// All test ids in one place. Specs never write selectors: they use the page objects in
// fixtures/, and the page objects use these ids. When the markup changes, only this file changes.
//
// Each id is a data-testid attribute in the markup (site/app.html or the js/ that renders it).
// Planned for the first spec (RSP-97, language); the attributes are added to the markup in the next commit.

export const TID = {
  // Language menu: the app's JS menu and the <details> menu of the generated pages carry the same ids (RSP-155)
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

  // Practice (RSP-162): the answers of the current question and the feedback after an answer
  answer: (code: number) => `answer-${code}`,
  anyAnswer: '[data-testid^="answer-"]',
  feedback: 'feedback',
  // RSP-169: the question in Practice (its picture tells the right code) and one situation in Traps
  question: 'question',
  situation: (pair: number, line: number) => `situation-${pair}-${line}`,

  // Tabs and views
  tab: (view: View) => `tab-${view}`,
  view: (view: View) => `view-${view}`,

  // Site header and footer (RSP-156; on every page with RSP-155)
  siteHeader: 'site-header',
  siteLogo: 'site-logo',
  enclosureHeader: 'enclosure-header', // the app's own header inside <main> (RSP-155)
  siteFooter: 'site-footer',
  navMap: 'nav-map',
  navAbout: 'nav-about',
  // Footer links and note (RSP-139)
  foot: (id: 'map' | 'about' | 'news' | 'linkedin' | 'github' | 'contact' | 'security' | 'copy' | 'credits') =>
    `foot-${id}`,

  // Home page /<lang>/ (RSP-156): glossary terms home page, hero, zoo map, enclosure, pavilion, about
  homePage: 'home-page',
  homeHero: 'home-hero',
  zooMap: 'zoo-map',
  enclosure: (rubric: 'http' | 'git') => `enclosure-${rubric}`,
  pavilionTraps: 'pavilion-traps',
  homeAbout: 'home-about',
  heroCard: (code: number) => `hero-card-${code}`, // one creature in the hero (RSP-172)
  // Signs (RSP-170; glossary sign): the kicker and the zone / pavilion signs on the home page
  homeKicker: 'home-kicker',
  sign: (name: 'http' | 'git' | 'pavilion') => `sign-${name}`,

  // Path steps (RSP-172; glossary path steps, step marker, step art): the same component on the home page and in the app
  homeSteps: 'home-steps', // "How it works" on the home page
  howtoSteps: 'howto-steps', // the list inside "How to use" in the app
  stepMarker: 'step-marker',
  stepArt: 'step-art',
  stepChip: 'step-chip',

  // Not-found page /<lang>/404.html (RSP-148)
  notFoundPage: 'not-found-page',
  notFoundBack: 'not-found-back',
} as const;

export type View = 'collection' | 'practice' | 'traps';
