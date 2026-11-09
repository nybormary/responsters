// Posts one message to Slack #ci-alerts when a CI run fails (RSP-179). Green runs post nothing.
// Best effort: whatever happens here, the job's result stays what the tests made it; problems only go to the log.
// Input (env): SLACK_WEBHOOK_URL (GitHub secret), ALERT_KIND (pr | production), STEPS_JSON (toJSON(steps)),
// PR_NUMBER, PR_TITLE, PR_URL, BRANCH, HEAD_SHA, SUITE_WAY, and GitHub's own GITHUB_* variables.
// Test counts come from the JSON reporter (ci-results.json, written on CI by playwright.config.ts).
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
  typecheck: 'type check',
  locales: 'locale check',
  lint: 'lint',
  format: 'format check',
  preview: 'waiting for the Netlify deploy preview',
  'tests-preview': 'UI tests',
  'tests-own': 'UI tests',
  tests: 'UI tests',
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
try {
  const { stats } = JSON.parse(await readFile('ci-results.json', 'utf8'));
  counts = `${stats.unexpected} failed, ${stats.flaky} flaky, ${stats.expected} passed`;
} catch {
  // keep the default
}

const run = `${e.GITHUB_SERVER_URL}/${e.GITHUB_REPOSITORY}/actions/runs/${e.GITHUB_RUN_ID}`;
const where =
  e.ALERT_KIND === 'production'
    ? '*production smoke* (mnemozoo.com)'
    : `PR <${e.PR_URL}|#${e.PR_NUMBER} ${esc(e.PR_TITLE)}>`;
const lines = [
  `🔴 *UI tests failed*: ${where}`,
  `Failed at: ${failedStep} · ${counts}${e.SUITE_WAY ? ` · ran on ${e.SUITE_WAY}` : ''}`,
  e.ALERT_KIND === 'production' ? '' : `Branch \`${esc(e.BRANCH)}\` · commit \`${(e.HEAD_SHA || '').slice(0, 7)}\``,
  `<${run}|Run and HTML report> · <https://app.testomat.io/projects/responsters/runs|testomat.io runs>`,
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
