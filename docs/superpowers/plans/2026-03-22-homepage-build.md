# VirtuoVideo Homepage Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build the crown jewel homepage (`/`) — showreel hero, 4 industry grid variants, portfolio highlights, differentiators, testimonials, CTA, coming soon pages, and route rename `/v2` → `/restaurants`.

**Architecture:** New homepage route at `/` with its own layout. Industry data in shared content file. 4 grid layout variants as separate components (Roy picks favourite). Coming soon pages via Next.js dynamic route `[industry]`. Reuse existing components (TrustBar, Footer, CinematicPlayer, AnimatedTestimonials, CinematicSection).

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion. Design bible at `design-bible/`.

**Spec:** `docs/superpowers/specs/2026-03-22-homepage-design.md`

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Create | `src/content/shared/industries.ts` | Industry card data (8 items with thumbnails, videos, taglines, routes) |
| Create | `src/app/(home)/page.tsx` | Homepage assembly — sections in order |
| Create | `src/app/(home)/layout.tsx` | Homepage layout with scroll-reveal nav |
| Create | `src/components/sections/home-hero.tsx` | Showreel hero with video background |
| Create | `src/components/sections/home-industries-grid.tsx` | Variant A: 4x2 symmetric grid |
| Create | `src/components/sections/home-industries-bento.tsx` | Variant B: bento asymmetric |
| Create | `src/components/sections/home-industries-carousel.tsx` | Variant C: horizontal scroll carousel |
| Create | `src/components/sections/home-industries-masonry.tsx` | Variant D: staggered masonry |
| Create | `src/components/sections/home-industries.tsx` | Wrapper that renders the active variant |
| Create | `src/components/sections/home-why-virtuo.tsx` | 4 differentiators section |
| Create | `src/components/sections/home-portfolio.tsx` | Portfolio highlights (reuses TiltCard + CinematicPlayer) |
| Create | `src/components/sections/home-testimonials.tsx` | Testimonials wrapper (reuses AnimatedTestimonials) |
| Create | `src/components/sections/home-cta.tsx` | Final CTA with form panel |
| Create | `src/app/[industry]/page.tsx` | Coming soon dynamic route |
| Create | `src/app/[industry]/layout.tsx` | Coming soon layout (reuses homepage layout) |
| Rename | `src/app/v2/` → `src/app/restaurants/` | Route rename |
| Modify | `src/app/v2/layout.tsx` nav links | Update any `/v2` references |
| Modify | `src/app/about/layout.tsx` nav links | Update `/v2` → `/restaurants` |

---

### Task 1: Industry Data Content File

**Files:**
- Create: `src/content/shared/industries.ts`

- [ ] **Step 1: Create industry data**

Create the shared data file with all 8 industries. Each entry has: slug, name, tagline, thumbnail, videoSrc, route, icon name.

```typescript
export interface IndustryItem {
    slug: string;
    name: string;
    tagline: string;
    thumbnail: string;
    videoSrc: string;
    route: string;
}
```

Industries:
1. Restaurants — nome.png, nome-fort-york.mp4
2. Nightlife — port-5.jpg, nome-don-mills.mp4
3. Corporate — port-7.jpg, try-lychee.mp4
4. Events — port-8.jpg, nome-fort-york.mp4
5. Hospitality — port-9.jpg, try-lychee.mp4
6. Real Estate — port-10.jpg, nome-don-mills.mp4
7. Automotive — port-3.jpg, nome-fort-york.mp4
8. Entertainment — port-4.jpg, try-lychee.mp4

- [ ] **Step 2: Format**
```bash
npx prettier --write src/content/shared/industries.ts
```

---

### Task 2: Route Rename `/v2` → `/restaurants`

**Files:**
- Rename: `src/app/v2/` → `src/app/restaurants/`
- Modify: `src/app/about/layout.tsx` (update any `/v2` references)

- [ ] **Step 1: Copy v2 folder to restaurants**
```bash
cp -r src/app/v2 src/app/restaurants
```

- [ ] **Step 2: Update nav links in restaurants layout**

In `src/app/restaurants/layout.tsx`, update the `<Link href='/v2'>` to `<Link href='/restaurants'>`.

- [ ] **Step 3: Update about layout nav**

In `src/app/about/layout.tsx`, change any `/v2` reference to `/restaurants`.

- [ ] **Step 4: Update the old `/` redirect**

The current `src/app/page.tsx` redirects to `/v2`. This file will be replaced by the homepage in Task 4, but for now update it to redirect to `/restaurants`.

- [ ] **Step 5: Keep `/v2` as redirect to `/restaurants`**

