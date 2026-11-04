// Group tags. They match the testomat.io folders, so a test sits in the same group in both places.
// Run one group: npx playwright test --grep @practice
// Every test also has its testomat.io id (@T…) at the end of its title.

export const TAG = {
  collection: '@collection',
  practice: '@practice',
  traps: '@traps',
  language: '@language',
  progress: '@progress',
  navigation: '@navigation', // tabs and the URL (RSP-114)
  cardPages: '@card-pages', // /<lang>/http/<code>/ (RSP-90); testomat.io folder to add
  smoke: '@smoke', // the short production check in the release flow
} as const;
