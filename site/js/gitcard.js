// Pure markup for a git card and its page sections (RSP-199), like render.js for the HTTP cards: no DOM, no state,
// so the page build uses it now and the advent wall (RSP-195) can use the same card later.
// Data: data/git/ (language-free); texts: tx.git (i18n/<lang>.js), card texts under tx.git.cards.<id> (RSP-200).
// A card without texts yet still builds: the card shows its command and group, the page shows no empty sections.
import { GROUPS } from '../data/git/groups.js';
import { BY_ID, EGG } from '../data/git/cards.js';
import { esc } from './util.js';

/** Text with `code` spans: escaped, then `git add` → <code>git add</code>. */
export const inline = (s) => esc(s).replace(/`([^`]+)`/g, (_, c) => `<code>${keepGit(c)}</code>`);
/** Code may wrap at its spaces on a phone, but never right after "git": `git pull` stays one piece (2026-11-21). */
const keepGit = (c) => c.replace(/^git /, 'git&nbsp;');

/** Badge colour: the group's colour; Новосілля has none yet (RSP-200), so the card's pill colour stands in. */
export const groupColour = (g) => GROUPS[g.group].c || 'var(--cf-pill)';

/**
 * Group icons (RSP-208, decided 2026-11-18): the group must not be told by colour only (WCAG 1.4.1). Line icons in the
 * ink colour on the group colour: Новосілля key, Вдома cup, Візит eye (not a magnifier: a visit with a magnifier reads
 * as suspicion), Горище ladder, Пошта envelope. Decoration: the group is named in text where it matters.
 */
// Each icon's viewBox is cut to its drawing (RSP-208 polish, 2026-11-18): with the 24×24 box the empty margins differed
// (key 7px high, ladder 15.5px at the same size), so the icons looked uneven and sat off the text. Now every icon is as
// high as its box, the CSS sets that height to the capital letters' height, and the stroke keeps one width at any scale.
const ICONS = {
  start: ['2 7 20 10', '<circle cx="7" cy="12" r="4"/><path d="M11 12h10M17 12v3M20 12v2"/>'],
  home: [
    '4 2 17 19',
    '<path d="M5 9h11v7a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4z"/><path d="M16 11h1.5a2.5 2.5 0 0 1 0 5H16"/><path d="M9 3c-1 1 1 2 0 3M12.5 3c-1 1 1 2 0 3"/>',
  ],
  visit: [
    '1 4 22 16',
    '<path d="M2 12c3-5 7-7 10-7s7 2 10 7c-3 5-7 7-10 7s-7-2-10-7z"/><circle cx="12" cy="12" r="3"/>',
  ],
  archive: ['4 1 16 22', '<path d="M7 2l-2 20M17 2l2 20M6.6 6h10.8M6.2 10.5h11.6M5.7 15h12.6M5.3 19.5h13.4"/>'],
  post: ['1.5 4 21 16', '<rect x="2.5" y="5" width="19" height="14" rx="1.5"/><path d="M3 6l9 7 9-7"/>'],
};
const NON_SCALING = (shapes) => shapes.replace(/<(path|circle|rect) /g, '<$1 vector-effect="non-scaling-stroke" ');

/** The icon of a git group as inline SVG, hidden from assistive tech; `cls` = the class for its size and place. */
export const groupIcon = (group, cls) => {
  const [box, shapes] = ICONS[group];
  return `<svg class="${cls}" aria-hidden="true" focusable="false" viewBox="${box}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" data-testid="group-icon" data-group="${group}">${NON_SCALING(shapes)}</svg>`;
};

/** Where git help lists the command: its own entry (outside the short list) or its group's section. */
export const helpOf = (g) => g.help || { list: '', section: GROUPS[g.group].help };

/** A command name for the badge: "git" lighter, then the subcommand; ".gitignore" stays whole. */
const badge = (name) =>
  name.startsWith('git ') ? `<span class="g-git">git</span>&#160;${esc(name.slice(4))}` : esc(name);