Create `src/app/v2/page.tsx` that redirects to `/restaurants` for any existing bookmarks/links:
```tsx
import { redirect } from 'next/navigation';
export default function V2Redirect() { redirect('/restaurants'); }
```

Keep the v2 layout as-is (it will serve the redirect).

- [ ] **Step 6: Format**
```bash
npx prettier --write src/app/restaurants/layout.tsx src/app/about/layout.tsx
```

---

### Task 3: Homepage Layout

**Files:**
- Create: `src/app/(home)/layout.tsx`

- [ ] **Step 1: Create homepage layout**

Use the route group `(home)` so the homepage gets its own layout without affecting other routes.

Pattern: Copy the scroll-reveal nav from `src/app/v2/layout.tsx` but update nav links:
- Industries → `#industries` (scroll)
- Portfolio → `#portfolio` (scroll)
- About → `/about`
- Contact → `#contact`
- Phone + "Get a Quote" button

Must include:
- RAF-throttled scroll listener (design bible)
- Persistent logo top-left when nav hidden
- Scroll-reveal nav on scroll-up after hero
- Mobile slide-from-right menu
- Spring config: `{ damping: 30, stiffness: 300 }` (no bounce)

- [ ] **Step 2: Format**
```bash
npx prettier --write "src/app/(home)/layout.tsx"
```

---

### Task 4: Showreel Hero

**Files:**
- Create: `src/components/sections/home-hero.tsx`

- [ ] **Step 1: Build hero component**

Full-viewport section with:
- `<video>` background: `/videos/hero/virtuo-showreel.mp4`, autoPlay, muted, loop, playsInline, `preload="auto"`
- Gradient overlays: `bg-gradient-to-r from-black/80 via-black/50 to-transparent` + `bg-gradient-to-t from-black via-black/30 to-transparent`
- Left-aligned content in bottom third:
  - Tag: `text-accent text-sm tracking-[0.2em] uppercase`
  - `<CharacterReveal as="h1">Every Story Deserves Cinema</CharacterReveal>`
  - Subtitle in `text-white/80`
  - Dual CTAs: ShimmerButton (call) + ghost button (scrolls to `#industries`)
  - Scarcity signal
- Scroll indicator: ChevronDown with infinite bounce, `useReducedMotion` gate

Follow exact design bible patterns from `design-bible/component-patterns.md`.

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-hero.tsx
```

---

### Task 5: Shared Industry Card Component

**Files:**
- Create: `src/components/ui/industry-card.tsx`

- [ ] **Step 1: Build the shared card**

All 4 layout variants share the same card component. Props: `industry: IndustryItem`, `className?: string`, `aspectRatio?: string`.

Features (design bible compliant):
- Video-on-hover: thumbnail crossfade to muted video (700ms, `preload="metadata"`)
- Gradient overlay: `from-black/80 via-black/20 to-transparent`
- Industry name: `font-display uppercase tracking-wide` (not CharacterReveal — these are card labels)
- Tagline: `text-white/80 text-sm`
- Hover: `border-white/[0.06]` → `border-white/15`, subtle lift via `whileHover={{ y: -8 }}`
- Click: `router.push(industry.route)` using Next.js `useRouter`
- Play icon overlay when not hovering (same pattern as v2 hero cards)
- `will-change: transform` for performance

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/ui/industry-card.tsx
```

---

### Task 6: Industry Selector — Variant A (4x2 Grid)

**Files:**
- Create: `src/components/sections/home-industries-grid.tsx`

- [ ] **Step 1: Build 4x2 grid layout**

```
grid grid-cols-2 md:grid-cols-4 gap-4
```

All 8 cards equal size, `aspect-[16/10]`. Clean and symmetric.
Section header: tag + CharacterReveal "Industries We Serve" + subtitle.
Mobile: 2 columns, 4 rows.

Uses `<IndustryCard>` from Task 5.

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-industries-grid.tsx
```

---

### Task 7: Industry Selector — Variant B (Bento Asymmetric)

**Files:**
- Create: `src/components/sections/home-industries-bento.tsx`

- [ ] **Step 1: Build bento layout**

CSS Grid with named areas:
- Restaurants: `col-span-2 row-span-2` (featured, large)
- 3 cards in right column: each `row-span-1`
- Bottom row: 4 equal cards

Desktop grid: `grid-cols-4 auto-rows-[12rem]`
Featured card gets BorderBeam accent (reuse pattern from v2 services).

Uses `<IndustryCard>` with varying `aspectRatio` and `className` per position.

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-industries-bento.tsx
```

---

### Task 8: Industry Selector — Variant C (Horizontal Scroll)

