// Card detail: the modal with meaning, where you meet it, what to test, links and "often confused with".
import { CLS } from '../data/classes.js';
import { BY } from '../data/cards.js';
import { CONF } from '../data/traps.js';
import { TOOLS, REF, MORE } from '../data/links.js';
import { state, t, tx } from './state.js';
import { $, cls } from './util.js';
import { cardBody } from './card.js';

// Links for one code, in order: RFC section → MDN page → extra links → general tools.
function cardLinks(c){
  const r = REF[c], d = BY[c], out = [];
  if(r) out.push({label:`RFC ${r[0]} §${r[1]}`, u:`https://www.rfc-editor.org/rfc/rfc${r[0]}#section-${r[1]}`});
  out.push({label:`MDN: ${c} ${d.s}`, u:`https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status/${c}`});
  const more = (MORE[c]||[]).map(x=>({label: x.label[state.lang] || x.label.en, u: x.u}));
  return out.concat(more, TOOLS.map((x,i)=>({label: tx().tools[i], u: x.u})));
}
export function openCard(c){
  const d = BY[c], L = tx().cards[c];
  document.querySelector('.sheet').style.setProperty('--cls', CLS[cls(c)].c);
  $('m-back').textContent = '← ' + t().back;
  $('m-name').textContent = `${c} ${d.s}: ${d.n}`;           // dialog title for screen readers
  $('m-card').innerHTML = cardBody(d);                      // the card itself: art, code, status, name, move, card line
  $('m-h-mean').textContent = t().mean; $('m-mean').textContent = L.mean;
  $('m-h-when').textContent = t().when; $('m-when').textContent = L.when;
  $('m-h-qa').textContent = t().qa; $('m-qa').innerHTML = (tx().qa[c]||[]).map(x=>`<li>${x.replace(/</g,'&lt;')}</li>`).join('');
  $('m-h-links').textContent = t().links;
  $('m-links').innerHTML = cardLinks(c).map(x=>`<li><a href="${x.u}" target="_blank" rel="noopener">${x.label} ↗</a></li>`).join('');
  const cf = CONF[c]||[]; $('m-conf-wrap').hidden = !cf.length; $('m-h-conf').textContent = t().conf;
  $('m-conf').innerHTML = cf.map(x=>`<button data-open="${x}">${x} ${BY[x].n}</button>`).join('');
  $('modal').hidden = false; $('m-close').focus();
}
export function closeModal(){ $('modal').hidden = true; }
