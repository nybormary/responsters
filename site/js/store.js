// Progress and settings in localStorage. Every key gets the prefix "httpon." (the project's first name),
// so existing progress keeps working. Reads fall back to the default; storage errors (private mode) are ignored.
export const store = {
  get(k, d){ try { const v = localStorage.getItem('httpon.'+k); return v==null ? d : JSON.parse(v); } catch(e){ return d; } },
  set(k, v){ try { localStorage.setItem('httpon.'+k, JSON.stringify(v)); } catch(e){} }
};
