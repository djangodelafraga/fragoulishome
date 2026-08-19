# fragoulishome.gr — Implementation Roadmap

> This file maps every placeholder function, component, and scaffolding item to its implementation task.
> Check off items as they are completed during incremental development.
>
> **Legend:**
> - `[x]` — Completed / implemented with real logic
> - `[/]` — Partially implemented (scaffolded but incomplete)
> - `[ ]` — Not yet started / empty placeholder

---

## Frontend TODO

### Implemented
- [x] **Root Layout** (`app/layout.tsx`) — Site header/nav, semantic HTML structure, footer, skip-to-content link, cookie consent banner integration.
- [x] **Global Styles** (`app/globals.css`) — Design tokens (colors, spacing, typography), reset, utilities, responsive container.
- [x] **Home Page** (`app/page.tsx`) — Hero section, sense of place, featured rooms grid, location highlights, host/direct-booking CTA.
- [x] **RoomCard** (`components/RoomCard.tsx`) — Renders room cover image, title, price, capacity, link to detail page using next/image.

### Partially Implemented
- [ ] **BookingForm** (`components/BookingForm.tsx`) — `"use client"` scaffold with handler stub. No date picker, guest count, contact fields, price summary, or submit logic.
- [ ] **AvailabilityCalendar** (`components/AvailabilityCalendar.tsx`) — Month grid with available/booked/blocked states, date range selection. Entirely placeholder.
- [ ] **AdminSidebar** (`components/AdminSidebar.tsx`) — Active route highlighting, logout button. Entirely placeholder.
- [ ] **ImageUploader** (`components/ImageUploader.tsx`) — Drag-and-drop, preview thumbnails, alt-text input per image. Entirely placeholder.
- [ ] **AvailabilityBar** (`components/AvailabilityBar.tsx`) — Quick availability check bar on home page. Has file scaffold.
- [ ] **RoomPreview** (`components/RoomPreview.tsx`) — Room preview card for home page. Has file scaffold.
- [ ] **SectionHeading** (`components/SectionHeading.tsx`) — Reusable section heading component. Has file scaffold.
- [ ] **SeoHead** (`components/SeoHead.tsx`) — Client-side meta tag injection (if needed beyond App Router metadata). Entirely placeholder.
- [ ] **CookieConsentBanner** (`components/CookieConsentBanner.tsx`) — GDPR consent UI, localStorage persistence, accept/reject/customize. Scaffolded and integrated in layout.

### Not Started (Pages)
- [ ] **Rooms Listing** (`app/rooms/page.tsx`) — Filterable/sortable room grid, search controls.
- [ ] **Room Detail** (`app/rooms/[slug]/page.tsx`) — Image gallery, amenities, location summary, booking CTA.
- [ ] **Booking Page** (`app/booking/page.tsx`) — Full booking flow (dates → details → payment).
- [ ] **Contact Page** (`app/contact/page.tsx`) — Contact form, address/phone/email, map embed.
- [ ] **Privacy Page** (`app/privacy/page.tsx`) — GDPR-compliant privacy policy text.
- [ ] **Terms Page** (`app/terms/page.tsx`) — Terms & conditions text.
- [ ] **Admin Dashboard** (`app/admin/page.tsx`) — Stats cards, recent bookings, quick actions.
- [ ] **Admin Rooms** (`app/admin/rooms/page.tsx`) — CRUD UI for rooms, image upload integration.
- [ ] **Admin Bookings** (`app/admin/bookings/page.tsx`) — Bookings table, status management.
- [ ] **Admin Calendar** (`app/admin/calendar/page.tsx`) — Availability calendar, manual overrides, iCal sync trigger.

### Metadata files (route-level SEO metadata — partially scaffolded)
- [x] `app/admin/metadata.ts` — Metadata for admin pages.
- [x] `app/booking/metadata.ts` — Metadata for booking page.
- [x] `app/contact/metadata.ts` — Metadata for contact page.
- [x] `app/privacy/metadata.ts` — Metadata for privacy page.
- [x] `app/rooms/metadata.ts` — Metadata for rooms listing.
- [x] `app/terms/metadata.ts` — Metadata for terms page.

---

## Backend TODO

