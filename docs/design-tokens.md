# Design tokens: type scale and colours

The source is `site/css/base.css` (`:root` and the dark-theme blocks). This page says what each token is for, so new
CSS uses the scale instead of a new number.

## Font sizes (RSP-220, scale B, chosen by Maryna 2026-11-28)

| Token | Size | For |
| --- | --- | --- |
| `--fs-min` | 15px | the smallest text that is read: footer, dates, labels, card captions, buttons |
| `--fs-2` | 16px | secondary text: household sentences, tips, notes, lists of options in practice |
| `--fs-code` | 16px | code in pills and the command lines |
| `--fs-body` | 18px | body text |
| `--fs-lead` | 20px | the lead paragraph under a page title |
| `--fs-h4` | 20px | small headings |
| `--fs-h3` | 22px | section headings |
| `--fs-h2` | 26px | page titles inside a sheet, enclosure names |

- Nothing that is read is below `--fs-min`.
- A literal size is allowed only with a reason on the same line: `/* fs-exempt: <reason> */` (fluid titles with
  `clamp()`, the logo, door labels scaled with the door, the big decorative numbers, marks drawn as text).
  `npm run check-font-sizes` (in CI) fails on any other literal size.
- HTTP cards in the Collection use the full card sizes on every screen: one column on phones (Maryna 2026-11-28).

## Colours (RSP-227, chosen by Maryna 2026-11-28)

| Token | Light | Dark | For |
| --- | --- | --- | --- |
| `--accent` | `#562400` (Hot Cacao) | `#e8b48a` (milk cocoa) | links, focus rings, active tab |
| `--sign` | `#562400` | `#6b3a1c` | signs on the home page, the "known" badge |

Git card shadow and the wall's "today" ring: `#562400`.

Git groups (`site/data/git/groups.js`, also used in the pictures `site/img/git/*.svg`), all ≥ 6:1 with ink `#2B211A`:

| Group | Colour |
| --- | --- |
| Новосілля (start) | `#B8A0C0` |
| Вдома (home) | `#8FA7BF` |
| Візит (visit) | `#A3AE7A` |
| Горище (archive) | `#EFE05A` (lemon-lime; straw `#E8D48C` blended into the paper on small picture details) |
| Пошта (post) | `#DE9668` |

Red stays for danger only (`--bad`, the brick-red "!" frame on dangerous git commands).
