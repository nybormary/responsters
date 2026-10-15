// All test ids in one place. Specs never write selectors: they use the page objects in
// fixtures/, and the page objects use these ids. When the markup changes, only this file changes.
//
// Each id is a data-testid attribute in the markup (site/index.html or the js/ that renders it).
// Planned for the first spec (RSP-97, language); the attributes are added to the markup in the next commit.

export const TID = {
  // Header
  langButton: 'lang-button',
  langMenu: 'lang-menu',
  langOption: (lang: string) => `lang-option-${lang}`,
  howtoOpen: 'howto-open',

  // "How to use" hint
  howto: 'howto',
  howtoClose: 'howto-close',

  // Tabs and views
  tab: (view: View) => `tab-${view}`,
  view: (view: View) => `view-${view}`,
} as const;

export type View = 'collection' | 'practice' | 'traps';
