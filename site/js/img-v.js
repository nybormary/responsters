// Picture version (RSP-228): one version for all /img/ URLs, the first 7 hex of the commit the site is built from. The
// build writes dist/js/img-v.js with it; here, in site/, it is empty, so picture URLs stay plain. Each release builds
// from a new commit, so browsers fetch pictures again instead of showing old ones from their week-long cache
// (site/_headers).
export const IMG_V = '';
