// "Tools and Read more" on the card detail (RSP-105): general tools, per-code RFC sections, extra links.
export const TOOLS = [
  {uk:'Chrome DevTools: вкладка Network', en:'Chrome DevTools: the Network panel', u:'https://developer.chrome.com/docs/devtools/network/reference'},
  {uk:'Firefox: Edit and Resend', en:'Firefox: Edit and Resend', u:'https://firefox-source-docs.mozilla.org/devtools-user/network_monitor/request_list/index.html#context-menu'},
  {uk:'Postman: як надіслати запит', en:'Postman: send a request', u:'https://learning.postman.com/docs/sending-requests/create-requests/request-basics/'}];
// RSP-105: per-code official sources. [RFC number, section]; MDN uses the code itself.
export const REF = {102:['2518','10.1'], 200:['9110','15.3.1'], 201:['9110','15.3.2'], 204:['9110','15.3.5'],
  301:['9110','15.4.2'], 302:['9110','15.4.3'], 304:['9110','15.4.5'], 400:['9110','15.5.1'],
  401:['9110','15.5.2'], 403:['9110','15.5.4'], 404:['9110','15.5.5'], 405:['9110','15.5.6'],
  408:['9110','15.5.9'], 409:['9110','15.5.10'], 413:['9110','15.5.14'], 415:['9110','15.5.16'],
  418:['9110','15.5.19'], 422:['9110','15.5.21'], 429:['6585','4'], 500:['9110','15.6.1'],
  502:['9110','15.6.3'], 503:['9110','15.6.4'], 504:['9110','15.6.5']};
// Extra per-code links, same shape as TOOLS: {401:[{uk:'…', en:'…', u:'https://…'}]}
export const MORE = {};
