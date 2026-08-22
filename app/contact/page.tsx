// ============================================
// fragoulishome.gr — Contact Page
// Contact form, details, and map embed.
// ============================================

import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Fragoulishome in Petras, Sitia, Crete. Email, phone, address, and contact form for booking enquiries and guest questions.",
  openGraph: {
    title: "Contact · Fragoulishome",
    description:
      "Get in touch with Fragoulishome in Petras, Sitia, Crete. Email, phone, address, and contact form.",
    url: "https://fragoulishome.gr/contact",
    siteName: "Fragoulishome",
    locale: "el_GR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact · Fragoulishome",
    description:
      "Get in touch with Fragoulishome in Petras, Sitia, Crete.",
  },
};

export default function ContactPage() {
  return (
    <main className="container" style={{ paddingBottom: "var(--space-4xl)" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-lg)" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: "var(--space-xs)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          <li><Link href="/" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Home</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>Contact</li>
        </ol>
      </nav>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "var(--space-xl)" }}>
        Contact Us
      </h1>

      <div style={{
        display: "grid",
        gap: "var(--space-2xl)",
        gridTemplateColumns: "1fr",
        maxWidth: "800px",
      }}>
        {/* Contact Details */}
        <section aria-labelledby="contact-details-heading">
          <h2 id="contact-details-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-lg)" }}>
            Get in Touch
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}>
            {/* Email */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)", padding: "var(--space-md)", background: "var(--color-bg-alt)", border: "1px solid var(--color-border)", borderRadius: "2px" }}>
              <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>✉</span>
              <div>
                <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Email</strong>
                <a href="mailto:fragoulishome@gmail.com" style={{ fontSize: "0.875rem", color: "var(--color-accent)", textDecoration: "underline", wordBreak: "break-all" }}>
                  fragoulishome@gmail.com
                </a>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                  We aim to respond within 24 hours.
                </p>
              </div>
            </div>

            {/* Phone */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)", padding: "var(--space-md)", background: "var(--color-bg-alt)", border: "1px solid var(--color-border)", borderRadius: "2px" }}>
              <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>☎</span>
              <div>
                <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Phone</strong>
                <a href="tel:+306971234567" style={{ fontSize: "0.875rem", color: "var(--color-accent)", textDecoration: "underline" }}>
                  +30 697 123 4567
                </a>
              </div>
            </div>

            {/* Address */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)", padding: "var(--space-md)", background: "var(--color-bg-alt)", border: "1px solid var(--color-border)", borderRadius: "2px" }}>
              <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>⚲</span>
              <div>
                <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Address</strong>
                <address style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", fontStyle: "normal", lineHeight: 1.6 }}>
                  Fragoulishome<br />
                  Epar.Od. Sitias – Palekastrou – Vai<br />
                  Petras, Sitia 723 00<br />
                  Crete, Greece
                </address>
              </div>
            </div>

            {/* Social */}
            <div style={{ display: "flex", alignItems: "flex-start", gap: "var(--space-md)", padding: "var(--space-md)", background: "var(--color-bg-alt)", border: "1px solid var(--color-border)", borderRadius: "2px" }}>
              <span aria-hidden="true" style={{ fontSize: "1.25rem", flexShrink: 0, width: "1.5rem", textAlign: "center" }}>📷</span>
              <div>
                <strong style={{ display: "block", fontSize: "0.9375rem", marginBottom: "0.25rem" }}>Follow us</strong>
                <a href="https://instagram.com/fragoulishome" target="_blank" rel="noopener noreferrer" style={{ fontSize: "0.875rem", color: "var(--color-accent)", textDecoration: "underline" }}>
                  @fragoulishome
                </a>
                <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", marginTop: "0.25rem" }}>
                  Follow us on Instagram for photos and updates.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section aria-labelledby="contact-form-heading">
          <h2 id="contact-form-heading" style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-lg)" }}>
            Send us a Message
          </h2>

          <form
            action="mailto:fragoulishome@gmail.com"
            method="GET"
            encType="text/plain"
            style={{ display: "flex", flexDirection: "column", gap: "var(--space-md)" }}
          >
            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Name</span>
              <input
                type="text"
                name="subject"
                required
                placeholder="Your name"
                aria-label="Your name"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-text)",
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                  lineHeight: 1.4,
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Email</span>
              <input
                type="email"
                name="body"
                required
                placeholder="your@email.com"
                aria-label="Your email address"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-text)",
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                  lineHeight: 1.4,
                }}
              />
            </label>

            <label style={{ display: "flex", flexDirection: "column", gap: "0.25rem" }}>
              <span style={{ fontSize: "0.8125rem", fontWeight: 500, color: "var(--color-text-muted)" }}>Message</span>
              <textarea
                name="body"
                required
                rows={5}
                placeholder="Tell us about your stay — dates, number of guests, any questions..."
                aria-label="Your message"
                style={{
                  width: "100%",
                  padding: "0.625rem 0.75rem",
                  fontSize: "0.9375rem",
                  fontFamily: "var(--font-sans)",
                  color: "var(--color-text)",
                  background: "var(--color-white)",
                  border: "1px solid var(--color-border)",
                  borderRadius: "2px",
                  lineHeight: 1.6,
                  resize: "vertical",
                }}
              />
            </label>

            <button
              type="submit"
              style={{
                alignSelf: "flex-start",
                padding: "0.75rem 2rem",
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "var(--color-white)",
                background: "var(--color-accent)",
                border: "none",
                borderRadius: "2px",
                cursor: "pointer",
                lineHeight: 1.4,
                transition: "opacity 0.2s",
              }}
            >
              Send Message
            </button>

            <p style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", lineHeight: 1.6 }}>
              This form opens your email client. You can also email us directly at{" "}
              <a href="mailto:fragoulishome@gmail.com" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>
                fragoulishome@gmail.com
              </a>.
            </p>
          </form>
        </section>

        {/* Map */}
        <section aria-label="Map showing Fragoulishome location">
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-lg)" }}>
            Find Us
          </h2>
          <div style={{ aspectRatio: "4 / 3", overflow: "hidden", position: "relative", border: "1px solid var(--color-border)" }}>
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=26.1197%2C35.197%2C26.1237%2C35.200&layer=mapnik&marker=35.1986%2C26.1217"
              title="Map showing Fragoulishome location in Petras, Sitia"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div style={{ position: "absolute", bottom: 8, right: 8, fontSize: "0.6875rem", background: "rgba(255,255,255,0.9)", padding: "2px 8px" }}>
              <a href="https://www.openstreetmap.org/?mlat=35.1986&mlon=26.1217#map=16/35.1986/26.1217" target="_blank" rel="noopener noreferrer" style={{ color: "var(--color-accent)" }}>
                Open larger map →
              </a>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}