# fragoulishome.gr

Full-stack skeleton for a rooms-to-let website.

## Stack

- **Framework:** Next.js (App Router)
- **Deployment:** Vercel
- **Backend:** Supabase (Postgres, Auth, Storage)
- **Payments:** Stripe (test mode)
- **Calendar Sync:** iCal placeholders
- **Admin:** Dashboard placeholders

## Getting Started

```bash
# Install dependencies
npm install

# Copy environment variables
cp .env.example .env.local

# Run the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Project Structure

```
app/
  page.tsx                  # Home
  layout.tsx                # Root layout
  globals.css               # Global styles
  sitemap.ts                # SEO sitemap
  robots.ts                 # SEO robots.txt
  rooms/                    # Rooms listing + detail
  booking/                  # Booking flow
  contact/                  # Contact page
  privacy/                  # Privacy policy
  terms/                    # Terms of service
  admin/                    # Admin dashboard
  api/                      # API route handlers
components/                 # Placeholder UI components
lib/                        # Client + utility scaffolding
types/                      # Database schema interfaces
```

## Environment Variables

See `.env.example` for the full list of required variables.

## Note

This is a **skeleton only** — no real logic implemented yet. See `TODO.md` for the full implementation roadmap.