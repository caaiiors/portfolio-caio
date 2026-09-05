// Storage can be unavailable in private or restricted browsing contexts.
export function readPreference(key, fallback) {
  try {
    return localStorage.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}

export function savePreference(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch {
    // The current session still works when persistence is unavailable.
  }
}
