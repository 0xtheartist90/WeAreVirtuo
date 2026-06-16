# Animation Standards

## Animation Libraries

| Library | Purpose | Usage |
|---------|---------|-------|
| **GSAP + ScrollTrigger** | Scroll-driven animations, pinned sections, text reveals | Parallax backgrounds, Journey sticky scroll, CharacterReveal |
| **Framer Motion (motion/react)** | UI animations, hover states, modals, layout transitions | Modals, hover effects, AnimatePresence, springs |
| **CSS @keyframes** | Simple infinite loops | Shimmer buttons, marquee, accordion |

**RULE: Never mix GSAP and Framer Motion on the same element.** GSAP owns scroll-driven work. Framer Motion owns UI/interaction work.

## The ONE Signature Text Animation: CharacterReveal

Every section title uses `CharacterReveal` — word-by-word slide-up with luxury easing.

```
GSAP ScrollTrigger at "top 85%"
Duration: 1.0s (DURATION.reveal)
Easing: power3.out (LUXURY_EASE)
Stagger: 0.05s per word (STAGGER.words)
Direction: translateY from 110% to 0%
```

**RULE: No other text entrance animation.** No BlurFade on titles, no TextGenerateEffect, no random fade-ins. CharacterReveal is the ONE.

## GSAP Standards

### Easing Constants
| Token | Value | Usage |
|-------|-------|-------|
| `LUXURY_EASE` | `power3.out` | Default for all GSAP animations |
| `LUXURY_EASE_IN` | `power3.in` | Exit animations |
| `LUXURY_EASE_INOUT` | `power3.inOut` | Symmetric animations (scroll-to) |

### Duration Constants
| Token | Value | Usage |
|-------|-------|-------|
| `DURATION.fast` | `0.4s` | Quick transitions |
| `DURATION.normal` | `0.8s` | Standard entrance animations |
| `DURATION.slow` | `1.2s` | Slow, dramatic reveals |
| `DURATION.reveal` | `1.0s` | CharacterReveal specifically |

### Stagger Constants
| Token | Value | Usage |
|-------|-------|-------|
| `STAGGER.chars` | `0.02s` | Character-by-character |
| `STAGGER.words` | `0.05s` | Word-by-word (CharacterReveal) |
| `STAGGER.items` | `0.1s` | List items, cards |
| `STAGGER.sections` | `0.15s` | Section-level stagger |

### Parallax Background
```
GSAP fromTo: y from -speed/2% to speed/2%
ScrollTrigger: start "top bottom", end "bottom top", scrub: true
Default speed: 40 (20% travel each direction)
```

## Framer Motion Standards

### Spring Config (Standard)
```js
{ type: 'spring', damping: 30, stiffness: 300 }
```
Used for: modal entrances, slide-out panels, nav animations.

**RULE: Never use `bounce` parameter.** It causes springs to oscillate forever, wasting CPU.

### Modal/Overlay Entrance
```js
initial={{ scale: 0.92, opacity: 0, y: 20 }}
animate={{ scale: 1, opacity: 1, y: 0 }}
exit={{ scale: 0.92, opacity: 0, y: 20 }}
transition={{ type: 'spring', damping: 30, stiffness: 300 }}
```

### Backdrop Entrance
```js
initial={{ opacity: 0 }}
animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
transition={{ duration: 0.3 }}
```

### Hover Lift
```js
whileHover={{ y: -20 }}
```

### Scroll Indicator
```js
animate={{ opacity: 0.8, y: [0, 8, 0] }}
transition={{ y: { repeat: Infinity, duration: 1.5, ease: 'easeInOut' } }}
```

## Animation Rules

### DO
- Use `AnimatePresence` for all mount/unmount transitions
- Use `will-change: transform` on elements with continuous transform animations
- Gate infinite animations with `IntersectionObserver` (only animate when visible)
- Throttle scroll listeners with `requestAnimationFrame`
- Use `preload="metadata"` on videos so first frame shows (never black rectangles)
- Clean up GSAP ScrollTriggers in useEffect return functions

### DON'T
- Don't use `repeat: Infinity` without IntersectionObserver gating
- Don't use `bounce` on springs
- Don't use more than 2 `useSpring` hooks per component
- Don't animate properties that trigger layout (width, height, top, left) — use transforms only
- Don't use `preload="none"` on visible video thumbnails
- Don't create RAF loops that run when off-screen
- Don't use BlurFade/TextGenerateEffect on section titles (use CharacterReveal)

## Section Transition System

### Diagonal Clip-Path (THE ONE transition)
```css
clip-path: polygon(0 5vw, 100% 0, 100% calc(100% - 5vw), 0 100%);
```
- Content padding: `pt-[7vw] pb-[7vw]` (2vw buffer from clip edge)
- Margin: `mt-8 md:mt-12` above diagonal sections
- Applied via `CinematicSection` wrapper with `diagonal` and `diagonalBottom` props

**RULE: Only one transition type. No curves, no SVG waves, no fade dividers. Diagonal only.**
