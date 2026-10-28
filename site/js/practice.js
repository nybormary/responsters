// Practice view: pick a code (missed codes come back more often), build the options, show the round and score the answer.
import { D, BY } from '../data/cards.js';
import { CONF } from '../data/traps.js';
import { store } from './store.js';
import { state, t, tx } from './state.js';
import { $, cls, art } from './util.js';
import { clsSym } from '../data/classes.js';

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
// Distractors also follow RSP-101 for Hardcore: trap partners first (3 at random if more), then the same class, then any class.
export function newRound(){ state.cur = pick(); state.last = state.cur.c; state.cur.opts = distractors(state.cur); state.cur.done = false; state.cur.hinted = false; renderPractice(); }
// "Next" (RSP-108): new round, then bring the new question into view and move focus to it.
// On phones the answer sits under the options, so the page is scrolled down when "Next" is pressed.
// Scrolls only if the question isn't fully visible; no smooth scrolling with reduced motion.
export function nextRound(){
  newRound();
  const p = $('prompt'), r = p.getBoundingClientRect();
  if(r.top < 0 || r.bottom > innerHeight){
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    p.scrollIntoView({block:'start', behavior: reduce ? 'auto' : 'smooth'});
  }
  p.focus({preventScroll:true});
}
export function renderPractice(){
  if(!state.cur) return newRound();
  $('score').textContent = t().score(state.stats.r, state.stats.t, state.stats.s);
  const d = state.cur;
  $('stage').dataset.mode = state.mode;
  const p = $('prompt');
  const L = tx().cards[d.c], nerd = state.mode==='nerd', hard = state.mode==='hard';
  // Nerd mode (RSP-100): plain HTTP, no pictures and no creature names. The question is the meaning, the answer is code + status.
  // RSP-124: picture modes show the class symbol on the art, because the art's background colour hints the class
  // to people who see colour; the symbol gives the same hint without colour.
  p.innerHTML = state.mode==='art' ? `<div class="q">${t().qArt}</div><span class="artwrap"><img class="art" src="${art(d.c)}" alt=""><i class="pr-sym">${clsSym(cls(d.c))}</i></span>`
    : nerd ? `<div class="q">${t().qArt}</div><p class="nerdq">${L.mean}</p>`
    // Hardcore (RSP-101): the bare code; the creature name only on request, and not after the answer (the reveal has it).
    : hard ? `<div class="q">${t().qHard}</div><div class="bigcode">${d.c}</div>${d.done ? '' : `<button class="hintbtn" id="hint" aria-expanded="${!!d.hinted}" aria-controls="hint-out">${t().hint}</button>`}<p class="hint-out" id="hint-out" aria-live="polite">${d.hinted && !d.done ? t().hintIs(d.n) : ''}</p>`
    : `<div class="q">${t().qCode}</div><div class="bigcode">${d.c}</div><div class="bigstatus">${d.s}</div>`;
  // Focus target for "Next": a group named after the question, so screen readers read it when focused.
  p.tabIndex = -1; p.setAttribute('role','group');
  p.setAttribute('aria-label', state.mode==='art' ? t().qArt : nerd ? `${t().qArt} ${L.mean}` : hard ? `${t().qHard} ${d.c}` : `${t().qCode} ${d.c} ${d.s}`);
  $('opts').innerHTML = d.opts.map(o=>{
    const st = d.done ? (o.c===d.c?'right':(o.c===d.pick?'wrong':'')) : '';
    if(hard) return `<button class="opt hardopt ${st}" data-ans="${o.c}" ${d.done?'disabled':''}><b>${o.s}</b></button>`;   // status names only, always in English
    return state.mode!=='code'
      ? `<button class="opt ${st}" data-ans="${o.c}" ${d.done?'disabled':''}><b>${o.c}</b><span>${o.s}</span></button>`
      : `<button class="opt imgopt ${st}" data-ans="${o.c}" ${d.done?'disabled':''} aria-label="${o.n}"><img src="${art(o.c)}" alt=""><i class="pr-sym">${clsSym(cls(o.c))}</i><span class="nm">${o.n}</span></button>`;
  }).join('');
  $('result').innerHTML = d.done ? `<div class="reveal"><div class="txt">
     <p class="verdict ${d.pick===d.c?'ok':'no'}">${d.pick===d.c?t().ok:t().no}</p>
     ${nerd ? `<p><b>${d.c} ${d.s}</b></p><p>${L.mean}</p><p class="ex">${L.when}</p>` : `<p><b>${d.c} ${d.s}</b> · ${d.n}</p><p>${L.mean}</p>`}
     ${hard && d.hinted && d.pick===d.c ? `<p class="ex">${t().hintUsed}</p>` : ''}
     <button class="next" id="next">${t().next} →</button></div></div>` : '';
}
// Hint (RSP-101): shows the creature name without redrawing, so focus stays on the button.
export function showHint(){
  const d = state.cur; if(!d || d.done || d.hinted) return;
  d.hinted = true; $('hint').setAttribute('aria-expanded', true); $('hint-out').textContent = t().hintIs(d.n);
}
export function answer(c){
  if(state.cur.done) return;
  state.cur.done = true; state.cur.pick = c; state.stats.t++;
  // A right answer after the hint counts in the score but leaves the code's weight and ✓ streak as they were.
  if(c===state.cur.c && state.cur.hinted){ state.stats.r++; state.stats.s++; }
  else if(c===state.cur.c){ state.stats.r++; state.stats.s++; state.weight[state.cur.c]=Math.max(1,(state.weight[state.cur.c]||1)-1); state.streakBy[state.cur.c]=(state.streakBy[state.cur.c]||0)+1; }
  else { state.stats.s=0; state.weight[state.cur.c]=(state.weight[state.cur.c]||1)+2; state.streakBy[state.cur.c]=0; }
  store.set('weight',state.weight); store.set('streak',state.streakBy);
  renderPractice(); const n=$('next'); if(n) n.focus();
}
