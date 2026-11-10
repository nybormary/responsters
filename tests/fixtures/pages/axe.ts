// Automated accessibility check with axe-core (RSP-162): WCAG 2.0/2.1/2.2 A and AA plus best-practice
// (landmark rules such as landmark-one-main are best-practice). What axe can't check stays manual
// (KAZOO, docs/testing.md). Known violations with their own ticket: ../a11y-exceptions.ts.
import AxeBuilder from '@axe-core/playwright';
import { expect, type Page, type TestInfo } from '@playwright/test';
import { AXE_EXCEPTIONS } from '../a11y-exceptions';

export const AXE_TAGS = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa', 'wcag22aa', 'best-practice'];
export const THEMES = ['light', 'dark'] as const;
export type Theme = (typeof THEMES)[number];

type Violation = Awaited<ReturnType<AxeBuilder['analyze']>>['violations'][number];

export class Axe {
  readonly page: Page;
  readonly testInfo: TestInfo;

  constructor(page: Page, testInfo: TestInfo) {
    this.page = page;
    this.testInfo = testInfo;
  }

  /** Light or dark theme: the site follows the system setting (prefers-color-scheme). */
  async theme(theme: Theme) {
    await this.page.emulateMedia({ colorScheme: theme });
  }

  /**
   * Run axe on the page as it is now and fail on any violation that isn't a listed exception.
   * The message names the rule, its help link and the elements. Whenever axe finds anything, its raw violations
   * (listed exceptions included, so a known one stays visible) are attached to the report.
   */
  async expectNoViolations(where: string) {
    const result = await new AxeBuilder({ page: this.page }).withTags(AXE_TAGS).analyze();
    const left = result.violations
      .map((v) => ({ ...v, nodes: v.nodes.filter((n) => !excused(v.id, n.html)) }))
      .filter((v) => v.nodes.length > 0);
    if (result.violations.length)
      await this.testInfo.attach(`axe: ${where}`, {
        body: JSON.stringify(result.violations, null, 2), // raw: not `left` (Copilot review, PR #33)
        contentType: 'application/json',
      });
    expect(left.map(describe), `axe violations: ${where}`).toEqual([]);
  }
}

const excused = (rule: string, html: string) =>
  AXE_EXCEPTIONS.some((e) => e.rule === rule && html.includes(`data-testid="${e.testId}"`));

const describe = (v: Violation) =>
  `${v.id} (${v.impact}): ${v.help} ${v.helpUrl}\n` +
  v.nodes.map((n) => `    ${n.target.join(' ')}: ${n.html.slice(0, 120)}`).join('\n');
