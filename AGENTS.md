# AGENTS.md — Fragoulishome Development Guidelines

> This file defines persistent rules, architecture conventions, and interface guidelines
> for AI coding agents working on the fragoulishome.gr project.
>
> **Purpose:** Prevent drift between prompts by keeping stable context always available.
> (Recommended by Vercel for AI-assisted development.)

---

## 1. Project Identity

**What is this?** A full-stack Next.js rooms-to-let website in Sitia, Crete.
Two peaceful maisonettes surrounded by olive and pine trees, less than 100m from the sea.

| Property | Value |
|---|---|
| **Framework** | Next.js 15 (App Router) |
| **Language** | TypeScript (strict mode) |
| **Deployment** | Vercel (auto-deploy from `main` branch) |
| **Backend** | Supabase (Postgres, Auth, Storage) |
| **Payments** | Stripe (test mode) |
| **Styling** | CSS custom properties (no Tailwind) |
| **Package manager** | pnpm (preferred) |

---

## 2. Architecture Rules (NON-NEGOTIABLE)

### 2.1 File & Module Conventions

```
src/                    → NO src/ directory. All code lives at project root.
app/                    → Next.js App Router pages, layouts, API routes
components/             → Shared UI components (flat, no subdirs)
lib/                    → Clients, utilities, helpers (flat, no subdirs)
types/                  → TypeScript interfaces only (database.ts)
```

- **NO `src/` directory.** All source files are at the project root inside `app/`, `components/`, `lib/`, `types/`.
- **Flat structure inside each directory** — no deep nesting of subdirectories.
- **One default export per component file.**
- **Component file names:** PascalCase (`RoomCard.tsx`, `BookingForm.tsx`).
- **Utility/lib file names:** camelCase (`supabaseClient.ts`, `seo.ts`).

### 2.2 Naming Conventions

| Category | Convention | Example |
|---|---|---|
| React components | PascalCase, `.tsx` | `RoomCard.tsx` |
| Page routes | kebab-case directories | `app/rooms/[id]/page.tsx` |
| API routes | kebab-case, `route.ts` | `app/api/bookings/create/route.ts` |
| Utility files | camelCase | `llmOptimization.ts` |
| Types/interfaces | PascalCase | `Room`, `Booking` |
| Type aliases | PascalCase | `BookingStatus`, `UserRole` |
| Database columns | snake_case | `price_per_night`, `cover_image_url` |
| JS/TS variables | camelCase | `pricePerNight`, `coverImageUrl` |

### 2.3 Import Aliases

Use `@/` as the path alias for all internal imports:

```typescript
// Correct
import { Room } from "@/types/database";
import { getRooms } from "@/lib/supabaseClient";
import RoomCard from "@/components/RoomCard";

// Wrong
import { Room } from "../../types/database";
```

### 2.4 TypeScript Rules

- **Strict mode is enabled** in `tsconfig.json`. Do not disable it.
- **All functions must have explicit return types** — no relying on inference for public APIs.
- **`any` is forbidden.** Use `unknown` and narrow with type guards.
- **Prefer `interface` over `type`** for object shapes. Use `type` for unions/aliases.
- **Database row types** use `snake_case` fields matching Supabase column names.
- **Application model types** use `camelCase` fields — mapping happens in data access layer.

### 2.5 Styling Rules

- **No Tailwind CSS.** All styling uses CSS custom properties defined in `globals.css`.
- **No CSS-in-JS or CSS modules** — use inline `style={{}}` objects or the `className` prop for semantic hooks.
- **Use `var(--color-*)` and `var(--space-*)`** custom properties for consistency.
- **Responsive design** via `className` media query hooks or inline style media queries.

---

## 3. Component Interface Guidelines

### 3.1 Server Components (default)

All components are **React Server Components by default** in the App Router.
Only add `"use client"` when you need:
- Browser APIs (`useState`, `useEffect`, event handlers)
- Client-side interactivity (date pickers, forms, maps)
- Context providers

### 3.2 Component Structure (standardised)

```typescript
// ============================================
// fragoulishome.gr — ComponentName
// One-line description of what it does.
// ============================================

import type { ReactNode } from "react";

// Props interface — named export
interface ComponentNameProps {
  /** Required prop description */
  requiredProp: string;
  /** Optional prop description */
  optionalProp?: number;
  children?: ReactNode;
}

// Default export — the component
export default function ComponentName({
  requiredProp,
  optionalProp,
  children,
}: ComponentNameProps) {
  return (
    // --- JSX ---
  );
}
```

