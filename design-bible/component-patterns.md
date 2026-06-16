# Component Patterns

## Section Composition

### Standard Section Wrapper
Every section follows this structure:
```
<section/div py-20 md:py-28>
  <div mx-auto max-w-content px-4 md:px-8>
    <!-- Tag line (accent, uppercase, tracking-widest) -->
    <!-- CharacterReveal title (font-display, uppercase) -->
    <!-- Subtitle (text-lg text-white/80) -->
    <!-- Content -->
  </div>
</section>
```

### CinematicSection Wrapper
For sections needing cinematic depth:
```
<CinematicSection
  bgImage="/images/bts/..."
  overlayOpacity={80}
  diagonal          // optional: top diagonal clip
  diagonalBottom    // optional: bottom diagonal clip
>
  <YourSection />
</CinematicSection>
```
Provides: parallax BTS background, dark overlay, gradient blend, vignette, diagonal transitions.

## The Cinematic Video Player

**THE standard for all video modals across the entire site.**

### Required Features
1. **Blurred poster backdrop** — thumbnail scaled 110%, `blur-3xl`, 75% black overlay
2. **Ambient red glow** — `radial-gradient(ellipse 60% 40%, rgba(220,38,38,0.08), transparent 70%)`
3. **Spring entrance** — `scale: 0.92 → 1`, `opacity: 0 → 1`, `y: 20 → 0`
4. **Close button** — top-right, `ESC` label on desktop, rounded pill with backdrop blur
5. **Counter badge** — top-left, mono font, accent-colored current number
6. **Video container** — `rounded-2xl`, `border-white/10`, `shadow-2xl shadow-black/50`
7. **Center play overlay** — 80px circle, `border-white/20`, `bg-black/50`, `backdrop-blur-md`
8. **Progress bar** — 1px height, expands to 2px on hover, accent fill, draggable scrub dot
9. **Controls row** — play/pause, mute, time display (mono), title badge, fullscreen
10. **Auto-hide controls** — fade after 3 seconds, show on mouse move
11. **Keyboard shortcuts** — Space (play/pause), M (mute), F (fullscreen), ESC (close), arrows (seek)
12. **Info panel below** — title, description/category, CTA card
13. **CTA card** — "Want something like this?" + Call Now button + "Or send a message" link
14. **Navigation arrows** — SkipBack/SkipForward on desktop sides (when applicable)

### Aspect Ratios
| Content Type | Aspect | Container |
|-------------|--------|-----------|
| Portfolio videos | `aspect-video` (16:9) | `max-w-6xl` |
| Reels | `aspect-[9/16]` | `max-w-sm` |
| Hero card videos | `aspect-video` (16:9) | `max-w-5xl` |

### Portal Rule
**ALWAYS render video modals via `createPortal(modal, document.body)`** when the trigger component is inside a `CinematicSection` or any container with `overflow: hidden` or `clip-path`.

## Card Patterns

### TiltCard (Portfolio)
- 3D perspective tilt on mouse move (`rotateX`, `rotateY` via spring)
- Video-on-hover (thumbnail crossfade to muted video)
- MagicCard wrapper (cursor-following radial gradient glow)
- Cinematic letterbox bars (5% gradient top and bottom)
- Play icon pulses on hover (infinite scale + border-color animation)
- Number watermark (mono, 6xl-8xl, white/6% opacity)

### ProductCard (Hero Parallax)
- Parallax X-translation via `useSpring` + `useTransform`
- Video-on-hover (same crossfade pattern)
- `whileHover: { y: -20 }` lift effect
- Play icon appears on hover (top-right, 9x9 circle)
- Click opens HeroVideoModal (CinematicPlayer-style)
- `will-change: transform` for GPU compositing
- Cards without video: no cursor-pointer, no play icon

### PhoneFrame (Reels)
- Phone mockup: `rounded-[2rem]`, `border-[3px] border-white/[0.12]`
- Notch: centered black pill at top
- Home bar: centered white pill at bottom
- Video area: `aspect-[9/16]`
- Play overlay when not active/hovered
- Active glow ring: `ring-2 ring-red-500/40`, infinite opacity pulse
- `preload="metadata"` — always show first frame, never black

## CTA Patterns

### Primary CTA (Phone Call)
```
<ShimmerButton
  shimmerColor="rgba(220, 38, 38, 0.8)"
  background="rgba(220, 38, 38, 0.9)"
  className="px-10 py-4 text-lg font-semibold">
  <Phone className="mr-2 h-4 w-4" />
  Call 647-953-0222
</ShimmerButton>
```

### Secondary CTA (Ghost Button)
```
<button className="group inline-flex items-center gap-2 rounded-full
  border border-white/15 bg-white/5 px-8 py-4 text-base font-semibold
  text-white backdrop-blur-sm transition-all
  hover:border-white/25 hover:bg-white/10">
  Send a Message
  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
</button>
```

### Scarcity Signal
```
<p className="text-accent mt-4 text-sm font-medium tracking-wide">
  Currently booking Summer 2026
</p>
```

## Slide-Out Panel Pattern

Used for: Contact form (Final CTA), Lead magnet download.

### Desktop: Slide from right
```
initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
className="fixed inset-y-0 right-0 w-full max-w-md border-l border-white/[0.06]"
```

### Mobile: Slide up from bottom
```
initial={{ y: '100%' }} animate={{ y: 0 }} exit={{ y: '100%' }}
className="fixed inset-x-0 bottom-0 max-h-[90vh] rounded-t-2xl border-t border-white/[0.06]"
```

### Panel Structure
1. Header with title + close button (border-b separator)
2. Scrollable body (`flex-1 overflow-y-auto`)
3. Footer with alternative contact (border-t separator)

## Navigation Pattern

### Scroll-Reveal Nav
- Hidden during hero (first 70vh)
- Appears on scroll-up after hero
- Hides on scroll-down (10px threshold)
- Spring animation: `y: -80 → 0`
- `bg-black/90 backdrop-blur-md border-b border-white/[0.06]`
- Fixed logo top-left when nav is hidden

### Mobile Menu
- Slide from right (spring animation)
- Full-height, `max-w-sm`
- Staggered link animation on open
- Phone CTA in footer area
