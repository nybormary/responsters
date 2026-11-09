// THROWAWAY (RSP-179 AC7): fails on purpose so CI posts one alert to #ci-alerts. Never merge: close the PR.
import { test, expect, TAG } from '../fixtures';

test(
  'RSP-179 AC7 throwaway: this test fails on purpose to check the Slack alert',
  { tag: [TAG.navigation] },
  async () => {
    expect(1, 'fails on purpose (RSP-179 AC7)').toBe(2);
  },
);
