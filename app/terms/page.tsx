// ============================================
// fragoulishome.gr — Terms Page (/terms)
// Privacy Policy, Terms & Conditions, and Cookie Policy
// presented in a single page with sidebar navigation.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy, Terms & Cookie Policy · Fragoulishome",
  description:
    "Fragoulishome legal information: Privacy Policy, Terms & Conditions, and Cookie Policy for direct bookings at our maisonettes in Sitia, Crete.",
  alternates: { canonical: "/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  return (
    <main className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-4xl)" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-lg)" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: "var(--space-xs)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          <li><Link href="/" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>Terms</li>
        </ol>
      </nav>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "var(--space-xl)" }}>
        Terms
      </h1>

      {/* Two-column layout: sidebar + content */}
      <div style={{ display: "flex", gap: "var(--space-2xl)", flexDirection: "column" }} className="legal-layout">
        {/* Sidebar navigation */}
        <nav
          aria-label="Terms sections"
          className="legal-sidebar"
          style={{
            flexShrink: 0,
            width: "100%",
            borderBottom: "1px solid var(--color-border)",
            paddingBottom: "var(--space-md)",
            marginBottom: "var(--space-md)",
          }}
        >
          <ul style={{ listStyle: "none", display: "flex", gap: "var(--space-md)", flexWrap: "wrap", fontSize: "0.875rem" }}>
            <li>
              <a href="#privacy-policy" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#terms-conditions" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                Terms & Conditions
              </a>
            </li>
            <li>
              <a href="#cookie-policy" style={{ color: "var(--color-accent)", fontWeight: 500 }}>
                Cookie Policy
              </a>
            </li>
          </ul>
        </nav>

        {/* Main content */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ maxWidth: "720px", fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--color-text)", display: "flex", flexDirection: "column", gap: "var(--space-2xl)" }}>

            {/* ============================================ */}
            {/* Section 1: Privacy Policy                      */}
            {/* ============================================ */}
            <section id="privacy-policy">
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "var(--space-lg)", paddingBottom: "var(--space-sm)", borderBottom: "1px solid var(--color-border)" }}>
                Privacy Policy
              </h2>

              <p style={{ marginBottom: "var(--space-md)" }}>
                <strong>Effective date:</strong> August 2026
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>1. Who we are</h3>
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
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>2. What data we collect</h3>
                  <p>We collect the following categories of personal data:</p>
                  <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                    <li><strong>Booking information:</strong> Name, email address, phone number, check-in/out dates, number of guests, and any special requests you provide when making a reservation.</li>
                    <li><strong>Payment information:</strong> Payment card details are processed by Stripe, Inc. We do not store full card numbers on our servers.</li>
                    <li><strong>Technical data:</strong> IP address, browser type and version, device type, operating system, referring URL, and pages visited on our site (collected through cookies and similar technologies).</li>
                    <li><strong>Communication data:</strong> Any information you provide when contacting us via email or the contact form.</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>3. How we collect your data</h3>
                  <p>We collect data when you:</p>
                  <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                    <li>Fill in the booking form on our website.</li>
                    <li>Contact us via email.</li>
                    <li>Browse or interact with our site (via cookies and analytics tools).</li>
                    <li>Complete a payment through Stripe.</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>4. Why we process your data (legal basis)</h3>
                  <ul style={{ paddingLeft: "var(--space-lg)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                    <li><strong>Contract performance:</strong> To process and manage your booking, communicate with you about your stay, and handle payments.</li>
                    <li><strong>Legitimate interest:</strong> To improve our website, monitor usage patterns, and prevent fraud.</li>
                    <li><strong>Consent:</strong> To store non-essential cookies (analytics, marketing) and send marketing communications (if you opt in).</li>
                    <li><strong>Legal obligation:</strong> To retain booking and financial records as required by Greek and EU tax law.</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>5. How we store and protect your data</h3>
                  <p>
                    Your data is stored securely on Supabase (PostgreSQL) and Stripe servers, both of which implement industry-standard
                    encryption and security practices. We retain booking data for the duration required by Greek tax law (currently 5 years)
                    and for legitimate business purposes thereafter.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>6. Who we share your data with</h3>
                  <p>We do not sell your personal data. We may share your data with the following third parties strictly for operational purposes:</p>
                  <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                    <li><strong>Stripe</strong> — payment processing (card details never reach our servers).</li>
                    <li><strong>Supabase</strong> — database hosting and authentication.</li>
                    <li><strong>Vercel</strong> — web hosting and CDN.</li>
                    <li><strong>Analytics providers</strong> — only if you consent to analytics cookies.</li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>7. Your rights (GDPR)</h3>
                  <p>Under the General Data Protection Regulation, you have the following rights:</p>
                  <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                    <li><strong>Right of access</strong> — request a copy of the data we hold about you.</li>
                    <li><strong>Right to rectification</strong> — correct inaccurate or incomplete data.</li>
                    <li><strong>Right to erasure</strong> (&ldquo;right to be forgotten&rdquo;) — request deletion of your data, subject to legal retention requirements.</li>
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
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>8. Data transfers outside the EU</h3>
                  <p>
                    Our service providers (Stripe, Vercel, Supabase) may process data in countries outside the European Economic Area.
                    Where this occurs, we ensure appropriate safeguards are in place, such as Standard Contractual Clauses (SCCs)
                    approved by the European Commission.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>9. Changes to this policy</h3>
                  <p>
                    We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective
                    date. We encourage you to review this page periodically.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>10. Contact</h3>
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
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* Section 2: Terms & Conditions                 */}
            {/* ============================================ */}
            <section id="terms-conditions">
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "var(--space-lg)", paddingBottom: "var(--space-sm)", borderBottom: "1px solid var(--color-border)" }}>
                Terms & Conditions
              </h2>

              <p style={{ marginBottom: "var(--space-md)" }}>
                These Terms & Conditions apply to reservations made directly through this website for accommodation at our furnished tourist residences in Sitia, Crete, Greece.
              </p>
              <p style={{ marginBottom: "var(--space-lg)" }}>
                By making a reservation through our website, the guest confirms that they have read and accepted these Terms & Conditions.
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>1. Reservations</h3>
                  <p>Reservations are made directly through our website and are confirmed once the booking has been successfully completed and payment has been received.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>The guest must provide accurate information during the booking process, including their name, contact details, number of guests and dates of stay.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>The person making the reservation is responsible for ensuring that the information provided is correct.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>2. Prices and Payment</h3>
                  <p>The total price of the reservation is displayed before the booking is completed.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Payment of the full amount is required at the time of booking. Payment is processed securely through our online payment provider.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Any applicable taxes, charges or mandatory fees will be clearly indicated during the booking process.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>3. Cancellation Policy</h3>
                  <p>Guests may cancel their reservation according to the following conditions:</p>
                  <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                    <li><strong>More than 14 days</strong> before the scheduled check-in date: 100% refund of the amount paid.</li>
                    <li><strong>7 to 13 days</strong> before the scheduled check-in date: 50% refund of the amount paid.</li>
                    <li><strong>Less than 7 days</strong> before the scheduled check-in date: No refund.</li>
                  </ul>
                  <p style={{ marginTop: "var(--space-sm)" }}>The applicable cancellation period is calculated according to the scheduled check-in date and time indicated in the reservation.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Any refund due will be returned using the original payment method, subject to the processing time of the payment provider.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>4. Changes to a Reservation</h3>
                  <p>Requests to change the dates, number of guests or other details of a reservation are subject to availability and may affect the price and cancellation conditions.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>A reservation change is not considered confirmed until it has been accepted by us in writing or through the booking system.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>5. Check-in and Check-out</h3>
                  <p>Check-in and check-out times are communicated to the guest before arrival.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Guests are expected to respect the agreed check-in and check-out times. Requests for early check-in or late check-out are subject to availability and may incur an additional charge where applicable.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>6. Number of Guests</h3>
                  <p>Only the number of guests stated in the reservation may stay at the accommodation, unless an additional arrangement has been agreed with us in advance.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Guests must provide accurate information regarding the number of persons staying at the property.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>7. Use of the Accommodation</h3>
                  <p>The accommodation is provided for holiday and short-term accommodation purposes.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Guests are expected to use the property, furniture, equipment and facilities responsibly and with reasonable care.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>The accommodation must not be used for illegal activities or for activities that may cause damage, excessive disturbance or unreasonable inconvenience to neighbours.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>8. Damage to the Property</h3>
                  <p>Guests are responsible for damage to the accommodation or its contents caused by themselves or by members of their party, except for normal wear and tear.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Where appropriate, we reserve the right to seek reasonable compensation for damage caused during the stay.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>9. House Rules</h3>
                  <p>Guests agree to comply with the house rules provided for the accommodation, including any applicable rules concerning smoking, pets, noise, occupancy and the use of facilities.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>House rules form part of these Terms & Conditions.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>10. Cancellation or Changes by Us</h3>
                  <p>In exceptional circumstances beyond our reasonable control, we may be unable to provide the reserved accommodation.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>If this occurs, we will inform the guest as soon as reasonably possible and provide an appropriate solution, including a full refund of amounts paid for the affected reservation where required.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>We will not be responsible for additional costs incurred by the guest as a result of circumstances beyond our reasonable control, except where required by applicable law.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>11. Force Majeure</h3>
                  <p>We shall not be liable for failure or delay in fulfilling our obligations where this is caused by circumstances beyond our reasonable control, including natural disasters, extreme weather events, government measures, war, civil unrest, major infrastructure failures or other exceptional events that prevent the accommodation from being provided.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>12. Guest Complaints</h3>
                  <p>If a guest encounters a problem with the accommodation during their stay, they should contact us as soon as reasonably possible.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>We will make reasonable efforts to investigate and resolve problems reported during the stay.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>13. Personal Data</h3>
                  <p>Personal information provided during the booking process is processed in accordance with our Privacy Policy (see above).</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Payment card information is processed through our payment service provider and is not stored on our website.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>14. Consumer Rights</h3>
                  <p>Nothing in these Terms & Conditions is intended to restrict any mandatory rights that guests may have under applicable Greek or European Union consumer-protection law.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Reservations for accommodation for specific dates or periods are subject to the applicable legal rules concerning such services.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>15. Applicable Law</h3>
                  <p>These Terms & Conditions and reservations made through this website are governed by Greek law.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}>Any disputes shall be subject to the jurisdiction of the competent courts, without prejudice to any mandatory consumer rights applicable under Greek or European Union law.</p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>16. Contact</h3>
                  <p>For questions regarding reservations, cancellations or these Terms & Conditions, guests may contact us using the contact information provided on this website.</p>
                  <p style={{ marginTop: "var(--space-sm)" }}><strong>Last updated:</strong> August 2026</p>
                </div>
              </div>
            </section>

            {/* ============================================ */}
            {/* Section 3: Cookie Policy                      */}
            {/* ============================================ */}
            <section id="cookie-policy">
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", marginBottom: "var(--space-lg)", paddingBottom: "var(--space-sm)", borderBottom: "1px solid var(--color-border)" }}>
                Cookie Policy
              </h2>

              <p style={{ marginBottom: "var(--space-md)" }}>
                <strong>Last updated:</strong> August 2026
              </p>

              <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-lg)" }}>
                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>What are cookies?</h3>
                  <p>
                    Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, as well as to provide information to the site owners. Cookies may be &ldquo;persistent&rdquo; (remaining on your device until they expire or are deleted) or &ldquo;session&rdquo; cookies (deleted when you close your browser).
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>How we use cookies</h3>
                  <p>We use cookies for the following purposes:</p>
                  <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
                    <li>
                      <strong>Necessary cookies</strong> (always active): These cookies are essential for the operation of our website. They enable core functionality such as security, network management, and accessibility. Without these cookies, services like the booking form and secure payments cannot be provided. They include session cookies, CSRF tokens, and booking-related cookies.
                    </li>
                    <li>
                      <strong>Analytics cookies</strong> (optional): These cookies help us understand how visitors interact with our site by collecting and reporting information anonymously — which pages are visited, how long users stay, and what links they click. We use this data to improve the site experience. These cookies are only set if you provide your consent via our cookie banner.
                    </li>
                    <li>
                      <strong>Marketing cookies</strong> (optional): These cookies may be used to deliver advertisements that are more relevant to you and to measure the effectiveness of advertising campaigns. They are only set if you provide your consent via our cookie banner.
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>Managing your cookie preferences</h3>
                  <p>
                    When you first visit our website, a cookie consent banner is displayed. You may choose to accept or reject non-essential (analytics and marketing) cookies. Necessary cookies cannot be disabled as they are required for the website to function properly.
                  </p>
                  <p style={{ marginTop: "var(--space-sm)" }}>
                    You can change your preferences at any time by clearing your browser cookies and revisiting our site, which will display the consent banner again. You may also configure your browser settings to block or alert you about cookies; however, disabling necessary cookies may affect the functionality of our website.
                  </p>
                  <p style={{ marginTop: "var(--space-sm)" }}>
                    For more information about how we handle your personal data, please refer to our Privacy Policy section above.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>Third-party cookies</h3>
                  <p>
                    Some cookies may be set by third-party services that appear on our pages. These include:
                  </p>
                  <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-xs)" }}>
                    <li><strong>Stripe</strong> — for secure payment processing.</li>
                    <li><strong>Analytics providers</strong> — only if you consent to analytics cookies.</li>
                  </ul>
                  <p style={{ marginTop: "var(--space-sm)" }}>
                    We do not control the setting of these third-party cookies, and we recommend that you check the respective third-party websites for more information about their cookies and how to manage them.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>Changes to this Cookie Policy</h3>
                  <p>
                    We may update this Cookie Policy from time to time to reflect changes in the cookies we use or for other operational, legal, or regulatory reasons. Please revisit this page regularly to stay informed about our use of cookies.
                  </p>
                </div>

                <div>
                  <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-xs)" }}>Contact</h3>
                  <p>
                    If you have any questions about our use of cookies, please contact us at{" "}
                    <a href="mailto:fragoulishome@gmail.com" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
                      fragoulishome@gmail.com
                    </a>
                    .
                  </p>
                </div>
              </div>
            </section>

          </div>
        </div>
      </div>

      {/* Responsive sidebar styles */}
      <style>{`
        @media (min-width: 768px) {
          .legal-layout {
            flex-direction: row !important;
          }
          .legal-sidebar {
            width: 200px !important;
            border-bottom: none !important;
            padding-bottom: 0 !important;
            margin-bottom: 0 !important;
            position: sticky;
            top: var(--space-xl);
            align-self: flex-start;
          }
          .legal-sidebar ul {
            flex-direction: column !important;
            gap: var(--space-sm) !important;
          }
        }
      `}</style>
    </main>
  );
}