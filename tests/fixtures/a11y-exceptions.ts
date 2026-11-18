// Known accessibility violations that axe may report until their own ticket fixes them (RSP-162).
// One entry = one axe rule on one element, never a whole rule. Every entry names its ticket: an entry
// without a ticket key doesn't compile. Remove the entry in the PR that fixes the ticket.
import { TID } from './locators';

export type AxeException = {
  rule: string; // axe rule id, e.g. 'color-contrast'
  testId: string; // data-testid of the element (from TID); only nodes with it are excused
  ticket: `RSP-${number}`;
  why: string;
};

// The language button's name contains its visible text since the Own look release (RSP-169).
export const AXE_EXCEPTIONS: AxeException[] = [
  {
    rule: 'label-content-name-mismatch',
    testId: TID.adventDoor,
    ticket: 'RSP-198',
    why: 'A paper door shows "forgot?"/"today" and its number; its name "Day 3, open the door" has neither in that order. New wording comes with the wall texts review.',
  },
  {
    rule: 'label-content-name-mismatch',
    testId: TID.adventToday,
    ticket: 'RSP-198',
    why: "The big copy of today's door (phones) also shows the hint; same wording question as the wall doors.",
  },
];
