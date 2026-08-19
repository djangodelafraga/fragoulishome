// ============================================
// fragoulishome.gr — Home Page
// Editorial, close-to-nature direct-booking homepage.
// Sections: hero, sense of place, featured rooms, location, host.
// ============================================

import Link from "next/link";
import { getRooms } from "@/lib/supabaseClient";
import SectionHeading from "@/components/SectionHeading";
import AvailabilityBar from "@/components/AvailabilityBar";
import RoomPreview from "@/components/RoomPreview";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rooms = await getRooms();
  const featured = rooms.slice(0, 3);

  return (
    <>
      {/* ============================================
          Hero
          ============================================ */}
      <section aria-label="Introduction" style={{ position: "relative" }}>
        {/* Full-bleed background image */}
        <div
          style={{
            position: "relative",
            width: "100%",
            height: "clamp(60vh, 70vh, 80vh)",
            overflow: "hidden",
            background: "var(--color-bg-alt)",
          }}
        >
          {/* TODO: Replace with actual hero photograph of the property */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(180deg, rgba(42,40,37,0.15) 0%, rgba(42,40,37,0.45) 100%)",
              zIndex: 1,
            }}
          />
          <div className="image-placeholder" style={{ height: "100%", fontSize: "1rem" }}>
            Hero photograph — Fragoulishome exterior with olive trees
          </div>
        </div>

        {/* Overlay content */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-end",
            padding: "var(--content-padding)",
            paddingBottom: "clamp(var(--space-xl), 5vh, var(--space-3xl))",
          }}
        >
          <div className="container" style={{ padding: 0 }}>
            <h1
              style={{
                fontSize: "clamp(1.75rem, 5vw, 3rem)",
                color: "var(--color-white)",
                maxWidth: "14em",
                marginBottom: "var(--space-sm)",
                textShadow: "0 1px 4px rgba(0,0,0,0.2)",
              }}
            >
              Two peaceful maisonettes among olive and pine trees, steps from the sea in Sitia, Crete.
            </h1>
            <p
              style={{
                fontSize: "clamp(0.9375rem, 2vw, 1.125rem)",
                color: "rgba(255,255,255,0.9)",
                maxWidth: "32em",
                marginBottom: "var(--space-lg)",
                lineHeight: 1.5,
              }}
            >
              Direct booking, no platform fees. Petras, eastern Crete.
            </p>

            <AvailabilityBar />
          </div>
        </div>
      </section>

      {/* ============================================
          Sense of Place
          ============================================ */}
      <section aria-labelledby="sense-of-place-heading" className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-3xl)" }}>
        <SectionHeading as="h2" id="sense-of-place-heading">
          A quiet corner of eastern Crete
        </SectionHeading>

        <div style={{ display: "grid", gap: "var(--space-xl)", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "center" }}>
          {/* Image */}
          <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: "var(--color-border)", position: "relative" }}>
            {/* TODO: Replace with property/location photograph */}
            <div className="image-placeholder" style={{ height: "100%" }}>
              Photograph — olive grove or nearby coastline
            </div>
          </div>

          {/* Copy */}
          <div>
            <p style={{ fontSize: "1rem", lineHeight: 1.7, color: "var(--color-text)", marginBottom: "var(--space-lg)" }}>
              Fragoulishome sits in Petras, on the eastern edge of Sitia, where the Cretan countryside meets the Libyan Sea. Two self-contained maisonettes set within a private grove of olive, pine and palm trees — a short walk from the beach and a few minutes from the town centre.
            </p>

            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--space-md)" }}>
              <li style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "var(--space-md)" }}>
                <strong style={{ display: "block", fontSize: "0.875rem", fontFamily: "var(--font-serif)" }}>50 metres to the sea</strong>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>The nearest beach is directly across the road.</span>
              </li>
              <li style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "var(--space-md)" }}>
                <strong style={{ display: "block", fontSize: "0.875rem", fontFamily: "var(--font-serif)" }}>1.5 km to Sitia centre</strong>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>A 10-minute walk or 3-minute drive to restaurants, cafés and shops.</span>
              </li>
              <li style={{ borderLeft: "2px solid var(--color-accent)", paddingLeft: "var(--space-md)" }}>
                <strong style={{ display: "block", fontSize: "0.875rem", fontFamily: "var(--font-serif)" }}>Gateway to eastern Crete</strong>
                <span style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>Zakros gorges, Vai palm beach, Minoan sites — all within easy reach.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="hairline container" />

      {/* ============================================
          Featured Rooms
          ============================================ */}
      <section aria-labelledby="rooms-heading" className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-3xl)" }}>
        <SectionHeading as="h2" id="rooms-heading" subtitle="Two maisonettes, each with its own character. Both surrounded by trees and close to the sea.">
          Our rooms
        </SectionHeading>

        {featured.length > 0 ? (
          <div style={{ display: "grid", gap: "var(--space-xl)", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))" }}>
            {featured.map((room) => (
              <RoomPreview key={room.id} room={room} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
            Room details coming soon. Check back or <Link href="/contact" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>contact us</Link> for availability.
          </p>
        )}

        {featured.length > 0 && (
          <p style={{ marginTop: "var(--space-xl)", textAlign: "center" }}>
            <Link
              href="/rooms"
              style={{
                fontSize: "0.8125rem",
                fontWeight: 500,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                color: "var(--color-accent)",
                borderBottom: "1px solid var(--color-accent)",
                paddingBottom: "2px",
              }}
            >
              View all rooms &rarr;
            </Link>
          </p>
        )}
      </section>

      <hr className="hairline container" />

      {/* ============================================
          Location
          ============================================ */}
      <section aria-labelledby="location-heading" id="location" className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-3xl)" }}>
        <SectionHeading as="h2" id="location-heading" subtitle="Petras, Sitia, Crete — where the mountains meet the sea.">
          Location
        </SectionHeading>

        <div style={{ display: "grid", gap: "var(--space-xl)", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", alignItems: "center" }}>
          {/* Map placeholder */}
          <div style={{ aspectRatio: "4 / 3", overflow: "hidden", background: "var(--color-bg-alt)", position: "relative", border: "1px solid var(--color-border)" }}>
            {/* TODO: Replace with embedded map (Google Maps / OpenStreetMap) */}
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", padding: "var(--space-lg)", textAlign: "center" }}>
              <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", marginBottom: "var(--space-sm)" }}>
                Map loading
              </p>
              <Link
                href="https://maps.google.com/?q=Petras+Sitia+Crete+723+00"
                target="_blank"
                rel="noopener noreferrer"
                style={{ fontSize: "0.8125rem", color: "var(--color-accent)", textDecoration: "underline" }}
              >
                Open in Google Maps &rarr;
              </Link>
            </div>
          </div>

          {/* Location details */}
          <div>
            <address style={{ fontStyle: "normal", marginBottom: "var(--space-md)" }}>
              <p style={{ fontSize: "0.9375rem", lineHeight: 1.7 }}>
                <strong style={{ fontFamily: "var(--font-serif)", fontWeight: 400 }}>Fragoulishome</strong><br />
                Epar.Od. Sitias – Palekastrou – Vai 39<br />
                Petras, Sitia 723 00<br />
                Crete, Greece
              </p>
            </address>

            <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "var(--space-sm)", fontSize: "0.875rem", color: "var(--color-text-muted)" }}>
              <li>50 m to the nearest beach</li>
              <li>1.5 km (10 min walk) to Sitia town centre</li>
              <li>10 min drive to Sitia airport (JSH)</li>
              <li>Easy access to Vai, Zakros, Palekastro, Richtis gorge</li>
            </ul>
          </div>
        </div>
      </section>

      <hr className="hairline container" />

      {/* ============================================
          Host / Direct-Booking Reassurance
          ============================================ */}
      <section aria-labelledby="about-heading" id="about" className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-4xl)" }}>
        <SectionHeading as="h2" id="about-heading" subtitle="Book directly — no commissions, no middlemen.">
          A family-run stay
        </SectionHeading>

        <div style={{ display: "grid", gap: "var(--space-xl)", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}>
          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-lg)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-sm)" }}>Direct booking</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              When you book directly through this website, there are no platform fees or commissions. You communicate directly with the family who owns and maintains the property.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-lg)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-sm)" }}>Self-catered comfort</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              Each maisonette has a fully equipped kitchen, private entrance, free parking, Wi-Fi, and air conditioning. Bed linens, towels, and essentials are provided.
            </p>
          </div>

          <div style={{ borderTop: "1px solid var(--color-border)", paddingTop: "var(--space-lg)" }}>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.125rem", marginBottom: "var(--space-sm)" }}>Quiet coastal setting</h3>
            <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
              Set on a 4,000 m² plot with olive, pine and palm trees, the property offers space and privacy while being within walking distance of Sitia&rsquo;s beaches, tavernas and shops.
            </p>
          </div>
        </div>

        {/* TODO: Add host photo and personal story when available */}
        <div style={{ marginTop: "var(--space-xl)", padding: "var(--space-lg)", background: "var(--color-bg-alt)", borderLeft: "2px solid var(--color-accent)" }}>
          <p style={{ fontSize: "0.875rem", color: "var(--color-text-muted)", lineHeight: 1.7 }}>
            <strong style={{ color: "var(--color-text)", fontFamily: "var(--font-serif)", fontWeight: 400 }}>TODO:</strong> Add host introduction, photo, and personal story about Fragoulishome. Share how long the family has been welcoming guests, what they love about Petras, and what makes their hospitality unique.
          </p>
        </div>
      </section>
    </>
  );
}