### 3.3 Props Conventions

- **Props interfaces are named exports** (`export interface XProps`), not inlined.
- **Boolean props** use `is`/`has` prefix: `isActive`, `hasImages`, `isLoading`.
- **Callback props** use `on` prefix: `onSubmit`, `onSelect`, `onDelete`.
- **Children** are always typed as `ReactNode`.
- **`className` prop** is never accepted — use `style` objects if needed.

### 3.4 Client Component Boundary

When a file needs `"use client"`, keep it at the **leaf level** (as deep as possible).
Do not add `"use client"` to page layouts or route files unless absolutely necessary.

### 3.5 Accessibility

Every interactive element must have:
- **Aria labels** where visual labels are absent (`aria-label`)
- **Keyboard support** (Enter/Space for buttons, Tab for navigation)
- **Focus management** for modals, overlays, and dynamic content
- **Skip-to-content link** (already in root layout)

---

## 4. Data Access Patterns

### 4.1 Supabase Client

- **Client is lazy-initialised per request** via `getSupabase()`.
- **All data access functions return typed models** (camelCase), not raw rows.
- **Mapping** from `snake_case` DB rows to `camelCase` models happens in the data access layer (`lib/supabaseClient.ts`).
- **Error handling:** Log errors with `console.error`, return `null` or `[]` on failure — never throw for expected failures.
- **Inserts/Updates** use `as Record<string, unknown>` casts to avoid typed client inference issues, while reads cast to explicit row types.

### 4.2 Data Fetching Strategy

| Pattern | When to use |
|---|---|
| **Server-side fetch** (async RSC) | Primary: page-level data, SEO-critical content |
| **ISR (revalidate)** | Room detail pages, listing pages (revalidate: 60–300s) |
| **Client-side fetch** | Admin dashboard, booking flow (after page load) |
| **SWR / React Query** | Not yet added — stick to built-in fetch |

### 4.3 API Routes

- **Route Handlers** (`route.ts`) in `app/api/` for all server-side logic.
- **Authentication** in API routes via Supabase session cookie (admin endpoints).
- **Validation** at the API boundary — manual validation (zod to be added).
- **Response format:** `{ data?: T, error?: string }` with appropriate HTTP status codes.

---

## 5. SEO & LLM Optimisation

### 5.1 Metadata

- **Page-level metadata** via exported `metadata` object in `page.tsx` (App Router convention).
- **Dynamic metadata** via `generateMetadata()` function for room detail pages.
- **Open Graph + Twitter Card** tags for social sharing on all public pages.

### 5.2 Structured Data (JSON-LD)

- **LodgingBusiness** schema on the home page.
- **Product** schema on room detail pages (price, availability, description).
- **FAQPage** schema on the booking/FAQ section.
- **BreadcrumbList** on all interior pages.

### 5.3 LLM-Friendly Content

The `lib/llmOptimization.ts` module generates factual, structured, machine-readable content:
- `generateLLMSummary()` — concise site summary for AI crawlers.
- `generateLLMRoomDescription()` — structured room descriptions (no fluff).
- `generateLLMLocationContext()` — factual neighbourhood, transit, landmarks.
- `generateLLMBookingExplanation()` — dates, totals, policies summary.

All LLM-generated content must be **factual, structured, and free of marketing fluff.**

---

## 6. Database Schema Reference

### Tables (created in Supabase, all with RLS enabled)

| Table | Key Columns | RLS | Purpose |
|---|---|---|---|
| `rooms` | `id, slug, title, price_per_night, capacity, amenities, images, address, is_active` | ✅ anon SELECT, authenticated SELECT | Room definitions (2 rows seeded) |
| `bookings` | `id, room_id, guest_id, guest_email, check_in, check_out, status, total_price` | ✅ anon INSERT, authenticated per-user CRUD | Guest reservations |
| `availability` | `id, room_id, date, is_available, reason, price_override` | ✅ anon INSERT+UPDATE, authenticated SELECT | Per-date availability |
| `payments` | `id, booking_id, stripe_payment_intent_id, amount, status, receipt_url` | ✅ anon INSERT+UPDATE, authenticated SELECT | Payment records |
| `profiles` | `id, email, full_name, phone, role` | ✅ authenticated per-user CRUD + anon INSERT | User profiles |
| `calendar_feeds` | `id, room_id, url, last_synced_at, external_id` | ✅ anon INSERT+UPDATE, authenticated SELECT for guest-booked rooms | External iCal feed metadata |

