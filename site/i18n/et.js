// Estonian: every text on the site in one file (RSP-85). Keys must match i18n/en.js; check with: node scripts/check-locales.mjs
// Drafted by Claude, native review on the site pending (RSP-111). Status names and creature names stay in English (they live in data/).
// Terminology: "request" in What to test and Traps (testers' language); the formal term in card meanings.
export default {
  // Interface. Functions build texts that contain numbers or names.
  ui: {
    tag: "Originaalsed olendid HTTP olekukoodide meeldejätmiseks. Igal koodil on oma Responster ja iga liigutus selgitab, mida kood tähendab.",
    tabs: [
      "Kogu",
      "Harjutamine",
      "Lõksud"
    ],
    all: "Kõik",
    mastered: (a,b)=>`${a}/${b} selgeks õpitud`,
    known: "tean",
    modeArt: "Pilt → kood",
    modeCode: "Kood → olend",
    modeArtHint: "Näed olendit, vali kood",
    modeCodeHint: "Näed koodi, leia olend",
    modeNerd: "Nerd mode",
    modeNerdHint: "Ainult tekst: loe tähendust, vali kood",
    modeHard: "Hardcore",
    modeHardHint: "Ainult kood: vali oleku nimi",
    modes: "Harjutusrežiim",
    qArt: "Mis kood see on?",
    qCode: "Kes see on?",
    qHard: "Mis on selle oleku nimi?",
    hint: "Vihje",
    hintIs: n=>`See on ${n}`,
    hintUsed: "Vihjega: läheb punktide sisse, aga mitte ✓ jaoks.",
    score: (r,t,s)=>`${r}/${t} · seeria ${s}`,
    ok: "Jah!",
    no: "Mitte see.",
    next: "Edasi",
    mean: "Mida see tähendab",
    when: "Kus sa sellega kokku puutud",
    conf: "Aetakse sageli segi",
    qa: "Mida testida",
    links: "Tööriistad ja lisalugemine",
    traps: "Koodipaarid, mida aetakse kõige sagedamini segi. Loe reeglit ja sorteeri olukorrad.",
    foot: "Responsters · omad tegelased ja tekstid; olekute nimed RFC 9110 järgi.",
    lang: "Keel",
    close: "Sulge",
    back: "Tagasi kogusse",
    howto: "Kuidas kasutada",
    howtoSteps: [
      "<b>Kogu.</b> Puuduta kaarti, et olendiga tutvuda: mida kood tähendab, kus sellega kokku puutud ja mida testida.",
      "<b>Harjutamine.</b> „Pilt → kood“, „Kood → olend“, „Nerd mode“ (ainult tekst) või „Hardcore“ (ainult kood). Kaks õiget vastust järjest annavad koodile ✓.",
      "<b>Lõksud.</b> Koodipaarid, mida aetakse segi: reegel ja olukorrad sorteerimiseks."
    ],
    howtoNote: "Edusammud salvestatakse ainult selles brauseris.",
    howtoClose: "Selge",
  },
  // Status classes 1xx–5xx: name and one-line rule.
  classes: {
    1: { name: "Munad", rule: "Alles kooruvad: server sai päringu ja töötab selle kallal." },
    2: { name: "Sõbrad", rule: "Õnnestus." },
    3: { name: "Rändurid", rule: "See, mida otsid, on mujal." },
    4: { name: "Väravavahid", rule: "Kliendi viga: paranda päringut." },
    5: { name: "Serverielukad", rule: "Serveri viga: see pole sinu süü." },
  },
  // Cards: what it means, where you meet it, and the card line in the creature's voice (max ~55 characters).
  cards: {
    102: {
      mean: "Server võttis päringu vastu ja töötleb seda veel. Vastust veel pole.",
      when: "Pikad WebDAV toimingud; tavalistes API-des harva.",
      line: "Tegelen sellega! Tulemust veel pole." },
    200: {
      mean: "Päring õnnestus ja vastuses on tulemus.",
      when: "Lehe või loendi GET, POST, mis ressurssi ei loonud.",
      line: "Mis ma oskan öelda? Kõik on hästi!" },
    201: {
      mean: "Loodi uus ressurss. Selle aadress on päises Location.",
      when: "POST /orders lõi tellimuse.",
      line: "Uhiuus! Ehitasin ise!" },
    204: {
      mean: "Õnnestus, aga vastusel pole sisu.",
      when: "DELETE või PUT, kui pole midagi tagastada.",
      line: "Tehtud! Lihtsalt pole midagi näidata." },
    301: {
      mean: "Ressurss kolis jäädavalt. Kliendid ja otsingumootorid peaksid URL-i uuendama.",
      when: "Kolimine uuele domeenile või http-lt https-ile.",
      line: "Kolisin jäädavalt. Kasuta uut aadressi." },
    302: {
      mean: "Ressurss on ajutiselt mujal. Algne URL jääb õigeks.",
      when: "Ümbersuunamine pärast sisselogimist, ajutine kampaanialeht.",
      line: "Hetkel eemal. Tulen varsti tagasi." },
    304: {
      mean: "Pärast vahemällu salvestamist pole midagi muutunud. Kasuta oma koopiat.",
      when: "Brauser saatis If-None-Match või If-Modified-Since.",
      line: "Pole muutunud. Vaata oma vahemälu." },
    400: {
      mean: "Päring on vigane: süntaks, vorming või kehtetud andmed.",
      when: "Katkine JSON, puuduv kohustuslik väli, vigased päringuparameetrid, poolelt katkenud päringu sisu.",
      line: "Mis jama see on! Ma ei saa sõnagi aru." },
    401: {
      mean: "Vaja on autentimist: sisselogimisandmed puuduvad või on vigased.",
      when: "Puudub Authorization päis, aegunud token.",
      line: "Kes sa oled? Kas me tunneme?" },
    403: {
      mean: "On teada, kes sa oled, aga sul pole õigusi.",
      when: "Tavakasutaja avab halduspaneeli.",
      line: "Ah, see oled sina? Sisse ei saa!" },
    404: {
      mean: "Sellel aadressil pole midagi.",
      when: "Kirjaviga URL-is, kustutatud toode.",
      line: "Siin pole kedagi. Otsi ise mujalt." },
    405: {
      mean: "Server tunneb seda aadressi, aga ei luba seda meetodit.",
      when: "DELETE saadeti endpointi, mis lubab ainult GET-i.",
      line: "Mitte nii! Vaheta meetodit." },
    408: {
      mean: "Klient saatis päringut liiga kaua ja server lõpetas ootamise.",
      when: "Aeglane ühendus, takerdunud üleslaadimine.",
      line: "Magasin sisse. Server loobus ootamast." },
    409: {
      mean: "Päring on vastuolus ressursi praeguse olekuga.",
      when: "Registreerimisel juba kasutusel olev e-post, versioonikonflikt muutmisel.",
      line: "Mina olin siin esimene! Tagasi!" },
    413: {
      mean: "Päringu sisu on lubatud piirist suurem.",
      when: "Liiga suure faili üleslaadimine.",
      line: "Liiga palju! Ei mahu!" },
    415: {
      mean: "Server ei toeta seda andmevormingut.",
      when: "XML JSON-i asemel, vale Content-Type.",
      line: "Äkk! Seda ma ei söö! Vaata, mis mulle meeldib." },
    418: {
      mean: "Naljakood RFC 2324-st: teekann keeldub kohvi keetmast.",
      when: "Lihavõttemunad API-des. Tore boonus tööintervjuul.",
      line: "Olen teekann. Kohvi ei tule." },
    422: {
      mean: "Päring loeti läbi, aga andmed ei läbi valideerimist.",
      when: "Tekst numbri asemel, negatiivne vanus, „email: banana“.",
      line: "Lugesin. Aga vanus -5? Tõsiselt?" },
    429: {
      mean: "Liiga palju päringuid lühikese ajaga; rakendus päringupiirang.",
      when: "Pausideta skript, vastuses Retry-After päis.",
      line: "Stopp! Liiga palju. Lase hingata." },
    500: {
      mean: "Serveris läks midagi ootamatult katki.",
      when: "Käsitlemata erand backendi koodis.",
      line: "Asi pole sinus, asi on minus." },
    502: {
      mean: "Lüüs või proksi saatis päringu edasi, kuid sai serverilt vigase vastuse.",
      when: "Nginx kokku jooksnud backendi ees.",
      line: "Tuli katkisena. Mina ainult annan edasi!" },
    503: {
      mean: "Server on ajutiselt kättesaamatu: ülekoormus või hooldus.",
      when: "Plaaniline hooldus, ülekoormatud server.",
      line: "Remondi tõttu suletud. Tule hiljem." },
    504: {
      mean: "Lüüs või proksi saatis päringu edasi, kuid ei saanud serverilt vastust.",
      when: "Aeglane backend nginxi või CDN-i taga.",
      line: "Ootasin ja ootasin. Serverist pole vastust." },
  },
  // "What to test": short test cases, steps → expected result (RSP-11).
  qa: {
    102: [
      "Käivita pikk toiming (nt suure faili import või suure kausta kopeerimine) ja oota lehte puudutamata → leht ootab ja näitab tulemust, timeout-viga ei tule.",
      "Pika toimingu ajal jälgi selle olekut kasutajaliideses → näha on edenemine ja „Valmis“ ilmub alles siis, kui toiming on päriselt lõppenud.",
    ],
    200: [
      "Salvesta kirje teadaolevate väärtustega, siis ava see (või loend, kus see on) → iga väli näitab täpselt seda, mis salvestati, midagi ei puudu ega ole üleliigset.",
      "Ava loend, kus pole veel midagi (nt uue konto tellimused) → sõbralik „Siin pole veel midagi“ ja olek 200, mitte vealeht.",
      "Saada vorm vigaste andmetega ja vaata Network vahekaarti → olek on 4xx, mitte 200 koos sisse peidetud veateatega.",
    ],
    201: [
      "Loo uus element (nt kommentaar või tellimus) ja ava loend → uus element on seal täpselt sisestatud väärtustega.",
      "Täida loomisvorm ja topeltklõpsa kiiresti „Saada“ → luuakse ainult üks element.",
      "Loo element, kopeeri selle link ja ava uuel vahekaardil → element avaneb.",
    ],
    204: [
      "Kustuta loendist element → see kaob kohe ilma veateateta ja ei tule pärast lehe värskendamist tagasi.",
      "Kopeeri elemendi link, kustuta element ja ava kopeeritud link → leht „ei leitud“ (404), mitte vana element.",
      "Ava kirje kahel brauseri vahekaardil. Kustuta see esimesel, siis proovi kustutada teisel → süsteem käsitleb seda viisakalt (nt „Elementi ei leitud“), serveri veata.",
    ],
    301: [
      "Ava vana URL, mis on kolinud (nt vana tootelink) → jõuad uuele lehele ja Network vahekaart näitab üht 301 hüpet, mitte ahelat.",
      "Ava vana URL lisatud parameetritega (nt ?page=2&sort=price) → uus leht avaneb samade parameetritega.",
      "Ava suvalise lehe http:// versioon → sind suunatakse https://-le olekuga 301, mitte 302 ega lehe koopiaga olekuga 200.",
    ],
    302: [
      "Logi välja, ava sisselogimist nõudev leht otselingiga ja logi sisse → jõuad sinna, kuhu nõuded ütlevad (tagasi sellele lehele või nt konto töölauale), mitte vea- või tühjale lehele.",
      "Leia sisselogimise URL-ist ümbersuunamise parameeter (nt ?next=/orders), asenda see välise saidiga (?next=https://example.com) ja logi sisse → jääd meie saidile.",
      "Saada vorm (nt kassas), siis vajuta kinnituslehel F5 → pole hoiatust „saada vorm uuesti“ ega teist tellimust.",
    ],
    304: [
      "Ava leht ja laadi see uuesti avatud Network vahekaardiga → muutmata pildid, skriptid ja stiilid tulevad tagasi kui 304.",
      "Muuda midagi nähtavat (nt toote nimi halduses) ja laadi leht tavaliselt uuesti → näha on uus väärtus, mitte vana vahemälust.",
      "Pärast deploy'd ava sait brauseris, mis on seal varem käinud, vahemälu tühjendamata → sait töötab vigadeta (vanad ja uued failid ei segune) ja uus versioon ilmub kohe või lubatud vahemäluaja jooksul.",
    ],
    400: [
      "Saada Postmanis (või DevToolsis) katkise JSON-iga või kohustusliku väljata request → olek 400, mitte 500.",
      "Saada sama katkine request ja loe veateadet → see ütleb, mis täpselt valesti on (milline väli, milline vorming).",
      "Vaata kogu veavastust → seal pole stack trace'i, failiteid ega SQL-i.",
    ],
    401: [
      "Logi välja ja ava privaatne leht (või kutsu selle API-t) otselingiga → saad sisselogimislehe või oleku 401, mitte sisu.",
      "Logi sisse, oota, kuni seanss aegub (või kustuta seansi küpsis), siis klõpsa midagi → sul palutakse uuesti sisse logida ja pärast sisselogimist saab jätkata.",
      "Logi välja, vajuta brauseris Tagasi ja proovi vanal lehel mõnda toimingut → ligipääsu pole, palutakse sisse logida.",
    ],
    403: [
      "Logi sisse tavakasutajana ja ava halduse URL otselingiga (nt /admin) → halduslehte ei avane (ligipääsu pole, sisselogimisleht või 404, nagu nõuded ütlevad).",
      "Logi sisse kasutajana A, ava üks oma tellimustest ja muuda URL-is id kasutaja B tellimuse omaks → B tellimust ei näidata.",
      "Kopeeri adminina DevToolsist ainult adminile lubatud toimingu request; saada tavakasutajana sama request → olek 403, midagi ei muutu.",
    ],
    404: [
      "Ava kirjaveaga URL (nt /prodcts) → sõbralik 404-leht koos teega tagasi (menüü, otsing või link avalehele).",
      "Ava element ja muuda URL-is selle id olematuks (nt 999999) → 404-leht, mitte serveri viga.",
      "Ava olematu leht avatud Network vahekaardiga → olek on päriselt 404, mitte 200 („soft 404“).",
    ],
    405: [
      "Saada Postmanis DELETE (või PUT) endpointi, mis ainult loeb andmeid (nt avalik loend) → olek 405, midagi ei kustutata.",
      "Vaata selle 405 vastuse päiseid → seal on Allow päis lubatud meetodite loendiga.",
      "Proovi endpointil iga toetamata meetodit → alati 405, mitte kunagi 404 ega 500.",
    ],
    408: [
      "Sea DevToolsis võrk Slow 3G peale ja saada suur vorm või lae üles suur fail → mõne aja pärast ilmub selge timeout-teade, mitte lõputu laadimisring.",
      "Pärast timeout-teadet pane võrk tavaliseks tagasi ja proovi uuesti → töötab ja sisestatud andmed on vormis alles.",
    ],
    409: [
      "Registreeru e-postiga, millel on juba konto → uut kontot ei looda ja teade on selline, nagu nõuded ütlevad (otse „See e-post on juba kasutusel“ või neutraalne „Vaata oma postkasti“).",
      "Ava sama kirje kahel vahekaardil. Muuda ja salvesta see esimesel, siis muuda ja salvesta teisel → teine salvestus hoiatab konflikti eest, mitte ei kirjuta vaikselt esimest muudatust üle.",
      "Loe konfliktiteadet → see ütleb, millega täpselt konflikt on (milline väli või milline versioon).",
    ],
    413: [
      "Leia üleslaadimise piir (nt 10 MB) ja lae üles failid veidi alla, täpselt piiril ja veidi üle → käitumine piiril vastab nõuetele (≤ või <) ja kõik suurem lükatakse tagasi.",
      "Võrdle üleslaadimisvälja juures olevat piiri suurusega, mis tegelikult tagasi lükatakse → need klapivad.",
      "Lae üles selgelt liiga suur fail → selge teade lubatud suurusega, mitte katkenud ühendus ega lõputu üleslaadimine.",
    ],
    415: [
      "Saada Postmanis korrektne JSON-sisu päisega Content-Type: text/plain (või ilma Content-Type'ita) → olek 415, mitte 500.",
      "Saada samad andmed XML-i või form-data'na endpointi, mis võtab ainult JSON-it → olek 415 ja teade, millist vormingut oodatakse.",
    ],
    418: [
      "Kui tootes on lihavõttemuna (nt /teapot), kutsu see välja ja siis mõni päris endpoint → päris endpointid töötavad tavapäraselt.",
      "Kontrolli pärast lihavõttemuna väljakutset monitooringut ja hoiatusi → tundmatu vea kohta häiret pole.",
    ],
    422: [
      "Sisesta vanuse väljale -5 (või vigane e-post: „banana“, „anna@“, „@mail.com“, „anna@@mail.com“, „anna k@mail.com“) ja saada → veateade otse selle välja all ja vormi ei saadeta.",
      "Täida mitu välja vigaste ja ülejäänud korrektsete väärtustega ning saada → kõik vead näidatakse korraga ja korrektsed väärtused jäävad alles.",
      "Proovi piirväärtusi ükshaaval: tühi kohustuslik väli, maksimaalne pikkus + 1 märk, sünnikuupäev tulevikus, 29. veebruar mitteliigaastal → igaüks lükatakse selge põhjusega tagasi.",
    ],
    429: [
      "Leia väljakuulutatud piirang (dokumentatsioon, vastuse päis või küsi arendajalt), nt 5 sisselogimiskatset minutis; tee täpselt nii palju katseid ja siis veel üks → blokeeritakse ainult see üleliigne.",
      "Kui blokeerimisaeg on läbi, proovi uuesti → töötab jälle.",
      "Jõua piirini kasutajana A, siis proovi kohe kasutajana B teises brauseris → kasutajat B ei tohiks blokeerida.",
    ],
    500: [
      "Eemalda DevToolsis (Elements vahekaart) väljalt maxlength, required või pattern ja saada vorm ootamatute andmetega: emoji, tekst ühe märgi võrra üle backendi või andmebaasi piiri, <script>, ' OR 1=1 → 500 ei tule: kas tavaline tulemus või valideerimisviga.",
      "Kui vorm valideerib JavaScriptiga, kopeeri request Network'is (Copy as fetch) või ava see Postmanis, pane samad andmed ja saada → jälle 500 ei tule.",
      "Kui 500 siiski juhtub, vaata lehte → kasutajale mõeldud teade ilma tehnilise infota (nt „Midagi läks valesti, proovi uuesti“).",
      "Pärast 500 vaata logisid või monitooringut → viga on seal koos aja, URL-i ja requesti üksikasjadega.",
    ],
    502: [
      "Peata testkeskkonnas backendi teenus ja ava sait → sõbralik vealeht, mitte toores nginxi või proksi leht.",
      "Loe seda vealehte ja selle vastust → sisemisi IP-aadresse, hostinimesid ega serveriversioone pole.",
      "Käivita backend uuesti ja laadi sait uuesti → töötab ilma lisasammudeta.",
    ],
    503: [
      "Lülita sisse plaanilise hoolduse režiim (või ava sait deploy ajal) → hooldusleht oodatava tagasituleku ajaga, mitte katkine paigutus.",
      "Ava hooldusleht avatud Network vahekaardiga → olek 503, mitte 200.",
      "Jälgi koormustesti ajal vastuseid koormuse kasvades → ülekoormuse korral saab osa requeste 503, aga sait ei kuku täielikult kokku ja taastub, kui koormus langeb.",
    ],
    504: [
      "Käivita aeglaseim toiming, mille leiad (nt aastaaruanne või täielik eksport) → pärast timeout'i ilmub selge teade, mitte lõputu laadimisring.",
      "Käivita väga pikk toiming ja lahku lehelt → see jätkub taustal ja saad teavituse (või valmis faili), kui see on valmis.",
      "Pärast timeout-teadet vajuta „Proovi uuesti“ → toiming algab uuesti ilma filtreid või andmeid uuesti sisestamata.",
    ],
  },
  // Traps: title, rule and the situations to sort, in the order of data/traps.js (the answers live there).
  traps: {
    "401-403": {
      title: "Whoowl või Nopelican?",
      rule: "401: näita, kes sa oled, ja saad sisse. 403: teame, kes sa oled, ja ikkagi ei.",
      s: [
        "Token on aegunud.",
        "Sisseloginud kasutaja kustutab kellegi teise tellimuse.",
        "Requestil pole Authorization päist.",
        "Tavakasutaja avab /admin.",
      ] },
    "301-302": {
      title: "Relocrab või Brbat?",
      rule: "301: kolis jäädavalt. 302: ajutiselt mujal, vana aadress on endiselt õige.",
      s: [
        "Sait kolis jäädavalt uuele domeenile.",
        "Pärast sisselogimist suunatakse sind tagasi eelmisele lehele.",
        "Kõik http-aadressid viivad nüüd jäädavalt https-ile.",
        "Allahindluse ajal suunab avaleht kampaanialehele.",
      ] },
    "200-201-204": {
      title: "Okayak, Buildbeaver või Nullwing?",
      rule: "200: siin on tulemus. 201: loodi midagi uut. 204: tehtud, pole midagi näidata.",
      s: [
        "GET /orders tagastas tellimuste loendi.",
        "POST /orders lõi uue tellimuse.",
        "DELETE /orders/42 õnnestus ilma sisuta.",
      ] },
    "408-503": {
      title: "Slowth või Hibearnate?",
      rule: "408: sina, klient, oled liiga aeglane. 503: server magab.",
      s: [
        "Klient hakkas suurt faili üles laadima ja jäi toppama.",
        "Serveris käib plaaniline hooldus.",
      ] },
    "500-502": {
      title: "Panicorn või Parroxy?",
      rule: "500: server ise läks katki. 502: proksi saatis päringu edasi ja sai serverilt prügi.",
      s: [
        "Käsitlemata erand backendi koodis.",
        "Nginx ei saanud backendilt korrektset vastust.",
      ] },
    "429-503": {
      title: "Spamster või Hibearnate?",
      rule: "429: sinult tuleb liiga palju requeste. 503: server on maas kõigi jaoks.",
      s: [
        "Sinu skript saadab tuhat requesti sekundis.",
        "Server on ülekoormatud ega vasta kellelegi.",
      ] },
    "400-404": {
      title: "Garblin või Nowherret?",
      rule: "400: requesti ei saa lugeda. 404: loeti läbi, aga seal pole midagi.",
      s: [
        "JSON-is puudub sulgev looksulg.",
        "GET /users/99999, aga sellist kasutajat pole.",
      ] },
    "404-405": {
      title: "Nowherret või Verbadger?",
      rule: "404: sellel aadressil ei ela keegi. 405: aadress on olemas, aga seda meetodit siin ei võeta vastu.",
      s: [
        "DELETE /products, kuigi tooteloend on ainult lugemiseks.",
        "GET /prodcts kirjaveaga aadressis.",
        "PUT aadressile /login, mis võtab vastu ainult POST-i.",
        "GET /orders/777 kustutatud tellimuse kohta.",
      ] },
    "409-422": {
      title: "Clashgoat või Nitpecker?",
      rule: "409: andmed on korras, aga põrkuvad olemasolevaga. 422: andmetel endil pole mõtet.",
      s: [
        "Registreerumine juba kasutusel oleva e-postiga.",
        "Registreerumine e-postiga „banana“.",
        "Kaks inimest muudavad sama kirjet ja teine muudatus põhineb aegunud versioonil.",
        "Vanuse väljal on −5.",
      ] },
    "400-422": {
      title: "Garblin või Nitpecker?",
      rule: "400: requesti ei saa isegi lugeda. 422: see loeti läbi, aga väärtustel pole mõtet. 400 on üldine kliendi viga: kui sobib täpsem kood, kasutab server seda.",
      s: [
        "JSON-is on sulgemata jutumärk ja parser kukub läbi.",
        "JSON on korrektne, aga sünnikuupäev on tulevikus.",
        "Requesti sisu on poolelt katkenud.",
        "Tellimus −3 tükile.",
      ] },
    "400-415": {
      title: "Garblin või Pickoala?",
      rule: "400: vorming on õige, aga request on katki. 415: server ei võta seda vormingut üldse vastu. 400 on üldine kliendi viga: kui sobib täpsem kood, kasutab server seda.",
      s: [
        "Content-Type: application/xml endpointi, mis võtab ainult JSON-it.",
        "Content-Type: application/json, aga sisu on katkine JSON.",
        "Avatar laaditakse üles .exe-na .png asemel.",
        "JSON-is on pärast viimast välja koma.",
      ] },
    "502-504": {
      title: "Parroxy või Waitgator?",
      rule: "502: proksi saatis päringu edasi ja sai serverilt prügi. 504: ta ei saanudki serverilt vastust.",
      s: [
        "Nginx sai backendilt vigase vastuse.",
        "Backend koostab aruannet 2 minutit, aga proksi ootab ainult 60 sekundit.",
        "Backend taaskäivitub ja katkestab ühenduse keset vastust.",
        "Andmebaas hangus, seega backend ei vastanud lüüsile kunagi.",
      ] },
    "408-504": {
      title: "Slowth või Waitgator?",
      rule: "408: aeglane klient; server lõpetas requesti ootamise. 504: aeglane server lüüsi taga; lüüs lõpetas vastuse ootamise.",
      s: [
        "Nõrga mobiilse andmesidega telefon hakkab vormi saatma ja request jääb poolel teel toppama.",
        "CDN ei saanud sinu serverilt õigeks ajaks vastust.",
        "Klient avas ühenduse ega saada midagi.",
        "Proksi ootas makseteenuse mikroteenust, mis vaikib.",
      ] },
  },
  // "Tools and Read more": labels for data/links.js TOOLS, in the same order.
  tools: [
    "Chrome DevTools: Network paneel",
    "Firefox: Edit and Resend",
    "Postman: päringu saatmine",
  ],
};
