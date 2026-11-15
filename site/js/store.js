// Progress and settings in localStorage. Every key gets its rubric's prefix (data/rubrics.js): "httpon." for the
// HTTP rubric (the project's first name; it also keeps the saved language), "gitty." for git, so existing progress
// keeps working and rubrics never share keys. Reads fall back to the default; storage errors (private mode) are ignored.
import { RUBRICS } from '../data/rubrics.js';

export function storeFor(prefix) {
  return {
    get(k, d) {
      try {
        const v = localStorage.getItem(prefix + '.' + k);
        return v == null ? d : JSON.parse(v);
      } catch {
        return d;
      }
    },
    set(k, v) {
      try {
        localStorage.setItem(prefix + '.' + k, JSON.stringify(v));
      } catch {
        // private mode or full storage: the setting just isn't saved
      }
    },
  };
}

export const store = storeFor(RUBRICS.http.store);
