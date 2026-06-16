# VirtuoVideo Homepage Design Spec

**Goal:** Build the crown jewel homepage (`/`) that serves as the universal entry point and industry router for VirtuoVideo. Must surpass both `/restaurants` (v2) and `/about` in quality.

**Architecture:** Showreel hero hooks emotionally → industry selector grid routes to verticals → portfolio proves the work → social proof closes. 8 sections, zero bloat.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion, design bible compliant.

**Design Bible:** All rules in `design-bible/` apply. CharacterReveal on all titles, CinematicSection wrappers, diagonal transitions, CinematicPlayer modals, dual-path CTAs, performance gating.

---

## Route Changes

| Current | New | Notes |
|---------|-----|-------|
| `/` | Homepage (new build) | Currently redirects to /v2 |
| `/v2` | `/restaurants` | Rename route, keep all content |
| — | `/nightlife` | Coming soon page |
| — | `/corporate` | Coming soon page |
| — | `/events` | Coming soon page |
| — | `/hospitality` | Coming soon page |
| — | `/real-estate` | Coming soon page |
| — | `/automotive` | Coming soon page |
| — | `/entertainment` | Coming soon page |

## Section 1: Showreel Hero

**Full-viewport cinematic video background.**

- Video: `/videos/hero/virtuo-showreel.mp4` (21MB, already downloaded)
- Autoplay, muted, loop, playsInline
- Gradient overlays: bottom-to-top black fade for text readability
- Content (left-aligned, bottom-third):
  - Tag: "Toronto's Premier Video Production Studio"
  - CharacterReveal H1: "Every Story Deserves Cinema"
  - Subtitle: "Cinematic video production for restaurants, hotels, corporate brands, and everything in between."
  - Dual CTAs: ShimmerButton "Call 647-953-0222" + ghost "View Our Work" (scrolls to industry grid)
  - Scarcity: "Currently booking Summer 2026"
- Scroll indicator (ChevronDown, infinite bounce, gated)

**Performance:** Video uses `preload="auto"` (hero = above fold, needs fast load). Poster frame for instant display.

## Section 2: Trust Bar

**Reuse `V2TrustBar` component.** Same logo marquee, same data. No changes needed.

## Section 3: Industry Selector

**The centrepiece. 8 interactive cards, 4 layout variants built.**

### Card Data

| Industry | Tagline | Thumbnail | Video (hover) | Route |
|----------|---------|-----------|---------------|-------|
| Restaurants | "Fill tables with cinematic content" | nome.png | nome-fort-york.mp4 | /restaurants |
| Nightlife | "Capture the energy after dark" | portfolio BTS | nome-don-mills.mp4 | /nightlife |
| Corporate | "Brand films that move boardrooms" | BTS image | try-lychee.mp4 | /corporate |
| Events | "Every moment, every angle" | BTS image | nome-fort-york.mp4 | /events |
| Hospitality | "Luxury you can feel through a screen" | hazelton image | try-lychee.mp4 | /hospitality |
| Real Estate | "Properties that sell themselves" | BTS image | nome-don-mills.mp4 | /real-estate |
| Automotive | "Horsepower meets cinema" | BTS image | nome-fort-york.mp4 | /automotive |
| Entertainment | "From stage to screen" | BTS image | try-lychee.mp4 | /entertainment |

*Note: Videos are placeholder — same 3 portfolio videos reused. Replace with real industry-specific clips later.*

### Layout Variant A: 4x2 Grid
- Clean, symmetric
- All 8 cards equal size
- Desktop: 4 columns, 2 rows
- Mobile: 2 columns, 4 rows
- Each card: aspect-[16/10], rounded-2xl, video-on-hover, overlay with industry name + tagline

### Layout Variant B: Bento Asymmetric
- Featured card (Restaurants) spans 2 columns, 2 rows — larger, hero treatment
- Remaining 7 cards fill around it in mixed sizes
- Creates visual hierarchy — strongest vertical gets spotlight
- Reuses bento grid pattern from Services section

### Layout Variant C: Horizontal Scroll
- Full-width horizontal carousel
- Each card nearly half viewport width (large, editorial)
- Drag-to-scroll with 0.6x sensitivity (design bible standard)
- Snap-to-center behavior
- Navigation arrows + counter
- Feels premium and editorial

