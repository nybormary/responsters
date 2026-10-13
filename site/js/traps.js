// Traps view: confusable pairs with their rule and situation drills.
import { BY } from '../data/cards.js';
import { PAIRS } from '../data/traps.js';
import { state } from './state.js';
import { $ } from './util.js';
import { renderCard } from './card.js';

export function renderTraps(){
  $('pairs').innerHTML = PAIRS.map((p,pi)=>`<div class="pair"><h3>${p[state.lang][0]}</h3><p class="rule">${p[state.lang][1]}</p>
    <div class="duo">${p.codes.map(c=>`<div class="cf-box">${renderCard(BY[c])}</div>`).join('')}</div>
    <div class="scen">${p.s.map((s,si)=>`<div class="sc" id="sc-${pi}-${si}"><p>${state.lang==='uk'?s[1]:s[2]}</p><div class="btns">${p.codes.map(c=>`<button data-sc="${pi}-${si}" data-v="${c}">${c}</button>`).join('')}</div></div>`).join('')}</div></div>`).join('');
}
export function scAnswer(key, v){
  const [pi,si] = key.split('-').map(Number), s = PAIRS[pi].s[si], box = $('sc-'+key);
  box.querySelectorAll('button').forEach(b=>{ const c=+b.dataset.v; b.disabled=true; if(c===s[0]) b.classList.add('right'); else if(c===v) b.classList.add('wrong'); });
  const why = document.createElement('div'); why.className='why';
  why.textContent = `${v===s[0]?'✓':'✗'} ${s[0]} ${BY[s[0]].n}: ${BY[s[0]][state.lang][0]}`;
  box.appendChild(why);
}