### Implemented
- [x] **Supabase Client** (`lib/supabaseClient.ts`)
  - [x] `getRooms()` — Fetch active rooms from `rooms` table.
  - [x] `getRoomById()` — Fetch single room with images + address.
  - [x] `getRoomBySlug()` — Fetch single room by slug.
  - [x] Row mapping: `snake_case` DB rows → `camelCase` models.
  - [x] `createBooking()` — Insert booking record with snake_case mapping.
  - [x] `getBookingById()` — Fetch single booking by ID.
  - [x] `updateBookingStatus()` — Update booking status/payment status.
  - [x] `checkAvailability()` — Query availability between dates.
  - [x] `setAvailabilityBlock()` — Upsert blocked dates.
  - [x] `syncCalendar()` — Fetch iCal feed, parse events, upsert availability.
  - [x] `uploadRoomImages()` — Upload to Supabase Storage, return public URLs.
  - [x] `getUser()` — Get current authenticated user from Auth + profiles table.
  - [x] `login()` — Sign in with email/password via Supabase Auth.
  - [x] `logout()` — Sign out.
  - [x] `getAdminUser()` — Service-role admin verification.
  - [x] `createPaymentRecord()` — Record Stripe PaymentIntent in payments table.
  - [x] `updatePaymentStatus()` — Update payment record by Stripe intent ID.
  - [x] `getCalendarFeeds()` — List iCal feeds for a room.

- [x] **Stripe Client** (`lib/stripe.ts`)
  - [x] Stripe client init with guarded key check.
  - [x] `createPaymentIntent()` — Create Stripe PaymentIntent for a booking.
  - [x] `handleWebhook()` — Verify + handle incoming Stripe webhook events.

### Implemented API Routes
- [x] **`POST /api/bookings/create`** — Validates input, checks availability, creates booking, creates Stripe PaymentIntent, returns `{ data: { booking, clientSecret } }`.
- [x] **`GET /api/availability/check`** — Parses `roomId`/`slug` + dates, validates, queries availability, returns `{ data: { dates, isAvailable, unavailableDates, totalNights } }`.
- [x] **`POST /api/payments/intent`** — Validates `bookingId`, fetches booking, checks duplicate payment, creates Stripe PaymentIntent + payment record, returns client secret.

### Not Started
- [ ] **`GET /api/bookings/list`** — Authenticate, fetch bookings (filtered).
- [ ] **`POST /api/availability/update`** — Authenticate admin, upsert availability.
- [ ] **`POST /api/calendar/sync`** — Authenticate admin, trigger iCal sync.
- [ ] **`POST /api/payments/webhook`** — Verify signature, handle payment events, update booking.
- [ ] **`GET|POST|PUT|DELETE /api/admin/rooms`** — Full CRUD for rooms (admin).
- [ ] **`GET|PUT /api/admin/bookings`** — List + update bookings (admin).

### Database Schema
- [x] **Supabase Tables** — All tables already created: `rooms` (2 rows), `bookings`, `availability`, `payments`, `profiles`, `calendar_feeds`.
- [x] **Supabase RLS Policies** — All tables have RLS enabled. Policies added for anon SELECT + authenticated per-user access, plus admin service-role access. Additional anon INSERT/UPDATE policies added for API-route-driven writes.
- [x] **Supabase Types** — Generated TypeScript types in `types/database.ts` with Row interfaces + camelCase model mapping.

---

## SEO TODO

### Partially Implemented
- [x] **Metadata Files** — Route-level metadata files created for admin, booking, contact, privacy, rooms, terms (stubs).
- [x] **Sitemap** (`app/sitemap.ts`) — File exists, needs dynamic room entries from Supabase.
- [x] **Robots.txt** (`app/robots.ts`) — File exists, needs final disallow rules.

### Not Started
- [ ] **`lib/seo.ts`** — **All functions empty placeholders:**
  - [ ] `generateMetadata()` — Build title template, canonical, robots, alternates.
  - [ ] `generateOpenGraph()` — OG + Twitter Card tags.
  - [ ] `generateJsonLd()` — Structured data (LodgingBusiness, Product, FAQPage, BreadcrumbList).
  - [ ] `canonicalUrl()` — Build canonical URL from path.
  - [ ] `roomSeoDescription()` — LLM-friendly meta description per room.
- [ ] **Alt-text** — Ensure all room images have descriptive alt-text.
- [ ] **Semantic HTML** — Use `<article>`, `<section>`, `<nav>`, `<header>`, `<footer>` throughout. (Partially done in layout.)
- [ ] **JSON-LD** — Inject structured data on room detail + home pages.

