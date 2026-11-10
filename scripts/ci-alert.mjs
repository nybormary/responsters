// Posts one message to Slack #ci-alerts when a CI run fails (RSP-179). Green runs post nothing.
// Best effort: whatever happens here, the job's result stays what the tests made it; problems only go to the log.
// Input (env): SLACK_WEBHOOK_URL (GitHub secret), ALERT_KIND (pr | production), STEPS_JSON (toJSON(steps)),
// PR_NUMBER, PR_TITLE, PR_URL, BRANCH, HEAD_SHA, SUITE_WAY, and GitHub's own GITHUB_* variables.
// Test counts and the failed tests come from the JSON reporter (ci-results.json, written on CI by
// playwright.config.ts). The testomat.io run link comes from the reporter's own log line "📊 Report URL: …",
// which the workflow keeps in testomat-run.log; a run that wasn't reported (the PR's own files) says so,
// and a run that stopped before the tests (SUITE_WAY empty) says nothing about testomat.io.
import { readFile } from 'node:fs/promises';

const e = process.env;
const notice = (text) => console.log(`::notice::${text}`);

if (!e.SLACK_WEBHOOK_URL) {
  notice('SLACK_WEBHOOK_URL is not set: alert not sent.');
  process.exit(0);
}

// Slack mrkdwn: & < > must be escaped in text that comes from outside (PR titles, branch names).
const esc = (s = '') => String(s).replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');

// The first step that failed, by its id in the workflow; named for people, not for YAML.
const STEP_NAMES = {
  checkout: 'checking out the code',
  node: 'setting up Node.js',
  install: 'npm ci',
  browser: 'installing the browser',
  changes: 'checking what the PR changes',
  typecheck: 'type check',
  locales: 'locale check',
  lint: 'lint',
  format: 'format check',
  preview: 'waiting for the Netlify deploy preview',
  'tests-preview': 'UI tests',
  'tests-own': 'UI tests',
  tests: 'UI tests',
  report: 'keeping the HTML report',
};
let failedStep = 'see the run';
try {
  const steps = JSON.parse(e.STEPS_JSON || '{}');
  const id = Object.keys(steps).find((k) => steps[k].outcome === 'failure');
  if (id) failedStep = STEP_NAMES[id] ?? id;
} catch {
  // keep the default
}

let counts = 'no test results (the run stopped before the tests)';
const failed = [];
try {
  const report = JSON.parse(await readFile('ci-results.json', 'utf8'));
  const { stats } = report;
  counts = `${stats.unexpected} failed, ${stats.flaky} flaky, ${stats.expected} passed`;
  // Failed = "unexpected" after the retry. Title without the trailing tags and @T ids, plus file:line.
  const walk = (suite) => {
    for (const spec of suite.specs ?? []) {
      if (spec.tests?.some((t) => t.status === 'unexpected')) {
        const title = spec.title.replace(/(\s+@[\w-]+)+$/, '');
        failed.push(`• ${esc(title)} (\`${spec.file}:${spec.line}\`)`);
      }
    }
    for (const child of suite.suites ?? []) walk(child);
  };
  for (const suite of report.suites ?? []) walk(suite);
} catch {
  // keep the defaults
}
const MAX_LISTED = 5;
const failedLines = failed.slice(0, MAX_LISTED);
if (failed.length > MAX_LISTED) failedLines.push(`…and ${failed.length - MAX_LISTED} more`);

// testomat.io part: nothing when no tests ran (SUITE_WAY empty); the run link when the tests wrote the log;
// "not reported" when they ran without it (the PR's own files are not a deployed site, so not reported).
let testomat = '';
if (e.SUITE_WAY) {
  try {
    // eslint-disable-next-line no-control-regex
    const log = (await readFile('testomat-run.log', 'utf8')).replace(/\u001b\[[0-9;]*m/g, '');
    const url = log.match(/Report URL:\s*(https:\/\/app\.testomat\.io\/\S+)/)?.[1];
    testomat = url ? `<${url}|testomat.io run>` : 'testomat.io: no run link in the log';
  } catch {
    testomat = `not reported to testomat.io (${esc(e.SUITE_WAY)})`;
  }
}

const run = `${e.GITHUB_SERVER_URL}/${e.GITHUB_REPOSITORY}/actions/runs/${e.GITHUB_RUN_ID}`;
const where =
  e.ALERT_KIND === 'production'
    ? '*production smoke* (mnemozoo.com)'
    : `PR <${e.PR_URL}|#${e.PR_NUMBER} ${esc(e.PR_TITLE)}>`;
const lines = [
  `🔴 *CI run failed*: ${where}`,
  `Failed at: ${failedStep} · ${counts}${e.SUITE_WAY ? ` · ran on ${e.SUITE_WAY}` : ''}`,
  ...failedLines,
  e.ALERT_KIND === 'production' ? '' : `Branch \`${esc(e.BRANCH)}\` · commit \`${(e.HEAD_SHA || '').slice(0, 7)}\``,
  `<${run}|Run and HTML report>${testomat ? ` · ${testomat}` : ''}`,
].filter(Boolean);

try {
  const res = await fetch(e.SLACK_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: lines.join('\n') }),
    signal: AbortSignal.timeout(10_000),
  });
  if (res.ok) console.log('Alert sent to #ci-alerts.');
  else notice(`Slack answered ${res.status}: alert not sent.`);
} catch (err) {
  notice(`Slack could not be reached (${err.name}): alert not sent.`);
}
