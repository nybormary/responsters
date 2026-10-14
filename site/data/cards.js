// The 23 cards: c = code, s = status name (HTTP reason phrase, English in every language), n = creature name, m = move.
// Their texts (meaning, where you meet it, card line) are in i18n/<lang>.js under cards.
export const D = [
 {c:102, s:'Processing', n:'Loadlet', m:'Spin Up'},
 {c:200, s:'OK', n:'Okayak', m:'Nod'},
 {c:201, s:'Created', n:'Buildbeaver', m:'Build'},
 {c:204, s:'No Content', n:'Nullwing', m:'Munch'},
 {c:301, s:'Moved Permanently', n:'Relocrab', m:'New Shell'},
 {c:302, s:'Found', n:'Brbat', m:'Back Soon'},
 {c:304, s:'Not Modified', n:'Cachameleon', m:'Snapshot'},
 {c:400, s:'Bad Request', n:'Garblin', m:'Parse Fail'},
 {c:401, s:'Unauthorized', n:'Whoowl', m:'Who Goes There'},
 {c:403, s:'Forbidden', n:'Nopelican', m:'Hard No'},
 {c:404, s:'Not Found', n:'Nowherret', m:'Vanish'},
 {c:405, s:'Method Not Allowed', n:'Verbadger', m:'Wrong Verb'},
 {c:408, s:'Request Timeout', n:'Slowth', m:'Five More Minutes'},
 {c:409, s:'Conflict', n:'Clashgoat', m:'Horn Lock'},
 {c:413, s:'Content Too Large', n:'Megabite', m:'Overstuff'},
 {c:415, s:'Unsupported Media Type', n:'Pickoala', m:'Picky Eater'},
 {c:418, s:"I'm a teapot", n:'Teapotamus', m:'Steep'},
 {c:422, s:'Unprocessable Content', n:'Nitpecker', m:'Validation Peck'},
 {c:429, s:'Too Many Requests', n:'Spamster', m:'Wheel Spin'},
 {c:500, s:'Internal Server Error', n:'Panicorn', m:'Stack Trace'},
 {c:502, s:'Bad Gateway', n:'Parroxy', m:'Broken Telephone'},
 {c:503, s:'Service Unavailable', n:'Hibearnate', m:'Maintenance Window'},
 {c:504, s:'Gateway Timeout', n:'Waitgator', m:'Long Wait'},
];

// Lookup by code: BY[404] → the 404 card.
export const BY = Object.fromEntries(D.map(d=>[d.c,d]));
