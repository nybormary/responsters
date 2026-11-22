// Estonian: every text on the site in one file (RSP-85). Keys must match i18n/en.js; check with: node scripts/check-locales.mjs
// Drafted by Claude, native review on the site pending (RSP-111). Status names and creature names stay in English (they live in data/).
// Terminology: "request" in What to test and Traps (testers' language); the formal term in card meanings.
export default {
  // Interface. Functions build texts that contain numbers or names.
  ui: {
    tag: 'Originaalsed olendid HTTP olekukoodide meeldejätmiseks. Igal koodil on oma Responster ja iga liigutus selgitab, mida kood tähendab.',
    appTitle: 'Responsters: jäta meelde, mõista ja testi HTTP olekukoode',
    tabs: ['Kogu', 'Harjutamine', 'Lõksud'],
    all: 'Kõik',
    mastered: (a, b) => `${a}/${b} selgeks õpitud`,
    known: 'tean',
    modeArt: 'Pilt → kood',
    modeCode: 'Kood → olend',
    modeArtHint: 'Näed olendit, vali kood',
    modeCodeHint: 'Näed koodi, leia olend',
    modeNerd: 'Nerd mode',
    modeNerdHint: 'Ainult tekst: loe tähendust, vali kood',
    modeHard: 'Hardcore',
    modeHardHint: 'Ainult kood: vali oleku nimi',
    modes: 'Harjutusrežiim',
    qArt: 'Mis kood see on?',
    qCode: 'Kes see on?',
    qHard: 'Mis on selle oleku nimi?',
    hint: 'Vihje',
    hintIs: (n) => `See on ${n}`,
    hintUsed: 'Vihjega: läheb punktide sisse, aga mitte ✓ jaoks.',
    score: (r, t, s) => `${r}/${t} · seeria ${s}`,
    ok: 'Jah!',
    no: 'Mitte see.',
    next: 'Edasi',
    mean: 'Mida see tähendab',
    when: 'Kus sa sellega kokku puutud',
    conf: 'Aetakse sageli segi',
    qa: 'Mida testida',
    links: 'Tööriistad ja lisalugemine',
    traps: 'Koodipaarid, mida aetakse kõige sagedamini segi. Loe reeglit ja sorteeri olukorrad.',
    lang: 'Keel',
    close: 'Sulge',
    back: 'Tagasi kogusse',
    top: 'Üles',
    howto: 'Kuidas kasutada',
    howtoSteps: [
      '<b>Kogu.</b> Puuduta kaarti, et olendiga tutvuda: mida kood tähendab, kus sellega kokku puutud ja mida testida.',
      '<b>Harjutamine.</b> „Pilt → kood“, „Kood → olend“, „Nerd mode“ (ainult tekst) või „Hardcore“ (ainult kood). Kaks õiget vastust järjest annavad koodile ✓.',
      '<b>Lõksud.</b> Koodipaarid, mida aetakse segi: reegel ja olukorrad sorteerimiseks.',
    ],
    howtoNote: 'Edusammud salvestatakse ainult selles brauseris.',
    howtoClose: 'Selge',
  },
  // Status classes 1xx–5xx: name and one-line rule.
  classes: {
    1: { name: 'Munad', rule: 'Alles kooruvad: server sai päringu ja töötab selle kallal.' },
    2: { name: 'Sõbrad', rule: 'Õnnestus.' },
    3: { name: 'Rändurid', rule: 'See, mida otsid, on mujal.' },
    4: { name: 'Väravavahid', rule: 'Kliendi viga: paranda päringut.' },
    5: { name: 'Serverielukad', rule: 'Serveri viga: see pole sinu süü.' },
  },
  // Cards: what it means, where you meet it, and the card line in the creature's voice (max ~55 characters).
  cards: {
    102: {
      mean: 'Server võttis päringu vastu ja töötleb seda veel. Vastust veel pole.',
      when: 'Pikad WebDAV toimingud; tavalistes API-des harva.',
      line: 'Tegelen sellega! Tulemust veel pole.',
      art: 'Pisike ümar olevuke piilub üle pragunenud munakoore serva; koor on maalitud nagu laadimisratas ja keerleb.',
    },
    200: {
      mean: 'Päring õnnestus ja vastuses on tulemus.',
      when: 'Lehe või loendi GET, POST, mis ressurssi ei loonud.',
      line: 'Mis ma oskan öelda? Kõik on hästi!',
      art: 'Rahulik, karvane väike jakk väikeste sarvedega seisab murul ja noogutab rahulolevalt.',
    },
    201: {
      mean: 'Loodi uus ressurss. Selle aadress on päises Location.',
      when: 'POST /orders lõi tellimuse.',
      line: 'Uhiuus! Ehitasin ise!',
      art: 'Kollase kiivriga kobras seisab uhkelt särava, uhiuue palkmaja juures; kõrval silt kirjaga „NEW”.',
    },
    204: {
      mean: 'Õnnestus, aga vastusel pole sisu.',
      when: 'DELETE või PUT, kui pole midagi tagastada.',
      line: 'Tehtud! Lihtsalt pole midagi näidata.',
      art: 'Kahvatu, kohev klaasjate tiibadega koi istub kõhutäiena ja rahulolevalt laual tühja riidepuu ja villapuru kõrval; tema kohal hõljub roheline linnuke.',
    },
    301: {
      mean: 'Ressurss kolis jäädavalt. Kliendid ja otsingumootorid peaksid URL-i uuendama.',
      when: 'Kolimine uuele domeenile või http-lt https-ile.',
      line: 'Kolisin jäädavalt. Kasuta uut aadressi.',
      art: 'Erakvähk istub läikivas uues kojas; tema taga on vana tühi koda puust sildiga, mille nool osutab eemale.',
    },
    302: {
      mean: 'Ressurss on ajutiselt mujal. Algne URL jääb õigeks.',
      when: 'Ümbersuunamine pärast sisselogimist, ajutine kampaanialeht.',
      line: 'Hetkel eemal. Tulen varsti tagasi.',
      art: 'Ümar nahkhiir ripub pea alaspidi ja pilgutab silma sildi „BRB” kõrval; kaarjas nool osutab pisikesele koopale kirjaga „HOME”.',
    },
    304: {
      mean: 'Pärast vahemällu salvestamist pole midagi muutunud. Kasuta oma koopiat.',
      when: 'Brauser saatis If-None-Match või If-Modified-Since.',
      line: 'Pole muutunud. Vaata oma vahemälu.',
      art: 'Roheline kameeleon oksal hoiab käes kiirfotot iseendast täpselt samas poosis, nende vahel võrdusmärk.',
    },
    400: {
      mean: 'Päring on vigane: süntaks, vorming või kehtetud andmed.',
      when: 'Katkine JSON, puuduv kohustuslik väli, vigased päringuparameetrid, poolelt katkenud päringu sisu.',
      line: 'Mis jama see on! Ma ei saa sõnagi aru.',
      art: 'Ümarate prillidega goblin vaatab segaduses kissis silmi kortsunud sedelit täis kritseldusi; pea kohal küsimärgid.',
    },
    401: {
      mean: 'Vaja on autentimist: sisselogimisandmed puuduvad või on vigased.',
      when: 'Puudub Authorization päis, aegunud token.',
      line: 'Kes sa oled? Kas me tunneme?',
      art: 'Ümar kohev öökull seisab väikese värava taga, üks tiib tõstetud nagu valvuril, ja küsib „Who?”.',
    },
    403: {
      mean: 'On teada, kes sa oled, aga sul pole õigusi.',
      when: 'Tavakasutaja avab halduspaneeli.',
      line: 'Ah, see oled sina? Sisse ei saa!',
      art: 'Lihav pelikan, tiivad risti, seisab kindlalt telliskiviseina ja keti ning tabalukuga lukustatud ukse ees.',
    },
    404: {
      mean: 'Sellel aadressil pole midagi.',
      when: 'Kirjaviga URL-is, kustutatud toode.',
      line: 'Siin pole kedagi. Otsi ise mujalt.',
      art: 'Ainult kahvatu punktiirjoonena joonistatud tuhkur seisab tühja uru kõrval; selgelt paistavad vaid ta uudishimulikud silmad.',
    },
    405: {
      mean: 'Server tunneb seda aadressi, aga ei luba seda meetodit.',
      when: 'DELETE saadeti endpointi, mis lubab ainult GET-i.',
      line: 'Mitte nii! Vaheta meetodit.',
      art: 'Uksehoidja mütsiga mäger seisab ukse juures sildiga „GET POST” ja peatab käpaga ümbriku „DELETE”, mis on punaselt läbi kriipsutatud.',
    },
    408: {
      mean: 'Klient saatis päringut liiga kaua ja server lõpetas ootamise.',
      when: 'Aeglane ühendus, takerdunud üleslaadimine.',
      line: 'Magasin sisse. Server loobus ootamast.',
      art: 'Laiskloom magab oksal rippudes, poolel haigutusel; tema all on lõpetamata kiri ja pastakas, kõrval liivakell.',
    },
    409: {
      mean: 'Päring on vastuolus ressursi praeguse olekuga.',
      when: 'Registreerimisel juba kasutusel olev e-post, versioonikonflikt muutmisel.',
      line: 'Mina olin siin esimene! Tagasi!',
      art: 'Kaks jonnakat kitse kitsal plangul on sarved kokku lukustanud, nende vahel suur säde; kumbki ei pääse mööda.',
    },
    413: {
      mean: 'Päringu sisu on lubatud piirist suurem.',
      when: 'Liiga suure faili üleslaadimine.',
      line: 'Liiga palju! Ei mahu!',
      art: 'Väike hiir surub hiiglaslikku juustuketast oma urgu; juust on kinni jäänud ja sein praguneb sildi „MAX 10 MB” all.',
    },
    415: {
      mean: 'Server ei toeta seda andmevormingut.',
      when: 'XML JSON-i asemel, vale Content-Type.',
      line: 'Äkk! Seda ma ei söö! Vaata, mis mulle meeldib.',
      art: 'Pudipõllega koaala pöörab end ära ja lükkab laualt taldriku „XML” karbiga, kallistades eukalüptilehte kirjaga „JSON”.',
    },
    418: {
      mean: 'Naljakood RFC 2324-st: teekann keeldub kohvi keetmast.',
      when: 'Lihavõttemunad API-des. Tore boonus tööintervjuul.',
      line: 'Olen teekann. Kohvi ei tule.',
      art: 'Portselanist teekannu kujuline ümar jõehobu auruab; kõrval tass kohvi ja kohvioad „kohvi ei tohi” sildi juures.',
    },
    422: {
      mean: 'Päring loeti läbi, aga andmed ei läbi valideerimist.',
      when: 'Tekst numbri asemel, negatiivne vanus, „email: banana“.',
      line: 'Lugesin. Aga vanus -5? Tõsiselt?',
      art: 'Ümarate prillidega rähn istub korralikul vormil: „name: Ann” on rohelise linnukesega, „age: -5” ja „email: banana” punaste ristidega.',
    },
    429: {
      mean: 'Liiga palju päringuid lühikese ajaga; rakendus päringupiirang.',
      when: 'Pausideta skript, vastuses Retry-After päis.',
      line: 'Stopp! Liiga palju. Lase hingata.',
      art: 'Higine hamster sprindib rattas, samal ajal lendab välja ümbrike voog; ratta all olev klamber pidurdab seda.',
    },
    500: {
      mean: 'Serveris läks midagi ootamatult katki.',
      when: 'Käsitlemata erand backendi koodis.',
      line: 'Asi pole sinus, asi on minus.',
      art: 'Väike ükssarvik paanitseb: lakk sasitud, higipiisad lendamas, ja ta järel lohiseb pikk sassis koodi saba.',
    },
    502: {
      mean: 'Lüüs või proksi saatis päringu edasi, kuid sai serverilt vigase vastuse.',
      when: 'Nginx kokku jooksnud backendi ees.',
      line: 'Tuli katkisena. Mina ainult annan edasi!',
      art: 'Papagoi kahe serveri vahelisel kaablil kisab arusaamatut sõnamulli; tema taga olev server suitseb punase hoiatustule all.',
    },
    503: {
      mean: 'Server on ajutiselt kättesaamatu: ülekoormus või hooldus.',
      when: 'Plaaniline hooldus, ülekoormatud server.',
      line: 'Remondi tõttu suletud. Tule hiljem.',
      art: 'Suur öömütsiga karu magab hubases koopas sildi „Closed for maintenance” ja mutrivõtme kõrval.',
    },
    504: {
      mean: 'Lüüs või proksi saatis päringu edasi, kuid ei saanud serverilt vastust.',
      when: 'Aeglane backend nginxi või CDN-i taga.',
      line: 'Ootasin ja ootasin. Serverist pole vastust.',
      art: 'Alligaator nõjatub stopperiga avatud aiaväravale ja ootab; pikk tühi rada viib pisikese serverini kaugel eemal.',
    },
  },
  // "What to test": short test cases, steps → expected result (RSP-11).
  qa: {
    102: [
      'Käivita pikk toiming (nt suure faili import või suure kausta kopeerimine) ja oota lehte puudutamata → leht ootab ja näitab tulemust, timeout-viga ei tule.',
      'Pika toimingu ajal jälgi selle olekut kasutajaliideses → näha on edenemine ja „Valmis“ ilmub alles siis, kui toiming on päriselt lõppenud.',
    ],
    200: [
      'Salvesta kirje teadaolevate väärtustega, siis ava see (või loend, kus see on) → iga väli näitab täpselt seda, mis salvestati, midagi ei puudu ega ole üleliigset.',
      'Ava loend, kus pole veel midagi (nt uue konto tellimused) → sõbralik „Siin pole veel midagi“ ja olek 200, mitte vealeht.',
      'Saada vorm vigaste andmetega ja vaata Network vahekaarti → olek on 4xx, mitte 200 koos sisse peidetud veateatega.',
    ],
    201: [
      'Loo uus element (nt kommentaar või tellimus) ja ava loend → uus element on seal täpselt sisestatud väärtustega.',
      'Täida loomisvorm ja topeltklõpsa kiiresti „Saada“ → luuakse ainult üks element.',
      'Loo element, kopeeri selle link ja ava uuel vahekaardil → element avaneb.',
    ],
    204: [
      'Kustuta loendist element → see kaob kohe ilma veateateta ja ei tule pärast lehe värskendamist tagasi.',
      'Kopeeri elemendi link, kustuta element ja ava kopeeritud link → leht „ei leitud“ (404), mitte vana element.',
      'Ava kirje kahel brauseri vahekaardil. Kustuta see esimesel, siis proovi kustutada teisel → süsteem käsitleb seda viisakalt (nt „Elementi ei leitud“), serveri veata.',
    ],
    301: [
      'Ava vana URL, mis on kolinud (nt vana tootelink) → jõuad uuele lehele ja Network vahekaart näitab üht 301 hüpet, mitte ahelat.',
      'Ava vana URL lisatud parameetritega (nt ?page=2&sort=price) → uus leht avaneb samade parameetritega.',
      'Ava suvalise lehe http:// versioon → sind suunatakse https://-le olekuga 301, mitte 302 ega lehe koopiaga olekuga 200.',
    ],
    302: [
      'Logi välja, ava sisselogimist nõudev leht otselingiga ja logi sisse → jõuad sinna, kuhu nõuded ütlevad (tagasi sellele lehele või nt konto töölauale), mitte vea- või tühjale lehele.',
      'Leia sisselogimise URL-ist ümbersuunamise parameeter (nt ?next=/orders), asenda see välise saidiga (?next=https://example.com) ja logi sisse → jääd meie saidile.',
      'Saada vorm (nt kassas), siis vajuta kinnituslehel F5 → pole hoiatust „saada vorm uuesti“ ega teist tellimust.',
    ],
    304: [
      'Ava leht ja laadi see uuesti avatud Network vahekaardiga → muutmata pildid, skriptid ja stiilid tulevad tagasi kui 304.',
      'Muuda midagi nähtavat (nt toote nimi halduses) ja laadi leht tavaliselt uuesti → näha on uus väärtus, mitte vana vahemälust.',
      "Pärast deploy'd ava sait brauseris, mis on seal varem käinud, vahemälu tühjendamata → sait töötab vigadeta (vanad ja uued failid ei segune) ja uus versioon ilmub kohe või lubatud vahemäluaja jooksul.",
    ],
    400: [
      'Saada Postmanis (või DevToolsis) katkise JSON-iga või kohustusliku väljata request → olek 400, mitte 500.',
      'Saada sama katkine request ja loe veateadet → see ütleb, mis täpselt valesti on (milline väli, milline vorming).',
      "Vaata kogu veavastust → seal pole stack trace'i, failiteid ega SQL-i.",
    ],
    401: [
      'Logi välja ja ava privaatne leht (või kutsu selle API-t) otselingiga → saad sisselogimislehe või oleku 401, mitte sisu.',
      'Logi sisse, oota, kuni seanss aegub (või kustuta seansi küpsis), siis klõpsa midagi → sul palutakse uuesti sisse logida ja pärast sisselogimist saab jätkata.',
      'Logi välja, vajuta brauseris Tagasi ja proovi vanal lehel mõnda toimingut → ligipääsu pole, palutakse sisse logida.',
    ],
    403: [
      'Logi sisse tavakasutajana ja ava halduse URL otselingiga (nt /admin) → halduslehte ei avane (ligipääsu pole, sisselogimisleht või 404, nagu nõuded ütlevad).',
      'Logi sisse kasutajana A, ava üks oma tellimustest ja muuda URL-is id kasutaja B tellimuse omaks → B tellimust ei näidata.',
      'Kopeeri adminina DevToolsist ainult adminile lubatud toimingu request; saada tavakasutajana sama request → olek 403, midagi ei muutu.',
    ],
    404: [
      'Ava kirjaveaga URL (nt /prodcts) → sõbralik 404-leht koos teega tagasi (menüü, otsing või link avalehele).',
      'Ava element ja muuda URL-is selle id olematuks (nt 999999) → 404-leht, mitte serveri viga.',
      'Ava olematu leht avatud Network vahekaardiga → olek on päriselt 404, mitte 200 („soft 404“).',
    ],
    405: [
      'Saada Postmanis DELETE (või PUT) endpointi, mis ainult loeb andmeid (nt avalik loend) → olek 405, midagi ei kustutata.',
      'Vaata selle 405 vastuse päiseid → seal on Allow päis lubatud meetodite loendiga.',
      'Proovi endpointil iga toetamata meetodit → alati 405, mitte kunagi 404 ega 500.',
    ],
    408: [
      'Sea DevToolsis võrk Slow 3G peale ja saada suur vorm või lae üles suur fail → mõne aja pärast ilmub selge timeout-teade, mitte lõputu laadimisring.',
      'Pärast timeout-teadet pane võrk tavaliseks tagasi ja proovi uuesti → töötab ja sisestatud andmed on vormis alles.',
    ],
    409: [
      'Registreeru e-postiga, millel on juba konto → uut kontot ei looda ja teade on selline, nagu nõuded ütlevad (otse „See e-post on juba kasutusel“ või neutraalne „Vaata oma postkasti“).',
      'Ava sama kirje kahel vahekaardil. Muuda ja salvesta see esimesel, siis muuda ja salvesta teisel → teine salvestus hoiatab konflikti eest, mitte ei kirjuta vaikselt esimest muudatust üle.',
      'Loe konfliktiteadet → see ütleb, millega täpselt konflikt on (milline väli või milline versioon).',
    ],
    413: [
      'Leia üleslaadimise piir (nt 10 MB) ja lae üles failid veidi alla, täpselt piiril ja veidi üle → käitumine piiril vastab nõuetele (≤ või <) ja kõik suurem lükatakse tagasi.',
      'Võrdle üleslaadimisvälja juures olevat piiri suurusega, mis tegelikult tagasi lükatakse → need klapivad.',
      'Lae üles selgelt liiga suur fail → selge teade lubatud suurusega, mitte katkenud ühendus ega lõputu üleslaadimine.',
    ],
    415: [
      "Saada Postmanis korrektne JSON-sisu päisega Content-Type: text/plain (või ilma Content-Type'ita) → olek 415, mitte 500.",
      "Saada samad andmed XML-i või form-data'na endpointi, mis võtab ainult JSON-it → olek 415 ja teade, millist vormingut oodatakse.",
    ],
    418: [
      'Kui tootes on lihavõttemuna (nt /teapot), kutsu see välja ja siis mõni päris endpoint → päris endpointid töötavad tavapäraselt.',
      'Kontrolli pärast lihavõttemuna väljakutset monitooringut ja hoiatusi → tundmatu vea kohta häiret pole.',
    ],
    422: [
      'Sisesta vanuse väljale -5 (või vigane e-post: „banana“, „anna@“, „@mail.com“, „anna@@mail.com“, „anna k@mail.com“) ja saada → veateade otse selle välja all ja vormi ei saadeta.',
      'Täida mitu välja vigaste ja ülejäänud korrektsete väärtustega ning saada → kõik vead näidatakse korraga ja korrektsed väärtused jäävad alles.',
      'Proovi piirväärtusi ükshaaval: tühi kohustuslik väli, maksimaalne pikkus + 1 märk, sünnikuupäev tulevikus, 29. veebruar mitteliigaastal → igaüks lükatakse selge põhjusega tagasi.',
    ],
    429: [
      'Leia väljakuulutatud piirang (dokumentatsioon, vastuse päis või küsi arendajalt), nt 5 sisselogimiskatset minutis; tee täpselt nii palju katseid ja siis veel üks → blokeeritakse ainult see üleliigne.',
      'Kui blokeerimisaeg on läbi, proovi uuesti → töötab jälle.',
      'Jõua piirini kasutajana A, siis proovi kohe kasutajana B teises brauseris → kasutajat B ei tohiks blokeerida.',
    ],
    500: [
      "Eemalda DevToolsis (Elements vahekaart) väljalt maxlength, required või pattern ja saada vorm ootamatute andmetega: emoji, tekst ühe märgi võrra üle backendi või andmebaasi piiri, <script>, ' OR 1=1 → 500 ei tule: kas tavaline tulemus või valideerimisviga.",
      "Kui vorm valideerib JavaScriptiga, kopeeri request Network'is (Copy as fetch) või ava see Postmanis, pane samad andmed ja saada → jälle 500 ei tule.",
      'Kui 500 siiski juhtub, vaata lehte → kasutajale mõeldud teade ilma tehnilise infota (nt „Midagi läks valesti, proovi uuesti“).',
      'Pärast 500 vaata logisid või monitooringut → viga on seal koos aja, URL-i ja requesti üksikasjadega.',
    ],
    502: [
      'Peata testkeskkonnas backendi teenus ja ava sait → sõbralik vealeht, mitte toores nginxi või proksi leht.',
      'Loe seda vealehte ja selle vastust → sisemisi IP-aadresse, hostinimesid ega serveriversioone pole.',
      'Käivita backend uuesti ja laadi sait uuesti → töötab ilma lisasammudeta.',
    ],
    503: [
      'Lülita sisse plaanilise hoolduse režiim (või ava sait deploy ajal) → hooldusleht oodatava tagasituleku ajaga, mitte katkine paigutus.',
      'Ava hooldusleht avatud Network vahekaardiga → olek 503, mitte 200.',
      'Jälgi koormustesti ajal vastuseid koormuse kasvades → ülekoormuse korral saab osa requeste 503, aga sait ei kuku täielikult kokku ja taastub, kui koormus langeb.',
    ],
    504: [
      "Käivita aeglaseim toiming, mille leiad (nt aastaaruanne või täielik eksport) → pärast timeout'i ilmub selge teade, mitte lõputu laadimisring.",
      'Käivita väga pikk toiming ja lahku lehelt → see jätkub taustal ja saad teavituse (või valmis faili), kui see on valmis.',
      'Pärast timeout-teadet vajuta „Proovi uuesti“ → toiming algab uuesti ilma filtreid või andmeid uuesti sisestamata.',
    ],
  },
  // Traps: title, rule and the situations to sort, in the order of data/http/traps.js (the answers live there).
  traps: {
    '401-403': {
      title: 'Whoowl või Nopelican?',
      rule: '401: näita, kes sa oled, ja saad sisse. 403: teame, kes sa oled, ja ikkagi ei.',
      s: [
        'Token on aegunud.',
        'Sisseloginud kasutaja kustutab kellegi teise tellimuse.',
        'Requestil pole Authorization päist.',
        'Tavakasutaja avab /admin.',
      ],
    },
    '301-302': {
      title: 'Relocrab või Brbat?',
      rule: '301: kolis jäädavalt. 302: ajutiselt mujal, vana aadress on endiselt õige.',
      s: [
        'Sait kolis jäädavalt uuele domeenile.',
        'Pärast sisselogimist suunatakse sind tagasi eelmisele lehele.',
        'Kõik http-aadressid viivad nüüd jäädavalt https-ile.',
        'Allahindluse ajal suunab avaleht kampaanialehele.',
      ],
    },
    '200-201-204': {
      title: 'Okayak, Buildbeaver või Nullwing?',
      rule: '200: siin on tulemus. 201: loodi midagi uut. 204: tehtud, pole midagi näidata.',
      s: [
        'GET /orders tagastas tellimuste loendi.',
        'POST /orders lõi uue tellimuse.',
        'DELETE /orders/42 õnnestus ilma sisuta.',
      ],
    },
    '408-503': {
      title: 'Slowth või Hibearnate?',
      rule: '408: sina, klient, oled liiga aeglane. 503: server magab.',
      s: ['Klient hakkas suurt faili üles laadima ja jäi toppama.', 'Serveris käib plaaniline hooldus.'],
    },
    '500-502': {
      title: 'Panicorn või Parroxy?',
      rule: '500: server ise läks katki. 502: proksi saatis päringu edasi ja sai serverilt prügi.',
      s: ['Käsitlemata erand backendi koodis.', 'Nginx ei saanud backendilt korrektset vastust.'],
    },
    '429-503': {
      title: 'Spamster või Hibearnate?',
      rule: '429: sinult tuleb liiga palju requeste. 503: server on maas kõigi jaoks.',
      s: ['Sinu skript saadab tuhat requesti sekundis.', 'Server on ülekoormatud ega vasta kellelegi.'],
    },
    '400-404': {
      title: 'Garblin või Nowherret?',
      rule: '400: requesti ei saa lugeda. 404: loeti läbi, aga seal pole midagi.',
      s: ['JSON-is puudub sulgev looksulg.', 'GET /users/99999, aga sellist kasutajat pole.'],
    },
    '404-405': {
      title: 'Nowherret või Verbadger?',
      rule: '404: sellel aadressil ei ela keegi. 405: aadress on olemas, aga seda meetodit siin ei võeta vastu.',
      s: [
        'DELETE /products, kuigi tooteloend on ainult lugemiseks.',
        'GET /prodcts kirjaveaga aadressis.',
        'PUT aadressile /login, mis võtab vastu ainult POST-i.',
        'GET /orders/777 kustutatud tellimuse kohta.',
      ],
    },
    '409-422': {
      title: 'Clashgoat või Nitpecker?',
      rule: '409: andmed on korras, aga põrkuvad olemasolevaga. 422: andmetel endil pole mõtet.',
      s: [
        'Registreerumine juba kasutusel oleva e-postiga.',
        'Registreerumine e-postiga „banana“.',
        'Kaks inimest muudavad sama kirjet ja teine muudatus põhineb aegunud versioonil.',
        'Vanuse väljal on −5.',
      ],
    },
    '400-422': {
      title: 'Garblin või Nitpecker?',
      rule: '400: requesti ei saa isegi lugeda. 422: see loeti läbi, aga väärtustel pole mõtet. 400 on üldine kliendi viga: kui sobib täpsem kood, kasutab server seda.',
      s: [
        'JSON-is on sulgemata jutumärk ja parser kukub läbi.',
        'JSON on korrektne, aga sünnikuupäev on tulevikus.',
        'Requesti sisu on poolelt katkenud.',
        'Tellimus −3 tükile.',
      ],
    },
    '400-415': {
      title: 'Garblin või Pickoala?',
      rule: '400: vorming on õige, aga request on katki. 415: server ei võta seda vormingut üldse vastu. 400 on üldine kliendi viga: kui sobib täpsem kood, kasutab server seda.',
      s: [
        'Content-Type: application/xml endpointi, mis võtab ainult JSON-it.',
        'Content-Type: application/json, aga sisu on katkine JSON.',
        'Avatar laaditakse üles .exe-na .png asemel.',
        'JSON-is on pärast viimast välja koma.',
      ],
    },
    '502-504': {
      title: 'Parroxy või Waitgator?',
      rule: '502: proksi saatis päringu edasi ja sai serverilt prügi. 504: ta ei saanudki serverilt vastust.',
      s: [
        'Nginx sai backendilt vigase vastuse.',
        'Backend koostab aruannet 2 minutit, aga proksi ootab ainult 60 sekundit.',
        'Backend taaskäivitub ja katkestab ühenduse keset vastust.',
        'Andmebaas hangus, seega backend ei vastanud lüüsile kunagi.',
      ],
    },
    '408-504': {
      title: 'Slowth või Waitgator?',
      rule: '408: aeglane klient; server lõpetas requesti ootamise. 504: aeglane server lüüsi taga; lüüs lõpetas vastuse ootamise.',
      s: [
        'Nõrga mobiilse andmesidega telefon hakkab vormi saatma ja request jääb poolel teel toppama.',
        'CDN ei saanud sinu serverilt õigeks ajaks vastust.',
        'Klient avas ühenduse ega saada midagi.',
        'Proksi ootas makseteenuse mikroteenust, mis vaikib.',
      ],
    },
  },
  // Saidi päis ja jalus (RSP-156): samad loomaaia igal lehel.
  site: {
    nav: 'Saidi menüü',
    langHint: {
      label: 'Saidi keel',
      text: 'Mnemozoo on ka eesti keeles.',
      open: 'Ava',
      close: 'Sulge',
    },
    map: 'Kaart',
    about: 'Projektist',
    foot: 'Originaalsed tegelased ja tekstid; olekute nimed IANA registri järgi.',
    news: 'Mis on uut', // footer and "How to use" link to the What's new page (RSP-145)
    contact: 'Viga? Tagasiside?', // footer mail link (RSP-139, RSP-147)
    mail: 'e-post', // screen-reader note after the footer mail link
    page: 'Leht', // first line of the feedback mail: "Leht: <address>"
    ext: 'väline sait', // screen-reader note after LinkedIn and GitHub in the footer
  },
  // "What's new" page /<lang>/news/ (RSP-145): page texts; entries in the order of data/news.js, items in the
  // order of its kinds. Plain language, what the visitor gets, no ticket numbers.
  news: {
    title: 'Mis on uut · Mnemozoo',
    h1: 'Mis on uut',
    lead: 'Mis Mnemozoos muutus, uuemad eespool.',
    kinds: { new: 'Uus', improved: 'Täiustatud', fixed: 'Parandatud' },
    entries: {
      'advent-preview': {
        title: 'Git kolib sisse',
        line: 'Git Mnemozoos: alates 1. detsembrist iga päev uus käsk, mida selgitab kodune stseen.',
        items: [
          'Advendisein: 25 ust, esimene avaneb 1. detsembril.',
          'Git-käskude rühmadel on ikoonid, mitte ainult värv.',
          'Keeleta aadressid avavad kohe ingliskeelse lehe ja pakuvad vahetada sinu keelele.',
        ],
      },
      'footer-news': {
        title: 'Jalus ja uudised',
        line: 'Nüüd on lihtne meile kirjutada ja näha, mis saidil muutus.',
        items: [
          'Nüüd saad jaluses oleva lingi kaudu tagasisidet jätta või veast teatada.',
          'Kõik saidi muudatused on nüüd koos ühel lehel — siin.',
          'Lingid LinkedInile ja GitHubile on nüüd iga lehe allosas.',
        ],
      },
      visitors: {
        title: 'Külastajad',
        line: 'Sait mäletab sinu keelt ja avaneb telefonis kiiremini.',
        items: [
          'Sait avaneb keeles, mille valisid viimati.',
          'Telefonis ilmuvad lehed kiiremini.',
          'Loendame külastusi ilma küpsisteta ega jälgi sind.',
        ],
      },
    },
  },
  // Labor /<lang>/lab/ (RSP-209) ja „Testimine ringiratast" /<lang>/lab/geometry/circles/ (RSP-211). Mustand.
  lab: {
    title: 'Labor · Mnemozoo',
    description: 'Minu enda mnemoonikad ja skeemid testijatele: testiliigid ühel tooteringil ja muud.',
    sign: 'Labor · omad meetodid',
    h1: 'Labor',
    lead: 'Mnemoonikad ja skeemid, mille olen ise välja mõelnud. Need on minu kokkulepped, mitte standard: kus need ISTQB-st erinevad, ütlen seda otse.',
    name: 'Labor',
    crumbs: 'Leivapururada',
    geometry: {
      title: 'Testimise geomeetria · Labor · Mnemozoo',
      name: 'Testimise geomeetria',
      lead: 'Testiliigid kujunditena: millist osa tootest me kontrollime ja kui sügavalt.',
    },
    circles: {
      title: 'Testimine ringiratast · Labor · Mnemozoo',
      description: 'BVT, smoke, sanity, regressioon, korduvtest ja tavaline teisipäev ühel tooteringil.',
      name: 'Testimine ringiratast',
      crumb: 'Ringiratast',
      card: 'BVT, smoke, sanity, regressioon, korduvtest ja tavaline teisipäev ühel tooteringil. Täide näitab sügavust, sisemine ring kriitilist funktsionaalsust.',
      go: 'Vaata ringi →',
      lead: 'Proovime ringidel näidata, kuidas testiliigid erinevad. Diagramm on väga lihtsustatud ega püüa näidata kõiki liike. Aga kontrolli, kas see klapib sinu kogemusega.',
      howTitle: 'Kuidas ringi lugeda',
      legend: {
        core: 'kriitiline funktsionaalsus',
        build: 'build (paigaldus)',
        new: 'uus funktsionaalsus',
        bug: 'parandatud viga',
        shallow: 'pinnapealselt',
        deep: 'sügavuti',
        either: 'testimise sügavus sõltub sellest, kui oluline on funktsionaalsus',
      },
      panelsLabel: 'Kuus testiliiki',
      panels: {
        bvt: {
          name: 'BVT',
          caption: 'build elab',
          line: 'Viirutatud on ainult keskpunkt: kontrollime, et build on paigaldatud ja käivitub. Funktsionaalsust veel ei puuduta.',
          alt: 'Viirutatud on ainult lilla keskpunkt.',
        },
        smoke: {
          name: 'Smoke',
          caption: 'kriitiline, pinnapealselt',
          line: 'Kriitiline funktsionaalsus on viirutatud: läbime kõik peamised stsenaariumid, kuid mitte sügavuti. Kas seda buildi saab üldse testida?',
          alt: 'Sisemine ring on viirutatud, keskpunkt mitte.',
        },
        sanity: {
          name: 'Sanity',
          caption: 'lõige kriitiliseni',
          line: 'Õhuke täidetud kiil: üks tee läbi uue funktsionaalsuse kuni kriitilise funktsionaalsuseni välja. Kas muudatust tasub edasi testida?',
          alt: 'Õhuke täidetud kiil uuest sektorist läbi kriitilise funktsionaalsuse keskpunktini.',
        },
        regression: {
          name: 'Regressioon',
          caption: 'vana jääb terveks',
          line: 'Kõik vana on triibuline: kontrollime, et muudatus ei rikkunud midagi. Pinnapealselt või sügavuti, sõltuvalt riskist.',
          alt: 'Kogu ring on triibuline, välja arvatud uus sektor ja keskpunkt.',
        },
        retest: {
          name: 'Korduvtest',
          aka: '(confirmation testing)',
          caption: 'ainult see viga',
          line: 'Täidetud on ainult rõngas vea ümber: kontrollime, et parandati just see viga, ja mitte midagi selle ümber.',
          alt: 'Ainult täidetud rõngas vea ümber.',
        },
        tuesday: {
          name: 'Tavaline teisipäev',
          caption: 'kõik koos',
          line: 'Build on viirutatud, uus täidetud kuni kriitilise funktsionaalsuseni, vana triibuline, lisaks korduvtesti rõngas: nii näeb väljalasketsükkel tavaliselt välja.',
          alt: 'Viirutatud keskpunkt, uus sektor täidetud kuni keskpunktini, ülejäänu triibuline, täidetud rõngas vea ümber.',
        },
      },
      istqbTitle: 'Ausalt terminitest',
      istqb:
        'ISTQB sõnastikus on sanity test smoke testi sünonüüm. Praktikas eristatakse neid sageli: smoke on lai ja pinnapealne, sanity kitsas ja sügav. Sellel lehel on näidatud praktiline tähendus. Korduvtesti nimetab ISTQB confirmation testing.',
    },
  },
  // Avaleht /<lang>/ (RSP-156).
  notFound: {
    title: '404: siin ei ela kedagi · Mnemozoo',
    h1: 'Sellel aadressil ei ela kedagi',
    text: 'Võib-olla on leht kolinud või on aadressis trükiviga.',
    back: 'Tagasi loomaaeda →',
  },
  home: {
    title: 'Mnemozoo: tehnikaloomaaed sinu mälule',
    description:
      'Originaalsed olendid HTTP olekukoodidele: kaart iga koodi kohta, harjutamine ja lõksud sarnaste koodidega. Kõigis saidi keeltes.',
    kicker: 'IT memo zoo',
    h1: 'Saa vastus enne, kui küsidki',
    lead: 'Originaalsed olendid HTTP olekukoodidele, mida kohtad iga päev brauseris, logides ja konsoolis. Kaart, harjutamine, lõksud sarnaste koodidega. Kõigis saidi keeltes.',
    mapTitle: 'Loomaaia kaart',
    httpSign: 'Metsloomad · avatud', // zone sign with its status (RSP-170)
    httpName: 'HTTP olekukoodid',
    httpText: (n, first, last) =>
      `${n} ${n === 1 ? 'olend' : 'olendit'} vahemikus ${first}–${last}. Kaart iga koodi kohta, harjutamine neljas režiimis, lõksud koodidega, mida aetakse segi.`,
    enter: 'Tutvu elanikega →',
    // announcement sign (RSP-195): the date is the advent start (ADVENT_START), in the page language
    gitSign: (date) =>
      `Lemmikloomad · avatakse ${date.replace(/(\S+)$/, (m) => ({ november: 'novembril', detsember: 'detsembril' })[m] || m)}`,
    // from the advent start: the Git enclosure is open and links to the advent wall
    gitOpenSign: 'Lemmikloomad · avatud',
    gitEnter: 'Ava jõulukalender →',
    gitText: 'Git-käsud igapäevaste stseenidena. Avame jõulukalendriga: iga päev uus kaart.',
    pavilionSign: 'Teemapaviljon', // singular: the sign hangs on the pavilion itself
    pairsName: 'Sarnased liigid',
    pairsText: 'Paarid, mida aetakse segi: 401 ja 403, 502 ja 504. Reegel ja olukorrad sorteerimiseks.',
    pairsLink: (n) => `${n} ${n === 1 ? 'paar' : 'paari'} HTTP aedikus →`,
    howTitle: 'Kuidas see töötab',
    steps: [
      ['Tutvu', 'Olendi kaart: mida kood tähendab, kus sellega kokku puutud ja mida testida.'],
      ['Harjuta', 'Pildist koodini ja vastupidi. Kaks õiget vastust järjest ja kood saab ✓.'],
      ['Ära aja segi', 'Lõksud sarnaste koodidega: üks reegel ja mõned olukorrad sorteerimiseks.'],
    ],
    whyTitle: 'Milleks treenida mälu, kui on AI?',
    why: [
      'See vastab küsimustele. Aga küsida saad ainult selle kohta, millest tead. Kui logides vilksatab 429 ja sa tead, miks just see olek tekib, säästad paar küsimust ja tokenit 😉',
      'Mnemozoo treenib just äratundmist. See sait on tehtud AI-ga, kuid AI ei mõtle sinu eest.',
    ],
    aboutTitle: 'Projektist',
    aboutText: 'Maryna Bortnyki sõltumatu QA-projekt.',
    gitLogo: 'Giti logo:',
  },
  // "Tools and Read more": labels for data/http/links.js TOOLS, in the same order.
  tools: ['Chrome DevTools: Network paneel', 'Firefox: Edit and Resend', 'Postman: päringu saatmine'],
  // Git rubric (RSP-199, RSP-200): labels of the git card page, the household names of the git groups (data/git/groups.js),
  // and the card texts git.cards.<id> (scene title, caption, "$" line, page sections), added card by card with RSP-200.
  git: {
    ui: {
      back: 'Tagasi advendikalendrisse',
      does: 'Mida teeb',
      tip: 'Nõuanne',
      opts: 'Valikud',
      file: 'Read failis',
      cmds: 'Käsud',
      careful: 'Ettevaatust',
      conf: 'Sageli aetakse segi',
      // c = the list where git help shows the command's section, already as HTML (<code>git help -a</code>)
      help: (c) => `Jaotis ${c}-is`,
      // before `git help <command>`, the command's own manual
      manual: 'Dokumentatsioon git-scm.com-is (inglise keeles)',
      danger: 'Ohtlik käsk',
      // heading of the outside links on a git card page
      links: 'Loe lisaks',
    },
    // the advent wall /<lang>/git/ (RSP-195): door labels for screen readers, the flags on the paper
    wall: {
      title: 'Git-jõulukalender',
      // n = the number of advent days (25 since 2026-11-17)
      lead: (date, n) =>
        `${n} git-käsku, iga päev üks luuk. Esimene luuk: ${date}. Vahele jäänud päevi saab hiljem avada.`,
      intro:
        'Git™-i ametlik dokumentatsioon on täis koduseid sõnu: igapäevaseid käske nimetatakse seal „portselaniks“ (porcelain) ja kõike, mis nende all töötab, „torustikuks“ (plumbing); pooleli töö pannakse peitu (`git stash`), kuivad oksad lõigatakse ära (`git prune`), prügi korjatakse kokku (`git gc`) ja tähtsale asjale kinnitatakse silt (`git tag`). Sellest sai git-käskude assotsiatiivse õppimise alus: kodused stseenid ja lemmikloomad, keda leiad igalt kaardilt.',
      today: 'täna',
      // short, it has to fit a small door on a phone (Maryna, 2026-11-17: «забули?»)
      missed: 'ootab',
      // phone: the big door of today above the wall (prototype AdventPhone, 2026-11-17)
      todayHint: 'Ava tänane luuk',
      legend: 'Rühmad',
      locked: (n, date) => `Päev ${n}, avaneb: ${date}`,
      paperToday: (n) => `Päev ${n}, täna, ava luuk`,
      paperMissed: (n) => `Päev ${n}, ootab, ava luuk`,
      bigToday: (n) => `Päev ${n}, täna. Ava tänane luuk`,
      open: (n, cmd) => `Päev ${n}: ${cmd}, ava kaart`,
      revealed: (n, cmd) => `Päev ${n}: ${cmd}. Vajuta uuesti, et kaart avada.`,
    },
    groups: { start: 'Sissekolimine', home: 'Kodus', visit: 'Külaskäik', archive: 'Pööning', post: 'Post' },
    cards: {
      // Pictures ready (RSP-191, RSP-192): only their text for now; the other card texts come with RSP-200.
      init: {
        title: 'Tühi korter',
        line: 'Alustame puhtalt lehelt.',
        move: '$ git init -b main',
        hint: 'uus hoidla, esimene haru main',
        does: {
          text: 'Loob praegusesse kausta uue tühja hoidla (repository): peidetud kausta `.git`, kus git hoiab kogu ajalugu. Kausta failid jäävad, nagu olid; git neid veel ei jälgi. Kommitte veel pole, seega `git branch` ei näita midagi: haru tekib koos esimese kommitiga.',
          meta: 'Uus korter: seinad on olemas, mööblit veel pole, ja esimesena astub sisse kass.',
        },
        tip: 'Projekt on juba GitHubis või mujal? Siis mitte init, vaid `git clone <url>`: see loob ise kausta ja toob kogu ajaloo.',
        opts: [
          {
            cmd: 'git init',
            text: '— uus hoidla praeguses kaustas. Olemasolevas hoidlas uuesti käivitada on ohutu: midagi ei kustutata.',
            meta: 'Paned nimesildi selle korteri uksele, kus juba elad.',
          },
          {
            cmd: 'git init <kaust>',
            text: '— loob sellenimelise kausta (kui seda veel pole) ja sinna hoidla.',
            meta: 'Ehitad uue korteri ja paned kohe nimesildi üles.',
          },
          {
            cmd: 'git init -b main',
            text: '— määrab esimese haru nime; ilma selleta kasutab git 2.43 nime `master` ja näitab vihjet, kuidas seda muuta.',
            meta: 'Kuidas esimest tuba nimetada, otsustad sina.',
          },
        ],
        art: 'Hall kass seisab pärani avatud ukse lävel ja astub esimesena käpaga tühja korterisse: mööblit pole, seinal ainult tühi raam. Tema taga inimene kohvritega, ühel neist lambipirni kleeps. Ukse kõrval üks uus nimesilt.',
      },
      gitignore: {
        title: 'Ketšup nina all',
        line: 'Emme, kus ketšup on?',
        move: '$ git check-ignore -v <fail>',
        hint: 'milline reegel selle faili peidab',
        does: {
          text: 'Mitte käsk, vaid fail hoidla juurkaustas: mustrite loend (`*.log`, `node_modules/`, `.env`), mida git ei näita jälgimata failide (untracked) seas ega lisa käsuga `git add .`. Toimib ainult failidele, mida git veel ei jälgi; `.gitignore` ise kommititakse, et reeglid oleksid kõigil samad.',
          meta: 'Nimekiri külmkapi uksel: mida mitte märgata, isegi kui see seisab otse silme ees.',
        },
        tip: 'Fail on juba kommitis? `.gitignore` seda ei peida: kõigepealt `git rm --cached <fail>` — git lõpetab selle jälgimise ja koopia kettal jääb alles.',
        file: [
          {
            line: '*.log',
            text: 'Muster: kõik selle lõpuga failid igas kaustas; `/` lõpus (`build/`) tähendab ainult kaustu.',
            meta: 'Ära märka ühtegi tühja pudelit, kus iganes see seisab.',
          },
          {
            line: '!keep.log',
            text: '`!` alguses toob tagasi faili, mille ülemine reegel peitis.',
            meta: 'Välja arvatud see — see jääb.',
          },
        ],
        opts: [
          {
            cmd: 'git add -f <fail>',
            text: '— lisab faili hoolimata `.gitignore`-ist; edaspidi git jälgib seda.',
            meta: 'Paned teadlikult korvi selle, mida tavaliselt ei märka.',
          },
        ],
        art: 'Seinal on portree kassist, kes istub selg oma kalakausi poole. Inimene seisab avatud külmkapi ees, sügab kukalt ja mõtleb, kus ketšup on, kuigi ketšupipudel seisab otse tema ees keskmisel riiulil. Külmkapi uksel ripub magneti all nimekiri.',
      },
      restore: {
        title: 'Nagu fotol',
        line: 'Ettevaatust, ema koristab — tagajärgede eest me ei vastuta',
        move: '$ git restore --staged <fail>',
        hint: 'korvist tagasi, muudatused failis jäävad',
        does: {
          text: 'Viib töökausta faili tagasi indeksi olekusse ehk viskab minema muudatused, mida pole veel lisatud. `git restore --staged <fail>` teeb vastupidi: võtab faili indeksist välja ja jätab töökausta nii, nagu see on. Kommitite ajalugu ei muuda.',
          meta: 'Ema koristab toa nagu fotol: mis pooleli, see kaob.',
        },
        tip: 'Tee on kohustuslik: `git restore .` taastab kogu kausta. Varem tehti seda käsuga `git checkout -- <fail>`.',
        opts: [
          {
            cmd: 'git restore <fail>',
            text: '— viskab minema töökausta muudatused, mida indeksis veel pole.',
            meta: 'Laiali loobitu läheb tagasi riiulile.',
          },
          {
            cmd: 'git restore --staged <fail>',
            text: '— võtab faili indeksist välja (unstage); muudatused töökaustas jäävad.',
            meta: 'Võtad asja korvist välja, aga ei pane seda kohale.',
          },
          {
            cmd: 'git restore --source <kommit> <fail>',
            text: '— võtab faili antud kommitist, nt `HEAD~1`.',
            meta: 'Koristad vanema foto järgi.',
          },
        ],
        careful: [
          'Ära visatud muudatused kaovad jäädavalt: neid pole ei ajaloos ega `git reflog`-is.',
          'Enne `git restore` vaata `git diff`. Kui on kahju ära visata, siis kõigepealt `git stash`.',
        ],
        art: 'Seinal on portree jänesest, kes on sussi närinud. Ema hoiab üleval fotot korras riiulist, „nagu oli“, ja pühib otsustavalt pooleli pusle põrandalt kühvlisse, tükid lendavad kühvlisse. Toa uksel karjub laps, käed üleval. Paremal näeb riiul juba välja nagu fotol: korralikud karbid, nende seas puslekarp.',
      },
      stash: {
        title: 'Külalised ukse taga',
        line: 'Koristan kiiresti ära!',
        move: '$ git stash -u',
        hint: 'peida ka uued failid',
        does: {
          text: 'Peidab jälgitavate failide kommitimata muudatused (nii indeksis kui ka töökaustas) eraldi hoidlasse ja viib töökausta tagasi viimase kommiti olekusse. Hiljem saab need välja võtta, ka teises harus.',
          meta: 'Uksekell heliseb: topid pooleli asjad kappi, et tuba näeks korras välja.',
        },
        tip: 'Peidikuid võib olla mitu: `git stash list` näitab kõiki, `stash@{0}` on uusim.',
        opts: [
          {
            cmd: 'git stash pop',
            text: '— toob viimase peidiku töökausta tagasi ja eemaldab selle loendist; `git stash apply` toob tagasi, aga jätab loendisse alles.',
            meta: 'Külalised läksid — võtad kampsuni kapist välja.',
          },
          {
            cmd: 'git stash -u',
            text: '— peidab ka uued failid, mida git veel ei jälgi. Tavaline `git stash` jätab need töökausta; `.gitignore` faile peidab ainult `git stash -a`.',
            meta: 'Kappi lendab ka see, millel pole veel oma kohta.',
          },
          {
            cmd: 'git stash -m "…"',
            text: '— kirjeldusega peidik, et selle hiljem `git stash list`-ist üles leida.',
            meta: 'Silt lõngakerale: mis see on ja milleks.',
          },
        ],
        careful: [
          '`git stash drop` ja `git stash clear` kustutavad peidikud jäädavalt: neid pole `git reflog`-is.',
          'Enne kustutamist vaata sisse: `git stash show -p`. Just kustutatud? `git stash drop` trükib peidiku räsi ja `git stash apply <räsi>` toob selle veel tagasi.',
        ],
        art: 'Seinal on portree täis põskedega hamstrist. Kui uksekell heliseb, toppib inimene kikivarvul kiiruga kampsuni ja lõngakera ülemisse kappi, mille uks on meie poole lahti; keskmisel riiulil seisavad ühesugused kruusid.',
      },
      branch: {
        title: 'Uus nimesilt',
        line: 'Oh, sellest saab minu tuba.',
        move: '$ git branch -d <haru>',
        hint: 'kustuta juba liidetud haru',
        does: {
          text: 'Ilma argumentideta näitab kohalikke harusid ja märgib praeguse tärniga `*`. Nimega loob praegusele kommitile uue haru, aga sellele ei lülitu: selleks on `git switch`.',
          meta: 'Paned uue toa uksele nimesildi, aga ise jääd sinna, kus olid.',
        },
        tip: 'Lõite haru, aga kommitid lähevad ikka vanasse? `git branch` on ainult nimesilt. Üle minekuks on vaja `git switch <haru>`, loomiseks ja kohe üleminekuks `git switch -c <haru>`.',
        opts: [
          {
            cmd: 'git branch -a',
            text: '— näitab ka kaugharusid (`remotes/origin/…`).',
            meta: 'Nimesildid kõigil ustel, ka naabritel.',
          },
          {
            cmd: 'git branch -m <uus nimi>',
            text: '— nimetab praeguse haru ümber.',
            meta: 'Kirjutad nimesildi ümber.',
          },
          {
            cmd: 'git branch -d <haru>',
            text: '— kustutab haru, kui see on juba liidetud; liitmata haru kustutab ainult `git branch -D <haru>`.',
            meta: 'Võtad nimesildi maha toast, kust kõik on juba välja viidud.',
          },
        ],
        art: 'Seinal on portree papagoist õrrel. Kaks kõrvuti avatud ust viivad kahte ühesugusesse tuppa, kus on sama tugitool ja aken; põrandal olev vaip hargneb mõlema ukse juurde. Vasaku ukse kõrval on vana nimesilt; inimene paneb parema ukse kõrvale uut kollast nimesilti.',
      },
      switch: {
        title: 'Uus tuba',
        line: 'Aeg kolida teise tuppa',
        move: '$ git switch -c <haru>',
        hint: 'loo haru ja mine kohe sinna',
        does: {
          text: 'Lülitub teisele harule: töökaust ja indeks muutuvad selliseks nagu selle viimases kommitis. Kommitimata muudatused tulevad kaasa; kui need lähevad selle haru failidega vastuollu, git peatub ja palub need kommitida või peita (`git stash`).',
          meta: 'Kõnnid mööda vaipa teise tuppa ja see, mis sul käes, tuleb kaasa.',
        },
        tip: '`git switch` võttis üle osa vanast `git checkout`-ist, mis oskab nii harusid vahetada kui ka faile taastada.',
        opts: [
          {
            cmd: 'git switch -c <haru>',
            text: '— loob uue haru ja lülitub kohe sellele.',
            meta: 'Paned nimesildi üles ja astud sisse.',
          },
          { cmd: 'git switch -', text: '— läheb tagasi eelmisele harule.', meta: 'Tagasi tuppa, kust just tulid.' },
          {
            cmd: 'git switch --detach <kommit>',
            text: '— läheb kommitile ilma haruta (detached HEAD), et ringi vaadata; uued kommitid lähevad siin kergesti kaotsi.',
            meta: 'Piilud vana foto tuppa, aga elada seal ei tasu.',
          },
        ],
        careful: [
          '`git switch --discard-changes <haru>` ja `git switch -f <haru>` viskavad kommitimata muudatused jäädavalt ära: neid pole ei ajaloos ega `git reflog`-is.',
          'Ilma nende valikuteta peatub git ise, kui muudatused segavad. Kui on kahju ära visata, siis kõigepealt kommiti või `git stash`.',
        ],
        art: 'Seinal on portree papagoist: kahest õrrest istub ta ülemisel, alumine on tühi. Kaks kõrvuti avatud ust viivad kahte ühesugusesse tuppa; põrandal olev vaip hargneb mõlema ukse juurde; parem uks on kollane. Inimene astub pika sammuga vasaku ukse juurest paremasse tuppa, jäljed vaibal viivad vasakult harult paremale.',
      },
      clone: {
        title: 'Möbleeritud korter',
        art: 'Kohvritega inimene, ühel kohvril lambipirni kleebis, seisab pärani avatud ukse ees. Korteris on juba eelmiste üürnike tugitool, sellel vanade arvetega kaust, ja seinal ripub kahe ühesuguse kassipoja portree. Ukse kõrval uus nimesilt, vana kukub maha.',
        line: 'Keegi elas siin, nüüd olen mina.',
        move: '$ git clone --depth 1 <url>',
        hint: 'ainult viimane seis, ilma vana ajaloota',
        does: {
          text: 'Kopeerib kaughoidla uude kausta: kogu ajaloo ja harud (kui `origin/…`) ning lülitub põhiharule. git jätab aadressi meelde nimega `origin`, nii et hiljem töötavad `git fetch`, `git pull` ja `git push`.',
          meta: 'Kolid möbleeritud üürikorterisse: kõik, mis eelmised üürnikud maha jätsid, on alles, isegi vanade arvetega kaust.',
        },
        tip: 'Projekti pole veel kuskil? Siis mitte clone, vaid `git init`: see loob praegusesse kausta tühja hoidla. Ja fork pole git-käsk, vaid nupp GitHubis: kellegi teise hoidla koopia sinu kontol, mille sa siis kloonid.',
        opts: [
          {
            cmd: 'git clone <url> <kaust>',
            text: '— kopeerib sinu valitud nimega kausta, mitte hoidla nimega.',
            meta: 'Ise valid, mis uue korteri uksele kirjutada.',
          },
          {
            cmd: 'git clone -b <haru> <url>',
            text: '— lülitub kohe antud harule, mitte põhiharule.',
            meta: 'Lähed kohe sellesse tuppa, mida vaja.',
          },
          {
            cmd: 'git clone --depth 1 <url>',
            text: '— ainult viimane commit ja ainult üks haru; kiire, aga ajalugu pole.',
            meta: 'Möbleeritud korter, aga ilma vanade arvete kaustata.',
          },
        ],
      },
      status: {
        title: 'Kolm hunnikut',
        art: 'Seinal luubiga kassi portree. Inimene vaatab rahulikult kolme riidehunnikut: rataste peal korvist paistavad välja sokk, varrukas ja käterätik, põrandal on kantud riided ja nende kõrval kokkuvolditud uus särk suure poesildiga.',
        line: 'Mis meil siin on? Vaatame järele.',
        move: '$ git status -s',
        hint: 'sama ülevaade, üks rida asja kohta',
        does: {
          text: 'Näitab töökausta ja indeksi seisu: millised muudatused on juba commitiks ette valmistatud (staged), millised on muudetud, aga veel ette valmistamata, ja milliseid faile git ei jälgi (untracked). Midagi ei muuda.',
          meta: 'Laotad asjad kolme hunnikusse ja vaatad, mis kus on.',
        },
        tip: 'Käivita see enne igat käsku `git add` ja `git commit`: nii ei satu commiti midagi üleliigset.',
        opts: [
          {
            cmd: 'git status -s',
            text: '— üks rida faili kohta; vasak veerg on indeks, parem töökaust (`M` muudetud, `A` lisatud, `??` untracked).',
            meta: 'Sama ülevaade, üks rida asja kohta.',
          },
          {
            cmd: 'git status --ignored',
            text: '— näitab ka faile, mida `.gitignore` peidab.',
            meta: 'Vaatad ka sinna, kuhu tavaliselt ei vaata.',
          },
        ],
      },
      add: {
        title: 'Korvi',
        art: 'Seinal portree kassist, kes magab korvis. Inimene paneb sinise asjade kimbu rataste peal korvi, kus on juba sokk, varrukas ja käterätik; põrandal on veel kampsun ja sokk, mida pole lisatud.',
        line: 'Korista palun oma tuba ära.',
        move: '$ git add -p',
        hint: 'lisa osa muudatustest, tükk tüki haaval',
        does: {
          text: 'Lisab faili praeguse seisu indeksisse (staged): just see läheb järgmisse commiti. Uut faili hakkab git pärast käsku `git add` jälgima.',
          meta: 'Paned asjad korvi, et need hiljem kasti pakkida.',
        },
        tip: 'Muutsid faili pärast käsku `git add`? Lisa see uuesti: indeksis on seis lisamise hetkest. Ja pärast ühendamiskonflikti märgib just `git add <fail>` faili lahendatuks.',
        opts: [
          {
            cmd: 'git add <fail>',
            text: '— lisab ühe faili (või kausta).',
            meta: 'Üks asi korvi.',
          },
          {
            cmd: 'git add .',
            text: '— kõik muudatused praeguses kaustas ja allpool, ka uued ja kustutatud failid.',
            meta: 'Pühid kõik toast korvi.',
          },
          {
            cmd: 'git add -p',
            text: '— näitab muudatusi tükkidena (hunks) ja küsib iga kohta; uusi (untracked) faile ei paku.',
            meta: 'Sorteerid hunniku läbi ja paned korvi ainult vajaliku.',
          },
        ],
      },
      commit: {
        title: 'Sildiga kast',
        art: 'Pööning. Kastide virn, igal pildiga silt: all kuusk, selle peal jõulukuul. Inimene kleebib majakesega sildi uuele kollasele kastile virna otsas. Kõrval on tühi rataste peal korv ja virna vastu on toetatud vana portree käbiga oravast.',
        line: 'Mis selles kastis on?',
        move: '$ git commit -m "…"',
        hint: 'sõnum kohe, ilma redaktorita',
        does: {
          text: 'Salvestab indeksi sisu uue commitina praeguse haru ajalukku: autori, kuupäeva ja sõnumiga. Töökaust ei muutu; commit jääb kohalikuks, kuni teed `git push`.',
          meta: 'Pakid asjad kasti, paned sildi peale ja viid pööningule.',
        },
        tip: 'Üks commit, üks mõte; kirjuta sõnumisse „miks“, mitte ainult „mis“.',
        opts: [
          {
            cmd: 'git commit -m "…"',
            text: '— sõnum käsurealt, ilma redaktorita.',
            meta: 'Pane kastile silt.',
          },
          {
            cmd: 'git commit -a',
            text: '— lisab kõigepealt ise jälgitavate failide muudatused (muudetud ja kustutatud), aga mitte uusi faile. Tavaliselt kirjutatakse koos sõnumiga: `git commit -am "…"`.',
            meta: 'Tuttav pööningule, uus jääb.',
          },
          {
            cmd: 'git commit --amend',
            text: '— asendab viimase commiti uuega (praeguse indeksi ja/või uue sõnumiga). Ära tee seda commitiga, mis on juba käsuga `git push` ära saadetud.',
            meta: 'Vahetad pööningult toodud kasti sildi, enne kui see ära saadetakse.',
          },
        ],
      },
      log: {
        title: 'Perealbum',
        art: 'Lahtine rohelises kaanes perealbum. Neli fotot vanimast alates: majake puuga, kilpkonn, kaks inimest kõrvuti, meri ja päike; iga foto all loetamatu allkiri ja kuupäev, 09.11.1996 kuni 15.07.2007.',
        line: 'Kas soovite albumit vaadata?',
        move: '$ git log --oneline',
        hint: 'üks rida commiti kohta',
        does: {
          text: 'Näitab praeguse haru commitide ajalugu, uusim eespool: räsi, autor, kuupäev, sõnum.',
          meta: 'Lehitsed albumit viimasest fotost tagasi.',
        },
        tip: 'Pikk nimekiri avaneb lehitsejas (pager): `q` väljub, `/` otsib.',
        opts: [
          {
            cmd: 'git log --oneline',
            text: '— lühendatud räsi ja sõnumi esimene rida.',
            meta: 'Ainult allkirjad fotode all.',
          },
          {
            cmd: 'git log --graph',
            text: '— joonistab joontega harud ja ühendamised.',
            meta: 'Sugupuu fotohunniku asemel.',
          },
          {
            cmd: 'git log -p',
            text: '— näitab iga commiti muudatusi.',
            meta: 'Iga foto all: mis täpselt muutus.',
          },
          {
            cmd: 'git log -- <fail>',
            text: '— ainult commitid, mis seda faili muutsid.',
            meta: 'Kõik ühe inimese fotod.',
          },
        ],
      },
      diff: {
        title: 'Leia erinevused',
        art: 'Inimene toas hoiab korteri plaani ja võrdleb seda sellega, mida näeb. Plaanil on ümmargune laud, aga toas on sellest järel ainult kontuur põrandal; plaanil on põrandalamp tugitooli kõrval, toas aga teises otsas; vana tugitool on sama. Seinal portree kameeleonist, kes hoiab oma fotot, kus ta on teist värvi, ja nende vahel märk „ei võrdu“.',
        line: 'Leia kolm erinevust',
        move: '$ git diff --staged',
        hint: 'täpselt see, mis läheb järgmisse commiti',
        does: {
          text: 'Näitab rida-realt, mis muutus: `-` eemaldatud rida, `+` lisatud. Ilma valikuteta võrdleb töökausta indeksiga ehk näitab muudatusi, mida pole veel käsuga `git add` lisatud; uusi (untracked) faile ei näita.',
          meta: 'Võrdled „enne“ ja „pärast“ viimase pisiasjani.',
        },
        tip: 'Pärast käsku `git add` on tavaline `git diff` tühi, aga muudatused pole kuhugi kadunud: need on nüüd indeksis ja `git diff --staged` näitab neid.',
        opts: [
          {
            cmd: 'git diff --staged',
            text: '— indeks võrreldes viimase commitiga ehk see, mis läheb järgmisse commiti.',
            meta: 'Vaatad korvi, enne kui selle pööningule viid.',
          },
          {
            cmd: 'git diff HEAD',
            text: '— kõik muudatused võrreldes viimase commitiga, lisatud ja lisamata.',
            meta: 'Võrdled kogu tuba albumi viimase fotoga.',
          },
          {
            cmd: 'git diff --stat',
            text: '— ainult millised failid muutusid ja mitu rida.',
            meta: 'Erinevuste loend ilma üksikasjadeta.',
          },
        ],
      },
    },
  },
};
