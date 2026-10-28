// Danish: every text on the site in one file (RSP-85). Keys must match i18n/en.js; check with: node scripts/check-locales.mjs
// Drafted by Claude, reviewed by Maryna (2026-10-13). Status names and creature names stay in English (they live in data/).
// Terminology: "request" in What to test and Traps (testers' language); the formal term in card meanings.
export default {
  // Interface. Functions build texts that contain numbers or names.
  ui: {
    tag: "Originale væsner, der hjælper dig med at huske HTTP-statuskoder. Hver kode har sin egen Responster, og hvert træk forklarer, hvad koden betyder.",
    tabs: [
      "Samling",
      "Træning",
      "Fælder"
    ],
    all: "Alle",
    mastered: (a,b)=>`${a} af ${b} lært`,
    known: "kan",
    modeArt: "Billede → kode",
    modeCode: "Kode → væsen",
    modeArtHint: "Se væsenet, vælg koden",
    modeCodeHint: "Se koden, find væsenet",
    modeNerd: "Nerd mode",
    modeNerdHint: "Kun tekst: læs, hvad den betyder, vælg koden",
    modeHard: "Hardcore",
    modeHardHint: "Kun koden: vælg statusnavnet",
    modes: "Træningstilstand",
    qArt: "Hvilken kode er det?",
    qCode: "Hvem er det?",
    qHard: "Hvad hedder denne status?",
    hint: "Hint",
    hintIs: n=>`Det er ${n}`,
    hintUsed: "Med hint: tæller med i scoren, men ikke til ✓.",
    score: (r,t,s)=>`${r}/${t} · stime ${s}`,
    ok: "Ja!",
    no: "Ikke den.",
    next: "Næste",
    mean: "Hvad den betyder",
    when: "Hvor du møder den",
    conf: "Forveksles ofte med",
    qa: "Hvad skal testes",
    links: "Værktøjer og læs mere",
    traps: "Par af koder, som folk oftest forveksler. Læs reglen, og sortér så situationerne.",
    foot: "Responsters · egne figurer og tekster; statusnavne efter RFC 9110.",
    lang: "Sprog",
    close: "Luk",
    back: "Tilbage til samlingen",
    howto: "Sådan bruger du det",
    howtoSteps: [
      "<b>Samling.</b> Tryk på et kort for at møde væsenet: hvad koden betyder, hvor du møder den, og hvad du skal teste.",
      "<b>Træning.</b> „Billede → kode“, „Kode → væsen“, „Nerd mode“ (kun tekst) eller „Hardcore“ (kun koden). To rigtige svar i træk giver koden sit ✓.",
      "<b>Fælder.</b> Par af koder, som folk forveksler: en regel og situationer, der skal sorteres."
    ],
    howtoNote: "Dine fremskridt gemmes kun i denne browser.",
    howtoClose: "Forstået",
  },
  // Status classes 1xx–5xx: name and one-line rule.
  classes: {
    1: { name: "Æg", rule: "Klækker stadig: serveren har fået forespørgslen og arbejder på den." },
    2: { name: "Venner", rule: "Det lykkedes." },
    3: { name: "Vandrere", rule: "Det, du leder efter, er et andet sted." },
    4: { name: "Portvogtere", rule: "Klientfejl: ret forespørgslen." },
    5: { name: "Serverbæster", rule: "Serverfejl: det er ikke din skyld." },
  },
  // Cards: what it means, where you meet it, and the card line in the creature's voice (max ~55 characters).
  cards: {
    102: {
      mean: "Serveren har modtaget forespørgslen og arbejder stadig på den. Der er intet svar endnu.",
      when: "Lange WebDAV-operationer; sjælden i almindelige API'er.",
      line: "Jeg er i gang! Intet resultat endnu." },
    200: {
      mean: "Forespørgslen lykkedes, og svaret indeholder resultatet.",
      when: "GET af en side eller liste, en POST, der ikke oprettede en ressource.",
      line: "Hvad kan jeg sige? Alt er godt!" },
    201: {
      mean: "En ny ressource er oprettet. Dens adresse står i Location-headeren.",
      when: "POST /orders oprettede en ordre.",
      line: "Splinterny! Jeg byggede den selv!" },
    204: {
      mean: "Succes, men svaret har ingen body.",
      when: "DELETE eller PUT uden noget at returnere.",
      line: "Klaret! Der er bare intet at vise." },
    301: {
      mean: "Ressourcen er flyttet permanent. Klienter og søgemaskiner bør opdatere URL'en.",
      when: "Flytning til et nyt domæne eller fra http til https.",
      line: "Flyttet for altid. Brug den nye adresse." },
    302: {
      mean: "Ressourcen er midlertidigt et andet sted. Den oprindelige URL er stadig korrekt.",
      when: "Omdirigering efter login, en midlertidig kampagneside.",
      line: "Væk lige nu. Tilbage snart." },
    304: {
      mean: "Intet er ændret, siden du cachede det. Brug din kopi.",
      when: "Browseren sendte If-None-Match eller If-Modified-Since.",
      line: "Uændret. Tjek din cache." },
    400: {
      mean: "Forespørgslen er forkert udformet: syntaks, format eller ugyldige data.",
      when: "Ødelagt JSON, et manglende obligatorisk felt, ugyldige query-parametre, en body, der er skåret over midtvejs.",
      line: "Sikke noget vrøvl! Jeg forstår ikke et ord." },
    401: {
      mean: "Godkendelse kræves: legitimationsoplysninger mangler eller er ugyldige.",
      when: "Ingen Authorization-header, et udløbet token.",
      line: "Hvem er du? Kender jeg dig?" },
    403: {
      mean: "Din identitet er kendt, men du mangler tilladelse.",
      when: "En almindelig bruger åbner adminpanelet.",
      line: "Nå, det er dig? Du kommer ikke ind!" },
    404: {
      mean: "Der findes intet på denne adresse.",
      when: "En tastefejl i URL'en, et slettet produkt.",
      line: "Her er ingen. Kig selv et andet sted." },
    405: {
      mean: "Serveren kender adressen, men accepterer ikke denne metode.",
      when: "En DELETE sendt til et endpoint, der kun accepterer GET.",
      line: "Ikke sådan! Skift metode." },
    408: {
      mean: "Klienten var for længe om at sende forespørgslen, så serveren holdt op med at vente.",
      when: "En langsom forbindelse, en upload, der er gået i stå.",
      line: "Sov over mig. Serveren gav op." },
    409: {
      mean: "Forespørgslen er i konflikt med ressourcens nuværende tilstand.",
      when: "En e-mail, der allerede er i brug ved tilmelding, en versionskonflikt under redigering.",
      line: "Jeg var her først! Træd tilbage!" },
    413: {
      mean: "Forespørgslens body er større end den tilladte grænse.",
      when: "Upload af en for stor fil.",
      line: "For meget! Det kan ikke være her!" },
    415: {
      mean: "Serveren understøtter ikke dette dataformat.",
      when: "XML i stedet for JSON, en forkert Content-Type.",
      line: "Adr! Det spiser jeg ikke! Tjek, hvad jeg kan lide." },
    418: {
      mean: "En spøgekode fra RFC 2324: en tekande nægter at brygge kaffe.",
      when: "Easter eggs i API'er. En fin bonus til en jobsamtale.",
      line: "Jeg er en tekande. Ingen kaffe." },
    422: {
      mean: "Forespørgslen blev læst, men dataene består ikke valideringen.",
      when: "En tekst i stedet for et tal, en negativ alder, „email: banana“.",
      line: "Læst. Men alder -5? Seriøst?" },
    429: {
      mean: "For mange forespørgsler på kort tid; en rate limit slog til.",
      when: "Et script uden pauser, en Retry-After-header i svaret.",
      line: "Stop! For mange. Lad mig trække vejret." },
    500: {
      mean: "Noget uventet gik i stykker på serveren.",
      when: "En ubehandlet exception i backend-koden.",
      line: "Det er ikke dig, det er mig." },
    502: {
      mean: "En gateway eller proxy sendte forespørgslen videre, men fik et ugyldigt svar fra serveren.",
      when: "Nginx foran en backend, der er gået ned.",
      line: "Det kom i stykker. Jeg sender det bare videre!" },
    503: {
      mean: "Serveren er midlertidigt utilgængelig: overbelastning eller vedligeholdelse.",
      when: "Planlagt vedligeholdelse, en overbelastet server.",
      line: "Lukket for reparation. Kom tilbage senere." },
    504: {
      mean: "En gateway eller proxy sendte forespørgslen videre, men fik aldrig svar fra serveren.",
      when: "En langsom backend bag nginx eller et CDN.",
      line: "Jeg ventede og ventede. Intet svar fra serveren." },
  },
  // "What to test": short test cases, steps → expected result (RSP-11).
  qa: {
    102: [
      "Start en lang operation (fx import af en stor fil eller kopiering af en stor mappe), og vent uden at røre siden → siden venter og viser resultatet, ingen timeout-fejl.",
      "Mens den lange operation kører, så hold øje med dens status i brugerfladen → den viser fremskridt, og „Færdig“ vises først, når operationen virkelig er slut.",
    ],
    200: [
      "Gem en post med kendte værdier, og åbn den derefter (eller listen, den står i) → hvert felt viser præcis det, der blev gemt, intet mangler og intet er i overskud.",
      "Åbn en liste uden elementer endnu (fx ordrer på en ny konto) → en venlig „Her er intet endnu“ og status 200, ikke en fejlside.",
      "Indsend en formular med ugyldige data, og tjek Network-fanen → status er 4xx, ikke 200 med en fejlbesked gemt indeni.",
    ],
    201: [
      "Opret et nyt element (fx en kommentar eller en ordre), og åbn listen → det nye element står der med præcis de værdier, du indtastede.",
      "Udfyld en oprettelsesformular, og dobbeltklik hurtigt på Send → der oprettes kun ét element.",
      "Opret et element, kopiér dets link, og åbn det i en ny fane → elementet åbner.",
    ],
    204: [
      "Slet et element fra en liste → det forsvinder med det samme uden fejlbesked og er stadig væk efter genindlæsning af siden.",
      "Kopiér linket til et element, slet elementet, og åbn så det kopierede link → en „ikke fundet“-side (404), ikke det gamle element.",
      "Åbn en post i to browserfaner. Slet den i den første fane, og prøv så at slette den i den anden → systemet håndterer det pænt (fx „Elementet blev ikke fundet“) uden serverfejl.",
    ],
    301: [
      "Åbn en gammel URL, der er flyttet (fx et gammelt produktlink) → du lander på den nye side, og Network-fanen viser ét 301-hop, ikke en kæde.",
      "Åbn den gamle URL med parametre tilføjet (fx ?page=2&sort=price) → den nye side åbner med de samme parametre.",
      "Åbn http://-versionen af en vilkårlig side → du sendes videre til https:// med status 301, ikke 302 eller en kopi af siden med 200.",
    ],
    302: [
      "Log ud, åbn en side, der kræver login, via et direkte link, og log så ind → du lander der, hvor kravene siger (tilbage på den side eller fx på kontoens forside), ikke på en fejlside eller en tom side.",
      "Find omdirigeringsparameteren i login-URL'en (fx ?next=/orders), erstat den med et eksternt site (?next=https://example.com), og log ind → du bliver på vores site.",
      "Indsend en formular (fx checkout), og tryk så F5 på bekræftelsessiden → ingen advarsel om at sende formularen igen og ingen ordre nummer to.",
    ],
    304: [
      "Åbn en side, og genindlæs den så med Network-fanen åben → billeder, scripts og styles, der ikke er ændret, kommer tilbage som 304.",
      "Ændr noget synligt (fx en produkttitel i admin), og genindlæs så siden normalt → den nye værdi vises, ikke den gamle fra cachen.",
      "Efter en deploy, åbn sitet i en browser, der har besøgt det før, uden at rydde cachen → sitet virker uden fejl (ingen blanding af gamle og nye filer), og den nye version vises med det samme eller inden for den angivne cachetid.",
    ],
    400: [
      "Send i Postman (eller DevTools) en request med ødelagt JSON eller uden et obligatorisk felt → status 400, ikke 500.",
      "Send den samme ødelagte request, og læs fejlbeskeden → den siger, hvad der præcis er galt (hvilket felt, hvilket format).",
      "Se hele fejlsvaret igennem → ingen stack trace, filstier eller SQL indeni.",
    ],
    401: [
      "Log ud, og åbn en privat side (eller kald dens API) via et direkte link → du får login-siden eller status 401, ikke indholdet.",
      "Log ind, vent til sessionen udløber (eller slet session-cookien), og klik så på noget → du bliver bedt om at logge ind igen, og efter login kan du fortsætte.",
      "Log ud, tryk Tilbage i browseren, og prøv en handling på den gamle side → ingen adgang, du bliver bedt om at logge ind.",
    ],
    403: [
      "Log ind som almindelig bruger, og åbn en admin-URL via et direkte link (fx /admin) → adminsiden åbner ikke (ingen adgang, en login-side eller en 404, som kravene siger).",
      "Log ind som bruger A, åbn en af dine ordrer, og ret id'et i URL'en til bruger B's ordre → B's ordre vises ikke.",
      "Som admin, kopiér requesten for en handling kun for admins fra DevTools; send den samme request som almindelig bruger → status 403, intet ændres.",
    ],
    404: [
      "Åbn en URL med en tastefejl (fx /prodcts) → en venlig 404-side med en vej tilbage (menu, søgning eller et link til forsiden).",
      "Åbn et element, og ret dets id i URL'en til et, der ikke findes (fx 999999) → en 404-side, ikke en serverfejl.",
      "Åbn en manglende side med Network-fanen åben → status er virkelig 404, ikke 200 (en „soft 404“).",
    ],
    405: [
      "Send i Postman DELETE (eller PUT) til et endpoint, der kun læser data (fx en offentlig liste) → status 405, intet bliver slettet.",
      "Se på headerne i det 405-svar → der er en Allow-header med de metoder, du kan bruge.",
      "Prøv hver ikke-understøttet metode på endpointet → altid 405, aldrig 404 eller 500.",
    ],
    408: [
      "Sæt netværket til Slow 3G i DevTools, og indsend en stor formular eller upload en stor fil → efter et stykke tid vises en tydelig timeout-besked, ikke en spinner, der aldrig stopper.",
      "Efter timeout-beskeden, sæt netværket tilbage til normal, og prøv igen → det virker, og de data, du skrev, står stadig i formularen.",
    ],
    409: [
      "Tilmeld dig med en e-mail, der allerede har en konto → der oprettes ingen ny konto, og beskeden er som kravene siger (direkte „Denne e-mail er allerede i brug“ eller neutralt „Tjek din indbakke“).",
      "Åbn den samme post i to faner. Ret og gem den i den første fane, ret og gem den så i den anden → den anden gemning advarer om konflikten i stedet for stille at overskrive den første ændring.",
      "Læs konfliktbeskeden → den siger, hvad der præcis er i konflikt (hvilket felt eller hvilken version).",
    ],
    413: [
      "Find upload-grænsen (fx 10 MB), og upload filer lige under, præcis på og lige over den → adfærden ved grænsen matcher kravene (≤ eller <), og alt større bliver afvist.",
      "Sammenlign grænsen i hjælpeteksten ved upload-feltet med den størrelse, der faktisk bliver afvist → de passer.",
      "Upload en fil, der tydeligt er for stor → en klar besked med den tilladte størrelse, ikke en afbrudt forbindelse eller en upload, der aldrig slutter.",
    ],
    415: [
      "Send i Postman en gyldig JSON-body med Content-Type: text/plain (eller uden Content-Type) → status 415, ikke 500.",
      "Send de samme data som XML eller form-data til et endpoint, der kun tager JSON → status 415 med en besked om, hvilket format der forventes.",
    ],
    418: [
      "Hvis produktet har et easter egg (fx /teapot), så kald det og derefter nogle rigtige endpoints → de rigtige virker stadig normalt.",
      "Tjek overvågning og alarmer efter kaldet til easter egget → ingen alarm om en ukendt fejl.",
    ],
    422: [
      "Skriv -5 i aldersfeltet (eller en ugyldig e-mail: „banana“, „anna@“, „@mail.com“, „anna@@mail.com“, „anna k@mail.com“), og indsend → en fejlbesked lige under feltet, og formularen bliver ikke sendt.",
      "Udfyld flere felter med ugyldige værdier og resten med gyldige, og indsend → alle fejl vises på én gang, og de gyldige værdier bliver stående.",
      "Prøv grænseværdier én ad gangen: et tomt obligatorisk felt, maks. længde + 1 tegn, en fødselsdato i fremtiden, 29. februar i et ikke-skudår → hver bliver afvist med en klar begrundelse.",
    ],
    429: [
      "Find den angivne grænse (dokumentation, svar-header, eller spørg en udvikler), fx 5 loginforsøg i minuttet; lav præcis så mange forsøg og så ét mere → kun det ekstra bliver blokeret.",
      "Når blokeringstiden er gået, prøv igen → det virker igen.",
      "Ram grænsen som bruger A, og prøv så straks som bruger B i en anden browser → bruger B bør ikke være blokeret.",
    ],
    500: [
      "Fjern maxlength, required eller pattern fra feltet i DevTools (Elements-fanen), og indsend formularen med uventede data: emoji, en tekst ét tegn over backendens eller databasens grænse, <script>, ' OR 1=1 → ingen 500: enten et normalt resultat eller en valideringsfejl.",
      "Hvis formularen validerer med JavaScript, så kopiér requesten i Network (Copy as fetch) eller åbn den i Postman, indsæt de samme data, og send → igen ingen 500.",
      "Hvis en 500 alligevel opstår, så se på siden → en besked til brugeren uden tekniske oplysninger (fx „Noget gik galt, prøv igen“).",
      "Efter en 500, tjek logs eller overvågning → fejlen står der med tidspunkt, URL og detaljer om requesten.",
    ],
    502: [
      "Stop backend-servicen i et testmiljø, og åbn sitet → en venlig fejlside, ikke en rå nginx- eller proxyside.",
      "Læs fejlsiden og dens svar → ingen interne IP-adresser, værtsnavne eller serverversioner.",
      "Start backenden igen, og genindlæs sitet → det virker uden ekstra trin.",
    ],
    503: [
      "Slå planlagt vedligeholdelsestilstand til (eller åbn sitet under en deploy) → en vedligeholdelsesside med forventet tidspunkt for, hvornår sitet er tilbage, ikke et ødelagt layout.",
      "Åbn vedligeholdelsessiden med Network-fanen åben → status 503, ikke 200.",
      "Under en belastningstest, hold øje med svarene, mens belastningen stiger → ved overbelastning får nogle requests 503, men sitet går ikke helt ned og kommer sig, når belastningen falder.",
    ],
    504: [
      "Start den langsomste operation, du kan finde (fx en årsrapport eller en fuld eksport) → efter timeouten vises en klar besked, ikke en spinner, der aldrig stopper.",
      "Start en meget lang operation, og forlad siden → den fortsætter i baggrunden, og du får en notifikation (eller en færdig fil), når den er klar.",
      "Efter timeout-beskeden, tryk på Prøv igen → operationen starter igen uden at du skal indtaste filtre eller data igen.",
    ],
  },
  // Traps: title, rule and the situations to sort, in the order of data/traps.js (the answers live there).
  traps: {
    "401-403": {
      title: "Whoowl eller Nopelican?",
      rule: "401: vis, hvem du er, så kommer du ind. 403: vi ved, hvem du er, og svaret er stadig nej.",
      s: [
        "Tokenet er udløbet.",
        "En logget ind bruger sletter en andens ordre.",
        "Requesten har ingen Authorization-header.",
        "En almindelig bruger åbner /admin.",
      ] },
    "301-302": {
      title: "Relocrab eller Brbat?",
      rule: "301: flyttet for altid. 302: midlertidigt et andet sted, den gamle adresse er stadig rigtig.",
      s: [
        "Sitet er flyttet permanent til et nyt domæne.",
        "Efter login sendes du tilbage til den side, du kom fra.",
        "Alle http-URL'er peger nu permanent på https.",
        "Under et udsalg omdirigerer forsiden til kampagnesiden.",
      ] },
    "200-201-204": {
      title: "Okayak, Buildbeaver eller Nullwing?",
      rule: "200: her er resultatet. 201: noget nyt er oprettet. 204: klaret, intet at vise.",
      s: [
        "GET /orders returnerede listen over ordrer.",
        "POST /orders oprettede en ny ordre.",
        "DELETE /orders/42 lykkedes uden body.",
      ] },
    "408-503": {
      title: "Slowth eller Hibearnate?",
      rule: "408: du, klienten, er for langsom. 503: serveren sover.",
      s: [
        "Klienten begyndte at uploade en stor fil og gik i stå.",
        "Serveren er under planlagt vedligeholdelse.",
      ] },
    "500-502": {
      title: "Panicorn eller Parroxy?",
      rule: "500: serveren selv gik i stykker. 502: proxyen sendte forespørgslen videre og fik skrald tilbage fra serveren.",
      s: [
        "En ubehandlet exception i backend-koden.",
        "Nginx fik intet gyldigt svar fra backenden.",
      ] },
    "429-503": {
      title: "Spamster eller Hibearnate?",
      rule: "429: for mange requests fra dig. 503: serveren er nede for alle.",
      s: [
        "Dit script sender tusind requests i sekundet.",
        "Serveren er overbelastet og svarer ingen.",
      ] },
    "400-404": {
      title: "Garblin eller Nowherret?",
      rule: "400: requesten kan ikke læses. 404: den blev læst, men der er intet.",
      s: [
        "JSON'en mangler en afsluttende krøllet parentes.",
        "GET /users/99999, og den bruger findes ikke.",
      ] },
    "404-405": {
      title: "Nowherret eller Verbadger?",
      rule: "404: ingen bor på denne adresse. 405: adressen findes, men denne metode accepteres ikke her.",
      s: [
        "DELETE /products, selvom produktlisten kun kan læses.",
        "GET /prodcts med en tastefejl i adressen.",
        "PUT til /login, som kun accepterer POST.",
        "GET /orders/777 for en ordre, der er slettet.",
      ] },
    "409-422": {
      title: "Clashgoat eller Nitpecker?",
      rule: "409: dataene er fine, men støder sammen med det, der allerede findes. 422: selve dataene giver ingen mening.",
      s: [
        "Tilmelding med en e-mail, der allerede er i brug.",
        "Tilmelding med e-mailen „banana“.",
        "To personer redigerer den samme post, og den anden ændring bygger på en forældet version.",
        "Aldersfeltet siger −5.",
      ] },
    "400-422": {
      title: "Garblin eller Nitpecker?",
      rule: "400: requesten kan slet ikke læses. 422: den blev læst, men værdierne giver ingen mening. 400 er den generelle klientfejl: når en mere specifik kode passer, bruger serveren den.",
      s: [
        "JSON'en har et uafsluttet anførselstegn, og parseren fejler.",
        "JSON'en er gyldig, men fødselsdatoen ligger i fremtiden.",
        "Requestens body er skåret over midtvejs.",
        "En ordre på −3 stk.",
      ] },
    "400-415": {
      title: "Garblin eller Pickoala?",
      rule: "400: det rigtige format, men en ødelagt request. 415: serveren accepterer slet ikke dette format. 400 er den generelle klientfejl: når en mere specifik kode passer, bruger serveren den.",
      s: [
        "Content-Type: application/xml til et endpoint, der kun accepterer JSON.",
        "Content-Type: application/json, men body'en er ødelagt JSON.",
        "En avatar uploades som .exe i stedet for .png.",
        "JSON'en har et komma efter det sidste felt.",
      ] },
    "502-504": {
      title: "Parroxy eller Waitgator?",
      rule: "502: proxyen sendte forespørgslen videre og fik skrald tilbage fra serveren. 504: den fik aldrig svar fra serveren.",
      s: [
        "Nginx fik et ugyldigt svar fra backenden.",
        "Backenden bruger 2 minutter på at lave en rapport, men proxyen venter kun 60 sekunder.",
        "Backenden genstarter og afbryder forbindelsen midt i svaret.",
        "Databasen hang, så backenden svarede aldrig gatewayen.",
      ] },
    "408-504": {
      title: "Slowth eller Waitgator?",
      rule: "408: en langsom klient; serveren holdt op med at vente på requesten. 504: en langsom server bag gatewayen; gatewayen holdt op med at vente på svaret.",
      s: [
        "En telefon på svag mobildata begynder at sende en formular, og requesten går i stå midtvejs.",
        "CDN'et fik ikke svar fra din server i tide.",
        "Klienten åbnede en forbindelse og sender intet.",
        "Proxyen ventede på betalings-microservicen, som forbliver tavs.",
      ] },
  },
  // "Tools and Read more": labels for data/links.js TOOLS, in the same order.
  tools: [
    "Chrome DevTools: Network-panelet",
    "Firefox: Edit and Resend",
    "Postman: send en forespørgsel",
  ],
};