**Files:**
- Create: `src/components/sections/home-industries-carousel.tsx`

- [ ] **Step 1: Build carousel layout**

Reuse the drag-to-scroll pattern from `v2-portfolio-c.tsx`:
- Symmetric left/right padding: `pl-[calc(50vw-280px)] pr-[calc(50vw-280px)]`
- `snap-x snap-mandatory`, cards are `snap-center`
- Each card: `w-[560px]` (nearly half viewport), `aspect-[16/10]`
- Drag sensitivity: 0.6x (design bible)
- No momentum coast — let browser snap handle it
- Navigation arrows + counter at bottom
- Edge fade gradients
- Scroll-driven active detection (RAF-throttled)
- Active card: opacity 1, scale 1. Others: opacity 0.75, scale 0.92

Uses `<IndustryCard>` inside each snap item.

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-industries-carousel.tsx
```

---

### Task 9: Industry Selector — Variant D (Staggered Masonry)

**Files:**
- Create: `src/components/sections/home-industries-masonry.tsx`

- [ ] **Step 1: Build masonry layout**

3-column CSS grid with varying aspect ratios:
- Column 1 (3 cards): aspect-[16/10], aspect-[1/1], aspect-[4/3]
- Column 2 (3 cards): aspect-[4/3], aspect-[16/10], aspect-[1/1]
- Column 3 (2 cards): aspect-[1/1], aspect-[16/10]

Each column is a flex-col with gap-4. Creates organic staggered height effect.
Desktop: 3 columns. Mobile: single column stacked.

Uses `<IndustryCard>` with per-card aspect ratio overrides.

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-industries-masonry.tsx
```

---

### Task 10: Industry Selector Wrapper

**Files:**
- Create: `src/components/sections/home-industries.tsx`

- [ ] **Step 1: Build wrapper component**

Simple component that imports all 4 variants and renders the active one. Uses a constant to switch:

```tsx
const ACTIVE_VARIANT = 'grid'; // 'grid' | 'bento' | 'carousel' | 'masonry'
```

Also renders the section header (tag + CharacterReveal + subtitle) once, shared across all variants.

Roy can change the constant to switch layouts instantly for comparison.

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-industries.tsx
```

---

### Task 11: Portfolio Highlights

**Files:**
- Create: `src/components/sections/home-portfolio.tsx`

- [ ] **Step 1: Build portfolio section**

Reuse the drag carousel + TiltCard + CinematicPlayer pattern from `v2-portfolio-c.tsx` but:
- Select only 4-6 best cross-industry items from the shared portfolio data
- CharacterReveal title: "See It In Action"
- Same drag sensitivity (0.6x), depth-of-field opacity, CinematicPlayer modal on click
- CinematicSection wrapper NOT needed (this section is pure dark, content is visual)

Import portfolio data from `src/content/index.ts`.

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-portfolio.tsx
```

---

### Task 12: Why Virtuo (Differentiators)

**Files:**
- Create: `src/components/sections/home-why-virtuo.tsx`

- [ ] **Step 1: Build differentiators section**

CinematicSection wrapper with BTS background (`steadicam-operator.jpg`), diagonal top + bottom.

Content: 4 differentiator cards in a 2x2 grid (desktop) / stacked (mobile).

Each card:
- Icon (Lucide): Camera, Layers, Award, MapPin
- Heading: `text-foreground text-xl font-semibold`
- Description: `text-white/80 text-sm`
- Subtle border: `border-white/[0.06]`, hover `border-white/15`
- Background: `bg-white/[0.03]` with `backdrop-blur-sm`

Differentiators:
1. Cinema-Grade Production (Camera icon)
2. From Concept to Content (Layers icon)
3. 150+ Projects Delivered (Award icon)
4. Toronto Born, Globally Minded (MapPin icon)

CharacterReveal title: "Why Virtuo"

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-why-virtuo.tsx
```

---

### Task 13: Homepage Testimonials

**Files:**
- Create: `src/components/sections/home-testimonials.tsx`

- [ ] **Step 1: Build testimonials wrapper**

Reuse `AnimatedTestimonials` component. Same pattern as `about-testimonials.tsx`:
- Map testimonial data to `{ quote, name, designation, src }` format
- Use `ui-avatars.com` API for placeholder avatars (unique per person, red background)
- Enable `autoplay`
- CharacterReveal title: "What Our Clients Say"

This is a thin wrapper — most logic lives in the reused component.

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-testimonials.tsx
```

---

### Task 14: Homepage Final CTA

**Files:**
- Create: `src/components/sections/home-cta.tsx`

- [ ] **Step 1: Build CTA section**