/** Inner parts of one git card, in the shared card frame (card.css + git.css). */
export function gitCardBody(g, tx) {
  const t = tx.git.cards[g.id] || {};
  const pic = g.art ? { src: g.art, alt: t.art || '' } : EGG;
  const danger = g.danger
    ? `<span class="g-danger" role="img" aria-label="${esc(tx.git.ui.danger)}" data-testid="git-danger">!</span>`
    : '';
  const move = t.move
    ? `<span class="cf-move"><span data-testid="git-move">${esc(t.move)}</span>${t.hint ? `<span class="g-hint" data-testid="git-hint">${esc(t.hint)}</span>` : ''}</span>`
    : '';
  return `<span class="cf-art">${danger}<img src="${pic.src}" alt="${esc(pic.alt)}" data-testid="card-art"></span>
  <span class="cf-status"><span class="cf-name" data-testid="git-group"><span class="g-lab">${groupIcon(g.group, 'g-gi')}${esc(tx.git.groups[g.group])}</span></span><span class="cf-code" style="background:${groupColour(g)}" data-testid="git-command">${badge(g.name)}</span></span>
  <span class="cf-panel">${t.title ? `<span class="cf-creature" data-testid="git-title">${esc(t.title)}</span>` : ''}${move}${
    t.line ? `<span class="cf-line" data-testid="git-line">${esc(t.line)}</span>` : ''
  }</span>`;
}

/**
 * The main column of a git card page: what it does, options. Each section only when its texts exist.
 * Texts: does = { text, meta }, tip, opts = [{ cmd, text, meta }]; `meta` = the one sentence with the household metaphor after the technical explanation (RSP-200).
 * g.vigs[i] (optional) = the picture for option i, shown only where it's drawn.
 */
export function gitMain(g, tx) {
  const t = tx.git.cards[g.id] || {};
  const ui = tx.git.ui;
  const meta = (m) => (m ? `<p class="g-meta" data-testid="git-meta">${inline(m)}</p>` : '');
  const out = [];
  if (t.does)
    out.push(
      `<h2>${esc(ui.does)}</h2>
              <div data-testid="git-does"><p>${inline(t.does.text)}</p>${meta(t.does.meta)}</div>`,
    );
  if (t.opts?.length)
    out.push(
      `<h2>${esc(ui.opts)}</h2>
              <ul class="g-opts">${t.opts
                .map((o, i) => {
                  const vig = g.vigs?.[i] ? `<img src="${g.vigs[i]}" alt="${esc(o.vig || '')}" loading="lazy">` : '';
                  return `<li data-testid="git-opt"><p>${termCmd(o.cmd)} ${inline(o.text)}</p>${meta(o.meta)}${vig}</li>`;
                })
                .join('')}</ul>`,
    );
  return out.join('\n              ');
}

/**
 * The side column: "Careful" first on danger cards (careful = [paragraphs, the first in bold]; moved here from the
 * main column in the review of 2026-11-20, at the top so a phone shows it right after the options), then "Often
 * confused with" (commands only; a command with its own card links to it); then the tip (moved here from the main
 * column to make it lighter, RSP-200 review 2026-11-16) and "Read more", the same on every card (rule, reviews of
 * 2026-11-20): outside links from g.links (label per language, English when missing; mark: 'github' = GitHub's own
 * logo file, unchanged, as their brand rules allow for a link to GitHub, brand.github.com/foundations/logo); "In git
 * help: <section>" (the list that shows the section: `git help`, `git help -a`, `git help --user-interfaces`); the
 * terminal command for the manual (`$ git help stash`); the manual on git-scm.com.
 * href(id) = the URL of another git card page in the same language; lang = the page language.
 */