### RLS Policy Summary

- **`anon` role**: SELECT on `rooms` + `availability`. INSERT/UPDATE on `bookings`, `payments`, `availability`, `calendar_feeds`, `profiles` (for API-route-driven server-side writes).
- **`authenticated` role**: Per-row access to own bookings, payments, profiles. SELECT on rooms + availability.
- **`supabase_admin`/`supabase_auth_admin`**: Full access to all tables.

### TypeScript Types

Located in `types/database.ts` — contains:
- `RoomRow`, `BookingRow`, `AvailabilityRow`, `PaymentRow`, `ProfileRow`, `CalendarFeedRow` — snake_case DB row interfaces
- `Room`, `Booking`, `Availability`, `PaymentRecord`, `User`, `CalendarFeed` — camelCase application models
- Mapper functions in `lib/supabaseClient.ts` convert rows → models

---

## 7. Environment Variables (required)

```bash
# Required at build time
NEXT_PUBLIC_SITE_URL=https://fragoulishome.gr

# Supabase
NEXT_PUBLIC_SUPABASE_URL=           # Project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=      # Anon/public key
SUPABASE_SERVICE_ROLE_KEY=          # Admin key (server-side only)

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY= # Publishable key (client)
STRIPE_SECRET_KEY=                  # Secret key (server)
STRIPE_WEBHOOK_SECRET=              # Webhook signing secret

# Calendar
ICAL_FEED_URL=                      # External iCal feed (optional)
```

---

## 8. Common Pitfalls to Avoid

| ❌ Don't | ✅ Do |
|---|---|
| Import from relative paths like `../../types/` | Use `@/` alias |
| Export multiple components from one file | One component, one file |
| Use `any` | Use `unknown` + type guards |
| Add `"use client"` to layout/page files | Add it only to leaf-level interactors |
| Mutate database types directly | Map rows → models in data access layer |
| Put business logic in components | Put logic in lib/ files, call from components |
| Skip error handling "for now" | Always handle errors with fallback UI |
| Use Tailwind classes or CSS modules | Use inline `style={{}}` + CSS custom properties |

---

## 9. Development & Deployment Workflow

### Local development

```bash
pnpm dev          # Start dev server (http://localhost:3000)
pnpm build        # Production build (run before every commit)
pnpm lint         # ESLint
pnpm start        # Start production server
```

### Commit & push (after completing a section of work)

```bash
# 1. Always build first to catch TypeScript errors
pnpm build

# 2. Stage all changes
git add .

# 3. Commit with conventional commit message
git commit -m "feat: <description of the section>"
# or: git commit -m "fix: ..."
# or: git commit -m "chore: ..."

# 4. Push to main
git push origin main

# 5. Vercel auto-deploys from main branch
#    No manual `vercel deploy` needed — the GitHub integration handles it
```

- **Commit messages:** Conventional commits (`feat:`, `fix:`, `chore:`, `docs:`).
- **Branch strategy:** `main` → production, feature branches for implementation.
- **Before every commit:** Run `pnpm build` to catch TypeScript errors.
- **Vercel auto-deploy:** The GitHub ↔ Vercel integration deploys `main` automatically.

---

## 10. Implementation Priority (from TODO.md)

1. ~~Database schema~~ (Supabase migrations + RLS policies) **→ Done**
2. ~~Supabase client~~ (data access functions — getRooms, createBooking, etc.) **→ Done**
3. ~~Stripe client + first API routes~~ (bookings/create, availability/check, payments/intent) **→ Done**
4. **Room pages** (listing + detail)
5. **Booking flow** (form → availability → payment)
6. **Admin dashboard** (auth + CRUD)
7. **SEO & structured data** (JSON-LD, metadata, sitemap)
8. **Calendar sync** (iCal integration)
9. **Performance & security** (caching, rate limiting, security headers)

---

*Last updated: August 2026*