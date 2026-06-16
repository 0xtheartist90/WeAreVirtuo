# Performance Rules

## Budget

| Metric | Target |
|--------|--------|
| JS bundle (initial) | < 200KB compressed |
| LCP | < 2.5s |
| CLS | < 0.1 |
| CPU idle | < 10% (website contribution only, excluding extensions) |

## Animation Performance

### IntersectionObserver Gating (MANDATORY)
Any component with `repeat: Infinity` or `useAnimationFrame` MUST be gated:
```tsx
const [isVisible, setIsVisible] = useState(false);

useEffect(() => {
    const observer = new IntersectionObserver(
        ([entry]) => setIsVisible(entry.isIntersecting),
        { rootMargin: '100px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
}, []);

useAnimationFrame((time) => {
    if (!isVisible) return; // Skip work when off-screen
    // ... animation logic
});
```

### Spring Rules
- Standard config: `{ stiffness: 300, damping: 30 }`
- **NEVER use `bounce` parameter** — causes infinite oscillation
- Maximum 2 `useSpring` hooks per component
- Use raw `useTransform` for values that settle quickly (perspective transforms)
- Save `useSpring` for values that need momentum (parallax translation)

### Scroll Listener Throttling
Always use RAF throttling for scroll listeners:
```tsx
let ticking = false;
const handleScroll = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
        // ... calculations
        ticking = false;
    });
};
```

### Video Elements
| Rule | Why |
|------|-----|
| Use `preload="metadata"` on visible thumbnails | Shows first frame, prevents black rectangles |
| Use `preload="none"` only on off-screen/hidden videos | Saves bandwidth |
| Call `video.pause()` + `currentTime = 0` on mouse leave | Prevents background decoding |
| Never autoplay more than 1 video simultaneously | CPU/memory |

### GSAP Cleanup
Every `useEffect` that creates a GSAP timeline or ScrollTrigger MUST clean up:
```tsx
useEffect(() => {
    const trigger = ScrollTrigger.create({ ... });
    return () => trigger.kill();
}, []);
```

### CSS Animation Rules
- CSS `@keyframes` are preferred for simple infinite loops (shimmer, marquee)
- CSS animations are GPU-composited and don't block the main thread
- Use `transform` and `opacity` only — never animate `width`, `height`, `top`, `left`
- `will-change: transform` on continuously animating elements (parallax cards)

## Bundle Rules

### Imports
- Import icons individually: `import { Play } from 'lucide-react'` (not entire package)
- Lazy-load heavy components below the fold with `dynamic()`
- Never import entire animation libraries — use specific exports

### Images
- Use responsive `srcSet` where possible
- BTS backgrounds: full resolution is fine (they're heavily overlaid)
- Portfolio thumbnails: max 800px wide
- Always include `alt` text (empty `alt=""` + `aria-hidden="true"` for decorative images)

## What NOT to Do

| Anti-Pattern | Why | Alternative |
|-------------|-----|-------------|
| `useAnimationFrame` without visibility check | Runs 60fps forever, even off-screen | Add IntersectionObserver gate |
| `bounce: 100` on springs | Springs never settle, infinite CPU | Remove bounce parameter |
| `repeat: Infinity` on Framer Motion without gate | Animates off-screen elements | Add IntersectionObserver or only animate when `isActive` |
| Scroll listener without RAF throttle | Fires 60+ times per second | Wrap in `requestAnimationFrame` |
| `preload="none"` on visible videos | Shows black rectangle | Use `preload="metadata"` |
| Manual momentum coast with RAF loop | Fights with scroll-snap, causes jank | Let browser's native scroll-snap handle it |
| Multiple `useSpring` for one-time transforms | Unnecessary spring overhead | Use raw `useTransform` |
