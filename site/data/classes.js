// Status classes 1xx–5xx: colour token and the official RFC 9110 class name (English in every language, RSP-110).
// The playful class names and rules are in i18n/<lang>.js under classes.
export const CLS = {
  1:{c:'var(--c1)', o:'Informational'},
  2:{c:'var(--c2)', o:'Successful'},
  3:{c:'var(--c3)', o:'Redirection'},
  4:{c:'var(--c4)', o:'Client Error'},
  5:{c:'var(--c5)', o:'Server Error'}
};
