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
  // Traps: title, rule and the situations to sort, in the order of data/http/traps.js (the answers live there).
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
    // the hint on the language-less pages (RSP-216), shown in the visitor's language; en is never shown
    langHint: {
      label: 'Site language',
      text: 'Mnemozoo is also in English.',
      open: 'Open',
      close: 'Close',
    },
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
      'advent-preview': {
        title: 'Git moves in',
        line: 'Git at Mnemozoo: from 1 December, a new command every day, explained with a household scene.',
        items: [
          'An advent wall: 25 doors, the first one opens on 1 December.',
          'Groups of git commands are marked with icons, not only colour.',
          'Addresses without a language open the English page right away, with an offer to switch to yours.',
        ],
      },
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
    // announcement sign (RSP-195): the date is the advent start (ADVENT_START), in the page language
    gitSign: (date) => `Pets · opening ${date}`,
    // from the advent start: the Git enclosure is open and links to the advent wall
    gitOpenSign: 'Pets · open',
    gitEnter: 'Open the advent calendar →',
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
    // credit the CC BY 3.0 licence asks for (the Git logomark next to the git-scm.com links on git card pages)
    gitLogo: 'Git logo:',
  },
  // "Tools and Read more": labels for data/http/links.js TOOLS, in the same order.
  tools: ['Chrome DevTools: the Network panel', 'Firefox: Edit and Resend', 'Postman: send a request'],
  // Git rubric (RSP-199, RSP-200): labels of the git card page, the household names of the git groups (data/git/groups.js),
  // and the card texts git.cards.<id> (scene title, caption, "$" line, page sections), added card by card with RSP-200.
  git: {
    ui: {
      back: 'Back to the advent calendar',
      does: 'What it does',
      tip: 'Tip',
      opts: 'Options',
      file: 'Lines in the file',
      cmds: 'Commands',
      careful: 'Careful',
      conf: 'Often confused with',
      // c = the list where git help shows the command's section, already as HTML (<code>git help -a</code>)
      help: (c) => `Section in ${c}`,
      // before `git help <command>`, the command's own manual
      // the command's manual on git-scm.com (2026-11-20): in the page language where git-scm.com has it, else English
      manual: 'git-scm.com',
      danger: 'Dangerous command',
      // heading of the outside links on a git card page
      // the strip of git's own documentation (RSP-221, Maryna 2026-11-22): under the three columns on wide screens
      docs: 'Documentation',
      // the day row under the card (RSP-226): n = advent day, date = the day it opens ("14 December")
      nav: {
        label: 'Advent days',
        day: (n) => `Day ${n}`,
        from: (date) => `from ${date}`,
        prev: 'Previous:',
        next: 'Next:',
      },
    },
    // the advent wall /<lang>/git/ (RSP-195): door labels for screen readers, the flags on the paper
    wall: {
      title: 'Git advent calendar',
      // n = the number of advent days (25 since 2026-11-17)
      lead: (date, n) => `${n} git commands, one door a day from ${date}. Missed days can be opened later.`,
      // why the cards are household (RSP-219, Maryna's text 2026-11-21; the four examples suggested by Claude)
      intro:
        'The official Git™ documentation is full of household words: the everyday commands are called “porcelain”, and everything that works beneath them is “plumbing”; unfinished work goes into a stash (`git stash`), dead branches get pruned (`git prune`), garbage gets collected (`git gc`), and something important gets a tag (`git tag`). That became the basis for learning git commands by association: household scenes and pets you can find on every card.',
      today: 'today',
      // short, it has to fit a small door on a phone (Maryna, 2026-11-17: «забули?»)
      missed: 'forgot?',
      // phone: the big door of today above the wall (prototype AdventPhone, 2026-11-17)
      todayHint: "Open today's door",
      // the legend above the wall (RSP-208): its name for screen readers; the group names come from git.groups
      legend: 'Groups',
      locked: (n, date) => `Day ${n}, opens ${date}`,
      // door names (RSP-198): the visible number and flag in the same order, so the name holds what the door shows
      paperToday: (n) => `Day ${n}, today, open the door`,
      paperMissed: (n) => `Day ${n}, forgot? Open the door`,
      bigToday: (n) => `Day ${n}, today. Open today's door`,
      open: (n, cmd) => `Day ${n}: ${cmd}, open the card`,
      revealed: (n, cmd) => `Day ${n}: ${cmd}. Press again to open the card.`,
    },
    groups: { start: 'Moving in', home: 'At home', visit: 'Visit', archive: 'Attic', post: 'Post' },
    cards: {
      // Pictures ready (RSP-191, RSP-192): only their text for now; the other card texts come with RSP-200.
      init: {
        title: 'An empty flat',
        line: 'Let’s start with a clean sheet.',
        move: '$ git init',
        hint: 'a new repository in the current folder',
        does: {
          text: 'Creates a new, empty repository in the current folder: the hidden `.git` folder where git keeps the whole history. The files in the folder stay as they are; git doesn’t track them yet. There are no commits yet, so `git branch` shows nothing: the branch appears with the first commit.',
          meta: 'A new flat: walls but no furniture yet, and the cat goes in first.',
        },
        tip: 'The project is already on GitHub or elsewhere? Then not init but `git clone <url>`: it creates the folder itself and brings the whole history.',
        opts: [
          {
            cmd: 'git init <folder>',
            text: '— creates a folder with that name (if it doesn’t exist yet) and the repository in it.',
            meta: 'You build a new flat and put up the nameplate at once.',
          },
          {
            cmd: 'git init -b main',
            text: '— sets the name of the first branch; without it git 2.43 uses `master` and shows a hint on how to change it.',
            meta: 'You choose what to call the first room.',
          },
        ],
        art: 'A grey cat stands on the threshold of a wide-open door and is the first to step into the empty flat: no furniture, only an empty frame on the wall. Behind it, a person with suitcases, one with a light-bulb sticker. By the door, a single new nameplate.',
      },
      gitignore: {
        title: 'Ketchup under your nose',
        line: 'Mum, where’s the ketchup?',
        move: '$ git check-ignore -v <file>',
        hint: 'which rule hides this file',
        does: {
          text: 'Not a command but a file in the repository root: a list of patterns (`*.log`, `node_modules/`, `.env`) that git doesn’t show among untracked files and doesn’t add with `git add .`. It only works for files git doesn’t track yet; `.gitignore` itself is committed so everyone shares the rules.',
          meta: 'The list on the fridge door: what not to notice, even if it stands right in front of you.',
        },
        tip: 'Already committed? `.gitignore` won’t hide it: first `git rm --cached <file>` — git stops tracking it and the copy on disk stays.',
        file: [
          {
            line: '*.log',
            text: 'A pattern: every file with this ending in any folder; a trailing `/` (`build/`) means folders only.',
            meta: 'Don’t notice any empty bottle, wherever it stands.',
          },
          {
            line: '!keep.log',
            text: 'A leading `!` brings back a file that a rule above hid.',
            meta: 'Except this one — keep it.',
          },
        ],
        opts: [
          {
            cmd: 'git add -f <file>',
            text: '— adds a file despite `.gitignore`; from then on git tracks it.',
            meta: 'You knowingly put in the basket what you usually don’t notice.',
          },
        ],
        art: 'On the wall, a portrait of a cat sitting with its back to its bowl of fish. A person stands at the open fridge, scratching their head and wondering where the ketchup is, while the ketchup bottle stands right in front of them on the middle shelf. A list hangs on the fridge door under a magnet.',
      },
      restore: {
        title: 'As in the photo',
        line: 'Careful, Mum is tidying — no responsibility for the consequences',
        move: '$ git restore <file>',
        hint: 'throw away the changes in a file',
        does: {
          text: 'Brings a file in the working tree back to its state in the index, that is, throws away changes not yet added. `git restore --staged <file>` works the other way round: takes the file out of the index and leaves the working tree as it is. Doesn’t change the commit history.',
          meta: 'Mum tidies the room to match the photo: whatever was half done is gone.',
        },
        tip: 'A path is required: `git restore .` restores the whole folder. This used to be `git checkout -- <file>`.',
        opts: [
          {
            cmd: 'git restore --staged <file>',
            text: '— takes the file out of the index (unstage); the changes in the working tree stay.',
            meta: 'You take a thing out of the basket but don’t put it away.',
          },
          {
            cmd: 'git restore --source <commit> <file>',
            text: '— takes the file from the given commit, e.g. `HEAD~1`.',
            meta: 'Tidying to an older photo.',
          },
        ],
        careful: [
          'Thrown-away changes are gone for good: they are neither in the history nor in `git reflog`.',
          'Before `git restore`, look at `git diff`. If it’s a pity to throw away, `git stash` first.',
        ],
        art: 'On the wall, a portrait of a rabbit that has chewed a slipper. Mum holds up a photo of the tidy shelf, "as it was", and firmly sweeps a half-done puzzle off the floor into a dustpan, the pieces flying in. A child in the doorway screams with arms up. On the right, the shelf already looks like the photo: neat boxes, the puzzle box among them.',
      },
      stash: {
        title: 'Guests at the door',
        line: 'A quick tidy-up!',
        move: '$ git stash',
        hint: 'put uncommitted work away',
        does: {
          text: 'Puts uncommitted changes in tracked files (both in the index and in the working tree) into a separate store and brings the working tree back to the last commit. You can take them out later, even on another branch.',
          meta: 'The doorbell rings: you stuff the unfinished things into the cupboard so the room looks tidy.',
        },
        tip: 'There can be several stashes: `git stash list` shows them all, `stash@{0}` is the newest.',
        opts: [
          {
            cmd: 'git stash pop',
            text: '— brings the last stash back into the working tree and removes it from the list; `git stash apply` brings it back but keeps it in the list.',
            meta: 'The guests have left — you take the sweater out of the cupboard.',
          },
          {
            cmd: 'git stash -u',
            text: '— also stashes new files git doesn’t track yet. A plain `git stash` leaves them in the working tree; files from `.gitignore` only `git stash -a` stashes.',
            meta: 'Into the cupboard goes what has no place of its own yet, too.',
          },
          {
            cmd: 'git stash -m "…"',
            text: '— a stash with a description, so you can find it later in `git stash list`.',
            meta: 'A note on the ball of yarn: what it is and why.',
          },
        ],
        careful: [
          '`git stash drop` and `git stash clear` delete stashes for good: they are not in `git reflog`.',
          'Before deleting, look inside: `git stash show -p`. Just dropped one? `git stash drop` prints the stash’s hash, and `git stash apply <hash>` still brings it back.',
        ],
        art: 'On the wall, a portrait of a hamster with stuffed cheeks. While the doorbell rings, a person on tiptoe hastily stuffs a sweater and a ball of yarn into the top cupboard, its door open towards us; identical mugs stand on the middle shelf.',
      },
      branch: {
        title: 'A new nameplate',
        line: 'Oh, this will be my room.',
        move: '$ git branch',
        hint: 'the list of branches, the current one with *',
        does: {
          text: 'Without arguments it lists the local branches and marks the current one with `*`. With a name it creates a new branch at the current commit but doesn’t switch to it: that’s `git switch`.',
          meta: 'You put a nameplate on the door of a new room but stay where you were.',
        },
        tip: 'Created a branch, but your commits still go to the old one? `git branch` is just the nameplate. To move over you need `git switch <branch>`; to create and move at once, `git switch -c <branch>`.',
        opts: [
          {
            cmd: 'git branch -a',
            text: '— also lists the remote branches (`remotes/origin/…`).',
            meta: 'The nameplates on all doors, the neighbours’ too.',
          },
          {
            cmd: 'git branch -m <new name>',
            text: '— renames the current branch.',
            meta: 'You rewrite the nameplate.',
          },
          {
            cmd: 'git branch -d <branch>',
            text: '— deletes the branch if it’s already merged; an unmerged one only `git branch -D <branch>` deletes.',
            meta: 'You take the nameplate off a room that has been emptied.',
          },
        ],
        art: 'On the wall, a portrait of a parrot on a perch. Two open doors side by side lead into two identical rooms with the same armchair and window; a runner on the floor forks to both doors. By the left door, an old nameplate; a person is putting up a new yellow nameplate by the right door.',
      },
      switch: {
        title: 'A new room',
        line: 'Time to move to another room',
        move: '$ git switch <branch>',
        hint: 'go to another branch',
        does: {
          text: 'Switches to another branch: the working tree and the index become as in its last commit. Uncommitted changes come along; if they clash with files on that branch, git stops and asks you to commit or stash them (`git stash`).',
          meta: 'You walk along the runner into another room, and whatever is in your hands comes with you.',
        },
        tip: '`git switch` took over part of the old `git checkout`, which both switches branches and restores files.',
        opts: [
          {
            cmd: 'git switch -c <branch>',
            text: '— creates a new branch and switches to it at once.',
            meta: 'You put up the nameplate and walk in.',
          },
          {
            cmd: 'git switch -',
            text: '— goes back to the previous branch.',
            meta: 'Back to the room you just left.',
          },
          {
            cmd: 'git switch --detach <commit>',
            text: '— goes to a commit without a branch (detached HEAD) to have a look; new commits here are easy to lose.',
            meta: 'You peek into the room from an old photo, but it’s no place to live.',
          },
        ],
        careful: [
          '`git switch --discard-changes <branch>` and `git switch -f <branch>` throw away uncommitted changes for good: they are neither in the history nor in `git reflog`.',
          'Without these options git stops on its own when the changes are in the way. If it’s a pity to throw away, commit or `git stash` first.',
        ],
        art: 'On the wall, a portrait of a parrot: of two perches, it sits on the upper one, the lower one is empty. Two open doors side by side lead into two identical rooms; a runner on the floor forks to both doors; the right door is yellow. A person strides from the left door into the right room, footprints on the runner lead from the left branch to the right one.',
      },
      clone: {
        title: 'Furnished flat',
        art: "A person with suitcases, one with a light-bulb sticker, stands at a wide-open door. Inside, the previous tenants' armchair is already there with a binder of old bills on it, and a portrait of two identical kittens hangs on the wall. By the door, a new name plate; the old one is falling off.",
        line: "Someone lived here; now it's my turn.",
        move: '$ git clone <url>',
        hint: 'a copy of a repository with all its history',
        does: {
          text: 'Copies a remote repository into a new folder: all the history and branches (as `origin/…`), and switches to the main branch. git remembers the address as `origin`, so `git fetch`, `git pull` and `git push` work later.',
          meta: 'You move into a furnished rented flat: whatever the previous tenants left is still there, even the binder of old bills.',
        },
        tip: "No project anywhere yet? Then not clone but `git init`: it creates an empty repository in the current folder. And fork is not a git command but a button on GitHub: a copy of someone else's repository in your account, which you then clone.",
        opts: [
          {
            cmd: 'git clone <url> <folder>',
            text: "— copies into a folder with your name instead of the repository's name.",
            meta: 'You choose what to write on the door of the new flat.',
          },
          {
            cmd: 'git clone -b <branch> <url>',
            text: '— switches straight to that branch instead of the main one.',
            meta: 'You walk straight into the room you need.',
          },
          {
            cmd: 'git clone --depth 1 <url>',
            text: '— only the last commit and only one branch; fast, but no history.',
            meta: 'A furnished flat, but without the binder of old bills.',
          },
        ],
      },
      status: {
        title: 'Three piles',
        art: 'A portrait of a cat with a magnifying glass on the wall. A person calmly looks at three piles of clothes: a sock, a sleeve and a towel stick out of the basket on wheels, worn clothes lie on the floor, and next to them lies a folded new shirt with a big shop tag.',
        line: "What have we got here? Let's check.",
        move: '$ git status',
        hint: 'what has changed and what goes into the commit',
        does: {
          text: "Shows the state of the working folder and the index: which changes are already prepared for the commit (staged), which are changed but not prepared yet, and which files git doesn't track (untracked). Changes nothing.",
          meta: "You sort things into three piles and look at what's where.",
        },
        tip: 'Run it before every `git add` and `git commit`: that way nothing extra gets into the commit.',
        opts: [
          {
            cmd: 'git status -s',
            text: '— a short form: just the files with short status marks (`M`, `A`, `??`).',
            meta: 'The same overview, one line per thing.',
          },
          {
            cmd: 'git status --ignored',
            text: '— also shows the files that `.gitignore` hides.',
            meta: "You look where you usually don't.",
          },
        ],
      },
      add: {
        title: 'Into the basket',
        art: 'A portrait of a cat asleep in a basket on the wall. A person puts a blue bundle of things into the basket on wheels, which already holds a sock, a sleeve and a towel; a sweater and a sock still lie on the floor, not added.',
        line: 'Tidy up your room, please.',
        move: '$ git add .',
        hint: 'index all changes in the folder',
        does: {
          text: 'Adds the current state of a file to the index (staged): exactly this goes into the next commit. After `git add`, git starts tracking a new file.',
          meta: 'You put things in the basket to pack them into a box later.',
        },
        tip: 'Changed the file after `git add`? Add it again: the index holds the state from the moment you added it. And after a merge conflict, `git add <file>` is what marks the file as resolved.',
        opts: [
          {
            cmd: 'git add <file>',
            text: '— adds one file (or folder).',
            meta: 'One thing into the basket.',
          },
          {
            cmd: 'git add -p',
            text: "— shows the changes in pieces (hunks) and asks about each one; doesn't offer new (untracked) files.",
            meta: 'You go through the pile and put only what you need in the basket.',
          },
        ],
      },
      commit: {
        title: 'Labelled box',
        art: 'An attic. A stack of boxes, each with a picture label: a fir tree at the bottom, a Christmas bauble above. A person sticks a label with a little house on the new yellow box on top. An empty basket on wheels stands nearby; an old portrait of a squirrel holding a pine cone leans against the stack.',
        line: "What's in the box?",
        move: '$ git commit -m "…"',
        hint: 'the message right away, no editor',
        does: {
          text: "Saves the contents of the index as a new commit in the history of the current branch, with author, date and message. The working folder doesn't change; the commit stays local until you `git push`.",
          meta: 'You pack things into a box, label it and carry it up to the attic.',
        },
        tip: 'One commit, one idea; in the message write “why”, not only “what”.',
        opts: [
          {
            cmd: 'git commit -a',
            text: '— first adds the changes in tracked files by itself (modified and deleted), but not new files. Usually written together with the message: `git commit -am "…"`.',
            meta: 'The familiar goes to the attic, the new stays.',
          },
          {
            cmd: 'git commit --amend',
            text: "— replaces the last commit with a new one (with the current index and/or a new message). Don't do it with a commit you've already sent with `git push`.",
            meta: "You relabel the box from the attic before it's sent.",
          },
        ],
      },
      log: {
        title: 'Family album',
        art: 'An open family album with a green cover. Four photos, oldest first: a little house with a tree, a turtle, two people side by side, the sea and the sun; under each an unreadable caption and a date, from 09.11.1996 to 15.07.2007.',
        line: 'Would you like to see the album?',
        move: '$ git log',
        hint: 'the commit history, newest first',
        does: {
          text: 'Shows the commit history of the current branch, newest first: hash, author, date, message.',
          meta: 'You leaf through the album from the last photo back.',
        },
        tip: 'A long list opens in a pager: `q` to quit, `/` to search.',
        opts: [
          {
            cmd: 'git log --oneline',
            text: '— short hash and the first line of the message.',
            meta: 'Only the captions under the photos.',
          },
          {
            cmd: 'git log --graph',
            text: '— draws branches and merges with lines.',
            meta: 'A family tree instead of a pile of photos.',
          },
          {
            cmd: 'git log -p',
            text: '— shows the changes of each commit.',
            meta: 'Under every photo: what exactly changed.',
          },
          {
            cmd: 'git log -- <file>',
            text: '— only the commits that changed this file.',
            meta: 'All the photos of one person.',
          },
        ],
      },
      diff: {
        title: 'Spot the difference',
        art: 'A person in a room holds the floor plan of the flat and compares it with what they see. The plan has a round table, but in the room only its outline is left on the floor; on the plan the floor lamp is next to the armchair, in the room it is at the other end; the old armchair is the same. On the wall, a portrait of a chameleon holding a photo of itself in another colour, with a not-equal sign between them.',
        line: 'Spot three differences',
        move: '$ git diff',
        hint: 'changed, but not indexed yet',
        does: {
          text: "Shows line by line what changed: `-` a removed line, `+` an added one. Without options it compares the working folder with the index, i.e. shows the changes not yet added with `git add`; it doesn't show new (untracked) files.",
          meta: 'You compare “before” and “after” down to the smallest detail.',
        },
        tip: "After `git add`, a plain `git diff` is empty, but the changes haven't gone anywhere: they're in the index now, and `git diff --staged` shows them.",
        opts: [
          {
            cmd: 'git diff --staged',
            text: '— the index against the last commit, i.e. what goes into the next commit.',
            meta: 'You look into the basket before carrying it up to the attic.',
          },
          {
            cmd: 'git diff HEAD',
            text: '— all changes against the last commit, added and not.',
            meta: 'You compare the whole room with the latest photo in the album.',
          },
          {
            cmd: 'git diff --stat',
            text: '— only which files changed and how many lines.',
            meta: 'A list of differences without the details.',
          },
        ],
      },
      merge: {
        title: 'A new neighbour',
        line: 'Let’s try living together',
        move: '$ git merge <branch>',
        hint: 'join a branch into the current one',
        does: {
          text: 'Joins another branch’s commits into the current branch. If the current branch has had no new commits since, git simply moves it forward (fast-forward); otherwise it creates a merge commit with two parents. If both branches changed the same lines, git stops at a conflict and waits until it is resolved.',
          meta: 'Someone moves in with their boxes; where two identical kettles claim the same spot, you decide.',
        },
        tip: 'A conflict? Fix the marked files, then `git add <file>` and `git commit`. Changed your mind? `git merge --abort` puts everything back as it was before the merge.',
        opts: [
          {
            cmd: 'git merge --no-ff <branch>',
            text: '— always a merge commit, even when a fast-forward would do: the history shows the branch was separate.',
            meta: 'You can see what your neighbour moved in with.',
          },
          {
            cmd: 'git merge --squash <branch>',
            text: '— brings all the branch’s changes into the index as one change, with no merge commit and no link to the branch; then `git commit`.',
            meta: 'You unpack all your neighbour’s boxes and put the things into one box of your own.',
          },
          {
            cmd: 'git merge --abort',
            text: '— during a conflict, goes back to the state before the merge.',
            meta: 'The neighbour moves out with their things.',
          },
        ],
        art: "On the left, a smiling person comes in through the open front door carrying a box with a yellow label; a few more boxes like it already stand in the room. On the right, the host, hand at the chin, looks at the counter, where two identical kettles stand side by side, the host's light one and the newcomer's yellow one, with a question mark between them. On the shelf above the counter, the host's own boxes without labels. On the wall, a portrait of two cats, a grey one and a light one, sniffing nose to nose.",
      },
      fetch: {
        title: 'What did we get?',
        line: 'Shall we have a quick look at the presents under the tree?',
        move: '$ git fetch',
        hint: 'what’s new on the server, nothing changes on your side',
        does: {
          text: 'Downloads new commits and branches from the remote repository and updates `origin/…`. Your own branches and working tree don’t change: you can look at what’s new with `git log origin/main` and bring it in with `git merge` or `git rebase`.',
          meta: 'The presents are already under the tree: you may shake them and read the gift tags, but it’s too early to unwrap them.',
        },
        tip: 'A safe command: run it any time to find out what has changed on the server.',
        opts: [
          {
            cmd: 'git fetch --prune',
            text: '— removes local `origin/…` branches that are gone from the server.',
            meta: 'You throw away the tags of presents already taken.',
          },
          {
            cmd: 'git fetch --all',
            text: '— from every remote repository, not only `origin`.',
            meta: 'You check every place where presents might be hidden.',
          },
          {
            cmd: 'git fetch origin <branch>',
            text: '— only one branch.',
            meta: 'You shake just one present.',
          },
        ],
        art: "On the right, a Christmas tree with a star and wrapped presents with orange ribbons under it. A person on one knee by the tree holds one present to their ear and shakes it to guess what's inside, without unwrapping it. On the wall, a portrait of a dog with a present in its mouth.",
      },
      pull: {
        title: 'Unwrapping a present',
        line: 'Oh, I’ve never had one like this',
        move: '$ git pull',
        hint: 'get what’s new from the server and merge it at once',
        does: {
          text: 'This is `git fetch` followed at once by merging what came in into the current branch. If the histories have diverged (new commits both on the server and on your side), git 2.43 stops and asks you to choose: a merge or `git pull --rebase` (the `pull.rebase` setting); if a simple fast-forward is possible, it goes through without questions.',
          meta: 'The present wasn’t just brought in: you unwrap it right away, and it takes its place in your home.',
        },
        tip: 'Before `git pull`, commit or stash your changes (`git stash`): that makes a conflict easier to sort out if one happens.',
        opts: [
          {
            cmd: 'git pull --rebase',
            text: '— after the fetch, puts your local commits on top of the ones that came in; the history stays straight.',
            meta: 'Other people’s presents go on the pile first, yours on top.',
          },
          {
            cmd: 'git pull --ff-only',
            text: '— updates only when a simple fast-forward is possible; otherwise stops and changes nothing.',
            meta: 'You unwrap only if you’re sure there is room.',
          },
          {
            cmd: 'git pull origin <branch>',
            text: '— from one particular remote branch.',
            meta: 'You unwrap only the present from someone close.',
          },
        ],
        art: "On the left, a stack of the household's own packed things: boxes without colour, each with a picture label (a little house, a book, a cup). Next to them stand presents with orange ribbons; a person on their knees holds up a jumper just taken out of an open box, a ribbon hanging over its edge and crumpled paper nearby. On the right, a Christmas tree. On the wall, a portrait of a kitten pulling the orange ribbon off a present.",
      },
      push: {
        title: 'A full shelf',
        line: 'Time to send the presents',
        move: '$ git push',
        hint: 'send your commits to the server',
        does: {
          text: 'Sends your commits to the remote branch. If it has commits you don’t have, git rejects the push: first `git pull`, then `git push` again.',
          meta: 'You take your parcel to the post office, where everyone will see it.',
        },
        tip: 'After a push everyone sees the commits: don’t rewrite them (`git commit --amend`, `git rebase`), or you’ll have to send them by force.',
        opts: [
          {
            cmd: 'git push -u origin <branch>',
            text: '— the first push of a new branch: remembers which remote branch yours goes with, so from then on `git push` is enough.',
            meta: 'The post office remembers your address.',
          },
          {
            cmd: 'git push --force-with-lease',
            text: '— overwrites the remote branch only if nobody else has added new commits there.',
            meta: 'You swap your parcel after checking that nobody has put theirs next to it.',
          },
          {
            cmd: 'git push origin --delete <branch>',
            text: '— deletes the branch on the server.',
            meta: 'You take your name off the letterbox.',
          },
        ],
        careful: [
          '`git push --force` overwrites the remote branch: other people’s commits that you don’t have disappear from the server.',
          'If you really must rewrite, use `git push --force-with-lease`, and never on a shared branch (`main`).',
        ],
        art: "A shared shelf at the post office, full of other people's parcels with addresses and stamps, a sign with an envelope above it. A person on the left shoves their own parcel with an orange ribbon onto the full shelf with all their strength, and at the other end someone else's parcel falls to the floor. On the wall, a portrait of a carrier pigeon with a letter.",
      },
      show: {
        title: 'One photo',
        line: 'That day when',
        move: '$ git show <commit>',
        hint: 'one commit in full',
        does: {
          text: 'Shows one object: for a commit, its author, date, message and changes (the diff); the first 7 characters of the hash are enough. Without arguments it shows the latest commit (`HEAD`). Changes nothing.',
          meta: 'You take one photo out of the family album and look at it closely, date and all.',
        },
        tip: '`git log` to find a commit, `git show <hash>` to look at it.',
        opts: [
          {
            cmd: 'git show <commit>:<file>',
            text: '— the file as it was in that commit.',
            meta: 'What the room looked like that day.',
          },
          {
            cmd: 'git show --stat <commit>',
            text: '— only the list of changed files and how many lines changed.',
            meta: 'Only the caption under the photo.',
          },
        ],
        art: "An open family album with a green cover on a table; in one place only the photo corners and the date 25.12.2026 are left, the photo is gone. A person stands next to it and looks at that photo up close: two people on either side of a Christmas tree, the same date below. On the wall, a portrait of a dog with a green winner's rosette, as at a dog show.",
      },
      revert: {
        title: 'The old wallpaper',
        line: 'The old ones were better. Let’s put them back.',
        move: '$ git revert <commit>',
        hint: 'a new commit that undoes an old one',
        does: {
          text: 'Creates a new commit that undoes the changes of the given commit; an editor opens for its message. The history isn’t rewritten, so this is the safe way to undo something already sent with `git push`.',
          meta: 'You don’t strip the new wallpaper: you paste the old pattern over it as a new layer.',
        },
        tip: 'A commit nobody has seen yet can also be removed with `git reset`; one that’s already on the server, only with `git revert`. A merge commit is undone with `git revert -m 1 <merge-commit>`, where 1 is the number of the branch you go back to (usually the main one).',
        opts: [
          {
            cmd: 'git revert --no-edit <commit>',
            text: '— the same, with the default message “Revert "…"”, without the editor.',
            meta: 'You paste straight away, no trying it on.',
          },
          {
            cmd: 'git revert HEAD',
            text: '— undoes the latest commit.',
            meta: 'You redo only the last strip.',
          },
          {
            cmd: 'git revert --no-commit <commit>',
            text: '— undoes the changes in the working tree and the index without a commit, so several undos can go into one commit.',
            meta: 'You take down several strips and repaper them in one go.',
          },
        ],
        art: 'On the left of the wall, the old wallpaper with wavy stripes; on the right, the new one with dots. A person on a stool pastes the old wavy pattern again over the new wallpaper: one yellow strip is already up, the lower end of the next one is still in their hand; its edge shows the new wallpaper stays underneath. On the floor, a bucket of paste with a brush. On the wall, a portrait of a yellow crab with an arrow pointing left.',
      },
      'cherry-pick': {
        title: 'Grandma’s recipe',
        line: 'Oh, my favourite pie. I must copy it for myself',
        move: '$ git cherry-pick <commit>',
        hint: 'a copy of one commit in the current branch',
        does: {
          text: 'Takes the changes of one commit from another branch and applies them to the current one as a new commit, with a new hash. The original stays on its branch.',
          meta: 'You copy one recipe from grandma’s notebook into yours; grandma still has it too.',
        },
        tip: 'A conflict? Fix it, `git add <file>`, then `git cherry-pick --continue`. Changed your mind? `git cherry-pick --abort`.',
        opts: [
          {
            cmd: 'git cherry-pick <from>..<to>',
            text: '— several commits in a row, without `<from>` itself.',
            meta: 'Several recipes in a row.',
          },
          {
            cmd: 'git cherry-pick -x <commit>',
            text: '— adds the line “(cherry picked from commit …)” to the message.',
            meta: 'You write under the recipe: “from grandma”.',
          },
          {
            cmd: 'git cherry-pick -n <commit>',
            text: '— brings the commit’s changes into the working tree and the index without a commit, so you can adjust them or collect several into one commit.',
            meta: 'You copy the recipe and add your own changes before writing it out neatly.',
          },
        ],
        art: "Two open recipe notebooks on a table. On the left, grandma's: big and old, with a worn cover and a ribbon bookmark; a pot on one page, a cherry pie on the other. On the right, a smaller spiral notebook with a yellow cover: a bowl with chopsticks on one page and the same pie, still half drawn, on the other. A person stands in front of the table, leaning over their own notebook, copying the pie with a pen. On the wall, a portrait of a thrush with two yellow cherries in its beak.",
      },
      reset: {
        title: 'Tree or bin',
        line: 'This one on the tree, this one in the bin. Just don’t mix them up',
        move: '$ git reset HEAD~1',
        hint: 'take off the last commit, the changes stay in the files',
        does: {
          text: 'Moves the current branch to another commit (for example, `HEAD~1` is one back). What happens to the changes of the removed commits depends on the mode: with `git reset --soft` they stay in the index, with the default `git reset` only in the working tree, with `git reset --hard` they are gone.',
          meta: 'You unpack a box from the attic: some things go on the tree, some into the bin.',
        },
        tip: 'With a file instead of a commit, `git reset <file>` just takes the file out of the index, like `git restore --staged <file>`.',
        opts: [
          {
            cmd: 'git reset --soft HEAD~1',
            text: '— takes off the last commit; the changes stay in the index, ready for a new commit.',
            meta: 'The bauble stays in the box, close at hand.',
          },
          {
            cmd: 'git reset --hard HEAD~1',
            text: '— takes off the commit and wipes the changes in the index and the working tree.',
            meta: 'The bauble goes into the bin.',
          },
        ],
        careful: [
          '`git reset --hard` wipes uncommitted changes for good.',
          'Removed commits can still be found in `git reflog` until git cleans them up. Don’t take commits that are already on the server off with `git reset`: for those there is `git revert`.',
        ],
        art: 'At home, a decorated Christmas tree, an open yellow box from the attic under it. A person stands between a bin and the tree: with one hand they hang a whole bauble on the tree, with the other they drop a broken one into the bin. On the wall, a portrait of a goldfish in a bowl.',
      },
      reflog: {
        title: 'The bauble list',
        line: 'Small baubles: there were 10, now there are 8',
        move: '$ git reflog',
        hint: 'where HEAD has been, step by step',
        does: {
          text: 'Shows the local log of every place `HEAD` has been, newest first: commits, branch switches, `git reset`, `git rebase`. That’s how you find a commit that has vanished from `git log`.',
          meta: 'The list records every change: there were 10 baubles, now there are 8, and you can see when two went missing.',
        },
        tip: 'The reflog is local and temporary: the server doesn’t have it, and git clears old entries over time (by default after 90 days, entries about unreachable commits after 30).',
        opts: [
          {
            cmd: 'git reflog show <branch>',
            text: '— the log of one branch.',
            meta: 'Only the line about the small baubles.',
          },
          {
            cmd: 'git branch <name> HEAD@{2}',
            text: '— brings a lost commit back as a new branch.',
            meta: 'The list shows you when everything was still in place.',
          },
        ],
        art: 'At home, a decorated Christmas tree, and in the corner a bin with a broken bauble in it. A person by the tree reads a list on a green clipboard: each line has a small bauble and tally marks, one line is circled; the person glances at the tree and counts. On the wall, a portrait of a rat on the rim of a bin.',
      },
      rebase: {
        title: 'A new base',
        line: 'Let’s stack them nicely so they don’t fall!',
        move: '$ git rebase main',
        hint: 'your commits on top of a fresh main',
        does: {
          text: 'Moves the commits of the current branch as if it had started from another place (for example, a newer `main`): each commit is applied again and gets a new hash. The history becomes straight, with no merge commits.',
          meta: 'A new box was slipped under yours, and you stack yours on top again, carefully, so they don’t fall.',
        },
        tip: 'A conflict? Fix it, `git add <file>`, then `git rebase --continue`. Changed your mind? `git rebase --abort`.',
        opts: [
          {
            cmd: 'git rebase -i HEAD~3',
            text: '— opens a list of the last three commits: squash, reword, drop, reorder.',
            meta: 'You restack the top three boxes.',
          },
          {
            cmd: 'git rebase --abort',
            text: '— cancels a rebase halfway.',
            meta: 'You put the boxes back the way they were.',
          },
        ],
        careful: [
          'A rebase rewrites commits: if they have already been sent (`git push`), your history will part from everyone else’s.',
          'Rebase only your own commits that haven’t been sent yet. If something goes wrong, the old state is in `git reflog`.',
        ],
        art: "An attic. A stack of boxes with picture labels: books at the bottom, above them a newer box with a Halloween pumpkin, and on top a person carefully sets two yellow boxes, one with a birthday cake and one with a teddy bear, steadying them so they don't fall. On the wall, a portrait of a grey cat sitting on boxes.",
      },
      blame: {
        title: 'The list on the fridge',
        line: 'Who’s bringing the grapes?',
        move: '$ git blame <file>',
        hint: 'who changed each line, and when',
        does: {
          text: 'For each line of a file, shows in which commit, when and by whom it was last changed. Changes nothing.',
          meta: 'Next to each line of the dinner list, the little face of whoever added it: you know whom to ask.',
        },
        tip: 'Found the commit? Look at it in full: `git show <hash>`. “Blame” here isn’t about fault, it’s about whom to ask about a line.',
        opts: [
          {
            cmd: 'git blame -L 10,20 <file>',
            text: '— only lines 10 to 20.',
            meta: 'You look only at the grapes line.',
          },
          {
            cmd: 'git blame -w <file>',
            text: '— ignores whitespace changes.',
            meta: 'A line where only the indent was fixed still belongs to its first author.',
          },
          {
            cmd: 'git blame <commit> -- <file>',
            text: '— the file as it was at the given commit.',
            meta: 'The list as it was yesterday.',
          },
        ],
        art: 'A list of who brings what to the dinner hangs on the fridge under a green magnet: each line starts with a picture of the item, is written in different handwriting and ends with the little face of whoever added it; the same faces hang as photo magnets on the freezer door. A person holds a magnifying glass over the end of the green grapes line, and the glass shows a face with a bow. An empty shopping bag at their feet. On the wall, a portrait of a dog with a green sock in its mouth.',
      },
      bisect: {
        title: 'The dead bulb',
        line: 'Ah, there’s the problem',
        move: '$ git bisect start',
        hint: 'start looking for the commit that broke it',
        does: {
          text: 'Finds the commit that broke something by halving: you say where it still worked (`git bisect good <commit>`) and where it no longer does (`git bisect bad`), git checks out the commit in the middle, you test it and report. In a few steps the guilty commit is found.',
          meta: 'The fairy lights are out: you check one half, then half of what’s left, and so on down to that one bulb.',
        },
        tip: 'At the end, `git bisect reset` takes you back to the branch where the search began.',
        opts: [
          {
            cmd: 'git bisect run <command>',
            text: '— git runs the command at every step and reads its exit code: 0 is “good”, 125 is “skip”, 1 to 124 and 126–127 are “bad”, above 127 stops the search.',
            meta: 'You test the bulbs with a tester, not by eye.',
          },
          {
            cmd: 'git bisect skip',
            text: '— this commit can’t be tested (for example, it doesn’t build): git takes a neighbouring one.',
            meta: 'A bulb won’t screw in, so you take the next one.',
          },
          {
            cmd: 'git bisect reset',
            text: '— ends the search and returns to the starting branch.',
            meta: 'You hang the lights back up.',
          },
        ],
        art: 'A garland hangs across the wall on two nails, and none of it lights up. Under the left half and the next quarter, brackets with ticks: those parts are checked, with green clothes pegs at their borders. A person has taken a bulb out of the remaining part and holds it up to the light: the glass is dark, the filament broken; a spare bulb in the other hand. On the wall, a portrait of a guinea pig chewing the garland wire.',
      },
      tag: {
        title: 'A label on the jar',
        line: 'Easier to find',
        move: '$ git tag v1.0',
        hint: 'a mark on the current commit',
        does: {
          text: 'Puts a permanent mark on a commit, usually a version number (`v1.0`). Unlike a branch, a tag doesn’t move with new commits: it always points at the same commit.',
          meta: 'Among identical jars of jam, you stick a label on your favourite one, so it’s easier to find later.',
        },
        tip: 'A plain `git push` doesn’t send tags: you need `git push origin v1.0` or `git push --tags`.',
        opts: [
          {
            cmd: 'git tag',
            text: '— lists the tags.',
            meta: 'You look over all the labelled jars.',
          },
          {
            cmd: 'git tag -a v1.0 -m "…"',
            text: '— an annotated tag with an author, a date and a message, for releases.',
            meta: 'A label with the year and who made the jam.',
          },
          {
            cmd: 'git tag -d v1.0',
            text: '— deletes the tag locally; it stays on the server until you run `git push origin --delete v1.0`.',
            meta: 'You peel the label off your own jar.',
          },
        ],
        art: 'A pantry rack full of identical jars of jam under cloth covers; two jars have light labels, 2024 and 2025. A person on one knee by the rack presses a yellow 2026 label onto the newest jar on the bottom shelf. A roll of yellow labels nearby. On the wall, a portrait of a dog with a yellow address tag on its collar.',
      },
    },
  },
};
