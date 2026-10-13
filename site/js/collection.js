// Collection view: progress bar, class filter chips and the card grid, grouped by status class.
import { CLS } from '../data/classes.js';
import { D } from '../data/cards.js';
import { state, t, isKnown } from './state.js';
import { $, cls, img } from './util.js';

export function renderCollection(){
  const k = D.filter(d=>isKnown(d.c)).length;
  $('mastered').textContent = t().mastered(k, D.length);
  $('masterbar').style.width = (k/D.length*100)+'%';
  const chips = [[0,t().all,null]].concat([1,2,3,4,5].map(n=>[n,`${n}xx ${CLS[n][state.lang][0]}`,CLS[n].c]));
  $('chips').innerHTML = chips.map(([n,l,c])=>`<button class="chip" data-f="${n}" aria-pressed="${state.filter===n}">${c?`<i style="background:${c}"></i>`:''}${l}</button>`).join('');
  $('groups').innerHTML = [1,2,3,4,5].filter(n=>!state.filter||state.filter===n).map(n=>`
    <div class="group"><h2><code style="background:${CLS[n].c}">${n}xx</code>${CLS[n][state.lang][0]}</h2>
    <p class="lede">${CLS[n][state.lang][1]}</p>
    <div class="grid">${D.filter(d=>cls(d.c)===n).map(d=>`<button class="card" data-open="${d.c}" aria-label="${d.c} ${d.s}: ${d.n}${isKnown(d.c)?`, ${t().known}`:''}"><img src="${img(d.c)}" alt="" loading="lazy">${isKnown(d.c)?`<span class="badge" aria-hidden="true">✓</span>`:''}</button>`).join('')}</div></div>`).join('');
}