---

## Privacy TODO

### Not Started
- [ ] **Privacy Policy** (`app/privacy/page.tsx`) — Write full GDPR-compliant policy (Greek/English).
- [ ] **Cookie Consent** (`components/CookieConsentBanner.tsx`) — Implement full consent flow. (Scaffolded, not functional.)
- [ ] **Data Retention** — Define + document data retention/deletion windows.
- [ ] **User Rights** — Implement access, rectification, erasure, portability request handling.

---

## Security TODO

### Placeholder Only (all functions in `lib/security.ts`)
- [ ] **`lib/security.ts`** — **All functions empty placeholders:**
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

### Placeholder Only (all functions in `lib/llmOptimization.ts`)
- [ ] **`lib/llmOptimization.ts`** — **All functions empty placeholders:**
  - [ ] `genrateLLMSummary()` — Concise, factual site summary.
  - [ ] `genrateLLMRoomDescription()` — Structured, factual room description.
  - [ ] `genrateLLMLocationContext()` — Neighborhood, transit, landmarks.
  - [ ] `genrateLLMBokingExplanation()` — Dates, totals, policies summary.
  - [ ] `genrateFaqSchema()` — FAQPage JSON-LD.
- [ ] **Structured Data** — JSON-LD on all key pages.
- [ ] **FAQ Schema** — Add common guest questions + answers.
- [ ] **LLM-Friendly Content** — Ensure all descriptions are factual, structured, and machine-readable.

---

## Performance TODO

### Placeholder Only (all functions in `lib/performance.ts`)
- [ ] **`lib/performance.ts`** — **All functions empty placeholders:**
  - [ ] `applyCaching()` — ISR, fetch cache, cache tags.
  - [ ] `optmizeImages()` — next/image, AVIF/WebP, blur placeholders.
  - [ ] `prefethRoutes()` — Prefetch likely next pages.
  - [ ] `preladAssets()` — Preload fonts + hero images.
  - [ ] `lazyLoadingConfig()` — dynamic() for heavy components.
  - [ ] `cdnHints()` — dns-prefech, preconnect for Supabase/Stripe.
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

- [ ] **iCal Integration** — Fetch + parse external iCal feeds. (Sync logic implemented in `lib/supabaseClient.ts`.)
- [] **Manual Overrides** — Allow admin to block/unlock dates.
- [ ] **Sync Trigger** — Manual + scheduled (cron) sync. (API route scaffold exists.)

---

## Payments TODO

- [ ] **Stripe Integration** — Create PaymentIntent on booking. (Integration complete in `lib/strpe.ts` + routes.)
- [ ] **Webhook Handling** — Process payment events, update booking status. (Scaffolded `handleWebhok`, route scaffold exists.)
- [ ] **Refunds** — Handle cancellation + refund flow.
- [ ] **Receipts** — Store + display Stripe receipt URLs.

---

## Deployment TODO

- [x] **Vercel** — Project connected, en vars set, ready to deploy.
- [x] **GitHub** — Repo at `github.com/djangodelafrag/fragoulishome.git`
- [ ] **Domain** — Point fragoulishome.gr to Vercel.
- [ ] **SSL** — Ensure HTTPS via Vercel auto-provisioning.
- [ ] **Monitoring** — Set up Vercel Analytics / Sentry.

---

## Workflow: Push & Deploy

**After completing a section of work:**

```bas
git add .
git commit -m "feat: <description of the section>"
git push origin main
# Vercel auto-deploys from main branch via GitHub integration
# No manual vercel CLI needed — the GitHub integration handles it
```

➡ **Always run `pnpm build` before committing** to catch TypeScript and compilation errors.

---

## Future / Nice-to-Have

- [ ] Multi-language support (Greek + English).
- [ ] Email notifications (booking confirmation, reminders).
- [ ] Guest reviews / ratings.
- [ ] Multi-currency support.-[ ] PWA / offline support.
- [ ] Automated iCal sync via cron job (Vercel Cron).

---

## Project Documentation

- [x] **READE.md** — Project overview, stack, structure, getting started.
- [x] **AGENTS.md** — Persistent development guidelines for AI coding agents.
- [x] **TODO.md** — (This file) Implementation roadmap with status tracking.