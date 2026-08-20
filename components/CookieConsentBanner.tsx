// ============================================
// fragoulishome.gr — CookieConsentBanner
// Free GDPR-compliant cookie consent banner using
// a Silktide/Osano-style approach with localStorage.
// Accept All and Reject buttons with equal styling.
// ============================================

"use client";

import { useEffect, useState } from "react";
import { getConsent, isConsentValid, saveConsent, loadScriptAfterConsent } from "@/lib/cookieConsent";

const BANNER_STYLES = {
  overlay: {
    position: "fixed" as const,
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 9999,
    background: "#2a2825",
    color: "#ffffff",
    padding: "var(--space-lg)",
    boxShadow: "0 -2px 12px rgba(0,0,0,0.15)",
    fontFamily: 'var(--font-sans, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif)',
    fontSize: "0.875rem",
    lineHeight: 1.6,
  },
  inner: {
    maxWidth: "var(--max-width, 1200px)",
    margin: "0 auto",
    display: "flex",
    flexDirection: "column" as const,
    gap: "var(--space-md)",
  },
  text: {
    color: "#ffffff",
    margin: 0,
  },
  link: {
    color: "#a8b89a",
    textDecoration: "underline",
  },
  actions: {
    display: "flex",
    flexWrap: "wrap" as const,
    gap: "var(--space-sm)",
  },
  button: {
    flex: 1,
    minWidth: "140px",
    padding: "0.625rem 1.25rem",
    fontSize: "0.8125rem",
    fontWeight: 500,
    letterSpacing: "0.02em",
    textTransform: "uppercase" as const,
    border: "1px solid #ffffff",
    borderRadius: "2px",
    cursor: "pointer",
    transition: "opacity 0.2s",
    textAlign: "center" as const,
    fontFamily: "inherit",
  },
  acceptButton: {
    background: "#ffffff",
    color: "#2a2825",
  },
  rejectButton: {
    background: "transparent",
    color: "#ffffff",
  },
} as const;

export default function CookieConsentBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Check consent on mount
    const consent = getConsent();
    if (!consent || !isConsentValid(365)) {
      setVisible(true);
    } else {
      // Consent exists and is valid — conditionally load analytics scripts
      if (consent.analytics) {
        // Example: load analytics script after consent
        // loadScriptAfterConsent("https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX", "analytics");
      }
      if (consent.marketing) {
        // Example: load marketing scripts after consent
      }
    }
  }, []);

  function handleAcceptAll() {
    saveConsent(true, true);
    setVisible(false);
    // Load analytics scripts after accepting
    // loadScriptAfterConsent("https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX", "analytics");
  }

  function handleReject() {
    saveConsent(false, false);
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div role="dialog" aria-label="Cookie consent" style={BANNER_STYLES.overlay}>
      <div style={BANNER_STYLES.inner}>
        <p style={BANNER_STYLES.text}>
          We use cookies to ensure the site works properly (necessary cookies) and,
          with your consent, to analyse how visitors use the site and improve your experience.{" "}
          <a href="/privacy" style={BANNER_STYLES.link}>
            Learn more in our Privacy Policy
          </a>
          .
        </p>
        <div style={BANNER_STYLES.actions}>
          <button
            type="button"
            onClick={handleAcceptAll}
            style={{ ...BANNER_STYLES.button, ...BANNER_STYLES.acceptButton }}
          >
            Accept All
          </button>
          <button
            type="button"
            onClick={handleReject}
            style={{ ...BANNER_STYLES.button, ...BANNER_STYLES.rejectButton }}
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}