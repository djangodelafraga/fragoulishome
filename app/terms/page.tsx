// ============================================
// fragoulishome.gr — Terms & Conditions Page
// Full terms for direct bookings at our maisonettes in Sitia, Crete.
// ============================================

export default function TermsPage() {
  return (
    <main className="container" style={{ paddingTop: "var(--space-3xl)", paddingBottom: "var(--space-4xl)" }}>
      {/* Breadcrumb */}
      <nav aria-label="Breadcrumb" style={{ marginBottom: "var(--space-lg)" }}>
        <ol style={{ listStyle: "none", display: "flex", gap: "var(--space-xs)", fontSize: "0.8125rem", color: "var(--color-text-muted)" }}>
          <li><a href="/" style={{ textDecoration: "underline", color: "var(--color-text-muted)" }}>Home</a></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" style={{ color: "var(--color-text)" }}>Terms & Conditions</li>
        </ol>
      </nav>

      <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "clamp(1.75rem, 4vw, 2.5rem)", marginBottom: "var(--space-xl)" }}>
        Terms & Conditions
      </h1>

      <div style={{ maxWidth: "720px", fontSize: "0.9375rem", lineHeight: 1.8, color: "var(--color-text)", display: "flex", flexDirection: "column", gap: "var(--space-xl)" }}>
        <p>
          These Terms & Conditions apply to reservations made directly through this website for accommodation at our furnished tourist residences in Sitia, Crete, Greece.
        </p>
        <p>
          By making a reservation through our website, the guest confirms that they have read and accepted these Terms & Conditions.
        </p>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>1. Reservations</h2>
          <p>
            Reservations are made directly through our website and are confirmed once the booking has been successfully completed and payment has been received.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            The guest must provide accurate information during the booking process, including their name, contact details, number of guests and dates of stay.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            The person making the reservation is responsible for ensuring that the information provided is correct.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>2. Prices and Payment</h2>
          <p>
            The total price of the reservation is displayed before the booking is completed.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Payment of the full amount is required at the time of booking. Payment is processed securely through our online payment provider.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Any applicable taxes, charges or mandatory fees will be clearly indicated during the booking process.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>3. Cancellation Policy</h2>
          <p>Guests may cancel their reservation according to the following conditions:</p>
          <ul style={{ paddingLeft: "var(--space-lg)", marginTop: "var(--space-sm)", display: "flex", flexDirection: "column", gap: "var(--space-sm)" }}>
            <li>
              <strong>More than 14 days</strong> before the scheduled check-in date:<br />
              100% refund of the amount paid.
            </li>
            <li>
              <strong>7 to 13 days</strong> before the scheduled check-in date:<br />
              50% refund of the amount paid.
            </li>
            <li>
              <strong>Less than 7 days</strong> before the scheduled check-in date:<br />
              No refund.
            </li>
          </ul>
          <p style={{ marginTop: "var(--space-sm)" }}>
            The applicable cancellation period is calculated according to the scheduled check-in date and time indicated in the reservation.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Any refund due will be returned using the original payment method, subject to the processing time of the payment provider.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>4. Changes to a Reservation</h2>
          <p>
            Requests to change the dates, number of guests or other details of a reservation are subject to availability and may affect the price and cancellation conditions.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            A reservation change is not considered confirmed until it has been accepted by us in writing or through the booking system.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>5. Check-in and Check-out</h2>
          <p>
            Check-in and check-out times are communicated to the guest before arrival.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Guests are expected to respect the agreed check-in and check-out times. Requests for early check-in or late check-out are subject to availability and may incur an additional charge where applicable.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>6. Number of Guests</h2>
          <p>
            Only the number of guests stated in the reservation may stay at the accommodation, unless an additional arrangement has been agreed with us in advance.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Guests must provide accurate information regarding the number of persons staying at the property.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>7. Use of the Accommodation</h2>
          <p>
            The accommodation is provided for holiday and short-term accommodation purposes.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Guests are expected to use the property, furniture, equipment and facilities responsibly and with reasonable care.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            The accommodation must not be used for illegal activities or for activities that may cause damage, excessive disturbance or unreasonable inconvenience to neighbours.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>8. Damage to the Property</h2>
          <p>
            Guests are responsible for damage to the accommodation or its contents caused by themselves or by members of their party, except for normal wear and tear.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Where appropriate, we reserve the right to seek reasonable compensation for damage caused during the stay.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>9. House Rules</h2>
          <p>
            Guests agree to comply with the house rules provided for the accommodation, including any applicable rules concerning smoking, pets, noise, occupancy and the use of facilities.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            House rules form part of these Terms & Conditions.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>10. Cancellation or Changes by Us</h2>
          <p>
            In exceptional circumstances beyond our reasonable control, we may be unable to provide the reserved accommodation.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            If this occurs, we will inform the guest as soon as reasonably possible and provide an appropriate solution, including a full refund of amounts paid for the affected reservation where required.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            We will not be responsible for additional costs incurred by the guest as a result of circumstances beyond our reasonable control, except where required by applicable law.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>11. Force Majeure</h2>
          <p>
            We shall not be liable for failure or delay in fulfilling our obligations where this is caused by circumstances beyond our reasonable control, including natural disasters, extreme weather events, government measures, war, civil unrest, major infrastructure failures or other exceptional events that prevent the accommodation from being provided.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>12. Guest Complaints</h2>
          <p>
            If a guest encounters a problem with the accommodation during their stay, they should contact us as soon as reasonably possible.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            We will make reasonable efforts to investigate and resolve problems reported during the stay.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>13. Personal Data</h2>
          <p>
            Personal information provided during the booking process is processed in accordance with our{" "}
            <a href="/privacy" style={{ color: "var(--color-accent)", textDecoration: "underline" }}>Privacy Policy</a>.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Payment card information is processed through our payment service provider and is not stored on our website unless specifically stated in our Privacy Policy.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>14. Consumer Rights</h2>
          <p>
            Nothing in these Terms & Conditions is intended to restrict any mandatory rights that guests may have under applicable Greek or European Union consumer-protection law.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Reservations for accommodation for specific dates or periods are subject to the applicable legal rules concerning such services.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>15. Applicable Law</h2>
          <p>
            These Terms & Conditions and reservations made through this website are governed by Greek law.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            Any disputes shall be subject to the jurisdiction of the competent courts, without prejudice to any mandatory consumer rights applicable under Greek or European Union law.
          </p>
        </section>

        <section>
          <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.25rem", marginBottom: "var(--space-sm)" }}>16. Contact</h2>
          <p>
            For questions regarding reservations, cancellations or these Terms & Conditions, guests may contact us using the contact information provided on this website.
          </p>
          <p style={{ marginTop: "var(--space-sm)" }}>
            <strong>Last updated:</strong> August 2026
          </p>
        </section>
      </div>
    </main>
  );
}