### Layout Variant D: Staggered Masonry
- Cards with varying heights (aspect ratios: 16/10, 4/3, 1/1 mixed)
- 3-column masonry layout
- Organic, editorial feel
- More complex but visually striking

### All Variants Share:
- Video-on-hover (700ms crossfade, design bible standard)
- Click → navigates to industry landing page
- Industry name in CharacterReveal-style (font-display, uppercase)
- Tagline in white/80
- Accent category tag
- Hover: border brightens, subtle lift

### Build Plan:
- Build all 4 as separate components
- Page uses one, the others become reusable for future pages
- Roy picks favourite after seeing all 4 live

## Section 4: Portfolio Highlights

**Best 4-6 projects across all industries.** Not industry-filtered — the homepage shows RANGE.

- Reuse TiltCard + CinematicPlayer pattern from v2 portfolio
- Drag carousel (same as v2 "See It In Action")
- CinematicPlayer modal on click with CTA
- CharacterReveal title: "See It In Action"

*Portfolio data: reuse existing shared portfolio items.*

## Section 5: Why Virtuo

**3-4 concrete differentiators.** Not fluffy values — tangible reasons to choose Virtuo.

Proposed differentiators:
1. **Cinema-Grade Production** — "RED & Sony cinema cameras, professional lighting, DaVinci Resolve color grading. Hollywood tools for your brand."
2. **From Concept to Content** — "Strategy, production, post, and social delivery. One team, one vision, zero handoffs."
3. **150+ Projects Delivered** — "Restaurants, hotels, automotive, corporate. We've done this before — for brands like yours."
4. **Toronto Born, Globally Minded** — "Based in Toronto's creative district. Shooting across North America."

Layout: 2x2 grid or horizontal cards with icons. CinematicSection wrapper with BTS background. Each differentiator has an icon + heading + one-line description.

## Section 6: Testimonials

**Reuse `AnimatedTestimonials` component** from about page. Same data, same autoplay behavior. Wrapped in CinematicSection with diagonal transitions.

## Section 7: Final CTA

**Reuse the Closing Shot pattern from v2.**

- CinematicSection with BTS background (full-production-set.jpg), 55% overlay
- CharacterReveal: "Your Story Starts Here"
- Dual CTAs: ShimmerButton call + ghost "Send a Message"
- Slide-out form panel on "Send a Message" click
- Inline testimonial with stars
- Scarcity signal
- Address line with MapPin

## Section 8: Footer

**Reuse `V2Footer` component.** No changes needed.

## Coming Soon Page

**Shared template for all 7 unbuilt industry verticals.**

- Route: `/[industry]` (dynamic route)
- CinematicSection wrapper with BTS background
- CharacterReveal H1: "[Industry] Video Production"
- Subtitle: "Coming soon. We're crafting something special."
- CTA: "Explore Our Work" → link to `/`
- Phone CTA: ShimmerButton
- "Or check out our restaurant portfolio" → link to `/restaurants`
- Reuse footer

## Navigation

**Homepage uses its own layout** (not v2 or about layout).

Nav links:
- Industries (dropdown or scroll to grid)
- Portfolio
- About → `/about`
- Contact → `#contact`
- Phone number + "Get a Quote" button

Same scroll-reveal pattern as v2 (RAF-throttled, appears on scroll-up after hero).

## Conversion Architecture

- Phone CTA visible minimum 2x (hero + final CTA)
- Lead magnet accessible from mid-page or CTA area
- Every industry card click = GA4 event: `industry_card_click` with `{ industry: 'restaurants' }`
- UTM support: `?industry=restaurants` auto-scrolls to that industry card and highlights it
- Form submissions tracked with `form_submit` event
- Meta Pixel fires on page load + card clicks + form submit

## Performance Requirements

- Hero video: poster frame for instant display, `preload="auto"`
- Industry card videos: `preload="metadata"` (first frame visible)
- All infinite animations: IntersectionObserver gated
- Scroll listeners: RAF throttled
- No `bounce` on springs
- `will-change: transform` on parallax/animated elements
- Target: <10% CPU contribution (measured in incognito)
