// ============================================
// fragoulishome.gr — Email Utility
// Sends booking enquiry emails via Nodemailer + Gmail SMTP.
// ============================================

import nodemailer from "nodemailer";

interface EnquiryData {
  roomTitle: string;
  checkIn: string;
  checkOut: string;
  guests: number;
  guestName: string;
  guestEmail: string;
  guestPhone?: string;
  specialRequests?: string;
}

function getTransporter() {
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!user || !pass) {
    throw new Error("Missing SMTP_USER or SMTP_PASS environment variables");
  }

  return nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: { user, pass },
  });
}

export async function sendBookingEnquiry(data: EnquiryData): Promise<void> {
  const transporter = getTransporter();

  const checkInDate = new Date(data.checkIn).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const checkOutDate = new Date(data.checkOut).toLocaleDateString("en-GB", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const nights = Math.max(1, Math.round(
    (new Date(data.checkOut).getTime() - new Date(data.checkIn).getTime()) / (1000 * 60 * 60 * 24),
  ));

  const emailBody = [
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "        NEW BOOKING ENQUIRY",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
    "",
    `Room:          ${data.roomTitle}`,
    `Guest Name:    ${data.guestName}`,
    `Guest Email:   ${data.guestEmail}`,
    `Guest Phone:   ${data.guestPhone || "—"}`,
    "",
    `Check-in:      ${checkInDate}`,
    `Check-out:     ${checkOutDate}`,
    `Nights:        ${nights}`,
    `Guests:        ${data.guests}`,
    "",
    "───────────────────────────────────────",
    "SPECIAL REQUESTS:",
    data.specialRequests?.trim()
      ? data.specialRequests
      : "  (none)",
    "───────────────────────────────────────",
    "",
    `Sent from fragoulishome.gr booking form`,
    `Guest email: ${data.guestEmail}`,
    "",
    "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  ].join("\n");

  await transporter.sendMail({
    from: `"Fragoulishome Booking" <${process.env.SMTP_USER}>`,
    to: "fragoulishome@gmail.com",
    replyTo: data.guestEmail,
    subject: `New Booking Enquiry — ${data.roomTitle} (${data.checkIn} to ${data.checkOut})`,
    text: emailBody,
  });
}