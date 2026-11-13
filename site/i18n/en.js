// English: every text on the site in one file (RSP-85). Keys must match i18n/en.js; check with: node scripts/check-locales.mjs
// Codes, status names, creature names, moves, colours, links and trap answers live in data/ and are shared by all languages.
// A key missing here falls back to English and logs a warning in the console.
export default {
  // Interface. Functions build texts that contain numbers or names.
  ui: {
    tag: 'Original creatures for memorizing HTTP status codes. Every code has its own Responster, and every move explains what the code means.',
    // Title of the app page /<lang>/http/ (RSP-138): browser tab and search results.
    appTitle: 'Responsters: memorize, understand and test HTTP status codes',
    tabs: ['Collection', 'Practice', 'Traps'],
    all: 'All',
    mastered: (a, b) => `${a} of ${b} learned`,
    known: 'known',
    modeArt: 'Picture → code',
    modeCode: 'Code → creature',
    modeArtHint: 'See the creature, pick the code',
    modeCodeHint: 'See the code, find the creature',
    modeNerd: 'Nerd mode',
    modeNerdHint: 'Text only: read what it means, pick the code',
    modeHard: 'Hardcore',
    modeHardHint: 'Only the code: pick the status name',
    modes: 'Practice mode',
    qArt: 'Which code is this?',
    qCode: 'Which one is it?',
    qHard: 'What is this status called?',
    hint: 'Hint',
    hintIs: (n) => `The creature is ${n}`,
    hintUsed: 'With a hint: counts in the score, not toward the ✓.',
    score: (r, t, s) => `${r}/${t} · streak ${s}`,
    ok: 'Yes!',
    no: 'Not this one.',
    next: 'Next',
    mean: 'What it means',
    when: 'Where you meet it',
    conf: 'Often confused with',
    qa: 'What to test',
    links: 'Tools and Read more',
    traps: 'Pairs of codes people mix up most. Read the rule, then sort the situations.',
    lang: 'Language',
    close: 'Close',
    back: 'Back to collection',
    top: 'Back to top',
    howto: 'How to use',
    howtoSteps: [
      '<b>Collection.</b> Tap a card to meet the creature: what the code means, where you meet it and what to test.',
      '<b>Practice.</b> “Picture → code”, “Code → creature”, “Nerd mode” (text only) or “Hardcore” (only the code). Two correct answers in a row give a code its ✓.',
      '<b>Traps.</b> Pairs of codes people mix up: a rule and situations to sort.',
    ],
    howtoNote: 'Progress is saved in this browser only.',
    howtoClose: 'Got it',
  },
  // Status classes 1xx–5xx: name and one-line rule.
  classes: {
    1: { name: 'Eggs', rule: 'Still hatching: the server got the request and is working on it.' },
    2: { name: 'Friends', rule: 'It worked.' },
    3: { name: 'Wanderers', rule: 'What you want is somewhere else.' },
    4: { name: 'Gatekeepers', rule: 'Client error: fix the request.' },
    5: { name: 'Server beasts', rule: 'Server error: not your fault.' },
  },
  // Cards: what it means, where you meet it, the card line in the creature's voice (max ~55 characters)
  // and art: what the picture shows (alt text, without the name or the code).
  cards: {
    102: {
      mean: 'The server accepted the request and is still working on it. No response yet.',
      when: 'Long WebDAV operations; rare in everyday APIs.',
      line: "I'm on it! No result yet.",
      // art: what the picture shows, one sentence, without the name or the code (RSP-138: alt text on card pages; RSP-19: Practice).
      art: 'A tiny round critter peeks over the rim of a cracked egg; the shell is painted like a loading spinner and spins.',
    },
    200: {
      mean: 'The request succeeded and the response carries the result.',
      when: 'GET of a page or list, a POST that did not create a resource.',
      line: 'What can I say? All good!',
      art: 'A calm, shaggy little yak with small horns stands on the grass and nods with a contented smile.',
    },
    201: {
      mean: 'A new resource was created. Its address is in the Location header.',
      when: 'POST /orders created an order.',
      line: 'Brand new! Built it myself!',
      art: 'A beaver in a yellow hard hat stands proudly by a sparkling brand-new log cabin, next to a signpost that says “NEW”.',
    },
    204: {
      mean: 'Success, but there is no response body.',
      when: 'DELETE or PUT with nothing to return.',
      line: 'Did it! Just nothing to show.',
      art: 'A pale, fluffy moth with glassy wings sits full and happy on a board next to an empty coat hanger and a few crumbs of wool; a green tick floats above.',
    },
    301: {
      mean: 'The resource moved for good. Clients and search engines should update the URL.',
      when: 'Moving to a new domain, or http to https.',
      line: 'Migrated for good. Use the new address.',
      art: 'A hermit crab sits in a shiny new shell; behind it the old, empty shell has a wooden sign with an arrow pointing away.',
    },
    302: {
      mean: 'The resource is temporarily elsewhere. The original URL stays correct.',
      when: 'Redirect after login, a temporary promo page.',
      line: 'Away for now. Back soon.',
      art: 'A round bat hangs upside down and winks next to a sign that says “BRB”; a curved arrow points to a tiny cave marked “HOME”.',
    },
    304: {
      mean: 'Nothing changed since you cached it. Use your copy.',
      when: 'The browser sent If-None-Match or If-Modified-Since.',
      line: "Haven't changed. Check your cache.",
      art: 'A green chameleon on a branch holds up an instant photo of itself in the same pose, with an equals sign between them.',
    },
    400: {
      mean: 'The request is malformed: syntax, format or invalid data.',
      when: 'Broken JSON, a missing required field, invalid query parameters, a request body cut off halfway.',
      line: "What nonsense! I can't understand a word.",
      art: 'A goblin in round glasses squints in confusion at a crumpled note full of scribbles, with question marks above his head.',
    },
    401: {
      mean: 'Authentication is required: credentials are missing or invalid.',
      when: 'No Authorization header, an expired token.',
      line: 'Who are you? Do I know you?',
      art: 'A round, fluffy owl stands behind a small gate, one wing raised like a guard, and asks “Who?”.',
    },
    403: {
      mean: 'Your identity is known, but you lack permission.',
      when: 'A regular user opens the admin panel.',
      line: "Oh, it's you? Not letting you in!",
      art: 'A plump pelican with crossed wings stands firmly in front of a brick wall and a door locked with a chain and a padlock.',
    },
    404: {
      mean: 'Nothing exists at this address.',
      when: 'A typo in the URL, a deleted product.',
      line: 'Nobody here. Look elsewhere yourself.',
      art: 'A ferret drawn only as a faint dotted outline stands beside an empty burrow; only its curious eyes are clear.',
    },
    405: {
      mean: 'The server knows this address but doesn’t accept this method.',
      when: 'A DELETE sent to an endpoint that only accepts GET.',
      line: 'Not like that! Change your methods.',
      art: "A badger in a doorman's cap stands at a door with a sign “GET POST” and raises a paw to stop an envelope marked “DELETE”, crossed out in red.",
    },
    408: {
      mean: 'The client took too long to send the request, so the server stopped waiting.',
      when: 'A slow connection, a stalled upload.',
      line: 'Overslept. The server gave up waiting.',
      art: 'A sloth hangs asleep from a branch, mid-yawn; below it lie an unfinished letter and a pen, next to an hourglass.',
    },
    409: {
      mean: 'The request conflicts with the current state of the resource.',
      when: 'An email that’s already taken at sign-up, a version conflict while editing.',
      line: 'I was here first! Back off!',
      art: 'Two stubborn goats on a narrow plank lock horns with a big spark between them, frowning; neither can pass.',
    },
    413: {
      mean: 'The request body is larger than the allowed limit.',
      when: 'Uploading a file that’s too big.',
      line: "Too much! It won't fit!",
      art: 'A small mouse pushes a huge wheel of cheese into its mouse hole; the cheese is stuck and the wall cracks under a sign “MAX 10 MB”.',
    },
    415: {
      mean: 'The server doesn’t support this data format.',
      when: 'XML instead of JSON, a wrong Content-Type.',
      line: 'Ew! Not eating that! Check what I like.',
      art: 'A koala in a bib turns away and pushes a plate with an “XML” box off the table, hugging a eucalyptus leaf marked “JSON”.',
    },
    418: {
      mean: 'A joke code from RFC 2324: a teapot refuses to brew coffee.',
      when: 'Easter eggs in APIs. A nice bonus in an interview.',
      line: "I'm a teapot. No coffee.",
      art: 'A round hippo shaped like a porcelain teapot lets off steam; next to it a coffee cup and coffee beans stand by a “no coffee” sign.',
    },
    422: {
      mean: 'The request was read, but the data fails validation.',
      when: 'A string instead of a number, a negative age, “email: banana”.',
      line: 'Read it. But age -5? Seriously?',
      art: 'A woodpecker in round glasses sits on a neat form: “name: Ann” has a green tick, “age: -5” and “email: banana” have red crosses.',
    },
    429: {
      mean: 'Too many requests in a short time; a rate limit kicked in.',
      when: 'A script without pauses, a Retry-After header in the response.',
      line: 'Stop! Too many. Let me breathe.',
      art: 'A sweating hamster sprints in a wheel while a stream of envelopes flies out; a clamp under the wheel brakes it.',
    },
    500: {
      mean: 'Something unexpected broke on the server.',
      when: 'An unhandled exception in backend code.',
      line: "It's not you, it's me.",
      art: 'A small unicorn panics, mane frazzled and sweat flying, trailing a long tail of tangled code.',
    },
    502: {
      mean: 'A gateway or proxy passed the request on, but got an invalid response from the server.',
      when: 'Nginx in front of a backend that crashed.',
      line: 'It came broken. I just pass it on!',
      art: 'A parrot on a cable between two servers squawks a garbled speech bubble; the server behind it smokes under a red warning light.',
    },
    503: {
      mean: 'The server is temporarily unavailable: overload or maintenance.',
      when: 'Planned maintenance, an overloaded server.',
      line: 'Closed for repairs. Come back later.',
      art: 'A big bear in a nightcap sleeps in a cosy cave beside a “Closed for maintenance” sign and a wrench.',
    },
    504: {
      mean: 'A gateway or proxy passed the request on, but never got a response from the server.',
      when: 'A slow backend behind nginx or a CDN.',
      line: 'I waited and waited. No reply from the server.',
      art: 'An alligator leans on an open garden gate with a stopwatch, waiting; a long empty path leads to a tiny server far away.',
    },
  },
  // "What to test": short test cases, steps → expected result (RSP-11).
  qa: {
    102: [
      'Start a long operation (e.g., import a big file or copy a large folder) and wait without touching the page → the page keeps waiting and shows the result, no timeout error.',
      'While the long operation runs, watch its status in the UI → it shows progress, and "Done" appears only when the operation has really finished.',
    ],
    200: [
      "Save a record with known values, then open it (or the list it's in) → every field shows exactly what was saved, nothing missing or extra.",
      'Open a list that has no items yet (e.g., orders of a new account) → a friendly "Nothing here yet" and status 200, not an error page.',
      'Submit a form with invalid data and check the Network tab → the status is 4xx, not 200 with an error message hidden inside.',
    ],
    201: [
      'Create a new item (e.g., a comment or an order) and open the list → the new item is there with exactly the values you entered.',
      'Fill in a create form and quickly double-click Submit → only one item is created.',
      'Create an item, copy its link and open it in a new tab → the item opens.',
    ],
    204: [
      'Delete an item from a list → it disappears right away with no error message, and it stays gone after a page refresh.',
      'Copy the link to an item, delete the item, then open the copied link → a "not found" page (404), not the old item.',
      'Open a record in two browser tabs. Delete it in the first tab, then try deleting it in the second tab → the system handles it gracefully (e.g., "Item not found") without a server error.',
    ],
    301: [
      'Open an old URL that has moved (e.g., an old product link) → you land on the new page, and the Network tab shows one 301 hop, not a chain.',
      'Open the old URL with parameters added (e.g., ?page=2&sort=price) → the new page opens with the same parameters.',
      "Open the http:// version of any page → you're moved to https:// with status 301, not 302 or a 200 copy of the page.",
    ],
    302: [
      'Log out, open a page that needs login by its direct link, then log in → you land where the requirements say (back on that page or, e.g., the account dashboard), not on an error or blank page.',
      'Find the redirect parameter in the login URL (e.g., ?next=/orders), replace it with an external site (?next=https://example.com) and log in → you stay on our site.',
      'Submit a form (e.g., checkout), then press F5 on the confirmation page → no "resend form" warning and no second order.',
    ],
    304: [
      "Open a page, then reload it with the Network tab open → images, scripts and styles that didn't change come back as 304.",
      'Change something visible (e.g., a product title in the admin), then reload the page normally → the new value shows, not the cached old one.',
      'After a deploy, open the site in a browser that visited it before, without clearing the cache → the site works with no errors (no mix of old and new files), and the new version shows right away or within the stated cache time.',
    ],
    400: [
      'In Postman (or DevTools), send a request with broken JSON or without a required field → status 400, not 500.',
      'Send the same broken request and read the error message → it names what exactly is wrong (which field, what format).',
      'Look at the full error response → no stack trace, file paths or SQL inside.',
    ],
    401: [
      'Log out and open a private page (or call its API) by direct link → you get the login page or status 401, not the content.',
      "Log in, wait until the session expires (or delete the session cookie), then click something → you're asked to log in again, and after login you can continue.",
      "Log out, press Back in the browser and try an action on the old page → no access, you're asked to log in.",
    ],
    403: [
      "Log in as a regular user and open an admin URL by direct link (e.g., /admin) → the admin page doesn't open (no access, a login page or a 404, as the requirements say).",
      "Log in as user A, open one of your orders and change the id in the URL to user B's order → B's order is not shown.",
      'As an admin, copy the request of an admin-only action from DevTools; as a regular user, send the same request → status 403, nothing changes.',
    ],
    404: [
      'Open a URL with a typo (e.g., /prodcts) → a friendly 404 page with a way back (menu, search or a home link).',
      "Open an item and change its id in the URL to one that doesn't exist (e.g., 999999) → a 404 page, not a server error.",
      'Open a missing page with the Network tab open → the status is really 404, not 200 (a "soft 404").',
    ],
    405: [
      'In Postman, send DELETE (or PUT) to an endpoint that only reads data (e.g., a public list) → status 405, nothing is deleted.',
      'Look at the headers of that 405 response → there is an Allow header listing the methods you can use.',
      'Try each unsupported method on the endpoint → always 405, never 404 or 500.',
    ],
    408: [
      'In DevTools, set the network to Slow 3G and submit a big form or upload a large file → after a while a clear timeout message appears, not an endless spinner.',
      'After the timeout message, switch the network back to normal and retry → it works, and the data you typed is still in the form.',
    ],
    409: [
      'Sign up with an email that already has an account → no new account is created, and the message is what the requirements say (a direct "This email is already in use" or a neutral "Check your inbox").',
      'Open the same record in two tabs. Change and save it in the first tab, then change and save it in the second → the second save warns about the conflict instead of silently overwriting the first change.',
      'Read the conflict message → it says what exactly conflicts (which field or which version).',
    ],
    413: [
      'Find the upload limit (e.g., 10 MB) and upload files just under, exactly at and just over it → behaviour at the limit matches the requirements (≤ or <), and anything bigger is rejected.',
      'Compare the limit in the hint next to the upload field with the size that actually gets rejected → they match.',
      "Upload a file that's clearly too big → a clear message with the allowed size, not a dropped connection or an endless upload.",
    ],
    415: [
      'In Postman, send a valid JSON body with Content-Type: text/plain (or with no Content-Type) → status 415, not 500.',
      'Send the same data as XML or form-data to an endpoint that only takes JSON → status 415 with a message saying which format is expected.',
    ],
    418: [
      'If the product has an easter egg (e.g., /teapot), call it, then call a few real endpoints → the real ones still work normally.',
      'Check monitoring and alerts after calling the easter egg → no alarm about an unknown error.',
    ],
    422: [
      'Enter -5 in the age field (or an invalid email: "banana", "anna@", "@mail.com", "anna@@mail.com", "anna k@mail.com") and submit → an error message right under that field, and the form isn\'t sent.',
      'Fill several fields with invalid values and the rest with valid ones, then submit → all errors are shown at once, and the valid values stay filled in.',
      'Try boundary values one by one: an empty required field, max length + 1 character, a birth date in the future, 29 February in a non-leap year → each is rejected with a clear reason.',
    ],
    429: [
      'Find the stated limit (docs, response header, or ask a developer), e.g., 5 login attempts per minute; make exactly that many attempts, then one more → only the extra one is blocked.',
      'Once the block time is over, try again → it works again.',
      'Reach the limit as user A, then right away try as user B in another browser → user B should not be blocked.',
    ],
    500: [
      "In DevTools (Elements tab), remove maxlength, required or pattern from the field and submit the form with unexpected data: emoji, a string one character over the backend or database limit, <script>, ' OR 1=1 → no 500: either a normal result or a validation error.",
      'If the form validates with JavaScript, copy the request in Network (Copy as fetch) or open it in Postman, put in the same data and send it → again no 500.',
      'If a 500 does happen, look at the page → a message for the user with no technical information (e.g., "Something went wrong, please try again").',
      'After a 500, check the logs or monitoring → the error is there with the time, URL and request details.',
    ],
    502: [
      'On a test environment, stop the backend service and open the site → a friendly error page, not a raw nginx or proxy page.',
      'Read that error page and its response → no internal IP addresses, host names or server versions.',
      'Start the backend again and reload the site → it works without any additional steps.',
    ],
    503: [
      'Turn on planned maintenance mode (or open the site during a deploy) → a maintenance page with an expected return time, not a broken layout.',
      'Open the maintenance page with the Network tab open → status 503, not 200.',
      "During a load test, watch the responses as load grows → when overloaded, some requests get 503, but the site doesn't go down completely and recovers when load drops.",
    ],
    504: [
      'Start the slowest operation you can find (e.g., a yearly report or a full export) → after the timeout a clear message appears, not an endless spinner.',
      "Start a very long operation and leave the page → it continues in the background, and you get a notification (or a ready file) when it's done.",
      'After the timeout message, press Retry → the operation starts again without re-entering filters or data.',
    ],
  },
  // Traps: title, rule and the situations to sort, in the order of data/traps.js (the answers live there).
  traps: {
    '401-403': {
      title: 'Whoowl or Nopelican?',
      rule: '401: show who you are and you get in. 403: we know who you are, and still no.',
      s: [
        'The token has expired.',
        'A logged-in user deletes someone else’s order.',
        'The request has no Authorization header.',
        'A regular user opens /admin.',
      ],
    },
    '301-302': {
      title: 'Relocrab or Brbat?',
      rule: '301: moved for good. 302: temporarily elsewhere, the old address is still right.',
      s: [
        'The site moved to a new domain for good.',
        'After login you are sent back to the page you came from.',
        'All http URLs now point to https for good.',
        'During a sale the home page redirects to the promo page.',
      ],
    },
    '200-201-204': {
      title: 'Okayak, Buildbeaver or Nullwing?',
      rule: '200: here is the result. 201: something new exists. 204: done, nothing to show.',
      s: [
        'GET /orders returned the list of orders.',
        'POST /orders created a new order.',
        'DELETE /orders/42 succeeded with no body.',
      ],
    },
    '408-503': {
      title: 'Slowth or Hibearnate?',
      rule: '408: you, the client, are too slow. 503: the server is asleep.',
      s: ['The client started uploading a big file and stalled.', 'The server is under planned maintenance.'],
    },
    '500-502': {
      title: 'Panicorn or Parroxy?',
      rule: '500: the server itself broke. 502: the proxy passed the request on and got garbage back from the server.',
      s: ['An unhandled exception in the backend code.', 'Nginx got no valid response from the backend.'],
    },
    '429-503': {
      title: 'Spamster or Hibearnate?',
      rule: '429: too many requests from you. 503: the server is down for everyone.',
      s: ['Your script sends a thousand requests per second.', 'The server is overloaded and answers nobody.'],
    },
    '400-404': {
      title: 'Garblin or Nowherret?',
      rule: '400: can’t read the request. 404: read it, but nothing is there.',
      s: ['The JSON is missing a closing brace.', 'GET /users/99999, and that user doesn’t exist.'],
    },
    '404-405': {
      title: 'Nowherret or Verbadger?',
      rule: '404: nobody lives at this address. 405: the address exists, but this method isn’t accepted here.',
      s: [
        'DELETE /products, though the product list is read-only.',
        'GET /prodcts with a typo in the address.',
        'PUT to /login, which only accepts POST.',
        'GET /orders/777 for an order that was deleted.',
      ],
    },
    '409-422': {
      title: 'Clashgoat or Nitpecker?',
      rule: '409: the data is fine but clashes with what already exists. 422: the data itself makes no sense.',
      s: [
        'Signing up with an email that’s already taken.',
        'Signing up with the email “banana”.',
        'Two people edit the same record, and the second change is based on a stale version.',
        'The age field says −5.',
      ],
    },
    '400-422': {
      title: 'Garblin or Nitpecker?',
      rule: '400: the request can’t even be read. 422: it was read, but the values make no sense. 400 is the generic client error: when a more specific code fits, the server uses that one.',
      s: [
        'The JSON has an unclosed quote and the parser fails.',
        'The JSON is valid, but the birth date is in the future.',
        'The request body is cut off halfway.',
        'An order for −3 items.',
      ],
    },
    '400-415': {
      title: 'Garblin or Pickoala?',
      rule: '400: the right format, but a broken request. 415: the server doesn’t accept this format at all. 400 is the generic client error: when a more specific code fits, the server uses that one.',
      s: [
        'Content-Type: application/xml to an endpoint that only accepts JSON.',
        'Content-Type: application/json, but the body is broken JSON.',
        'An avatar is uploaded as .exe instead of .png.',
        'The JSON has a trailing comma after the last field.',
      ],
    },
    '502-504': {
      title: 'Parroxy or Waitgator?',
      rule: '502: the proxy passed the request on and got garbage back from the server. 504: it never got an answer from the server.',
      s: [
        'Nginx got an invalid response from the backend.',
        'The backend takes 2 minutes to build a report, but the proxy waits only 60 seconds.',
        'The backend restarts and drops the connection mid-response.',
        'The database hung, so the backend never answered the gateway.',
      ],
    },
    '408-504': {
      title: 'Slowth or Waitgator?',
      rule: '408: a slow client; the server stopped waiting for the request. 504: a slow server behind the gateway; the gateway stopped waiting for the answer.',
      s: [
        'A phone on weak mobile data starts sending a form, and the request stalls halfway.',
        'The CDN didn’t get an answer from your server in time.',
        'The client opened a connection and sends nothing.',
        'The proxy waited for the payment microservice, which stays silent.',
      ],
    },
  },
  // Site header and footer (RSP-156, RSP-155): the same on every page of the zoo.
  site: {
    nav: 'Site menu',
    map: 'Map',
    about: 'About the project',
    foot: 'Original characters and copy; status names from the IANA registry.',
    news: "What's new", // footer and "How to use" link to the What's new page (RSP-145)
    contact: 'Bug? Feedback?', // footer mail link (RSP-139, RSP-147)
    mail: 'email', // screen-reader note after the footer mail link
    page: 'Page', // first line of the feedback mail: "Page: <address>"
    ext: 'external site', // screen-reader note after LinkedIn and GitHub in the footer
  },
  // "What's new" page /<lang>/news/ (RSP-145): page texts; entries in the order of data/news.js, items in the
  // order of its kinds. Plain language, what the visitor gets, no ticket numbers.
  news: {
    title: "What's new · Mnemozoo",
    h1: "What's new",
    lead: 'What changed on Mnemozoo, newest first.',
    kinds: { new: 'New', improved: 'Improved', fixed: 'Fixed' },
    entries: {
      'footer-news': {
        title: 'Footer and news',
        line: "It's now easy to reach us and to see what has changed on the site.",
        items: [
          'You can now leave feedback or report a bug with the link in the footer.',
          'All changes to the site are now collected on one page — this one.',
          'Links to LinkedIn and GitHub are now at the bottom of every page.',
        ],
      },
      visitors: {
        title: 'Visitors',
        line: 'The site remembers your language and opens faster on a phone.',
        items: [
          'The site opens in the language you picked last time.',
          'Pages show up faster on a phone.',
          'We count visits without cookies and don’t track you.',
        ],
      },
    },
  },
  // Home page /<lang>/ (RSP-156). Numbers come from site/data, so they stay true when cards or pairs are added.
  // Page for a missing address (RSP-148): /<lang>/404.html, served by Netlify with status 404.
  notFound: {
    title: '404: nothing lives here · Mnemozoo',
    h1: 'Nothing lives at this address',
    text: 'The page may have moved, or the address has a typo.',
    back: 'Back to the zoo →',
  },
  home: {
    title: 'Mnemozoo: tech zoo for your memory',
    description:
      'Original creatures for HTTP status codes: a card for every code, practice and traps with look-alike codes. In every language of the site.',
    kicker: 'IT memo zoo',
    h1: 'Get the response before you even ask',
    lead: 'Original creatures for the HTTP status codes you meet every day in the browser, logs and console. A card, practice, traps with look-alike codes. In every language of the site.',
    mapTitle: 'Zoo map',
    httpSign: 'Wild animals · open', // zone sign with its status (RSP-170)
    httpName: 'HTTP status codes',
    httpText: (n, first, last) =>
      `${n} creatures from ${first} to ${last}. A card for every code, practice in four modes, traps with codes people mix up.`,
    enter: 'Meet the residents →',
    gitSign: 'Pets · opening 1 December', // announcement sign; the Git date stays on purpose
    gitText: 'Git commands as everyday scenes. Opening with an advent calendar: a new card every day.',
    pavilionSign: 'Themed pavilion', // singular: the sign hangs on the pavilion itself
    pairsName: 'Look-alike species',
    pairsText: 'Pairs people mix up: 401 and 403, 502 and 504. A rule and situations to sort them.',
    pairsLink: (n) => `${n} pairs in the HTTP enclosure →`,
    howTitle: 'How it works',
    steps: [
      ['Meet it', 'The creature’s card: what the code means, where you meet it and what to test.'],
      ['Practise', 'From picture to code and back. Two right answers in a row and the code gets a ✓.'],
      ['Don’t mix them up', 'Traps with look-alike codes: one rule and a few situations to sort.'],
    ],
    whyTitle: 'Why train your memory when there is AI?',
    why: [
      'It answers questions. But you can only ask about what you know exists. If a 429 flashes by in the logs and you know why exactly this status appears, you save a few questions and tokens 😉',
      'Mnemozoo trains exactly that: recognition. This site was made with AI, but AI won’t do the thinking for you.',
    ],
    aboutTitle: 'About the project',
    aboutText: 'An independent QA project by Maryna Bortnyk.',
  },
  // "Tools and Read more": labels for data/links.js TOOLS, in the same order.
  tools: ['Chrome DevTools: the Network panel', 'Firefox: Edit and Resend', 'Postman: send a request'],
};
