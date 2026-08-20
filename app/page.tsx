// ============================================
// fragoulishome.gr — Home Page
// Premium Mediterranean boutique retreat.
// Editorial layout: hero → intro → rooms → landscape → location → story → CTA.
// ============================================

import Link from "next/link";
import { getRooms } from "@/lib/supabaseClient";
import AvailabilityBar from "@/components/AvailabilityBar";
import RoomPreview from "@/components/RoomPreview";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const rooms = await getRooms();
  const featured = rooms.slice(0, 2);

  return (
    <>
      {/* ============================================
          Hero — 85-95vh, image-dominant, editorial
          ============================================ */}
      <section
        aria-label="Introduction"
        style={{
          position: "relative",
          isolation: "isolate",
          height: "clamp(70vh, 90vh, 95vh)",
          minHeight: "500px",
          display: "flex",
          alignItems: "flex-end",
        }}
      >
        {/* Full-bleed background image */}
        <div
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 0,
            overflow: "hidden",
          }}
        >
          <img
            src="https://heoqwpbkdarhctxugzuk.supabase.co/storage/v1/object/sign/room-images/hero-photo.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmQzOWFkNi0xY2MxLTQwODUtOGIxZC0yODZmMGNhMTAyOWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyb29tLWltYWdlcy9oZXJvLXBob3RvLmpwZWciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg3MjUwNDkzLCJleHAiOjE3ODk4NDI0OTN9.QpSwJNIkB1Re5t800WiFl9g0KAyHlDtKOpdGd3uOKHM"
            alt="Fragoulishome — exterior with olive and pine trees"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center 40%",
            }}
          />
          {/* Very subtle darkening overlay */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(42,40,37,0.08) 0%, rgba(42,40,37,0.25) 100%)",
            }}
          />
        </div>

        {/* Hero content — text over image */}
        <div
          className="container"
          style={{
            position: "relative",
            zIndex: 1,
            paddingBottom: "clamp(var(--space-2xl), 8vh, var(--space-4xl))",
            width: "100%",
          }}
        >
          <p
            className="label fade-in"
            style={{ color: "var(--color-white)", marginBottom: "var(--space-md)", textShadow: "0 1px 2px rgba(0,0,0,0.15)" }}
          >
            Petras · Sitia · Crete
          </p>

          <h1
            className="display-heading fade-in-delay"
            style={{
              color: "var(--color-white)",
              maxWidth: "700px",
              marginBottom: "var(--space-lg)",
              textShadow: "0 1px 4px rgba(0,0,0,0.15)",
            }}
          >
            Fragoulishome
          </h1>

          <p
            className="fade-in-delay"
            style={{
              fontSize: "clamp(1rem, 1.5vw, 1.2rem)",
              lineHeight: 1.6,
              color: "var(--color-white)",
              maxWidth: "600px",
              marginBottom: "var(--space-xl)",
              textShadow: "0 1px 3px rgba(0,0,0,0.12)",
              opacity: 0.9,
            }}
          >
            Two peaceful maisonettes among olive and pine trees, steps from the sea in Sitia, Crete.
          </p>

          <AvailabilityBar />
        </div>
      </section>

      {/* ============================================
          Intro — quiet editorial statement
          ============================================ */}
      <section
        aria-labelledby="intro-heading"
        className="container section-spacing"
        style={{ textAlign: "center" }}
      >
        <p className="label" style={{ marginBottom: "var(--space-md)" }}>
          A quiet corner of eastern Crete
        </p>
        <h2
          id="intro-heading"
          className="section-heading"
          style={{ marginBottom: "var(--space-xl)" }}
        >
          Where the olive trees
          <br />
          meet the Libyan Sea
        </h2>
        <div className="text-column">
          <p className="body-lg">
            Fragoulishome sits in Petras, on the eastern edge of Sitia, where
            the Cretan countryside meets the sea. Two self-contained maisonettes
            set within a private grove of olive, pine and palm trees — a short
            walk from the beach and a few minutes from the town centre.
          </p>
        </div>
      </section>

      {/* ============================================
          Full-width cinematic image
          ============================================ */}
      <section aria-label="Landscape photograph" style={{ paddingBlock: "clamp(40px, 6vw, 80px)" }}>
        <div
          style={{
            width: "100%",
            maxWidth: "var(--max-width)",
            marginInline: "auto",
            paddingInline: "var(--content-padding)",
          }}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              aspectRatio: "21 / 9",
              overflow: "hidden",
            }}
          >
            <img
              src="https://heoqwpbkdarhctxugzuk.supabase.co/storage/v1/object/sign/room-images/sense%20of%20place.jpg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmQzOWFkNi0xY2MxLTQwODUtOGIxZC0yODZmMGNhMTAyOWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyb29tLWltYWdlcy9zZW5zZSBvZiBwbGFjZS5qcGciLCJzY29wZSI6ImRvd25sb2FkIiwiaWF0IjoxNzg3MjUxNTIxLCJleHAiOjE3ODk4NDM1MjF9.z6FkU1SGLQ1BjUwfpyRbGH0uuGkUZi1B_0xpdVKGn58"
              alt="Olive grove and coastline near Fragoulishome"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 60%",
              }}
              className="img-hover"
            />
          </div>
        </div>
      </section>

      {/* ============================================
          Maisonettes — asymmetric editorial grid
          ============================================ */}
      <section
        aria-labelledby="rooms-heading"
        className="container section-spacing"
      >
        <p className="label" style={{ marginBottom: "var(--space-md)" }}>
          Our rooms
        </p>
        <h2
          id="rooms-heading"
          className="section-heading"
          style={{ marginBottom: "var(--space-2xl)" }}
        >
          Two maisonettes,
          <br />
          each with its own character
        </h2>

        {featured.length > 0 ? (
          <div
            style={{
              display: "grid",
              gap: "clamp(var(--space-2xl), 6vw, var(--space-4xl))",
              gridTemplateColumns: "1fr",
            }}
          >
            {featured.map((room, i) => (
              <RoomPreview key={room.id} room={room} index={i} />
            ))}
          </div>
        ) : (
          <p style={{ color: "var(--color-text-muted)", fontSize: "0.9375rem" }}>
            Room details coming soon. Check back or{" "}
            <Link
              href="/contact"
              style={{ color: "var(--color-accent)", borderBottom: "1px solid var(--color-accent)" }}
            >
              contact us
            </Link>{" "}
            for availability.
          </p>
        )}

        {featured.length > 0 && (
          <p style={{ marginTop: "var(--space-2xl)", textAlign: "center" }}>
            <Link href="/rooms" className="link-underline">
              View all rooms &rarr;
            </Link>
          </p>
        )}
      </section>

      {/* ============================================
          Location — large landscape + map secondary
          ============================================ */}
      <section
        aria-labelledby="location-heading"
        id="location"
        className="container section-spacing"
      >
        <p className="label" style={{ marginBottom: "var(--space-md)" }}>
          Petras · Eastern Crete
        </p>
        <h2
          id="location-heading"
          className="section-heading"
          style={{ marginBottom: "var(--space-2xl)" }}
        >
          Steps from the sea,
          <br />
          minutes from Sitia
        </h2>

        {/* Desktop: text + map side by side */}
        <div
          className="location-grid"
          style={{
            display: "grid",
            gap: "var(--space-2xl)",
            gridTemplateColumns: "1fr",
            alignItems: "start",
          }}
        >
          {/* Location copy */}
          <div>
            <address
              style={{
                fontStyle: "normal",
                marginBottom: "var(--space-lg)",
                fontSize: "0.9375rem",
                lineHeight: 1.8,
                color: "var(--color-text-muted)",
              }}
            >
              Fragoulishome<br />
              Epar.Od. Sitias – Palekastrou – Vai<br />
              Petras, Sitia 723 00<br />
              Crete, Greece
            </address>

            <ul
              style={{
                listStyle: "none",
                padding: 0,
                display: "grid",
                gap: "var(--space-sm)",
                fontSize: "0.875rem",
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-xl)",
              }}
            >
              <li>50 m to the nearest beach</li>
              <li>1.5 km (10 min walk) to Sitia town centre</li>
              <li>10 min drive to Sitia airport (JSH)</li>
              <li>Easy access to Vai, Zakros, Palekastro, Richtis gorge</li>
            </ul>
          </div>

          {/* Map — secondary, clean */}
          <div
            style={{
              aspectRatio: "4 / 3",
              overflow: "hidden",
              position: "relative",
              border: "1px solid var(--color-border)",
            }}
          >
            <iframe
              src="https://www.openstreetmap.org/export/embed.html?bbox=26.1197%2C35.197%2C26.1237%2C35.200&layer=mapnik&marker=35.1986%2C26.1217"
              title="Map showing Fragoulishome location in Petras, Sitia"
              width="100%"
              height="100%"
              style={{ border: 0, display: "block" }}
              loading="lazy"
              referrerPolicy="no-referrer"
            />
            <div
              style={{
                position: "absolute",
                bottom: 8,
                right: 8,
                fontSize: "0.6875rem",
                background: "rgba(255,255,255,0.9)",
                padding: "2px 8px",
              }}
            >
              <a
                href="https://www.openstreetmap.org/?mlat=35.1986&mlon=26.1217#map=16/35.1986/26.1217"
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--color-accent)" }}
              >
                Open larger map &rarr;
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ============================================
          Story — editorial two-column
          ============================================ */}
      <section
        aria-labelledby="story-heading"
        id="about"
        className="container section-spacing"
      >
        <div
          className="story-grid"
          style={{
            display: "grid",
            gap: "clamp(var(--space-2xl), 6vw, var(--space-4xl))",
            gridTemplateColumns: "1fr",
            alignItems: "center",
          }}
        >
          {/* Image column — dominant */}
          <div
            style={{
              aspectRatio: "3 / 4",
              overflow: "hidden",
              position: "relative",
            }}
          >
            <img
              src="https://heoqwpbkdarhctxugzuk.supabase.co/storage/v1/object/sign/room-images/owner.jpeg?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8wMmQzOWFkNi0xY2MxLTQwODUtOGIxZC0yODZmMGNhMTAyOWUiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJyb29tLWltYWdlcy9vd25lci5qcGVnIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NzI1MDY5MywiZXhwIjoxNzg5ODQyNjkzfQ.b12smNMxxuoGII7Ha2QD25c9Yn2D2C_xlTWVP2g5W10"
              alt="Fragoulishome host"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center 30%",
              }}
              className="img-hover"
            />
          </div>

          {/* Text column */}
          <div>
            <p className="label" style={{ marginBottom: "var(--space-md)" }}>
              A family-run stay
            </p>
            <h2
              id="story-heading"
              className="section-heading"
              style={{ marginBottom: "var(--space-xl)" }}
            >
              Book directly —
              <br />
              no commissions,
              <br />
              no middlemen
            </h2>

            <p
              style={{
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.8,
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-lg)",
              }}
            >
              When you book directly through this website, there are no platform
              fees or commissions. You communicate directly with the family who
              owns and maintains the property.
            </p>

            <p
              style={{
                fontSize: "clamp(0.9375rem, 1.2vw, 1.0625rem)",
                lineHeight: 1.8,
                color: "var(--color-text-muted)",
                marginBottom: "var(--space-xl)",
              }}
            >
              Each maisonette has a fully equipped kitchen, private entrance,
              free parking, Wi-Fi, and air conditioning. Set on a 4,000 m² plot
              with olive, pine and palm trees, the property offers space and
              privacy while being within walking distance of Sitia&rsquo;s
              beaches, tavernas and shops.
            </p>

            {/* Quote */}
            <blockquote
              style={{
                borderLeft: "2px solid var(--color-accent)",
                paddingLeft: "var(--space-lg)",
                margin: 0,
              }}
            >
              <p
                style={{
                  fontSize: "0.9375rem",
                  color: "var(--color-text-muted)",
                  lineHeight: 1.7,
                  fontStyle: "italic",
                  marginBottom: "var(--space-sm)",
                }}
              >
                &ldquo;Fragoulishome has been our family&rsquo;s retreat for
                years — a place where the shade of the olive trees meets the
                sound of the sea. We welcome guests as we would welcome
                friends.&rdquo;
              </p>
              <p
                style={{
                  fontSize: "0.75rem",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  color: "var(--color-text)",
                }}
              >
                — Your host
              </p>
            </blockquote>
          </div>
        </div>
      </section>

      {/* ============================================
          CTA — simple, elegant
          ============================================ */}
      <section
        aria-label="Call to action"
        className="container section-spacing"
        style={{ textAlign: "center" }}
      >
        <p className="label" style={{ marginBottom: "var(--space-md)" }}>
          Stay by the sea
        </p>
        <h2
          className="section-heading"
          style={{ marginBottom: "var(--space-lg)" }}
        >
          Discover Fragoulishome
          <br />
          in Petras, Sitia
        </h2>
        <p
          className="body-lg"
          style={{ marginBottom: "var(--space-xl)", maxWidth: "500px", marginInline: "auto" }}
        >
          Two peaceful maisonettes surrounded by olive and pine trees, less than
          100 metres from the sea.
        </p>
        <Link
          href="/booking"
          style={{
            display: "inline-block",
            fontFamily: "var(--font-sans)",
            fontSize: "0.75rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "var(--color-white)",
            background: "var(--color-accent)",
            padding: "1rem 2.5rem",
            transition: "opacity 0.2s",
          }}
        >
          Check availability &rarr;
        </Link>
      </section>
    </>
  );
}