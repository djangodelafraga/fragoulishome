# fragoulishome.gr — Implementation Roadmap

> This file maps every placeholder function, component, and scaffolding item to its implementation task.
> Check off items as they are completed during incremental development.

---

## Frontend TODO

- [ ] **RoomCard** (`components/RoomCard.tsx`) — Render room cover image, title, price, capacity, link to detail page.
- [ ] **BookingForm** (`components/BookingForm.tsx`) — Date picker, guest count, contact fields, price summary, submit handler.
- [ ] **AvailabilityCalendar** (`components/AvailabilityCalendar.tsx`) — Month grid with available/booked/blocked states, date range selection.
- [ ] **AdminSidebar** (`components/AdminSidebar.tsx`) — Active route highlighting, logout button.
- [ ] **ImageUploader** (`components/ImageUploader.tsx`) — Drag-and-drop, preview thumbnails, alt-text input per image.
- [ ] **SeoHead** (`components/SeoHead.tsx`) — Client-side meta tag injection (if needed beyond App Router metadata).
- [ ] **CookieConsentBanner** (`components/CookieConsentBanner.tsx`) — GDPR consent UI, localStorage persistence, accept/reject/customize.
- [ ] **Home Page** (`app/page.tsx`) — Hero section, featured rooms grid, location highlights, CTA.
- [ ] **Rooms Listing** (`app/rooms/page.tsx`) — Filterable/sortable room grid, search controls.
- [ ] **Room Detail** (`app/rooms/[id]/page.tsx`) — Image gallery, amenities, location summary, booking CTA.
- [ ] **Booking Page** (`app/booking/page.tsx`) — Full booking flow (dates → details → payment).
- [ ] **Contact Page** (`app/contact/page.tsx`) — Contact form, address/phone/email, map embed.
- [ ] **Privacy Page** (`app/privacy/page.tsx`) — GDPR-compliant privacy policy text.
- [ ] **Terms Page** (`app/terms/page.tsx`) — Terms & conditions text.
- [ ] **Admin Dashboard** (`app/admin/page.tsx`) — Stats cards, recent bookings, quick actions.
- [ ] **Admin Rooms** (`app/admin/rooms/page.tsx`) — CRUD UI for rooms, image upload integration.
- [ ] **Admin Bookings** (`app/admin/bookings/page.tsx`) — Bookings table, status management.
- [ ] **Admin Calendar** (`app/admin/calendar/page.tsx`) — Availability calendar, manual overrides, iCal sync trigger.
- [ ] **Root Layout** (`app/layout.tsx`) — Site header/nav, semantic HTML structure, footer, resource hints.
- [ ] **Global Styles** (`app/globals.css`) — Replace with Tailwind CSS or design system.

---

## Backend TODO

- [ ] **Supabase Client** (`lib/supabaseClient.ts`)
  - [ ] `getRooms()` — Fetch active rooms from `rooms` table.
  - [ ] `getRoomById()` — Fetch single room with images + address.
  - [ ] `createBooking()` — Insert booking record.
  - [ ] `checkAvailability()` — Query availability between dates.
  - [ ] `syncCalendar()` — Fetch iCal feed, parse events, upsert availability.
  - [ ] `uploadRoomImages()` — Upload to Supabase Storage, return public URLs.
  - [ ] `getUser()` — Get current authenticated user.
  - [ ] `login()` — Sign in with email/password.
  - [ ] `logout()` — Sign out.
- [ ] **Stripe Client** (`lib/stripe.ts`)
  - [ ] `createPaymentIntent()` — Create Stripe PaymentIntent for a booking.
  - [ ] `handleWebhook()` — Verify + handle incoming Stripe webhook events.
- [ ] **API Routes**
  - [ ] `POST /api/bookings/create` — Validate input, check availability, create booking, return payment intent.
  - [ ] `GET /api/bookings/list` — Authenticate, fetch bookings (filtered).
  - [ ] `GET /api/availability/check` — Parse query params, query availability.
  - [ ] `POST /api/availability/update` — Authenticate admin, upsert availability.
  - [ ] `POST /api/calendar/sync` — Authenticate admin, trigger iCal sync.
  - [ ] `POST /api/payments/intent` — Create Stripe PaymentIntent, return client secret.
  - [ ] `POST /api/payments/webhook` — Verify signature, handle payment events, update booking.
  - [ ] `GET|POST|PUT|DELETE /api/admin/rooms` — Full CRUD for rooms (admin).
  - [ ] `GET|PUT /api/admin/bookings` — List + update bookings (admin).
- [ ] **Database Schema** — Create Supabase migrations for `rooms`, `bookings`, `availability`, `users`, `payments`, `calendar_feeds`.
- [ ] **Supabase RLS Policies** — Apply row-level security policies.
- [ ] **Supabase Types** — Generate TypeScript types from database schema.

---

## SEO TODO

- [ ] **Metadata Files** — Finalize all `metadata.ts` files with real titles, descriptions, OG images.
- [ ] **`lib/seo.ts`**
  - [ ] `generateMetadata()` — Build title template, canonical, robots, alternates.
  - [ ] `generateOpenGraph()` — OG + Twitter Card tags.
  - [ ] `generateJsonLd()` — Structured data (LodgingBusiness, Product, FAQPage, BreadcrumbList).
  - [ ] `canonicalUrl()` — Build canonical URL from path.
  - [ ] `roomSeoDescription()` — LLM-friendly meta description per room.
