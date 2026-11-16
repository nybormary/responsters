// Pure markup for a git card and its page sections (RSP-199), like render.js for the HTTP cards: no DOM, no state,
// so the page build uses it now and the advent wall (RSP-195) can use the same card later.
// Data: data/git/ (language-free); texts: tx.git (i18n/<lang>.js), card texts under tx.git.cards.<id> (RSP-200).
// A card without texts yet still builds: the card shows its command and group, the page shows no empty sections.
import { GROUPS } from '../data/git/groups.js';
import { BY_ID, EGG } from '../data/git/cards.js';
import { esc } from './util.js';

/** Text with `code` spans: escaped, then `git add` → <code>git add</code>. */
export const inline = (s) => esc(s).replace(/`([^`]+)`/g, '<code>$1</code>');

/** Badge colour: the group's colour; Новосілля has none yet (RSP-200), so the card's pill colour stands in. */
export const groupColour = (g) => GROUPS[g.group].c || 'var(--cf-pill)';

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
    ? `<span class="cf-move"><span>${esc(t.move)}</span>${t.hint ? `<span class="g-hint">${esc(t.hint)}</span>` : ''}</span>`
    : '';
  return `<span class="cf-art">${danger}<img src="${pic.src}" alt="${esc(pic.alt)}" data-testid="card-art"></span>
  <span class="cf-status"><span class="cf-code" style="background:${groupColour(g)}" data-testid="git-command">${badge(g.name)}</span><span class="cf-name" data-testid="git-group">${esc(tx.git.groups[g.group])}</span></span>
  <span class="cf-panel">${t.title ? `<span class="cf-creature">${esc(t.title)}</span>` : ''}${move}${
    t.line ? `<span class="cf-line">${esc(t.line)}</span>` : ''
  }</span>`;
}

/**
 * The main column of a git card page: what it does + tip, options, careful (danger cards). Each section only when
 * its texts exist. Texts: does = { text, meta }, tip, opts = [{ cmd, text, meta }], careful = [paragraphs, the first
 * in bold]; `meta` = the one sentence with the household metaphor after the technical explanation (RSP-200).
 * g.vigs[i] (optional) = the picture for option i, shown only where it's drawn.
 */
export function gitMain(g, tx) {
  const t = tx.git.cards[g.id] || {};
  const ui = tx.git.ui;
  const meta = (m) => (m ? `<p class="g-meta">${inline(m)}</p>` : '');
  const out = [];
  if (t.does)
    out.push(
      `<h2>${esc(ui.does)}</h2>
              <p>${inline(t.does.text)}</p>${meta(t.does.meta)}${
                t.tip ? `\n              <p class="g-tip"><b>${esc(ui.tip)}.</b> ${inline(t.tip)}</p>` : ''
              }`,
    );
  if (t.opts?.length)
    out.push(
      `<h2>${esc(ui.opts)}</h2>
              <ul class="g-opts">${t.opts
                .map((o, i) => {
                  const vig = g.vigs?.[i] ? `<img src="${g.vigs[i]}" alt="${esc(o.vig || '')}" loading="lazy">` : '';
                  return `<li><p><code>${esc(o.cmd)}</code> ${inline(o.text)}</p>${meta(o.meta)}${vig}</li>`;
                })
                .join('')}</ul>`,
    );
  if (g.danger && t.careful?.length)
    out.push(
      `<div class="g-careful" data-testid="git-careful"><h2>${esc(ui.careful)}</h2>${t.careful
        .map((p, i) => `<p>${i ? inline(p) : `<b>${inline(p)}</b>`}</p>`)
        .join('')}</div>`,
    );
  return out.join('\n              ');
}

/**
 * The side column: "Often confused with" (commands only; a command with its own card links to it) and "In git help":
 * the heading names the list that shows the section (`git help`, `git help -a`, `git help --user-interfaces`), then
 * the section, then the command's own manual (`git help stash`; review batch, RSP-199 comment 10486).
 * href(id) = the URL of another git card page in the same language.
 */
export function gitSide(g, tx, href) {
  const ui = tx.git.ui;
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
  return `${
    conf
      ? `<h2>${esc(ui.conf)}</h2>
              <div class="mini" data-testid="git-conf">${conf}</div>
              `
      : ''
  }<h2 data-testid="git-help-title">${ui.help(cmd)}</h2>
              <p class="g-help" data-testid="git-help">${esc(h.section)}</p>
              <p class="g-help-from" data-testid="git-help-more">${esc(ui.more)}: <code>git help ${esc(g.id)}</code></p>`;
}
