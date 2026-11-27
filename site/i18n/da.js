// Danish: every text on the site in one file (RSP-85). Keys must match i18n/en.js; check with: node scripts/check-locales.mjs
// Drafted by Claude, reviewed by Maryna (2026-10-13). Status names and creature names stay in English (they live in data/).
// Terminology: "request" in What to test and Traps (testers' language); the formal term in card meanings.
export default {
  // Interface. Functions build texts that contain numbers or names.
  ui: {
    tag: 'Originale væsner, der hjælper dig med at huske HTTP-statuskoder. Hver kode har sin egen Responster, og hvert træk forklarer, hvad koden betyder.',
    appTitle: 'Responsters: husk, forstå og test HTTP-statuskoder',
    tabs: ['Samling', 'Træning', 'Fælder'],
    all: 'Alle',
    mastered: (a, b) => `${a} af ${b} lært`,
    known: 'kan',
    modeArt: 'Billede → kode',
    modeCode: 'Kode → væsen',
    modeArtHint: 'Se væsenet, vælg koden',
    modeCodeHint: 'Se koden, find væsenet',
    modeNerd: 'Nerd mode',
    modeNerdHint: 'Kun tekst: læs, hvad den betyder, vælg koden',
    modeHard: 'Hardcore',
    modeHardHint: 'Kun koden: vælg statusnavnet',
    modes: 'Træningstilstand',
    qArt: 'Hvilken kode er det?',
    qCode: 'Hvem er det?',
    qHard: 'Hvad hedder denne status?',
    hint: 'Hint',
    hintIs: (n) => `Det er ${n}`,
    hintUsed: 'Med hint: tæller med i scoren, men ikke til ✓.',
    score: (r, t, s) => `${r}/${t} · stime ${s}`,
    ok: 'Ja!',
    no: 'Ikke den.',
    next: 'Næste',
    mean: 'Hvad den betyder',
    when: 'Hvor du møder den',
    conf: 'Forveksles ofte med',
    qa: 'Hvad skal testes',
    links: 'Værktøjer og læs mere',
    traps: 'Par af koder, som folk oftest forveksler. Læs reglen, og sortér så situationerne.',
    lang: 'Sprog',
    close: 'Luk',
    back: 'Tilbage til samlingen',
    top: 'Til toppen',
    howto: 'Sådan bruger du det',
    howtoSteps: [
      '<b>Samling.</b> Tryk på et kort for at møde væsenet: hvad koden betyder, hvor du møder den, og hvad du skal teste.',
      '<b>Træning.</b> „Billede → kode“, „Kode → væsen“, „Nerd mode“ (kun tekst) eller „Hardcore“ (kun koden). To rigtige svar i træk giver koden sit ✓.',
      '<b>Fælder.</b> Par af koder, som folk forveksler: en regel og situationer, der skal sorteres.',
    ],
    howtoNote: 'Dine fremskridt gemmes kun i denne browser.',
    howtoClose: 'Forstået',
  },
  // Status classes 1xx–5xx: name and one-line rule.
  classes: {
    1: { name: 'Æg', rule: 'Klækker stadig: serveren har fået forespørgslen og arbejder på den.' },
    2: { name: 'Venner', rule: 'Det lykkedes.' },
    3: { name: 'Vandrere', rule: 'Det, du leder efter, er et andet sted.' },
    4: { name: 'Portvogtere', rule: 'Klientfejl: ret forespørgslen.' },
    5: { name: 'Serverbæster', rule: 'Serverfejl: det er ikke din skyld.' },
  },
  // Cards: what it means, where you meet it, and the card line in the creature's voice (max ~55 characters).
  cards: {
    102: {
      mean: 'Serveren har modtaget forespørgslen og arbejder stadig på den. Der er intet svar endnu.',
      when: "Lange WebDAV-operationer; sjælden i almindelige API'er.",
      line: 'Jeg er i gang! Intet resultat endnu.',
      art: 'Et lille rundt væsen kigger op over kanten af et revnet æg; skallen er malet som et indlæsningshjul og snurrer rundt.',
    },
    200: {
      mean: 'Forespørgslen lykkedes, og svaret indeholder resultatet.',
      when: 'GET af en side eller liste, en POST, der ikke oprettede en ressource.',
      line: 'Hvad kan jeg sige? Alt er godt!',
      art: 'En rolig, pjusket lille yak med små horn står på græsset og nikker tilfreds.',
    },
    201: {
      mean: 'En ny ressource er oprettet. Dens adresse står i Location-headeren.',
      when: 'POST /orders oprettede en ordre.',
      line: 'Splinterny! Jeg byggede den selv!',
      art: 'En bæver med gul sikkerhedshjelm står stolt ved en skinnende, splinterny bjælkehytte ved siden af et skilt, hvor der står „NEW“.',
    },
    204: {
      mean: 'Succes, men svaret har ingen body.',
      when: 'DELETE eller PUT uden noget at returnere.',
      line: 'Klaret! Der er bare intet at vise.',
      art: 'Et blegt, luftigt møl med glasagtige vinger sidder mæt og glad på et bræt ved siden af en tom bøjle og lidt uldkrummer; et grønt flueben svæver over det.',
    },
    301: {
      mean: "Ressourcen er flyttet permanent. Klienter og søgemaskiner bør opdatere URL'en.",
      when: 'Flytning til et nyt domæne eller fra http til https.',
      line: 'Flyttet for altid. Brug den nye adresse.',
      art: 'En eremitkrebs sidder i et skinnende nyt hus; bag den har det gamle, tomme hus et træskilt med en pil, der peger væk.',
    },
    302: {
      mean: 'Ressourcen er midlertidigt et andet sted. Den oprindelige URL er stadig korrekt.',
      when: 'Omdirigering efter login, en midlertidig kampagneside.',
      line: 'Væk lige nu. Tilbage snart.',
      art: 'En rund flagermus hænger med hovedet nedad og blinker ved siden af et skilt, hvor der står „BRB“; en buet pil peger på en lillebitte hule mærket „HOME“.',
    },
    304: {
      mean: 'Intet er ændret, siden du cachede det. Brug din kopi.',
      when: 'Browseren sendte If-None-Match eller If-Modified-Since.',
      line: 'Uændret. Tjek din cache.',
      art: 'En grøn kamæleon på en gren holder et polaroidbillede op af sig selv i præcis samme stilling, med et lighedstegn imellem.',
    },
    400: {
      mean: 'Forespørgslen er forkert udformet: syntaks, format eller ugyldige data.',
      when: 'Ødelagt JSON, et manglende obligatorisk felt, ugyldige query-parametre, en body, der er skåret over midtvejs.',
      line: 'Sikke noget vrøvl! Jeg forstår ikke et ord.',
      art: 'En nisse med runde briller myser forvirret på en krøllet seddel fuld af kragetæer, med spørgsmålstegn over hovedet.',
    },
    401: {
      mean: 'Godkendelse kræves: legitimationsoplysninger mangler eller er ugyldige.',
      when: 'Ingen Authorization-header, et udløbet token.',
      line: 'Hvem er du? Kender jeg dig?',
      art: 'En rund, luftig ugle står bag en lille låge med den ene vinge løftet som en vagt og spørger „Who?“.',
    },
    403: {
      mean: 'Din identitet er kendt, men du mangler tilladelse.',
      when: 'En almindelig bruger åbner adminpanelet.',
      line: 'Nå, det er dig? Du kommer ikke ind!',
      art: 'En buttet pelikan med krydsede vinger står fast foran en murstensvæg og en dør låst med kæde og hængelås.',
    },
    404: {
      mean: 'Der findes intet på denne adresse.',
      when: "En tastefejl i URL'en, et slettet produkt.",
      line: 'Her er ingen. Kig selv et andet sted.',
      art: 'En ilder, kun tegnet som en svag, prikket omrids, står ved siden af et tomt hul; kun dens nysgerrige øjne er tydelige.',
    },
    405: {
      mean: 'Serveren kender adressen, men accepterer ikke denne metode.',
      when: 'En DELETE sendt til et endpoint, der kun accepterer GET.',
      line: 'Ikke sådan! Skift metode.',
      art: 'En grævling med dørmandskasket står ved en dør med skiltet „GET POST“ og løfter en pote for at stoppe en kuvert mærket „DELETE“, streget over med rødt.',
    },
    408: {
      mean: 'Klienten var for længe om at sende forespørgslen, så serveren holdt op med at vente.',
      when: 'En langsom forbindelse, en upload, der er gået i stå.',
      line: 'Sov over mig. Serveren gav op.',
      art: 'Et dovendyr hænger og sover på en gren midt i et gab; under det ligger et ufærdigt brev og en kuglepen ved siden af et timeglas.',
    },
    409: {
      mean: 'Forespørgslen er i konflikt med ressourcens nuværende tilstand.',
      when: 'En e-mail, der allerede er i brug ved tilmelding, en versionskonflikt under redigering.',
      line: 'Jeg var her først! Træd tilbage!',
      art: 'To stædige geder på en smal planke har låst hornene sammen med en stor gnist imellem sig; ingen af dem kan komme forbi.',
    },
    413: {
      mean: 'Forespørgslens body er større end den tilladte grænse.',
      when: 'Upload af en for stor fil.',
      line: 'For meget! Det kan ikke være her!',
      art: 'En lille mus skubber en kæmpe ost ind i sit musehul; osten sidder fast, og væggen revner under et skilt „MAX 10 MB“.',
    },
    415: {
      mean: 'Serveren understøtter ikke dette dataformat.',
      when: 'XML i stedet for JSON, en forkert Content-Type.',
      line: 'Adr! Det spiser jeg ikke! Tjek, hvad jeg kan lide.',
      art: 'En koala med hagesmæk vender sig væk og skubber en tallerken med en „XML“-æske ud over bordkanten, mens den krammer et eukalyptusblad mærket „JSON“.',
    },
    418: {
      mean: 'En spøgekode fra RFC 2324: en tekande nægter at brygge kaffe.',
      when: "Easter eggs i API'er. En fin bonus til en jobsamtale.",
      line: 'Jeg er en tekande. Ingen kaffe.',
      art: 'En rund flodhest formet som en porcelænstekande damper; ved siden af står en kop kaffe og kaffebønner ved et „ingen kaffe“-skilt.',
    },
    422: {
      mean: 'Forespørgslen blev læst, men dataene består ikke valideringen.',
      when: 'En tekst i stedet for et tal, en negativ alder, „email: banana“.',
      line: 'Læst. Men alder -5? Seriøst?',
      art: 'En spætte med runde briller sidder på en pæn formular: „name: Ann“ har et grønt flueben, „age: -5“ og „email: banana“ har røde krydser.',
    },
    429: {
      mean: 'For mange forespørgsler på kort tid; en rate limit slog til.',
      when: 'Et script uden pauser, en Retry-After-header i svaret.',
      line: 'Stop! For mange. Lad mig trække vejret.',
      art: 'En svedende hamster spurter i et hjul, mens en strøm af kuverter flyver ud; en klemme under hjulet bremser det.',
    },
    500: {
      mean: 'Noget uventet gik i stykker på serveren.',
      when: 'En ubehandlet exception i backend-koden.',
      line: 'Det er ikke dig, det er mig.',
      art: 'En lille enhjørning i panik, med pjusket manke og sved, der flyver, trækker en lang hale af sammenfiltret kode efter sig.',
    },
    502: {
      mean: 'En gateway eller proxy sendte forespørgslen videre, men fik et ugyldigt svar fra serveren.',
      when: 'Nginx foran en backend, der er gået ned.',
      line: 'Det kom i stykker. Jeg sender det bare videre!',
      art: 'En papegøje på et kabel mellem to servere skræpper en uforståelig taleboble; serveren bag den ryger under en rød advarselslampe.',
    },
    503: {
      mean: 'Serveren er midlertidigt utilgængelig: overbelastning eller vedligeholdelse.',
      when: 'Planlagt vedligeholdelse, en overbelastet server.',
      line: 'Lukket for reparation. Kom tilbage senere.',
      art: 'En stor bjørn med nathue sover i en hyggelig hule ved et „Closed for maintenance“-skilt og en skruenøgle.',
    },
    504: {
      mean: 'En gateway eller proxy sendte forespørgslen videre, men fik aldrig svar fra serveren.',
      when: 'En langsom backend bag nginx eller et CDN.',
      line: 'Jeg ventede og ventede. Intet svar fra serveren.',
      art: 'En alligator læner sig op ad en åben havelåge med et stopur og venter; en lang, tom sti fører til en lillebitte server langt væk.',
    },
  },
  // "What to test": short test cases, steps → expected result (RSP-11).
  qa: {
    102: [
      'Start en lang operation (fx import af en stor fil eller kopiering af en stor mappe), og vent uden at røre siden → siden venter og viser resultatet, ingen timeout-fejl.',
      'Mens den lange operation kører, så hold øje med dens status i brugerfladen → den viser fremskridt, og „Færdig“ vises først, når operationen virkelig er slut.',
    ],
    200: [
      'Gem en post med kendte værdier, og åbn den derefter (eller listen, den står i) → hvert felt viser præcis det, der blev gemt, intet mangler og intet er i overskud.',
      'Åbn en liste uden elementer endnu (fx ordrer på en ny konto) → en venlig „Her er intet endnu“ og status 200, ikke en fejlside.',
      'Indsend en formular med ugyldige data, og tjek Network-fanen → status er 4xx, ikke 200 med en fejlbesked gemt indeni.',
    ],
    201: [
      'Opret et nyt element (fx en kommentar eller en ordre), og åbn listen → det nye element står der med præcis de værdier, du indtastede.',
      'Udfyld en oprettelsesformular, og dobbeltklik hurtigt på Send → der oprettes kun ét element.',
      'Opret et element, kopiér dets link, og åbn det i en ny fane → elementet åbner.',
    ],
    204: [
      'Slet et element fra en liste → det forsvinder med det samme uden fejlbesked og er stadig væk efter genindlæsning af siden.',
      'Kopiér linket til et element, slet elementet, og åbn så det kopierede link → en „ikke fundet“-side (404), ikke det gamle element.',
      'Åbn en post i to browserfaner. Slet den i den første fane, og prøv så at slette den i den anden → systemet håndterer det pænt (fx „Elementet blev ikke fundet“) uden serverfejl.',
    ],
    301: [
      'Åbn en gammel URL, der er flyttet (fx et gammelt produktlink) → du lander på den nye side, og Network-fanen viser ét 301-hop, ikke en kæde.',
      'Åbn den gamle URL med parametre tilføjet (fx ?page=2&sort=price) → den nye side åbner med de samme parametre.',
      'Åbn http://-versionen af en vilkårlig side → du sendes videre til https:// med status 301, ikke 302 eller en kopi af siden med 200.',
    ],
    302: [
      'Log ud, åbn en side, der kræver login, via et direkte link, og log så ind → du lander der, hvor kravene siger (tilbage på den side eller fx på kontoens forside), ikke på en fejlside eller en tom side.',
      "Find omdirigeringsparameteren i login-URL'en (fx ?next=/orders), erstat den med et eksternt site (?next=https://example.com), og log ind → du bliver på vores site.",
      'Indsend en formular (fx checkout), og tryk så F5 på bekræftelsessiden → ingen advarsel om at sende formularen igen og ingen ordre nummer to.',
    ],
    304: [
      'Åbn en side, og genindlæs den så med Network-fanen åben → billeder, scripts og styles, der ikke er ændret, kommer tilbage som 304.',
      'Ændr noget synligt (fx en produkttitel i admin), og genindlæs så siden normalt → den nye værdi vises, ikke den gamle fra cachen.',
      'Efter en deploy, åbn sitet i en browser, der har besøgt det før, uden at rydde cachen → sitet virker uden fejl (ingen blanding af gamle og nye filer), og den nye version vises med det samme eller inden for den angivne cachetid.',
    ],
    400: [
      'Send i Postman (eller DevTools) en request med ødelagt JSON eller uden et obligatorisk felt → status 400, ikke 500.',
      'Send den samme ødelagte request, og læs fejlbeskeden → den siger, hvad der præcis er galt (hvilket felt, hvilket format).',
      'Se hele fejlsvaret igennem → ingen stack trace, filstier eller SQL indeni.',
    ],
    401: [
      'Log ud, og åbn en privat side (eller kald dens API) via et direkte link → du får login-siden eller status 401, ikke indholdet.',
      'Log ind, vent til sessionen udløber (eller slet session-cookien), og klik så på noget → du bliver bedt om at logge ind igen, og efter login kan du fortsætte.',
      'Log ud, tryk Tilbage i browseren, og prøv en handling på den gamle side → ingen adgang, du bliver bedt om at logge ind.',
    ],
    403: [
      'Log ind som almindelig bruger, og åbn en admin-URL via et direkte link (fx /admin) → adminsiden åbner ikke (ingen adgang, en login-side eller en 404, som kravene siger).',
      "Log ind som bruger A, åbn en af dine ordrer, og ret id'et i URL'en til bruger B's ordre → B's ordre vises ikke.",
      'Som admin, kopiér requesten for en handling kun for admins fra DevTools; send den samme request som almindelig bruger → status 403, intet ændres.',
    ],
    404: [
      'Åbn en URL med en tastefejl (fx /prodcts) → en venlig 404-side med en vej tilbage (menu, søgning eller et link til forsiden).',
      "Åbn et element, og ret dets id i URL'en til et, der ikke findes (fx 999999) → en 404-side, ikke en serverfejl.",
      'Åbn en manglende side med Network-fanen åben → status er virkelig 404, ikke 200 (en „soft 404“).',
    ],
    405: [
      'Send i Postman DELETE (eller PUT) til et endpoint, der kun læser data (fx en offentlig liste) → status 405, intet bliver slettet.',
      'Se på headerne i det 405-svar → der er en Allow-header med de metoder, du kan bruge.',
      'Prøv hver ikke-understøttet metode på endpointet → altid 405, aldrig 404 eller 500.',
    ],
    408: [
      'Sæt netværket til Slow 3G i DevTools, og indsend en stor formular eller upload en stor fil → efter et stykke tid vises en tydelig timeout-besked, ikke en spinner, der aldrig stopper.',
      'Efter timeout-beskeden, sæt netværket tilbage til normal, og prøv igen → det virker, og de data, du skrev, står stadig i formularen.',
    ],
    409: [
      'Tilmeld dig med en e-mail, der allerede har en konto → der oprettes ingen ny konto, og beskeden er som kravene siger (direkte „Denne e-mail er allerede i brug“ eller neutralt „Tjek din indbakke“).',
      'Åbn den samme post i to faner. Ret og gem den i den første fane, ret og gem den så i den anden → den anden gemning advarer om konflikten i stedet for stille at overskrive den første ændring.',
      'Læs konfliktbeskeden → den siger, hvad der præcis er i konflikt (hvilket felt eller hvilken version).',
    ],
    413: [
      'Find upload-grænsen (fx 10 MB), og upload filer lige under, præcis på og lige over den → adfærden ved grænsen matcher kravene (≤ eller <), og alt større bliver afvist.',
      'Sammenlign grænsen i hjælpeteksten ved upload-feltet med den størrelse, der faktisk bliver afvist → de passer.',
      'Upload en fil, der tydeligt er for stor → en klar besked med den tilladte størrelse, ikke en afbrudt forbindelse eller en upload, der aldrig slutter.',
    ],
    415: [
      'Send i Postman en gyldig JSON-body med Content-Type: text/plain (eller uden Content-Type) → status 415, ikke 500.',
      'Send de samme data som XML eller form-data til et endpoint, der kun tager JSON → status 415 med en besked om, hvilket format der forventes.',
    ],
    418: [
      'Hvis produktet har et easter egg (fx /teapot), så kald det og derefter nogle rigtige endpoints → de rigtige virker stadig normalt.',
      'Tjek overvågning og alarmer efter kaldet til easter egget → ingen alarm om en ukendt fejl.',
    ],
    422: [
      'Skriv -5 i aldersfeltet (eller en ugyldig e-mail: „banana“, „anna@“, „@mail.com“, „anna@@mail.com“, „anna k@mail.com“), og indsend → en fejlbesked lige under feltet, og formularen bliver ikke sendt.',
      'Udfyld flere felter med ugyldige værdier og resten med gyldige, og indsend → alle fejl vises på én gang, og de gyldige værdier bliver stående.',
      'Prøv grænseværdier én ad gangen: et tomt obligatorisk felt, maks. længde + 1 tegn, en fødselsdato i fremtiden, 29. februar i et ikke-skudår → hver bliver afvist med en klar begrundelse.',
    ],
    429: [
      'Find den angivne grænse (dokumentation, svar-header, eller spørg en udvikler), fx 5 loginforsøg i minuttet; lav præcis så mange forsøg og så ét mere → kun det ekstra bliver blokeret.',
      'Når blokeringstiden er gået, prøv igen → det virker igen.',
      'Ram grænsen som bruger A, og prøv så straks som bruger B i en anden browser → bruger B bør ikke være blokeret.',
    ],
    500: [
      "Fjern maxlength, required eller pattern fra feltet i DevTools (Elements-fanen), og indsend formularen med uventede data: emoji, en tekst ét tegn over backendens eller databasens grænse, <script>, ' OR 1=1 → ingen 500: enten et normalt resultat eller en valideringsfejl.",
      'Hvis formularen validerer med JavaScript, så kopiér requesten i Network (Copy as fetch) eller åbn den i Postman, indsæt de samme data, og send → igen ingen 500.',
      'Hvis en 500 alligevel opstår, så se på siden → en besked til brugeren uden tekniske oplysninger (fx „Noget gik galt, prøv igen“).',
      'Efter en 500, tjek logs eller overvågning → fejlen står der med tidspunkt, URL og detaljer om requesten.',
    ],
    502: [
      'Stop backend-servicen i et testmiljø, og åbn sitet → en venlig fejlside, ikke en rå nginx- eller proxyside.',
      'Læs fejlsiden og dens svar → ingen interne IP-adresser, værtsnavne eller serverversioner.',
      'Start backenden igen, og genindlæs sitet → det virker uden ekstra trin.',
    ],
    503: [
      'Slå planlagt vedligeholdelsestilstand til (eller åbn sitet under en deploy) → en vedligeholdelsesside med forventet tidspunkt for, hvornår sitet er tilbage, ikke et ødelagt layout.',
      'Åbn vedligeholdelsessiden med Network-fanen åben → status 503, ikke 200.',
      'Under en belastningstest, hold øje med svarene, mens belastningen stiger → ved overbelastning får nogle requests 503, men sitet går ikke helt ned og kommer sig, når belastningen falder.',
    ],
    504: [
      'Start den langsomste operation, du kan finde (fx en årsrapport eller en fuld eksport) → efter timeouten vises en klar besked, ikke en spinner, der aldrig stopper.',
      'Start en meget lang operation, og forlad siden → den fortsætter i baggrunden, og du får en notifikation (eller en færdig fil), når den er klar.',
      'Efter timeout-beskeden, tryk på Prøv igen → operationen starter igen uden at du skal indtaste filtre eller data igen.',
    ],
  },
  // Traps: title, rule and the situations to sort, in the order of data/http/traps.js (the answers live there).
  traps: {
    '401-403': {
      title: 'Whoowl eller Nopelican?',
      rule: '401: vis, hvem du er, så kommer du ind. 403: vi ved, hvem du er, og svaret er stadig nej.',
      s: [
        'Tokenet er udløbet.',
        'En logget ind bruger sletter en andens ordre.',
        'Requesten har ingen Authorization-header.',
        'En almindelig bruger åbner /admin.',
      ],
    },
    '301-302': {
      title: 'Relocrab eller Brbat?',
      rule: '301: flyttet for altid. 302: midlertidigt et andet sted, den gamle adresse er stadig rigtig.',
      s: [
        'Sitet er flyttet permanent til et nyt domæne.',
        'Efter login sendes du tilbage til den side, du kom fra.',
        "Alle http-URL'er peger nu permanent på https.",
        'Under et udsalg omdirigerer forsiden til kampagnesiden.',
      ],
    },
    '200-201-204': {
      title: 'Okayak, Buildbeaver eller Nullwing?',
      rule: '200: her er resultatet. 201: noget nyt er oprettet. 204: klaret, intet at vise.',
      s: [
        'GET /orders returnerede listen over ordrer.',
        'POST /orders oprettede en ny ordre.',
        'DELETE /orders/42 lykkedes uden body.',
      ],
    },
    '408-503': {
      title: 'Slowth eller Hibearnate?',
      rule: '408: du, klienten, er for langsom. 503: serveren sover.',
      s: ['Klienten begyndte at uploade en stor fil og gik i stå.', 'Serveren er under planlagt vedligeholdelse.'],
    },
    '500-502': {
      title: 'Panicorn eller Parroxy?',
      rule: '500: serveren selv gik i stykker. 502: proxyen sendte forespørgslen videre og fik skrald tilbage fra serveren.',
      s: ['En ubehandlet exception i backend-koden.', 'Nginx fik intet gyldigt svar fra backenden.'],
    },
    '429-503': {
      title: 'Spamster eller Hibearnate?',
      rule: '429: for mange requests fra dig. 503: serveren er nede for alle.',
      s: ['Dit script sender tusind requests i sekundet.', 'Serveren er overbelastet og svarer ingen.'],
    },
    '400-404': {
      title: 'Garblin eller Nowherret?',
      rule: '400: requesten kan ikke læses. 404: den blev læst, men der er intet.',
      s: ["JSON'en mangler en afsluttende krøllet parentes.", 'GET /users/99999, og den bruger findes ikke.'],
    },
    '404-405': {
      title: 'Nowherret eller Verbadger?',
      rule: '404: ingen bor på denne adresse. 405: adressen findes, men denne metode accepteres ikke her.',
      s: [
        'DELETE /products, selvom produktlisten kun kan læses.',
        'GET /prodcts med en tastefejl i adressen.',
        'PUT til /login, som kun accepterer POST.',
        'GET /orders/777 for en ordre, der er slettet.',
      ],
    },
    '409-422': {
      title: 'Clashgoat eller Nitpecker?',
      rule: '409: dataene er fine, men støder sammen med det, der allerede findes. 422: selve dataene giver ingen mening.',
      s: [
        'Tilmelding med en e-mail, der allerede er i brug.',
        'Tilmelding med e-mailen „banana“.',
        'To personer redigerer den samme post, og den anden ændring bygger på en forældet version.',
        'Aldersfeltet siger −5.',
      ],
    },
    '400-422': {
      title: 'Garblin eller Nitpecker?',
      rule: '400: requesten kan slet ikke læses. 422: den blev læst, men værdierne giver ingen mening. 400 er den generelle klientfejl: når en mere specifik kode passer, bruger serveren den.',
      s: [
        "JSON'en har et uafsluttet anførselstegn, og parseren fejler.",
        "JSON'en er gyldig, men fødselsdatoen ligger i fremtiden.",
        'Requestens body er skåret over midtvejs.',
        'En ordre på −3 stk.',
      ],
    },
    '400-415': {
      title: 'Garblin eller Pickoala?',
      rule: '400: det rigtige format, men en ødelagt request. 415: serveren accepterer slet ikke dette format. 400 er den generelle klientfejl: når en mere specifik kode passer, bruger serveren den.',
      s: [
        'Content-Type: application/xml til et endpoint, der kun accepterer JSON.',
        "Content-Type: application/json, men body'en er ødelagt JSON.",
        'En avatar uploades som .exe i stedet for .png.',
        "JSON'en har et komma efter det sidste felt.",
      ],
    },
    '502-504': {
      title: 'Parroxy eller Waitgator?',
      rule: '502: proxyen sendte forespørgslen videre og fik skrald tilbage fra serveren. 504: den fik aldrig svar fra serveren.',
      s: [
        'Nginx fik et ugyldigt svar fra backenden.',
        'Backenden bruger 2 minutter på at lave en rapport, men proxyen venter kun 60 sekunder.',
        'Backenden genstarter og afbryder forbindelsen midt i svaret.',
        'Databasen hang, så backenden svarede aldrig gatewayen.',
      ],
    },
    '408-504': {
      title: 'Slowth eller Waitgator?',
      rule: '408: en langsom klient; serveren holdt op med at vente på requesten. 504: en langsom server bag gatewayen; gatewayen holdt op med at vente på svaret.',
      s: [
        'En telefon på svag mobildata begynder at sende en formular, og requesten går i stå midtvejs.',
        "CDN'et fik ikke svar fra din server i tide.",
        'Klienten åbnede en forbindelse og sender intet.',
        'Proxyen ventede på betalings-microservicen, som forbliver tavs.',
      ],
    },
  },
  // Sidehoved og sidefod (RSP-156): de samme på alle sider i zooen.
  site: {
    nav: 'Sidemenu',
    langHint: {
      label: 'Sidens sprog',
      text: 'Mnemozoo findes også på dansk.',
      open: 'Åbn',
      close: 'Luk',
    },
    map: 'Kort',
    about: 'Om projektet',
    foot: 'Originale figurer og tekster; statusnavne fra IANA-registret.',
    news: 'Nyheder', // footer and "How to use" link to the What's new page (RSP-145)
    contact: 'Fejl? Feedback?', // footer mail link (RSP-139, RSP-147)
    mail: 'e-mail', // screen-reader note after the footer mail link
    page: 'Side', // first line of the feedback mail: "Side: <address>"
    ext: 'ekstern side', // screen-reader note after LinkedIn and GitHub in the footer
  },
  // "What's new" page /<lang>/news/ (RSP-145): page texts; entries in the order of data/news.js, items in the
  // order of its kinds. Plain language, what the visitor gets, no ticket numbers.
  news: {
    title: 'Nyheder · Mnemozoo',
    h1: 'Nyheder',
    lead: 'Hvad der er ændret på Mnemozoo, nyeste først.',
    kinds: { new: 'Nyt', improved: 'Forbedret', fixed: 'Rettet' },
    entries: {
      'advent-preview': {
        title: 'Git flytter ind',
        line: 'Git i Mnemozoo: fra 1. december en ny kommando hver dag, forklaret med en scene fra hjemmet.',
        items: [
          'Julekalender-væg: 25 låger, den første åbner 1. december.',
          'Grupper af git-kommandoer har ikoner, ikke kun farve.',
          'Adresser uden sprog åbner straks den engelske side med et tilbud om at skifte til dit sprog.',
        ],
      },
      'footer-news': {
        title: 'Sidefod og nyheder',
        line: 'Nu er det let at skrive til os og se, hvad der er ændret på siden.',
        items: [
          'Nu kan du give feedback eller melde en fejl via linket i sidefoden.',
          'Alle ændringer på siden er nu samlet ét sted — her.',
          'Links til LinkedIn og GitHub er nu nederst på alle sider.',
        ],
      },
      visitors: {
        title: 'Besøgende',
        line: 'Siden husker dit sprog og åbner hurtigere på telefonen.',
        items: [
          'Siden åbner på det sprog, du valgte sidst.',
          'Siderne vises hurtigere på telefonen.',
          'Vi tæller besøg uden cookies og følger dig ikke.',
        ],
      },
    },
  },
  // Forside /<lang>/ (RSP-156).
  notFound: {
    title: '404: her bor ingen · Mnemozoo',
    h1: 'Der bor ingen på denne adresse',
    text: 'Måske er siden flyttet, eller der er en tastefejl i adressen.',
    back: 'Tilbage til zooen →',
  },
  home: {
    title: 'Mnemozoo: teknisk zoo for din hukommelse',
    description:
      'Originale væsner til HTTP-statuskoder: et kort for hver kode, træning og fælder med koder, der ligner hinanden. På alle sidens sprog.',
    kicker: 'IT memo zoo',
    h1: 'Få svaret, før du overhovedet spørger',
    lead: 'Originale væsner til de HTTP-statuskoder, du møder hver dag i browseren, logfilerne og konsollen. Kort, træning, fælder med koder, der ligner hinanden. På alle sidens sprog.',
    mapTitle: 'Zookort',
    httpSign: 'Vilde dyr · åbent', // zone sign with its status (RSP-170)
    httpName: 'HTTP-statuskoder',
    httpText: (n, first, last) =>
      `${n} ${n === 1 ? 'væsen' : 'væsner'} fra ${first} til ${last}. Et kort for hver kode, træning i fire tilstande, fælder med koder, som folk forveksler.`,
    enter: 'Mød beboerne →',
    // announcement sign (RSP-195): the date is the advent start (ADVENT_START), in the page language
    gitSign: (date) => `Kæledyr · åbner ${date}`,
    // from the advent start: the Git enclosure is open and links to the advent wall
    gitOpenSign: 'Kæledyr · åbent',
    gitEnter: 'Åbn julekalenderen →',
    gitText: 'Git-kommandoer som scener fra hverdagen. Vi åbner med en julekalender: et nyt kort hver dag.',
    pavilionSign: 'Temapavillon', // singular: the sign hangs on the pavilion itself
    pairsName: 'Arter, der ligner hinanden',
    pairsText: 'Par, som folk forveksler: 401 og 403, 502 og 504. En regel og situationer, der skal sorteres.',
    pairsLink: (n) => `${n} par i HTTP-anlægget →`,
    howTitle: 'Sådan virker det',
    steps: [
      ['Mød væsenet', 'Væsenets kort: hvad koden betyder, hvor du møder den, og hvad du skal teste.'],
      ['Træn', 'Fra billede til kode og omvendt. To rigtige svar i træk, og koden får sit ✓.'],
      ['Forveksl dem ikke', 'Fælder med koder, der ligner hinanden: én regel og nogle situationer, der skal sorteres.'],
    ],
    whyTitle: 'Hvorfor træne hukommelsen, når der er AI?',
    why: [
      'Den svarer på spørgsmål. Men du kan kun spørge om det, du ved findes. Hvis en 429 glimter forbi i logfilerne, og du ved, hvorfor netop denne status opstår, sparer du et par spørgsmål og tokens 😉',
      'Mnemozoo træner netop genkendelsen. Siden er lavet med AI, men AI tænker ikke for dig.',
    ],
    aboutTitle: 'Om projektet',
    aboutText: 'Et selvstændigt QA-projekt af Maryna Bortnyk.',
    gitLogo: 'Git-logo:',
  },
  // "Tools and Read more": labels for data/http/links.js TOOLS, in the same order.
  tools: ['Chrome DevTools: Network-panelet', 'Firefox: Edit and Resend', 'Postman: send en forespørgsel'],
  // Git rubric (RSP-199, RSP-200): labels of the git card page, the household names of the git groups (data/git/groups.js),
  // and the card texts git.cards.<id> (scene title, caption, "$" line, page sections), added card by card with RSP-200.
  git: {
    ui: {
      back: 'Til julekalenderen',
      does: 'Hvad den gør',
      tip: 'Tip',
      opts: 'Tilvalg',
      file: 'Linjer i filen',
      cmds: 'Kommandoer',
      careful: 'Pas på',
      conf: 'Forveksles ofte med',
      // c = the list where git help shows the command's section, already as HTML (<code>git help -a</code>)
      help: (c) => `Afsnit i ${c}`,
      // before `git help <command>`, the command's own manual
      manual: 'git-scm.com (på engelsk)',
      danger: 'Farlig kommando',
      // heading of the outside links on a git card page
      docs: 'Dokumentation',
    },
    // the advent wall /<lang>/git/ (RSP-195): door labels for screen readers, the flags on the paper
    wall: {
      title: 'Git-julekalender',
      // n = the number of advent days (25 since 2026-11-17)
      lead: (date, n) =>
        `${n} git-kommandoer, én låge om dagen fra ${date}. Dage, du er gået glip af, kan åbnes senere.`,
      intro:
        'Den officielle Git™-dokumentation er fuld af ord fra hjemmet: de daglige kommandoer kaldes »porcelæn« (porcelain), og alt, hvad der arbejder under dem, »VVS« (plumbing); halvfærdigt arbejde gemmes væk (`git stash`), døde grene beskæres (`git prune`), skraldet samles op (`git gc`), og det vigtige får et mærkat (`git tag`). Det blev grundlaget for at lære git-kommandoer gennem associationer: scener fra hjemmet og kæledyr, som du finder på hvert kort.',
      today: 'i dag',
      // short, it has to fit a small door on a phone (Maryna, 2026-11-17: «забули?»)
      missed: 'glemt?',
      // phone: the big door of today above the wall (prototype AdventPhone, 2026-11-17)
      todayHint: 'Åbn dagens låge',
      legend: 'Grupper',
      locked: (n, date) => `Dag ${n}, åbner ${date}`,
      paperToday: (n) => `Dag ${n}, i dag, åbn lågen`,
      paperMissed: (n) => `Dag ${n}, glemt? Åbn lågen`,
      bigToday: (n) => `Dag ${n}, i dag. Åbn dagens låge`,
      open: (n, cmd) => `Dag ${n}: ${cmd}, åbn kortet`,
      revealed: (n, cmd) => `Dag ${n}: ${cmd}. Tryk igen for at åbne kortet.`,
    },
    groups: { start: 'Indflytning', home: 'Hjemme', visit: 'Besøg', archive: 'Loftet', post: 'Posten' },
    cards: {
      // Pictures ready (RSP-191, RSP-192): only their text for now; the other card texts come with RSP-200.
      init: {
        title: 'En tom lejlighed',
        line: 'Lad os starte på en frisk.',
        move: '$ git init',
        does: {
          text: 'Opretter et nyt, tomt repository i den aktuelle mappe: den skjulte mappe `.git`, hvor git gemmer hele historikken. Filerne i mappen bliver, som de er; git sporer dem ikke endnu. Der er ingen commits endnu, så `git branch` viser intet: grenen opstår med det første commit.',
          meta: 'En ny lejlighed: væggene er der, møblerne mangler, og katten går ind først.',
        },
        tip: 'Ligger projektet allerede på GitHub eller et andet sted? Så ikke init, men `git clone <url>`: den opretter selv mappen og henter hele historikken.',
        opts: [
          {
            cmd: 'git init <mappe>',
            text: '— opretter en mappe med det navn (hvis den ikke findes) og repository’et i den.',
            meta: 'Du bygger en ny lejlighed og sætter navneskiltet op med det samme.',
          },
          {
            cmd: 'git init -b main',
            text: '— sætter navnet på den første gren; uden det bruger git 2.43 `master` og viser et tip om, hvordan man ændrer det.',
            meta: 'Hvad det første værelse skal hedde, bestemmer du.',
          },
        ],
        art: 'En grå kat står på tærsklen til en vidt åben dør og er den første, der sætter poten ind i den tomme lejlighed: ingen møbler, kun en tom ramme på væggen. Bag den en person med kufferter, den ene med et pære-klistermærke. Ved døren et enkelt nyt navneskilt.',
      },
      gitignore: {
        title: 'Ketchup lige foran næsen',
        line: 'Mor, hvor er ketchuppen?',
        move: '$ git check-ignore -v <fil>',
        hint: 'hvilken regel skjuler filen',
        does: {
          text: 'Ikke en kommando, men en fil i repository’ets rod: en liste over mønstre (`*.log`, `node_modules/`, `.env`), som git ikke viser blandt usporede filer (untracked) og ikke tilføjer med `git add .`. Den virker kun på filer, git ikke sporer endnu; selve `.gitignore` committes, så alle har de samme regler.',
          meta: 'Listen på køleskabsdøren: hvad man ikke skal lægge mærke til, selv om det står lige foran én.',
        },
        tip: 'Er filen allerede committet? `.gitignore` skjuler den ikke: først `git rm --cached <fil>` — git holder op med at spore den, og kopien på disken bliver.',
        file: [
          {
            line: '*.log',
            text: 'Et mønster: alle filer med den endelse i alle mapper; `/` til sidst (`build/`) betyder kun mapper.',
            meta: 'Læg ikke mærke til nogen tom flaske, hvor den end står.',
          },
          {
            line: '!keep.log',
            text: '`!` forrest henter en fil frem igen, som en regel ovenfor skjulte.',
            meta: 'Undtagen denne her — den skal blive.',
          },
        ],
        opts: [
          {
            cmd: 'git add -f <fil>',
            text: '— tilføjer en fil trods `.gitignore`; derefter sporer git den.',
            meta: 'Du lægger bevidst noget i kurven, som du normalt ikke lægger mærke til.',
          },
        ],
        art: 'På væggen et portræt af en kat, der sidder med ryggen til sin skål med fisk. En person står ved det åbne køleskab, klør sig i nakken og undrer sig over, hvor ketchuppen er, mens ketchupflasken står lige foran dem på den midterste hylde. På køleskabsdøren hænger en liste under en magnet.',
      },
      restore: {
        title: 'Som på billedet',
        line: 'Pas på, mor rydder op — vi står ikke til ansvar for følgerne',
        move: '$ git restore <fil>',
        does: {
          text: 'Sætter en fil i arbejdsmappen tilbage til dens tilstand i indekset, dvs. smider ændringer væk, der ikke er tilføjet endnu. `git restore --staged <fil>` gør det modsatte: tager filen ud af indekset og lader arbejdsmappen være. Ændrer ikke commit-historikken.',
          meta: 'Mor rydder op i værelset, så det ligner billedet: det halvfærdige forsvinder.',
        },
        tip: 'En sti er påkrævet: `git restore .` gendanner hele mappen. Før gjorde man det med `git checkout -- <fil>`.',
        opts: [
          {
            cmd: 'git restore --staged <fil>',
            text: '— tager filen ud af indekset (unstage); ændringerne i arbejdsmappen bliver.',
            meta: 'Du tager en ting op af kurven, men lægger den ikke på plads.',
          },
          {
            cmd: 'git restore --source <commit> <fil>',
            text: '— henter filen fra det angivne commit, fx `HEAD~1`.',
            meta: 'Du rydder op efter et ældre billede.',
          },
        ],
        careful: [
          'Ændringer, der smides væk, er væk for altid: de findes hverken i historikken eller i `git reflog`.',
          'Kig i `git diff`, før du kører `git restore`. Er det synd at smide væk, så først `git stash`.',
        ],
        art: 'På væggen et portræt af en kanin, der har gnavet i en hjemmesko. Mor holder et foto af den ryddelige hylde op, "som det var", og fejer resolut et halvlagt puslespil fra gulvet op i fejebakken, så brikkerne flyver. I døråbningen skriger et barn med armene oppe. Til højre ser hylden allerede ud som på fotoet: pæne kasser, blandt dem æsken til puslespillet.',
      },
      stash: {
        title: 'Gæster ved døren',
        line: 'Lige en hurtig oprydning!',
        move: '$ git stash',
        does: {
          text: 'Lægger ikke-committede ændringer i sporede filer (både i indekset og i arbejdsmappen) til side i et særskilt lager og sætter arbejdsmappen tilbage til det sidste commit. Senere kan de hentes frem igen, også på en anden gren.',
          meta: 'Det ringer på døren: du stopper det halvfærdige ind i skabet, så værelset ser pænt ud.',
        },
        tip: 'Der kan være flere stashes: `git stash list` viser dem alle, `stash@{0}` er den nyeste.',
        opts: [
          {
            cmd: 'git stash pop',
            text: '— henter den sidste stash tilbage i arbejdsmappen og fjerner den fra listen; `git stash apply` henter den tilbage, men lader den blive på listen.',
            meta: 'Gæsterne er gået — du tager sweateren ud af skabet.',
          },
          {
            cmd: 'git stash -u',
            text: '— gemmer også nye filer, som git ikke sporer endnu. Et almindeligt `git stash` lader dem blive i arbejdsmappen; filer fra `.gitignore` gemmer kun `git stash -a`.',
            meta: 'Ind i skabet ryger også det, der endnu ikke har sin egen plads.',
          },
          {
            cmd: 'git stash -m "…"',
            text: '— en stash med en beskrivelse, så du kan finde den igen i `git stash list`.',
            meta: 'En seddel på garnnøglet: hvad det er, og hvorfor.',
          },
        ],
        careful: [
          '`git stash drop` og `git stash clear` sletter stashes for altid: de findes ikke i `git reflog`.',
          'Kig indenfor, før du sletter: `git stash show -p`. Lige slettet? `git stash drop` skriver stashens hash, og `git stash apply <hash>` henter den stadig tilbage.',
        ],
        art: 'På væggen et portræt af en hamster med fyldte kinder. Mens det ringer på døren, stopper en person på tæer hurtigt en sweater og et garnnøgle ind i det øverste skab, hvis låge står åben mod os; på den midterste hylde står ens krus.',
      },
      branch: {
        title: 'Et nyt navneskilt',
        line: 'Åh, det her bliver mit værelse.',
        move: '$ git branch',
        does: {
          text: 'Uden argumenter viser den de lokale grene og markerer den aktuelle med `*`. Med et navn opretter den en ny gren på det aktuelle commit, men skifter ikke til den: det gør `git switch`.',
          meta: 'Du sætter et navneskilt på døren til et nyt værelse, men bliver selv stående, hvor du er.',
        },
        tip: 'Har I oprettet en gren, men går jeres commits stadig til den gamle? `git branch` — det er kun navneskiltet. For at skifte skal I bruge `git switch <gren>`, og for at oprette og skifte på én gang `git switch -c <gren>`.',
        opts: [
          {
            cmd: 'git branch -a',
            text: '— viser også de fjerne grene (`remotes/origin/…`).',
            meta: 'Navneskiltene på alle døre, også naboernes.',
          },
          {
            cmd: 'git branch -m <nyt navn>',
            text: '— omdøber den aktuelle gren.',
            meta: 'Du skriver navneskiltet om.',
          },
          {
            cmd: 'git branch -d <gren>',
            text: '— sletter grenen, hvis den allerede er flettet; en ikke-flettet gren sletter kun `git branch -D <gren>`.',
            meta: 'Du tager navneskiltet ned fra et værelse, der er tømt.',
          },
        ],
        art: 'På væggen et portræt af en papegøje på en pind. To åbne døre side om side fører ind til to ens rum med samme lænestol og vindue; en løber på gulvet deler sig til begge døre. Ved den venstre dør et gammelt navneskilt; en person sætter et nyt gult navneskilt op ved den højre dør.',
      },
      switch: {
        title: 'Et nyt værelse',
        line: 'Tid til at flytte ind i et andet værelse',
        move: '$ git switch <gren>',
        does: {
          text: 'Skifter til en anden gren: arbejdsmappen og indekset bliver som i dens sidste commit. Ikke-committede ændringer følger med; hvis de støder sammen med filer på den gren, stopper git og beder dig committe dem eller lægge dem til side (`git stash`).',
          meta: 'Du går ad løberen ind i et andet værelse, og det, du har i hænderne, følger med.',
        },
        tip: '`git switch` har overtaget en del af det gamle `git checkout`, som både skifter gren og gendanner filer.',
        opts: [
          {
            cmd: 'git switch -c <gren>',
            text: '— opretter en ny gren og skifter til den med det samme.',
            meta: 'Du sætter navneskiltet op og går ind.',
          },
          {
            cmd: 'git switch -',
            text: '— går tilbage til den forrige gren.',
            meta: 'Tilbage til det værelse, du lige kom fra.',
          },
          {
            cmd: 'git switch --detach <commit>',
            text: '— går til et commit uden gren (detached HEAD) for at kigge; nye commits her går let tabt.',
            meta: 'Du kigger ind i værelset fra et gammelt billede, men der skal man ikke bo.',
          },
        ],
        careful: [
          '`git switch --discard-changes <gren>` og `git switch -f <gren>` smider ikke-committede ændringer væk for altid: de findes hverken i historikken eller i `git reflog`.',
          'Uden disse valgmuligheder stopper git selv, når ændringerne står i vejen. Er det synd at smide væk, så commit først eller `git stash`.',
        ],
        art: 'På væggen et portræt af en papegøje: af to pinde sidder den på den øverste, den nederste er tom. To åbne døre side om side fører ind til to ens rum; en løber på gulvet deler sig til begge døre; den højre dør er gul. En person går med lange skridt fra den venstre dør ind i det højre rum, fodspor på løberen fører fra venstre gren til højre.',
      },
      clone: {
        title: 'Møbleret lejlighed',
        art: 'En person med kufferter, den ene med et pæreklistermærke, står ved en vidt åben dør. Inde i lejligheden står de tidligere lejeres lænestol allerede med et ringbind med gamle regninger på, og på væggen hænger et portræt af to ens killinger. Ved døren et nyt navneskilt; det gamle er ved at falde af.',
        line: 'Her har boet nogen, nu er det mig.',
        move: '$ git clone <url>',
        does: {
          text: 'Kopierer et fjernrepository til en ny mappe: hele historikken og grenene (som `origin/…`), og skifter til hovedgrenen. git husker adressen som `origin`, så `git fetch`, `git pull` og `git push` virker bagefter.',
          meta: 'Du flytter ind i en møbleret lejelejlighed: alt, hvad de tidligere lejere efterlod, er der stadig, selv ringbindet med gamle regninger.',
        },
        tip: 'Findes projektet ikke nogen steder endnu? Så ikke clone, men `git init`: den opretter et tomt repository i den aktuelle mappe. Og fork er ikke en git-kommando, men en knap på GitHub: en kopi af en andens repository på din konto, som du så kloner.',
        opts: [
          {
            cmd: 'git clone <url> <mappe>',
            text: '— kopierer til en mappe med dit navn i stedet for repositoryets.',
            meta: 'Du vælger selv, hvad der skal stå på døren til den nye lejlighed.',
          },
          {
            cmd: 'git clone -b <gren> <url>',
            text: '— skifter straks til den angivne gren i stedet for hovedgrenen.',
            meta: 'Du går direkte ind i det rum, du skal bruge.',
          },
          {
            cmd: 'git clone --depth 1 <url>',
            text: '— kun den seneste commit og kun én gren; hurtigt, men uden historik.',
            meta: 'En møbleret lejlighed, men uden ringbindet med gamle regninger.',
          },
        ],
      },
      status: {
        title: 'Tre bunker',
        art: 'På væggen et portræt af en kat med lup. En person ser roligt på tre bunker tøj: en sok, et ærme og et håndklæde stikker op af kurven på hjul, brugt tøj ligger på gulvet, og ved siden af ligger en sammenfoldet ny skjorte med et stort prismærke.',
        line: 'Hvad har vi her? Lad os tjekke.',
        move: '$ git status',
        does: {
          text: 'Viser tilstanden i arbejdsmappen og indekset: hvilke ændringer der allerede er klar til commit (staged), hvilke der er ændret, men ikke klargjort endnu, og hvilke filer git ikke følger (untracked). Ændrer ingenting.',
          meta: 'Du sorterer tingene i tre bunker og ser, hvad der er hvor.',
        },
        tip: 'Kør den før hver `git add` og `git commit`: så kommer der ikke noget overflødigt med i committen.',
        opts: [
          {
            cmd: 'git status -s',
            text: '— én linje pr. fil; venstre kolonne er indekset, højre arbejdsmappen (`M` ændret, `A` tilføjet, `??` untracked).',
            meta: 'Samme overblik, én linje pr. ting.',
          },
          {
            cmd: 'git status --ignored',
            text: '— viser også de filer, som `.gitignore` skjuler.',
            meta: 'Du kigger også der, hvor du normalt ikke kigger.',
          },
        ],
      },
      add: {
        title: 'I kurven',
        art: 'På væggen et portræt af en kat, der sover i en kurv. En person lægger et blåt bundt ting i kurven på hjul, hvor der allerede ligger en sok, et ærme og et håndklæde; en sweater og en sok ligger stadig på gulvet, ikke tilføjet.',
        line: 'Ryd op på dit værelse, tak.',
        move: '$ git add .',
        does: {
          text: 'Tilføjer filens aktuelle tilstand til indekset (staged): præcis det kommer med i næste commit. En ny fil begynder git at følge efter `git add`.',
          meta: 'Du lægger ting i kurven for senere at pakke dem i en kasse.',
        },
        tip: 'Har du ændret filen efter `git add`? Tilføj den igen: indekset har tilstanden fra det øjeblik, du tilføjede den. Og efter en merge-konflikt er det netop `git add <fil>`, der markerer filen som løst.',
        opts: [
          {
            cmd: 'git add <fil>',
            text: '— tilføjer én fil (eller mappe).',
            meta: 'Én ting i kurven.',
          },
          {
            cmd: 'git add -p',
            text: '— viser ændringerne i stykker (hunks) og spørger til hvert; nye (untracked) filer tilbydes ikke.',
            meta: 'Du går bunken igennem og lægger kun det nødvendige i kurven.',
          },
        ],
      },
      commit: {
        title: 'Mærket kasse',
        art: 'Et loft. En stak kasser, hver med et billedmærke: nederst et juletræ, ovenover en julekugle. En person sætter et mærke med et lille hus på den nye gule kasse øverst. Ved siden af står en tom kurv på hjul, og et gammelt portræt af et egern med en kogle står lænet op ad stakken.',
        line: 'Hvad er der i kassen?',
        move: '$ git commit -m "…"',
        hint: 'beskeden med det samme, uden editor',
        does: {
          text: 'Gemmer indholdet af indekset som en ny commit i historikken for den aktuelle gren: med forfatter, dato og besked. Arbejdsmappen ændres ikke; committen forbliver lokal, indtil du laver `git push`.',
          meta: 'Du pakker ting i en kasse, mærker den og bærer den op på loftet.',
        },
        tip: 'Én commit, én tanke; skriv »hvorfor« i beskeden, ikke kun »hvad«.',
        opts: [
          {
            cmd: 'git commit -a',
            text: '— tilføjer først selv ændringerne i fulgte filer (ændrede og slettede), men ikke nye filer. Skrives som regel sammen med beskeden: `git commit -am "…"`.',
            meta: 'Det kendte op på loftet, det nye bliver.',
          },
          {
            cmd: 'git commit --amend',
            text: '— erstatter den seneste commit med en ny (med det aktuelle indeks og/eller en ny besked). Gør det ikke med en commit, der allerede er sendt med `git push`.',
            meta: 'Du skifter mærket på kassen fra loftet, før den bliver sendt.',
          },
        ],
      },
      log: {
        title: 'Familiealbum',
        art: 'Et opslået familiealbum med grønt omslag. Fire fotos, ældste først: et lille hus med et træ, en skildpadde, to mennesker side om side, havet og solen; under hvert en ulæselig billedtekst og en dato, fra 09.11.1996 til 15.07.2007.',
        line: 'Vil I se albummet?',
        move: '$ git log',
        does: {
          text: 'Viser commit-historikken for den aktuelle gren, nyeste først: hash, forfatter, dato, besked.',
          meta: 'Du blader albummet igennem fra det sidste foto og bagud.',
        },
        tip: 'En lang liste åbner i en pager: `q` for at afslutte, `/` for at søge.',
        opts: [
          {
            cmd: 'git log --oneline',
            text: '— forkortet hash og første linje af beskeden.',
            meta: 'Kun billedteksterne under fotoene.',
          },
          {
            cmd: 'git log --graph',
            text: '— tegner grene og merges med streger.',
            meta: 'Et stamtræ i stedet for en bunke fotos.',
          },
          {
            cmd: 'git log -p',
            text: '— viser ændringerne i hver commit.',
            meta: 'Under hvert foto: hvad der præcis ændrede sig.',
          },
          {
            cmd: 'git log -- <fil>',
            text: '— kun de commits, der ændrede denne fil.',
            meta: 'Alle fotos af én person.',
          },
        ],
      },
      diff: {
        title: 'Find forskellene',
        art: 'En person i en stue holder lejlighedens plantegning og sammenligner den med det, vedkommende ser. På tegningen er der et rundt bord, men i stuen er kun omridset tilbage på gulvet; på tegningen står standerlampen ved lænestolen, i stuen i den anden ende; den gamle lænestol er den samme. På væggen et portræt af en kamæleon, der holder et foto af sig selv i en anden farve, med et ikke-lig-med-tegn imellem.',
        line: 'Find tre forskelle',
        move: '$ git diff',
        does: {
          text: 'Viser linje for linje, hvad der er ændret: `-` en fjernet linje, `+` en tilføjet. Uden tilvalg sammenligner den arbejdsmappen med indekset, altså de ændringer, der endnu ikke er tilføjet med `git add`; nye (untracked) filer vises ikke.',
          meta: 'Du sammenligner »før« og »efter« ned til mindste detalje.',
        },
        tip: 'Efter `git add` er en almindelig `git diff` tom, men ændringerne er ikke væk: de ligger nu i indekset, og `git diff --staged` viser dem.',
        opts: [
          {
            cmd: 'git diff --staged',
            text: '— indekset mod den seneste commit, altså det, der kommer med i næste commit.',
            meta: 'Du kigger i kurven, før du bærer den op på loftet.',
          },
          {
            cmd: 'git diff HEAD',
            text: '— alle ændringer i forhold til den seneste commit, tilføjede og ikke-tilføjede.',
            meta: 'Du sammenligner hele stuen med det seneste foto i albummet.',
          },
          {
            cmd: 'git diff --stat',
            text: '— kun hvilke filer der er ændret, og hvor mange linjer.',
            meta: 'En liste over forskelle uden detaljer.',
          },
        ],
      },
      merge: {
        art: 'Til venstre kommer en smilende person ind ad den åbne hoveddør med en kasse med en gul mærkat; flere kasser af samme slags står allerede i stuen. Til højre står værten med hånden ved hagen og kigger på køkkenbordet, hvor to ens elkedler står side om side, værtens lyse og den nyankomnes gule, med et spørgsmålstegn imellem. På hylden over bordet står værtens egne kasser uden mærkater. På væggen et portræt af to katte, en grå og en lys, der snuser næse mod næse.',
      },
      fetch: {
        art: 'Til højre et juletræ med en stjerne og indpakkede gaver med orange bånd under det. En person på ét knæ ved træet holder en gave op til øret og ryster den for at gætte, hvad der er i, uden at pakke den op. På væggen et portræt af en hund med en gave i munden.',
      },
      pull: {
        art: 'Til venstre en stak af husets egne pakkede ting: kasser uden farve, hver med et skilt med et billede (et lille hus, en bog, en kop). Ved siden af står gaver med orange bånd; en person på knæ holder en sweater op, lige taget ud af en åben kasse, et bånd hænger ud over kanten og der ligger krøllet papir ved siden af. Til højre et juletræ. På væggen et portræt af en killing, der trækker det orange bånd af en gave.',
      },
      push: {
        art: 'En fælles hylde på posthuset, fuld af andres pakker med adresser og frimærker, med et skilt med en kuvert over. En person til venstre skubber af al kraft sin egen pakke med orange bånd ind på den fulde hylde, og i den anden ende falder en andens pakke på gulvet. På væggen et portræt af en brevdue med et brev.',
      },
      show: {
        art: 'Et opslået familiealbum med grønt omslag på et bord; ét sted er der kun fotohjørnerne og datoen 25.12.2026 tilbage, billedet er væk. En person står ved siden af og ser tæt på netop det billede: to mennesker på hver sin side af et juletræ, med samme dato nedenunder. På væggen et portræt af en hund med en grøn vinderroset som på en hundeudstilling.',
      },
      revert: {
        art: 'Til venstre på væggen det gamle tapet med bølgede striber, til højre det nye med prikker. En person på en skammel klistrer det gamle bølgede mønster op igen oven på det nye tapet: én gul bane sidder allerede, den nederste ende af den næste er stadig i hånden; kanten viser, at det nye tapet er tilbage nedenunder. På gulvet en spand klister med en pensel. På væggen et portræt af en gul krabbe med en pil mod venstre.',
      },
      'cherry-pick': {
        art: 'To opslåede opskriftshæfter på et bord. Til venstre bedstemors: stort og gammelt, med slidt omslag og et bogmærkebånd; en gryde på den ene side, en kirsebærtærte på den anden. Til højre et mindre spiralhæfte med gult omslag: en skål med spisepinde på den ene side og den samme tærte, kun halvt tegnet, på den anden. En person står foran bordet, læner sig over sit eget hæfte og tegner tærten af med en kuglepen. På væggen et portræt af en drossel med to gule kirsebær i næbbet.',
      },
      reset: {
        art: 'Hjemme et pyntet juletræ med en åben gul kasse fra loftet under. En person står mellem en skraldespand og træet: med den ene hånd hænger personen en hel julekugle på træet og smider med den anden en knust i skraldespanden. På væggen et portræt af en guldfisk i en glasskål.',
      },
      reflog: {
        art: 'Hjemme et pyntet juletræ og i hjørnet en skraldespand med en knust julekugle. En person ved træet læser en liste på et grønt clipboard: hver linje har en lille julekugle og tællestreger, én linje er ringet ind; personen kaster et blik på træet og tæller. På væggen et portræt af en rotte på kanten af en skraldespand.',
      },
      rebase: {
        art: 'Et loft. En stak kasser med billedskilte: bøger nederst, over dem en nyere kasse med et halloweengræskar, og øverst sætter en person forsigtigt to gule kasser, én med en fødselsdagskage og én med en bamse, og holder dem, så de ikke vælter. På væggen et portræt af en grå kat, der sidder på kasser.',
      },
      blame: {
        art: 'På køleskabet hænger en indkøbsliste under en grøn magnet: hver linje begynder med et billede af varen, er skrevet med en anden håndskrift og slutter med et lille ansigt på den, der skrev den; de samme ansigter hænger som fotomagneter på frysedøren. En person holder et forstørrelsesglas over enden af linjen med grønne vindruer, og i glasset ses et ansigt med en sløjfe. Ved fødderne en tom indkøbspose. På væggen et portræt af en hund med en grøn sok i munden.',
      },
      bisect: {
        art: 'En lyskæde hænger på tværs af væggen på to søm, og ingen af pærerne lyser. Under den venstre halvdel og den næste fjerdedel er der klammer med flueben: de dele er tjekket, med grønne tøjklemmer ved grænserne. En person har taget en pære ud af den resterende del og holder den op mod lyset: glasset er mørkt, glødetråden knækket; en reservepære i den anden hånd. På væggen et portræt af et marsvin, der gnaver i lyskædens ledning.',
      },
      tag: {
        art: 'Et reol i spisekammeret fuld af ens syltetøjsglas under stofdækkener; to glas har lyse etiketter, 2024 og 2025. En person på ét knæ ved reolen trykker en gul 2026-etiket fast på det nyeste glas på nederste hylde. En rulle gule etiketter ved siden af. På væggen et portræt af en hund med et gult navneskilt på halsbåndet.',
      },
    },
  },
};
