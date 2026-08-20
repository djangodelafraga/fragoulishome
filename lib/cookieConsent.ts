// ============================================
// fragoulishome.gr — Cookie Consent Utilities
// Manages consent state in localStorage and provides
// a function to conditionally load third-party scripts.
// ============================================

export interface ConsentState {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

const STORAGE_KEY = "fragoulishome-cookie-consent";

/**
 * Read the current consent state from localStorage.
 * Returns null if no consent has been given yet.
 */
export function getConsent(): ConsentState | null {
  if (typeof window === "undefined") return null;

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as ConsentState;
  } catch {
    return null;
  }
}

/**
 * Save consent state to localStorage with an expiry timestamp.
 */
export function saveConsent(analytics: boolean, marketing: boolean): void {
  const state: ConsentState = {
    necessary: true, // Always active
    analytics,
    marketing,
    timestamp: new Date().toISOString(),
  };
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

/**
 * Clear consent — used when the user wants to reset their choice
 * or when consent has expired.
 */
export function clearConsent(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Check if stored consent is still valid (within expiry).
 */
export function isConsentValid(expiryDays: number = 365): boolean {
  const state = getConsent();
  if (!state) return false;

  const saved = new Date(state.timestamp);
  const now = new Date();
  const diffMs = now.getTime() - saved.getTime();
  const diffDays = diffMs / (1000 * 60 * 60 * 24);
  return diffDays <= expiryDays;
}

/**
 * Conditionally load a third-party script into <head> after consent is given.
 * The script is only injected once — subsequent calls are no-ops.
 */
export function loadScriptAfterConsent(
  src: string,
  category: "analytics" | "marketing",
  attrs?: Record<string, string>,
): void {
  if (typeof document === "undefined") return;

  const consent = getConsent();
  if (!consent || !consent[category]) return;

  // Check if already loaded
  if (document.querySelector(`script[data-consent-category="${category}"][src="${src}"]`)) {
    return;
  }

  const script = document.createElement("script");
  script.src = src;
  script.setAttribute("data-consent-category", category);
  script.async = true;

  if (attrs) {
    for (const [key, value] of Object.entries(attrs)) {
      script.setAttribute(key, value);
    }
  }

  document.head.appendChild(script);
}