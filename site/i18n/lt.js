// Lithuanian: every text on the site in one file (RSP-85). Keys must match i18n/en.js; check with: node scripts/check-locales.mjs
// Drafted by Claude, native review on the site pending (RSP-89). Status names and creature names stay in English (they live in data/).
// Terminology: "request" in What to test and Traps (testers' language); the formal term in card meanings.
export default {
  // Interface. Functions build texts that contain numbers or names.
  ui: {
    tag: "Originalūs padarai HTTP būsenos kodams įsiminti. Kiekvienas kodas turi savo Responsterį, o kiekvienas jo judesys paaiškina, ką kodas reiškia.",
    tabs: [
      "Kolekcija",
      "Treniruotė",
      "Spąstai"
    ],
    all: "Visi",
    mastered: (a,b)=>`Išmokta ${a} iš ${b}`,
    known: "moku",
    modeArt: "Paveikslėlis → kodas",
    modeCode: "Kodas → padaras",
    modeArtHint: "Matai padarą, renkiesi kodą",
    modeCodeHint: "Matai kodą, ieškai, kas tai",
    modeNerd: "Nerd mode",
    modeNerdHint: "Tik tekstas: skaitai aprašymą, renkiesi kodą",
    modeHard: "Hardcore",
    modeHardHint: "Tik kodas: renkiesi būsenos pavadinimą",
    modes: "Treniruotės režimas",
    qArt: "Koks tai kodas?",
    qCode: "Kuris iš jų?",
    qHard: "Kaip vadinasi ši būsena?",
    hint: "Užuomina",
    hintIs: n=>`Tai ${n}`,
    hintUsed: "Su užuomina: skaičiuojama į rezultatą, bet ne į ✓.",
    score: (r,t,s)=>`${r}/${t} · serija ${s}`,
    ok: "Taip!",
    no: "Ne tas.",
    next: "Toliau",
    mean: "Ką tai reiškia",
    when: "Kur su juo susiduri",
    conf: "Dažnai painiojamas su",
    qa: "Ką testuoti",
    links: "Įrankiai ir daugiau skaitymo",
    traps: "Kodų poros, kurias dažniausiai supainioja. Perskaityk taisyklę ir surūšiuok situacijas.",
    foot: "Responsters · originalūs personažai ir tekstai; būsenų pavadinimai pagal RFC 9110.",
    lang: "Kalba",
    close: "Uždaryti",
    back: "Atgal į kolekciją",
    howto: "Kaip naudotis",
    howtoSteps: [
      "<b>Kolekcija.</b> Paliesk kortelę ir susipažink su padaru: ką reiškia kodas, kur su juo susiduri ir ką testuoti.",
      "<b>Treniruotė.</b> „Paveikslėlis → kodas“, „Kodas → padaras“, „Nerd mode“ (tik tekstas) arba „Hardcore“ (tik kodas). Du teisingi atsakymai iš eilės suteikia kodui ✓.",
      "<b>Spąstai.</b> Kodų poros, kurias painioja: taisyklė ir situacijos rūšiavimui."
    ],
    howtoNote: "Pažanga išsaugoma tik šioje naršyklėje.",
    howtoClose: "Supratau",
  },
  // Status classes 1xx–5xx: name and one-line rule.
  classes: {
    1: { name: "Kiaušiniai", rule: "Dar ritasi: serveris gavo užklausą ir ją apdoroja." },
    2: { name: "Draugai", rule: "Pavyko." },
    3: { name: "Klajokliai", rule: "Tai, ko ieškai, yra kitur." },
    4: { name: "Sargai", rule: "Kliento klaida: pataisyk užklausą." },
    5: { name: "Serverio žvėrys", rule: "Serverio klaida: tai ne tavo kaltė." },
  },
  // Cards: what it means, where you meet it, and the card line in the creature's voice (max ~55 characters).
  cards: {
    102: {
      mean: "Serveris priėmė užklausą ir vis dar ją apdoroja. Atsakymo dar nėra.",
      when: "Ilgos WebDAV operacijos; įprastose API pasitaiko retai.",
      line: "Jau dirbu! Rezultato dar nėra." },
    200: {
      mean: "Užklausa pavyko, atsakyme yra rezultatas.",
      when: "Puslapio ar sąrašo GET, POST, kuris nesukūrė resurso.",
      line: "Ką galiu pasakyti? Viskas puiku!" },
    201: {
      mean: "Sukurtas naujas resursas. Jo adresas yra Location antraštėje.",
      when: "POST /orders sukūrė užsakymą.",
      line: "Visiškai naujas! Pats pastačiau!" },
    204: {
      mean: "Pavyko, bet atsakymas neturi turinio.",
      when: "DELETE arba PUT, kai nėra ką grąžinti.",
      line: "Padaryta! Tik nėra ką parodyti." },
    301: {
      mean: "Resursas persikėlė visam laikui. Klientai ir paieškos sistemos turėtų atnaujinti URL.",
      when: "Persikėlimas į naują domeną arba iš http į https.",
      line: "Persikėliau visam laikui. Naudok naują adresą." },
    302: {
      mean: "Resursas laikinai yra kitur. Pradinis URL lieka teisingas.",
      when: "Nukreipimas po prisijungimo, laikinas akcijos puslapis.",
      line: "Šiuo metu išėjęs. Greit grįšiu." },
    304: {
      mean: "Nuo išsaugojimo talpykloje niekas nepasikeitė. Naudok savo kopiją.",
      when: "Naršyklė išsiuntė If-None-Match arba If-Modified-Since.",
      line: "Nepasikeitė. Pažiūrėk į savo talpyklą." },
    400: {
      mean: "Užklausa netaisyklinga: sintaksė, formatas arba neteisingi duomenys.",
      when: "Sugadintas JSON, trūkstamas privalomas laukas, neteisingi užklausos parametrai, per pusę nutrūkęs užklausos turinys.",
      line: "Kokios nesąmonės! Nesuprantu nė žodžio." },
    401: {
      mean: "Reikia autentifikacijos: prisijungimo duomenų nėra arba jie neteisingi.",
      when: "Nėra Authorization antraštės, pasibaigęs tokenas.",
      line: "Kas tu? Ar mes pažįstami?" },
    403: {
      mean: "Žinoma, kas tu esi, bet neturi teisių.",
      when: "Paprastas naudotojas atidaro administravimo skydelį.",
      line: "A, tai tu? Neįleisiu!" },
    404: {
      mean: "Šiuo adresu nieko nėra.",
      when: "Klaida URL adrese, ištrintas produktas.",
      line: "Čia nieko nėra. Ieškok kitur." },
    405: {
      mean: "Serveris žino šį adresą, bet nepriima šio metodo.",
      when: "DELETE išsiųstas į endpointą, kuris priima tik GET.",
      line: "Ne taip! Keisk metodą." },
    408: {
      mean: "Klientas per ilgai siuntė užklausą, todėl serveris nustojo laukti.",
      when: "Lėtas ryšys, užstrigęs įkėlimas.",
      line: "Pramiegojau. Serveris nustojo laukti." },
    409: {
      mean: "Užklausa prieštarauja dabartinei resurso būsenai.",
      when: "Registruojantis jau naudojamas el. paštas, versijų konfliktas redaguojant.",
      line: "Aš čia buvau pirmas! Atsitrauk!" },
    413: {
      mean: "Užklausos turinys didesnis už leistiną ribą.",
      when: "Per didelio failo įkėlimas.",
      line: "Per daug! Netelpa!" },
    415: {
      mean: "Serveris nepalaiko šio duomenų formato.",
      when: "XML vietoj JSON, neteisingas Content-Type.",
      line: "Fu! To nevalgysiu! Pažiūrėk, ką mėgstu." },
    418: {
      mean: "Juokingas kodas iš RFC 2324: arbatinukas atsisako virti kavą.",
      when: "Velykiniai kiaušiniai API. Puikus bonusas darbo pokalbyje.",
      line: "Aš arbatinukas. Kavos nebus." },
    422: {
      mean: "Užklausa perskaityta, bet duomenys neatitinka validacijos.",
      when: "Tekstas vietoj skaičiaus, neigiamas amžius, „email: banana“.",
      line: "Perskaičiau. Bet amžius -5? Rimtai?" },
    429: {
      mean: "Per daug užklausų per trumpą laiką; suveikė užklausų limitas.",
      when: "Skriptas be pauzių, atsakyme Retry-After antraštė.",
      line: "Stop! Per daug. Leisk atsikvėpti." },
    500: {
      mean: "Serveryje kažkas netikėtai sugedo.",
      when: "Neapdorota išimtis backend kode.",
      line: "Čia ne tu, čia aš." },
    502: {
      mean: "Šliuzas ar proxy perdavė užklausą toliau, bet gavo iš serverio netinkamą atsakymą.",
      when: "Nginx prieš nulūžusį backend.",
      line: "Atėjo sugedęs. Aš tik perduodu!" },
    503: {
      mean: "Serveris laikinai nepasiekiamas: perkrova arba priežiūros darbai.",
      when: "Planuoti priežiūros darbai, perkrautas serveris.",
      line: "Uždaryta remontui. Grįžk vėliau." },
    504: {
      mean: "Šliuzas ar proxy perdavė užklausą toliau, bet taip ir nesulaukė serverio atsakymo.",
      when: "Lėtas backend už nginx arba CDN.",
      line: "Laukiau ir laukiau. Serveris neatsako." },
  },
  // "What to test": short test cases, steps → expected result (RSP-11).
  qa: {
    102: [
      "Paleisk ilgą operaciją (pvz., didelio failo importą ar didelio aplanko kopijavimą) ir lauk nieko nespaudžiant puslapyje → puslapis laukia ir parodo rezultatą, be timeout klaidos.",
      "Kol vyksta ilga operacija, stebėk jos būseną sąsajoje → matyti eiga, o „Atlikta“ atsiranda tik tada, kai operacija tikrai baigiasi.",
    ],
    200: [
      "Išsaugok įrašą su žinomomis reikšmėmis, tada jį atidaryk (arba sąrašą, kuriame jis yra) → kiekvienas laukas rodo būtent tai, kas išsaugota, nieko netrūksta ir nėra nieko nereikalingo.",
      "Atidaryk sąrašą, kuriame dar nieko nėra (pvz., naujos paskyros užsakymai) → draugiškas „Čia kol kas tuščia“ ir būsena 200, o ne klaidos puslapis.",
      "Pateik formą su neteisingais duomenimis ir patikrink Network skirtuką → būsena 4xx, o ne 200 su paslėptu klaidos pranešimu viduje.",
    ],
    201: [
      "Sukurk naują elementą (pvz., komentarą ar užsakymą) ir atidaryk sąrašą → naujas elementas yra ten su būtent tomis reikšmėmis, kurias įvedei.",
      "Užpildyk kūrimo formą ir greitai dukart spustelėk „Pateikti“ → sukuriamas tik vienas elementas.",
      "Sukurk elementą, nukopijuok jo nuorodą ir atidaryk naujame skirtuke → elementas atsidaro.",
    ],
    204: [
      "Ištrink elementą iš sąrašo → jis iš karto dingsta be klaidos pranešimo ir negrįžta atnaujinus puslapį.",
      "Nukopijuok elemento nuorodą, ištrink elementą, tada atidaryk nukopijuotą nuorodą → puslapis „nerasta“ (404), o ne senas elementas.",
      "Atidaryk įrašą dviejuose naršyklės skirtukuose. Ištrink jį pirmame, tada bandyk ištrinti antrame → sistema tai apdoroja tvarkingai (pvz., „Elementas nerastas“), be serverio klaidos.",
    ],
    301: [
      "Atidaryk seną URL, kuris persikėlė (pvz., seną produkto nuorodą) → patenki į naują puslapį, o Network skirtuke matyti vienas 301 šuolis, ne grandinė.",
      "Atidaryk seną URL su pridėtais parametrais (pvz., ?page=2&sort=price) → naujas puslapis atsidaro su tais pačiais parametrais.",
      "Atidaryk bet kurio puslapio http:// versiją → nukreipiama į https:// su būsena 301, o ne 302 ar puslapio kopija su 200.",
    ],
    302: [
      "Atsijunk, atidaryk puslapį, kuriam reikia prisijungimo, tiesiogine nuoroda, tada prisijunk → patenki ten, kur nurodyta reikalavimuose (atgal į tą puslapį arba, pvz., į paskyros skydelį), o ne į klaidos ar tuščią puslapį.",
      "Rask nukreipimo parametrą prisijungimo URL (pvz., ?next=/orders), pakeisk jį išorine svetaine (?next=https://example.com) ir prisijunk → lieki mūsų svetainėje.",
      "Pateik formą (pvz., atsiskaitymą), tada patvirtinimo puslapyje paspausk F5 → nėra įspėjimo „pateikti formą dar kartą“ ir nėra antro užsakymo.",
    ],
    304: [
      "Atidaryk puslapį, tada perkrauk jį su atidarytu Network skirtuku → nepakitę paveikslėliai, skriptai ir stiliai grįžta kaip 304.",
      "Pakeisk ką nors matomo (pvz., produkto pavadinimą administravime), tada įprastai perkrauk puslapį → matyti nauja reikšmė, o ne sena iš talpyklos.",
      "Po diegimo atidaryk svetainę naršyklėje, kuri ją jau lankė, neišvalius talpyklos → svetainė veikia be klaidų (senų ir naujų failų mišinio nėra), o nauja versija atsiranda iš karto arba per nurodytą talpyklos laiką.",
    ],
    400: [
      "Postman (arba DevTools) išsiųsk requestą su sugadintu JSON arba be privalomo lauko → būsena 400, o ne 500.",
      "Išsiųsk tą patį sugadintą requestą ir perskaityk klaidos pranešimą → jis nurodo, kas tiksliai negerai (kuris laukas, koks formatas).",
      "Peržiūrėk visą klaidos atsakymą → jame nėra stack trace, failų kelių ar SQL.",
    ],
    401: [
      "Atsijunk ir atidaryk privatų puslapį (arba iškviesk jo API) tiesiogine nuoroda → gauni prisijungimo puslapį arba būseną 401, o ne turinį.",
      "Prisijunk, palauk, kol sesija baigsis (arba ištrink sesijos slapuką), tada ką nors spustelėk → paprašoma prisijungti iš naujo, o prisijungus galima tęsti.",
      "Atsijunk, paspausk naršyklėje „Atgal“ ir bandyk atlikti veiksmą senajame puslapyje → prieigos nėra, prašoma prisijungti.",
    ],
    403: [
      "Prisijunk kaip paprastas naudotojas ir atidaryk administravimo URL tiesiogine nuoroda (pvz., /admin) → administravimo puslapis neatsidaro (nėra prieigos, prisijungimo puslapis arba 404, kaip nurodyta reikalavimuose).",
      "Prisijunk kaip naudotojas A, atidaryk vieną savo užsakymą ir pakeisk id URL adrese į naudotojo B užsakymo → B užsakymas nerodomas.",
      "Kaip administratorius nukopijuok iš DevTools tik administratoriui skirto veiksmo requestą; kaip paprastas naudotojas išsiųsk tą patį requestą → būsena 403, niekas nepasikeičia.",
    ],
    404: [
      "Atidaryk URL su klaida (pvz., /prodcts) → draugiškas 404 puslapis su keliu atgal (meniu, paieška arba nuoroda į pradžią).",
      "Atidaryk elementą ir pakeisk jo id URL adrese į neegzistuojantį (pvz., 999999) → 404 puslapis, o ne serverio klaida.",
      "Atidaryk neegzistuojantį puslapį su atidarytu Network skirtuku → būsena tikrai 404, o ne 200 („soft 404“).",
    ],
    405: [
      "Postman išsiųsk DELETE (arba PUT) į endpointą, kuris tik skaito duomenis (pvz., viešą sąrašą) → būsena 405, niekas neištrinama.",
      "Pažiūrėk į to 405 atsakymo antraštes → yra Allow antraštė su leidžiamų metodų sąrašu.",
      "Išbandyk endpointe kiekvieną nepalaikomą metodą → visada 405, niekada 404 ar 500.",
    ],
    408: [
      "DevTools nustatyk tinklą į Slow 3G ir pateik didelę formą arba įkelk didelį failą → po kurio laiko atsiranda aiškus timeout pranešimas, o ne nesibaigiantis suktukas.",
      "Po timeout pranešimo grąžink įprastą tinklą ir bandyk dar kartą → veikia, o įvesti duomenys lieka formoje.",
    ],
    409: [
      "Užsiregistruok su el. paštu, kuriam jau yra paskyra → nauja paskyra nesukuriama, o pranešimas toks, kaip nurodyta reikalavimuose (tiesiai „Šis el. paštas jau naudojamas“ arba neutraliai „Patikrink pašto dėžutę“).",
      "Atidaryk tą patį įrašą dviejuose skirtukuose. Pakeisk ir išsaugok pirmame, tada pakeisk ir išsaugok antrame → antras išsaugojimas įspėja apie konfliktą, o ne tyliai perrašo pirmą pakeitimą.",
      "Perskaityk konflikto pranešimą → jis nurodo, kas tiksliai konfliktuoja (kuris laukas ar kuri versija).",
    ],
    413: [
      "Sužinok įkėlimo ribą (pvz., 10 MB) ir įkelk failus šiek tiek mažesnius, lygiai ties riba ir šiek tiek didesnius → elgesys ties riba atitinka reikalavimus (≤ ar <), o viskas, kas didesnė, atmetama.",
      "Palygink ribą užuominoje prie įkėlimo lauko su dydžiu, kuris iš tikrųjų atmetamas → jie sutampa.",
      "Įkelk aiškiai per didelį failą → aiškus pranešimas su leistinu dydžiu, o ne nutrūkęs ryšys ar nesibaigiantis įkėlimas.",
    ],
    415: [
      "Postman išsiųsk teisingą JSON turinį su Content-Type: text/plain (arba be Content-Type) → būsena 415, o ne 500.",
      "Išsiųsk tuos pačius duomenis kaip XML arba form-data į endpointą, kuris priima tik JSON → būsena 415 su pranešimu, koks formatas laukiamas.",
    ],
    418: [
      "Jei produkte yra velykinis kiaušinis (pvz., /teapot), iškviesk jį, tada kelis tikrus endpointus → tikrieji veikia įprastai.",
      "Po velykinio kiaušinio iškvietimo patikrink stebėseną ir įspėjimus → nėra pavojaus signalo apie nežinomą klaidą.",
    ],
    422: [
      "Įvesk amžiaus lauke -5 (arba neteisingą el. paštą: „banana“, „anna@“, „@mail.com“, „anna@@mail.com“, „anna k@mail.com“) ir pateik → klaidos pranešimas tiesiai po tuo lauku, forma neišsiunčiama.",
      "Užpildyk kelis laukus neteisingomis, o kitus teisingomis reikšmėmis ir pateik → visos klaidos rodomos iš karto, o teisingos reikšmės lieka užpildytos.",
      "Išbandyk ribines reikšmes po vieną: tuščias privalomas laukas, maksimalus ilgis + 1 simbolis, gimimo data ateityje, vasario 29-oji nekeliamaisiais metais → kiekviena atmetama su aiškia priežastimi.",
    ],
    429: [
      "Sužinok nurodytą limitą (dokumentacija, atsakymo antraštė arba paklausk programuotojo), pvz., 5 prisijungimo bandymai per minutę; atlik lygiai tiek bandymų ir dar vieną → blokuojamas tik tas papildomas.",
      "Kai blokavimo laikas baigiasi, bandyk dar kartą → vėl veikia.",
      "Pasiek limitą kaip naudotojas A, tada iš karto bandyk kaip naudotojas B kitoje naršyklėje → naudotojas B neturėtų būti užblokuotas.",
    ],
    500: [
      "DevTools (Elements skirtuke) pašalink iš lauko maxlength, required ar pattern ir pateik formą su netikėtais duomenimis: emoji, tekstas vienu simboliu ilgesnis už backend ar duomenų bazės ribą, <script>, ' OR 1=1 → jokios 500: arba įprastas rezultatas, arba validacijos klaida.",
      "Jei forma tikrina duomenis JavaScript, nukopijuok requestą Network (Copy as fetch) arba atidaryk jį Postman, įrašyk tuos pačius duomenis ir išsiųsk → vėl jokios 500.",
      "Jei 500 vis dėlto įvyksta, pažiūrėk į puslapį → pranešimas naudotojui be techninės informacijos (pvz., „Kažkas nepavyko, bandyk dar kartą“).",
      "Po 500 patikrink žurnalus ar stebėseną → klaida ten yra su laiku, URL ir requesto detalėmis.",
    ],
    502: [
      "Testinėje aplinkoje sustabdyk backend paslaugą ir atidaryk svetainę → draugiškas klaidos puslapis, o ne neapdorotas nginx ar proxy puslapis.",
      "Perskaityk tą klaidos puslapį ir jo atsakymą → nėra vidinių IP adresų, hostų pavadinimų ar serverių versijų.",
      "Vėl paleisk backend ir perkrauk svetainę → veikia be jokių papildomų veiksmų.",
    ],
    503: [
      "Įjunk planuotų priežiūros darbų režimą (arba atidaryk svetainę diegimo metu) → priežiūros puslapis su numatomu grįžimo laiku, o ne sugadintas maketas.",
      "Atidaryk priežiūros puslapį su atidarytu Network skirtuku → būsena 503, o ne 200.",
      "Apkrovos testo metu stebėk atsakymus didėjant apkrovai → esant perkrovai dalis requestų gauna 503, bet svetainė visiškai nenulūžta ir atsigauna, kai apkrova sumažėja.",
    ],
    504: [
      "Paleisk lėčiausią operaciją, kurią rasi (pvz., metinę ataskaitą ar pilną eksportą) → po timeout atsiranda aiškus pranešimas, o ne nesibaigiantis suktukas.",
      "Paleisk labai ilgą operaciją ir išeik iš puslapio → ji tęsiasi fone, o kai baigiasi, gauni pranešimą (arba paruoštą failą).",
      "Po timeout pranešimo paspausk „Bandyti dar kartą“ → operacija prasideda iš naujo nereikalaujant iš naujo įvesti filtrų ar duomenų.",
    ],
  },
  // Traps: title, rule and the situations to sort, in the order of data/traps.js (the answers live there).
  traps: {
    "401-403": {
      title: "Whoowl ar Nopelican?",
      rule: "401: parodyk, kas esi, ir įeisi. 403: žinome, kas esi, ir vis tiek ne.",
      s: [
        "Tokeno galiojimas baigėsi.",
        "Prisijungęs naudotojas trina kito žmogaus užsakymą.",
        "Requestas neturi Authorization antraštės.",
        "Paprastas naudotojas atidaro /admin.",
      ] },
    "301-302": {
      title: "Relocrab ar Brbat?",
      rule: "301: persikėlė visam laikui. 302: laikinai kitur, senas adresas vis dar teisingas.",
      s: [
        "Svetainė visam laikui persikėlė į naują domeną.",
        "Prisijungus grąžinama į ankstesnį puslapį.",
        "Visi http adresai dabar visam laikui veda į https.",
        "Išpardavimo metu pradinis puslapis nukreipia į akcijos puslapį.",
      ] },
    "200-201-204": {
      title: "Okayak, Buildbeaver ar Nullwing?",
      rule: "200: štai rezultatas. 201: sukurta kažkas nauja. 204: padaryta, nėra ką parodyti.",
      s: [
        "GET /orders grąžino užsakymų sąrašą.",
        "POST /orders sukūrė naują užsakymą.",
        "DELETE /orders/42 pavyko be turinio.",
      ] },
    "408-503": {
      title: "Slowth ar Hibearnate?",
      rule: "408: klientas per lėtas. 503: serveris miega.",
      s: [
        "Klientas pradėjo įkelti didelį failą ir užstrigo.",
        "Serveryje vyksta planuoti priežiūros darbai.",
      ] },
    "500-502": {
      title: "Panicorn ar Parroxy?",
      rule: "500: sugedo pats serveris. 502: proxy perdavė užklausą toliau ir gavo iš serverio šiukšlių.",
      s: [
        "Neapdorota išimtis backend kode.",
        "Nginx negavo tinkamo atsakymo iš backend.",
      ] },
    "429-503": {
      title: "Spamster ar Hibearnate?",
      rule: "429: per daug requestų iš tavęs. 503: serveris neveikia visiems.",
      s: [
        "Tavo skriptas siunčia tūkstantį requestų per sekundę.",
        "Serveris perkrautas ir niekam neatsako.",
      ] },
    "400-404": {
      title: "Garblin ar Nowherret?",
      rule: "400: requesto neįmanoma perskaityti. 404: perskaitytas, bet ten nieko nėra.",
      s: [
        "JSON trūksta uždarančio riestinio skliausto.",
        "GET /users/99999, o tokio naudotojo nėra.",
      ] },
    "404-405": {
      title: "Nowherret ar Verbadger?",
      rule: "404: šiuo adresu niekas negyvena. 405: adresas yra, bet šis metodas čia nepriimamas.",
      s: [
        "DELETE /products, nors produktų sąrašas skirtas tik skaityti.",
        "GET /prodcts su klaida adrese.",
        "PUT į /login, kuris priima tik POST.",
        "GET /orders/777 ištrintam užsakymui.",
      ] },
    "409-422": {
      title: "Clashgoat ar Nitpecker?",
      rule: "409: duomenys tvarkingi, bet susiduria su tuo, kas jau yra. 422: patys duomenys neturi prasmės.",
      s: [
        "Registracija su jau naudojamu el. paštu.",
        "Registracija su el. paštu „banana“.",
        "Du žmonės redaguoja tą patį įrašą, o antras pakeitimas remiasi pasenusia versija.",
        "Amžiaus lauke įrašyta −5.",
      ] },
    "400-422": {
      title: "Garblin ar Nitpecker?",
      rule: "400: requesto net neįmanoma perskaityti. 422: jis perskaitytas, bet reikšmės neturi prasmės. 400 yra bendra kliento klaida: kai tinka konkretesnis kodas, serveris naudoja jį.",
      s: [
        "JSON yra neuždaryta kabutė ir parseris sugenda.",
        "JSON teisingas, bet gimimo data ateityje.",
        "Requesto turinys nutrūkęs per pusę.",
        "Užsakymas −3 vienetams.",
      ] },
    "400-415": {
      title: "Garblin ar Pickoala?",
      rule: "400: formatas teisingas, bet requestas sugadintas. 415: serveris visai nepriima šio formato. 400 yra bendra kliento klaida: kai tinka konkretesnis kodas, serveris naudoja jį.",
      s: [
        "Content-Type: application/xml į endpointą, kuris priima tik JSON.",
        "Content-Type: application/json, bet turinys yra sugadintas JSON.",
        "Avataras įkeliamas kaip .exe vietoj .png.",
        "JSON po paskutinio lauko yra kablelis.",
      ] },
    "502-504": {
      title: "Parroxy ar Waitgator?",
      rule: "502: proxy perdavė užklausą toliau ir gavo iš serverio šiukšlių. 504: taip ir nesulaukė serverio atsakymo.",
      s: [
        "Nginx gavo netinkamą atsakymą iš backend.",
        "Backend ruošia ataskaitą 2 minutes, o proxy laukia tik 60 sekundžių.",
        "Backend persikrauna ir nutraukia ryšį atsakymo viduryje.",
        "Duomenų bazė pakibo, todėl backend taip ir neatsakė šliuzui.",
      ] },
    "408-504": {
      title: "Slowth ar Waitgator?",
      rule: "408: lėtas klientas; serveris nustojo laukti requesto. 504: lėtas serveris už šliuzo; šliuzas nustojo laukti atsakymo.",
      s: [
        "Telefonas su silpnu mobiliuoju internetu pradeda siųsti formą, ir requestas užstringa pusiaukelėje.",
        "CDN laiku negavo atsakymo iš tavo serverio.",
        "Klientas atidarė ryšį ir nieko nesiunčia.",
        "Proxy laukė mokėjimų mikroserviso, kuris tyli.",
      ] },
  },
  // "Tools and Read more": labels for data/links.js TOOLS, in the same order.
  tools: [
    "Chrome DevTools: Network skydelis",
    "Firefox: Edit and Resend",
    "Postman: užklausos siuntimas",
  ],
};