- [ ] **Sitemap** (`app/sitemap.ts`) — Add dynamic room entries from Supabase.
- [ ] **Robots.txt** (`app/robots.ts`) — Finalize disallow rules.
- [ ] **Alt-text** — Ensure all room images have descriptive alt-text.
- [ ] **Semantic HTML** — Use `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>` throughout.
- [ ] **JSON-LD** — Inject structured data on room detail + home pages.

---

## Privacy TODO

- [ ] **Privacy Policy** (`app/privacy/page.tsx`) — Write full GDPR-compliant policy (Greek/English).
- [ ] **Cookie Consent** (`components/CookieConsentBanner.tsx`) — Implement full consent flow.
- [ ] **Data Retention** — Define + document data retention/deletion windows.
- [ ] **User Rights** — Implement access, rectification, erasure, portability request handling.

---

## Security TODO

- [ ] **`lib/security.ts`**
  - [ ] `validateInput()` — Schema validation (zod/yup).
  - [ ] `sanitizeInput()` — XSS prevention.
  - [ ] `applyRateLimiting()` — Rate limiting for sensitive routes.
  - [ ] `verifyStripeSignature()` — Webhook signature verification.
  - [ ] `applyRLSPolicies()` — Supabase RLS policy definitions.
  - [ ] `gdprCookieConsent()` — Consent state management.
  - [ ] `dataRetentionPolicy()` — Data retention enforcement.
  - [ ] `securityHeaders()` — CSP, HSTS, X-Frame-Options, etc.
- [ ] **Security Headers** — Configure in `next.config.mjs`.
- [ ] **Admin Auth Guard** — Protect all `/admin` routes.
- [ ] **API Auth** — Authenticate all admin API endpoints.

---

## LLM Optimization TODO

- [ ] **`lib/llmOptimization.ts`**
  - [ ] `generateLLMSummary()` — Concise, factual site summary.
  - [ ] `generateLLMRoomDescription()` — Structured, factual room description.
  - [ ] `generateLLMLocationContext()` — Neighborhood, transit, landmarks.
  - [ ] `generateLLMBookingExplanation()` — Dates, totals, policies summary.
  - [ ] `generateFaqSchema()` — FAQPage JSON-LD.
- [ ] **Structured Data** — JSON-LD on all key pages.
- [ ] **FAQ Schema** — Add common guest questions + answers.
- [ ] **LLM-Friendly Content** — Ensure all descriptions are factual, structured, and machine-readable.

---

## Performance TODO

- [ ] **`lib/performance.ts`**
  - [ ] `applyCaching()` — ISR, fetch cache, cache tags.
  - [ ] `optimizeImages()` — next/image, AVIF/WebP, blur placeholders.
  - [ ] `prefetchRoutes()` — Prefetch likely next pages.
  - [ ] `preloadAssets()` — Preload fonts + hero images.
  - [ ] `lazyLoadingConfig()` — dynamic() for heavy components.
  - [ ] `cdnHints()` — dns-prefetch, preconnect for Supabase/Stripe.
  - [ ] `compressionConfig()` — gzip/brotli, code-splitting.
- [ ] **Image Optimization** — Configure remote patterns in `next.config.mjs`.
- [ ] **CDN** — Set up CDN for Supabase Storage assets.

---

## Admin TODO

- [ ] **Auth** — Implement admin login + session management.
- [ ] **Dashboard** — Stats (rooms, bookings, revenue), recent bookings.
- [ ] **Room CRUD** — Create, edit, delete rooms with image upload.
- [ ] **Booking Management** — View, confirm, cancel bookings.
- [ ] **Calendar** — Visual availability management, manual overrides.

---

## Calendar Sync TODO

- [ ] **iCal Integration** — Fetch + parse external iCal feeds.
- [ ] **Sync Logic** — Upsert availability records from iCal events.
- [ ] **Manual Overrides** — Allow admin to block/unblock dates.
- [ ] **Sync Trigger** — Manual + scheduled (cron) sync.

---

## Payments TODO

- [ ] **Stripe Integration** — Create PaymentIntent on booking.
- [ ] **Webhook Handling** — Process payment events, update booking status.
- [ ] **Refunds** — Handle cancellation + refund flow.
- [ ] **Receipts** — Store + display Stripe receipt URLs.

---

## Deployment TODO

- [ ] **Vercel** — Connect repo, configure env vars, deploy.
- [ ] **Domain** — Point fragoulishome.gr to Vercel.
- [ ] **SSL** — Ensure HTTPS via Vercel auto-provisioning.
- [ ] **Monitoring** — Set up Vercel Analytics / Sentry.

---

## Future / Nice-to-Have

- [ ] Multi-language support (Greek + English).
- [ ] Email notifications (booking confirmation, reminders).
- [ ] Guest reviews / ratings.
- [ ] Multi-currency support.
- [ ] PWA / offline support.
- [ ] Automated iCal sync via cron job (Vercel Cron).