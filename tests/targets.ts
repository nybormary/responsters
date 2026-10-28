// Where the tests run (RSP-127). One place for the site addresses and for how a run is named in testomat.io,
// so commands only say WHICH target, never a URL or an environment string by hand.
// No secrets here: the testomat.io key is never in a file (see README, "Report a run to testomat.io").
//
//   npm test                         → local copy (Playwright starts `npx serve site`)
//   PR=12 npm run test:preview       → deploy preview of PR #12
//   npm run test:prod                → production
//   BASE_URL=https://… npm test      → any other address (kept for one-off checks)

export type TargetName = 'local' | 'preview' | 'production' | 'custom';

export type Target = {
  name: TargetName;
  baseURL: string;
  /** testomat.io environment of the run: one string, as in the manual runs. */
  testomatioEnv: string;
  /** Default run title in testomat.io; TESTOMATIO_TITLE overrides it. */
  title: string;
};

const LOCAL_URL = 'http://localhost:3000';
const PRODUCTION_URL = 'https://responsters.netlify.app';
const previewURL = (pr: string) => `https://deploy-preview-${pr}--responsters.netlify.app`;
const BROWSER = 'Browser:Chrome';            // one browser for now; more come as Playwright projects

/** Reads TARGET (and PR for previews) from the environment. `smoke` only changes the default title. */
export function resolveTarget(env: NodeJS.ProcessEnv = process.env, smoke = false): Target {
  const name = (env.TARGET || (env.BASE_URL ? 'custom' : 'local')) as TargetName;
  const check = smoke ? 'smoke' : 'check';

  switch (name) {
    case 'local':
      return { name, baseURL: LOCAL_URL, testomatioEnv: `Target:local,${BROWSER}`, title: `🦭 Local ${check}` };
    case 'preview': {
      const pr = env.PR?.trim();
      if (!pr || !/^\d+$/.test(pr)) {
        throw new Error('TARGET=preview needs the PR number, e.g. PR=12 npm run test:preview');
      }
      return { name, baseURL: previewURL(pr), testomatioEnv: `Target:deploy-preview,${BROWSER}`, title: `🦭 PR #${pr} on deploy preview` };
    }
    case 'production':
      return { name, baseURL: PRODUCTION_URL, testomatioEnv: `Target:production,${BROWSER}`, title: `🦭 Production ${check}` };
    case 'custom':
      if (!env.BASE_URL) throw new Error('TARGET=custom needs BASE_URL');
      return { name, baseURL: env.BASE_URL, testomatioEnv: BROWSER, title: `🦭 Check on ${env.BASE_URL}` };
    default:
      throw new Error(`TARGET=${name}: not one of local, preview, production`);
  }
}
