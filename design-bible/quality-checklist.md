# Quality Checklist

Use this checklist before shipping any new page or section. Every item must pass.

## Visual Quality

- [ ] **Dark theme only** — no light mode leaks, no white backgrounds
- [ ] **Text contrast** — no text below `white/60` opacity for readable content
- [ ] **BTS backgrounds** — alternating sections use real production photos with 70-88% overlay
- [ ] **Cinematic vignette** — radial gradient darkening edges on BTS sections
- [ ] **Consistent borders** — `border-white/[0.06]` for subtle, `border-white/10` for interactive
- [ ] **No orphaned elements** — everything feels intentionally placed, no floating content in void
- [ ] **Accent red used sparingly** — CTAs, tags, active states, highlights only. Never decorative blobs.

## Typography

- [ ] **CharacterReveal on ALL section titles** — no exceptions
- [ ] **Font-display (Bebas Neue) for headlines** — always uppercase, tracking-wide
- [ ] **Font-sans (Inter) for body** — never Bebas for paragraphs
- [ ] **Section header pattern** — tag line → CharacterReveal title → subtitle
- [ ] **No text-generate-effect or BlurFade on titles** — CharacterReveal is the ONE

## Components

- [ ] **Video modals use CinematicPlayer pattern** — blurred backdrop, custom controls, progress bar, CTA
- [ ] **Video-on-hover works** — every card with video plays on hover, pauses on leave
- [ ] **Videos show first frame** — `preload="metadata"`, never black rectangles
- [ ] **Modals use createPortal** when inside overflow:hidden or clip-path containers
- [ ] **Slide-out panels** — desktop: right slide, mobile: bottom sheet
- [ ] **CTAs follow dual-path pattern** — primary (ShimmerButton call) + secondary (ghost button message)
- [ ] **Scarcity signal present** — "Currently booking [season]" or "Limited spots"

## Animations

- [ ] **CharacterReveal triggers at `top 85%`** — reveals before element reaches center
- [ ] **Spring config is `{ damping: 30, stiffness: 300 }`** — no `bounce` parameter
- [ ] **Infinite animations gated with IntersectionObserver** — no off-screen CPU waste
- [ ] **Scroll listeners RAF-throttled** — max one calculation per animation frame
- [ ] **GSAP cleanup in useEffect return** — every trigger/timeline killed on unmount
- [ ] **Diagonal transitions only** — no curves, no SVG waves, no glow dividers
- [ ] **Diagonal padding is 7vw** — 2vw buffer from 5vw clip edge

## Interactions

- [ ] **Drag carousel sensitivity at 0.6x** — not too fast, not too sluggish
- [ ] **No manual momentum coast** — let browser scroll-snap handle snapping
- [ ] **Keyboard accessible** — ESC closes modals, Space/Enter activates cards
- [ ] **Body scroll lock** — when modal/panel is open, body doesn't scroll
- [ ] **Click vs drag discrimination** — 8px threshold before counting as drag

## Conversion

- [ ] **Phone number CTA visible** — at least 2x per page (hero + final CTA)
- [ ] **Lead magnet accessible** — "Get the Free Playbook" trigger visible in mid-CTA
- [ ] **Form panel has alt contact** — phone number in footer of every form panel
- [ ] **Video modals have CTA** — "Want something like this? Call Now" below every player
- [ ] **Social proof present** — testimonials, client logos, star ratings near CTAs

## Performance

- [ ] **CPU contribution < 10%** — measure in incognito (no extensions)
- [ ] **No black video rectangles** — all visible videos use `preload="metadata"`
- [ ] **will-change on parallax elements** — GPU compositing for scrolling cards
- [ ] **Max 2 useSpring per component** — no spring bloat
- [ ] **No bounce on springs** — springs must settle

## Mobile

- [ ] **Panels slide from bottom** (not right) — with `max-h-[90vh]`
- [ ] **Journey section falls back to static** — stacked layout, no GSAP pin
- [ ] **Navigation arrows inline** (not floating) — below carousel on mobile
- [ ] **Touch scroll is native** — no custom drag handlers on touch devices
- [ ] **Reduced motion respected** — `useReducedMotion()` disables parallax/animations

## Section Order (v2 Reference)
1. Hero (parallax video cards)
2. Trust Bar (logo marquee)
3. Services (bento grid) — CinematicSection
4. Portfolio (drag carousel)
5. Reels (phone carousel) — CinematicSection diagonal
6. Mid-CTA (MovingBorder)
7. Journey (sticky scroll)
8. Testimonials — CinematicSection diagonal
9. FAQ — CinematicSection diagonal
10. Final CTA (BTS background + form panel)
11. Footer
