// Practice modes shown as cards (RSP-109). Only modes that exist are listed, so there are never buttons that do nothing.
// name / hint = keys in i18n; hard = the dark "hardcore" card style.
const icon = d => `<svg class="mode-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

// Nerd (RSP-100): smiley with glasses. Hardcore (RSP-101): flame, dark card (hard:true).
const ICON_NERD = icon('<circle cx="12" cy="12" r="9.5"/><circle cx="8.3" cy="10" r="2.6"/><circle cx="15.7" cy="10" r="2.6"/><path d="M10.9 10h2.2M2.6 9.5h3.1M18.3 9.5h3.1"/><path d="M9 15.5c1.6 1.4 4.4 1.4 6 0"/><path d="M10.6 17.3v1.2M13.4 17.3v1.2"/>');
const ICON_HARD = icon('<path d="M12 3c1 3 4 4.5 4 9a4 4 0 0 1-8 0c0-2 1-3.5 2-4.5 0 2 1 3 2 3 0-3-1-5 0-7.5z"/>');

export const MODES = [
  { id:'art',  name:'modeArt',  hint:'modeArtHint',  icon: icon('<rect x="3" y="4" width="18" height="16" rx="3"/><circle cx="9" cy="10" r="2"/><path d="M21 17l-5-5-9 8"/>') },
  { id:'code', name:'modeCode', hint:'modeCodeHint', icon: icon('<path d="M5 9h14M5 15h14M10 4L8 20M16 4l-2 16"/>') },
  { id:'nerd', name:'modeNerd', hint:'modeNerdHint', icon: ICON_NERD },
  { id:'hard', name:'modeHard', hint:'modeHardHint', icon: ICON_HARD, hard:true },
];
