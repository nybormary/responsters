// Page chrome: everything outside the three views (language menu, tabs, "How to use", Practice mode cards, footer)
// is redrawn in the current language and state.
import { state, t, LANGS, LANG_NAMES } from './state.js';
import { $ } from './util.js';
import { MODES } from './modes.js';

const GLOBE = '<svg class="lang-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3c2.5 2.6 3.8 5.6 3.8 9s-1.3 6.4-3.8 9c-2.5-2.6-3.8-5.6-3.8-9S9.5 5.6 12 3z"/></svg>';
const CHEVRON = '<svg class="lang-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';
const CHECK = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" aria-hidden="true"><path d="M5 12l5 5 9-10"/></svg>';

// Language menu (RSP-109): a button with the current language; the list holds every language that has texts,
// each written in its own language and marked with its own lang, so screen readers pronounce it right.
function renderLangMenu(){
  const [name, code] = LANG_NAMES[state.lang];
  const b = $('lang-btn');
  b.innerHTML = `${GLOBE}<span class="lang-code" aria-hidden="true">${code}</span><span class="lang-name" lang="${state.lang}">${name}</span>${CHEVRON}`;
  b.setAttribute('aria-label', `${t().lang}: ${name}`);
  $('lang-list').setAttribute('aria-label', t().lang);
  $('lang-list').innerHTML = LANGS.map(l => `<li role="none"><button role="menuitemradio" tabindex="-1" data-lang="${l}" lang="${l}" aria-checked="${l===state.lang}"><span>${LANG_NAMES[l][0]}</span><span class="lang-check">${l===state.lang?CHECK:''}</span></button></li>`).join('');
}

// Practice mode cards (RSP-109): icon, name, one-line hint; the chosen one is pressed and carries a check.
function renderModes(){
  $('modes-title').textContent = t().modes;
  $('modes').innerHTML = MODES.map(m => `<button class="mode${m.hard?' hard':''}" data-mode="${m.id}" aria-pressed="${m.id===state.mode}">${m.icon}<span class="mode-name">${t()[m.name]}</span><span class="mode-hint">${t()[m.hint]}</span><span class="mode-check" aria-hidden="true">${CHECK}</span></button>`).join('');
}

export function renderChrome(){
  document.documentElement.lang = state.lang;
  $('tagline').textContent = t().tag;
  renderLangMenu();
  ['collection','practice','traps'].forEach((v,i)=>{const b=$('tab-'+v); b.textContent=t().tabs[i]; b.setAttribute('aria-selected', v===state.view)});
  ['collection','practice','traps'].forEach(v=>$('view-'+v).hidden = v!==state.view);
  renderModes();
  $('howto-open').textContent=t().howto; $('howto-open').setAttribute('aria-expanded', state.howtoOpen);
  $('howto').hidden=!state.howtoOpen; $('howto-title').textContent=t().howto;
  $('howto-steps').innerHTML=t().howtoSteps.map(s=>`<li>${s}</li>`).join('');
  $('howto-note').textContent=t().howtoNote; $('howto-close').textContent=t().howtoClose;
  $('traps-lede').textContent=t().traps; $('foot').textContent=t().foot; $('m-close').setAttribute('aria-label',t().close);
}

// Opening and closing the language menu. Keyboard: Enter/Space/↓ open and focus the current language,
// ↑/↓/Home/End move, Enter picks, Escape or Tab closes; Escape returns focus to the button.
const items = () => [...$('lang-list').querySelectorAll('button')];
export function langOpen(focusCurrent = true){
  $('lang-list').hidden = false; $('lang-btn').setAttribute('aria-expanded', true);
  if(focusCurrent){ const cur = items().find(b => b.getAttribute('aria-checked')==='true') || items()[0]; cur.focus(); }
}
export function langClose(returnFocus = false){
  if($('lang-list').hidden) return;
  $('lang-list').hidden = true; $('lang-btn').setAttribute('aria-expanded', false);
  if(returnFocus) $('lang-btn').focus();
}
export function langKeys(e){
  const list = $('lang-list'), inMenu = list.contains(e.target), onBtn = e.target.id==='lang-btn';
  if(!inMenu && !onBtn) return;
  if(onBtn && (e.key==='ArrowDown' || e.key==='ArrowUp')){ e.preventDefault(); langOpen(); return; }
  if(!inMenu) return;
  const all = items(), i = all.indexOf(document.activeElement);
  if(e.key==='ArrowDown'){ e.preventDefault(); all[(i+1)%all.length].focus(); }
  else if(e.key==='ArrowUp'){ e.preventDefault(); all[(i-1+all.length)%all.length].focus(); }
  else if(e.key==='Home'){ e.preventDefault(); all[0].focus(); }
  else if(e.key==='End'){ e.preventDefault(); all[all.length-1].focus(); }
  else if(e.key==='Escape'){ e.preventDefault(); langClose(true); }
  else if(e.key==='Tab'){ langClose(); }
}
