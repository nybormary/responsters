// ESLint (RSP-140): catches mistakes in plain JavaScript. Formatting is Prettier's job, not ESLint's.
//
// What is checked:
// - site/: the browser code (ES modules, browser globals).
// - scripts/ and this file: Node tools.
// Not yet: tests/ and playwright.config.ts (TypeScript). typescript-eslint doesn't support TypeScript 7 yet;
// until it does, `npm run typecheck` (strict tsc) checks them. Then add eslint-plugin-playwright (RSP-140).
import js from '@eslint/js';
import globals from 'globals';

const rules = {
  ...js.configs.recommended.rules,
  eqeqeq: ['error', 'smart'], // === everywhere, except `x == null` (null or undefined)
};

export default [
  { ignores: ['dist/', 'test-results/', 'playwright-report/', 'blob-report/'] }, // generated output
  {
    files: ['site/**/*.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.browser },
    rules,
  },
  {
    files: ['scripts/**/*.mjs', 'eslint.config.js'],
    languageOptions: { ecmaVersion: 'latest', sourceType: 'module', globals: globals.node },
    rules,
  },
];
