# Fragoulis Home — CSS & Layout Redesign

Redesign the existing Fragoulis Home website at `fragoulishome.vercel.app`.

**Do not rebuild the site or change its functionality.** Keep the existing content, routes, booking flow, components, and images unless a layout change requires otherwise.

The goal is to make the site feel like a **premium Mediterranean boutique retreat / editorial travel website**, rather than a typical vacation-rental listing.

Focus almost entirely on **CSS, spacing, typography, proportions, image presentation, and section layout**.

## Design direction

Use:

- warm off-white / limestone background
- charcoal text
- muted olive/green accent
- serif display typography + clean sans-serif UI typography
- minimal borders
- almost no shadows
- restrained border-radius
- generous whitespace
- large photography
- asymmetrical/editorial compositions

Avoid:

- card-heavy layouts
- excessive rounded corners
- gradients
- saturated blue
- excessive icons
- large button groups
- generic Airbnb/Booking.com styling
- unnecessary animations

---

## 1. Header

Make the header minimal and premium.

- Reduce visual weight.
- Use small, widely spaced navigation typography.
- Give the logo/brand more typographic presence.
- If overlaying the hero, use a transparent header.
- Avoid boxed/pill navigation.
- Keep mobile navigation extremely clean.

---

## 2. Hero — major priority

Make the hero dramatically more visual.

- Use the strongest existing property/landscape image.
- Desktop height: approximately `85–95vh`.
- Image should dominate the viewport.
- Use `object-fit: cover`.
- Adjust `object-position` per image rather than automatically centering.
- Keep overlay darkening very subtle.
- Place text directly over/within the image rather than in a separate card.
- Use a large editorial serif heading.
- Limit hero text width to roughly `600–750px`.
- Keep only one primary CTA.
- Do not clutter the hero.

Target composition:

```text
    NAV
     
                large photograph
     
            FRAGOULIS HOME
       short editorial proposition
                  CTA
```

---

## 3. Global container

Use a consistent maximum content width:

```css
max-width: 1400px;
margin-inline: auto;
padding-inline: clamp(20px, 4vw, 64px);
```

---

## 4. Typography

Create a stronger editorial hierarchy.

Display headings:

```css
font-size: clamp(2.8rem, 5vw, 6rem);
line-height: .95;
font-weight: 400;
letter-spacing: -.03em;
```

Section headings:

```css
font-size: clamp(2.2rem, 4vw, 4.5rem);
line-height: 1;
font-weight: 400;
```

Small labels:

```css
font-size: .7rem;
letter-spacing: .15em;
text-transform: uppercase;
```

Use serif for major headings and sans-serif for navigation, metadata and controls.

Do not make every text element large.

## 5. Section spacing

Increase vertical breathing room substantially.

Use fluid spacing such as:

```css
padding-block: clamp(80px, 10vw, 160px);
```

Do not make every section identical.

Create visual rhythm:

large image → quiet text → property layout → large image → location → story → CTA

Avoid repetitive:

heading → paragraph → cards → heading → paragraph → cards

layouts.

## 6. Intro / location statement

After the hero, create a quiet editorial section.

- Narrow text column.
- Large serif heading.
- Short paragraph.
- Lots of empty space.
- No card/background container.

It should feel like an editorial introduction, not an information panel.

## 7. Photography

This is the second major priority after the hero.

Stop treating all images as equal-sized listing thumbnails.

Use:

- large images
- full-width images
- asymmetric image sizes
- varied aspect ratios
- generous whitespace
- carefully chosen object-position

At least one section should use a near full-width cinematic image.

Avoid putting every image inside a rounded card.

## 8. Maisonette / property section

Replace the generic card-grid feeling with an editorial grid.

Use CSS Grid, preferably an asymmetric layout such as:

```css
grid-template-columns: 1.15fr .85fr;
```

or another visually balanced ratio.

Make the property photography dominant.

Under each image:

```text
PROPERTY NAME
room.sizeSqm room.capacity
short description
Explore →
```

Use typography and whitespace instead of card borders/shadows.

Do not force all property cards to identical heights.

## 9. Location section

Make Petras / Sitia / eastern Crete visually important.

Use a large landscape photograph with the location copy alongside or underneath.

The map should be secondary.

Desktop:

```text
┌───────────────────────────────┐
│                               │
│        LARGE LANDSCAPE        │
│                               │
└───────────────────────────────┘

PETRAS · EASTERN CRETE

Large heading + short text                MAP
```

On mobile, stack:

image → heading → text → map

The emotional/location content should appear before the map.

## 10. Family / story section

Use an editorial two-column composition.

One large portrait/property image + one text column.

Do not put it inside a conventional card.

Give the image substantial visual weight.

Use generous whitespace around the text.

## 11. CTA

Keep the final CTA simple and elegant.

Large serif heading + one primary action.

No giant colored banner.

No multiple competing buttons.

Example structure:

```text
STAY BY THE SEA

Discover Fragoulis Home in Petras, Sitia.

CHECK AVAILABILITY →
```

## 12. Footer

Keep it sparse.

Use:

- brand
- location
- essential links
- contact/booking
- social links if already present

Avoid a large corporate multi-column footer.

## 13. Mobile

Do not simply stack the desktop layout.

Specifically redesign mobile:

- hero height around 70–85vh
- fluid typography
- 20–24px horizontal padding
- property images full width
- single-column editorial layouts
- reduce section spacing where necessary
- preserve strong image/text hierarchy
- no horizontal overflow

Use clamp() wherever appropriate.

## 14. Motion

Keep animation extremely subtle.

Allowed:

- opacity fade
- small image scale on hover
- understated link underline
- subtle section reveal

Avoid:

- parallax everywhere
- bouncing
- large transforms
- excessive scroll animations

Respect prefers-reduced-motion.

## 15. Final implementation rule

Do not add more UI to make the website feel premium.

Instead improve:

- image scale
- image cropping
- typography
- whitespace
- grid proportions
- alignment
- section rhythm
- visual hierarchy

The final result should feel:

quiet, Mediterranean, editorial, natural, premium, spacious and authentic.

The key principle:

Less "vacation-rental website"; more "beautifully art-directed Mediterranean retreat".

After implementation, test desktop and mobile and ensure no existing functionality has been broken.
