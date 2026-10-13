// Practice view: pick a code (missed codes come back more often), build the options, show the round and score the answer.
import { D, BY } from '../data/cards.js';
import { CONF } from '../data/traps.js';
import { store } from './store.js';
import { state, t } from './state.js';
import { $, cls, art } from './util.js';
import { cardBody } from './card.js';

// Weighted random pick; never the same code twice in a row.
function pick(){
  const pool = D.filter(d=>d.c!==state.last);
  const ws = pool.map(d=>state.weight[d.c]||1), sum = ws.reduce((a,b)=>a+b,0);
  let r = Math.random()*sum;
  for(let i=0;i<pool.length;i++){ r-=ws[i]; if(r<=0) return pool[i]; }
  return pool[pool.length-1];
}
// Three wrong options: trap partners first, then the same class, then any other class; shuffled.
function distractors(d){
  const conf = (CONF[d.c]||[]).map(c=>BY[c]);
  const same = D.filter(x=>cls(x.c)===cls(d.c) && x.c!==d.c && !conf.includes(x));
  const other = D.filter(x=>cls(x.c)!==cls(d.c) && !conf.includes(x));
  const sh = a => a.sort(()=>Math.random()-.5);
  return sh([...sh(conf), ...sh(same), ...sh(other)].slice(0,3).concat(d));
}
export function newRound(){ state.cur = pick(); state.last = state.cur.c; state.cur.opts = distractors(state.cur); state.cur.done = false; renderPractice(); }
export function renderPractice(){
  if(!state.cur) return newRound();
  $('score').textContent = t().score(state.stats.r, state.stats.t, state.stats.s);
  const d = state.cur;
  $('stage').dataset.mode = state.mode;
  $('prompt').innerHTML = state.mode==='art'
    ? `<div class="q">${t().qArt}</div><img class="art" src="${art(d.c)}" alt="">`
    : `<div class="q">${t().qCode}</div><div class="bigcode">${d.c}</div><div class="bigstatus">${d.s}</div>`;
  $('opts').innerHTML = d.opts.map(o=>{
    const st = d.done ? (o.c===d.c?'right':(o.c===d.pick?'wrong':'')) : '';
    return state.mode==='art'
      ? `<button class="opt ${st}" data-ans="${o.c}" ${d.done?'disabled':''}><b>${o.c}</b><span>${o.s}</span></button>`
      : `<button class="opt imgopt ${st}" data-ans="${o.c}" ${d.done?'disabled':''} aria-label="${o.n}"><img src="${art(o.c)}" alt=""><span class="nm">${o.n}</span></button>`;
  }).join('');
  $('result').innerHTML = d.done ? `<div class="reveal"><div class="rimg cf-box"><div class="card cf-static">${cardBody(d)}</div></div><div class="txt">
     <p class="verdict ${d.pick===d.c?'ok':'no'}">${d.pick===d.c?t().ok:t().no}</p>
     <p><b>${d.c} ${d.s}</b> · ${d.n}</p><p>${d[state.lang][0]}</p>
     <button class="next" id="next">${t().next} →</button></div></div>` : '';
}
export function answer(c){
  if(state.cur.done) return;
  state.cur.done = true; state.cur.pick = c; state.stats.t++;
  if(c===state.cur.c){ state.stats.r++; state.stats.s++; state.weight[state.cur.c]=Math.max(1,(state.weight[state.cur.c]||1)-1); state.streakBy[state.cur.c]=(state.streakBy[state.cur.c]||0)+1; }
  else { state.stats.s=0; state.weight[state.cur.c]=(state.weight[state.cur.c]||1)+2; state.streakBy[state.cur.c]=0; }
  store.set('weight',state.weight); store.set('streak',state.streakBy);
  renderPractice(); const n=$('next'); if(n) n.focus();
}
