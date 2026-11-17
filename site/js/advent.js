// The advent by the visitor's own date (RSP-195, decided 2026-11-16): the build writes the wall and the home page's
// Git enclosure as they are on the build date (the fallback without JS); here they are repainted by today in the
// visitor's time zone, so a door or the enclosure opens on its day without a deploy. ADVENT_START reaches the page
// as data-date on every door and data-advent-start on the enclosure. Opened doors are not remembered yet: RSP-196.
import { localToday } from './util.js';

/** Paints one door for `today`: locked (its day hasn't come), or paper with a "today" / "missed" flag. */
function paint(door, today, flags) {
  if (door.classList.contains('open')) return;
  const date = door.dataset.date;
  const locked = date > today;
  door.classList.toggle('locked', locked);
  door.classList.toggle('paper', !locked);
  door.classList.toggle('today', date === today);
  door.classList.toggle('missed', date < today);
  if (locked) {
    door.removeAttribute('href');
    door.setAttribute('aria-disabled', 'true');
  } else {
    door.setAttribute('href', door.dataset.href);
    door.removeAttribute('aria-disabled');
  }
  door.setAttribute('aria-label', locked ? door.dataset.labelLocked : door.dataset.labelPaper);
  const flag = door.querySelector('[data-testid="door-flag"]');
  if (flag) flag.textContent = date === today ? flags.today : date < today ? flags.missed : '';
}

/** First click on a paper door: the paper tears, the picture and the command show; the next click follows the link. */
function reveal(door, live) {
  door.classList.remove('paper', 'today', 'missed');
  door.classList.add('open');
  door.classList.toggle('danger', 'danger' in door.dataset);
  door.setAttribute('aria-label', door.dataset.labelOpen);
  if (live) live.textContent = door.dataset.labelRevealed;
}

/**
 * Phone (prototype AdventPhone, 2026-11-17): a big copy of today's door above the wall, shown by CSS on narrow
 * screens only. It is the same door: opening one opens the other. No copy before the advent or after its last day.
 */
function todayCopy(wall, today) {
  const slot = document.querySelector('[data-testid="advent-today-slot"]');
  const door = [...wall.querySelectorAll('[data-testid="advent-door"]')].find((d) => d.dataset.date === today);
  if (!slot || !door) return;
  const copy = /** @type {HTMLElement} */ (door.cloneNode(true));
  copy.dataset.testid = 'advent-today';
  copy.classList.add('door-big');
  slot.replaceChildren(copy);
}

function setUpWall(wall) {
  const today = localToday();
  const flags = { today: wall.dataset.flagToday, missed: wall.dataset.flagMissed };
  const live = document.querySelector('[data-testid="advent-live"]');
  for (const door of wall.querySelectorAll('[data-testid="advent-door"]')) paint(door, today, flags);
  todayCopy(wall, today);
  const page = wall.closest('main') ?? document;
  page.addEventListener('click', (e) => {
    const door = e.target instanceof Element ? e.target.closest('.door') : null;
    if (!door || door.classList.contains('open')) return; // an open door is a plain link to its card page
    e.preventDefault();
    if (!door.classList.contains('paper')) return;
    // the door and its big copy on a phone open together; the reveal is announced once
    for (const twin of page.querySelectorAll(`.door[data-day="${door.dataset.day}"]`)) reveal(twin, null);
    if (live) live.textContent = door.dataset.labelRevealed;
  });
}

/** The home page's Git enclosure: from the advent start (visitor's date) the open enclosure from its <template>. */
function openEnclosure(li) {
  const template = li.querySelector('template');
  if (!template || localToday() < li.dataset.adventStart) return;
  li.classList.remove('enclosure-soon');
  li.replaceChildren(template.content.cloneNode(true));
}

const wall = document.querySelector('[data-testid="advent-wall"]');
if (wall) setUpWall(wall);
const enclosure = document.querySelector('[data-testid="enclosure-git"][data-advent-start]');
if (enclosure) openEnclosure(enclosure);
