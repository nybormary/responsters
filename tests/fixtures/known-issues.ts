// Known problems outside our code that make some tests unreliable on a target, each with its ticket (like
// a11y-exceptions.ts). Such a test is skipped there with the ticket key in the reason, never re-run until green.
// Remove the entry in the PR that fixes the ticket.
import { resolveTarget } from '../targets';

/** Tests run against a deployed site (deploy preview, production or BASE_URL), not the local server. */
const deployed = resolveTarget(process.env).name !== 'local';

/**
 * RSP-183: on Netlify, the language redirect of a language-less URL (/, /http/, /http/<code>/) sometimes goes to
 * another language than the cookie or browser language asks for. Tests OF that redirect skip on deployed targets
 * and still run locally (there the chooser page decides). Other tests open /<lang>/… directly.
 */
export const LANG_REDIRECT = {
  skip: deployed,
  reason: 'RSP-183: on Netlify a language-less URL sometimes redirects to another language',
} as const;
