# About Page Elevation to Design Bible Standard

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Elevate the About page (`/about`) to match the v2 landing page quality standard defined in `design-bible/`.

**Architecture:** Replace all pre-v2 animation patterns (BlurFade, TextGenerateEffect, brandAnimatedR) with CharacterReveal. Wrap alternating sections in CinematicSection for BTS depth. Add three new Aceternity components: 3D Globe (clients), Animated Testimonials, and 3D Pin (location). Add diagonal transitions, mid-CTA, and lead magnet. Fix text contrast throughout.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS v4, GSAP + ScrollTrigger, Framer Motion, Aceternity UI (3d-globe, 3d-pin, animated-testimonials)

**Reference:** `design-bible/quality-checklist.md` — every item must pass before this work is complete.

---

## File Map

| Action | File | Responsibility |
|--------|------|----------------|
| Modify | `src/app/about/page.tsx` | Section order, add new sections, add CinematicSection wrappers |
| Modify | `src/app/about/layout.tsx` | RAF throttle scroll listener |
| Modify | `src/components/sections/about-hero.tsx` | Replace TextGenerateEffect → CharacterReveal, remove BlurFade |
| Modify | `src/components/sections/about-story.tsx` | Replace brandAnimatedR → CharacterReveal, add CinematicSection |
| Modify | `src/components/sections/about-jeff.tsx` | Replace brandAnimatedR → CharacterReveal, remove accent blob |
| Modify | `src/components/sections/about-values.tsx` | Replace brandAnimatedR → CharacterReveal |
| Modify | `src/components/sections/about-gear.tsx` | Replace brandAnimatedR → CharacterReveal, reduce drag sensitivity |
| Modify | `src/components/sections/about-bts.tsx` | Replace brandAnimatedR → CharacterReveal, upgrade lightbox |
| Modify | `src/components/sections/about-location.tsx` | Replace brandAnimatedR → CharacterReveal, add 3D Pin |
| Modify | `src/components/sections/about-cta.tsx` | Replace brandAnimatedR/BlurFade → CharacterReveal, add form panel, add testimonial |
| Create | `src/components/sections/about-clients.tsx` | NEW: 3D Globe with client logos and city markers |
| Rewrite | `src/components/sections/about-testimonials.tsx` | Replace static cards with Animated Testimonials |
| Create | `src/components/ui/globe.tsx` | Aceternity 3D Globe component (install via CLI or manual) |
| Create | `src/components/ui/3d-pin.tsx` | Aceternity 3D Pin component |
| Create | `src/components/ui/animated-testimonials.tsx` | Aceternity Animated Testimonials component |

---

## Task 1: Install Aceternity Components

**Files:**
- Create: `src/components/ui/globe.tsx`
- Create: `src/components/ui/3d-pin.tsx`
- Create: `src/components/ui/animated-testimonials.tsx`

- [ ] **Step 1: Install 3D Globe**
```bash
npx shadcn@latest add "https://ui.aceternity.com/r/3d-globe.json"
```
If CLI fails, manually fetch from Aceternity docs and create the file.

- [ ] **Step 2: Install 3D Pin**
```bash
npx shadcn@latest add "https://ui.aceternity.com/r/3d-pin.json"
```

- [ ] **Step 3: Install Animated Testimonials**
```bash
npx shadcn@latest add "https://ui.aceternity.com/r/animated-testimonials.json"
```

- [ ] **Step 4: Verify imports compile**
```bash
npx tsc --noEmit 2>&1 | grep -i "globe\|pin\|testimonial"
```
Expected: No errors for these files. If ESLint issues in Aceternity code, add `/* eslint-disable */` at top (same pattern as animated-modal.tsx).

- [ ] **Step 5: Format new files**
```bash
npx prettier --write src/components/ui/globe.tsx src/components/ui/3d-pin.tsx src/components/ui/animated-testimonials.tsx
```

---

## Task 2: Fix Layout Scroll Listener (Performance)

**Files:**
- Modify: `src/app/about/layout.tsx:121-142`

- [ ] **Step 1: Add RAF throttle to scroll listener**

