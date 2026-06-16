# Interaction Patterns

## Video-on-Hover

The signature interaction across the entire site. Every card with video content follows this pattern:

### Implementation
1. `<img>` thumbnail is absolutely positioned, full coverage
2. `<video muted loop playsInline preload="metadata">` behind the thumbnail
3. On `mouseenter`: set hovering state, call `video.play()`
4. On `mouseleave`: set hovering state false, call `video.pause()`, reset `currentTime = 0`
5. Thumbnail crossfades out: `transition-all duration-700`, `opacity-0 scale-105` when hovering
6. Video crossfades in: `transition-opacity duration-700`, `opacity-100` when hovering

### Rule
Every card that has a video MUST play it on hover. No exceptions. This is what makes the site feel alive.

## Click-to-Play Modal

Every playable video element (cards, thumbnails, reels) opens a **Cinematic Video Player** modal on click.

### Trigger Pattern
```tsx
onClick={() => product.videoSrc && onCardClick(product)}
className={product.videoSrc ? 'cursor-pointer' : ''}
```

### Portal Pattern (for clipped containers)
```tsx
{typeof document !== 'undefined' &&
    createPortal(
        <AnimatePresence>
            {dialogOpen && <CinematicPlayer ... />}
        </AnimatePresence>,
        document.body
    )}
```

## Drag-to-Scroll Carousel

Used in: Portfolio, Reels.

### Desktop Behavior
1. `cursor: grab` on container
2. `mousedown` → record start position, disable scroll-snap, set `cursor: grabbing`
3. `mousemove` → scroll container by delta (0.6x sensitivity for desktop comfort)
4. `mouseup` → re-enable `scroll-snap-type: x mandatory`, browser handles smooth snap
5. Distance threshold: 8px before counting as drag (prevents accidental drag on click)

### Click vs Drag Discrimination
```tsx
const DRAG_THRESHOLD = 8;
// In move handler:
if (Math.abs(dx) > DRAG_THRESHOLD) d.hasDragged = true;
// In click handler:
if (!dragRef.current.hasDragged) openModal(item);
```

### Scroll-Driven Active Detection
```tsx
// RAF-throttled scroll listener
requestAnimationFrame(() => {
    // Find card closest to container center
    const center = container.left + container.width / 2;
    cards.forEach((card, i) => {
        const dist = Math.abs(card.center - center);
        if (dist < minDist) bestIdx = i;
    });
    setActiveIdx(bestIdx);
});
```

## Keyboard Controls

### Global (when modal is open)
| Key | Action |
|-----|--------|
| `Escape` | Close modal |
| `Space` | Play/pause |
| `M` | Toggle mute |
| `F` | Toggle fullscreen |
| `←` / `→` | Seek 5 seconds |
| `Shift+←` / `Shift+→` | Previous/next item |

### Navigation
| Key | Action |
|-----|--------|
| `Enter` / `Space` | Activate focused card |
| `Tab` | Navigate between interactive elements |

## Scroll Behaviors

### Smooth Scroll to Section
```tsx
document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
```

### Scroll-Reveal Navigation
- Hidden during hero (scrollY < innerHeight * 0.7)
- Shows on scroll UP after hero
- Hides on scroll DOWN (10px threshold to prevent jitter)
- RAF-throttled scroll listener

### Sticky Scroll (Journey Section)
- GSAP ScrollTrigger `pin: true`, `scrub: 1`
- Section height: `steps * 100vh`
- Progress drives step index: `Math.floor(progress * steps)`
- Cross-fade between step backgrounds and content
- Progress dots at bottom with click-to-navigate

## Hover States

### Cards
- Lift: `whileHover={{ y: -20 }}` or `transform: translateY(-20px)`
- Border brighten: `border-white/[0.06]` → `border-white/15`
- Play icon pulse: scale + border-color animation
- Video crossfade (700ms)
- Gradient overlay lightens

### Buttons
- Ghost buttons: `border-white/15 → border-white/25`, `bg-white/5 → bg-white/10`
- Arrow icons: `group-hover:translate-x-1`
- ShimmerButton: built-in shimmer effect

### Navigation Links
- `text-white/70 → text-white`
- No underlines (clean, minimal)

## Form Patterns

### Input Styling
```
bg-[#111] border-white/[0.12] focus:border-accent focus:ring-accent/20
placeholder:text-white/40 rounded-lg px-4 py-3.5
```

### Form States
| State | Visual |
|-------|--------|
| Idle | Standard input styling |
| Focus | Accent border + ring glow |
| Submitting | Spinner icon + "Sending..." text |
| Success | Green checkmark + confirmation message |
| Error | Red text below form |

### Submit Button
Always a `ShimmerButton` with full width, disabled during submission.

## Mobile Adaptations

### Panels
- Desktop: slide from right (`max-w-md`)
- Mobile: slide up from bottom (`max-h-[90vh]`, `rounded-t-2xl`)

### Carousels
- Touch scroll with snap points (native scroll)
- No drag handlers on touch (touch scroll is native)
- Navigation arrows: inline below carousel on mobile, floating sides on desktop

### Sticky Scroll
- Desktop: GSAP pinned scroll with cross-fade
- Mobile: Static stacked layout with alternating image/text sides
