// Known accessibility violations that axe may report until their own ticket fixes them (RSP-162).
// One entry = one axe rule on one element, never a whole rule. Every entry names its ticket: an entry
// without a ticket key doesn't compile. Remove the entry in the PR that fixes the ticket.

export type AxeException = {
  rule: string; // axe rule id, e.g. 'color-contrast'
  testId: string; // data-testid of the element (from TID); only nodes with it are excused
  ticket: `RSP-${number}`;
  why: string;
};

// None at the moment: RSP-198 removed the last two (door names now contain what the doors show).
export const AXE_EXCEPTIONS: AxeException[] = [];
