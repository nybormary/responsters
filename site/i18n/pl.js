// Polish: every text on the site in one file (RSP-85). Keys must match i18n/en.js; check with: node scripts/check-locales.mjs
// Drafted by Claude, reviewed by Maryna (2026-10-13). Status names and creature names stay in English (they live in data/).
// Terminology: "request" in What to test and Traps (testers' language); the formal term in card meanings.
export default {
  // Interface. Functions build texts that contain numbers or names.
  ui: {
    tag: "Oryginalne stworki do zapamiętywania kodów statusu HTTP. Każdy kod ma swojego Responstera, a każdy jego ruch wyjaśnia, co kod znaczy.",
    tabs: [
      "Kolekcja",
      "Trening",
      "Pułapki"
    ],
    all: "Wszystkie",
    mastered: (a,b)=>`${a} z ${b} opanowanych`,
    known: "znam",
    modeArt: "Rysunek → kod",
    modeCode: "Kod → stworek",
    modeArtHint: "Widzisz stworka, wybierasz kod",
    modeCodeHint: "Widzisz kod, szukasz, kto to",
    modeNerd: "Nerd mode",
    modeNerdHint: "Sam tekst: czytasz opis, wybierasz kod",
    modeHard: "Hardcore",
    modeHardHint: "Tylko kod: wybierasz nazwę statusu",
    modes: "Tryb treningu",
    qArt: "Jaki to kod?",
    qCode: "Który to?",
    qHard: "Jak nazywa się ten status?",
    hint: "Podpowiedź",
    hintIs: n=>`To ${n}`,
    hintUsed: "Z podpowiedzią: liczy się do wyniku, ale nie do ✓.",
    score: (r,t,s)=>`${r}/${t} · seria ${s}`,
    ok: "Tak!",
    no: "Nie ten.",
    next: "Dalej",
    mean: "Co to znaczy",
    when: "Gdzie go spotkasz",
    conf: "Często mylony z",
    qa: "Co testować",
    links: "Narzędzia i więcej",
    traps: "Pary kodów, które najczęściej się mylą. Przeczytaj regułę, potem przyporządkuj sytuacje.",
    foot: "Responsters · postacie i teksty własne; nazwy statusów według RFC 9110.",
    lang: "Język",
    close: "Zamknij",
    back: "Wróć do kolekcji",
    howto: "Jak korzystać",
    howtoSteps: [
      "<b>Kolekcja.</b> Dotknij karty, żeby poznać stworka: co znaczy kod, gdzie go spotkasz i co testować.",
      "<b>Trening.</b> „Rysunek → kod”, „Kod → stworek”, „Nerd mode” (sam tekst) albo „Hardcore” (tylko kod). Dwie poprawne odpowiedzi z rzędu dają kodowi ✓.",
      "<b>Pułapki.</b> Pary kodów, które się mylą: reguła i sytuacje do przyporządkowania."
    ],
    howtoNote: "Postęp zapisuje się tylko w tej przeglądarce.",
    howtoClose: "Jasne",
  },
  // Status classes 1xx–5xx: name and one-line rule.
  classes: {
    1: { name: "Jajka", rule: "Jeszcze się wykluwają: serwer dostał żądanie i nad nim pracuje." },
    2: { name: "Przyjaciele", rule: "Udało się." },
    3: { name: "Wędrowcy", rule: "To, czego szukasz, jest gdzie indziej." },
    4: { name: "Strażnicy", rule: "Błąd po stronie klienta: popraw żądanie." },
    5: { name: "Serwerowe bestie", rule: "Błąd serwera: to nie twoja wina." },
  },
  // Cards: what it means, where you meet it, and the card line in the creature's voice (max ~55 characters).
  cards: {
    102: {
      mean: "Serwer przyjął żądanie i wciąż je przetwarza. Odpowiedzi jeszcze nie ma.",
      when: "Długie operacje WebDAV; w zwykłych API rzadko.",
      line: "Już się robi! Wyniku jeszcze brak." },
    200: {
      mean: "Żądanie się powiodło, a odpowiedź zawiera wynik.",
      when: "GET strony lub listy, POST, który nie utworzył zasobu.",
      line: "Co mogę powiedzieć? Wszystko gra!" },
    201: {
      mean: "Utworzono nowy zasób. Jego adres jest w nagłówku Location.",
      when: "POST /orders utworzył zamówienie.",
      line: "Nowiutkie! Sam zbudowałem!" },
    204: {
      mean: "Sukces, ale odpowiedź nie ma treści.",
      when: "DELETE lub PUT, gdy nie ma nic do zwrócenia.",
      line: "Zrobione! Tylko nie ma czego pokazać." },
    301: {
      mean: "Zasób przeniósł się na stałe. Klienci i wyszukiwarki powinni zaktualizować URL.",
      when: "Przeprowadzka na nową domenę albo z http na https.",
      line: "Przeniosłem się na stałe. Używaj nowego adresu." },
    302: {
      mean: "Zasób jest tymczasowo gdzie indziej. Oryginalny URL pozostaje poprawny.",
      when: "Przekierowanie po zalogowaniu, tymczasowa strona promocji.",
      line: "Na razie mnie nie ma. Zaraz wracam." },
    304: {
      mean: "Nic się nie zmieniło, odkąd zapisałeś to w cache. Użyj swojej kopii.",
      when: "Przeglądarka wysłała If-None-Match lub If-Modified-Since.",
      line: "Bez zmian. Zajrzyj do cache." },
    400: {
      mean: "Żądanie jest błędne: składnia, format lub nieprawidłowe dane.",
      when: "Zepsuty JSON, brak wymaganego pola, błędne parametry zapytania, treść żądania ucięta w połowie.",
      line: "Co za bzdury! Nic nie rozumiem." },
    401: {
      mean: "Wymagane uwierzytelnienie: brak danych logowania lub są nieprawidłowe.",
      when: "Brak nagłówka Authorization, wygasły token.",
      line: "Kim jesteś? Znamy się?" },
    403: {
      mean: "Wiadomo, kim jesteś, ale nie masz uprawnień.",
      when: "Zwykły użytkownik otwiera panel admina.",
      line: "A, to ty? Nie wpuszczę!" },
    404: {
      mean: "Pod tym adresem nic nie ma.",
      when: "Literówka w URL, usunięty produkt.",
      line: "Nikogo tu nie ma. Szukaj gdzie indziej." },
    405: {
      mean: "Serwer zna ten adres, ale nie przyjmuje tej metody.",
      when: "DELETE wysłany do endpointu, który przyjmuje tylko GET.",
      line: "Nie tak! Zmień metodę." },
    408: {
      mean: "Klient za długo wysyłał żądanie, więc serwer przestał czekać.",
      when: "Wolne połączenie, zatrzymane przesyłanie.",
      line: "Zaspałem. Serwer przestał czekać." },
    409: {
      mean: "Żądanie jest sprzeczne z obecnym stanem zasobu.",
      when: "Zajęty e-mail przy rejestracji, konflikt wersji podczas edycji.",
      line: "Byłem tu pierwszy! Odsuń się!" },
    413: {
      mean: "Treść żądania przekracza dozwolony limit.",
      when: "Wysyłanie za dużego pliku.",
      line: "Za dużo! Nie zmieszczę!" },
    415: {
      mean: "Serwer nie obsługuje tego formatu danych.",
      when: "XML zamiast JSON, zły Content-Type.",
      line: "Fuj! Tego nie jem! Sprawdź, co lubię." },
    418: {
      mean: "Żartobliwy kod z RFC 2324: czajnik odmawia parzenia kawy.",
      when: "Easter eggi w API. Miły bonus na rozmowie rekrutacyjnej.",
      line: "Jestem czajnikiem. Kawy nie będzie." },
    422: {
      mean: "Żądanie przeczytano, ale dane nie przechodzą walidacji.",
      when: "Tekst zamiast liczby, ujemny wiek, „email: banana”.",
      line: "Przeczytałem. Ale wiek -5? Serio?" },
    429: {
      mean: "Za dużo żądań w krótkim czasie; zadziałał limit.",
      when: "Skrypt bez przerw, nagłówek Retry-After w odpowiedzi.",
      line: "Stop! Za dużo. Daj odetchnąć." },
    500: {
      mean: "Na serwerze zepsuło się coś nieoczekiwanego.",
      when: "Nieobsłużony wyjątek w kodzie backendu.",
      line: "To nie ty, to ja." },
    502: {
      mean: "Bramka lub proxy dostały nieprawidłową odpowiedź od serwera za nimi.",
      when: "Nginx przed backendem, który padł.",
      line: "Przyszło zepsute. Ja tylko przekazuję!" },
    503: {
      mean: "Serwer jest chwilowo niedostępny: przeciążenie lub prace serwisowe.",
      when: "Planowane prace serwisowe, przeciążony serwer.",
      line: "Zamknięte z powodu remontu. Wróć później." },
    504: {
      mean: "Bramka lub proxy nie doczekały się odpowiedzi od serwera za nimi.",
      when: "Wolny backend za nginx lub CDN.",
      line: "Czekałem i czekałem. Serwer milczy." },
  },
  // "What to test": short test cases, steps → expected result (RSP-11).
  qa: {
    102: [
      "Uruchom długą operację (np. import dużego pliku albo kopiowanie dużego folderu) i czekaj, niczego nie dotykając → strona czeka i pokazuje wynik, bez błędu timeoutu.",
      "Podczas długiej operacji obserwuj jej status w interfejsie → widać postęp, a „Gotowe” pojawia się dopiero po faktycznym zakończeniu.",
    ],
    200: [
      "Zapisz rekord ze znanymi wartościami, potem go otwórz (albo listę, w której jest) → każde pole pokazuje dokładnie to, co zapisano, niczego nie brakuje i nic nie jest zbędne.",
      "Otwórz listę, w której jeszcze nic nie ma (np. zamówienia nowego konta) → przyjazne „Na razie nic tu nie ma” i status 200, a nie strona błędu.",
      "Wyślij formularz z błędnymi danymi i sprawdź zakładkę Network → status 4xx, a nie 200 z komunikatem o błędzie ukrytym w środku.",
    ],
    201: [
      "Utwórz nowy element (np. komentarz lub zamówienie) i otwórz listę → nowy element jest na liście z dokładnie tymi wartościami, które wpisano.",
      "Wypełnij formularz tworzenia i szybko kliknij dwa razy „Wyślij” → tworzy się tylko jeden element.",
      "Utwórz element, skopiuj jego link i otwórz w nowej karcie → element się otwiera.",
    ],
    204: [
      "Usuń element z listy → znika od razu, bez komunikatu o błędzie, i nie wraca po odświeżeniu strony.",
      "Skopiuj link do elementu, usuń element, potem otwórz skopiowany link → strona „nie znaleziono” (404), a nie stary element.",
      "Otwórz rekord w dwóch kartach przeglądarki. Usuń go w pierwszej karcie, potem spróbuj usunąć w drugiej → system radzi sobie z tym łagodnie (np. „Nie znaleziono elementu”), bez błędu serwera.",
    ],
    301: [
      "Otwórz stary URL, który się przeniósł (np. stary link do produktu) → trafiasz na nową stronę, a zakładka Network pokazuje jedno przekierowanie 301, a nie łańcuch.",
      "Otwórz stary URL z dodanymi parametrami (np. ?page=2&sort=price) → nowa strona otwiera się z tymi samymi parametrami.",
      "Otwórz wersję http:// dowolnej strony → następuje przekierowanie na https:// ze statusem 301, a nie 302 ani kopia strony z 200.",
    ],
    302: [
      "Wyloguj się, otwórz stronę wymagającą logowania przez bezpośredni link, potem się zaloguj → lądujesz tam, gdzie mówią wymagania (z powrotem na tej stronie albo np. w panelu konta), a nie na stronie błędu czy pustej stronie.",
      "Znajdź parametr przekierowania w URL logowania (np. ?next=/orders), zamień go na zewnętrzną stronę (?next=https://example.com) i zaloguj się → zostajesz na naszej stronie.",
      "Wyślij formularz (np. checkout), potem naciśnij F5 na stronie potwierdzenia → brak ostrzeżenia o ponownym wysłaniu formularza i brak drugiego zamówienia.",
    ],
    304: [
      "Otwórz stronę, potem przeładuj ją z otwartą zakładką Network → obrazy, skrypty i style, które się nie zmieniły, wracają jako 304.",
      "Zmień coś widocznego (np. nazwę produktu w panelu admina), potem zwyczajnie przeładuj stronę → widać nową wartość, a nie starą z cache.",
      "Po wdrożeniu otwórz stronę w przeglądarce, która już ją odwiedzała, bez czyszczenia cache → strona działa bez błędów (bez mieszanki starych i nowych plików), a nowa wersja pokazuje się od razu albo w zadeklarowanym czasie cache.",
    ],
    400: [
      "W Postmanie (lub DevTools) wyślij request z zepsutym JSON-em albo bez wymaganego pola → status 400, a nie 500.",
      "Wyślij ten sam zepsuty request i przeczytaj komunikat o błędzie → mówi, co dokładnie jest nie tak (które pole, jaki format).",
      "Obejrzyj całą odpowiedź z błędem → w środku nie ma stack trace'a, ścieżek plików ani SQL.",
    ],
    401: [
      "Wyloguj się i otwórz prywatną stronę (albo wywołaj jej API) przez bezpośredni link → dostajesz stronę logowania albo status 401, a nie treść.",
      "Zaloguj się, poczekaj, aż sesja wygaśnie (albo usuń ciasteczko sesji), potem coś kliknij → system prosi o ponowne logowanie, a po zalogowaniu można kontynuować.",
      "Wyloguj się, naciśnij Wstecz w przeglądarce i spróbuj wykonać akcję na starej stronie → brak dostępu, system prosi o zalogowanie.",
    ],
    403: [
      "Zaloguj się jako zwykły użytkownik i otwórz URL admina przez bezpośredni link (np. /admin) → strona admina się nie otwiera (brak dostępu, strona logowania albo 404, zgodnie z wymaganiami).",
      "Zaloguj się jako użytkownik A, otwórz jedno ze swoich zamówień i zmień id w URL na zamówienie użytkownika B → zamówienie B się nie pokazuje.",
      "Jako admin skopiuj z DevTools request akcji dostępnej tylko dla admina; jako zwykły użytkownik wyślij ten sam request → status 403, nic się nie zmienia.",
    ],
    404: [
      "Otwórz URL z literówką (np. /prodcts) → przyjazna strona 404 z drogą powrotu (menu, wyszukiwarka albo link do strony głównej).",
      "Otwórz element i zmień jego id w URL na nieistniejące (np. 999999) → strona 404, a nie błąd serwera.",
      "Otwórz nieistniejącą stronę z otwartą zakładką Network → status to naprawdę 404, a nie 200 („soft 404”).",
    ],
    405: [
      "W Postmanie wyślij DELETE (albo PUT) do endpointu, który tylko odczytuje dane (np. publiczna lista) → status 405, nic nie zostaje usunięte.",
      "Obejrzyj nagłówki tej odpowiedzi 405 → jest nagłówek Allow z listą dozwolonych metod.",
      "Wypróbuj na endpoincie każdą nieobsługiwaną metodę → zawsze 405, nigdy 404 ani 500.",
    ],
    408: [
      "W DevTools ustaw sieć na Slow 3G i wyślij duży formularz albo duży plik → po chwili pojawia się jasny komunikat o przekroczeniu czasu, a nie niekończące się kółko ładowania.",
      "Po komunikacie o timeoucie przełącz sieć z powrotem na normalną i spróbuj ponownie → działa, a wpisane dane wciąż są w formularzu.",
    ],
    409: [
      "Zarejestruj się na e-mail, który ma już konto → nowe konto nie powstaje, a komunikat jest taki, jak mówią wymagania (wprost „Ten e-mail jest już używany” albo neutralne „Sprawdź skrzynkę”).",
      "Otwórz ten sam rekord w dwóch kartach. Zmień i zapisz go w pierwszej, potem zmień i zapisz w drugiej → drugie zapisanie ostrzega o konflikcie, zamiast po cichu nadpisać pierwszą zmianę.",
      "Przeczytaj komunikat o konflikcie → mówi, co dokładnie się kłóci (które pole albo która wersja).",
    ],
    413: [
      "Znajdź limit uploadu (np. 10 MB) i wyślij pliki tuż poniżej, dokładnie na limicie i tuż powyżej → zachowanie na granicy zgadza się z wymaganiami (≤ czy <), a wszystko większe jest odrzucane.",
      "Porównaj limit z podpowiedzi przy polu uploadu z rozmiarem, który faktycznie jest odrzucany → zgadzają się.",
      "Wyślij plik wyraźnie za duży → jasny komunikat z dozwolonym rozmiarem, a nie zerwane połączenie czy niekończący się upload.",
    ],
    415: [
      "W Postmanie wyślij poprawne ciało JSON z Content-Type: text/plain (albo bez Content-Type) → status 415, a nie 500.",
      "Wyślij te same dane jako XML albo form-data do endpointu, który przyjmuje tylko JSON → status 415 z komunikatem, jakiego formatu oczekuje.",
    ],
    418: [
      "Jeśli produkt ma easter egga (np. /teapot), wywołaj go, a potem kilka prawdziwych endpointów → prawdziwe działają normalnie.",
      "Po wywołaniu easter egga sprawdź monitoring i alerty → brak alarmu o nieznanym błędzie.",
    ],
    422: [
      "Wpisz -5 w polu wieku (albo błędny e-mail: „banana”, „anna@”, „@mail.com”, „anna@@mail.com”, „anna k@mail.com”) i wyślij → komunikat o błędzie tuż pod tym polem, formularz nie zostaje wysłany.",
      "Wypełnij kilka pól błędnymi wartościami, a resztę poprawnymi, potem wyślij → wszystkie błędy widać naraz, a poprawne wartości zostają w polach.",
      "Sprawdzaj wartości graniczne po kolei: puste pole wymagane, maksymalna długość + 1 znak, data urodzenia w przyszłości, 29 lutego w roku nieprzestępnym → każda jest odrzucana z jasnym powodem.",
    ],
    429: [
      "Znajdź zadeklarowany limit (dokumentacja, nagłówek odpowiedzi albo zapytaj developera), np. 5 prób logowania na minutę; zrób dokładnie tyle prób, potem jeszcze jedną → zablokowana jest tylko ta dodatkowa.",
      "Gdy czas blokady minie, spróbuj ponownie → znów działa.",
      "Dojdź do limitu jako użytkownik A, potem od razu spróbuj jako użytkownik B w innej przeglądarce → użytkownik B nie powinien być zablokowany.",
    ],
    500: [
      "W DevTools (zakładka Elements) usuń z pola maxlength, required lub pattern i wyślij formularz z nieoczekiwanymi danymi: emoji, tekst o jeden znak dłuższy niż limit backendu lub bazy, <script>, ' OR 1=1 → brak 500: albo normalny wynik, albo błąd walidacji.",
      "Jeśli formularz waliduje JavaScriptem, skopiuj request w Network (Copy as fetch) albo otwórz go w Postmanie, wstaw te same dane i wyślij → znów brak 500.",
      "Jeśli 500 jednak wystąpi, spójrz na stronę → komunikat dla użytkownika bez informacji technicznych (np. „Coś poszło nie tak, spróbuj ponownie”).",
      "Po 500 sprawdź logi lub monitoring → błąd tam jest, z czasem, URL i szczegółami requesta.",
    ],
    502: [
      "Na środowisku testowym zatrzymaj usługę backendu i otwórz stronę → przyjazna strona błędu, a nie surowa strona nginx czy proxy.",
      "Przeczytaj tę stronę błędu i jej odpowiedź → brak wewnętrznych adresów IP, nazw hostów i wersji serwera.",
      "Uruchom backend ponownie i przeładuj stronę → działa bez żadnych dodatkowych kroków.",
    ],
    503: [
      "Włącz tryb planowanych prac serwisowych (albo otwórz stronę podczas wdrożenia) → strona serwisowa z przewidywanym czasem powrotu, a nie rozsypany layout.",
      "Otwórz stronę serwisową z otwartą zakładką Network → status 503, a nie 200.",
      "Podczas testu obciążeniowego obserwuj odpowiedzi przy rosnącym ruchu → przy przeciążeniu część requestów dostaje 503, ale strona nie pada całkowicie i wraca do normy, gdy ruch spada.",
    ],
    504: [
      "Uruchom najwolniejszą operację, jaką znajdziesz (np. raport roczny albo pełny eksport) → po timeoucie pojawia się jasny komunikat, a nie niekończące się kółko ładowania.",
      "Uruchom bardzo długą operację i opuść stronę → operacja trwa w tle, a po zakończeniu dostajesz powiadomienie (albo gotowy plik).",
      "Po komunikacie o timeoucie naciśnij „Spróbuj ponownie” → operacja startuje od nowa bez ponownego wpisywania filtrów czy danych.",
    ],
  },
  // Traps: title, rule and the situations to sort, in the order of data/traps.js (the answers live there).
  traps: {
    "401-403": {
      title: "Whoowl czy Nopelican?",
      rule: "401: pokaż, kim jesteś, i wejdziesz. 403: wiemy, kim jesteś, wciąż nie.",
      s: [
        "Token wygasł.",
        "Zalogowany użytkownik usuwa cudze zamówienie.",
        "Request nie ma nagłówka Authorization.",
        "Zwykły użytkownik otwiera /admin.",
      ] },
    "301-302": {
      title: "Relocrab czy Brbat?",
      rule: "301: przeniósł się na stałe. 302: tymczasowo gdzie indziej, stary adres wciąż jest właściwy.",
      s: [
        "Strona przeniosła się na stałe na nową domenę.",
        "Po zalogowaniu wracasz na stronę, z której przyszedłeś.",
        "Wszystkie adresy http na stałe prowadzą na https.",
        "Na czas wyprzedaży strona główna przekierowuje na stronę promocji.",
      ] },
    "200-201-204": {
      title: "Okayak, Buildbeaver czy Nullwing?",
      rule: "200: oto wynik. 201: powstało coś nowego. 204: zrobione, nie ma czego pokazać.",
      s: [
        "GET /orders zwrócił listę zamówień.",
        "POST /orders utworzył nowe zamówienie.",
        "DELETE /orders/42 się udał, bez treści odpowiedzi.",
      ] },
    "408-503": {
      title: "Slowth czy Hibearnate?",
      rule: "408: to ty, klient, jesteś za wolny. 503: serwer śpi.",
      s: [
        "Klient zaczął wysyłać duży plik i utknął.",
        "Na serwerze trwają planowane prace serwisowe.",
      ] },
    "500-502": {
      title: "Panicorn czy Parroxy?",
      rule: "500: zepsuł się sam serwer. 502: proxy dostało śmieci od serwera za nim.",
      s: [
        "Nieobsłużony wyjątek w kodzie backendu.",
        "Nginx nie dostał poprawnej odpowiedzi od backendu.",
      ] },
    "429-503": {
      title: "Spamster czy Hibearnate?",
      rule: "429: za dużo requestów od ciebie. 503: serwer leży dla wszystkich.",
      s: [
        "Twój skrypt wysyła tysiąc requestów na sekundę.",
        "Serwer jest przeciążony i nikomu nie odpowiada.",
      ] },
    "400-404": {
      title: "Garblin czy Nowherret?",
      rule: "400: nie da się przeczytać requesta. 404: przeczytany, ale nic tam nie ma.",
      s: [
        "W JSON-ie brakuje zamykającego nawiasu klamrowego.",
        "GET /users/99999, a taki użytkownik nie istnieje.",
      ] },
    "404-405": {
      title: "Nowherret czy Verbadger?",
      rule: "404: pod tym adresem nikt nie mieszka. 405: adres istnieje, ale ta metoda nie jest tu przyjmowana.",
      s: [
        "DELETE /products, choć lista produktów jest tylko do odczytu.",
        "GET /prodcts z literówką w adresie.",
        "PUT na /login, który przyjmuje tylko POST.",
        "GET /orders/777 dla zamówienia, które usunięto.",
      ] },
    "409-422": {
      title: "Clashgoat czy Nitpecker?",
      rule: "409: dane są w porządku, ale kłócą się z tym, co już istnieje. 422: same dane nie mają sensu.",
      s: [
        "Rejestracja na e-mail, który jest już zajęty.",
        "Rejestracja na e-mail „banana”.",
        "Dwie osoby edytują ten sam rekord, a druga zmiana opiera się na nieaktualnej wersji.",
        "W polu wieku jest −5.",
      ] },
    "400-422": {
      title: "Garblin czy Nitpecker?",
      rule: "400: requesta nie da się nawet przeczytać. 422: przeczytano go, ale wartości nie mają sensu. 400 to ogólny błąd klienta: gdy pasuje bardziej konkretny kod, serwer używa tamtego.",
      s: [
        "JSON ma niezamknięty cudzysłów i parser się wykłada.",
        "JSON jest poprawny, ale data urodzenia jest w przyszłości.",
        "Body requesta jest ucięte w połowie.",
        "Zamówienie na −3 sztuki.",
      ] },
    "400-415": {
      title: "Garblin czy Pickoala?",
      rule: "400: format właściwy, ale request zepsuty. 415: serwer w ogóle nie przyjmuje tego formatu. 400 to ogólny błąd klienta: gdy pasuje bardziej konkretny kod, serwer używa tamtego.",
      s: [
        "Content-Type: application/xml do endpointu, który przyjmuje tylko JSON.",
        "Content-Type: application/json, ale treść to zepsuty JSON.",
        "Awatar wysłany jako .exe zamiast .png.",
        "JSON ma przecinek po ostatnim polu.",
      ] },
    "502-504": {
      title: "Parroxy czy Waitgator?",
      rule: "502: serwer za proxy odpowiedział śmieciami. 504: nie odpowiedział wcale.",
      s: [
        "Nginx dostał nieprawidłową odpowiedź od backendu.",
        "Backend buduje raport 2 minuty, a proxy czeka tylko 60 sekund.",
        "Backend się restartuje i zrywa połączenie w środku odpowiedzi.",
        "Baza danych się zawiesiła, więc backend nigdy nie odpowiedział bramce.",
      ] },
    "408-504": {
      title: "Slowth czy Waitgator?",
      rule: "408: wolny klient; serwer przestał czekać na request. 504: wolny serwer za bramką; bramka przestała czekać na odpowiedź.",
      s: [
        "Telefon na słabym internecie mobilnym zaczyna wysyłać formularz, a request utyka w połowie.",
        "CDN nie dostał na czas odpowiedzi od twojego serwera.",
        "Klient otworzył połączenie i nic nie wysyła.",
        "Proxy czekało na mikroserwis płatności, który milczy.",
      ] },
  },
  // "Tools and Read more": labels for data/links.js TOOLS, in the same order.
  tools: [
    "Chrome DevTools: panel Network",
    "Firefox: Edit and Resend",
    "Postman: wysyłanie żądania",
  ],
};
