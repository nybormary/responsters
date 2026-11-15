// The rubrics (RSP-117): one entry per rubric, the one place that says where it lives.
// path:  the URL segment, /<lang>/<path>/ and /<lang>/<path>/<id>/
// data:  its data folder, site/data/<data>/ (cards, groups and rubric-only data; texts are in i18n/<lang>.js)
// store: its localStorage prefix, "<store>.<key>" (js/store.js). One prefix per rubric, so a new rubric never
//        touches another one's progress. httpon = the HTTP rubric's first name; it also keeps the saved language
//        (httpon.lang), so existing visitors keep their settings.
// front: how the card's front line reads: 'move' (a pill, no "$") or 'command' ("$ git …" + a short explanation).
// The full schema: docs/card-schema.md.
export const RUBRICS = {
  http: { path: 'http', data: 'http', store: 'httpon', front: 'move' },
  git: { path: 'git', data: 'git', store: 'gitty', front: 'command' },
};
