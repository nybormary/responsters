// Collection view: progress bar, class filter chips and the card grid, grouped by status class.
import { CLS } from '../data/classes.js';
import { D } from '../data/cards.js';
import { state, t, tx, isKnown } from './state.js';
import { $, cls } from './util.js';
import { renderCard } from './card.js';

export function renderCollection(){
  const k = D.filter(d=>isKnown(d.c)).length;
  $('mastered').textContent = t().mastered(k, D.length);
  $('masterbar').style.width = (k/D.length*100)+'%';
  const chips = [[0,t().all,null]].concat([1,2,3,4,5].map(n=>[n,`${n}xx ${tx().classes[n].name}`,CLS[n].c]));
  $('chips').innerHTML = chips.map(([n,l,c])=>`<button class="chip" data-f="${n}" aria-pressed="${state.filter===n}">${c?`<i style="background:${c}"></i>`:''}${l}</button>`).join('');
  $('groups').innerHTML = [1,2,3,4,5].filter(n=>!state.filter||state.filter===n).map(n=>`
    <div class="group"><h2><code style="background:${CLS[n].c}">${n}xx</code>${tx().classes[n].name} <span class="official" lang="en">(${CLS[n].o})</span></h2>
    <p class="lede">${tx().classes[n].rule}</p>
    <div class="grid">${D.filter(d=>cls(d.c)===n).map(renderCard).join('')}</div></div>`).join('');
}
