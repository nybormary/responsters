// Page chrome: everything outside the three views (language, tabs, "How to use", footer)
// is redrawn in the current language and state.
import { state, t } from './state.js';
import { $ } from './util.js';

export function renderChrome(){
  document.documentElement.lang = state.lang;
  $('tagline').textContent = t().tag;
  ['uk','en'].forEach(l=>$('lang-'+l).setAttribute('aria-pressed', l===state.lang));
  ['collection','practice','traps'].forEach((v,i)=>{const b=$('tab-'+v); b.textContent=t().tabs[i]; b.setAttribute('aria-selected', v===state.view)});
  ['collection','practice','traps'].forEach(v=>$('view-'+v).hidden = v!==state.view);
  $('mode-art').textContent=t().modeArt; $('mode-code').textContent=t().modeCode;
  $('mode-art').setAttribute('aria-pressed',state.mode==='art'); $('mode-code').setAttribute('aria-pressed',state.mode==='code');
  $('howto-open').textContent=t().howto; $('howto-open').setAttribute('aria-expanded', state.howtoOpen);
  $('howto').hidden=!state.howtoOpen; $('howto-title').textContent=t().howto;
  $('howto-steps').innerHTML=t().howtoSteps.map(s=>`<li>${s}</li>`).join('');
  $('howto-note').textContent=t().howtoNote; $('howto-close').textContent=t().howtoClose;
  $('traps-lede').textContent=t().traps; $('foot').textContent=t().foot; $('m-close').setAttribute('aria-label',t().close);
}
