// ============================================
// fragoulishome.gr — Cookie Consent Configuration
// Free GDPR cookie consent using Silktide/Osano open-source approach.
// This config is loaded synchronously before the banner renders.
// ============================================

window.cookieConfig = {
  /**
   * Categories of cookies used on this site.
   * Each category has a unique id, a label, and a default consent state.
   */
  categories: [
    {
      id: "necessary",
      label: "Necessary",
      description: "Essential for the site to function (session, CSRF, booking data).",
      required: true,
      consented: true, // Always on
    },
    {
      id: "analytics",
      label: "Analytics",
      description: "Help us understand how visitors use the site (e.g., page views, navigation patterns).",
      required: false,
      consented: false,
    },
    {
      id: "marketing",
      label: "Marketing",
      description: "Used to deliver relevant ads and track campaign performance.",
      required: false,
      consented: false,
    },
  ],

  /**
   * Domain-scoped consent key in localStorage.
   */
  storageKey: "fragoulishome-cookie-consent",

  /**
   * How long the consent preference is valid (in days).
   * After this period, the banner is shown again.
   */
  expiryDays: 365,
};
