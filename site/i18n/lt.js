// Lithuanian: every text on the site in one file (RSP-85). Keys must match i18n/en.js; check with: node scripts/check-locales.mjs
// Drafted by Claude, native review on the site pending (RSP-89). Status names and creature names stay in English (they live in data/).
// Terminology: "request" in What to test and Traps (testers' language); the formal term in card meanings.
// Plural form for a number (RSP-156): 1 padaras, 2 padarai, 10 padarų.
const plural = (n, forms) => forms[new Intl.PluralRules('lt').select(n)] ?? forms.other;

export default {
  // Interface. Functions build texts that contain numbers or names.
  ui: {
    tag: 'Originalūs padarai HTTP būsenos kodams įsiminti. Kiekvienas kodas turi savo Responsterį, o kiekvienas jo judesys paaiškina, ką kodas reiškia.',
    appTitle: 'Responsters: įsimink, suprask ir testuok HTTP būsenos kodus',
    tabs: ['Kolekcija', 'Treniruotė', 'Spąstai'],
    all: 'Visi',
    mastered: (a, b) => `Išmokta ${a} iš ${b}`,
    known: 'moku',
    modeArt: 'Paveikslėlis → kodas',
    modeCode: 'Kodas → padaras',
    modeArtHint: 'Matai padarą, renkiesi kodą',
    modeCodeHint: 'Matai kodą, ieškai, kas tai',
    modeNerd: 'Nerd mode',
    modeNerdHint: 'Tik tekstas: skaitai aprašymą, renkiesi kodą',
    modeHard: 'Hardcore',
    modeHardHint: 'Tik kodas: renkiesi būsenos pavadinimą',
    modes: 'Treniruotės režimas',
    qArt: 'Koks tai kodas?',
    qCode: 'Kuris iš jų?',
    qHard: 'Kaip vadinasi ši būsena?',
    hint: 'Užuomina',
    hintIs: (n) => `Tai ${n}`,
    hintUsed: 'Su užuomina: skaičiuojama į rezultatą, bet ne į ✓.',
    score: (r, t, s) => `${r}/${t} · serija ${s}`,
    ok: 'Taip!',
    no: 'Ne tas.',
    next: 'Toliau',
    mean: 'Ką tai reiškia',
    when: 'Kur su juo susiduri',
    conf: 'Dažnai painiojamas su',
    qa: 'Ką testuoti',
    links: 'Įrankiai ir daugiau skaitymo',
    traps: 'Kodų poros, kurias dažniausiai supainioja. Perskaityk taisyklę ir surūšiuok situacijas.',
    lang: 'Kalba',
    close: 'Uždaryti',
    back: 'Atgal į kolekciją',
    top: 'Į viršų',
    howto: 'Kaip naudotis',
    howtoSteps: [
      '<b>Kolekcija.</b> Paliesk kortelę ir susipažink su padaru: ką reiškia kodas, kur su juo susiduri ir ką testuoti.',
      '<b>Treniruotė.</b> „Paveikslėlis → kodas“, „Kodas → padaras“, „Nerd mode“ (tik tekstas) arba „Hardcore“ (tik kodas). Du teisingi atsakymai iš eilės suteikia kodui ✓.',
      '<b>Spąstai.</b> Kodų poros, kurias painioja: taisyklė ir situacijos rūšiavimui.',
    ],
    howtoNote: 'Pažanga išsaugoma tik šioje naršyklėje.',
    howtoClose: 'Supratau',
  },
  // Status classes 1xx–5xx: name and one-line rule.
  classes: {
    1: { name: 'Kiaušiniai', rule: 'Dar ritasi: serveris gavo užklausą ir ją apdoroja.' },
    2: { name: 'Draugai', rule: 'Pavyko.' },
    3: { name: 'Klajokliai', rule: 'Tai, ko ieškai, yra kitur.' },
    4: { name: 'Sargai', rule: 'Kliento klaida: pataisyk užklausą.' },
    5: { name: 'Serverio žvėrys', rule: 'Serverio klaida: tai ne tavo kaltė.' },
  },
  // Cards: what it means, where you meet it, and the card line in the creature's voice (max ~55 characters).
  cards: {
    102: {
      mean: 'Serveris priėmė užklausą ir vis dar ją apdoroja. Atsakymo dar nėra.',
      when: 'Ilgos WebDAV operacijos; įprastose API pasitaiko retai.',
      line: 'Jau dirbu! Rezultato dar nėra.',
      art: 'Mažytis apvalus padarėlis žvilgčioja per įskilusio kiaušinio kraštą; lukštas nupieštas kaip įkėlimo indikatorius ir sukasi.',
    },
    200: {
      mean: 'Užklausa pavyko, atsakyme yra rezultatas.',
      when: 'Puslapio ar sąrašo GET, POST, kuris nesukūrė resurso.',
      line: 'Ką galiu pasakyti? Viskas puiku!',
      art: 'Ramus gauruotas mažas jakas su nedideliais ragais stovi ant žolės ir patenkintas linksi.',
    },
    201: {
      mean: 'Sukurtas naujas resursas. Jo adresas yra Location antraštėje.',
      when: 'POST /orders sukūrė užsakymą.',
      line: 'Visiškai naujas! Pats pastačiau!',
      art: 'Bebras geltonu šalmu išdidžiai stovi prie blizgančio, visiškai naujo rąstinio namelio; šalia rodyklė su užrašu „NEW“.',
    },
    204: {
      mean: 'Pavyko, bet atsakymas neturi turinio.',
      when: 'DELETE arba PUT, kai nėra ką grąžinti.',
      line: 'Padaryta! Tik nėra ką parodyti.',
      art: 'Blyški, pūkuota kandis stikliniais sparneliais soti ir patenkinta sėdi ant lentos prie tuščios pakabos ir vilnos trupinių; virš jos žalia varnelė.',
    },
    301: {
      mean: 'Resursas persikėlė visam laikui. Klientai ir paieškos sistemos turėtų atnaujinti URL.',
      when: 'Persikėlimas į naują domeną arba iš http į https.',
      line: 'Persikėliau visam laikui. Naudok naują adresą.',
      art: 'Vėžys atsiskyrėlis sėdi blizgančioje naujoje kriauklėje; už jo senoji tuščia kriauklė su medine lentele ir rodykle, rodančia tolyn.',
    },
    302: {
      mean: 'Resursas laikinai yra kitur. Pradinis URL lieka teisingas.',
      when: 'Nukreipimas po prisijungimo, laikinas akcijos puslapis.',
      line: 'Šiuo metu išėjęs. Greit grįšiu.',
      art: 'Apvalus šikšnosparnis kabo žemyn galva ir mirkteli prie lentelės „BRB“; išlenkta rodyklė rodo į mažytį urvelį su užrašu „HOME“.',
    },
    304: {
      mean: 'Nuo išsaugojimo talpykloje niekas nepasikeitė. Naudok savo kopiją.',
      when: 'Naršyklė išsiuntė If-None-Match arba If-Modified-Since.',
      line: 'Nepasikeitė. Pažiūrėk į savo talpyklą.',
      art: 'Žalias chameleonas ant šakos laiko momentinę savo nuotrauką toje pačioje pozoje, tarp jų lygybės ženklas.',
    },
    400: {
      mean: 'Užklausa netaisyklinga: sintaksė, formatas arba neteisingi duomenys.',
      when: 'Sugadintas JSON, trūkstamas privalomas laukas, neteisingi užklausos parametrai, per pusę nutrūkęs užklausos turinys.',
      line: 'Kokios nesąmonės! Nesuprantu nė žodžio.',
      art: 'Goblinas apvaliais akiniais sutrikęs prisimerkęs žiūri į suglamžytą raštelį, pilną keverzonių; virš galvos klaustukai.',
    },
    401: {
      mean: 'Reikia autentifikacijos: prisijungimo duomenų nėra arba jie neteisingi.',
      when: 'Nėra Authorization antraštės, pasibaigęs tokenas.',
      line: 'Kas tu? Ar mes pažįstami?',
      art: 'Apvali pūkuota pelėda stovi už mažų vartelių, pakėlusi sparną kaip sargybinė, ir klausia „Who?“.',
    },
    403: {
      mean: 'Žinoma, kas tu esi, bet neturi teisių.',
      when: 'Paprastas naudotojas atidaro administravimo skydelį.',
      line: 'A, tai tu? Neįleisiu!',
      art: 'Apkūnus pelikanas sukryžiuotais sparnais tvirtai stovi prieš plytų sieną ir duris, užrakintas grandine ir spyna.',
    },
    404: {
      mean: 'Šiuo adresu nieko nėra.',
      when: 'Klaida URL adrese, ištrintas produktas.',
      line: 'Čia nieko nėra. Ieškok kitur.',
      art: 'Šeškas, nupieštas tik kaip blankus taškuotas kontūras, stovi prie tuščio urvo; aiškiai matyti tik smalsios jo akys.',
    },
    405: {
      mean: 'Serveris žino šį adresą, bet nepriima šio metodo.',
      when: 'DELETE išsiųstas į endpointą, kuris priima tik GET.',
      line: 'Ne taip! Keisk metodą.',
      art: 'Barsukas durininko kepure stovi prie durų su lentele „GET POST“ ir pakelta letena sustabdo voką „DELETE“, perbrauktą raudonai.',
    },
    408: {
      mean: 'Klientas per ilgai siuntė užklausą, todėl serveris nustojo laukti.',
      when: 'Lėtas ryšys, užstrigęs įkėlimas.',
      line: 'Pramiegojau. Serveris nustojo laukti.',
      art: 'Tinginys miega kabodamas ant šakos, žiovaudamas; po juo nebaigtas laiškas ir rašiklis, šalia smėlio laikrodis.',
    },
    409: {
      mean: 'Užklausa prieštarauja dabartinei resurso būsenai.',
      when: 'Registruojantis jau naudojamas el. paštas, versijų konfliktas redaguojant.',
      line: 'Aš čia buvau pirmas! Atsitrauk!',
      art: 'Dvi užsispyrusios ožkos ant siauros lentos susikabino ragais, tarp jų didelė kibirkštis; nė viena negali praeiti.',
    },
    413: {
      mean: 'Užklausos turinys didesnis už leistiną ribą.',
      when: 'Per didelio failo įkėlimas.',
      line: 'Per daug! Netelpa!',
      art: 'Maža pelytė stumia milžinišką sūrio galvą į savo urvelį; sūris įstrigo, o siena skilinėja po lentele „MAX 10 MB“.',
    },
    415: {
      mean: 'Serveris nepalaiko šio duomenų formato.',
      when: 'XML vietoj JSON, neteisingas Content-Type.',
      line: 'Fu! To nevalgysiu! Pažiūrėk, ką mėgstu.',
      art: 'Koala su seilinuku nusisuka ir stumia nuo stalo lėkštę su dėžute „XML“, prisiglaudusi eukalipto lapą su užrašu „JSON“.',
    },
    418: {
      mean: 'Juokingas kodas iš RFC 2324: arbatinukas atsisako virti kavą.',
      when: 'Velykiniai kiaušiniai API. Puikus bonusas darbo pokalbyje.',
      line: 'Aš arbatinukas. Kavos nebus.',
      art: 'Apvalus begemotas porcelianinio arbatinuko pavidalu leidžia garus; šalia kavos puodelis ir kavos pupelės prie ženklo „kavos negalima“.',
    },
    422: {
      mean: 'Užklausa perskaityta, bet duomenys neatitinka validacijos.',
      when: 'Tekstas vietoj skaičiaus, neigiamas amžius, „email: banana“.',
      line: 'Perskaičiau. Bet amžius -5? Rimtai?',
      art: 'Genys apvaliais akiniais tupi ant tvarkingos formos: „name: Ann“ su žalia varnele, „age: -5“ ir „email: banana“ su raudonais kryžiukais.',
    },
    429: {
      mean: 'Per daug užklausų per trumpą laiką; suveikė užklausų limitas.',
      when: 'Skriptas be pauzių, atsakyme Retry-After antraštė.',
      line: 'Stop! Per daug. Leisk atsikvėpti.',
      art: 'Suprakaitavęs žiurkėnas lekia rate, o iš jo skrieja vokų srautas; po ratu spaustukas jį stabdo.',
    },
    500: {
      mean: 'Serveryje kažkas netikėtai sugedo.',
      when: 'Neapdorota išimtis backend kode.',
      line: 'Čia ne tu, čia aš.',
      art: 'Mažas vienaragis panikuoja: karčiai susivėlę, lašai skraido, o paskui jį driekiasi ilga susipainiojusio kodo uodega.',
    },
    502: {
      mean: 'Šliuzas ar proxy perdavė užklausą toliau, bet gavo iš serverio netinkamą atsakymą.',
      when: 'Nginx prieš nulūžusį backend.',
      line: 'Atėjo sugedęs. Aš tik perduodu!',
      art: 'Papūga ant kabelio tarp dviejų serverių šūkauja nesuprantamą simbolių debesėlį; serveris už jos rūksta po raudona pavojaus lempute.',
    },
    503: {
      mean: 'Serveris laikinai nepasiekiamas: perkrova arba priežiūros darbai.',
      when: 'Planuoti priežiūros darbai, perkrautas serveris.',
      line: 'Uždaryta remontui. Grįžk vėliau.',
      art: 'Didelis lokys su naktine kepure miega jaukiame urve prie lentelės „Closed for maintenance“ ir veržliarakčio.',
    },
    504: {
      mean: 'Šliuzas ar proxy perdavė užklausą toliau, bet taip ir nesulaukė serverio atsakymo.',
      when: 'Lėtas backend už nginx arba CDN.',
      line: 'Laukiau ir laukiau. Serveris neatsako.',
      art: 'Aligatorius atsirėmęs į atvirus sodo vartelius su chronometru laukia; ilgas tuščias takas veda prie mažyčio serverio tolumoje.',
    },
  },
  // "What to test": short test cases, steps → expected result (RSP-11).
  qa: {
    102: [
      'Paleisk ilgą operaciją (pvz., didelio failo importą ar didelio aplanko kopijavimą) ir lauk nieko nespaudžiant puslapyje → puslapis laukia ir parodo rezultatą, be timeout klaidos.',
      'Kol vyksta ilga operacija, stebėk jos būseną sąsajoje → matyti eiga, o „Atlikta“ atsiranda tik tada, kai operacija tikrai baigiasi.',
    ],
    200: [
      'Išsaugok įrašą su žinomomis reikšmėmis, tada jį atidaryk (arba sąrašą, kuriame jis yra) → kiekvienas laukas rodo būtent tai, kas išsaugota, nieko netrūksta ir nėra nieko nereikalingo.',
      'Atidaryk sąrašą, kuriame dar nieko nėra (pvz., naujos paskyros užsakymai) → draugiškas „Čia kol kas tuščia“ ir būsena 200, o ne klaidos puslapis.',
      'Pateik formą su neteisingais duomenimis ir patikrink Network skirtuką → būsena 4xx, o ne 200 su paslėptu klaidos pranešimu viduje.',
    ],
    201: [
      'Sukurk naują elementą (pvz., komentarą ar užsakymą) ir atidaryk sąrašą → naujas elementas yra ten su būtent tomis reikšmėmis, kurias įvedei.',
      'Užpildyk kūrimo formą ir greitai dukart spustelėk „Pateikti“ → sukuriamas tik vienas elementas.',
      'Sukurk elementą, nukopijuok jo nuorodą ir atidaryk naujame skirtuke → elementas atsidaro.',
    ],
    204: [
      'Ištrink elementą iš sąrašo → jis iš karto dingsta be klaidos pranešimo ir negrįžta atnaujinus puslapį.',
      'Nukopijuok elemento nuorodą, ištrink elementą, tada atidaryk nukopijuotą nuorodą → puslapis „nerasta“ (404), o ne senas elementas.',
      'Atidaryk įrašą dviejuose naršyklės skirtukuose. Ištrink jį pirmame, tada bandyk ištrinti antrame → sistema tai apdoroja tvarkingai (pvz., „Elementas nerastas“), be serverio klaidos.',
    ],
    301: [
      'Atidaryk seną URL, kuris persikėlė (pvz., seną produkto nuorodą) → patenki į naują puslapį, o Network skirtuke matyti vienas 301 šuolis, ne grandinė.',
      'Atidaryk seną URL su pridėtais parametrais (pvz., ?page=2&sort=price) → naujas puslapis atsidaro su tais pačiais parametrais.',
      'Atidaryk bet kurio puslapio http:// versiją → nukreipiama į https:// su būsena 301, o ne 302 ar puslapio kopija su 200.',
    ],
    302: [
      'Atsijunk, atidaryk puslapį, kuriam reikia prisijungimo, tiesiogine nuoroda, tada prisijunk → patenki ten, kur nurodyta reikalavimuose (atgal į tą puslapį arba, pvz., į paskyros skydelį), o ne į klaidos ar tuščią puslapį.',
      'Rask nukreipimo parametrą prisijungimo URL (pvz., ?next=/orders), pakeisk jį išorine svetaine (?next=https://example.com) ir prisijunk → lieki mūsų svetainėje.',
      'Pateik formą (pvz., atsiskaitymą), tada patvirtinimo puslapyje paspausk F5 → nėra įspėjimo „pateikti formą dar kartą“ ir nėra antro užsakymo.',
    ],
    304: [
      'Atidaryk puslapį, tada perkrauk jį su atidarytu Network skirtuku → nepakitę paveikslėliai, skriptai ir stiliai grįžta kaip 304.',
      'Pakeisk ką nors matomo (pvz., produkto pavadinimą administravime), tada įprastai perkrauk puslapį → matyti nauja reikšmė, o ne sena iš talpyklos.',
      'Po diegimo atidaryk svetainę naršyklėje, kuri ją jau lankė, neišvalius talpyklos → svetainė veikia be klaidų (senų ir naujų failų mišinio nėra), o nauja versija atsiranda iš karto arba per nurodytą talpyklos laiką.',
    ],
    400: [
      'Postman (arba DevTools) išsiųsk requestą su sugadintu JSON arba be privalomo lauko → būsena 400, o ne 500.',
      'Išsiųsk tą patį sugadintą requestą ir perskaityk klaidos pranešimą → jis nurodo, kas tiksliai negerai (kuris laukas, koks formatas).',
      'Peržiūrėk visą klaidos atsakymą → jame nėra stack trace, failų kelių ar SQL.',
    ],
    401: [
      'Atsijunk ir atidaryk privatų puslapį (arba iškviesk jo API) tiesiogine nuoroda → gauni prisijungimo puslapį arba būseną 401, o ne turinį.',
      'Prisijunk, palauk, kol sesija baigsis (arba ištrink sesijos slapuką), tada ką nors spustelėk → paprašoma prisijungti iš naujo, o prisijungus galima tęsti.',
      'Atsijunk, paspausk naršyklėje „Atgal“ ir bandyk atlikti veiksmą senajame puslapyje → prieigos nėra, prašoma prisijungti.',
    ],
    403: [
      'Prisijunk kaip paprastas naudotojas ir atidaryk administravimo URL tiesiogine nuoroda (pvz., /admin) → administravimo puslapis neatsidaro (nėra prieigos, prisijungimo puslapis arba 404, kaip nurodyta reikalavimuose).',
      'Prisijunk kaip naudotojas A, atidaryk vieną savo užsakymą ir pakeisk id URL adrese į naudotojo B užsakymo → B užsakymas nerodomas.',
      'Kaip administratorius nukopijuok iš DevTools tik administratoriui skirto veiksmo requestą; kaip paprastas naudotojas išsiųsk tą patį requestą → būsena 403, niekas nepasikeičia.',
    ],
    404: [
      'Atidaryk URL su klaida (pvz., /prodcts) → draugiškas 404 puslapis su keliu atgal (meniu, paieška arba nuoroda į pradžią).',
      'Atidaryk elementą ir pakeisk jo id URL adrese į neegzistuojantį (pvz., 999999) → 404 puslapis, o ne serverio klaida.',
      'Atidaryk neegzistuojantį puslapį su atidarytu Network skirtuku → būsena tikrai 404, o ne 200 („soft 404“).',
    ],
    405: [
      'Postman išsiųsk DELETE (arba PUT) į endpointą, kuris tik skaito duomenis (pvz., viešą sąrašą) → būsena 405, niekas neištrinama.',
      'Pažiūrėk į to 405 atsakymo antraštes → yra Allow antraštė su leidžiamų metodų sąrašu.',
      'Išbandyk endpointe kiekvieną nepalaikomą metodą → visada 405, niekada 404 ar 500.',
    ],
    408: [
      'DevTools nustatyk tinklą į Slow 3G ir pateik didelę formą arba įkelk didelį failą → po kurio laiko atsiranda aiškus timeout pranešimas, o ne nesibaigiantis suktukas.',
      'Po timeout pranešimo grąžink įprastą tinklą ir bandyk dar kartą → veikia, o įvesti duomenys lieka formoje.',
    ],
    409: [
      'Užsiregistruok su el. paštu, kuriam jau yra paskyra → nauja paskyra nesukuriama, o pranešimas toks, kaip nurodyta reikalavimuose (tiesiai „Šis el. paštas jau naudojamas“ arba neutraliai „Patikrink pašto dėžutę“).',
      'Atidaryk tą patį įrašą dviejuose skirtukuose. Pakeisk ir išsaugok pirmame, tada pakeisk ir išsaugok antrame → antras išsaugojimas įspėja apie konfliktą, o ne tyliai perrašo pirmą pakeitimą.',
      'Perskaityk konflikto pranešimą → jis nurodo, kas tiksliai konfliktuoja (kuris laukas ar kuri versija).',
    ],
    413: [
      'Sužinok įkėlimo ribą (pvz., 10 MB) ir įkelk failus šiek tiek mažesnius, lygiai ties riba ir šiek tiek didesnius → elgesys ties riba atitinka reikalavimus (≤ ar <), o viskas, kas didesnė, atmetama.',
      'Palygink ribą užuominoje prie įkėlimo lauko su dydžiu, kuris iš tikrųjų atmetamas → jie sutampa.',
      'Įkelk aiškiai per didelį failą → aiškus pranešimas su leistinu dydžiu, o ne nutrūkęs ryšys ar nesibaigiantis įkėlimas.',
    ],
    415: [
      'Postman išsiųsk teisingą JSON turinį su Content-Type: text/plain (arba be Content-Type) → būsena 415, o ne 500.',
      'Išsiųsk tuos pačius duomenis kaip XML arba form-data į endpointą, kuris priima tik JSON → būsena 415 su pranešimu, koks formatas laukiamas.',
    ],
    418: [
      'Jei produkte yra velykinis kiaušinis (pvz., /teapot), iškviesk jį, tada kelis tikrus endpointus → tikrieji veikia įprastai.',
      'Po velykinio kiaušinio iškvietimo patikrink stebėseną ir įspėjimus → nėra pavojaus signalo apie nežinomą klaidą.',
    ],
    422: [
      'Įvesk amžiaus lauke -5 (arba neteisingą el. paštą: „banana“, „anna@“, „@mail.com“, „anna@@mail.com“, „anna k@mail.com“) ir pateik → klaidos pranešimas tiesiai po tuo lauku, forma neišsiunčiama.',
      'Užpildyk kelis laukus neteisingomis, o kitus teisingomis reikšmėmis ir pateik → visos klaidos rodomos iš karto, o teisingos reikšmės lieka užpildytos.',
      'Išbandyk ribines reikšmes po vieną: tuščias privalomas laukas, maksimalus ilgis + 1 simbolis, gimimo data ateityje, vasario 29-oji nekeliamaisiais metais → kiekviena atmetama su aiškia priežastimi.',
    ],
    429: [
      'Sužinok nurodytą limitą (dokumentacija, atsakymo antraštė arba paklausk programuotojo), pvz., 5 prisijungimo bandymai per minutę; atlik lygiai tiek bandymų ir dar vieną → blokuojamas tik tas papildomas.',
      'Kai blokavimo laikas baigiasi, bandyk dar kartą → vėl veikia.',
      'Pasiek limitą kaip naudotojas A, tada iš karto bandyk kaip naudotojas B kitoje naršyklėje → naudotojas B neturėtų būti užblokuotas.',
    ],
    500: [
      "DevTools (Elements skirtuke) pašalink iš lauko maxlength, required ar pattern ir pateik formą su netikėtais duomenimis: emoji, tekstas vienu simboliu ilgesnis už backend ar duomenų bazės ribą, <script>, ' OR 1=1 → jokios 500: arba įprastas rezultatas, arba validacijos klaida.",
      'Jei forma tikrina duomenis JavaScript, nukopijuok requestą Network (Copy as fetch) arba atidaryk jį Postman, įrašyk tuos pačius duomenis ir išsiųsk → vėl jokios 500.',
      'Jei 500 vis dėlto įvyksta, pažiūrėk į puslapį → pranešimas naudotojui be techninės informacijos (pvz., „Kažkas nepavyko, bandyk dar kartą“).',
      'Po 500 patikrink žurnalus ar stebėseną → klaida ten yra su laiku, URL ir requesto detalėmis.',
    ],
    502: [
      'Testinėje aplinkoje sustabdyk backend paslaugą ir atidaryk svetainę → draugiškas klaidos puslapis, o ne neapdorotas nginx ar proxy puslapis.',
      'Perskaityk tą klaidos puslapį ir jo atsakymą → nėra vidinių IP adresų, hostų pavadinimų ar serverių versijų.',
      'Vėl paleisk backend ir perkrauk svetainę → veikia be jokių papildomų veiksmų.',
    ],
    503: [
      'Įjunk planuotų priežiūros darbų režimą (arba atidaryk svetainę diegimo metu) → priežiūros puslapis su numatomu grįžimo laiku, o ne sugadintas maketas.',
      'Atidaryk priežiūros puslapį su atidarytu Network skirtuku → būsena 503, o ne 200.',
      'Apkrovos testo metu stebėk atsakymus didėjant apkrovai → esant perkrovai dalis requestų gauna 503, bet svetainė visiškai nenulūžta ir atsigauna, kai apkrova sumažėja.',
    ],
    504: [
      'Paleisk lėčiausią operaciją, kurią rasi (pvz., metinę ataskaitą ar pilną eksportą) → po timeout atsiranda aiškus pranešimas, o ne nesibaigiantis suktukas.',
      'Paleisk labai ilgą operaciją ir išeik iš puslapio → ji tęsiasi fone, o kai baigiasi, gauni pranešimą (arba paruoštą failą).',
      'Po timeout pranešimo paspausk „Bandyti dar kartą“ → operacija prasideda iš naujo nereikalaujant iš naujo įvesti filtrų ar duomenų.',
    ],
  },
  // Traps: title, rule and the situations to sort, in the order of data/http/traps.js (the answers live there).
  traps: {
    '401-403': {
      title: 'Whoowl ar Nopelican?',
      rule: '401: parodyk, kas esi, ir įeisi. 403: žinome, kas esi, ir vis tiek ne.',
      s: [
        'Tokeno galiojimas baigėsi.',
        'Prisijungęs naudotojas trina kito žmogaus užsakymą.',
        'Requestas neturi Authorization antraštės.',
        'Paprastas naudotojas atidaro /admin.',
      ],
    },
    '301-302': {
      title: 'Relocrab ar Brbat?',
      rule: '301: persikėlė visam laikui. 302: laikinai kitur, senas adresas vis dar teisingas.',
      s: [
        'Svetainė visam laikui persikėlė į naują domeną.',
        'Prisijungus grąžinama į ankstesnį puslapį.',
        'Visi http adresai dabar visam laikui veda į https.',
        'Išpardavimo metu pradinis puslapis nukreipia į akcijos puslapį.',
      ],
    },
    '200-201-204': {
      title: 'Okayak, Buildbeaver ar Nullwing?',
      rule: '200: štai rezultatas. 201: sukurta kažkas nauja. 204: padaryta, nėra ką parodyti.',
      s: [
        'GET /orders grąžino užsakymų sąrašą.',
        'POST /orders sukūrė naują užsakymą.',
        'DELETE /orders/42 pavyko be turinio.',
      ],
    },
    '408-503': {
      title: 'Slowth ar Hibearnate?',
      rule: '408: klientas per lėtas. 503: serveris miega.',
      s: ['Klientas pradėjo įkelti didelį failą ir užstrigo.', 'Serveryje vyksta planuoti priežiūros darbai.'],
    },
    '500-502': {
      title: 'Panicorn ar Parroxy?',
      rule: '500: sugedo pats serveris. 502: proxy perdavė užklausą toliau ir gavo iš serverio šiukšlių.',
      s: ['Neapdorota išimtis backend kode.', 'Nginx negavo tinkamo atsakymo iš backend.'],
    },
    '429-503': {
      title: 'Spamster ar Hibearnate?',
      rule: '429: per daug requestų iš tavęs. 503: serveris neveikia visiems.',
      s: ['Tavo skriptas siunčia tūkstantį requestų per sekundę.', 'Serveris perkrautas ir niekam neatsako.'],
    },
    '400-404': {
      title: 'Garblin ar Nowherret?',
      rule: '400: requesto neįmanoma perskaityti. 404: perskaitytas, bet ten nieko nėra.',
      s: ['JSON trūksta uždarančio riestinio skliausto.', 'GET /users/99999, o tokio naudotojo nėra.'],
    },
    '404-405': {
      title: 'Nowherret ar Verbadger?',
      rule: '404: šiuo adresu niekas negyvena. 405: adresas yra, bet šis metodas čia nepriimamas.',
      s: [
        'DELETE /products, nors produktų sąrašas skirtas tik skaityti.',
        'GET /prodcts su klaida adrese.',
        'PUT į /login, kuris priima tik POST.',
        'GET /orders/777 ištrintam užsakymui.',
      ],
    },
    '409-422': {
      title: 'Clashgoat ar Nitpecker?',
      rule: '409: duomenys tvarkingi, bet susiduria su tuo, kas jau yra. 422: patys duomenys neturi prasmės.',
      s: [
        'Registracija su jau naudojamu el. paštu.',
        'Registracija su el. paštu „banana“.',
        'Du žmonės redaguoja tą patį įrašą, o antras pakeitimas remiasi pasenusia versija.',
        'Amžiaus lauke įrašyta −5.',
      ],
    },
    '400-422': {
      title: 'Garblin ar Nitpecker?',
      rule: '400: requesto net neįmanoma perskaityti. 422: jis perskaitytas, bet reikšmės neturi prasmės. 400 yra bendra kliento klaida: kai tinka konkretesnis kodas, serveris naudoja jį.',
      s: [
        'JSON yra neuždaryta kabutė ir parseris sugenda.',
        'JSON teisingas, bet gimimo data ateityje.',
        'Requesto turinys nutrūkęs per pusę.',
        'Užsakymas −3 vienetams.',
      ],
    },
    '400-415': {
      title: 'Garblin ar Pickoala?',
      rule: '400: formatas teisingas, bet requestas sugadintas. 415: serveris visai nepriima šio formato. 400 yra bendra kliento klaida: kai tinka konkretesnis kodas, serveris naudoja jį.',
      s: [
        'Content-Type: application/xml į endpointą, kuris priima tik JSON.',
        'Content-Type: application/json, bet turinys yra sugadintas JSON.',
        'Avataras įkeliamas kaip .exe vietoj .png.',
        'JSON po paskutinio lauko yra kablelis.',
      ],
    },
    '502-504': {
      title: 'Parroxy ar Waitgator?',
      rule: '502: proxy perdavė užklausą toliau ir gavo iš serverio šiukšlių. 504: taip ir nesulaukė serverio atsakymo.',
      s: [
        'Nginx gavo netinkamą atsakymą iš backend.',
        'Backend ruošia ataskaitą 2 minutes, o proxy laukia tik 60 sekundžių.',
        'Backend persikrauna ir nutraukia ryšį atsakymo viduryje.',
        'Duomenų bazė pakibo, todėl backend taip ir neatsakė šliuzui.',
      ],
    },
    '408-504': {
      title: 'Slowth ar Waitgator?',
      rule: '408: lėtas klientas; serveris nustojo laukti requesto. 504: lėtas serveris už šliuzo; šliuzas nustojo laukti atsakymo.',
      s: [
        'Telefonas su silpnu mobiliuoju internetu pradeda siųsti formą, ir requestas užstringa pusiaukelėje.',
        'CDN laiku negavo atsakymo iš tavo serverio.',
        'Klientas atidarė ryšį ir nieko nesiunčia.',
        'Proxy laukė mokėjimų mikroserviso, kuris tyli.',
      ],
    },
  },
  // Svetainės antraštė ir poraštė (RSP-156): tokios pačios visuose zoologijos sodo puslapiuose.
  site: {
    nav: 'Svetainės meniu',
    langHint: {
      label: 'Svetainės kalba',
      text: 'Mnemozoo yra ir lietuviškai.',
      open: 'Atidaryti',
      close: 'Uždaryti',
    },
    map: 'Žemėlapis',
    about: 'Apie projektą',
    foot: 'Originalūs personažai ir tekstai; būsenų pavadinimai pagal IANA registrą.',
    news: 'Kas naujo', // footer and "How to use" link to the What's new page (RSP-145)
    contact: 'Klaida? Atsiliepimas?', // footer mail link (RSP-139, RSP-147)
    mail: 'el. paštas', // screen-reader note after the footer mail link
    page: 'Puslapis', // first line of the feedback mail: "Puslapis: <address>"
    ext: 'išorinė svetainė', // screen-reader note after LinkedIn and GitHub in the footer
  },
  // "What's new" page /<lang>/news/ (RSP-145): page texts; entries in the order of data/news.js, items in the
  // order of its kinds. Plain language, what the visitor gets, no ticket numbers.
  news: {
    title: 'Kas naujo · Mnemozoo',
    h1: 'Kas naujo',
    lead: 'Kas pasikeitė Mnemozoo, naujausi viršuje.',
    kinds: { new: 'Nauja', improved: 'Patobulinta', fixed: 'Ištaisyta' },
    entries: {
      'advent-preview': {
        title: 'Git įsikelia',
        line: 'Git Mnemozoo: nuo gruodžio 1 d. kasdien nauja komanda, paaiškinta buitine scenele.',
        items: [
          'Advento siena: 25 durelės, pirmosios atsidaro gruodžio 1 d.',
          'Git komandų grupės pažymėtos piktogramomis, ne tik spalva.',
          'Adresai be kalbos iškart atveria anglišką puslapį ir pasiūlo pereiti į jūsų kalbą.',
        ],
      },
      'footer-news': {
        title: 'Poraštė ir naujienos',
        line: 'Dabar lengva mums parašyti ir sužinoti, kas pasikeitė svetainėje.',
        items: [
          'Dabar galite palikti atsiliepimą ar pranešti apie klaidą paspaudę nuorodą poraštėje.',
          'Visi svetainės pakeitimai dabar surinkti viename puslapyje — šiame.',
          'Nuorodos į LinkedIn ir GitHub dabar yra kiekvieno puslapio apačioje.',
        ],
      },
      visitors: {
        title: 'Lankytojai',
        line: 'Svetainė prisimena jūsų kalbą ir telefone atsidaro greičiau.',
        items: [
          'Svetainė atsidaro ta kalba, kurią pasirinkote paskutinį kartą.',
          'Telefone puslapiai pasirodo greičiau.',
          'Apsilankymus skaičiuojame be slapukų ir jūsų nesekame.',
        ],
      },
    },
  },
  // Pagrindinis puslapis /<lang>/ (RSP-156).
  notFound: {
    title: '404: čia niekas negyvena · Mnemozoo',
    h1: 'Šiuo adresu niekas negyvena',
    text: 'Galbūt puslapis perkeltas arba adrese yra klaida.',
    back: 'Atgal į zoologijos sodą →',
  },
  home: {
    title: 'Mnemozoo: technologijų zoologijos sodas tavo atminčiai',
    description:
      'Originalūs padarai HTTP būsenos kodams: kortelė kiekvienam kodui, treniruotė ir spąstai su panašiais kodais. Visomis svetainės kalbomis.',
    kicker: 'IT memo zoo',
    h1: 'Gauk atsakymą dar prieš klausimą',
    lead: 'Originalūs padarai HTTP būsenos kodams, kuriuos kasdien sutinki naršyklėje, žurnaluose ir konsolėje. Kortelė, treniruotė, spąstai su panašiais kodais. Visomis svetainės kalbomis.',
    mapTitle: 'Zoologijos sodo žemėlapis',
    httpSign: 'Laukiniai gyvūnai · atidaryta', // zone sign with its status (RSP-170)
    httpName: 'HTTP būsenos kodai',
    httpText: (n, first, last) =>
      `${n} ${plural(n, { one: 'padaras', few: 'padarai', many: 'padaro', other: 'padarų' })} nuo ${first} iki ${last}. Kortelė kiekvienam kodui, treniruotė keturiais režimais, spąstai su kodais, kuriuos painioja.`,
    enter: 'Susipažink su gyventojais →',
    // announcement sign (RSP-195): the date is the advent start (ADVENT_START), in the page language
    gitSign: (date) => `Naminiai gyvūnai · atidaroma ${date}`,
    // from the advent start: the Git enclosure is open and links to the advent wall
    gitOpenSign: 'Naminiai gyvūnai · atidaryta',
    gitEnter: 'Atidaryti advento kalendorių →',
    gitText: 'Git komandos kaip buitinės scenos. Pradedame advento kalendoriumi: kasdien nauja kortelė.',
    pavilionSign: 'Teminis paviljonas', // singular: the sign hangs on the pavilion itself
    pairsName: 'Panašios rūšys',
    pairsText: 'Poros, kurias painioja: 401 ir 403, 502 ir 504. Taisyklė ir situacijos rūšiavimui.',
    pairsLink: (n) => `${n} ${plural(n, { one: 'pora', few: 'poros', many: 'poros', other: 'porų' })} HTTP aptvare →`,
    howTitle: 'Kaip tai veikia',
    steps: [
      ['Susipažink', 'Padaro kortelė: ką reiškia kodas, kur su juo susiduri ir ką testuoti.'],
      ['Treniruokis', 'Nuo paveikslėlio prie kodo ir atvirkščiai. Du teisingi atsakymai iš eilės – ir kodas gauna ✓.'],
      ['Nesupainiok', 'Spąstai su panašiais kodais: viena taisyklė ir kelios situacijos rūšiavimui.'],
    ],
    whyTitle: 'Kam treniruoti atmintį, jei yra AI?',
    why: [
      'Jis atsako į klausimus. Bet paklausti gali tik apie tai, apie ką žinai. Jei žurnale šmėstelėjo 429 ir tu žinai, kodėl atsiranda būtent ši būsena, sutaupysi kelis klausimus ir žetonus 😉',
      'Mnemozoo treniruoja būtent atpažinimą. Ši svetainė sukurta su AI, bet AI už tave negalvos.',
    ],
    aboutTitle: 'Apie projektą',
    aboutText: 'Nepriklausomas Marynos Bortnyk QA projektas.',
    gitLogo: 'Git logotipas:',
  },
  // "Tools and Read more": labels for data/http/links.js TOOLS, in the same order.
  tools: ['Chrome DevTools: Network skydelis', 'Firefox: Edit and Resend', 'Postman: užklausos siuntimas'],
  // Git rubric (RSP-199, RSP-200): labels of the git card page, the household names of the git groups (data/git/groups.js),
  // and the card texts git.cards.<id> (scene title, caption, "$" line, page sections), added card by card with RSP-200.
  git: {
    ui: {
      back: 'Į advento kalendorių',
      does: 'Ką daro',
      tip: 'Patarimas',
      opts: 'Parinktys',
      file: 'Eilutės faile',
      cmds: 'Komandos',
      careful: 'Atsargiai',
      conf: 'Dažnai painiojama su',
      // c = the list where git help shows the command's section, already as HTML (<code>git help -a</code>)
      help: (c) => `Skyrius ${c}`,
      // before `git help <command>`, the command's own manual
      manual: 'git-scm.com (anglų k.)',
      danger: 'Pavojinga komanda',
      // heading of the outside links on a git card page
      docs: 'Dokumentacija',
      // the day row under the card (RSP-226): n = advent day, date = the day it opens
      nav: {
        label: 'Advento dienos',
        day: (n) => `Diena ${n}`,
        from: (date) => `nuo ${date}`,
        prev: 'Ankstesnė:',
        next: 'Kita:',
      },
    },
    // the advent wall /<lang>/git/ (RSP-195): door labels for screen readers, the flags on the paper
    wall: {
      title: 'Git advento kalendorius',
      // n = the number of advent days (25 since 2026-11-17)
      lead: (date, n) =>
        `${n} git komandų, po vieną langelį per dieną nuo ${date} Praleistas dienas galima atidaryti vėliau.`,
      intro:
        'Oficiali Git™ dokumentacija pilna buitinių žodžių: kasdienės komandos ten vadinamos „porcelianu“ (porcelain), o viskas, kas veikia po jomis, – „santechnika“ (plumbing); nebaigti darbai paslepiami (`git stash`), sausos šakos apkarpomos (`git prune`), šiukšlės surenkamos (`git gc`), o ant svarbių daiktų užkabinama etiketė (`git tag`). Tai tapo git komandų mokymosi per asociacijas pagrindu: buitis ir naminiai gyvūnai, kuriuos rasi kiekvienoje kortelėje.',
      today: 'šiandien',
      // short, it has to fit a small door on a phone (Maryna, 2026-11-17: «забули?»)
      missed: 'pamiršot?',
      // phone: the big door of today above the wall (prototype AdventPhone, 2026-11-17)
      todayHint: 'Atidaryk šiandienos langelį',
      legend: 'Grupės',
      locked: (n, date) => `Diena ${n}, atsidarys ${date}`,
      paperToday: (n) => `Diena ${n}, šiandien, atidaryti langelį`,
      paperMissed: (n) => `Diena ${n}, pamiršot? Atidaryti langelį`,
      bigToday: (n) => `Diena ${n}, šiandien. Atidaryk šiandienos langelį`,
      open: (n, cmd) => `Diena ${n}: ${cmd}, atidaryti kortelę`,
      revealed: (n, cmd) => `Diena ${n}: ${cmd}. Paspausk dar kartą, kad atidarytum kortelę.`,
    },
    groups: { start: 'Įkurtuvės', home: 'Namuose', visit: 'Vizitas', archive: 'Palėpė', post: 'Paštas' },
    cards: {
      // Pictures ready (RSP-191, RSP-192): only their text for now; the other card texts come with RSP-200.
      init: {
        title: 'Tuščias butas',
        line: 'Pradėkime nuo švaraus lapo.',
        move: '$ git init',
        hint: 'nauja saugykla dabartiniame aplanke',
        does: {
          text: 'Dabartiniame aplanke sukuria naują tuščią saugyklą (repository): paslėptą aplanką `.git`, kuriame git laikys visą istoriją. Aplanko failai lieka, kaip buvo; git jų dar neseka. Komitų dar nėra, todėl `git branch` nieko nerodo: šaka atsiras su pirmuoju komitu.',
          meta: 'Naujas butas: sienos yra, baldų dar nėra, o pirmoji įeina katė.',
        },
        tip: 'Projektas jau yra GitHub ar kitur? Tada ne init, o `git clone <url>`: jis pats sukurs aplanką ir atneš visą istoriją.',
        opts: [
          {
            cmd: 'git init <aplankas>',
            text: '— sukuria tokio pavadinimo aplanką (jei jo dar nėra) ir jame saugyklą.',
            meta: 'Pastatai naują butą ir iškart pakabini lentelę.',
          },
          {
            cmd: 'git init -b main',
            text: '— nustato pirmosios šakos pavadinimą; be jo git 2.43 naudoja `master` ir parodo patarimą, kaip tai pakeisti.',
            meta: 'Kaip pavadinti pirmąjį kambarį, sprendi tu.',
          },
        ],
        art: 'Pilka katė stovi ant plačiai atvertų durų slenksčio ir pirmoji įkelia leteną į tuščią butą: baldų nėra, ant sienos tik tuščias rėmelis. Už jos žmogus su lagaminais, ant vieno lemputės lipdukas. Prie durų viena nauja lentelė su vardu.',
      },
      gitignore: {
        title: 'Kečupas po nosimi',
        line: 'Mama, kur kečupas?',
        move: '$ git check-ignore -v <failas>',
        hint: 'kuri taisyklė slepia šį failą',
        does: {
          text: 'Ne komanda, o failas saugyklos šakniniame aplanke: šablonų sąrašas (`*.log`, `node_modules/`, `.env`), kurių git nerodo tarp nesekamų (untracked) ir neprideda per `git add .`. Veikia tik failams, kurių git dar neseka; patį `.gitignore` komituoja, kad taisyklės būtų bendros.',
          meta: 'Sąrašas ant šaldytuvo durų: ko nepastebėti, net jei stovi tiesiai prieš akis.',
        },
        tip: 'Failas jau komite? `.gitignore` jo nepaslėps: pirma `git rm --cached <failas>` — git nustos jį sekti, o kopija diske liks.',
        file: [
          {
            line: '*.log',
            text: 'Šablonas: visi failai su šia galūne bet kuriame aplanke; `/` pabaigoje (`build/`) — tik aplankai.',
            meta: 'Nepastebėti nė vieno tuščio butelio, kad ir kur stovėtų.',
          },
          {
            line: '!keep.log',
            text: '`!` pradžioje sugrąžina failą, kurį paslėpė aukščiau esanti taisyklė.',
            meta: 'Išskyrus šitą — jį palik.',
          },
        ],
        opts: [
          {
            cmd: 'git add -f <failas>',
            text: '— prideda failą nepaisant `.gitignore`; nuo tada git jį seka.',
            meta: 'Sąmoningai dedi į krepšį tai, ko paprastai nepastebi.',
          },
        ],
        art: 'Ant sienos – katės portretas: ji sėdi nugara į savo dubenėlį su žuvyte. Žmogus stovi prie atviro šaldytuvo, kasosi pakaušį ir galvoja, kur kečupas, o kečupo butelis stovi tiesiai prieš jį ant vidurinės lentynos. Ant šaldytuvo durų po magnetu kabo sąrašas.',
      },
      restore: {
        title: 'Kaip nuotraukoje',
        line: 'Atsargiai, mama tvarkosi — už pasekmes neatsakome',
        move: '$ git restore <failas>',
        hint: 'išmesti failo pakeitimus',
        does: {
          text: 'Grąžina failą darbiniame aplanke į būseną indekse, t. y. išmeta dar nepridėtus pakeitimus. `git restore --staged <failas>` veikia atvirkščiai: išima failą iš indekso, o darbinį aplanką palieka, kaip yra. Komitų istorijos nekeičia.',
          meta: 'Mama sutvarko kambarį kaip nuotraukoje: kas nebaigta, dingsta.',
        },
        tip: 'Kelias privalomas: `git restore .` atkuria visą aplanką. Anksčiau tai darydavo per `git checkout -- <failas>`.',
        opts: [
          {
            cmd: 'git restore --staged <failas>',
            text: '— išima failą iš indekso (unstage); pakeitimai darbiniame aplanke lieka.',
            meta: 'Išimi daiktą iš krepšio, bet nepadedi jo į vietą.',
          },
          {
            cmd: 'git restore --source <komitas> <failas>',
            text: '— paima failą iš nurodyto komito, pvz., `HEAD~1`.',
            meta: 'Tvarkai pagal senesnę nuotrauką.',
          },
        ],
        careful: [
          'Išmesti pakeitimai dingsta visam laikui: jų nėra nei istorijoje, nei `git reflog`.',
          'Prieš `git restore` pažiūrėk `git diff`. Jei gaila išmesti, pirma `git stash`.',
        ],
        art: 'Ant sienos – triušio, sugraužusio šlepetę, portretas. Mama iškėlusi laiko tvarkingos lentynos nuotrauką, „kaip buvo“, ir ryžtingai šluoja nuo grindų į semtuvėlį nebaigtą dėlionę, detalės skrenda į semtuvėlį. Kambario tarpduryje vaikas iškeltomis rankomis rėkia. Dešinėje lentyna jau kaip nuotraukoje: tvarkingos dėžės, tarp jų dėlionės dėžutė.',
      },
      stash: {
        title: 'Svečiai prie durų',
        line: 'Greitai susitvarkysiu!',
        move: '$ git stash',
        hint: 'paslėpti nekomituotus pakeitimus',
        does: {
          text: 'Paslepia nekomituotus sekamų failų pakeitimus (ir indekse, ir darbiniame aplanke) atskiroje saugykloje ir grąžina darbinį aplanką į paskutinio komito būseną. Vėliau juos galima išsitraukti, net kitoje šakoje.',
          meta: 'Skambina į duris: nebaigtus darbus sukiši į spintą, kad kambaryje būtų tvarkinga.',
        },
        tip: 'Paslėpimų gali būti keli: `git stash list` rodo visus, `stash@{0}` — naujausias.',
        opts: [
          {
            cmd: 'git stash pop',
            text: '— grąžina paskutinį paslėpimą į darbinį aplanką ir pašalina jį iš sąrašo; `git stash apply` grąžina, bet palieka sąraše.',
            meta: 'Svečiai išėjo — išsiimi megztinį iš spintos.',
          },
          {
            cmd: 'git stash -u',
            text: '— paslepia ir naujus failus, kurių git dar neseka. Paprastas `git stash` palieka juos darbiniame aplanke; failus iš `.gitignore` paslepia tik `git stash -a`.',
            meta: 'Į spintą keliauja ir tai, kas dar neturi savo vietos.',
          },
          {
            cmd: 'git stash -m "…"',
            text: '— paslėpimas su aprašu, kad vėliau rastum jį `git stash list`.',
            meta: 'Raštelis ant siūlų kamuolio: kas tai ir kam.',
          },
        ],
        careful: [
          '`git stash drop` ir `git stash clear` ištrina paslėpimus visam laikui: jų nėra `git reflog`.',
          'Prieš trinant pažiūrėk, kas viduje: `git stash show -p`. Ką tik ištrinta? `git stash drop` parašo paslėpimo hash, o `git stash apply <hash>` dar jį grąžins.',
        ],
        art: 'Ant sienos – žiurkėno prikimštais skruostais portretas. Kol skambina į duris, žmogus ant pirštų galiukų skubiai kemša megztinį ir siūlų kamuolį į viršutinę spintelę, kurios durelės pravertos į mus; ant vidurinės lentynos stovi vienodi puodeliai.',
      },
      branch: {
        title: 'Nauja lentelė',
        line: 'O, čia bus mano kambarys.',
        move: '$ git branch',
        hint: 'šakų sąrašas, dabartinė su *',
        does: {
          text: 'Be argumentų rodo vietines šakas, dabartinę pažymi `*`. Su pavadinimu sukuria naują šaką ant dabartinio komito, bet į ją neperjungia: tam yra `git switch`.',
          meta: 'Pakabini lentelę ant naujo kambario durų, bet lieki ten pat.',
        },
        tip: 'Sukūrėte šaką, o komitai vis tiek eina į senąją? `git branch` — tik lentelė. Norint pereiti, reikia `git switch <šaka>`, o sukurti ir iškart pereiti — `git switch -c <šaka>`.',
        opts: [
          {
            cmd: 'git branch -a',
            text: '— rodo ir nuotolines šakas (`remotes/origin/…`).',
            meta: 'Lentelės ant visų durų, ir kaimynų.',
          },
          { cmd: 'git branch -m <naujas pavadinimas>', text: '— pervadina dabartinę šaką.', meta: 'Perrašai lentelę.' },
          {
            cmd: 'git branch -d <šaka>',
            text: '— ištrina šaką, jei ji jau sulieta; nesulietą ištrina tik `git branch -D <šaka>`.',
            meta: 'Nuimi lentelę nuo kambario, iš kurio viskas jau išnešta.',
          },
        ],
        art: 'Ant sienos – papūgėlės ant laktos portretas. Dvejos atviros durys greta veda į du vienodus kambarius su tokiu pačiu foteliu ir langu; takelis ant grindų išsišakoja į abejas duris. Prie kairiųjų durų sena lentelė; žmogus kabina prie dešiniųjų naują geltoną lentelę.',
      },
      switch: {
        title: 'Naujas kambarys',
        line: 'Laikas persikraustyti į kitą kambarį',
        move: '$ git switch <šaka>',
        hint: 'pereiti į kitą šaką',
        does: {
          text: 'Perjungia į kitą šaką: darbinis aplankas ir indeksas tampa tokie, kaip jos paskutiniame komite. Nekomituoti pakeitimai keliauja kartu; jei jie kertasi su tos šakos failais, git sustoja ir prašo juos komituoti arba paslėpti (`git stash`).',
          meta: 'Takeliu eini į kitą kambarį, ir tai, ką laikai rankose, keliauja kartu.',
        },
        tip: '`git switch` perėmė dalį senojo `git checkout`, kuris moka ir perjungti šakas, ir atkurti failus.',
        opts: [
          {
            cmd: 'git switch -c <šaka>',
            text: '— sukuria naują šaką ir iškart į ją perjungia.',
            meta: 'Pakabini lentelę ir įeini.',
          },
          { cmd: 'git switch -', text: '— grįžta į ankstesnę šaką.', meta: 'Atgal į ankstesnį kambarį.' },
          {
            cmd: 'git switch --detach <komitas>',
            text: '— pereina į komitą be šakos (detached HEAD), kad apsižiūrėtum; naujus komitus čia lengva pamesti.',
            meta: 'Žvilgteli į kambarį iš senos nuotraukos, bet gyventi ten neverta.',
          },
        ],
        careful: [
          '`git switch --discard-changes <šaka>` ir `git switch -f <šaka>` išmeta nekomituotus pakeitimus visam laikui: jų nėra nei istorijoje, nei `git reflog`.',
          'Be šių parinkčių git pats sustoja, jei pakeitimai trukdo. Jei gaila išmesti, pirma komituok arba `git stash`.',
        ],
        art: 'Ant sienos – papūgėlės portretas: iš dviejų laktų ji tupi ant viršutinės, apatinė tuščia. Dvejos atviros durys greta veda į du vienodus kambarius; takelis ant grindų išsišakoja į abejas duris; dešiniosios durys geltonos. Žmogus plačiu žingsniu eina nuo kairiųjų durų į dešinįjį kambarį, pėdsakai ant takelio veda iš kairiosios šakos į dešiniąją.',
      },
      clone: {
        title: 'Butas su baldais',
        art: 'Žmogus su lagaminais, ant vieno lipdukas su lempute, stovi prie plačiai atvertų durų. Bute jau stovi ankstesnių nuomininkų fotelis, ant jo segtuvas su senomis sąskaitomis, o ant sienos kabo dviejų vienodų kačiukų portretas. Prie durų nauja lentelė su vardu, o senoji krenta.',
        line: 'Čia kažkas gyveno, o dabar gyvensiu aš.',
        move: '$ git clone <url>',
        hint: 'saugyklos kopija su visa istorija',
        does: {
          text: 'Nukopijuoja nuotolinę saugyklą į naują aplanką: visą istoriją ir šakas (kaip `origin/…`), ir persijungia į pagrindinę šaką. git įsimena adresą vardu `origin`, todėl vėliau veikia `git fetch`, `git pull` ir `git push`.',
          meta: 'Įsikrauštai į nuomojamą butą su baldais: viskas, ką paliko ankstesni nuomininkai, vietoje, net segtuvas su senomis sąskaitomis.',
        },
        tip: 'Projekto dar niekur nėra? Tada ne clone, o `git init`: ji sukuria tuščią saugyklą dabartiniame aplanke. O fork – ne git komanda, o mygtukas GitHub: svetimos saugyklos kopija tavo paskyroje, kurią paskui klonuoji.',
        opts: [
          {
            cmd: 'git clone <url> <aplankas>',
            text: '— kopijuoja į aplanką tavo pasirinktu pavadinimu, o ne saugyklos pavadinimu.',
            meta: 'Pats renkiesi, ką užrašyti ant naujo buto durų.',
          },
          {
            cmd: 'git clone -b <šaka> <url>',
            text: '— iškart persijungia į nurodytą šaką vietoj pagrindinės.',
            meta: 'Įeini iškart į reikiamą kambarį.',
          },
          {
            cmd: 'git clone --depth 1 <url>',
            text: '— tik paskutinis commit ir tik viena šaka; greitai, bet be istorijos.',
            meta: 'Butas su baldais, bet be segtuvo su senomis sąskaitomis.',
          },
        ],
      },
      status: {
        title: 'Trys krūvelės',
        art: 'Ant sienos katino su didinamuoju stiklu portretas. Žmogus ramiai žiūri į tris drabužių krūveles: iš krepšio su ratukais kyšo kojinė, rankovė ir rankšluostis, ant grindų guli dėvėti drabužiai, o šalia sulankstyti nauji marškiniai su didele parduotuvės etikete.',
        line: 'Ką čia turime? Patikrinkime.',
        move: '$ git status',
        hint: 'kas pasikeitė ir kas pateks į komitą',
        does: {
          text: 'Rodo darbinio aplanko ir indekso būseną: kurie pakeitimai jau paruošti commit (staged), kurie pakeisti, bet dar neparuošti, ir kurių failų git neseka (untracked). Nieko nekeičia.',
          meta: 'Išdėlioji daiktus į tris krūveles ir žiūri, kas kur.',
        },
        tip: 'Paleisk prieš kiekvieną `git add` ir `git commit`: taip į commit nepateks nieko nereikalingo.',
        opts: [
          {
            cmd: 'git status -s',
            text: '— viena eilutė vienam failui; kairysis stulpelis – indeksas, dešinysis – darbinis aplankas (`M` pakeistas, `A` pridėtas, `??` untracked).',
            meta: 'Ta pati apžvalga, viena eilutė vienam daiktui.',
          },
          {
            cmd: 'git status --ignored',
            text: '— rodo ir failus, kuriuos slepia `.gitignore`.',
            meta: 'Pažvelgi ir ten, kur paprastai nežiūri.',
          },
        ],
      },
      add: {
        title: 'Į krepšį',
        art: 'Ant sienos portretas katino, miegančio krepšyje. Žmogus deda mėlyną daiktų gniužulą į krepšį su ratukais, kuriame jau guli kojinė, rankovė ir rankšluostis; ant grindų dar guli megztinis ir kojinė, nepridėti.',
        line: 'Susitvarkyk kambarį, prašau.',
        move: '$ git add .',
        hint: 'indeksuojame visus aplanko pakeitimus',
        does: {
          text: 'Prideda dabartinę failo būseną į indeksą (staged): būtent tai pateks į kitą commit. Naują failą po `git add` git pradeda sekti.',
          meta: 'Dedi daiktus į krepšį, kad paskui supakuotum į dėžę.',
        },
        tip: 'Pakeitei failą po `git add`? Pridėk dar kartą: indekse yra būsena, kokia buvo pridedant. O po suliejimo konflikto būtent `git add <failas>` pažymi failą kaip išspręstą.',
        opts: [
          {
            cmd: 'git add <failas>',
            text: '— prideda vieną failą (arba aplanką).',
            meta: 'Vienas daiktas į krepšį.',
          },
          {
            cmd: 'git add -p',
            text: '— rodo pakeitimus gabalais (hunks) ir klausia apie kiekvieną; naujų (untracked) failų nesiūlo.',
            meta: 'Perrenki krūvą ir į krepšį dedi tik tai, ko reikia.',
          },
        ],
      },
      commit: {
        title: 'Užrašyta dėžė',
        art: 'Palėpė. Dėžių krūva, ant kiekvienos lipdukas su piešinėliu: apačioje eglutė, aukščiau eglutės žaisliukas. Žmogus klijuoja lipduką su nameliu ant naujos geltonos dėžės viršuje. Šalia stovi tuščias krepšys su ratukais, o prie krūvos atremtas senas voverės su kankorėžiu portretas.',
        line: 'Kas toje dėžėje?',
        move: '$ git commit -m "…"',
        hint: 'aprašas iškart, be redaktoriaus',
        does: {
          text: 'Išsaugo indekso turinį kaip naują commit dabartinės šakos istorijoje: su autoriumi, data ir aprašu. Darbinis aplankas nesikeičia; commit lieka vietinis, kol nepadarai `git push`.',
          meta: 'Supakuoji daiktus į dėžę, užrašai ją ir neši į palėpę.',
        },
        tip: 'Vienas commit – viena mintis; apraše rašyk „kodėl“, o ne tik „ką“.',
        opts: [
          {
            cmd: 'git commit -a',
            text: '— pirmiausia pats prideda pakeitimus sekamuose failuose (pakeistuose ir ištrintuose), bet ne naujus failus. Paprastai rašoma kartu su aprašu: `git commit -am "…"`.',
            meta: 'Pažįstama – į palėpę, nauja lieka.',
          },
          {
            cmd: 'git commit --amend',
            text: '— pakeičia paskutinį commit nauju (su dabartiniu indeksu ir (arba) nauju aprašu). Nedaryk to su commit, kuris jau išsiųstas per `git push`.',
            meta: 'Perklijuoji lipduką ant dėžės iš palėpės, kol jos dar neišsiuntė.',
          },
        ],
      },
      log: {
        title: 'Šeimos albumas',
        art: 'Atverstas šeimos albumas žaliu viršeliu. Keturios nuotraukos nuo seniausios: namelis su medžiu, vėžlys, du žmonės greta, jūra ir saulė; po kiekviena neįskaitomas parašas ir data, nuo 09.11.1996 iki 15.07.2007.',
        line: 'Ar norite pažiūrėti albumą?',
        move: '$ git log',
        hint: 'komitų istorija, nuo naujausio',
        does: {
          text: 'Rodo dabartinės šakos commit istoriją nuo naujausio: hash, autorius, data, aprašas.',
          meta: 'Verti albumą nuo paskutinės nuotraukos atgal.',
        },
        tip: 'Ilgas sąrašas atsidaro puslapiuoklėje (pager): `q` – išeiti, `/` – paieška.',
        opts: [
          {
            cmd: 'git log --oneline',
            text: '— sutrumpintas hash ir pirma aprašo eilutė.',
            meta: 'Tik parašai po nuotraukomis.',
          },
          {
            cmd: 'git log --graph',
            text: '— linijomis piešia šakas ir suliejimus.',
            meta: 'Giminės medis vietoj nuotraukų krūvos.',
          },
          {
            cmd: 'git log -p',
            text: '— rodo kiekvieno commit pakeitimus.',
            meta: 'Po kiekviena nuotrauka – kas tiksliai pasikeitė.',
          },
          {
            cmd: 'git log -- <failas>',
            text: '— tik commit, kurie keitė šį failą.',
            meta: 'Visos vieno žmogaus nuotraukos.',
          },
        ],
      },
      diff: {
        title: 'Rask skirtumus',
        art: 'Žmogus kambaryje laiko buto planą ir lygina jį su tuo, ką mato. Plane yra apvalus stalas, o kambaryje iš jo liko tik kontūras ant grindų; plane toršeras stovi prie fotelio, o kambaryje – kitame gale; senas fotelis tas pats. Ant sienos portretas chameleono, kuris laiko savo nuotrauką, kur jis kitos spalvos, o tarp jų ženklas „nelygu“.',
        line: 'Rask tris skirtumus',
        move: '$ git diff',
        hint: 'pasikeitė, bet dar neindeksuota',
        does: {
          text: 'Rodo eilutė po eilutės, kas pasikeitė: `-` – pašalinta eilutė, `+` – pridėta. Be parinkčių lygina darbinį aplanką su indeksu, t. y. rodo pakeitimus, dar nepridėtus per `git add`; naujų (untracked) failų nerodo.',
          meta: 'Lygini „kaip buvo“ ir „kaip yra“ iki mažiausios smulkmenos.',
        },
        tip: 'Po `git add` paprastas `git diff` tuščias, bet pakeitimai niekur nedingo: jie jau indekse, juos rodo `git diff --staged`.',
        opts: [
          {
            cmd: 'git diff --staged',
            text: '— indeksas palyginti su paskutiniu commit, t. y. tai, kas pateks į kitą commit.',
            meta: 'Pažvelgi į krepšį, prieš nešdamas jį į palėpę.',
          },
          {
            cmd: 'git diff HEAD',
            text: '— visi pakeitimai palyginti su paskutiniu commit, pridėti ir nepridėti.',
            meta: 'Lygini visą kambarį su paskutine albumo nuotrauka.',
          },
          {
            cmd: 'git diff --stat',
            text: '— tik kurie failai pakeisti ir kiek eilučių.',
            meta: 'Skirtumų sąrašas be smulkmenų.',
          },
        ],
      },
      merge: {
        title: 'Naujas kaimynas',
        line: 'Pabandykime gyventi kartu',
        move: '$ git merge <šaka>',
        hint: 'sulieti šaką į dabartinę',
        does: {
          text: 'Prijungia kitos šakos komitus prie dabartinės šakos. Jei dabartinė šaka nuo to laiko neturi naujų komitų, git ją tiesiog pastumia į priekį (fast-forward); kitaip sukuria suliejimo komitą su dviem tėvais. Jei abi šakos pakeitė tas pačias eilutes, git sustoja ties konfliktu ir laukia, kol jis bus išspręstas.',
          meta: 'Pas tave atsikrausto kažkas su savo dėžėmis; kur du vienodi virduliai nori stovėti toje pačioje vietoje, sprendi tu.',
        },
        tip: 'Konfliktas? Pataisyk pažymėtus failus, tada `git add <failas>` ir `git commit`. Persigalvojai? `git merge --abort` grąžina viską, kaip buvo prieš suliejimą.',
        opts: [
          {
            cmd: 'git merge --no-ff <šaka>',
            text: '— visada suliejimo komitas, net kai užtektų fast-forward: istorijoje matyti, kad šaka buvo atskira.',
            meta: 'Matai, su kokiais daiktais atsikraustė kaimynas.',
          },
          {
            cmd: 'git merge --squash <šaka>',
            text: '— perkelia visus šakos pakeitimus į indeksą kaip vieną pakeitimą, be suliejimo komito ir be ryšio su šaka; toliau `git commit`.',
            meta: 'Išpakuoji visas kaimyno dėžes ir sudedi daiktus į vieną savo.',
          },
          {
            cmd: 'git merge --abort',
            text: '— konflikto metu grąžina būseną, kokia buvo prieš suliejimą.',
            meta: 'Kaimynas išsikrausto su savo daiktais.',
          },
        ],
        art: 'Kairėje pro atviras lauko duris įeina besišypsantis žmogus su dėže, ant kurios geltonas lipdukas; kelios tokios dėžės jau stovi kambaryje. Dešinėje šeimininkas, ranką prie smakro, žiūri į stalviršį, kur greta stovi du vienodi virduliai: jo šviesus ir atvykėlio geltonas, tarp jų klaustukas. Lentynoje virš stalviršio jo paties dėžės be lipdukų. Ant sienos dviejų katinų, pilko ir šviesaus, uostančių vienas kitą nosimis, portretas.',
      },
      fetch: {
        title: 'Ką mums padovanojo?',
        line: 'Gal greitai pažiūrime dovanas po eglute?',
        move: '$ git fetch',
        hint: 'kas naujo serveryje, pas tave niekas nesikeičia',
        does: {
          text: 'Atsisiunčia iš nuotolinės saugyklos naujus komitus ir šakas ir atnaujina `origin/…`. Tavo šakos ir darbinis aplankas nesikeičia: naujienas pažiūrėsi su `git log origin/main`, o prijungsi su `git merge` arba `git rebase`.',
          meta: 'Dovanos jau po eglute: jas galima pakratyti ir perskaityti užrašus, bet išpakuoti dar per anksti.',
        },
        tip: 'Saugi komanda: ją galima paleisti bet kada, kad sužinotum, kas pasikeitė serveryje.',
        opts: [
          {
            cmd: 'git fetch --prune',
            text: '— pašalina vietinius `origin/…`, kurių serveryje jau nebėra.',
            meta: 'Išmeti užrašus nuo dovanų, kurias jau kažkas pasiėmė.',
          },
          {
            cmd: 'git fetch --all',
            text: '— iš visų nuotolinių saugyklų, ne tik iš `origin`.',
            meta: 'Patikrini visas vietas, kur gali būti paslėptos dovanos.',
          },
          {
            cmd: 'git fetch origin <šaka>',
            text: '— tik viena šaka.',
            meta: 'Pakratai tik vieną dovaną.',
          },
        ],
        art: 'Dešinėje eglutė su žvaigžde, po ja supakuotos dovanos oranžiniais kaspinais. Žmogus, priklaupęs ant vieno kelio prie eglutės, laiko vieną dovaną prie ausies ir ją purto, kad atspėtų, kas viduje, bet neišpakuoja. Ant sienos šuns su dovana dantyse portretas.',
      },
      pull: {
        title: 'Išpakuoti dovaną',
        line: 'O, tokios dar neturėjau',
        move: '$ git pull',
        hint: 'parsisiųsti naujienas iš serverio ir iškart sulieti',
        does: {
          text: 'Tai `git fetch` ir iškart gauto turinio suliejimas su dabartine šaka. Jei istorijos išsiskyrė (nauji komitai yra ir serveryje, ir pas tave), git 2.43 sustoja ir prašo pasirinkti: suliejimą arba `git pull --rebase` (nustatymas `pull.rebase`); jei užtenka tiesiog prasukti į priekį, viskas praeina be klausimų.',
          meta: 'Dovaną ne tik atnešė: tu iškart ją išpakuoji, ir ji užima savo vietą tavo namuose.',
        },
        tip: 'Prieš `git pull` komituok arba paslėpk savo pakeitimus (`git stash`): taip bus lengviau susigaudyti, jei kils konfliktas.',
        opts: [
          {
            cmd: 'git pull --rebase',
            text: '— po fetch perkelia tavo vietinius komitus ant gautųjų; istorija lieka tiesi.',
            meta: 'Svetimos dovanos į krūvą patenka pirmos, o tavo — viršuje.',
          },
          {
            cmd: 'git pull --ff-only',
            text: '— atnaujina tik tada, kai užtenka prasukti į priekį; kitaip sustoja ir nieko nekeičia.',
            meta: 'Išpakuoji, tik jei tikrai turi vietos.',
          },
          {
            cmd: 'git pull origin <šaka>',
            text: '— iš konkrečios nuotolinės šakos.',
            meta: 'Išpakuoji tik dovaną nuo artimo žmogaus.',
          },
        ],
        art: 'Kairėje savų supakuotų daiktų krūva: bespalvės dėžės, ant kiekvienos lentelė su piešinėliu (namelis, knyga, puodelis). Šalia stovi dovanos oranžiniais kaspinais; ant kelių klūpantis žmogus laiko priešais save megztinį, ką tik ištrauktą iš atidarytos dėžės, per dėžės kraštą kabo kaspinas, šalia suglamžytas popierius. Dešinėje eglutė. Ant sienos kačiuko, traukiančio oranžinį kaspiną nuo dovanos, portretas.',
      },
      push: {
        title: 'Pilna lentyna',
        line: 'Laikas siųsti dovanas',
        move: '$ git push',
        hint: 'išsiųsti savo komitus į serverį',
        does: {
          text: 'Išsiunčia tavo komitus į nuotolinę šaką. Jei ten yra komitų, kurių tu neturi, git atmeta push (rejected): pirma `git pull`, tada vėl `git push`.',
          meta: 'Neši savo siuntinį į paštą, kur jį visi pamatys.',
        },
        tip: 'Po push komitus mato visi: neperrašinėk jų (`git commit --amend`, `git rebase`), nes tada teks siųsti per jėgą.',
        opts: [
          {
            cmd: 'git push -u origin <šaka>',
            text: '— pirmas naujos šakos push: įsimena, su kuria nuotoline šaka susieta tavoji, ir toliau užtenka `git push`.',
            meta: 'Paštas įsimena tavo adresą.',
          },
          {
            cmd: 'git push --force-with-lease',
            text: '— perrašo nuotolinę šaką tik tada, jei ten nėra svetimų naujų komitų.',
            meta: 'Pakeiti savo siuntinį, kai įsitikini, kad šalia niekas nepadėjo savojo.',
          },
          {
            cmd: 'git push origin --delete <šaka>',
            text: '— ištrina šaką serveryje.',
            meta: 'Nuimi savo pavardę nuo pašto dėžutės.',
          },
        ],
        careful: [
          '`git push --force` perrašo nuotolinę šaką: svetimi komitai, kurių tu neturi, dingsta iš serverio.',
          'Jei tikrai reikia perrašyti, naudok `git push --force-with-lease` ir niekada nedaryk to bendroje šakoje (`main`).',
        ],
        art: 'Bendra lentyna pašte pilna svetimų siuntinių su adresais ir pašto ženklais, virš jos lentelė su voku. Žmogus kairėje iš visų jėgų stumia į pilną lentyną savo siuntinį oranžiniu kaspinu, o kitame gale svetimas siuntinys krenta ant grindų. Ant sienos pašto balandžio su laišku portretas.',
      },
      show: {
        title: 'Viena nuotrauka',
        line: 'Ta diena, kai',
        move: '$ git show <komitas>',
        hint: 'vienas komitas visas',
        does: {
          text: 'Rodo vieną objektą: komito autorių, datą, aprašą ir pakeitimus (diff); užtenka pirmųjų 7 hash simbolių. Be argumentų rodo paskutinį komitą (`HEAD`). Nieko nekeičia.',
          meta: 'Iš šeimos albumo išsiimi vieną nuotrauką ir apžiūri ją iš arti, kartu su data.',
        },
        tip: '`git log` — kad rastum komitą, `git show <hash>` — kad jį apžiūrėtum.',
        opts: [
          {
            cmd: 'git show <komitas>:<failas>',
            text: '— failas toks, koks buvo tame komite.',
            meta: 'Kaip kambarys atrodė tą dieną.',
          },
          {
            cmd: 'git show --stat <komitas>',
            text: '— tik pakeistų failų sąrašas ir pakeistų eilučių skaičius.',
            meta: 'Tik užrašas po nuotrauka.',
          },
        ],
        art: 'Ant stalo atverstas šeimos albumas žaliu viršeliu; vienoje vietoje liko tik kampučiai ir data 25.12.2026, nuotraukos nėra. Žmogus stovi šalia ir iš arti apžiūri tą nuotrauką: du žmonės abipus eglutės, apačioje ta pati data. Ant sienos šuns su žalia nugalėtojo rozete, kaip šunų parodoje, portretas.',
      },
      revert: {
        title: 'Senieji tapetai',
        line: 'Ankstesni buvo geresni. Grąžinkim juos',
        move: '$ git revert <komitas>',
        hint: 'naujas komitas, atšaukiantis seną',
        does: {
          text: 'Sukuria naują komitą, kuris atšaukia nurodyto komito pakeitimus; atsidaro redaktorius aprašui. Istorija neperrašoma, todėl tai saugus būdas atšaukti tai, kas jau išsiųsta per `git push`.',
          meta: 'Naujų tapetų nenuplėši: senąjį raštą užklijuoji ant jų nauju sluoksniu.',
        },
        tip: 'Komitą, kurio dar niekas nematė, galima pašalinti ir per `git reset`; tą, kuris jau serveryje, tik per `git revert`. Suliejimo komitą atšaukia `git revert -m 1 <suliejimo-komitas>`, kur 1 — šakos, į kurią grįžti, numeris (paprastai pagrindinės).',
        opts: [
          {
            cmd: 'git revert --no-edit <komitas>',
            text: '— tas pats, bet su numatytuoju aprašu „Revert "…"“, be redaktoriaus.',
            meta: 'Klijuoji iškart, nepasimatavęs.',
          },
          {
            cmd: 'git revert HEAD',
            text: '— atšaukia paskutinį komitą.',
            meta: 'Perklijuoji tik paskutinę juostą.',
          },
          {
            cmd: 'git revert --no-commit <komitas>',
            text: '— atšaukia pakeitimus darbiniame aplanke ir indekse be komito, kad keli atšaukimai tilptų į vieną komitą.',
            meta: 'Nuimi kelias juostas, o perklijuoji iš karto.',
          },
        ],
        art: 'Kairėje sienos pusėje seni tapetai banguotomis juostomis, dešinėje nauji taškuoti. Žmogus ant taburetės vėl klijuoja seną banguotą raštą ant naujų tapetų: viena geltona juosta jau priklijuota, kitos apatinis galas dar rankoje; kraštas rodo, kad nauji tapetai liko apačioje. Ant grindų kibiras klijų su teptuku. Ant sienos geltono krabo su rodykle į kairę portretas.',
      },
      'cherry-pick': {
        title: 'Močiutės receptas',
        line: 'O, mano mėgstamiausias pyragas. Reikia ir sau nusirašyti',
        move: '$ git cherry-pick <komitas>',
        hint: 'vieno komito kopija dabartinėje šakoje',
        does: {
          text: 'Paima vieno komito pakeitimus iš kitos šakos ir pritaiko juos dabartinėje kaip naują komitą su nauju hash. Originalas lieka savo šakoje.',
          meta: 'Nusirašai vieną receptą iš močiutės sąsiuvinio į savo; močiutė jį taip pat turi.',
        },
        tip: 'Konfliktas? Pataisyk, `git add <failas>`, tada `git cherry-pick --continue`. Persigalvojai? `git cherry-pick --abort`.',
        opts: [
          {
            cmd: 'git cherry-pick <nuo>..<iki>',
            text: '— keli komitai iš eilės, be paties `<nuo>`.',
            meta: 'Keli receptai iš eilės.',
          },
          {
            cmd: 'git cherry-pick -x <komitas>',
            text: '— prideda prie aprašo eilutę „(cherry picked from commit …)“.',
            meta: 'Po receptu pasirašai: „iš močiutės“.',
          },
          {
            cmd: 'git cherry-pick -n <komitas>',
            text: '— perkelia komito pakeitimus į darbinį aplanką ir indeksą be komito, kad galėtum juos pataisyti arba sujungti kelis į vieną komitą.',
            meta: 'Nusirašai receptą, o savo pakeitimus pridedi prieš perrašant jį švariai.',
          },
        ],
        art: 'Ant stalo du atversti receptų sąsiuviniai. Kairėje didelis senas močiutės, nutrintu viršeliu ir kaspinu-žymekliu: viename puslapyje puodas, kitame vyšnių pyragas. Dešinėje mažesnis sąsiuvinis su spirale ir geltonu viršeliu: viename puslapyje dubenėlis su lazdelėmis, kitame tas pats pyragas, dar nebaigtas piešti. Žmogus stovi priešais stalą, pasilenkęs prie savo sąsiuvinio, ir su rašikliu rankoje perpiešia pyragą. Ant sienos strazdo su dviem geltonomis vyšniomis snape portretas.',
      },
      reset: {
        title: 'Į eglutę ar į šiukšliadėžę',
        line: 'Šitą — ant eglutės, šitą — į šiukšles. Svarbiausia nesupainioti',
        move: '$ git reset HEAD~1',
        hint: 'nuimti paskutinį komitą, pakeitimai lieka failuose',
        does: {
          text: 'Perkelia dabartinę šaką į kitą komitą (pvz., `HEAD~1` — vienu atgal). Kas nutiks nuimtų komitų pakeitimams, priklauso nuo režimo: su `git reset --soft` jie lieka indekse, su paprastu `git reset` — tik darbiniame aplanke, su `git reset --hard` dingsta.',
          meta: 'Išpakuoji dėžę iš palėpės: kažkas keliauja ant eglutės, kažkas į šiukšliadėžę.',
        },
        tip: 'Su failu vietoj komito `git reset <failas>` tiesiog išima failą iš indekso, kaip `git restore --staged <failas>`.',
        opts: [
          {
            cmd: 'git reset --soft HEAD~1',
            text: '— nuima paskutinį komitą; pakeitimai lieka indekse, paruošti naujam komitui.',
            meta: 'Žaisliukas lieka dėžėje, po ranka.',
          },
          {
            cmd: 'git reset --hard HEAD~1',
            text: '— nuima komitą ir ištrina pakeitimus indekse ir darbiniame aplanke.',
            meta: 'Žaisliukas skrenda į šiukšliadėžę.',
          },
        ],
        careful: [
          '`git reset --hard` ištrina nekomituotus pakeitimus visam laikui.',
          'Nuimtus komitus dar rasi `git reflog`, kol git jų neišvalė. Komitų, kurie jau serveryje, nenuimk per `git reset`: jiems yra `git revert`.',
        ],
        art: 'Namuose papuošta eglutė, po ja atvira geltona dėžė iš palėpės. Žmogus stovi tarp šiukšliadėžės ir eglutės: viena ranka kabina sveiką žaisliuką ant eglutės, kita meta į šiukšliadėžę sudužusį. Ant sienos auksinės žuvelės akvariume portretas.',
      },
      reflog: {
        title: 'Rutuliukų sąrašas',
        line: 'Mažieji rutuliukai — buvo 10, dabar 8',
        move: '$ git reflog',
        hint: 'kur buvo HEAD, žingsnis po žingsnio',
        does: {
          text: 'Rodo vietinį žurnalą visų vietų, kur buvo `HEAD`, nuo naujausio įrašo: komitai, šakų perjungimai, `git reset`, `git rebase`. Taip randamas komitas, dingęs iš `git log`.',
          meta: 'Sąraše užrašytas kiekvienas pokytis: buvo 10 rutuliukų, liko 8, ir matyti, kada du dingo.',
        },
        tip: 'reflog yra vietinis ir laikinas: serveryje jo nėra, o senus įrašus git laikui bėgant ištrina (pagal nutylėjimą po 90 dienų, įrašus apie nepasiekiamus komitus — po 30).',
        opts: [
          {
            cmd: 'git reflog show <šaka>',
            text: '— vienos šakos žurnalas.',
            meta: 'Tik eilutė apie mažuosius rutuliukus.',
          },
          {
            cmd: 'git branch <pavadinimas> HEAD@{2}',
            text: '— grąžina pamestą komitą kaip naują šaką.',
            meta: 'Iš sąrašo sužinai, kada viskas dar buvo savo vietose.',
          },
        ],
        art: 'Namuose papuošta eglutė, kampe šiukšliadėžė su sudužusiu žaisliuku. Žmogus prie eglutės skaito sąrašą ant žalios planšetės: kiekvienoje eilutėje mažas eglutės žaisliukas ir skaičiavimo brūkšneliai, viena eilutė apvesta; žmogus žvilgčioja į eglutę ir skaičiuoja. Ant sienos žiurkės ant šiukšliadėžės krašto portretas.',
      },
      rebase: {
        title: 'Naujas pagrindas',
        line: 'Sudedam gražiai, kad nenukristų!',
        move: '$ git rebase main',
        hint: 'tavo komitai ant šviežio main',
        does: {
          text: 'Perkelia dabartinės šakos komitus taip, lyg ji būtų pradėta iš kitos vietos (pvz., nuo naujesnio `main`): kiekvienas komitas pritaikomas iš naujo ir gauna naują hash. Istorija tampa tiesi, be suliejimo komitų.',
          meta: 'Po tavo dėžėmis pakišo naują, o tu vėl sudedi savąsias viršuje, atsargiai, kad nenukristų.',
        },
        tip: 'Konfliktas? Pataisyk, `git add <failas>`, tada `git rebase --continue`. Persigalvojai? `git rebase --abort`.',
        opts: [
          {
            cmd: 'git rebase -i HEAD~3',
            text: '— atidaro trijų paskutinių komitų sąrašą: sujungti, pervadinti, išmesti, sukeisti tvarką.',
            meta: 'Perdėlioji tris viršutines dėžes.',
          },
          {
            cmd: 'git rebase --abort',
            text: '— nutraukia rebase pusiaukelėje.',
            meta: 'Sustatai dėžes, kaip stovėjo.',
          },
        ],
        careful: [
          'Rebase perrašo komitus: jei jie jau išsiųsti (`git push`), tavo istorija išsiskirs su kitų istorija.',
          'Daryk rebase tik savo, dar neišsiųstų komitų. Jei kas nepavyko, senąją būseną rasi `git reflog`.',
        ],
        art: 'Palėpė. Dėžių su lentelėmis krūva: apačioje dėžė su knygomis, virš jos naujesnė dėžė su Helovino moliūgu, o viršuje žmogus atsargiai stato dvi geltonas dėžes, su gimtadienio tortu ir su meškiuku, ir prilaiko jas, kad nenukristų. Ant sienos pilko katino, sėdinčio ant dėžių, portretas.',
      },
      blame: {
        title: 'Sąrašas ant šaldytuvo',
        line: 'Kas atneša vynuogių?',
        move: '$ git blame <failas>',
        hint: 'kas ir kada pakeitė kiekvieną eilutę',
        does: {
          text: 'Kiekvienai failo eilutei rodo, kuriame komite, kada ir kas ją paskutinis pakeitė. Nieko nekeičia.',
          meta: 'Prie kiekvienos vakarienės sąrašo eilutės — veidelis to, kas ją prirašė: žinai, ko klausti.',
        },
        tip: 'Radai komitą? Pažiūrėk jį visą: `git show <hash>`. „Blame“ čia ne apie kaltę, o apie tai, ko paklausti dėl eilutės.',
        opts: [
          {
            cmd: 'git blame -L 10,20 <failas>',
            text: '— tik eilutės nuo 10-os iki 20-os.',
            meta: 'Žiūri tik į eilutę su vynuogėmis.',
          },
          {
            cmd: 'git blame -w <failas>',
            text: '— nekreipia dėmesio į tarpų pakeitimus.',
            meta: 'Eilutė, kurioje pataisyta tik įtrauka, lieka pirmojo autoriaus.',
          },
          {
            cmd: 'git blame <komitas> -- <failas>',
            text: '— failas tokios būsenos, kokia buvo nurodytame komite.',
            meta: 'Sąrašas, koks buvo vakar.',
          },
        ],
        art: 'Ant šaldytuvo po žaliu magnetu kabo sąrašas, kas ką atsineš vakarienei: kiekviena eilutė prasideda prekės piešinėliu, parašyta vis kita rašysena ir baigiasi veideliu to, kas ją prirašė; tie patys veideliai kabo kaip nuotraukų magnetai ant šaldiklio durelių. Žmogus laiko didinamąjį stiklą virš žalių vynuogių eilutės galo, o stikle matyti veidelis su kaspinėliu. Prie kojų tuščias pirkinių krepšys. Ant sienos šuns su žalia kojine dantyse portretas.',
      },
      bisect: {
        title: 'Perdegusi lemputė',
        line: 'A, štai kur problema',
        move: '$ git bisect start',
        hint: 'pradėti ieškoti komito, kuris sugadino',
        does: {
          text: 'Ieško komito, kuris kažką sugadino, dalydamas pusiau: tu pasakai, kur dar veikė (`git bisect good <komitas>`) ir kur jau ne (`git bisect bad`), git persijungia į komitą per vidurį, tu patikrini ir pasakai rezultatą. Po kelių žingsnių kaltas komitas surastas.',
          meta: 'Girlianda nešviečia: patikrini pusę, tada pusę to, kas liko, ir taip iki tos vienos lemputės.',
        },
        tip: 'Pabaigoje `git bisect reset` grąžina į šaką, nuo kurios prasidėjo paieška.',
        opts: [
          {
            cmd: 'git bisect run <komanda>',
            text: '— git pats paleidžia komandą kiekviename žingsnyje ir skaito jos išėjimo kodą: 0 — „geras“, 125 — „praleisti“, nuo 1 iki 124 ir 126–127 — „blogas“, daugiau nei 127 — nutraukti paiešką.',
            meta: 'Lemputes tikrini testeriu, o ne iš akies.',
          },
          {
            cmd: 'git bisect skip',
            text: '— šio komito patikrinti negalima (pvz., nesikompiliuoja): git ima gretimą.',
            meta: 'Lemputė neįsisuka — imi gretimą.',
          },
          {
            cmd: 'git bisect reset',
            text: '— baigia paiešką ir grąžina į pradinę šaką.',
            meta: 'Pakabini girliandą atgal.',
          },
        ],
        art: 'Per sieną ant dviejų vinių kabo girlianda, ir visa nešviečia. Po kairiąja puse ir po kitu ketvirčiu skliaustai su varnelėmis: tos dalys patikrintos, ties ribomis žali skalbinių segtukai. Žmogus išsuko lemputę iš likusios dalies ir laiko ją prieš šviesą: stiklas tamsus, siūlelis nutrūkęs; kitoje rankoje atsarginė lemputė. Ant sienos jūrų kiaulytės, graužiančios girliandos laidą, portretas.',
      },
      tag: {
        title: 'Etiketė ant stiklainio',
        line: 'Kad būtų lengviau rasti',
        move: '$ git tag v1.0',
        hint: 'žymė ant dabartinio komito',
        does: {
          text: 'Uždeda ant komito pastovią žymę, dažniausiai versijos numerį (`v1.0`). Kitaip nei šaka, žymė (tag) nejuda su naujais komitais: ji visada rodo į tą patį komitą.',
          meta: 'Tarp vienodų uogienės stiklainių užklijuoji etiketę ant mėgstamiausios, kad paskui būtų lengviau rasti.',
        },
        tip: 'Paprastas `git push` žymių nesiunčia: reikia `git push origin v1.0` arba `git push --tags`.',
        opts: [
          {
            cmd: 'git tag',
            text: '— žymių sąrašas.',
            meta: 'Peržiūri visus stiklainius su etiketėmis.',
          },
          {
            cmd: 'git tag -a v1.0 -m "…"',
            text: '— anotuota žymė su autoriumi, data ir aprašu, leidimams.',
            meta: 'Etiketė su metais ir parašu, kas virė.',
          },
          {
            cmd: 'git tag -d v1.0',
            text: '— ištrina žymę vietoje; serveryje ji lieka, kol neįvykdai `git push origin --delete v1.0`.',
            meta: 'Nuplėši etiketę nuo savo stiklainio.',
          },
        ],
        art: 'Sandėliuke lentyna, pilna vienodų uogienės stiklainių po lininiais dangteliais; ant dviejų stiklainių šviesios etiketės 2024 ir 2025. Žmogus, priklaupęs prie lentynos, prispaudžia geltoną etiketę 2026 prie naujausio stiklainio apatinėje lentynoje. Šalia geltonų etikečių ritinėlis. Ant sienos šuns su geltonu adreso medalionu ant antkaklio portretas.',
      },
    },
  },
};