Follow the exact Closing Shot pattern from `v2-final-cta.tsx`:
- CinematicSection with `full-production-set.jpg`, overlayOpacity 55
- CharacterReveal: "Your Story Starts Here"
- Dual CTAs: ShimmerButton call + ghost "Send a Message"
- "Send a Message" opens slide-out FormPanel (copy FormPanel + PanelContent from `v2-final-cta.tsx` or import if extracted)
- Inline testimonial with 5 stars
- Scarcity signal: "Currently booking Summer 2026"
- Address line with MapPin icon

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/home-cta.tsx
```

---

### Task 15: Homepage Assembly

**Files:**
- Create: `src/app/(home)/page.tsx`

- [ ] **Step 1: Assemble the page**

```tsx
export default function HomePage() {
    return (
        <>
            <HomeHero />
            <V2TrustBar logos={...} />
            <HomeIndustries />
            <div id="portfolio"><HomePortfolio /></div>
            <CinematicSection bgImage="..." diagonal diagonalBottom>
                <HomeWhyVirtuo />
            </CinematicSection>
            <CinematicSection bgImage="..." diagonal diagonalBottom>
                <HomeTestimonials />
            </CinematicSection>
            <HomeCta />
            <V2Footer />
        </>
    );
}
```

Import shared content data for trust bar logos, portfolio items, testimonials.

- [ ] **Step 2: Remove old redirect from `src/app/page.tsx`**

Delete the old `redirect('/v2')` file — the route group `(home)` now serves `/`.

- [ ] **Step 3: Format**
```bash
npx prettier --write "src/app/(home)/page.tsx"
```

---

### Task 16: Coming Soon Pages

**Files:**
- Create: `src/app/[industry]/page.tsx`
- Create: `src/app/[industry]/layout.tsx`

- [ ] **Step 1: Create dynamic route page**

```tsx
// src/app/[industry]/page.tsx
const industries = {
    nightlife: 'Nightlife',
    corporate: 'Corporate',
    events: 'Events',
    hospitality: 'Hospitality',
    'real-estate': 'Real Estate',
    automotive: 'Automotive',
    entertainment: 'Entertainment'
};

export function generateStaticParams() {
    return Object.keys(industries).map(slug => ({ industry: slug }));
}
```

Page content:
- CinematicSection with BTS background (`commercial-stage.jpg`), overlayOpacity 70
- CharacterReveal H1: `${industryName} Video Production`
- Subtitle: "Coming soon. We're crafting something special."
- Dual CTAs: ShimmerButton call + ghost "Explore Our Work" → link to `/`
- Link: "Or check out our restaurant portfolio" → `/restaurants`
- V2Footer

- [ ] **Step 2: Create layout**

Reuse homepage layout pattern (or share with route group). Scroll-reveal nav with same links. RAF-throttled scroll listener.

- [ ] **Step 3: Handle unknown slugs**

Return `notFound()` for slugs not in the industries map.

- [ ] **Step 4: Format**
```bash
npx prettier --write "src/app/[industry]/page.tsx" "src/app/[industry]/layout.tsx"
```

---

### Task 17: Final Quality Check

- [ ] **Step 1: Design bible checklist**

Run through every item in `design-bible/quality-checklist.md`:
- CharacterReveal on all titles
- text-white/80 minimum on body text
- CinematicSection wrappers on alternating sections
- Diagonal transitions present
- Video-on-hover working on all industry cards
- CinematicPlayer modals on portfolio clicks
- Dual-path CTAs (call + message)
- Phone number visible 2x minimum
- Scarcity signal present
- No brandAnimatedR, no BlurFade on titles
- No bounce on springs
- RAF-throttled scroll listeners
- IntersectionObserver on infinite animations

- [ ] **Step 2: Verify all 4 layout variants render**

Switch `ACTIVE_VARIANT` in `home-industries.tsx` to each of: `grid`, `bento`, `carousel`, `masonry`. Verify each renders correctly.

- [ ] **Step 3: Verify coming soon pages**

Navigate to `/nightlife`, `/corporate`, `/events`, `/hospitality`, `/real-estate`, `/automotive`, `/entertainment`. Verify each shows the correct industry name.

- [ ] **Step 4: Verify route rename**

Navigate to `/restaurants` — should show the full restaurant landing page. Navigate to `/v2` — should redirect to `/restaurants`.

- [ ] **Step 5: Format all new files**
```bash
npx prettier --write "src/app/(home)/**/*.tsx" src/components/sections/home-*.tsx src/components/ui/industry-card.tsx src/content/shared/industries.ts "src/app/[industry]/**/*.tsx"
```
