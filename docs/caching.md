# Caching of pictures and fonts

`site/_headers` lets browsers keep `/img/*` for a week and `/fonts/*` for a year without asking the server again. That
saves traffic (Netlify credits), but a file that changes under the same URL would stay old for returning visitors.

- **Fonts:** the folder name carries the package version (RSP-160), so a new version is a new URL.
- **Pictures (RSP-228):** the build (`scripts/build-pages.mjs`, `stampPictures`) adds `?v=<version>` to every
  `/img/` URL in the built HTML, JS and CSS. The version is one for all pictures: the first 7 hex of the commit the site
  is built from (Netlify's `COMMIT_REF`, otherwise `git rev-parse HEAD`), so `git show <version>` names the commit.
  `dist/js/img-v.js` carries the same version for URLs that JS builds at runtime (`imgUrl` and `art` in
  `site/js/util.js`); in `site/` it is empty and URLs stay plain. Production is built only at a release, so returning
  visitors fetch pictures again after each release; previews get a new version with every push. Without git (a folder
  copied without `.git`) the version is a hash of all pictures, and the build says so. A local build with uncommitted
  picture changes keeps the commit's version: reload without cache to see them.
- The build stops when a page refers to a picture that doesn't exist, or when an `/img/` URL in the output doesn't
  carry this build's version.
- Tests that check a picture's `src` expect the version: `/img/git/init.svg?v=<7 hex>`.