Replace the `handleScroll` in the `useEffect` with the same RAF-throttled pattern used in `src/app/v2/layout.tsx`:
```tsx
let ticking = false;
const handleScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        // ... existing scroll logic
        ticking = false;
    });
};
```

- [ ] **Step 2: Format**
```bash
npx prettier --write src/app/about/layout.tsx
```

---

## Task 3: Upgrade Hero Section

**Files:**
- Modify: `src/components/sections/about-hero.tsx`

- [ ] **Step 1: Replace imports**
Remove: `TextGenerateEffect`, `BlurFade`, `Spotlight`, `MOTION`
Add: `CharacterReveal` from `@/components/ui/character-reveal`

- [ ] **Step 2: Replace hero content**
- Remove `TextGenerateEffect` → use `CharacterReveal as="h1"` with same classes
- Remove all `BlurFade` wrappers — content renders directly
- Remove `Spotlight` wrapper — not in design bible
- Remove accent glow blob (`bg-accent/6 absolute bottom-0`)
- Keep BTS background image + gradient overlays (correct pattern)
- Fix scroll indicator opacity: `text-white/30` → `text-white/60`
- Fix body text: `text-muted-foreground` → `text-white/80`
- Add phone CTA to hero (design bible: phone number visible in hero)

- [ ] **Step 3: Format**
```bash
npx prettier --write src/components/sections/about-hero.tsx
```

---

## Task 4: Upgrade Story Section + Add CinematicSection

**Files:**
- Modify: `src/components/sections/about-story.tsx`

- [ ] **Step 1: Replace imports**
Remove: `BlurFade`, `brandAnimatedR`, `MOTION`
Add: `CharacterReveal` from `@/components/ui/character-reveal`

