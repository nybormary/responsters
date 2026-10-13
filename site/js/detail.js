// Card detail: the modal with meaning, where you meet it, what to test, links and "often confused with".
import { CLS } from '../data/classes.js';
import { BY } from '../data/cards.js';
import { QA } from '../data/qa.js';
import { CONF } from '../data/traps.js';
import { TOOLS, REF, MORE } from '../data/links.js';
import { state, t } from './state.js';
import { $, cls } from './util.js';
import { cardBody } from './card.js';

// Links for one code, in order: RFC section → MDN page → extra links → general tools.
function cardLinks(c){
  const r = REF[c], d = BY[c], out = [];
  if(r) out.push({uk:`RFC ${r[0]} §${r[1]}`, en:`RFC ${r[0]} §${r[1]}`, u:`https://www.rfc-editor.org/rfc/rfc${r[0]}#section-${r[1]}`});
  out.push({uk:`MDN: ${c} ${d.s}`, en:`MDN: ${c} ${d.s}`, u:`https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/${c}`});
  return out.concat(MORE[c]||[], TOOLS);
}
export function openCard(c){
  const d = BY[c], L = d[state.lang];
  document.querySelector('.sheet').style.setProperty('--cls', CLS[cls(c)].c);
  $('m-back').textContent = '← ' + t().back;
  $('m-name').textContent = `${c} ${d.s}: ${d.n}`;           // dialog title for screen readers
  $('m-card').innerHTML = cardBody(d);                      // the card itself: art, code, status, name, move, card line
  $('m-h-mean').textContent = t().mean; $('m-mean').textContent = L[0];
  $('m-h-when').textContent = t().when; $('m-when').textContent = L[1];
  $('m-h-qa').textContent = t().qa; $('m-qa').innerHTML = (QA[c]?QA[c][state.lang]:[]).map(x=>`<li>${x.replace(/</g,'&lt;')}</li>`).join('');
  $('m-h-links').textContent = t().links;
  $('m-links').innerHTML = cardLinks(c).map(x=>`<li><a href="${x.u}" target="_blank" rel="noopener">${x[state.lang]} ↗</a></li>`).join('');
  const cf = CONF[c]||[]; $('m-conf-wrap').hidden = !cf.length; $('m-h-conf').textContent = t().conf;
  $('m-conf').innerHTML = cf.map(x=>`<button data-open="${x}">${x} ${BY[x].n}</button>`).join('');
  $('modal').hidden = false; $('m-close').focus();
}
export function closeModal(){ $('modal').hidden = true; }
