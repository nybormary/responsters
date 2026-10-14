// Traps view: confusable pairs with their rule and situation drills.
import { BY } from '../data/cards.js';
import { PAIRS } from '../data/traps.js';
import { tx } from './state.js';
import { $ } from './util.js';
import { renderCard } from './card.js';

export function renderTraps(){
  $('pairs').innerHTML = PAIRS.map((p,pi)=>{ const T = tx().traps[p.codes.join('-')]; return `<div class="pair"><h3>${T.title}</h3><p class="rule">${T.rule}</p>
    <div class="duo" style="--n:${p.codes.length}">${p.codes.map(c=>`<div class="cf-box">${renderCard(BY[c])}</div>`).join('')}</div>
    <div class="scen">${p.s.map((s,si)=>`<div class="sc" id="sc-${pi}-${si}"><p>${T.s[si]}</p><div class="btns">${p.codes.map(c=>`<button data-sc="${pi}-${si}" data-v="${c}">${c}</button>`).join('')}</div></div>`).join('')}</div></div>`; }).join('');
}
export function scAnswer(key, v){
  const [pi,si] = key.split('-').map(Number), ans = PAIRS[pi].s[si], box = $('sc-'+key);
  box.querySelectorAll('button').forEach(b=>{ const c=+b.dataset.v; b.disabled=true; if(c===ans) b.classList.add('right'); else if(c===v) b.classList.add('wrong'); });
  const why = document.createElement('div'); why.className='why';
  why.textContent = `${v===ans?'✓':'✗'} ${ans} ${BY[ans].n}: ${tx().cards[ans].mean}`;
  box.appendChild(why);
}