- [ ] **Step 2: Replace header**
- Remove `BlurFade` wrapper
- Replace `brandAnimatedR('The Person Behind the Lens')` → `<CharacterReveal>The Story Behind the Studio</CharacterReveal>` (copy update per Paige's suggestion — team not solo)
- Fix body text contrast: `text-muted-foreground` → `text-white/80`

- [ ] **Step 3: Format**
```bash
npx prettier --write src/components/sections/about-story.tsx
```

---

## Task 5: Build Global Clients Section (3D Globe)

**Files:**
- Create: `src/components/sections/about-clients.tsx`
- Modify: `src/app/about/page.tsx` (add section)

- [ ] **Step 1: Create about-clients.tsx**

Build a new section using the 3D Globe component:
- CharacterReveal title: "From Toronto to the World"
- Tag line: "Our Clients"
- Globe with markers for client cities:
  - Toronto (43.6532, -79.3832) — Nome Izakaya, Hyundai, INK, Hazelton, SpiderTech, PrittyLandscapes, Stance
  - Miami (25.7617, -80.1918) — AMAL Miami, Level 6
  - Global/Generic — Mercedes-Benz, Shangri-La, Grayline
- Each marker uses the client logo from `/images/logos/`
- Wrap in CinematicSection with BTS background + diagonal transitions
- Below globe: scrolling logo marquee (reuse trust bar pattern) for reinforcement

- [ ] **Step 2: Add to page.tsx**

Insert after Story section, before Jeff section:
```tsx
<CinematicSection bgImage="/images/bts/commercial-stage.jpg" overlayOpacity={82} diagonal diagonalBottom>
    <AboutClients />
</CinematicSection>
```

- [ ] **Step 3: Format**
```bash
npx prettier --write src/components/sections/about-clients.tsx src/app/about/page.tsx
```

---

## Task 6: Upgrade Jeff Section

**Files:**
- Modify: `src/components/sections/about-jeff.tsx`

- [ ] **Step 1: Replace imports and patterns**
- Remove: `BlurFade`, `brandAnimatedR`, `MOTION`
- Add: `CharacterReveal`
- Replace `brandAnimatedR('Jeff Han')` → `<CharacterReveal>Jeff Han</CharacterReveal>`
- Remove accent glow blob (`bg-accent/8 absolute -inset-4`)
- Fix text: `text-muted-foreground` → `text-white/80` on body paragraphs

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/about-jeff.tsx
```

---

## Task 7: Upgrade Values Section

**Files:**
- Modify: `src/components/sections/about-values.tsx`

- [ ] **Step 1: Replace imports and patterns**
- Remove: `BlurFade`, `brandAnimatedR`, `MOTION`
- Add: `CharacterReveal`
- Replace `brandAnimatedR('Our Values')` → `<CharacterReveal>The Virtuo Code</CharacterReveal>` (copy update)
- Fix text contrast on descriptions

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/about-values.tsx
```

---

## Task 8: Upgrade Gear Section

**Files:**
- Modify: `src/components/sections/about-gear.tsx`

- [ ] **Step 1: Replace imports and patterns**
- Remove: `BlurFade`, `brandAnimatedR`, `MOTION`
- Add: `CharacterReveal`
- Replace `brandAnimatedR('Premium Gear')` → `<CharacterReveal>Premium Gear</CharacterReveal>`
- Reduce drag sensitivity: multiply dx by 0.6 in `handleDragMove`
- Fix non-active card opacity: `0.5` → `0.75` (match v2 reels pattern)

- [ ] **Step 2: Format**
```bash
npx prettier --write src/components/sections/about-gear.tsx
```

---

## Task 9: Upgrade BTS Section + Lightbox

**Files:**
- Modify: `src/components/sections/about-bts.tsx`

- [ ] **Step 1: Replace imports and patterns**
- Remove: `BlurFade`, `brandAnimatedR`, `MOTION`
- Add: `CharacterReveal`
- Replace `brandAnimatedR(...)` → `<CharacterReveal>Where the Magic Happens</CharacterReveal>`

- [ ] **Step 2: Upgrade lightbox to CinematicPlayer style**

Replace the basic lightbox (lines 64-108) with the same pattern used across v2:
- Blurred backdrop (image scaled 110%, blur-3xl, 75% black)
- Ambient red glow
- Spring entrance animation (scale 0.92→1)
- ESC close button (pill style, top-right)
- Counter badge (top-left, mono font)
- Image in rounded-2xl container with border-white/10
- Bottom gradient overlay with title/subtitle/label
- Keyboard: ESC to close, arrows to navigate

- [ ] **Step 3: Format**
```bash
npx prettier --write src/components/sections/about-bts.tsx
```

---

## Task 10: Rewrite Testimonials (Animated Testimonials)

**Files:**
- Rewrite: `src/components/sections/about-testimonials.tsx`
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Rewrite about-testimonials.tsx**

Replace entire component with Aceternity AnimatedTestimonials:
- CharacterReveal title: "Trusted by Industry Leaders"
- Tag line: "Client Stories"
- Map existing testimonial data to AnimatedTestimonials format:
  ```tsx
  testimonials.map(t => ({
      quote: t.quote,
      name: t.name,
      designation: `${t.title}, ${t.company}`,
      src: t.avatar || '/images/team/jeff.png' // placeholder until real photos
  }))
  ```
- Enable `autoplay` prop
- Style container to match dark theme

- [ ] **Step 2: Wrap in CinematicSection in page.tsx**
```tsx
<CinematicSection bgImage="/images/bts/steadicam-operator.jpg" overlayOpacity={80} diagonal diagonalBottom>
    <AboutTestimonials testimonials={allTestimonials} />
</CinematicSection>
```

- [ ] **Step 3: Format**
```bash
npx prettier --write src/components/sections/about-testimonials.tsx src/app/about/page.tsx
```

---

## Task 11: Upgrade Location with 3D Pin

**Files:**
- Modify: `src/components/sections/about-location.tsx`

- [ ] **Step 1: Replace imports and patterns**
- Remove: `BlurFade`, `brandAnimatedR`, `MOTION`
- Add: `CharacterReveal`, `PinContainer` from `@/components/ui/3d-pin`

- [ ] **Step 2: Replace studio photo with 3D Pin**

Replace the static `<img>` of the studio with a `PinContainer`:
```tsx
<PinContainer title="Virtuo Video Studio" href="https://maps.google.com/?q=548+Dundas+St+W+Toronto">
    <div className="flex flex-col p-4 w-[20rem] h-[16rem]">
        <img src="/images/about/studio.jpg" alt="Studio" className="rounded-xl w-full h-32 object-cover" />
        <h3 className="text-foreground mt-3 font-semibold">548 Dundas St W</h3>
        <p className="text-white/70 text-sm">Toronto, ON M5T 1H3</p>
    </div>
</PinContainer>
```

- [ ] **Step 3: Format**
```bash
npx prettier --write src/components/sections/about-location.tsx
```

---

## Task 12: Upgrade CTA + Add Form Panel

**Files:**
- Modify: `src/components/sections/about-cta.tsx`

- [ ] **Step 1: Replace imports and patterns**
- Remove: `BlurFade`, `brandAnimatedR`, `MOTION`
- Add: `CharacterReveal`, `FormPanel` pattern (copy from `v2-final-cta.tsx`)
- Remove accent glow blob

- [ ] **Step 2: Add slide-out form panel**

Copy the `FormPanel` + `PanelContent` components from `src/components/sections/v2-final-cta.tsx` (or extract into shared component). Wire "Send a Message" button to open the panel.

- [ ] **Step 3: Add inline testimonial**

Add a testimonial below the CTAs (same pattern as v2-final-cta.tsx):
```tsx
<div className="mx-auto mt-14 max-w-lg">
    <div className="mb-3 flex justify-center gap-1">
        {[...Array(5)].map((_, i) => <Star key={i} className="fill-accent text-accent h-4 w-4" />)}
    </div>
    <blockquote className="text-foreground text-base leading-relaxed italic">...</blockquote>
    <p className="mt-3 text-sm text-white/70">— Name, Company</p>
</div>
```

- [ ] **Step 4: Add scarcity signal**
```tsx
<p className="text-accent mt-4 text-sm font-medium tracking-wide">Currently booking Summer 2026</p>
```

- [ ] **Step 5: Format**
```bash
npx prettier --write src/components/sections/about-cta.tsx
```

---

## Task 13: Update Page Assembly + Add Mid-CTA

**Files:**
- Modify: `src/app/about/page.tsx`

- [ ] **Step 1: Update section order and add wrappers**

New section order:
```
1. Hero
2. Story (chapters)
3. Clients (NEW — 3D Globe) — CinematicSection diagonal
4. Jeff
5. Mid-CTA (reuse V2MidCta) — add import
6. Values
7. Gear
8. BTS — CinematicSection diagonal
9. Testimonials (Animated) — CinematicSection diagonal
10. Location (3D Pin)
11. CTA (with form panel)
```

- [ ] **Step 2: Add imports**
```tsx
import { AboutClients } from '@/components/sections/about-clients';
import { V2MidCta } from '@/components/sections/v2-mid-cta';
import { CinematicSection } from '@/components/ui/cinematic-section';
```

- [ ] **Step 3: Format**
```bash
npx prettier --write src/app/about/page.tsx
```

---

## Task 14: Final Quality Check

- [ ] **Step 1: Run design bible quality checklist**
Go through every item in `design-bible/quality-checklist.md` and verify.

- [ ] **Step 2: Verify no brandAnimatedR or BlurFade on titles remain**
```bash
grep -r "brandAnimatedR\|BlurFade" src/components/sections/about-* src/app/about/
```
Expected: No matches (or only BlurFade on non-title content where appropriate).

- [ ] **Step 3: Verify CharacterReveal on all section titles**
```bash
grep -r "CharacterReveal" src/components/sections/about-*
```
Expected: One match per section file.

- [ ] **Step 4: Verify text contrast — no muted-foreground on body text**
```bash
grep -n "text-muted-foreground" src/components/sections/about-* | grep -v "text-xs\|text-\[10px\]\|text-sm.*label\|caption"
```
Expected: Only on labels/captions (xs/sm size), never on readable paragraphs.

- [ ] **Step 5: Format all files**
```bash
npx prettier --write src/components/sections/about-*.tsx src/app/about/*.tsx
```
