// ============================================
// fragoulishome.gr — Privacy Policy Page
// Full GDPR-compliant privacy policy in English.
// ============================================

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy · Fragoulishome",
  description:
    "Fragoulishome privacy policy. How we collect, use, and protect your personal data when you book or browse our site.",
  alternates: { canonical: "/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  return (
    <main className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-4xl)" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-lg)" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: "var(--space-xs)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          <li><a href="/" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Home</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>Privacy Policy</li>
        </ol>
      </nav>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "var(--space-xl)" }}>
        Privacy Policy
      </h1>

      <div style={{ maxWidth: "720px", fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--color-text)", display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
        <p>
          <strong>Effective date:</strong> August 2026
        </p>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>1. Who we are</h2>
          <p>
            Fragoulishome (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website fragoulishome.gr and offers
            self-catered maisonettes for short-term rental in Petras, Sitia, Crete, Greece.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            <strong>Contact email:</strong>{" "}
            <a href="mailto:fragoulishome@gmail.com" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
              fragoulishome@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>2. What data we collect</h2>
          <p>We collect the following categories of personal data:</p>
          <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <li>
              <strong>Booking information:</strong> Name, email address, phone number, check-in/out dates, number of guests, and
              any special requests you provide when making a reservation.
            </li>
            <li>
              <strong>Payment information:</strong> Payment card details are processed by Stripe, Inc. We do not store full card
              numbers on our servers. Stripe&rsquo;s privacy policy applies to the payment transaction.
            </li>
            <li>
              <strong>Technical data:</strong> IP address, browser type and version, device type, operating system, referring URL,
              and pages visited on our site (collected through cookies and similar technologies).
            </li>
            <li>
              <strong>Communication data:</strong> Any information you provide when contacting us via email or the contact form.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>3. How we collect your data</h2>
          <p>We collect data when you:</p>
          <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <li>Fill in the booking form on our website.</li>
            <li>Contact us via email.</li>
            <li>Browse or interact with our site (via cookies and analytics tools).</li>
            <li>Complete a payment through Stripe.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>4. Why we process your data (legal basis)</h2>
          <ul style={{ paddingLeft: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            <li>
              <strong>Contract performance:</strong> To process and manage your booking, communicate with you about your stay, and
              handle payments.
            </li>
            <li>
              <strong>Legitimate interest:</strong> To improve our website, monitor usage patterns, and prevent fraud.
            </li>
            <li>
              <strong>Consent:</strong> To store non-essential cookies (analytics, marketing) and send marketing communications
              (if you opt in).
            </li>
            <li>
              <strong>Legal obligation:</strong> To retain booking and financial records as required by Greek and EU tax law.
            </li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>5. Cookies</h2>
          <p>
            Our site uses cookies to function properly and, with your consent, to analyse traffic and improve your experience.
            You can manage your cookie preferences through the cookie banner displayed on your first visit and at any time by
            clearing your browser cookies.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            <strong>Necessary cookies</strong> (always active): Session cookies, CSRF tokens, and booking-related cookies that
            enable core site functionality.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            <strong>Analytics cookies</strong> (optional): Help us understand how visitors interact with our site — which pages are
            visited, how long users stay, and what links they click. We use this data to improve the site.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            <strong>Marketing cookies</strong> (optional): Used to deliver relevant advertisements and measure campaign
            effectiveness.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            You can withdraw your consent at any time by rejecting cookies via the banner or adjusting your browser settings.
            Disabling certain cookies may affect site functionality.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>6. How we store and protect your data</h2>
          <p>
            Your data is stored securely on Supabase (PostgreSQL) and Stripe servers, both of which implement industry-standard
            encryption and security practices. We retain booking data for the duration required by Greek tax law (currently 5 years)
            and for legitimate business purposes thereafter. Payment data is handled exclusively by Stripe and is subject to their
            privacy policy.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>7. Who we share your data with</h2>
          <p>We do not sell your personal data. We may share your data with the following third parties strictly for operational purposes:</p>
          <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <li><strong>Stripe</strong> — payment processing (card details never reach our servers).</li>
            <li><strong>Supabase</strong> — database hosting and authentication.</li>
            <li><strong>Vercel</strong> — web hosting and CDN.</li>
            <li><strong>Analytics providers</strong> — only if you consent to analytics cookies.</li>
          </ul>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>8. Your rights (GDPR)</h2>
          <p>Under the General Data Protection Regulation, you have the following rights:</p>
          <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
            <li><strong>Right of access</strong> — request a copy of the data we hold about you.</li>
            <li><strong>Right to rectification</strong> — correct inaccurate or incomplete data.</li>
            <li><strong>Right to erasure (&ldquo;right to be forgotten&rdquo;)</strong> — request deletion of your data, subject to legal retention requirements.</li>
            <li><strong>Right to restrict processing</strong> — limit how we use your data.</li>
            <li><strong>Right to data portability</strong> — receive your data in a structured, machine-readable format.</li>
            <li><strong>Right to object</strong> — object to processing based on legitimate interest or for direct marketing.</li>
            <li><strong>Right to withdraw consent</strong> — withdraw cookie or marketing consent at any time.</li>
          </ul>
          <p style={{ marginTop: "var(--space-sm)" }}>
            To exercise any of these rights, please contact us at{" "}
            <a href="mailto:fragoulishome@gmail.com" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
              fragoulishome@gmail.com
            </a>
            . We will respond within 30 days.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>9. Data transfers outside the EU</h2>
          <p>
            Our service providers (Stripe, Vercel, Supabase) may process data in countries outside the European Economic Area.
            Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs)
            approved by the European Commission.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>10. Changes to this policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective
            date. We encourage you to review this page periodically.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>11. Contact</h2>
          <p>
            If you have any questions about this Privacy Policy or wish to exercise your rights, please contact us:
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Email:{" "}
            <a href="mailto:fragoulishome@gmail.com" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
              fragoulishome@gmail.com
            </a>
            <br />
            Address: Petras, Sitia, Crete 723 00, Greece
          </p>
        </section>
      </div>
    </main>
  );
}