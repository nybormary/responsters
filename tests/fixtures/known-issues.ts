// Known problems outside our code that make some tests unreliable on a target, each with its ticket (like
// a11y-exceptions.ts). Such a test is skipped there with the ticket key in the reason, never re-run until green;
// remove the entry in the PR that fixes the ticket. The pattern: an entry here ({ skip, reason }), a fixture option
// that turns the skip on for the tests concerned (test.use({ … })), and testInfo.skip(skip, reason) in the fixture.
// Example in git history: RSP-183 (LANG_REDIRECT, langRedirect), fixed 2026-11-11.
//
// No known issues right now.
export {};
