// Trap pairs: codes people mix up and the right answer for each situation, in order.
// Titles, rules and situation texts are in i18n/<lang>.js under traps["401-403"] etc. (same order as s here).
export const PAIRS = [
 {codes:[401,403], s:[401,403,401,403]},
 {codes:[301,302], s:[301,302,301,302]},
 {codes:[200,201,204], s:[200,201,204]},
 {codes:[408,503], s:[408,503]},
 {codes:[500,502], s:[500,502]},
 {codes:[429,503], s:[429,503]},
 {codes:[400,404], s:[400,404]},
 {codes:[404,405], s:[405,404,405,404]},
 {codes:[409,422], s:[409,422,409,422]},
 {codes:[400,422], s:[400,422,400,422]},
 {codes:[400,415], s:[415,400,415,400]},
 {codes:[502,504], s:[502,504,502,504]},
 {codes:[408,504], s:[408,504,408,504]},
];

// "Often confused with": for each code, the other codes in its trap pairs. CONF[401] → [403].
export const CONF = {};
PAIRS.forEach(p=>p.codes.forEach(c=>{CONF[c]=(CONF[c]||[]).concat(p.codes.filter(x=>x!==c))}));
