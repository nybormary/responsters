// Interface texts in English. Card texts live in data/; this file is only the UI around them.
// Keys must match i18n/uk.js. Functions build texts that contain numbers.
export const en = {
  tag: "Original creatures for memorizing HTTP status codes. Every code has its own Responster, and every move explains what the code means.",
  tabs: [
    "Collection",
    "Practice",
    "Traps"
  ],
  all: "All",
  mastered: (a,b)=>`${a} of ${b} learned`,
  known: "known",
  modeArt: "Picture → code",
  modeCode: "Code → creature",
  modeArtHint: "See the creature, pick the code",
  modeCodeHint: "See the code, find the creature",
  modeNerd: "Nerd mode",
  modeNerdHint: "Text only: read what it means, pick the code",
  modes: "Practice mode",
  qArt: "Which code is this?",
  qCode: "Which one is it?",
  score: (r,t,s)=>`${r}/${t} · streak ${s}`,
  ok: "Yes!",
  no: "Not this one.",
  next: "Next",
  mean: "What it means",
  when: "Where you meet it",
  conf: "Often confused with",
  qa: "What to test",
  links: "Tools and Read more",
  traps: "Pairs of codes people mix up most. Read the rule, then sort the situations.",
  foot: "Responsters · original characters and copy; status names per RFC 9110.",
  lang: "Language",
  close: "Close",
  back: "Back to collection",
  howto: "How to use",
  howtoSteps: [
    "<b>Collection.</b> Tap a card to meet the creature: what the code means, where you meet it and what to test.",
    "<b>Practice.</b> “Picture → code”, “Code → creature” or “Nerd mode” (text only, no pictures). Two correct answers in a row give a code its ✓.",
    "<b>Traps.</b> Pairs of codes people mix up: a rule and situations to sort."
  ],
  howtoNote: "Progress is saved in this browser only.",
  howtoClose: "Got it",
};
