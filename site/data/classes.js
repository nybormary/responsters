// Status classes 1xx–5xx: colour token and the official RFC 9110 class name (English in every language, RSP-110).
// The playful class names and rules are in i18n/<lang>.js under classes.
// sym: the class symbol (RSP-124), so classes differ by shape too, not only by colour (WCAG 1.4.1).
// Inner SVG markup for a 24×24 viewBox, drawn in currentColor: 1xx … still talking, 2xx ✓ done, 3xx → go there,
// 4xx ✕ your mistake, 5xx ⚡ the server broke.
export const CLS = {
  1:{c:'var(--c1)', o:'Informational', sym:'<circle cx="5.5" cy="12" r="2.4" fill="currentColor"/><circle cx="12" cy="12" r="2.4" fill="currentColor"/><circle cx="18.5" cy="12" r="2.4" fill="currentColor"/>'},
  2:{c:'var(--c2)', o:'Successful', sym:'<path d="M4.5 12.5l5 5L19.5 6.5" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>'},
  3:{c:'var(--c3)', o:'Redirection', sym:'<path d="M4 12h14M12.5 6l6 6-6 6" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"/>'},
  4:{c:'var(--c4)', o:'Client Error', sym:'<path d="M6 6l12 12M18 6L6 18" fill="none" stroke="currentColor" stroke-width="3.4" stroke-linecap="round"/>'},
  5:{c:'var(--c5)', o:'Server Error', sym:'<path d="M13.5 2L4.5 13.5h6.5L9.5 22l10-12h-6.5z" fill="currentColor" stroke="currentColor" stroke-width="1" stroke-linejoin="round"/>'}
};

// The class symbol as an inline SVG. Decoration only: the code and the class name already say the class.
export const clsSym = n => `<svg class="cls-sym" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${CLS[n].sym}</svg>`;
