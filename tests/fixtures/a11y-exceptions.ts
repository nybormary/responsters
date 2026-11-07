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

export const AXE_EXCEPTIONS: AxeException[] = [
  {
    rule: 'label-content-name-mismatch',
    testId: TID.langButton,
    ticket: 'RSP-169',
    why: 'On narrow screens the button shows the language code (UA), its name is "Мова: Українська" (WCAG 2.5.3)',
  },
];