export function gitSide(g, tx, href, lang) {
  const ui = tx.git.ui;
  const t = tx.git.cards[g.id] || {};
  const byName = (name) => Object.values(BY_ID).find((x) => x.name === name);
  const conf = (g.conf || [])
    .map((name) => {
      const other = byName(name);
      return other
        ? `<a href="${href(other.id)}"><code>${esc(name)}</code></a>`
        : `<span><code>${esc(name)}</code></span>`;
    })
    .join('');
  const h = helpOf(g);
  const cmd = `<code>git help${h.list ? ' ' + esc(h.list) : ''}</code>`;
  const careful =
    g.danger && t.careful?.length
      ? `<div class="g-careful" data-testid="git-careful"><h2>${esc(ui.careful)}</h2>${t.careful
          .map((p, i) => `<p>${i ? inline(p) : `<b>${inline(p)}</b>`}</p>`)
          .join('')}</div>
              `
      : '';
  return `${careful}${
    conf
      ? `<h2>${esc(ui.conf)}</h2>
              <div class="mini" data-testid="git-conf">${conf}</div>
              `
      : ''
  }${
    t.tip
      ? `
              <p class="g-tip" data-testid="git-tip"><b>${esc(ui.tip)}.</b> ${inline(t.tip)}</p>`
      : ''
  }
              <h2>${esc(ui.links)}</h2>
              <ul class="links" data-testid="git-links">${(g.links || []).map((x) => `<li>${link(x, lang)}</li>`).join('')}<li class="g-help-item"><span data-testid="git-help-title">${ui.help(cmd)}</span>: <span class="g-help" data-testid="git-help">${esc(h.section)}</span></li><li class="g-help-cmd" data-testid="git-help-more">${termCmd(`git help ${g.id}`)}</li><li data-testid="git-manual">${manual(g, lang, ui.manual)}</li></ul>`;
}

/**
 * A command to type in the terminal, with the prompt "$" before it (Maryna, 2026-11-20): options and `git help <id>`.
 * The "$" is not part of the command: hidden from screen readers and left out of a copied selection. Patterns that
 * aren't commands (the .gitignore options `*.log`, `!keep.log`) get no "$".
 */
function termCmd(c) {
  const ps = c.startsWith('git ') ? '<span class="g-ps" aria-hidden="true">$&nbsp;</span>' : '';
  return `<code>${ps}${keepGit(esc(c))}</code>`;
}

/**
 * The command's manual on git-scm.com (Maryna, 2026-11-20), the last item of "Read more", after the terminal command
 * `git help <id>`: in the page language where git-scm.com has it (Ukrainian: /docs/git-switch/uk), otherwise the
 * English manual (no Polish, Danish, Lithuanian or Estonian translations there; their label says "in English").
 * .gitignore is a file: its manual is /docs/gitignore, without "git-".
 */
const MANUAL_LANGS = ['uk'];
function manual(g, lang, label) {
  const page = g.id === 'gitignore' ? 'gitignore' : `git-${g.id}`;
  const own = MANUAL_LANGS.includes(lang);
  const href = `https://git-scm.com/docs/${page}${own ? `/${lang}` : ''}`;
  return `<a href="${href}" target="_blank" rel="noopener"${own ? '' : ' hreflang="en"'}>${GIT_MARK}${esc(label)} ↗</a>`;
}

/** Brand marks next to an outside link: the owner's own files, never redrawn or recoloured (one per theme). */
const MARKS = { github: ['/img/brand/github-mark-black.svg', '/img/brand/github-mark-white.svg'] };
/** The Git logomark (Git-Icon-1788C from git-scm.com/community/logos, unchanged; by Jason Long, CC BY 3.0): orange,
   readable on both themes, so one file. */
const GIT_MARK = '<img class="mk" src="/img/brand/Git-Icon-1788C.svg" alt="" width="16" height="16">';

/** One "Read more" link: label in the page language (English when missing), opens in a new tab like the HTTP pages. */
function link(x, lang) {
  const m = MARKS[x.mark];
  const mark = m
    ? `<img class="mk mk-light" src="${m[0]}" alt="" width="16" height="16"><img class="mk mk-dark" src="${m[1]}" alt="" width="16" height="16">`
    : '';
  return `<a href="${x.u}" target="_blank" rel="noopener">${mark}${esc(x.label[lang] || x.label.en)} ↗</a>`;
}
